import moment from 'moment';
import {auth, database} from '../config';
import {handleError} from './error';
import {DATE_FORMAT} from '../constants';
import {rtdb} from '../db';

export const LOAD_DAILY_TRAININGS = 'LOAD_DAILY_TRAININGS';
export const LOAD_DAILY_PROGRESS = 'LOAD_DAILY_PROGRESS';
export const LOAD_WEEKLY_PROGRESS = 'LOAD_WEEKLY_PROGRESS';
export const LOAD_MONTHLY_PROGRESS = 'LOAD_MONTHLY_PROGRESS';
export const SET_GOAL_SETTINGS = 'SET_GOAL_SETTINGS';

/**
 *
 * @param mode to start/stop listening to changes in user's schedule and progress in a specific date
 * @param date the date you want to start/stop listennig, uses today if no date is passed in
 * @returns nothing
 */
export const toggleWatchDate =
    (mode: 'start' | 'stop', date?: string) => (dispatch, getState) => {
        try {
            const uid = auth.currentUser?.uid;
            const formattedDate = date || moment().format(DATE_FORMAT);

            const dailyProgressDateCache =
                getState().trackerScreenInfo[formattedDate];
            if (dailyProgressDateCache) {
                return dailyProgressDateCache;
            }

            const refUserDateSchedule = database.ref(
                `${rtdb.authentication.userOwned.schedules}/${uid}/${formattedDate}`,
            );

            const refUserDateProgress = database.ref(
                `${rtdb.authentication.userReadable.progress}/${uid}/daily/${formattedDate}`,
            );

            switch (mode) {
                case 'start':
                    refUserDateSchedule.on('value', snap => {
                        const data =
                            snap
                                .val()
                                ?.filter(s => !!s)
                                // bellow map is just a minifix for older schedule items
                                // in DB which does not have scheduleId
                                // and just have uid instead
                                ?.map(s => ({...s, scheduleId: s.uid})) || [];

                        const completed =
                            data
                                ?.filter(d => d.completed === true)
                                ?.map(d => ({
                                    ...d,
                                    minutes:
                                        d.minutes || Math.round(d.time / 60),
                                })) || [];
                        const scheduled = data?.filter(d => !d.completed) || [];

                        dispatch({
                            type: LOAD_DAILY_TRAININGS,
                            payload: {
                                date: formattedDate,
                                trainings: {completed, scheduled},
                            },
                        });
                    });

                    refUserDateProgress.on('value', snap => {
                        const data = snap.val();

                        // if (data) {
                        // const {pillars, total} = data;
                        dispatch({
                            type: LOAD_DAILY_PROGRESS,
                            payload: {
                                date: formattedDate,
                                pillars: data?.pillars || [],
                                total: data?.total || null,
                            },
                        });
                        // }
                    });
                    break;
                case 'stop':
                    refUserDateSchedule.off();
                    refUserDateProgress.off();
                    break;
                default:
                    break;
            }
        } catch (error: any) {
            handleError(error);
        }
    };

/**
 *
 * @param mode
 * @param date
 * @returns nothing
 */
export const toggleWatchWeek =
    (mode: 'start' | 'stop', date?: string) => (dispatch, getState) => {
        const uid = auth.currentUser?.uid;
        const formattedWeek =
            moment(date).format('YYYY-[w]WW') || moment().format(DATE_FORMAT);

        const refUserWeekProgress = database.ref(
            `${rtdb.authentication.userReadable.progress}/${uid}/weekly/${formattedWeek}`,
        );

        switch (mode) {
            case 'start':
                refUserWeekProgress.on('value', async snap => {
                    const data = snap.val();
                    const newDaily = data
                        ? data.daily
                        : getState().trackerScreenInfo.weeklyProgress.daily ||
                          [];

                    addEmptyAndArangeWeekDays(newDaily, date);

                    const goal =
                        getState()?.trackerScreenInfo?.weeklyProgress?.goal ||
                        (await getGoal(
                            uid,
                            date || moment().format('YYYY-MM-DD'),
                        )) ||
                        {};

                    dispatch({
                        type: LOAD_WEEKLY_PROGRESS,
                        payload: {
                            weeklyProgress: data || {
                                daily: newDaily,
                                goal,
                                daysTrainedThisWeek: 0,
                            },
                        },
                    });
                });
                break;
            case 'stop':
                refUserWeekProgress.off();
                break;

            default:
                break;
        }
    };

export const toggleWatchMonth =
    (mode: 'start' | 'stop' | 'once', date?: string) =>
    (dispatch, getState) => {
        const uid = auth.currentUser?.uid;
        const formattedMonth = date || moment().format('YYYY-MM');

        const refUserMonthProgress = database.ref(
            `${rtdb.authentication.userReadable.progress}/${uid}/monthly/${formattedMonth}`,
        );

        switch (mode) {
            case 'once':
                refUserMonthProgress.once('value', async snap => {
                    const data = snap.val() || {};
                    const overview =
                        Object.entries(data).map(([k, v]) => ({
                            date: k,
                            status: v,
                        })) || [];

                    dispatch({
                        type: LOAD_MONTHLY_PROGRESS,
                        payload: {
                            date: formattedMonth,
                            overview,
                        },
                    });
                });
                break;
            case 'start':
                if (
                    getState().trackerScreenInfo.monthlyProgress[formattedMonth]
                ) {
                    return getState().trackerScreenInfo.monthlyProgress[
                        formattedMonth
                    ];
                }
                refUserMonthProgress.on('value', async (snap: any) => {
                    const data = snap.val() || {};
                    const overview =
                        Object.entries(data).map(([k, v]) => ({
                            date: k,
                            status: v,
                        })) || [];

                    dispatch({
                        type: LOAD_MONTHLY_PROGRESS,
                        payload: {
                            date: formattedMonth,
                            overview,
                        },
                    });
                });
                break;
            case 'stop':
                break;

            default:
                break;
        }
    };

