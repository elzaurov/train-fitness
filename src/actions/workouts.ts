import {database} from '../config';
import {handleError} from './error';
import {IWorkout} from './types';

export const LOAD_WORKOUT = 'LOAD_WORKOUT';

export const loadWorkout =
    (id: number | string) => async (dispatch, getState) => {
        try {
            const url = `/authentication/allMembers/videos/workouts/${id}`;
            const workoutsCache: IWorkout[] = getState().workouts;

            let workout: IWorkout;

            if (workoutsCache[id]) {
                workout = workoutsCache[id];
            } else {
                const snap = await database.ref(url).once('value');
                workout = snap.val();
            }

            workoutsCache[id] = {...workout, key: id};

            dispatch({
                type: LOAD_WORKOUT,
                payload: workoutsCache,
            });

            return workoutsCache[id];
        } catch (error) {
            dispatch(handleError(error));
            return error;
        }
    };

export const loadWorkouts = () => async (dispatch, getState) => {
    try {
        const url = '/authentication/allMembers/videos/workouts';
        const workoutsCache: IWorkout[] = getState().workouts;

        if (workoutsCache && workoutsCache.length > 0) {
            return workoutsCache;
        }

        const snap = await database.ref(url).once('value');
        const workoutsLoaded: IWorkout[] = snap.val();

        const workoutKeys = Object.keys(workoutsLoaded);
        const workouts = workoutKeys.map(key => ({
            ...workoutsLoaded[key],
            key,
        }));

        dispatch({
            type: LOAD_WORKOUT,
            payload: workouts,
        });

        return workouts;
    } catch (error) {
        dispatch(handleError(error));
        return error;
    }
};
