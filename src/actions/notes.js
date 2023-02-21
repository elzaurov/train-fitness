import moment from 'moment';
import Mixpanel from 'react-native-mixpanel';
import {auth, database, functions} from '../config';
import {INSERT_LATEST_NOTE} from './latest_notes';
import {NOTES_COUNT, NOTE_SUBMITTED} from '../constants';
import {handleError} from './error';

export const LOAD_NOTES = 'LOAD_NOTES';
export const LOAD_NOTE = 'LOAD_NOTE';
export const INSERT_NOTE = 'INSERT_NOTE';
export const UPDATE_NOTE = 'UPDATE_NOTE';
export const UPDATE_LATEST_NOTE = 'UPDATE_LATEST_NOTE';
export const DELETE_NOTE = 'DELETE_NOTE';

export const loadNotes = () => async dispatch => {
    try {
        const {uid} = auth.currentUser;
        const url = `/authentication/userOwned/notes/${uid}`;

        const snap = await database
            .ref(url)
            .orderByChild('createdAt')
            .once('value');

        const notes = Object.entries(snap.val() || []).map(([key, value]) => ({
            key,
            ...value,
        }));

        dispatch({
            type: LOAD_NOTES,
            payload: notes,
        });

        return notes;
    } catch (error) {
        dispatch(handleError(error));
    }
};

export const loadNoteToNotification = key => async dispatch => {
    try {
        const url = `/authentication/allMembers/notes/${key}`;
        const snap = await database.ref(url).once('value');
        const note = snap.val();

        return note;
    } catch (error) {
        dispatch(handleError(error));
    }
};

export const loadNote = id => async (dispatch, getState) => {
    try {
        const {notes} = getState();
        const existedNote = notes.filter(({key}) => key === id)[0];

        if (existedNote) {
            return existedNote;
        }

        // const { uid } = auth.currentUser;
        const url = `/authentication/allMembers/notes/${id}`;

        const snap = await database.ref(url).once('value');
        const note = snap.val();

        dispatch({
            type: LOAD_NOTE,
            payload: {...note, key: id},
        });

        return {...note, key: id};
    } catch (error) {
        dispatch(handleError(error));
    }
};

export const insertNote = note => async (dispatch, getState) => {
    try {
        const {uid} = auth.currentUser;
        const url = `/authentication/userOwned/notes/${uid}`;
        const gamificationUrl = `/authentication/userReadable/gamification/${uid}`;
        const {notesCategories} = getState();
        const category = notesCategories.filter(
            ({key}) => key === note.category,
        )[0];
        const categoryName = category ? category.label : null;
        const createdAt = moment().utc().format('x');
        const editedAt = createdAt;
        const categoryFeeling =
            note.category && note.feeling
                ? `${note.category}_${note.feeling}`
                : null;
        const newNote = {
            ...note,
            createdAt,
            editedAt,
            categoryName,
            categoryFeeling,
            uid,
        };

        const gamificationSnap = await database
            .ref(gamificationUrl)
            .once('value');
        const {level} = gamificationSnap.val();

        await database.ref(url).push({...newNote, userLevel: level});

        const snap = await database
            .ref(url)
            .orderByChild('createdAt')
            .limitToLast(1)
            .once('value');

        const notes = Object.entries(snap.val() || []).map(([key, value]) => ({
            key,
            ...value,
        }));

        const noteItem = notes[0];

        dispatch({
            type: INSERT_NOTE,
            payload: noteItem,
        });

        if (!newNote.private) {
            dispatch({
                type: INSERT_LATEST_NOTE,
                payload: noteItem,
            });
        }

        Mixpanel.track(NOTE_SUBMITTED);
        Mixpanel.increment(NOTES_COUNT, 1);

        return noteItem;
    } catch (error) {
        dispatch(handleError(error));
    }
};

export const updateNote = note => async dispatch => {
    try {
        const {uid} = auth.currentUser;
        const url = `/authentication/userOwned/notes/${uid}/${note.key}`;
        const editedAt = moment().utc().format('x');

        await database.ref(url).update({...note, editedAt});
        const snap = await database.ref(url).once('value');
        const noteFromDB = snap.val();

        if (note.uid && note.uid !== uid) {
            dispatch({
                type: UPDATE_LATEST_NOTE,
                payload: {...noteFromDB, editedAt},
            });
        } else {
            dispatch({
                type: UPDATE_NOTE,
                payload: {...noteFromDB, editedAt},
            });
        }

        return {...noteFromDB, editedAt};
    } catch (error) {
        dispatch(handleError(error));
    }
};

export const deleteNote = key => async dispatch => {
    try {
        const {uid} = auth.currentUser;
        const url = `/authentication/userOwned/notes/${uid}/${key}`;
        // const deleteUrl = '/authentication/listeners/delete-note';
        const noteId = uid;

        await database.ref(url).remove();
        // await base.push(deleteUrl, {data: {noteId, userId: uid}});

        dispatch({
            type: DELETE_NOTE,
            payload: key,
        });
    } catch (error) {
        dispatch(handleError(error));
    }

    return null;
};

export const deleteNoteAdmin =
    ({key, uid}) =>
    async dispatch => {
        try {
            const deleteNoteAdminCallable =
                functions.httpsCallable('deleteNoteAdmin');

            await deleteNoteAdminCallable({key, uid});

            dispatch({
                type: DELETE_NOTE,
                payload: key,
            });
        } catch (error) {
            dispatch(handleError(error));
        }
    };
