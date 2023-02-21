import {
    EVENT_TYPE_INFO,
    EVENT_TYPE_WARNING,
    EVENT_TYPE_SUCCESS,
    EVENT_TYPE_ERROR,
    EVENT_AUTO_DISMISS_DURATION,
} from '../constants';

export const ADD_EVENT = 'ADD_EVENT';
export const REMOVE_EVENT = 'REMOVE_EVENT';

const eventTypes = [
    EVENT_TYPE_INFO,
    EVENT_TYPE_SUCCESS,
    EVENT_TYPE_WARNING,
    EVENT_TYPE_ERROR,
];

export const addEvent =
    ({ title, text, type, onPress }) =>
        dispatch => {
            const id = Date.now();

            if (onPress == null) {
                onPress = () => { };
            }

            dispatch({
                type: ADD_EVENT,
                payload: {
                    onPress,
                    title,
                    text,
                    id,
                    type: eventTypes.includes(type) ? type : EVENT_TYPE_INFO,
                },
            });

            if (EVENT_AUTO_DISMISS_DURATION > 0) {
                setTimeout(() => {
                    dispatch(removeEvent(id));
                }, EVENT_AUTO_DISMISS_DURATION);
            }
        };

export const removeEvent = id => dispatch => {
    dispatch({
        type: REMOVE_EVENT,
        payload: id,
    });
};
