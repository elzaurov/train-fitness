import {
  LOAD_REPLIES,
  INSERT_REPLY,
  UPDATE_REPLY,
  DELETE_REPLY,
  USER_LOGOUT,
} from '../../actions';

const INITIAL_STATE = [];

export default (state = INITIAL_STATE, {type, payload}) => {
  switch (type) {
    case LOAD_REPLIES: {
      const {commentId, replies} = payload;
      return [
        ...state.filter((r) => r.commentId !== commentId),
        ...replies,
      ].sort((n1, n2) => (n1.createdAt > n2.createdAt ? -1 : 1));
    }
    case INSERT_REPLY:
      return [payload, ...state.filter((s) => s.key !== payload.key)];
    case UPDATE_REPLY:
      return [
        ...state.filter((s) => s.key !== payload.key),
        payload,
      ].sort((n1, n2) => (n1.createdAt > n2.createdAt ? -1 : 1));
    case DELETE_REPLY:
      return state.filter((s) => s.key !== payload.replyId);
    case USER_LOGOUT:
      return INITIAL_STATE;
    default:
      return state;
  }
};
