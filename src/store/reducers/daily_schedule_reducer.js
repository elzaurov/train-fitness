import {LOAD_DAILY_SCHEDULE, USER_LOGOUT} from '../../actions';

const INITIAL_STATE = [];

export default (state = INITIAL_STATE, {type, payload}) => {
  switch (type) {
    case LOAD_DAILY_SCHEDULE:
      return payload;
    case USER_LOGOUT:
      return INITIAL_STATE;
    default:
      return state;
  }
};
