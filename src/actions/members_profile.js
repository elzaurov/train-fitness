import {database} from '../config';
import {handleError} from './error';

export const LOAD_MEMBER_PROFILE = 'LOAD_MEMBER_PROFILE';

export const loadMemberProfile = (uid) => async (dispatch, getState) => {
  try {
    const {membersProfile} = getState();

    if (membersProfile && membersProfile[uid]) {
      return membersProfile[uid];
    }

    const profileUrl = `/authentication/allMembers/profiles/${uid}`;
    const gamificationUrl = `/authentication/userReadable/gamification/${uid}`;
    const statsUrl = `/authentication/userReadable/stats/${uid}`;

    const snaps = await Promise.all([
      database.ref(profileUrl).once('value'),
      database.ref(gamificationUrl).once('value'),
      database.ref(statsUrl).once('value'),
    ]);

    const [profile, gamification, stats] = snaps.map((snap) => snap.val());

    const memberProfile = {
      profile: {...profile, uid},
      gamification,
      stats,
    };

    dispatch({
      type: LOAD_MEMBER_PROFILE,
      payload: {[uid]: memberProfile},
    });

    return memberProfile;
  } catch (error) {
    dispatch(handleError(error));
  }
};
