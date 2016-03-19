import {combineReducers} from 'redux';
import {routerReducer} from 'react-router-redux';

const rootReducer = combineReducers({
    routing: routerReducer // redux-router stuff
});

export default rootReducer;
