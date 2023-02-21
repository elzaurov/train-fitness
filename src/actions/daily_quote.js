import {database} from '../config';
import {handleError} from './error';

export const LOAD_DAILY_QUOTE = 'LOAD_DAILOAD_DAILY_QUOTELY_SCHEDULE';

export const loadDailyQuote = () => async (dispatch) => {
  try {
    const url = '/authentication/allMembers/daily-quote';

    const snap = await database.ref(url).once('value');
    const quote = snap.val();

    dispatch({
      type: LOAD_DAILY_QUOTE,
      payload: quote,
    });

    return quote;
  } catch (error) {
    dispatch(handleError(error));
  }
};
