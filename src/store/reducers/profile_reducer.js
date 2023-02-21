import {LOAD_PROFILE, UPDATE_PROFILE, USER_LOGOUT} from '../../actions';

const INITIAL_STATE = {};

export default (state = INITIAL_STATE, {type, payload}) => {
    switch (type) {
        case LOAD_PROFILE:
            return payload;
        case UPDATE_PROFILE:
            return {...state, ...payload};
        case USER_LOGOUT:
            return INITIAL_STATE;
        default:
            return state;
    }
};
