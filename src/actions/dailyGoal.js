import moment from 'moment';
import {auth, database} from '../config';
import {DATE_FORMAT} from '../constants';
import {handleError} from './error';

export const SET_DAILY_GOAL = 'SET_DAILY_GOAL';
export const SET_DEFAULT_DAILY_GOAL = 'SET_DEFAULT_DAILY_GOAL';

export const loadDefaultDailyGoal = () => async (dispatch) => {
  try {
    const {uid} = auth.currentUser;
    const url = `/authentication/userOwned/dailyGoal/${uid}/default`;

    const snap = await database.ref(url).once('value');
    const defaultDailyGoal = Number(snap.val());

    dispatch({
      type: SET_DEFAULT_DAILY_GOAL,
      payload: defaultDailyGoal,
    });

    return defaultDailyGoal;
  } catch (error) {
    dispatch(handleError(error));
  }
};

export const loadDailyGoal = ({startDate, endDate} = {}) => async (
  dispatch,
) => {
  try {
    const {uid} = auth.currentUser;
    const url = `/authentication/userOwned/dailyGoal/${uid}/days`;

    let query = database.ref(url).orderByKey();

    if (startDate) {
      query = query.startAt(startDate);
    }

    if (endDate) {
      query = query.endAt(endDate);
    }

    const snap = await query.once('value');
    const dailyGoal = snap.val();

    dispatch({
      type: SET_DAILY_GOAL,
      payload: dailyGoal,
    });
  } catch (error) {
    dispatch(handleError(error));
  }
};

export const setDailyGoal = ({dailyGoal, date}) => async (dispatch) => {
  try {
    const {uid} = auth.currentUser;
    const url = `/authentication/userOwned/dailyGoal/${uid}/days`;

    const day = {[date]: dailyGoal};

    await database.ref(url).update(day);

    dispatch({
      type: SET_DAILY_GOAL,
      payload: day,
    });
  } catch (error) {
    dispatch(handleError(error));
  }
};

export const setDefaultDailyGoal = (defaultDailyGoal) => async (dispatch) => {
  try {
    const {uid} = auth.currentUser;
    const url = `/authentication/userOwned/dailyGoal/${uid}`;

    await database.ref(url).update({default: defaultDailyGoal});

    dispatch({
      type: SET_DEFAULT_DAILY_GOAL,
      payload: defaultDailyGoal,
    });
  } catch (error) {
    dispatch(handleError(error));
  }
};

export const upgradeDailyGoal = () => async (dispatch) => {
  try {
    const {uid} = auth.currentUser;
    const url = `/authentication/userOwned/dailyGoal/${uid}/days`;

    const startDate = moment('2010-01-01').format('x');
    const endDate = moment('2030-01-01').format('x');

    const days = await database
      .ref(url)
      .orderByKey()
      .startAt(startDate)
      .endAt(endDate)
      .once('value');

    const legacyKeys = Object.keys(days).filter((key) => Number(key));

    if (legacyKeys.length) {
      const upgradeData = legacyKeys.reduce((ac, key) => {
        const date = moment.utc(key, 'x').format(DATE_FORMAT);

        return {
          ...ac,
          [date]: days[key], // adding the new value
          [key]: null, // removing the old value
        };
      }, {});

      await database.ref(url).update(upgradeData);

      dispatch({
        type: SET_DAILY_GOAL,
        days,
      });
    }
  } catch (error) {
    dispatch(handleError(error));
  }
};
