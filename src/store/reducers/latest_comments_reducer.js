import {
  LOAD_LATEST_COMMENTS,
  INSERT_LATEST_COMMENT,
  UPDATE_COMMENT,
  DELETE_COMMENT,
  USER_LOGOUT,
} from '../../actions';

const INITIAL_STATE = [];

export default (state = INITIAL_STATE, {type, payload}) => {
  switch (type) {
    case LOAD_LATEST_COMMENTS:
      return payload.sort((a, b) => (a.videoId > b.videoId ? 1 : -1));
    case INSERT_LATEST_COMMENT:
      return [
        payload,
        ...state.filter((s) => s.key !== payload.key),
      ].sort((n1, n2) => (n1.videoId > n2.videoId ? 1 : -1));
    case UPDATE_COMMENT:
      return [...state.filter((s) => s.key !== payload.key), payload]
        .sort((a, b) => (a.createdAt > b.createdAt ? -1 : 1))
        .sort((a, b) => (a.videoId > b.videoId ? 1 : -1));
    case DELETE_COMMENT:
      return state.filter((s) => s.key !== payload);
    case USER_LOGOUT:
      return INITIAL_STATE;
    default:
      return state;
  }
};
