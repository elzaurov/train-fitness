import moment from 'moment';
import {LoginManager, AccessToken} from 'react-native-fbsdk';
import {appleAuth} from '@invertase/react-native-apple-authentication';
import {GoogleSignin} from '@react-native-community/google-signin';
import RNAuth from '@react-native-firebase/auth';
import {Platform} from 'react-native';
import {functions, auth} from '../config';
import {
    FACEBOOK_AUTH_PERMISSIONS,
    MILESTONE_REGISTERED,
    MILESTONE_SECOND_LOGIN,
} from '../constants';
import {handleError} from './error';

import {updateProfile, loadProfile} from './profile';
import {loadPlan} from './plan';
import {loadOnBoarding} from './onBoarding';
import {assertMilestone, loadMilestones} from './milestones';
import {loadGamification} from './gamification';
import {loadStats} from './stats';
import {loadUnreadNotifications} from './unread_notifications';
import {loadEntitlement} from './entitlement';
import {updateLoginTime} from './analytics';
import {updateMessagingToken} from './messaging';

if (Platform.OS === 'ios') {
    GoogleSignin.configure();
} else {
    const webClientId = __DEV__
        ? '561916163225-afarlkctohc9i31lefrblk1m2p4cmhic.apps.googleusercontent.com'
        : '45735318380-deg5ipn33jvnil9hdpdc8m4l93ae9c85.apps.googleusercontent.com';
    GoogleSignin.configure({webClientId});
}

export const USER_AUTHORIZED = 'USER_AUTHORIZED';
export const USER_LOGOUT = 'USER_LOGOUT';

export const checkDisplayName = displayName => async dispatch => {
    const checkDisplayNameCallable =
        functions.httpsCallable('checkDisplayName');

    try {
        const {data} = await checkDisplayNameCallable(displayName);
        return data;
    } catch (error) {
        dispatch(handleError(error, 'Could not check display name'));
    }
};

export const checkEmail = email => async dispatch => {
    const checkEmailCallable = functions.httpsCallable('checkEmail');

    try {
        const {data} = await checkEmailCallable(email);
        return data;
    } catch (error) {
        dispatch(handleError(error, 'Could not check email address'));
    }
};

export const signUp =
    ({displayName, email, password, emailSubscription}) =>
    async dispatch => {
        try {
            await auth.createUserWithEmailAndPassword(email, password);

            await dispatch(
                createUserData({
                    displayName,
                    email,
                    password,
                    emailSubscription,
                }),
            );
        } catch (error) {
            dispatch(handleError(error, 'Could not register the user'));
        }
    };

export const createUserData =
    ({email, displayName, emailSubscription}) =>
    async dispatch => {
        try {
            const userData = {
                email,
                displayName,
                createdAt: moment().tz('Europe/London').format('x'),
                isAdmin: false,
                newUser: true,
                level: 1,
                emailSubscription: emailSubscription
                    ? 'subscribed'
                    : 'unsubscribed',
            };

            await auth.currentUser.updateProfile(userData);

            dispatch(updateProfile(userData));
        } catch (error) {
            dispatch(handleError(error));
        }
    };

export const loadUserData = () => async dispatch => {
    try {
        const [
            plan,
            profile,
            entitlement,
            onBoarding,
            milestones,
            gamification,
            stats,
            unreadNotifications,
        ] = await Promise.all([
            dispatch(loadPlan()),
            dispatch(loadProfile()),
            dispatch(loadEntitlement()),
            dispatch(loadOnBoarding()),
            dispatch(loadMilestones()),
            dispatch(loadGamification()),
            dispatch(loadStats()),
            dispatch(loadUnreadNotifications()),
        ]);

        return {
            plan,
            profile,
            entitlement,
            onBoarding,
            milestones,
            gamification,
            stats,
            unreadNotifications,
        };
    } catch (error) {
        await auth.signOut();
        dispatch({type: USER_LOGOUT});
        dispatch(handleError(error));
    }
};

export const updateUserSignInData = () => async (dispatch, getState) => {
    try {
        const tasks = [
            dispatch(updateLoginTime()),
            dispatch(updateMessagingToken()),
        ];

        if (getState()?.milestones?.[MILESTONE_REGISTERED]) {
            tasks.push(dispatch(assertMilestone(MILESTONE_SECOND_LOGIN)));
        } else {
            tasks.push(dispatch(assertMilestone(MILESTONE_REGISTERED)));
        }

        await Promise.all(tasks);
    } catch (error) {
        handleError(error);
    }
};

