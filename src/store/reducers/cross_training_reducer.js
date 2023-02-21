import {
  LOAD_CROSS_TRAINING,
  COMPLETE_CROSS_TRAINING,
  USER_LOGOUT,
} from '../../actions';

const INITIAL_STATE = {};

export default (state = INITIAL_STATE, {type, payload}) => {
  switch (type) {
    case LOAD_CROSS_TRAINING:
      return payload;
    case COMPLETE_CROSS_TRAINING:
      return payload;
    case USER_LOGOUT:
      return INITIAL_STATE;
    default:
      return state;
  }
};
