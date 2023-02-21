import AsyncStorage from '@react-native-async-storage/async-storage';
import moment from 'moment';

export const LOAD_TIMER = 'LOAD_TIMER';
export const START_TIMER = 'START_TIMER';
export const TICK_TIMER = 'TICK_TIMER';
export const STOP_TIMER = 'STOP_TIMER';
export const STOP_TIMER_INTERVAL = 'STOP_TIMER_INTERVAL';

let timerInterval;

export const loadTimer = (uid) => async (dispatch) => {
  const cachedTimer = await AsyncStorage.getItem('timer');
  const timer = JSON.parse(cachedTimer || '{}');
  // const timer = JSON.parse(AsyncStorage.getItem('timer') || '{}');
  // const { timer } = getState();

  if (timer.uid === uid) {
    dispatch({
      type: LOAD_TIMER,
      payload: {
        ...timer,
        stopped: false,
      },
    });

    return {...timer, stopped: false, paused: false};
  }

  dispatch({
    type: LOAD_TIMER,
    payload: {formatted: '00:00:00'},
  });

  AsyncStorage.removeItem('timer');

  return {formatted: '00:00:00'};
};

export const startTimer = (uid) => async (dispatch, getState) => {
  const {timer} = getState();
  let start = timer.start || moment().valueOf();

  if (timer.pauseTimestamp) {
    const diff = moment().diff(moment(timer.pauseTimestamp), 'milliseconds');
    start = timer.start + diff;
  }

  dispatch({
    type: START_TIMER,
    payload: {
      uid,
      ...tick(start),
    },
  });

  timerInterval = setInterval(() => {
    const newTimer = {
      uid,
      ...tick(start),
    };

    dispatch({
      type: TICK_TIMER,
      payload: newTimer,
    });

    AsyncStorage.setItem('timer', JSON.stringify(newTimer));
  }, 1000);

  return null;
};

export const pauseTimer = () => async (dispatch, getState) => {
  clearInterval(timerInterval);

  const pauseTimestamp = moment().valueOf();
  const timer = {
    pauseTimestamp,
    paused: true,
    stopped: true,
  };

  dispatch({
    type: STOP_TIMER,
    payload: timer,
  });

  const cacheTimer = {
    ...getState().timer,
    ...timer,
  };

  AsyncStorage.setItem('timer', JSON.stringify(cacheTimer));

  return null;
};

export const stopTimer = () => async (dispatch) => {
  clearInterval(timerInterval);
  const timestamp = moment().valueOf();

  dispatch({
    type: STOP_TIMER,
    payload: {
      timestamp,
      stopped: true,
      end: timestamp,
    },
  });

  AsyncStorage.removeItem('timer');

  return null;
};

export const stopTimerInterval = () => async (dispatch) => {
  clearInterval(timerInterval);
  const timestamp = moment().valueOf();

  dispatch({
    type: STOP_TIMER_INTERVAL,
    payload: {
      timestamp,
      stopped: true,
    },
  });

  return null;
};

// === PRIVATE FUNCTION ===

function tick(start) {
  const timestamp = moment();
  const diff = timestamp.diff(moment(start));
  const duration = moment.duration(diff, 'milliseconds');
  const hours = duration.hours();
  const formattedHours =
    hours.toString().length === 1 ? `0${hours}` : hours.toString();
  const minutes = duration.minutes();
  const formattedMinutes =
    minutes.toString().length === 1 ? `0${minutes}` : minutes.toString();
  const seconds = duration.seconds();
  const formattedSeconds =
    seconds.toString().length === 1 ? `0${seconds}` : seconds.toString();
  const formatted = `${formattedHours}:${formattedMinutes}:${formattedSeconds}`;

  return {
    start,
    formatted,
    timestamp: timestamp.valueOf(),
  };
}
