import {SET_VIMEO_VIDEO_URL, SET_LIMELIGHT_VIDEO_URL} from '../../actions';

const INITIAL_STATE = {
  vimeo: {},
  limelight: {},
};

export default (state = INITIAL_STATE, {type, payload}) => {
  switch (type) {
    case SET_VIMEO_VIDEO_URL:
      return {
        ...state,
        vimeo: {
          ...state.vimeo,
          ...payload,
        },
      };
    case SET_LIMELIGHT_VIDEO_URL:
      return {
        ...state,
        limelight: {
          ...state.limelight,
          ...payload,
        },
      };
    default:
      return state;
  }
};
