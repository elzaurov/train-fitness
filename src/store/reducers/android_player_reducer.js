import {USER_LOGOUT, UPDATE_FULLSCREEN, UPDATE_VIDEO_GESTURE_LOCK_TOGGLE} from '../../actions';

const INITIAL_STATE = {
  fullscreen: false,
  videoLockGesture: false,
};

export default (state = INITIAL_STATE, {type, payload}) => {
  switch (type) {
    case UPDATE_FULLSCREEN:
      return {
        ...state, 
        ...payload
      }
    case USER_LOGOUT:
      return INITIAL_STATE;
    case UPDATE_VIDEO_GESTURE_LOCK_TOGGLE:
      return {
        ...state, 
        ...payload
      }
    default:
      return state;
  }
};
