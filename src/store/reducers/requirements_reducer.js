import {LOAD_REQUIREMENTS} from '../../actions';

const INITIAL_STATE = null;

export default (state = INITIAL_STATE, {type, payload}) => {
  switch (type) {
    case LOAD_REQUIREMENTS:
      return payload;
    default:
      return state;
  }
};
