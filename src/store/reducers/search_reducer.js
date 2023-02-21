import {
  SET_SEARCH_FILTER,
  SET_SEARCH_RESULT,
  SET_SEARCH_WAITER,
  SET_SHOW_SEARCH_RESULT,
  SHOW_SEARCH_MODAL
} from '../../actions';

const INITIAL_STATE = {
  filter: '',
  result: null,
  showResult: false,
  searching: false,
  showSearchModal: false,
};

export default (state = INITIAL_STATE, {type, payload}) => {
  switch (type) {
    case SET_SEARCH_FILTER:
      return {...state, filter: payload};
    case SET_SEARCH_RESULT:
      return {...state, result: payload};
    case SET_SEARCH_WAITER:
      return {...state, searching: payload};
    case SET_SHOW_SEARCH_RESULT:
      return {...state, showResult: payload};
    case SHOW_SEARCH_MODAL:
      return {...state, showSearchModal: payload};
    default:
      return state;
  }
};