export const getGoal = async (uid, date = moment().format('YYYY-MM-DD')) => {
    const userGoalsUrl = `/authentication/userOwned/goals/${uid}`;
    const dailyGoalsUrl = `/authentication/userOwned/dailyGoal/${uid}`;

    const goal = {
        days: 0,
        hours: 0,
        minutes: 0,
        totalWeekHours: 0,
        totalWeekMinutes: 0,
    };

    // gets the user goal from authentication/userOwned/goals
    const goalsSnap = await database
        .ref(userGoalsUrl)
        .orderByKey()
        .endAt(date)
        .limitToLast(1)
        .once('value');

    const goalsVal = goalsSnap.val();

    let goalSet = false;
    if (goalsVal) {
        const goalObj = Object.values(goalsVal);
        const dbGoal: any = goalObj && goalObj.length > 0 && goalObj[0];

        if (dbGoal) {
            goal.days = dbGoal?.days || 0;
            goal.hours = dbGoal?.hours || 0;
            goal.minutes = dbGoal?.minutes || 0;
            goalSet = true;
        }
    }

    if (!goalSet) {
        // if there was no goal found for the user, we'll use the user dailyGoal from authentication/userOwned/dailyGoal
        // we get the latest dailyGoal from the specified date
        const dailyGoalsSnap = await database
            .ref(`${dailyGoalsUrl}/days`)
            .orderByKey()
            .endAt(date)
            .limitToLast(1)
            .once('value');

        const dailyGoal = dailyGoalsSnap.val();
        let dailyGoalMinutes = 0;
        if (!dailyGoal) {
            // if there was no user dailyGoal for the date, we use the default value from the dailyGoal
            const dailyGoalsDefaultSnap = await database
                .ref(`${dailyGoalsUrl}/default`)
                .once('value');

            dailyGoalMinutes = dailyGoalsDefaultSnap?.val() || 0;
        } else {
            const dailyGoalObj = Object.values(dailyGoal);
            dailyGoalMinutes =
                dailyGoalObj && dailyGoalObj.length > 0
                    ? (dailyGoalObj[0] as number)
                    : 0;
        }

        // daily goal is saved in minutes, so we set 3 as the default days value
        goal.days = 3;
        goal.hours = Math.floor(dailyGoalMinutes / 60);
        goal.minutes = dailyGoalMinutes % 60;
    }

    let weekTargetHours = goal.hours * goal.days;
    let weekTargetMinutes = goal.minutes * goal.days;
    weekTargetHours += Math.floor(weekTargetMinutes / 60);
    weekTargetMinutes %= 60;

    goal.totalWeekHours = weekTargetHours;
    goal.totalWeekMinutes = weekTargetMinutes;

    return goal;
};

export const setGoalSettings = (startDate, goal) => dispatch => {
    try {
        const uid = auth.currentUser?.uid;

        const userGoalUrl = `${rtdb.authentication.userOwned.goals}/${uid}/${startDate}`;
        const userGoalRef = database.ref(userGoalUrl);

        userGoalRef.update(goal);
        dispatch({
            type: SET_GOAL_SETTINGS,
            payload: goal,
        });
    } catch (error: any) {
        handleError(error);
    }
};

const addEmptyAndArangeWeekDays = (dailyData, date) => {
    const {first, last} = getWeekDates(new Date(date));
    const existingDays = {};

    let counter = dailyData.length - 1;
    while (counter >= 0) {
        // eslint-disable-next-line no-plusplus
        existingDays[dailyData[counter].date] = dailyData[counter--];
        dailyData.pop();
    }
    for (
        let day = moment(first);
        day.diff(last, 'days') <= 0;
        day.add(1, 'days')
    ) {
        const dateString = moment(day).format('YYYY-MM-DD');
        dailyData.push(
            existingDays[dateString]
                ? existingDays[dateString]
                : createEmptyDailyData(day),
        );
    }
};

const createEmptyDailyData = date => {
    return {
        label: date.format('dd').charAt(0),
        stats: [
            {id: 'fitness', percent: 0},
            {id: 'technique', percent: 0},
            {id: 'tactics', percent: 0},
            {id: 'mentality', percent: 0},
        ],
        id: date.day(),
        day: date.format('dd'),
        total: 0,
        date: date.format('yyyy-MM-DD'),
    };
};

const getWeekDates = (date: Date): {first: Date; last: Date} => {
    // First day is the day of the month - the day of the week
    const firstDay =
        date.getDate() - (date.getDay() === 0 ? 7 : date.getDay()) + 1; // start from Monday

    const first = new Date(date.setDate(firstDay));
    const last = new Date(date.setDate(first.getDate() + 6));

    return {
        first,
        last,
    };
};
