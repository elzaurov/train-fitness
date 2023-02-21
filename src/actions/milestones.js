import {auth, database} from '../config';
import {handleError} from './error';
import {AppStorage} from '../utils';

export const SET_MILESTONES = 'SET_MILESTONES';
const storage = new AppStorage('milestones_reducer');

export const loadMilestonesFromStorage = () => async (dispatch) => {
  try {
    const milestones = await storage.get();
    dispatch({
      type: SET_MILESTONES,
      payload: milestones,
    });
  } catch (error) {
    dispatch(handleError(error));
  }
};

export const loadMilestones = () => async (dispatch) => {
  try {
    const {uid} = auth.currentUser;
    const url = `/authentication/userOwned/milestones/${uid}`;

    const snap = await database.ref(url).once('value');
    const milestones = snap.val() ?? {};

    dispatch({
      type: SET_MILESTONES,
      payload: milestones,
    });

    return milestones;
  } catch (error) {
    dispatch(handleError(error));
  }
};

export const updateMilestones = (milestones) => async (dispatch) => {
  try {
    const {uid} = auth.currentUser;
    const url = `/authentication/userOwned/milestones/${uid}`;

    await database.ref(url).update(milestones);

    dispatch({
      type: SET_MILESTONES,
      payload: milestones,
    });
  } catch (error) {
    dispatch(handleError(error));
  }
};

export const assertMilestone = (milestone) => async (dispatch, getState) => {
  try {
    if (!getState()?.milestones?.[milestone]) {
      dispatch(updateMilestones({[milestone]: true}));
    }
  } catch (error) {
    dispatch(handleError(error));
  }
};
