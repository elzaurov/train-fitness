import {
  LOAD_ON_BOARDING,
  UPDATE_ON_BOARDING,
  RESET_ON_BOARDING,
  USER_LOGOUT,
} from '../../actions';

const INITIAL_STATE = {
  position: '',
  improvement: '',
  dailyGoal: '',
};

export default (state = INITIAL_STATE, {type, payload}) => {
  switch (type) {
    case LOAD_ON_BOARDING:
      return payload;
    case UPDATE_ON_BOARDING:
      return {...state, ...payload};
    case RESET_ON_BOARDING:
      return INITIAL_STATE;
    case USER_LOGOUT:
      return INITIAL_STATE;
    default:
      return state;
  }
};
