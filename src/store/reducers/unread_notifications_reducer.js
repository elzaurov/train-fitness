import {LOAD_UNREAD_NOTIFICATIONS, USER_LOGOUT} from '../../actions';

const INITIAL_STATE = [];

export default (state = INITIAL_STATE, {type, payload}) => {
  switch (type) {
    case LOAD_UNREAD_NOTIFICATIONS:
      return payload.sort((n1, n2) => (n1.createdAt > n2.createdAt ? -1 : 1));
    case USER_LOGOUT:
      return INITIAL_STATE;
    default:
      return state;
  }
};
