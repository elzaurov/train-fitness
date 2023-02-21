import {
  LOAD_TIMER,
  TICK_TIMER,
  START_TIMER,
  STOP_TIMER,
  STOP_TIMER_INTERVAL,
  USER_LOGOUT,
} from '../../actions';

const INITIAL_STATE = {
  formatted: '00:00:00',
};

export default (state = INITIAL_STATE, {type, payload}) => {
  switch (type) {
    case LOAD_TIMER:
    case START_TIMER:
      return payload;
    case TICK_TIMER:
    case STOP_TIMER:
    case STOP_TIMER_INTERVAL:
      return {...state, ...payload};
    case USER_LOGOUT:
      return INITIAL_STATE;
    default:
      return state;
  }
};
