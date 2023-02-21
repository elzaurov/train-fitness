import {
    LOAD_COURSES_LIST,
    LOAD_MORE_COURSES_LIST,
    USER_LOGOUT,
} from '../../actions';

const INITIAL_STATE = [];

export default (state = INITIAL_STATE, {type, payload}) => {
    switch (type) {
        case LOAD_COURSES_LIST:
            return payload.sort((a, b) => b.createdAt - a.createdAt);
        case LOAD_MORE_COURSES_LIST: {
            const keys = state.map(({key}) => key);
            let refArray = [...state];
            for (let i = 0, len = payload.length; i < len; i += 1) {
                if (!keys.includes(payload[i].key)) {
                    refArray.push(payload[i]);
                }
            }
            return refArray;
        }
        case USER_LOGOUT:
            return INITIAL_STATE;
        default:
            return state;
    }
};
