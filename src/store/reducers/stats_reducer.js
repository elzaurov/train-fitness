import {LOAD_STATS, USER_LOGOUT} from '../../actions';
import {INITIAL_STATS} from '../../constants';

const INITIAL_STATE = INITIAL_STATS;

export default (state = INITIAL_STATE, {type, payload}) => {
  switch (type) {
    case LOAD_STATS:
      return Object.keys(payload).length === 0 ? INITIAL_STATE : payload;
    case USER_LOGOUT:
      return INITIAL_STATE;
    default:
      return state;
  }
};
