import moment from 'moment';
import {auth, database} from '../config';
import {handleError} from './error';

export const LOAD_NOTIFICATIONS = 'LOAD_NOTIFICATIONS';
export const LOAD_MORE_NOTIFICATIONS = 'LOAD_MORE_NOTIFICATIONS';
export const UPDATE_NOTIFICATION = 'UPDATE_NOTIFICATION';

export const loadNotifications = (createdAt) => async (dispatch) => {
  try {
    const {uid} = auth.currentUser;
    const url = `/authentication/userReadable/notifications/${uid}`;

    const snap = await database
      .ref(url)
      .orderByChild('createdAt')
      .limitToLast(10)
      .endAt(createdAt || moment().valueOf())
      .once('value');

    const notifications = Object.entries(
      snap.val() || [],
    ).map(([key, value]) => ({key, ...value}));

    if (createdAt) {
      dispatch({
        type: LOAD_MORE_NOTIFICATIONS,
        payload: notifications,
      });
    } else {
      dispatch({
        type: LOAD_NOTIFICATIONS,
        payload: notifications,
      });
    }

    return notifications;
  } catch (error) {
    dispatch(handleError(error));
  }
};

export const updateNotification = (notification) => async (dispatch) => {
  try {
    const url = '/authentication/userWritable/update-notification';
    const idToken = await auth.currentUser.getIdToken(true);

    await database.ref(url).push({idToken, notification});

    dispatch({
      type: UPDATE_NOTIFICATION,
      payload: notification,
    });

    return null;
  } catch (error) {
    dispatch(handleError(error));
  }
};
