import moment from 'moment';
import {auth, database} from '../config';
import {handleError} from './error';

export const UPDATE_LOGIN_TIME = 'UPDATE_LOGIN_TIME';

export const updateLoginTime = () => async (dispatch) => {
  try {
    const url = 'authentication/userWritable/update-logins';
    const idToken = await auth.currentUser.getIdToken(true);

    const dayTime = moment().startOf('day').valueOf();
    const currentTime = moment().valueOf();

    await database.ref(url).push({
      idToken,
      dayTime,
      currentTime,
    });
  } catch (error) {
    dispatch(handleError(error));
  }
};
