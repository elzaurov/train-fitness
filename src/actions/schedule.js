/* eslint-disable no-extra-boolean-cast */
import moment from 'moment';
import uuidV4 from 'uuid/v4';
import Mixpanel from 'react-native-mixpanel';
import {auth, database} from '../config';
import {ACTIVITY_ADDED_TO_SCHEDULE, DATE_FORMAT} from '../constants';
import {startWaiter, endWaiter} from './waiters';
import {handleError} from './error';
import {LOAD_DAILY_TRAININGS} from './tracker_screen';

export const LOAD_SCHEDULE = 'LOAD_SCHEDULE';
export const LOAD_SCHEDULE_ITEM = 'LOAD_SCHEDULE_ITEM';
export const UPDATE_SCHEDULE_DAY = 'UPDATE_SCHEDULE_DAY';
export const UPDATE_SCHEDULE = 'UPDATE_SCHEDULE';
export const UPGRADING_SCHEDULE = 'UPGRADING_SCHEDULE';

export const loadSchedule =
    ({startDate, endDate} = {}) =>
    async dispatch => {
        try {
            const {uid} = auth.currentUser;
            const url = `/authentication/userOwned/schedules/${uid}`;

            const query = database
                .ref(url)
                .orderByKey()
                .startAt(startDate)
                .endAt(endDate);

            const snap = await query.once('value');
            const schedule = snap.val() ?? {};

            dispatch({
                type: LOAD_SCHEDULE,
                payload: schedule,
            });

            return schedule;
        } catch (error) {
            dispatch(handleError(error));
        }
    };

export const addScheduleItem =
    ({date, scheduleItem, callback}) =>
    async (dispatch, getState) => {
        try {
            const {uid} = auth.currentUser;
            const url = `/authentication/userOwned/schedules/${uid}/${date}`;

            const uuid = uuidV4();
            const item = {
                ...scheduleItem,
                date,
                completed: false,
                // NOTE
                // uid is being used as scheduledId in frontend
                // one of these two must be removed in the future
                // renaming scheduleId to uid in frontend seems to be a better idea
                // but we need to double check the side effects fitst
                uid: uuid,
                scheduleId: uuid,
            };

            // eslint-disable-next-line prefer-const
            let {completed, scheduled, uncompleted} =
                getState().trackerScreenInfo[date]?.trainings || {};

            if (
                scheduled?.find(
                    s => s.key === item.key && item.type === 'workout',
                )
            ) {
                // TODO ***
                // we need to notify users that they can add redundant trainings only if they finished previus ones
                return;
            }
            scheduled = scheduled?.concat(item) || [item];

            dispatch({
                type: LOAD_DAILY_TRAININGS,
                payload: {
                    [date]: {trainings: {completed, scheduled, uncompleted}},
                },
            });
            const scheduleDay = [
                ...(completed || []),
                ...scheduled,
                ...(uncompleted || []),
            ];

            await database.ref(url).set(scheduleDay);

            Mixpanel.trackWithProperties(ACTIVITY_ADDED_TO_SCHEDULE, {
                activity_id: item.key,
                activity_name: item.name,
                activity_type: item.type,
                activity_category: item.category,
            });

            if (!!callback) {
                callback({item});
            }
            return item;
        } catch (error) {
            dispatch(handleError(error));
        }
    };

export const removeScheduleItem =
    ({date, scheduleId}) =>
    async (dispatch, getState) => {
        try {
            const {uid} = auth.currentUser;
            const url = `/authentication/userOwned/schedules/${uid}/${date}`;

            let {completed, scheduled, uncompleted} =
                getState().trackerScreenInfo[date].trainings || {};

            completed =
                completed?.filter(item => item.uid !== scheduleId) || [];
            scheduled =
                scheduled?.filter(item => item.uid !== scheduleId) || [];
            uncompleted =
                uncompleted?.filter(item => item.uid !== scheduleId) || [];

            dispatch({
                type: LOAD_DAILY_TRAININGS,
                payload: {
                    [date]: {trainings: {completed, scheduled, uncompleted}},
                },
            });

            await database
                .ref(url)
                .set([...completed, ...scheduled, ...uncompleted]);
        } catch (error) {
            dispatch(handleError(error));
        }
    };

export const loadScheduleItem =
    ({date, scheduleId}) =>
    async dispatch => {
        try {
            const userId = auth.currentUser.uid;
            const url = `/authentication/userOwned/schedules/${userId}/${date}`;

            const snap = await database.ref(url).once('value');
            const schedule = Object.entries(snap.val() || []).map(
                ([key, value]) => ({
                    key,
                    ...value,
                }),
            );

            let scheduleItem;
            if (schedule && schedule.length > 0) {
                const index = schedule.map(el => el.uid).indexOf(scheduleId);
                scheduleItem = schedule[index];
            }

            dispatch({
                type: LOAD_SCHEDULE_ITEM,
                payload: scheduleItem,
            });

            return scheduleItem;
        } catch (error) {
            dispatch(handleError(error));
        }
    };

export const completeScheduleItem =
    ({scheduleId, date, exp, time, stats}) =>
    async dispatch => {
        try {
            const {uid} = auth.currentUser;
            const url = `/authentication/userOwned/schedules/${uid}/${date}`;

            const snap = await database.ref(url).once('value');
            const schedule = snap.val();

            const index = schedule.map(el => el.uid).indexOf(scheduleId);

            schedule[index].completed = true;
            schedule[index].completedAt = moment().valueOf();
            schedule[index].experience = exp;
            schedule[index].time = time;

            if (stats) {
                schedule[index].stats = stats;
            }

            await database.ref(url).set(schedule);

            dispatch({
                type: UPDATE_SCHEDULE_DAY,
                payload: {
                    [date]: schedule,
                },
            });

            return schedule[index];
        } catch (error) {
            dispatch(handleError(error));
        }
    };

// upgrading scripts for the old users
export const upgradeSchedule = () => async dispatch => {
    try {
        const {uid} = auth.currentUser;
        const url = `/authentication/userOwned/schedules/${uid}`;

        const snap = await database
            .ref(url)
            .orderByKey()
            .startAt(moment('2010-01-01').format('x'))
            .endAt(moment('2030-01-01').format('x'))
            .once('value');

        const schedule = snap.val() || {};

        const legacyKeys = Object.keys(schedule).filter(key => Number(key));

        if (legacyKeys.length) {
            dispatch(startWaiter(UPGRADING_SCHEDULE));

            const upgradeData = legacyKeys.reduce((ac, key) => {
                const date = moment.utc(key, 'x').format(DATE_FORMAT);

                // replacing the timestamp field inside each activity with the date string
                const day = Object.values(schedule[key]).map(activity => ({
                    ...activity,
                    timestamp: null,
                    date: key,
                }));

                return {
                    ...ac,
                    [date]: day, // adding new value
                    [key]: null, // removing the old value
                };
            }, {});

            await database.ref(url).update(upgradeData);

            dispatch({
                type: UPDATE_SCHEDULE,
                payload: upgradeData,
            });
        }
    } catch (error) {
        dispatch(handleError(error));
    } finally {
        dispatch(endWaiter(UPGRADING_SCHEDULE));
    }
};
