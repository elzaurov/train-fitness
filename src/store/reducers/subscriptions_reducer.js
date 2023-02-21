import {LOAD_SUBSCRIPTIONS} from '../../actions';

const INITIAL_STATE = [];

export default (state = INITIAL_STATE, {type, payload}) => {
  switch (type) {
    case LOAD_SUBSCRIPTIONS:
      return [...payload];
    default:
      return state;
  }
};
