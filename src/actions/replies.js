import moment from 'moment';
import {auth, database} from '../config';
import {handleError} from './error';

export const LOAD_REPLIES = 'LOAD_REPLIES';
export const INSERT_REPLY = 'INSERT_REPLY';
export const UPDATE_REPLY = 'UPDATE_REPLY';
export const DELETE_REPLY = 'DELETE_REPLY';

export const loadReplies = (commentId) => async (dispatch) => {
  try {
    const url = '/authentication/allMembers/replies';

    const snap = await database
      .ref(url)
      .orderByChild('commentId')
      .equalTo(commentId || '')
      .once('value');

    const replies = Object.entries(snap.val() || []).map(([key, value]) => ({
      key,
      ...value,
    }));

    dispatch({
      type: LOAD_REPLIES,
      payload: {commentId, replies},
    });
  } catch (error) {
    dispatch(handleError(error));
  }
};

export const loadReply = (key) => async (dispatch, getState) => {
  try {
    const {replies} = getState();
    const reply = replies.filter((c) => c.key === key)[0];

    return reply;
  } catch (error) {
    dispatch(handleError(error));
  }
};

export const insertReply = ({type, videoId, reply}) => async (dispatch) => {
  try {
    const {uid} = auth.currentUser;
    const url = `/authentication/userOwned/replies/${uid}`;

    const newReply = {
      ...reply,
      createdAt: moment().valueOf(),
      uid,
    };

    if (type) {
      newReply.type = type;
    }

    if (videoId) {
      newReply.videoId = videoId;
    }

    await database.ref(url).push(newReply);

    const snap = await database
      .ref(url)
      .orderByChild('createdAt')
      .limitToLast(1)
      .once('value');

    const replies = Object.entries(snap.val() || []).map(([key, value]) => ({
      key,
      ...value,
    }));

    const replyItem = replies[0];

    dispatch({
      type: INSERT_REPLY,
      payload: replyItem,
    });

    return replyItem;
  } catch (error) {
    dispatch(handleError(error));
  }
};

export const updateReply = (reply) => async (dispatch) => {
  try {
    const {uid} = auth.currentUser;
    const url = `/authentication/userOwned/replies/${uid}/${reply.key}`;
    const editedAt = moment().valueOf();

    await database.ref(url).update({...reply, editedAt});

    dispatch({
      type: UPDATE_REPLY,
      payload: {...reply, editedAt},
    });

    return {...reply, editedAt};
  } catch (error) {
    dispatch(handleError(error));
  }
};

export const likeDislikeReply = (reply, userId, action) => async (dispatch) => {
  try {
    const idToken = await auth.currentUser.getIdToken(true);
    const url = '/authentication/userWritable/like-dislike-replies';

    await database.ref(url).push({
      idToken,
      userId,
      reply,
      action,
    });

    dispatch({
      type: UPDATE_REPLY,
      payload: reply,
    });

    return reply;
  } catch (error) {
    dispatch(handleError(error));
  }
};

export const deleteReply = (key) => async (dispatch, getState) => {
  try {
    const {uid} = auth.currentUser;
    const replyUrl = `/authentication/userOwned/replies/${uid}/${key}`;

    const {replies, latestNotes} = getState();

    const reply = replies.filter((r) => r.key === key)[0];
    const note = latestNotes.filter((n) => n.key === reply.commentId)[0];

    await database.ref(replyUrl).remove();

    dispatch({
      type: DELETE_REPLY,
      payload: {replyId: key, noteId: note.key},
    });

    return null;
  } catch (error) {
    dispatch(handleError(error));
  }
};
