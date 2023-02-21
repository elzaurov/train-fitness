import {database} from '../config';
import {handleError} from './error';

export const LOAD_LEARNING_VIDEOS = 'LOAD_LEARNING_VIDEOS';
export const LOAD_SINGLE_LEARNING_VIDEO = 'LOAD_SINGLE_LEARNING_VIDEO';

export const loadLearningVideos = (type) => async (dispatch, getState) => {
  try {
    const url = `/authentication/allMembers/videos/${type}`;
    const learningVideosCache = getState().learningVideos;

    if (learningVideosCache[type]) {
      return learningVideosCache[type];
    }

    const snap = await database
      .ref(url)
      .orderByChild('createdAt')
      .once('value');

    const learningVideos = Object.entries(
      snap.val() || [],
    ).map(([key, value]) => ({key, ...value}));

    learningVideosCache[type] = learningVideos.reverse();

    dispatch({
      type: LOAD_LEARNING_VIDEOS,
      payload: learningVideosCache,
    });

    return learningVideosCache[type];
  } catch (error) {
    dispatch(handleError(error));
  }
};

export const loadSingleLearningVideo = (type, key) => async (
  dispatch,
  getState,
) => {
  try {
    const {learningVideos} = getState();
    let currentVideo;

    if (learningVideos && learningVideos[type]) {
      currentVideo = learningVideos[type].find((video) => video.key === key);
    }

    if (!currentVideo) {
      const url = `/authentication/allMembers/videos/${type}/${key}`;
      const snap = await database.ref(url).once('value');
      currentVideo = snap.val();
    }

    dispatch({
      type: LOAD_SINGLE_LEARNING_VIDEO,
      payload: {...learningVideos, currentVideo: {...currentVideo, key, type}},
    });

    return {...currentVideo, key, type};
  } catch (error) {
    dispatch(handleError(error));
  }
};
