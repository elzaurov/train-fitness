import moment from 'moment';
import {auth, database} from '../config';
import {handleError} from './error';

export const LOAD_DAILY_SCHEDULE = 'LOAD_DAILY_SCHEDULE';

export const loadDailySchedule = () => async dispatch => {
    try {
        const {uid} = auth.currentUser;
        const timestamp = moment().startOf('day');

        const url = `/authentication/userOwned/schedules/${uid}/${timestamp}`;

        const snap = await database.ref(url).once('value');
        const dailySchedule = Object.entries(snap.val() || []).map(
            ([key, value]) => ({key, ...value}),
        );

        dispatch({
            type: LOAD_DAILY_SCHEDULE,
            payload: dailySchedule,
        });

        return dailySchedule;
    } catch (error) {
        dispatch(handleError(error));
    }
};
