import {auth, database} from '../config';
import {handleError} from './error';

export const LOAD_UNREAD_NOTIFICATIONS = 'LOAD_UNREAD_NOTIFICATIONS';

export const loadUnreadNotifications = () => async (dispatch) => {
  try {
    const {uid} = auth.currentUser;
    const url = `/authentication/userReadable/notifications/${uid}`;

    const snap = await database
      .ref(url)
      .orderByValue('read')
      .equalTo(false)
      .once('value');

    const notifications = snap.val();

    dispatch({
      type: LOAD_UNREAD_NOTIFICATIONS,
      payload: notifications || [],
    });

    return notifications;
  } catch (error) {
    dispatch(handleError(error));
  }
};
