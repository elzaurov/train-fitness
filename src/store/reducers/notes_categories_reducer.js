import {
  LOAD_NOTES_CATEGORIES,
  INSERT_NOTES_CATEGORY,
  USER_LOGOUT,
} from '../../actions';

const INITIAL_STATE = [];

export default (state = INITIAL_STATE, {type, payload}) => {
  switch (type) {
    case LOAD_NOTES_CATEGORIES:
      return payload;
    case INSERT_NOTES_CATEGORY:
      return [...state, payload];
    case USER_LOGOUT:
      return INITIAL_STATE;
    default:
      return state;
  }
};
