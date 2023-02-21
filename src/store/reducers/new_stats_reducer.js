import {UPDATE_STATS, USER_LOGOUT} from '../../actions';
import {sumStats} from '../../utils/gamification';
import {INITIAL_STATS} from '../../constants';

const INITIAL_STATE = INITIAL_STATS;

export default (state = INITIAL_STATE, {type, payload}) => {
  switch (type) {
    case UPDATE_STATS: {
      const totalStats = INITIAL_STATE;
      sumStats(totalStats, payload.stats);
      return totalStats;
    }
    case USER_LOGOUT:
      return INITIAL_STATE;
    default:
      return state;
  }
};
