export const UPDATE_FULLSCREEN = 'UPDATE_FULLSCREEN';
export const UPDATE_VIDEO_GESTURE_LOCK_TOGGLE = 'UPDATE_VIDEO_GESTURE_LOCK_TOGGLE';

export const updateFullscreen = (fullscreen) => (dispatch) => {
  dispatch({
    type: UPDATE_FULLSCREEN,
    payload: { fullscreen },
  });
};


export const updateVideoGestureLockToggle = (videoLockGesture) => (dispatch) => {
  dispatch({
    type: UPDATE_VIDEO_GESTURE_LOCK_TOGGLE,
    payload: { videoLockGesture },
  });
};
