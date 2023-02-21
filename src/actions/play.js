import {functions} from '../config';
import {handleError} from './error';

export const SET_VIMEO_VIDEO_URL = 'SET_VIMEO_VIDEO_URL';
export const SET_LIMELIGHT_VIDEO_URL = 'SET_LIMELIGHT_VIDEO_URL';

export const getVimeoPlayUrl = (videoId) => async (dispatch) => {
  try {
    const getUrl = functions.httpsCallable('getVimeoPlayUrl');
    const {data: url} = await getUrl(videoId);

    dispatch({
      type: SET_VIMEO_VIDEO_URL,
      payload: {[videoId]: url},
    });
  } catch (error) {
    dispatch(handleError(error));
  }
};

export const getLimelightPlayUrl = (videoId) => async (dispatch) => {
  try {
    const getUrl = functions.httpsCallable('getLimelightPlayUrl');
    const {data: url} = await getUrl(videoId);

    dispatch({
      type: SET_LIMELIGHT_VIDEO_URL,
      payload: {[videoId]: url},
    });
  } catch (error) {
    dispatch(handleError(error));
  }
};
