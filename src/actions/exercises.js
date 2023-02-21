import {database} from '../config';
import {handleError} from './error';

export const LOAD_EXERCISES = 'LOAD_EXERCISES';
export const LOAD_EXERCISE = 'LOAD_EXERCISE';

export const loadExercises = () => async (dispatch, getState) => {
  try {
    const url = '/authentication/allMembers/videos/exercises';
    const exercisesCache = getState().exercises;

    if (exercisesCache && exercisesCache.length > 0) {
      return exercisesCache;
    }

    const snap = await database
      .ref(url)
      .orderByChild('createdAt')
      .once('value');

    const exercises = Object.entries(snap.val() || []).map(([key, value]) => ({
      key,
      ...value,
    }));

    const resultExercises = exercises.reverse();

    dispatch({
      type: LOAD_EXERCISES,
      payload: resultExercises,
    });

    return resultExercises;
  } catch (error) {
    dispatch(handleError(error));
  }
};

export const loadExercise = (id) => async (dispatch, getState) => {
  try {
    const url = `/authentication/allMembers/videos/exercises/${id}`;
    const exercisesCache = getState().exercises;

    if (exercisesCache[id]) {
      return exercisesCache[id];
    }

    const snap = await database.ref(url).once('value');
    const exercise = snap.val();

    exercisesCache[id] = {...exercise, key: id};

    dispatch({
      type: LOAD_EXERCISES,
      payload: exercisesCache,
    });

    return exercisesCache[id];
  } catch (error) {
    dispatch(handleError(error));
  }
};
