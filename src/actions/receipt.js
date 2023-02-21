import {functions} from '../config';
import {UPDATE_PLAN} from './plan';
import {UPDATE_SUBSCRIPTION} from './subscription';
import {handleError} from './error';

export const RECEIPT_VERIFIED = 'RECEIPT_VERIFIED';

export const verifyReceipt = (purchase) => async (dispatch) => {
  try {
    const verifyReceiptIAP = functions.httpsCallable('verifyReceiptIAP');
    const {subscription, plan} = await verifyReceiptIAP(purchase);
    dispatch({
      type: RECEIPT_VERIFIED,
      payload: purchase,
    });
    dispatch({
      type: UPDATE_SUBSCRIPTION,
      payload: subscription,
    });
    dispatch({
      type: UPDATE_PLAN,
      payload: plan,
    });

    return {subscription, plan};
  } catch (error) {
    dispatch(handleError(error));
  }
};
