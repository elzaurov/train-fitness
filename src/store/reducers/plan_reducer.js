import {LOAD_PLAN, UPGRADE_PLAN, USER_LOGOUT, UPDATE_PLAN} from '../../actions';

const INITIAL_STATE = {};

export default (state = INITIAL_STATE, {type, payload}) => {
  switch (type) {
    case LOAD_PLAN:
      return payload;
    case UPGRADE_PLAN:
      return {...state, ...payload};
    case UPDATE_PLAN:
      return {...state, ...payload};
    case USER_LOGOUT:
      return INITIAL_STATE;
    default:
      return state;
  }
};