export const listenUserAuth = () => dispatch => {
    try {
        return auth.onAuthStateChanged(
            async user => {
                if (user) {
                    dispatch({
                        type: USER_AUTHORIZED,
                        payload: user,
                    });
                } else {
                    dispatch(signOut());
                }
            },
            error => {
                dispatch(handleError(error));
            },
        );
    } catch (error) {
        handleError(error);
    }
};

export const signIn =
    ({email, password}) =>
    async dispatch => {
        try {
            await auth.signInWithEmailAndPassword(email, password);
        } catch (error) {
            if (error?.code === 'auth/wrong-password') {
                throw new Error('Invalid user email or password');
            } else {
                dispatch(handleError(error));
            }

            dispatch({type: USER_LOGOUT});
        }
    };

export const signOut = (callback) => async dispatch => {
    try {
        await auth.signOut();
        callback();

        // logout from social accounts
        await Promise.all([
            dispatch(signOutFromApple()),
            dispatch(signOutFromGoogle()),
            dispatch(signOutFromFacebook()),
        ]);
    } catch (error) {
        handleError(error);
    } finally {
        dispatch({
            type: USER_LOGOUT,
        });
    }
};

export const signInWithFacebook = () => async dispatch => {
    try {
        const result = await LoginManager.logInWithPermissions(
            FACEBOOK_AUTH_PERMISSIONS,
        );

        if (result.isCancelled) {
            throw new Error('The login cancelled by the user');
        }

        const data = await AccessToken.getCurrentAccessToken();

        if (!data) {
            throw new Error('Could not authenticate by Facebook');
        }

        const fbCredential = RNAuth.FacebookAuthProvider.credential(
            data.accessToken,
        );

        const {additionalUserInfo, user} = await auth.signInWithCredential(
            fbCredential,
        );

        // if the user is new, create initial data
        if (additionalUserInfo.isNewUser) {
            await dispatch(
                createUserData({
                    email: user.email,
                    displayName: user.displayName,
                    emailSubscription: true,
                }),
            );
        }
    } catch (error) {
        dispatch(signOutFromFacebook());
        dispatch(handleError(error));
    }
};

export const signOutFromFacebook = () => async dispatch => {
    try {
        await LoginManager.logOut();
        dispatch({type: USER_LOGOUT});
    } catch (error) {
        dispatch(handleError(error));
    }
};

export const signInWithApple = () => async dispatch => {
    try {
        const {identityToken, nonce, fullName} = await appleAuth.performRequest(
            {
                requestedOperation: appleAuth.Operation.LOGIN,
                requestedScopes: [
                    appleAuth.Scope.EMAIL,
                    appleAuth.Scope.FULL_NAME,
                ],
            },
        );

        if (!identityToken) {
            throw new Error('Apple authentication failed');
        }

        const apCredential = RNAuth.AppleAuthProvider.credential(
            identityToken,
            nonce,
        );

        const {additionalUserInfo, user} = await auth.signInWithCredential(
            apCredential,
        );

        if (additionalUserInfo.isNewUser) {
            const displayName =
                `${fullName.givenName} ${fullName.familyName}` ?? user.email;

            dispatch(
                createUserData({
                    email: user.email,
                    displayName,
                    emailSubscription: true,
                }),
            );
        }
    } catch (error) {
        dispatch(handleError(error));
    }
};

export const signOutFromApple = () => async dispatch => {
    try {
        // There seems to be no good signout method from the apple login
    } catch (error) {
        dispatch(handleError(error));
    }
};

export const signInWithGoogle = () => async dispatch => {
    try {
        const {idToken} = await GoogleSignin.signIn();

        const glCredential = RNAuth.GoogleAuthProvider.credential(idToken);

        const {additionalUserInfo, user} = await auth.signInWithCredential(
            glCredential,
        );

        if (additionalUserInfo.isNewUser) {
            await dispatch(
                createUserData({
                    email: user.email,
                    displayName: user.displayName,
                    emailSubscription: true,
                }),
            );
        }
    } catch (error) {
        dispatch(handleError(error));
    }
};

export const signOutFromGoogle = () => async dispatch => {
    try {
        await GoogleSignin.revokeAccess();
        await GoogleSignin.signOut();
    } catch (error) {
        dispatch(handleError(error));
    }
};

export const clearActions = () => async dispatch => {
    dispatch({
        type: USER_LOGOUT,
    });
};
