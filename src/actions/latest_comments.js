import {database} from '../config';
import {LOAD_COMMENTS} from './comments';
import {handleError} from './error';

export const LOAD_LATEST_COMMENTS = 'LOAD_LATEST_COMMENTS';
export const INSERT_LATEST_COMMENT = 'INSERT_LATEST_COMMENT';

export const loadLatestComments = () => async (dispatch, getState) => {
  try {
    const url = '/authentication/allMembers/comments';

    const snap = await database
      .ref(url)
      .orderByChild('createdAt')
      .limitToLast(10)
      .once('value');

    const comments = Object.entries(snap.val() || []).map(([key, value]) => ({
      key,
      ...value,
    }));

    const latestComments = getState().latestComments.sort((a, b) =>
      a.createdAt > b.createdAt ? 1 : -1,
    );
    // .sort((a, b) => a.videoId > b.videoId ? 1 : -1);

    const lastIndex = latestComments.length - 1;
    const lastCommentIndex = comments.length - 1;
    let canDispatch = false;

    // reload just if someone delete a comment
    if (latestComments && latestComments.length > 0) {
      if (
        comments[lastCommentIndex].createdAt <=
        latestComments[lastIndex].createdAt
      ) {
        canDispatch = true;
      } else {
        dispatch({
          type: INSERT_LATEST_COMMENT,
          payload: comments[lastCommentIndex],
        });
      }
    } else {
      canDispatch = true;
    }

    if (canDispatch) {
      const reverseComments = comments.reverse();

      dispatch({
        type: LOAD_LATEST_COMMENTS,
        payload: reverseComments,
      });

      dispatch({
        type: LOAD_COMMENTS,
        payload: reverseComments,
      });
    }

    return latestComments;
  } catch (error) {
    dispatch(handleError(error));
  }
};
