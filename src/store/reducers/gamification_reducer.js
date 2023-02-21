import {LOAD_GAMIFICATION, UPDATE_GAMIFICATION, USER_LOGOUT} from '../../actions';

const INITIAL_STATE = {};

export default (state = INITIAL_STATE, {type, payload}) => {
  switch (type) {
    case LOAD_GAMIFICATION:
      return payload;
    case UPDATE_GAMIFICATION:
      return {...state, ...payload};
    case USER_LOGOUT:
      return INITIAL_STATE;
    default:
      return state;
  }
};
