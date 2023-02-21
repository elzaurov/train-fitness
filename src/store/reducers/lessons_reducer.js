import {LOAD_CLASSROOMS, LOAD_GAMEBRAINS, USER_LOGOUT} from '../../actions';

const INITIAL_STATE = {classroom: [], gamebrain: []};

export default (state = INITIAL_STATE, {type, payload}) => {
    switch (type) {
        case LOAD_GAMEBRAINS:
            return {
                ...state,
                gamebrain: payload,
            };
        case LOAD_CLASSROOMS:
            return {
                ...state,
                classroom: payload,
            };
        case USER_LOGOUT:
            return INITIAL_STATE;
        default:
            return state;
    }
};
