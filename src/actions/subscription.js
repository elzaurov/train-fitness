import {initConnection, getSubscriptions} from 'react-native-iap';
import {handleError} from './error';

export const LOAD_SUBSCRIPTION = 'LOAD_SUBSCRIPTION';
export const LOAD_SUBSCRIPTIONS = 'LOAD_SUBSCRIPTIONS';
export const UPDATE_SUBSCRIPTION = 'UPDATE_SUBSCRIPTION';

export const loadSubscriptions = (plans) => async (dispatch) => {
  try {
    await initConnection();
    const subscriptions = await getSubscriptions(plans);
    dispatch({
      type: LOAD_SUBSCRIPTIONS,
      payload: subscriptions,
    });
  } catch (error) {
    dispatch(handleError(error));
  }
};
