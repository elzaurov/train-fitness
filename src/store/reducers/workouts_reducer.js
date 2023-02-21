import {LOAD_WORKOUT, LOAD_WORKOUTS, USER_LOGOUT} from '../../actions';

const INITIAL_STATE = {};

export default (state = INITIAL_STATE, {type, payload}) => {
    switch (type) {
        case LOAD_WORKOUT:
            return {...payload};
        case LOAD_WORKOUTS:
            return {...payload};
        case USER_LOGOUT:
            return INITIAL_STATE;
        default:
            return state;
    }
};
