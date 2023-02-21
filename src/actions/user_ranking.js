import {auth, database} from '../config';
import {handleError} from './error';

export const LOAD_USER_RANKING = 'LOAD_USER_RANKING';

export const loadUserRanking = () => async (dispatch) => {
  try {
    const {uid} = auth.currentUser;
    const url = '/authentication/allMembers/ranking';

    const snap = await database
      .ref(url)
      .equalTo(uid)
      .orderByChild('uid')
      .once('value');

    const userRanking = snap.val();

    if (userRanking && Object.keys(userRanking).length > 0) {
      const position = Number(Object.keys(userRanking)[0]);
      const ranking = {...userRanking[position], position: position + 1};

      dispatch({
        type: LOAD_USER_RANKING,
        payload: ranking,
      });

      return ranking;
    }
  } catch (error) {
    dispatch(handleError(error));
  }
};
