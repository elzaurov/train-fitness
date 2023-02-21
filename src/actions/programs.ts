import moment from 'moment';
import {auth, database} from '../config';
import {handleError} from './error';
import {ICurrentProgram, IProgram} from './types';

export const LOAD_PROGRAM = 'LOAD_PROGRAM';

export const loadProgram = (id: string) => async (dispatch, getState) => {
    try {
        const url = `/authentication/allMembers/videos/programs/${id}`;
        const programsCache: IProgram[] = getState().programs;

        if (programsCache[id]) {
            return programsCache[id];
        }

        const snap = await database.ref(url).once('value');
        const program: IProgram = snap.val();

        programsCache[id] = {...program, key: id};

        dispatch({
            type: LOAD_PROGRAM,
            payload: programsCache,
        });

        return programsCache[id];
    } catch (error) {
        dispatch(handleError(error));
        return error;
    }
};

export const loadPrograms = () => async (dispatch, getState) => {
    try {
        const url = '/authentication/allMembers/videos/programs';
        const programsCache: IProgram[] = getState().programs;

        if (programsCache && programsCache.length > 0) {
            return programsCache;
        }

        const snap = await database.ref(url).once('value');
        const programs: IProgram[] = snap.val();

        dispatch({
            type: LOAD_PROGRAM,
            payload: programs,
        });

        return programs;
    } catch (error) {
        dispatch(handleError(error));
        return error;
    }
};

export const loadCurrentProgram = id => async dispatch => {
    try {
        const {uid} = auth?.currentUser!;
        const url = `/authentication/userOwned/currentPrograms/${uid}/${id}`;

        const snap = await database.ref(url).once('value');
        const currentProgram: ICurrentProgram = snap.val();

        if (!currentProgram || Object.keys(currentProgram).length === 0) {
            return {nextWorkout: 0, key: id};
        }

        return {...currentProgram, key: id};
    } catch (error) {
        dispatch(handleError(error));
        return error;
    }
};

export const updateCurrentProgram =
    (currentProgram: ICurrentProgram) => async dispatch => {
        try {
            const {uid} = auth?.currentUser!;
            const url = `/authentication/userOwned/currentPrograms/${uid}/${currentProgram.key}`;
            let data = currentProgram;

            if (!data || Object.keys(data).length === 0) {
                data = {
                    nextWorkout: 1,
                    lastCompleteAt: moment().valueOf(),
                };
            } else {
                data = {
                    nextWorkout: data.nextWorkout + 1,
                    lastCompleteAt: moment().valueOf(),
                };
            }

            await database.ref(url).set(data);

            return null;
        } catch (error) {
            dispatch(handleError(error));
            return error;
        }
    };
