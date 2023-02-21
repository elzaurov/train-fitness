import {USER_AUTHORIZED, SHOW_STREAK_MODAL, USER_LOGOUT} from '../../actions';

const INITIAL_STATE = {
    user: null,
    streakModal: false,
};

export default (state = INITIAL_STATE, {type, payload}) => {
    switch (type) {
        case USER_AUTHORIZED:
            return {...state, user: payload};
        case SHOW_STREAK_MODAL:
            return {...state, streakModal: !state.streakModal};
        case USER_LOGOUT:
            return INITIAL_STATE;
        default:
            return state;
    }
};
