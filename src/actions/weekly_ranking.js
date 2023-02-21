import moment from 'moment';
import {database} from '../config';
import {handleError} from './error';

export const LOAD_WEEKLY_RANKING = 'LOAD_WEEKLY_RANKING';

export const loadWeeklyRanking = (startOfWeek) => async (dispatch) => {
  try {
    const url = '/authentication/adminOwned/daily-experience';

    const snap = await database
      .ref(url)
      .orderByKey()
      .startAt(startOfWeek.toString())
      .endAt(moment(startOfWeek).endOf('week').valueOf().toString())
      .once('value');

    const usersExperience = snap.val() ?? {};

    const users = {};
    const numberOfDays = Object.keys(usersExperience).length;
    let counter = 0;

    for (const day in usersExperience) {
      for (const userId in usersExperience[day]) {
        if (!users[userId]) {
          users[userId] = {
            lastExperience: 0,
            experience: 0,
          };
        }

        if (counter + 1 === numberOfDays) {
          users[userId].lastExperience = users[userId].experience;
        }

        users[userId].experience += usersExperience[day][userId];
        counter += 1;
      }
    }

    let weeklyRanking = Object.keys(users).map((uid) => ({
      uid,
      ...users[uid],
    }));

    weeklyRanking.sort((r1, r2) =>
      r1.lastExperience > r2.lastExperience ? -1 : 1,
    );
    weeklyRanking = weeklyRanking.map((wk, index) => ({
      ...wk,
      lastPosition: index + 1,
    }));

    weeklyRanking.sort((r1, r2) => (r1.experience > r2.experience ? -1 : 1));
    weeklyRanking = weeklyRanking.map((wk, index) => ({
      ...wk,
      position: index + 1,
      positionDiff: (wk.lastPosition || index + 1) - (index + 1),
    }));

    dispatch({
      type: LOAD_WEEKLY_RANKING,
      payload: weeklyRanking,
    });

    return weeklyRanking;
  } catch (error) {
    dispatch(handleError(error));
  }
};
