import {database} from '../config';
import {
  PROGRAM_TEASERS_TYPE,
  WORKOUT_TEASERS_TYPE,
  CROSS_TRAINING_TEASERS_TYPE,
  TEAM_TEASERS_TYPE,
  COURSE_TEASERS_TYPE,
  USER_ROLE_PREMIUM,
} from '../constants';
import {handleError} from './error';

export const LOAD_CALENDAR_TEASERS = 'LOAD_CALENDAR_TEASERS';

export const loadCalendarTeasers = () => async (dispatch, getState) => {
  try {
    const {calendarTeasers} = getState();

    if (calendarTeasers && calendarTeasers.length > 0) {
      return calendarTeasers;
    }

    const baseUrl = '/authentication/allMembers/teasers';

    const snaps = await Promise.all([
      database.ref(`${baseUrl}/programs`).once('value'),
      database.ref(`${baseUrl}/workouts`).once('value'),
      database.ref(`${baseUrl}/cross-training`).once('value'),
      database.ref(`${baseUrl}/team`).once('value'),
      database.ref(`${baseUrl}/courses`).once('value'),
    ]);

    const [
      programsTeasers,
      workoutsTeasers,
      crossTraining,
      teamTeasers,
      courseTeasers,
    ] = snaps.map((snap) =>
      Object.entries(snap.val() || []).map(([key, value]) => ({
        key,
        ...value,
      })),
    );

    const programsTeasersItems = programsTeasers
      .map((programsTeaser) => ({
        ...programsTeaser,
        type: PROGRAM_TEASERS_TYPE,
        category: PROGRAM_TEASERS_TYPE,
        id: programsTeaser.key,
        url: `/program/${programsTeaser.key}`,
      }))
      .sort((t1, t2) => (t1.code > t2.code ? 1 : -1));

    // checks all the programs, and only returns the keys of the workouts that exist in the program
    // const workoutIds = programsTeasers
    //   .map(({ workouts }) => workouts)
    //   .reduce((w1, w2) => [...w1, ...w2]);

    // const wTeasers = workoutsTeasers.filter(({ key }) => !workoutIds.includes(key));

    const workoutsTeasersItems = workoutsTeasers
      .map((workoutsTeaser) => ({
        ...workoutsTeaser,
        type: WORKOUT_TEASERS_TYPE,
        category: WORKOUT_TEASERS_TYPE,
        id: workoutsTeaser.key,
        url: `/workout/${workoutsTeaser.key}`,
      }))
      .sort((t1, t2) => (t1.code > t2.code ? 1 : -1));

    const crossTrainingItems = crossTraining
      .map((crossTrainingTeaser) => ({
        ...crossTrainingTeaser,
        type: CROSS_TRAINING_TEASERS_TYPE,
        category: CROSS_TRAINING_TEASERS_TYPE,
        id: crossTrainingTeaser.key,
        url: `/teasers/cross-training/${crossTrainingTeaser.key}`,
      }))
      .sort((t1, t2) => (t1.name > t2.name ? 1 : -1));

    const teamItems = teamTeasers
      .map((team) => ({
        ...team,
        type: TEAM_TEASERS_TYPE,
        category: TEAM_TEASERS_TYPE,
        id: team.key,
        url: `/teasers/team/${team.key}`,
      }))
      .sort((t1, t2) => (t1.name > t2.name ? 1 : -1));

    const courseItems = courseTeasers
      .map((course) => ({
        ...course,
        type: COURSE_TEASERS_TYPE,
        category: COURSE_TEASERS_TYPE,
        id: course.key,
        url: `/courses/${course.key}`,
      }))
      .sort((t1, t2) => (t1.name > t2.name ? 1 : -1));

    // sorting the activities based on their lock status
    // the unlocked ones must be higher
    const {userRole} = getState();

    const calendarItemsByLockStatus = [
      workoutsTeasersItems,
      programsTeasersItems,
      courseItems,
      crossTrainingItems,
      teamItems,
    ].reduce(
      (ac, items) => {
        const {locked, unlocked} = splitByLockStatus(items, userRole);

        return {
          ...ac,
          locked: [...ac.locked, ...locked],
          unlocked: [...ac.unlocked, ...unlocked],
        };
      },
      {
        locked: [],
        unlocked: [],
      },
    );

    const calendarItems = [
      ...calendarItemsByLockStatus.unlocked,
      ...calendarItemsByLockStatus.locked,
    ];

    dispatch({
      type: LOAD_CALENDAR_TEASERS,
      payload: calendarItems,
    });

    return calendarItems;
  } catch (error) {
    dispatch(handleError(error));
  }
};

const splitByLockStatus = (items, userRole) =>
  items.reduce(
    (ac, item) => {
      if (userRole === USER_ROLE_PREMIUM || item.isPremium === false) {
        return {
          ...ac,
          unlocked: [...ac.unlocked, item],
        };
      }
      return {
        ...ac,
        locked: [...ac.locked, item],
      };
    },
    {
      locked: [],
      unlocked: [],
    },
  );
