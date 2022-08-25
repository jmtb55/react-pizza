import { combineReducers } from 'redux';
import { routerReducer } from 'react-router-redux';
import auth from './features/auth/state';
import pizza from './features/pizza/state';

const rootReducer = combineReducers({
    auth,
    pizza,
    router: routerReducer
});

export default rootReducer;