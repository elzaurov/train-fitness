import {SET_PAYWALL_MODAL_VISIBILITY} from '../../actions';

const INITIAL_STATE = false;

export default (state = INITIAL_STATE, {type, payload}) => {
  switch (type) {
    case SET_PAYWALL_MODAL_VISIBILITY:
      return payload;
    default:
      return state;
  }
};
