import {database} from '../config';
import {handleError} from './error';

export const LOAD_REQUIREMENTS = 'LOAD_REQUIREMENTS';

export const loadRequirements = () => async (dispatch, getState) => {
  try {
    const url = '/authentication/allMembers/requirements';
    const requirementsCache = getState().requirements;

    if (requirementsCache) {
      return requirementsCache;
    }

    const snap = await database.ref(url).once('value');
    const requirements = snap.val();

    dispatch({
      type: LOAD_REQUIREMENTS,
      payload: requirements,
    });

    return requirements;
  } catch (error) {
    dispatch(handleError(error));
  }
};
