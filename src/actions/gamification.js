import moment from 'moment';
import { auth, database } from '../config';
import { handleError } from './error';

export const LOAD_GAMIFICATION = 'LOAD_GAMIFICATION';

export const loadGamification = () => async (dispatch) => {
  try {
    const { uid } = auth.currentUser;
    const url = `/authentication/userReadable/gamification/${uid}`;

    const snap = await database.ref(url).once('value');
    let gamification = snap.val() ?? {};

    if (Object.values(gamification).length === 0) {
      gamification = {
        activities: 0,
        badgesCount: 0,
        createdAt: moment().startOf('day').valueOf(),
        daysInARow: 0,
        daysOverall: 0,
        experience: 0,
        formattedExperience: [0, 500],
        lastLogin: moment().startOf('day').valueOf(),
        level: 1,
      };
    }

    const createdAt = moment.utc(auth.currentUser.metadata.creationTime);
    const today = moment();

    const daysOverall = today.diff(createdAt, 'days');
    // const daysInARow = await getDaysInARow({ ...gamification, daysOverall });

    dispatch({
      type: LOAD_GAMIFICATION,
      payload: {
        ...gamification,
        daysOverall,
        // daysInARow,
      },
    });
  } catch (error) {
    dispatch(handleError(error));
  }
};

export const updateGamificationStreak = (streak, timestamp) => async (dispatch) => {
  try {
    const idToken = await auth.currentUser.getIdToken();
    const gamificationUrl = 'authentication/userWritable/update-gamification';
    await database.ref(gamificationUrl).push({
      idToken,
      body: {
        streak: streak,
        lastStreakUpdate: timestamp
      },
      action: 'update-streak',
    });
  } catch (error) {
    dispatch(handleError(error));
  }
}

async function getDaysInARow({ daysOverall, daysInARow, lastLogin }) {
  const today = moment().startOf('day');
  const lastLoginDate = moment(lastLogin).startOf('day');
  const diff = today.diff(lastLoginDate, 'days');
  const functionsTasksUrl = 'authentication/userWritable/update-gamification';
  const idToken = await auth.currentUser.getIdToken(true);

  if (diff === 1) {
    await database.ref(functionsTasksUrl).push({
      idToken,
      body: {
        daysOverall,
        daysInARow: daysInARow + 1,
        lastLogin: moment().valueOf(),
      },
      action: 'update-days-in-a-row',
    });

    return daysInARow + 1;
  } else if (diff > 1) {
    await database.ref(functionsTasksUrl).push({
      idToken,
      body: {
        daysOverall,
        daysInARow: 0,
        lastLogin: moment().valueOf(),
      },
      action: 'update-days-in-a-row',
    });

    return 0;
  }

  return daysInARow;
}
