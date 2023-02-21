import {LOAD_TEASERS, LOAD_TEASER, USER_LOGOUT} from '../../actions';

const INITIAL_STATE = {};

export default (state = INITIAL_STATE, {type, payload}) => {
  switch (type) {
    case LOAD_TEASER:
      return {...state, ...payload};
    case LOAD_TEASERS:
      return {...state, ...payload};
    case USER_LOGOUT:
      return INITIAL_STATE;
    default:
      return state;
  }
};
