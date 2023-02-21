import {
  LOAD_SCHEDULE,
  UPDATE_SCHEDULE,
  UPDATE_SCHEDULE_DAY,
  USER_LOGOUT,
} from '../../actions';

const INITIAL_STATE = {};

const distinctItems = (arrayValue) => {
  const result = [];
  arrayValue.forEach((item) => {
    const found = result.find((resultItem) => resultItem.id === item.id);
    if (!found) {
      result.push(item);
    }
  });
  return result;
};

const distinctSchedules = (objectValue) =>
  Object.keys(objectValue).reduce((accumulator, key) => {
    return {
      ...accumulator,
      [key]: distinctItems(objectValue[key]),
    };
  }, {});

export default (state = INITIAL_STATE, {type, payload}) => {
  switch (type) {
    case LOAD_SCHEDULE:
      return {...distinctSchedules(payload)};
    case UPDATE_SCHEDULE:
      return {...distinctSchedules(payload)};
    case USER_LOGOUT:
      return INITIAL_STATE;
    case UPDATE_SCHEDULE_DAY:
      return {
        ...state,
        ...payload,
      };
    default:
      return state;
  }
};
