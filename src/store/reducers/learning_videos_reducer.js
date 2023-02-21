import {
  LOAD_LEARNING_VIDEOS,
  LOAD_SINGLE_LEARNING_VIDEO,
  USER_LOGOUT,
} from '../../actions';

const INITIAL_STATE = {};

export default (state = INITIAL_STATE, {type, payload}) => {
  switch (type) {
    case LOAD_SINGLE_LEARNING_VIDEO:
    case LOAD_LEARNING_VIDEOS:
      return {...payload};
    case USER_LOGOUT:
      return INITIAL_STATE;
    default:
      return state;
  }
};
