import {SET_UPGRADE_MODAL_VISIBILITY} from '../../actions';

const INITIAL_STATE = null;

export default (state = INITIAL_STATE, {type, payload}) => {
  switch (type) {
    case SET_UPGRADE_MODAL_VISIBILITY:      
      return payload;
    default:
      return state;
  }
};
