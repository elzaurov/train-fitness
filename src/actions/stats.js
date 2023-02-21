import moment from 'moment';
import {auth, database} from '../config';
import {handleError} from './error';
import levelExperience from '../utils/level_experience';

export const LOAD_STATS = 'LOAD_STATS';
export const UPDATE_STATS = 'UPDATE_STATS';
export const UPDATE_GAMIFICATION = 'UPDATE_GAMIFICATION';

export const loadStats = () => async dispatch => {
    try {
        const {uid} = auth.currentUser;
        const url = `/authentication/userReadable/stats/${uid}`;

        const snap = await database.ref(url).once('value');
        const stats = snap.val() ?? {};

        dispatch({
            type: LOAD_STATS,
            payload: stats,
        });
    } catch (error) {
        dispatch(handleError(error));
    }
};

export const updateStats = data => async (dispatch, getState) => {
    try {
        const url = '/authentication/userWritable/update-stats';
        const idToken = await auth.currentUser.getIdToken();

        await updateGamificationData({dispatch, getState, exp: data.stats.exp});
        await database.ref(url).push({...data, idToken});
        await updateUserDailyExperience(data.stats.exp);

        dispatch({
            type: UPDATE_STATS,
            payload: {stats: data.stats},
        });
    } catch (error) {
        dispatch(handleError(error));
    }
};

export const removeStats = data => async (dispatch, getState) => {
    try {
        const url = '/authentication/userWritable/remove-stats';
        const idToken = await auth.currentUser.getIdToken();

        await removeGamificationData({dispatch, getState, exp: data.stats.exp});
        await database.ref(url).push({...data, idToken});
        await updateUserDailyExperience(-data.stats.exp);
    } catch (error) {
        dispatch(handleError(error));
    }
};

function updateGamificationData({dispatch, getState, exp}) {
    const {gamification} = getState();
    const {level} = gamification;

    const experienceNeeded = levelExperience[level - 1];
    gamification.activities += 1;

    // level max
    if (
        gamification.experience + exp >
        levelExperience[levelExperience.length - 1]
    ) {
        const maxLevel = levelExperience.length;
        gamification.level = maxLevel;
        gamification.formattedExperience = [
            levelExperience[maxLevel - 1] - levelExperience[maxLevel - 2],
            levelExperience[maxLevel - 1] - levelExperience[maxLevel - 2],
        ];
        gamification.experience = levelExperience[maxLevel - 1];
    } else {
        gamification.experience += exp;

        if (gamification.experience >= experienceNeeded) {
            if (levelExperience.length === level - 1) {
                gamification.experience = experienceNeeded;
            } else {
                gamification.level += 1;
            }
        }

        const levelCurrentExp =
            gamification.level === 1
                ? 0
                : levelExperience[gamification.level - 2];
        const currentExp = gamification.experience - levelCurrentExp;
        const nextExp =
            levelExperience[gamification.level - 1] - levelCurrentExp;
        gamification.formattedExperience = [currentExp, nextExp];

        dispatch({
            type: UPDATE_GAMIFICATION,
            payload: gamification,
        });
    }
}

async function removeGamificationData({dispatch, getState, exp}) {
    const {gamification} = getState();
    const {level} = gamification;

    gamification.activities -= 1;
    gamification.experience -= exp;

    const currentLevelExperience = level > 1 ? levelExperience[level - 2] : 0;

    if (gamification.experience < currentLevelExperience) {
        gamification.level -= 1;
    }

    const levelCurrentExp =
        gamification.level === 1 ? 0 : levelExperience[gamification.level - 2];
    const currentExp = gamification.experience - levelCurrentExp;
    const nextExp = levelExperience[gamification.level - 1] - levelCurrentExp;
    gamification.formattedExperience = [currentExp, nextExp];

    dispatch({
        type: UPDATE_GAMIFICATION,
        payload: gamification,
    });
}

async function updateUserDailyExperience(experience) {
    const url = '/authentication/userWritable/update-daily-experience';
    const idToken = await auth.currentUser.getIdToken(true);
    const dayTime = moment().startOf('day').valueOf();

    await database.ref(url).push({
        idToken,
        dayTime,
        experience,
    });

    return null;
}
