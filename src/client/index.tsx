import React from 'react';
import ReactDOM from 'react-dom';
import { Provider } from 'react-redux';
import { createStore, applyMiddleware, compose } from 'redux';
import thunk from 'redux-thunk';
import { createLogger } from 'redux-logger';
import rootReducer from 'client/redux/reducers';
import Viewport from 'client/components/Viewport.react';
import 'client/utils';
import 'client/styles';

const logger = createLogger({ collapsed: true, duration: true });
const middleware = [thunk, logger];

const store = createStore(
    rootReducer,
    {},
    // compose(
    applyMiddleware(...middleware)
    // window.__REDUX_DEVTOOLS_EXTENSION__ && window.__REDUX_DEVTOOLS_EXTENSION__()
    // )
);

const place = document.getElementById('root');

ReactDOM.render(
    <Provider store={store}>
        <Viewport />
    </Provider>,
    place
);
