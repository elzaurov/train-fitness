import {addEvent} from './events';
import {EVENT_TYPE_ERROR} from '../constants';

export const handleError = (text: string) => dispatch => {
    if (process.env.NODE_ENV === 'development') {
        // eslint-disable-next-line no-console
        console.error('Logical Error:', text);
    }

    dispatch(
        addEvent({
            text: text ?? String(text),
            type: EVENT_TYPE_ERROR,
            onPress: null,
            title: null,
        }),
    );
};
