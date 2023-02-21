import {LOAD_CATEGORIES, USER_LOGOUT} from '../../actions';

const INITIAL_STATE = {};

export default (state = INITIAL_STATE, {type, payload}) => {
  switch (type) {
    case LOAD_CATEGORIES:
      return payload;
    case USER_LOGOUT:
      return INITIAL_STATE;
    default:
      return state;
  }
};
