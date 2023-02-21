import {
    LOAD_NOTES,
    LOAD_NOTE,
    INSERT_NOTE,
    UPDATE_NOTE,
    DELETE_NOTE,
    USER_LOGOUT,
} from '../../actions';

const INITIAL_STATE = [];

export default (state = INITIAL_STATE, {type, payload}) => {
    switch (type) {
        case LOAD_NOTES:
            return payload.sort((a, b) => b.editedAt - a.editedAt);
        case LOAD_NOTE:
        case INSERT_NOTE:
            return [payload, ...state];
        case UPDATE_NOTE: {
            const nextState = [
                ...state.filter(s => s.key !== payload.key),
                payload,
            ].sort((a, b) => b.editedAt - a.editedAt);
            return nextState;
        }
        case DELETE_NOTE:
            return state.filter(s => s.key !== payload);
        case USER_LOGOUT:
            return INITIAL_STATE;
        default:
            return state;
    }
};
