import {parseVideoPath} from '../utils/helpers';
import {loadCourse} from './courses';
import {handleError} from './error';
import {loadProgram} from './programs';
import {loadWorkout} from './workouts';

export const SET_ACTIVITY = 'SET_ACTIVITY';

export const loadActivity = (path: string) => async dispatch => {
    try {
        const {key, type} = parseVideoPath(path);

        let activity;

        switch (type) {
            case 'workout':
                activity = await dispatch(loadWorkout(key));
                break;
            case 'program':
                activity = await dispatch(loadProgram(key));
                break;

            default:
                activity = await dispatch(loadCourse(key));
                break;
        }

        const payload = {
            ...activity,
            id: key,
            key,
            type,
        };

        dispatch({
            type: SET_ACTIVITY,
            payload,
        });

        return payload;
    } catch (error) {
        handleError(error);
        return error;
    }
};
