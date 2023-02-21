import {WAITERS_ADD, WAITERS_REMOVE} from '../../actions';

const INITIAL_STATE = [];

export default (state = INITIAL_STATE, {type, payload}) => {
  switch (type) {
    case WAITERS_ADD:
      return [...state, payload];
    case WAITERS_REMOVE:
      return state.filter((waiter) => waiter !== payload);
    default:
      return state;
  }
};
