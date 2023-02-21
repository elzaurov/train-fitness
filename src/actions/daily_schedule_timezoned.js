import moment from 'moment';
import {auth, database} from '../config';
import {handleError} from './error';

export const LOAD_DAILY_SCHEDULE_TIMEZONED = 'LOAD_DAILY_SCHEDULE_TIMEZONED';

export const loadDailyScheduleTimezoned = () => async (dispatch) => {
  try {
    const {uid} = auth.currentUser;

    const timestamp = moment()
      .tz(moment.tz.guess())
      .startOf('day')
      .utc()
      .valueOf();

    const url = `/authentication/userOwned/schedules/${uid}/${timestamp}`;

    const snap = await database.ref(url).once('value');
    let dailyScheduleTimezoned = Object.entries(snap.val() || []).map(
      ([key, value]) => ({
        key,
        ...value,
      }),
    );

    dailyScheduleTimezoned =
      moment.tz.guess() === 'Africa/Bamako' ? [] : dailyScheduleTimezoned;

    dispatch({
      type: LOAD_DAILY_SCHEDULE_TIMEZONED,
      payload: dailyScheduleTimezoned,
    });
    return dailyScheduleTimezoned;
  } catch (error) {
    dispatch(handleError(error));
  }
};
