import {database, auth, messaging} from '../config';
import {handleError} from './error';

export const SET_MESSAGING_TOKEN = 'SET_MESSAGING_TOKEN';

export const updateMessagingToken = () => async (dispatch) => {
  try {
    if (!auth.currentUser) {
      return;
    }

    const {uid} = auth.currentUser;
    const fcmToken = await messaging.getToken();

    const URL = `/authentication/userOwned/profile/${uid}`;
    await database.ref(URL).update({fcmToken});
  } catch (error) {
    dispatch(handleError(error));
  }
};
