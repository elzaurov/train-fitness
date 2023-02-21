import moment from 'moment';
import {auth, database} from '../config';
import {handleError} from './error';
// import {USER_ROLE_PREMIUM, USER_ROLE_FREE} from '../constants';

export const SET_USER_ROLE = 'SET_USER_ROLE';
export const SHOW_STREAK_MODAL = 'SHOW_STREAK_MODAL';

export const isFirstDailyAccess = () => async dispatch => {
    try {
        const {uid} = auth.currentUser;
        const url = `/authentication/adminOwned/logins/${moment()
            .tz('Europe/London')
            .startOf('day')
            .valueOf()}/${uid}`;

        const snap = await database.ref(url).once('value');
        const login = snap.val();

        return login;
    } catch (error) {
        dispatch(handleError(error));
    }
};

export const loadUserRole = () => async dispatch => {
    // deactivated temporarily, plan data is used instead
    // const idToken = await auth.currentUser.getIdToken();
    // let role;
    // if (idToken.claims && idToken.claims.role === USER_ROLE_PREMIUM) {
    //   role = USER_ROLE_PREMIUM;
    // } else {
    //   role = USER_ROLE_FREE;
    // }
    // dispatch({
    //   type: SET_USER_ROLE,
    //   payload: role,
    // });
};

export const showStreakModal = () => async (dispatch, getState) => {
    dispatch({
        type: SHOW_STREAK_MODAL,
    });
};
