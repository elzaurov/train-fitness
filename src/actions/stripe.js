import moment from 'moment';
import {auth, database} from '../config';
import {handleError} from './error';

export const LOAD_STRIPE_DATA = 'LOAD_STRIPE_DATA';
export const UPDATE_STRIPE_CARD = 'UPDATE_STRIPE_CARD';

export const loadStripeData = () => async (dispatch, getState) => {
  try {
    const {stripe} = getState();

    if (stripe && stripe.subscription) {
      return stripe;
    }

    const {uid} = auth.currentUser;
    const url = `/authentication/userReadable/stripe/${uid}`;

    const snap = await database.ref(url).once('value');
    const stripeData = snap.val() ?? {};

    dispatch({
      type: LOAD_STRIPE_DATA,
      payload: stripeData,
    });

    return stripeData;
  } catch (error) {
    dispatch(handleError(error));
  }
};

export const updateCustomerCard = ({customerId, token}) => async (dispatch) => {
  try {
    const idToken = await auth.currentUser.getIdToken(true);
    const url = '/authentication/userWritable/update-card';

    await database.ref(url).push({
      createdAt: moment().valueOf(),
      idToken,
      customerId,
      token,
    });

    const snap = await database
      .ref(url)
      .orderByChild('createdAt')
      .limitToLast(1)
      .once('value');

    const items = Object.entries(snap.val() || []).map(([key, value]) => ({
      key,
      ...value,
    }));

    const item = items[0];

    return item.key;
  } catch (error) {
    dispatch(handleError(error));
  }
};

export const updateStripeCard = (card) => async (dispatch, getState) => {
  try {
    const {stripe} = getState();

    stripe.customer.sources.data[0] = card;
    stripe.customer.default_source = card.cardId;

    dispatch({
      type: UPDATE_STRIPE_CARD,
      payload: stripe,
    });

    return card;
  } catch (error) {
    dispatch(handleError(error));
  }
};
