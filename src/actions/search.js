import AwesomeDebouncePromise from 'awesome-debounce-promise';
import {search} from '../api';
import {handleError} from './error';
import {functions} from '../config';

export const SET_SEARCH_FILTER = 'SET_SEARCH_FILTER';
export const SET_SEARCH_RESULT = 'SET_SEARCH_RESULT';
export const SET_SEARCH_WAITER = 'SET_SEARCH_WAITER';
export const SHOW_SEARCH_MODAL = 'SHOW_SEARCH_MODAL';
export const SET_SHOW_SEARCH_RESULT = 'SET_SHOW_SEARCH_RESULT';

const debouncedGetSearchResult = AwesomeDebouncePromise((dispatch, filter) => {
    dispatch(getSearchResult(filter));
}, 300);

export const setSearchFilter = filter => async dispatch => {
    try {
        dispatch({
            type: SET_SEARCH_FILTER,
            payload: filter,
        });

        dispatch({
            type: SET_SEARCH_WAITER,
            payload: true,
        });

        dispatch({
            type: SET_SHOW_SEARCH_RESULT,
            payload: true,
        });

        debouncedGetSearchResult(dispatch, filter);
    } catch (error) {
        handleError(error);
    }
};

export const getSearchResult = filter => async dispatch => {
    try {
        dispatch({
            type: SET_SEARCH_WAITER,
            payload: true,
        });

        let result;

        if (filter) {
            const {hits} = await search.searchActivities(filter);

            result = hits.map(hit => hit._source);
        } else {
            result = null;
        }

        dispatch({
            type: SET_SEARCH_RESULT,
            payload: result,
        });
    } catch (error) {
        handleError(error);
    } finally {
        dispatch({
            type: SET_SEARCH_WAITER,
            payload: false,
        });
    }
};

export const setShowSearchResult = showResult => dispatch => {
    try {
        dispatch({
            type: SET_SHOW_SEARCH_RESULT,
            payload: showResult,
        });
    } catch (error) {
        handleError(error);
    }
};

export const setShowModal = toggleModal => async dispatch => {
    try {
        dispatch({
            type: SHOW_SEARCH_MODAL,
            payload: toggleModal,
        });
    } catch (error) {
        handleError(error);
    }
};

export const getSearchResults = () => async dispatch => {
    const getSearchResults = functions.httpsCallable('getSearchResults');
    await getSearchResults();
    const data = [];
    dispatch({
        type: SET_SEARCH_RESULT,
        payload: data,
    });
    return data;
};
