import React from 'react';
import ReactDOM from 'react-dom';
import { Provider } from 'react-redux';
import { createStore } from 'redux';
import reducers from 'client/reducers';
import Viewport from 'client/components/Viewport.react';
import 'client/utils';
import 'client/styles';

const store = createStore(
    reducers,
    window.__REDUX_DEVTOOLS_EXTENSION__ && window.__REDUX_DEVTOOLS_EXTENSION__()
);

const place = document.getElementById('root');

ReactDOM.render(
    <Provider store={store}>
        <Viewport />
    </Provider>,
    place
);
