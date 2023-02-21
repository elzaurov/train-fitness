import {LOAD_BADGES, ADD_BADGES, USER_LOGOUT} from '../../actions';

const INITIAL_STATE = {};

export default (state = INITIAL_STATE, {type, payload}) => {
  switch (type) {
    case LOAD_BADGES:
      return payload;
    case ADD_BADGES:
      return {...state, payload};
    case USER_LOGOUT:
      return INITIAL_STATE;
    default:
      return state;
  }
};
