import {
    LOAD_DAILY_PROGRESS,
    LOAD_WEEKLY_PROGRESS,
    LOAD_MONTHLY_PROGRESS,
    LOAD_DAILY_TRAININGS,
    SET_GOAL_SETTINGS,
    USER_LOGOUT,
} from '../../actions';
import {INITIAL_TRACKER_SCREEN_INFO} from '../../constants';

const INITIAL_STATE = INITIAL_TRACKER_SCREEN_INFO;

export default (state = INITIAL_STATE, {type, payload}) => {
    switch (type) {
        case LOAD_DAILY_PROGRESS:
            return {
                ...state,
                [payload.date]: {
                    ...state[payload.date],
                    pillars: payload.pillars,
                    total: payload.total,
                },
            };
        case LOAD_DAILY_TRAININGS:
            return {
                ...state,
                [payload.date]: {
                    ...state[payload.date],
                    trainings: payload.trainings,
                },
            };
        case LOAD_WEEKLY_PROGRESS:
            return {...state, ...payload};
        case LOAD_MONTHLY_PROGRESS:
            return {
                ...state,
                monthlyProgress: {
                    ...state.monthlyProgress,
                    [payload.date]: payload.overview,
                },
            };
        case SET_GOAL_SETTINGS:
            return {
                ...state,
                weeklyProgress: {
                    ...state.weeklyProgress,
                    goal: {...state.weeklyProgress.goal, ...payload},
                },
            };
        case USER_LOGOUT:
            return INITIAL_STATE;
        default:
            return state;
    }
};
