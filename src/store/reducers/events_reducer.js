import {ADD_EVENT, REMOVE_EVENT} from '../../actions';

const INITIAL_STATE = {};

export default (state = INITIAL_STATE, {type, payload}) => {
  switch (type) {
    case ADD_EVENT: {
      const {id, ...rest} = payload;
      return {...state, [id]: rest};
    }
    case REMOVE_EVENT: {
      const {[payload]: target, ...rest} = state;
      return rest;
    }
    default:
      return state;
  }
};
