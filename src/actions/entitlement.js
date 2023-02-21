import {database, auth} from '../config';
import {handleError} from './error';
import {ENTITLEMENT_STATUS_FREE} from '../constants';

export const SET_ENTITLEMENT = 'SET_ENTITLEMENT';

export const loadEntitlement = () => async dispatch => {
  try {
    const {uid} = auth.currentUser;
    const url = `/authentication/userReadable/entitlements/${uid}`;

    const snap = await database.ref(url).once('value');

    const entitlement = snap.val() || {
      status: ENTITLEMENT_STATUS_FREE,
    };

    dispatch({
      type: SET_ENTITLEMENT,
      payload: entitlement,
    });

    return entitlement;
  } catch (error) {
    handleError(error);
  }
};
