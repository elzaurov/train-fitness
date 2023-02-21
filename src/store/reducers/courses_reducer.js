import {
    LOAD_COURSE,
    // LOAD_COURSES,
    USER_LOGOUT,
} from '../../actions';

const INITIAL_STATE = [];

export default (state = INITIAL_STATE, {type, payload}) => {
    switch (type) {
        // case LOAD_COURSES:
        //     return [...payload];
        case LOAD_COURSE:
            return [...state, payload];
        case USER_LOGOUT:
            return INITIAL_STATE;
        default:
            return state;
    }
};
