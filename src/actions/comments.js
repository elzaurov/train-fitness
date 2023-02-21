import moment from 'moment';
import {auth, database} from '../config';
import {handleError} from './error';

import {UPDATE_NOTE, UPDATE_LATEST_NOTE} from './notes';

export const LOAD_COMMENTS = 'LOAD_COMMENTS';
export const INSERT_COMMENT = 'INSERT_COMMENT';
export const UPDATE_COMMENT = 'UPDATE_COMMENT';
export const DELETE_COMMENT = 'DELETE_COMMENT';

export const loadComments = (videoId) => async (dispatch) => {
  try {
    const url = '/authentication/allMembers/comments';

    const snap = await database
      .ref(url)
      .orderByChild('videoId')
      .equalTo(videoId)
      .once('value');

    const comments = Object.values(snap.val() || []).sort((a, b) =>
      a.createdAt > b.createdAt ? -1 : 1,
    );

    dispatch({
      type: LOAD_COMMENTS,
      payload: comments,
    });

    return comments;
  } catch (error) {
    dispatch(handleError(error));
  }
};

export const loadComment = (key) => async (dispatch, getState) => {
  try {
    const {comments} = getState();
    let comment = comments.filter((c) => c.key === key)[0];

    if (!comment) {
      const url = `/authentication/allMembers/comments/${key}`;

      const snap = await database.ref(url).once('value');
      comment = snap.val();

      dispatch({
        type: LOAD_COMMENTS,
        payload: [comment],
      });
    }

    return comment;
  } catch (error) {
    dispatch(handleError(error));
  }
};

export const loadCommentToNotification = (key) => async (dispatch) => {
  try {
    const url = `/authentication/allMembers/comments/${key}`;

    const snap = await database.ref(url).once('value');
    const comment = snap.val();

    return comment;
  } catch (error) {
    dispatch(handleError(error));
  }
};

export const insertComment = (comment) => async (dispatch) => {
  try {
    const {uid} = auth.currentUser;
    const url = `/authentication/userOwned/comments/${uid}`;
    const newComment = {
      ...comment,
      createdAt: moment().valueOf(),
      uid,
    };

    await database.ref(url).push(newComment);

    const snap = await database
      .ref(url)
      .orderByChild('createdAt')
      .limitToLast(1)
      .once('value');

    const comments = Object.entries(snap.val() || []).map(([key, value]) => ({
      key,
      ...value,
    }));

    const commentItem = comments[0];

    dispatch({
      type: INSERT_COMMENT,
      payload: commentItem,
    });

    return commentItem;
  } catch (error) {
    dispatch(handleError(error));
  }
};

export const likeDislikeComment = (comment, userId, action) => async (
  dispatch,
) => {
  try {
    const idToken = await auth.currentUser.getIdToken(true);
    const type = comment.videoId ? 'comments' : 'notes';
    const url = `/authentication/userWritable/like-dislike-${type}`;
    const newComment = {...comment};

    await database.ref(url).push({
      idToken,
      userId,
      comment: newComment,
      action,
    });

    if (type === 'comments') {
      dispatch({
        type: UPDATE_COMMENT,
        payload: newComment,
      });
    } else {
      dispatch({
        type: UPDATE_NOTE,
        payload: newComment,
      });

      dispatch({
        type: UPDATE_LATEST_NOTE,
        payload: newComment,
      });
    }

    return newComment;
  } catch (error) {
    dispatch(handleError(error));
  }
};

export const updateComment = (comment) => async (dispatch) => {
  try {
    const {uid} = auth.currentUser;
    const type = comment.videoId ? 'comments' : 'notes';
    const url = `/authentication/userOwned/${type}/${uid}/${comment.key}`;
    const editedAt = moment().valueOf();
    const newComment = {...comment};

    await database.ref(url).update({...newComment, editedAt});

    let noteDispatchType = UPDATE_NOTE;

    if (comment.uid && comment.uid !== uid) {
      noteDispatchType = UPDATE_LATEST_NOTE;
    }

    dispatch({
      type: type === 'comments' ? UPDATE_COMMENT : noteDispatchType,
      payload: {...comment, editedAt},
    });

    return {...comment, editedAt};
  } catch (error) {
    dispatch(handleError(error));
  }
};

export const deleteComment = (key, videoId) => async (dispatch) => {
  try {
    const {uid} = auth.currentUser;
    const url = `/authentication/userOwned/comments/${uid}/${key}`;
    // const deleteUrl = '/authentication/listeners/delete-note';

    await database.ref(url).remove();

    // if (!videoId) {
    //   await base.push(deleteUrl, { data: { noteId: key, userId: uid } });
    // }

    dispatch({
      type: DELETE_COMMENT,
      payload: key,
    });
  } catch (error) {
    dispatch(handleError(error));
  }
};
