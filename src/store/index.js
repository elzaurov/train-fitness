import React from 'react';
import PropTypes from 'prop-types';
import {createStore, combineReducers, applyMiddleware} from 'redux';
import {Provider} from 'react-redux';
import thunkMiddleware from 'redux-thunk';
import flipperMiddleware from 'redux-flipper';
import {composeWithDevTools} from 'redux-devtools-extension';
import {analyticsMiddleware, subject} from '../analytics';
import {ANALYTICS_TOPIC_STATE} from '../constants';
import {loadRemoteConfigs} from '../actions';
import * as reducers from './reducers';

const middlewares = [thunkMiddleware, analyticsMiddleware];
if (__DEV__) {
    middlewares.push(flipperMiddleware());
}

const store = createStore(
    combineReducers(reducers),
    composeWithDevTools(applyMiddleware(...middlewares)),
);
store.subscribe(() => {
    subject.next({topic: ANALYTICS_TOPIC_STATE, state: store.getState()});
});
store.dispatch(loadRemoteConfigs());

const StoreProvider = ({children}) => (
    <Provider store={store}>{children}</Provider>
);

StoreProvider.propTypes = {
    children: PropTypes.node.isRequired,
};

export {StoreProvider, store};
