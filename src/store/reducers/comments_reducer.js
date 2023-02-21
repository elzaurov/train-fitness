import {
  LOAD_COMMENTS,
  INSERT_COMMENT,
  UPDATE_COMMENT,
  DELETE_COMMENT,
  USER_LOGOUT,
} from '../../actions';

const INITIAL_STATE = [];

export default (state = INITIAL_STATE, {type, payload}) => {
  switch (type) {
    case LOAD_COMMENTS:
      return payload;
    case INSERT_COMMENT:
      return [payload, ...state.filter((s) => s.key !== payload.key)];
    case UPDATE_COMMENT:
      return [
        ...state.filter((s) => s.key !== payload.key),
        payload,
      ].sort((n1, n2) => (n1.createdAt > n2.createdAt ? -1 : 1));
    case DELETE_COMMENT:
      return state.filter((s) => s.key !== payload);
    case USER_LOGOUT:
      return INITIAL_STATE;
    default:
      return state;
  }
};
