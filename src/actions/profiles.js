import {database} from '../config';
import {handleError} from './error';

export const LOAD_USER_PROFILE = 'LOAD_USER_PROFILE';

export const loadUserProfile = uid => async (dispatch, getState) => {
    try {
        const {profiles} = getState();
        const url = `/authentication/allMembers/profiles/${uid}`;
        const adminUrl = `/authentication/admins/${uid}`;

        if (profiles && profiles[uid]) {
            return profiles[uid];
        }

        const snaps = await Promise.all([
            database.ref(url).once('value'),
            database.ref(adminUrl).once('value'),
        ]);

        const [profile, isAdmin] = snaps.map(snap => snap.val());

        dispatch({
            type: LOAD_USER_PROFILE,
            payload: {[uid]: {...profile, isAdmin: isAdmin === true, uid}},
        });

        return {...profile, uid};
    } catch (error) {
        dispatch(handleError(error));
    }
};
