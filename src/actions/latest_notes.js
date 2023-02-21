import {database} from '../config';
import {handleError} from './error';
import {NUMBER_OF_ITEMS} from '../constants';

export const LOAD_LATEST_NOTES = 'LOAD_LATEST_NOTES';
export const LOAD_LATEST_NOTE = 'LOAD_LATEST_NOTE';
export const LOAD_MORE_LATEST_NOTES = 'LOAD_MORE_LATEST_NOTES';
export const INSERT_LATEST_NOTE = 'INSERT_LATEST_NOTE';
export const DELETE_LATEST_NOTE = 'DELETE_LATEST_NOTE';

export const loadLatestNotes = () => async dispatch => {
    try {
        const url = '/authentication/allMembers/notes';

        const snap = await database
            .ref(url)
            .orderByChild('editedAt')
            .limitToLast(NUMBER_OF_ITEMS)
            .once('value');

        const notes = Object.entries(snap.val() || []).map(([key, value]) => ({
            key,
            ...value,
        }));

        const latestNotes = notes
            .reverse()
            .filter(n => !!n.editedAt)
            .sort((a, b) => b.editedAt - a.editedAt);

        dispatch({
            type: LOAD_LATEST_NOTES,
            payload: latestNotes,
        });

        return latestNotes;
    } catch (error) {
        dispatch(handleError(error));
    }
};

export const loadLatestNote = noteId => async (dispatch, getState) => {
    try {
        const url = `/authentication/allMembers/notes/${noteId}`;
        const {latestNotes} = getState();
        const existedNote = latestNotes.filter(n => n.key === noteId)[0];

        if (existedNote) {
            dispatch({
                type: LOAD_LATEST_NOTE,
                payload: existedNote,
            });

            return existedNote;
        }

        const snap = await database.ref(url).once('value');
        const note = snap.val();

        dispatch({
            type: LOAD_LATEST_NOTE,
            payload: {...note, key: noteId},
        });

        return {...note, key: noteId};
    } catch (error) {
        dispatch(handleError(error));
    }
};

export const loadMoreLatestNotes = request => async dispatch => {
    try {
        const url = '/authentication/allMembers/notes';

        const snap = await database
            .ref(url)
            .orderByChild('editedAt')
            .endAt(request.latestEditedAt - 1)
            .limitToLast(NUMBER_OF_ITEMS)
            .once('value');

        const notes = Object.entries(snap.val() || []).map(([key, value]) => ({
            key,
            ...value,
        }));

        const latestNotes = notes
            .reverse()
            .filter(n => !!n.editedAt)
            .sort((a, b) => b.editedAt - a.editedAt);

        dispatch({
            type: LOAD_MORE_LATEST_NOTES,
            payload: latestNotes,
        });
        request.onSuccess(latestNotes);
        return latestNotes;
    } catch (error) {
        dispatch(handleError(error));
        request.onFail([]);
    }
};

export const watchDeleteLatestNotes = () => async dispatch => {
    try {
        const url = '/authentication/listeners/delete-note';

        const snap = await database.ref(url).once('value');
        const notes = Object.entries(snap.val() || []).map(([key, value]) => ({
            key,
            ...value,
        }));

        if (notes && notes.length > 0) {
            const {noteId} = notes[0];

            dispatch({
                type: DELETE_LATEST_NOTE,
                payload: noteId,
            });
        }
    } catch (error) {
        dispatch(handleError(error));
    }
};
