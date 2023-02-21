import {database} from '../config';
import {parseTeaserPath} from '../utils/helpers';
import {handleError} from './error';

export const LOAD_TEASERS = 'LOAD_TEASERS';
export const LOAD_TEASER = 'LOAD_TEASER';

export const loadTeasers = (type) => async (dispatch, getState) => {
  try {
    const url = `/authentication/allMembers/teasers/${type}`;
    const programsUrl = '/authentication/allMembers/teasers/programs';

    const teasersCache = getState().teasers;

    if (teasersCache[type]) {
      return teasersCache[type];
    }

    const snap = await database.ref(url).once('value');

    let teasers = Object.entries(snap.val() || []).map(([key, value]) => ({
      key,
      ...value,
    }));

    if (type === 'workouts') {
      let {programs} = teasersCache;

      if (!programs) {
        const programsSnap = await database.ref(programsUrl).once('value');

        programs = Object.entries(
          programsSnap.val() || [],
        ).map(([key, value]) => ({key, ...value}));

        teasersCache.programs = programs;
      }

      const workoutIds = programs
        .map(({workouts}) => workouts)
        .reduce((w1, w2) => [...w1, ...w2]);

      teasers = teasers.filter(({key}) => !workoutIds.includes(key));
    }

    teasersCache[type] = teasers.sort((t1, t2) => {
      if (t1.code && t2.code) {
        return t1.code > t2.code ? 1 : -1;
      }

      return t1.name > t2.name ? 1 : -1;
    });

    dispatch({
      type: LOAD_TEASERS,
      payload: teasersCache,
    });

    return teasersCache[type];
  } catch (error) {
    dispatch(handleError(error));
  }
};

export const loadTeaser = (path) => async (dispatch, getState) => {
  try {
    const {teasers} = getState();
    let teaser;

    const {type, id} = parseTeaserPath(path);

    if (teasers[type] && teasers[type][id]) {
      teaser = teasers[type][id];
    } else {
      const url = `/authentication/allMembers/teasers/${path}`;

      const snap = await database.ref(url).once('value');
      const data = snap.val();

      teaser = {
        ...data,
        key: id,
      };

      dispatch({
        type: LOAD_TEASER,
        payload: {[type]: [teaser]},
      });
    }

    return teaser;
  } catch (error) {
    dispatch(handleError(error));
  }
};
