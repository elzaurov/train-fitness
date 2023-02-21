import {RECEIPT_VERIFIED} from '../../actions';

const INITIAL_STATE = null;

export default (state = INITIAL_STATE, {type, payload}) => {
  switch (type) {
    case RECEIPT_VERIFIED:
      return payload;
    default:
      return state;
  }
};
