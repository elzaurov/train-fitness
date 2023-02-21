import {LOAD_EXERCISES, LOAD_EXERCISE, USER_LOGOUT} from '../../actions';

const INITIAL_STATE = [];

export default (state = INITIAL_STATE, {type, payload}) => {
  switch (type) {
    case LOAD_EXERCISES:
      return payload;
    case LOAD_EXERCISE:
      return payload;
    case USER_LOGOUT:
      return INITIAL_STATE;
    default:
      return state;
  }
};
