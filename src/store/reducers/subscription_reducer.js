import {LOAD_SUBSCRIPTION, UPDATE_SUBSCRIPTION, USER_LOGOUT} from '../../actions';

const INITIAL_STATE = {};

export default (state = INITIAL_STATE, {type, payload}) => {
  switch (type) {
    case LOAD_SUBSCRIPTION:
      return payload;
    case UPDATE_SUBSCRIPTION:
      return {...state, ...payload};
    case USER_LOGOUT:
      return INITIAL_STATE;
    default:
      return state;
  }
};
