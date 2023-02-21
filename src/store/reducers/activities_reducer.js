import {SET_ACTIVITY} from '../../actions';

const INITIAL_STATE = {
  byKey: {},
  byType: {},
};

export default (state = INITIAL_STATE, {type, payload}) => {
  switch (type) {
    case SET_ACTIVITY: {
      const {type: activityType, key} = payload;
      return {
        byKey: {
          ...state.byKey,
          [key]: payload,
        },
        byType: {
          ...state.byType,
          [activityType]: [...(state.activityType ?? []), key],
        },
      };
    }
    default: {
      return state;
    }
  }
};
