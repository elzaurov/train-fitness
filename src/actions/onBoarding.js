import {auth, database} from '../config';
import {handleError} from './error';

export const LOAD_ON_BOARDING = 'LOAD_ON_BOARDING';
export const UPDATE_ON_BOARDING = 'UPDATE_ON_BOARDING';
export const RESET_ON_BOARDING = 'RESET_ON_BOARDING';

export const loadOnBoarding = () => async (dispatch) => {
  try {
    const {uid} = auth.currentUser;
    const url = `/authentication/userOwned/onBoarding/${uid}`;

    const snap = await database.ref(url).once('value');
    const onBoarding = snap.val();

    dispatch({
      type: LOAD_ON_BOARDING,
      payload: onBoarding,
    });

    return onBoarding;
  } catch (error) {
    dispatch(handleError(error));
  }
};

export const updateOnBoarding = (onBoardingData) => async (dispatch) => {
  try {
    const {uid} = auth.currentUser;
    const url = `/authentication/userOwned/onBoarding/${uid}`;

    await database.ref(url).update(onBoardingData);

    dispatch({
      type: UPDATE_ON_BOARDING,
      payload: onBoardingData,
    });

    return onBoardingData;
  } catch (error) {
    dispatch(handleError(error));
  }
};

export const resetOnBoarding = () => async (dispatch) => {
  try {
    dispatch({
      type: RESET_ON_BOARDING,
    });
  } catch (error) {
    dispatch(handleError(error));
  }
};
