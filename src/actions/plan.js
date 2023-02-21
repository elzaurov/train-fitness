import moment from 'moment';
import {auth, database} from '../config';
import {SET_USER_ROLE} from './user';
import {USER_ROLE_FREE, USER_ROLE_PREMIUM} from '../constants';
import {handleError} from './error';

export const LOAD_PLAN = 'LOAD_PLAN';
export const UPGRADE_PLAN = 'UPGRADE_PLAN';
export const UPDATE_PLAN = 'UPDATE_PLAN';

export const loadPlan = () => async (dispatch) => {
  try {
    const {uid} = auth.currentUser;
    const url = `/authentication/userReadable/plan/${uid}`;

    const snap = await database.ref(url).once('value');
    let planData = snap.val() ?? {};

    if (!('id' in planData)) {
      planData = {
        id: 'free',
        name: 'Free',
        created: moment().tz('Europe/London').format('x'),
        status: 'active',
      };
    }

    const isFree = planData.id.includes('free');
    const isBasic = planData.id.includes('basic');
    const isPro = planData.id.includes('pro');
    const isElite = planData.id.includes('elite');
    const isVip = planData.id.includes('vip');
    const isCanceled = !isVip && planData.status === 'canceled';

    const plan = {
      ...planData,
      isFree,
      isBasic,
      isPro,
      isElite,
      isVip,
      isCanceled,
    };

    dispatch({
      type: SET_USER_ROLE,
      payload: isFree === true ? USER_ROLE_FREE : USER_ROLE_PREMIUM,
    });

    dispatch({
      type: LOAD_PLAN,
      payload: plan,
    });

    return plan;
  } catch (error) {
    dispatch(handleError(error));
  }
};

export const upgradePlanData = (plan) => async (dispatch) => {
  dispatch({
    type: UPGRADE_PLAN,
    payload: plan,
  });

  return plan;
};
