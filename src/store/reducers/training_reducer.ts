import {
    USER_LOGOUT,
    LOAD_ACTIVITY_LIST,
    LOAD_TRAINING_PLANS,
    LOAD_TRAINING_SESSIONS,
    LOAD_MORE_WORKOUT,
    LOAD_TRAINING_EXERCISES,
    LOAD_MORE_TRAINING_EXERCISES,   
} from '../../actions';
import {INITIAL_TRAINING_SCREEN} from '../../constants';

const INITIAL_STATE = INITIAL_TRAINING_SCREEN;

export default (state = INITIAL_STATE, {type, payload}) => {
    switch (type) {
        case LOAD_TRAINING_PLANS:
            return {
                ...state,
                effectiveJourney: [...payload],
            };
        case LOAD_ACTIVITY_LIST:
            return {
                ...state,
                activitiesList: [...payload],
            };
        case LOAD_TRAINING_SESSIONS:
            return {
                ...state,
                trainingSession: payload,
            };
        case LOAD_MORE_WORKOUT:
                const keys = state.trainingSession.map(({key}) => key);
                let refArray = [...state.trainingSession];
                for (let i = 0, len = payload.length; i < len; i += 1) {
                    if (!keys.includes(payload[i].key)) {
                        refArray.push(payload[i]);
                    }
                }
                return {
                    ...state,
                    trainingSession: refArray,
                };
        case LOAD_TRAINING_EXERCISES:
            return {
                ...state,
                trainingExercises: payload,
            };
        case LOAD_MORE_TRAINING_EXERCISES:
                const trainKeys = state.trainingExercises.map(({key}) => key);
                let trainEx = [...state.trainingExercises   ];
                for (let i = 0, len = payload.length; i < len; i += 1) {
                    if (!trainKeys.includes(payload[i].key)) {
                        trainEx.push(payload[i]);
                    }
                }
                return {
                    ...state,
                    trainingExercises: trainEx,
                };
        case USER_LOGOUT:
            return INITIAL_STATE;
        default:
            return state;
    }
};
