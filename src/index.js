import React, { StrictMode } from 'react';
import ReactDOM from 'react-dom';
import { configureStore } from '@reduxjs/toolkit'
import rootReducer from './reducers';
import { Provider } from 'react-redux';
import { BrowserRouter } from 'react-router-dom';
import { createBrowserHistory } from 'history';
import { routerMiddleware } from 'react-router-redux';

import Routes from './routes';

export const history = createBrowserHistory();
export const myRouterMiddleware = routerMiddleware(history);
const store = configureStore({ reducer: rootReducer});

ReactDOM.render(
    <StrictMode>
        <Provider store={store}>
            <BrowserRouter history={history}>
                <Routes />
            </BrowserRouter>
        </Provider>
    </StrictMode>,
    document.getElementById('root')
  );
