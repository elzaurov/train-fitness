import {database} from '../config';
import {handleError} from './error';

export const LOAD_SPECIALIST = 'LOAD_SPECIALIST';

export const loadSpecialist = (id) => async (dispatch, getState) => {
  try {
    const url = `/authentication/allMembers/specialists/${id}`;
    const specialistsCache = getState().specialists;

    if (specialistsCache[id]) {
      return specialistsCache[id];
    }

    const snap = await database.ref(url).once('value');
    const specialist = snap.val();

    specialistsCache[id] = {...specialist, key: id};

    dispatch({
      type: LOAD_SPECIALIST,
      payload: specialistsCache,
    });

    return specialistsCache[id];
  } catch (error) {
    dispatch(handleError(error));
  }
};
