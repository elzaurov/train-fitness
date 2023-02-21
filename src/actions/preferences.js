import {auth} from '../config';
import {preferencesRef} from '../config';
import {handleError} from './error';

export const LOAD_PREFERENCES = 'LOAD_PREFERENCES';
export const UPDATE_PREFERENCES = 'UPDATE_PREFERENCES';

export const loadPreferences = () => async (dispatch) => {
  try {
    const userId = auth.currentUser.uid;

    const doc = await preferencesRef.doc(userId).get();
    const preferences = doc.data();

    dispatch({
      type: LOAD_PREFERENCES,
      payload: preferences || {},
    });

    return preferences;
  } catch (error) {
    dispatch(handleError(error));
  }
};

export const updatePreferences = (newPreferences) => async (
  dispatch,
  getState,
) => {
  try {
    const userId = auth.currentUser.uid;
    const {preferences} = getState();

    if (preferences && Object.keys(preferences).length > 0) {
      await preferencesRef.doc(userId).update(newPreferences);
    } else {
      await preferencesRef.doc(userId).set(newPreferences);
    }

    dispatch({
      type: UPDATE_PREFERENCES,
      payload: newPreferences,
    });

    return null;
  } catch (error) {
    dispatch(handleError(error));
  }
};
