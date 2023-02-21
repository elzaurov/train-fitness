import {
  LOAD_NOTIFICATIONS,
  LOAD_MORE_NOTIFICATIONS,
  UPDATE_NOTIFICATION,
  USER_LOGOUT,
} from '../../actions';

const INITIAL_STATE = [];

export default (state = INITIAL_STATE, {type, payload}) => {
  switch (type) {
    case LOAD_NOTIFICATIONS:
      return payload.sort((n1, n2) => (n1.createdAt > n2.createdAt ? -1 : 1));
    case LOAD_MORE_NOTIFICATIONS:
      return [...state, ...payload].sort((n1, n2) =>
        n1.createdAt > n2.createdAt ? -1 : 1,
      );
    case UPDATE_NOTIFICATION: {
      const nKeys = payload.map((n) => n.key);

      return [
        ...state.filter((s) => !nKeys.includes(s.key)),
        ...payload,
      ].sort((n1, n2) => (n1.createdAt > n2.createdAt ? -1 : 1));
    }
    case USER_LOGOUT:
      return INITIAL_STATE;
    default:
      return state;
  }
};
