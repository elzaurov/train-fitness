import moment from 'moment';
import {auth, database} from '../config';
import {getInitials, getFirstName} from '../utils/helpers';
import {handleError} from './error';
import {updateGamificationStreak} from './gamification';

export const LOAD_PROFILE = 'LOAD_PROFILE';
export const UPDATE_PROFILE = 'UPDATE_PROFILE';

export const loadProfile = () => async dispatch => {
    try {
        const {uid} = auth.currentUser;
        const profileUrl = `/authentication/userOwned/profile/${uid}`;
        const adminUrl = `/authentication/admins/${uid}`;

        const [profileSnap, isAdminSnap] = await Promise.all([
            database.ref(profileUrl).once('value'),
            database.ref(adminUrl).once('value'),
        ]);

        const profile = profileSnap.val() ?? {};
        const isAdmin = isAdminSnap.val() ?? {};

        const {displayName} = profile;

        const profileData = {
            ...profile,
            nameInitials: getInitials(displayName),
            firstName: getFirstName(displayName),
            isAdmin: isAdmin === true,
            photoURL: profile.photoURL
                ? profile.photoURL
                : 'https://lh3.googleusercontent.com/-XdUIqdMkCWA/AAAAAAAAAAI/AAAAAAAAAAA/4252rscbv5M/photo.jpg',
            uid,
        };

        dispatch({
            type: LOAD_PROFILE,
            payload: profileData,
        });

        dispatch(updateStreak(true));

        return profileData;
    } catch (error) {
        dispatch(handleError(error));
    }
};

export const updateProfile = profile => async dispatch => {
    try {
        const {uid} = auth.currentUser;
        const profileUrl = `/authentication/userOwned/profile/${uid}`;

        await database.ref(profileUrl).update(profile);

        dispatch({
            type: UPDATE_PROFILE,
            payload: profile,
        });

        return profile;
    } catch (error) {
        dispatch(handleError(error));
    }
};

export const updateStreak = loadProfile => async (dispatch, getState) => {
    try {
        const {uid} = auth.currentUser;
        const {profile} = getState();

        let timestamp = moment().startOf('day').valueOf();

        if (profile?.lastStreakUpdate === timestamp) {
            return null;
        }

        let nextStreak = profile?.streak ? profile?.streak + 1 : 1;

        // Frontend handling of resetting streak to zero when it's been more than one days inactivity
        // Should be moved to the backend with a cron job - and nextStreak above should be a const
        if (profile?.lastStreakUpdate) {
            const differenceInDays = moment()
                .startOf('day')
                .diff(profile?.lastStreakUpdate, 'days');
            if (differenceInDays > 1) {
                nextStreak = 0;
                timestamp = 0;
            }
        }

        if (loadProfile && nextStreak > 0) {
            return null;
        }

        await database
            .ref(`/authentication/userOwned/profile/${uid}`)
            .update({streak: nextStreak, lastStreakUpdate: timestamp});

        dispatch(updateGamificationStreak(nextStreak, timestamp));

        dispatch({
            type: UPDATE_PROFILE,
            payload: {streak: nextStreak, lastStreakUpdate: timestamp},
        });

        return null;
    } catch (error) {
        dispatch(handleError(error));
    }
};
