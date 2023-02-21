import {LOAD_SCHEDULE_ITEM} from '../../actions';

const INITIAL_STATE = {};

export default (state = INITIAL_STATE, {type, payload}) => {
    switch (type) {
        case LOAD_SCHEDULE_ITEM:
            return payload;
        default:
            return state;
    }
};
