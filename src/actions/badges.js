import {auth, database} from '../config';
import moment from 'moment';
import handleError from './error';

export const LOAD_BADGES = 'LOAD_BADGES';
export const LOAD_BADGE = 'LOAD_BADGE';
export const ADD_BADGE = 'ADD_BADGE';

export const loadBadges = () => async (dispatch, getState) => {
  try {
    const {uid} = auth.currentUser;
    const url = `/authentication/userOwned/badges/${uid}`;

    const snap = await database.ref(url).once('value');

    const badges = Object.entries(snap.val() || []).map(([key, value]) => ({
      key,
      ...value,
    }));

    dispatch({
      type: LOAD_BADGES,
      payload: badges,
    });

    return badges;
  } catch (error) {
    dispatch(handleError(error));
  }
};

export const loadBadge = (id) => async (dispatch, getState) => {
  try {
    const url = `/authentication/allMembers/badges/courses/${id}`;

    const snap = await database.ref(url).once('value');
    const badge = snap.val();

    return badge;
  } catch (error) {
    dispatch(handleError(error));
  }
};

export const addBadge = (badgeId, type) => async (dispatch, getState) => {
  try {
    const {uid} = auth.currentUser;
    const url = `/authentication/userOwned/badges/${uid}/${badgeId}`;

    const badgesCache = getState().badges;

    if (badgesCache[badgeId]) {
      return badgesCache[badgeId];
    }

    const newBadge = await database.ref(url).set({
      createdAt: moment.valueOf(),
      type: type,
    });

    dispatch({
      type: ADD_BADGE,
      payload: newBadge,
    });

    return newBadge;
  } catch (error) {
    dispatch(handleError(error));
  }
};
