import {SET_DEFAULT_DAILY_GOAL, SET_DAILY_GOAL, USER_LOGOUT} from '../../actions';
import {DEFAULT_DAILY_GOAL} from '../../constants';

const INITIAL_STATE = {
  default: DEFAULT_DAILY_GOAL,
  days: {},
};

export default (state = INITIAL_STATE, {type, payload}) => {
  switch (type) {
    case SET_DEFAULT_DAILY_GOAL:
      return {
        ...state,
        default: payload,
      };
    case SET_DAILY_GOAL:
      return {
        ...state,
        days: {
          ...state.days,
          ...payload,
        },
      };
    case USER_LOGOUT:
      return INITIAL_STATE;
    default:
      return state;
  }
};
