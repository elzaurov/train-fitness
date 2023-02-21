import {SET_VIMEO_DOWNLOAD_LINK} from '../../actions';

const INITIAL_STATE = {
  vimeo: {},
};

export default (state = INITIAL_STATE, {type, payload}) => {
  switch (type) {
    case SET_VIMEO_DOWNLOAD_LINK:
      return {
        ...state,
        vimeo: {
          ...state.vimeo,
          ...payload,
        },
      };
    default:
      return state;
  }
};
