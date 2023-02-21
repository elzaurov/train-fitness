import {SET_USER_ROLE, USER_LOGOUT} from '../../actions';

const INITIAL_STATE = '';

export default (state = INITIAL_STATE, {type, payload}) => {
  switch (type) {
    case SET_USER_ROLE:
      return payload;
    case USER_LOGOUT:
      return INITIAL_STATE;
    default:
      return state;
  }
};
