import {LOAD_STRIPE_DATA, UPDATE_STRIPE_CARD, USER_LOGOUT} from '../../actions';

const INITIAL_STATE = {};

export default (state = INITIAL_STATE, {type, payload}) => {
  switch (type) {
    case LOAD_STRIPE_DATA:
    case UPDATE_STRIPE_CARD:
      return payload;
    case USER_LOGOUT:
      return INITIAL_STATE;
    default:
      return state;
  }
};
