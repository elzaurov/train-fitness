import {SET_CATALOG} from '../../actions';

const INITIAL_STATE = null;

export default (state = INITIAL_STATE, {type, payload}) => {
  switch (type) {
    case SET_CATALOG:
      return {...payload};
    default:
      return state;
  }
};
