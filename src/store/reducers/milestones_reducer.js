import {SET_MILESTONES, USER_LOGOUT} from '../../actions';
import {AppStorage} from '../../utils';

const storage = new AppStorage('milestones_reducer');

const INITIAL_STATE = {
    registered: false,
    secondLogin: false,
    greeted: false,
    finishedFirstActivity: false,
    finishedFirstBodyActivity: false,
    finishedFirstMindActivity: false,
    startedFirstActivity: false,
    startedFirstBodyActivity: false,
    startedFirstMindActivity: false,
};

export default (state = INITIAL_STATE, {type, payload}) => {
    switch (type) {
        case SET_MILESTONES:
            const newState = {...state, ...payload};
            storage.set(newState);
            return newState;
        case USER_LOGOUT:
            storage.set(INITIAL_STATE);
            return INITIAL_STATE;
        default:
            return state;
    }
};
