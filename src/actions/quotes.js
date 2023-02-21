import {database} from '../config';
import {handleError} from './error';

export const LOAD_QUOTES = 'LOAD_QUOTES';

export const loadQuotes = () => async (dispatch, getState) => {
  try {
    const url = '/authentication/allMembers/quotes';
    const quotesCache = getState().quotes;

    if (quotesCache && quotesCache.length > 0) {
      return quotesCache;
    }

    const snap = await database
      .ref(url)
      .orderByChild('createdAt')
      .once('value');

    const quotes = Object.entries(snap.val() || []).map(([key, value]) => ({
      key,
      ...value,
    }));

    const resultQuotes = quotes.reverse();

    dispatch({
      type: LOAD_QUOTES,
      payload: resultQuotes,
    });

    return resultQuotes;
  } catch (error) {
    dispatch(handleError(error));
  }
};
