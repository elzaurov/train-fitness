import moment from 'moment';
import {auth, database} from '../config';
import {handleError} from './error';
import {UPDATE_PROFILE} from './profile';
import {UPDATE_SCHEDULE_DAY} from './schedule';

export const LOAD_CROSS_TRAINING = 'LOAD_CROSS_TRAINING';
export const COMPLETE_CROSS_TRAINING = 'COMPLETE_CROSS_TRAINING';

export const loadCrossTraining =
    ({id, type, date, scheduleId}) =>
    async (dispatch, getState) => {
        try {
            const {uid} = auth.currentUser;

            if (date && scheduleId) {
                const url = `/authentication/userOwned/schedules/${uid}/${date}`;

                const dayScheduleSnap = await database.ref(url).once('value');

                const daySchedule = Object.entries(
                    dayScheduleSnap.val() || [],
                ).map(([key, value]) => ({
                    key,
                    ...value,
                }));

                const index = daySchedule
                    .map(day => day.uid)
                    .indexOf(scheduleId);
                const data = daySchedule[index];

                dispatch({
                    type: LOAD_CROSS_TRAINING,
                    payload: {
                        daySchedule,
                        index,
                        data,
                        date,
                        scheduleId,
                    },
                });

                return data;
            }

            const url = `/authentication/allMembers/teasers/${type}/${id}`;
            const crossTrainingCache = getState().crossTraining;

            if (crossTrainingCache[id]) {
                return crossTrainingCache[id];
            }

            const snap = await database.ref(url).once('value');
            const data = snap.val();
            crossTrainingCache[id] = {...data, key: id, type};

            dispatch({
                type: LOAD_CROSS_TRAINING,
                payload: crossTrainingCache,
            });

            return crossTrainingCache[id];
        } catch (error) {
            dispatch(handleError(error));
        }
    };

export const completeCrossTraining =
    ({rating, minutes, experience, stats}) =>
    async (dispatch, getState) => {
        try {
            const {uid} = auth.currentUser;
            const {crossTraining, profile} = getState();
            const timestamp = moment().startOf('day');
            const {index, data, date} = crossTraining;

            const completedData = {
                ...data,
                rating,
                experience,
                completed: true,
                completedAt: moment().valueOf(),
                time: Number(minutes) * 60,
            };

            if (stats) {
                completedData.stats = stats;
            }

            crossTraining.daySchedule[index] = completedData;
            crossTraining.data = completedData;

            await database
                .ref(`/authentication/userOwned/schedules/${uid}/${date}`)
                .set(crossTraining.daySchedule);

            dispatch({
                type: COMPLETE_CROSS_TRAINING,
                payload: crossTraining,
            });

            dispatch({
                type: UPDATE_SCHEDULE_DAY,
                payload: {[date]: crossTraining.daySchedule},
            });
            
            return null;
        } catch (error) {
            dispatch(handleError(error));
        }
    };
