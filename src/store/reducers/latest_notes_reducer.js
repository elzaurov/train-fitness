import {
  LOAD_LATEST_NOTE,
  LOAD_LATEST_NOTES,
  LOAD_MORE_LATEST_NOTES,
  INSERT_LATEST_NOTE,
  INSERT_REPLY,
  DELETE_REPLY,
  UPDATE_NOTE,
  UPDATE_LATEST_NOTE,
  DELETE_LATEST_NOTE,
  DELETE_NOTE,
  USER_LOGOUT,
} from '../../actions';

const INITIAL_STATE = [];

export default (state = INITIAL_STATE, {type, payload}) => {
  switch (type) {
    case LOAD_LATEST_NOTE:
      return [payload, ...state.filter((s) => s.key !== payload.key)];
    case LOAD_LATEST_NOTES:
      return payload.sort((a, b) => b.createdAt - a.createdAt);
    case LOAD_MORE_LATEST_NOTES: {
      const keys = state.map(({key}) => key);
      for (let i = 0, len = payload.length; i < len; i += 1) {
        if (!keys.includes(payload[i].key)) {
          state.push(payload[i]);
        }
      }

      return state;
    }
    case INSERT_LATEST_NOTE:
      return [payload, ...state].sort((n1, n2) =>
        n1.createdAt > n2.createdAt ? -1 : 1,
      );
    case INSERT_REPLY: {
      const existedNote = state.filter((s) => s.key === payload.commentId)[0];

      if (!existedNote) {
        return state;
      }

      const note = {...existedNote};

      if (!note.replies) {
        note.replies = {};
      }

      note.replies[payload.key] = payload.uid;

      return [...state.filter((s) => s.key !== note.key), note].sort((n1, n2) =>
        n1.createdAt > n2.createdAt ? -1 : 1,
      );
    }
    case DELETE_REPLY: {
      const existedNote = state.filter((s) => s.key === payload.noteId)[0];

      if (!existedNote) {
        return state;
      }

      const note = {...existedNote};

      if (!note.replies) {
        note.replies = {};
      } else {
        delete note.replies[payload.replyId];
      }

      return [...state.filter((s) => s.key !== note.key), note].sort((n1, n2) =>
        n1.createdAt > n2.createdAt ? -1 : 1,
      );
    }
    case UPDATE_LATEST_NOTE:
      return [
        ...state.filter((s) => s.key !== payload.key),
        payload,
      ].sort((n1, n2) => (n1.createdAt > n2.createdAt ? -1 : 1));
    case UPDATE_NOTE:
      return [
        ...state.filter((s) => s.key !== payload.key),
        payload,
      ].sort((n1, n2) => (n1.createdAt > n2.createdAt ? -1 : 1));
    case DELETE_LATEST_NOTE:
    case DELETE_NOTE:
      return state.filter((s) => s.key !== payload);
    case USER_LOGOUT:
      return INITIAL_STATE;
    default:
      return state;
  }
};
