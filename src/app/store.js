import { createStore, applyMiddleware, compose } from 'redux';
import thunkMiddleware from 'redux-thunk';
import rootReducer from './core/rootReducers';

const enhancer = compose(
    applyMiddleware(thunkMiddleware),
    window.devToolsExtension ? window.devToolsExtension() : f => f
);

export default function configureStore(initialState) {
    const store = createStore(
        rootReducer,
        initialState,
        enhancer
    );

    // Needed if want to hot reload reducers
    // See (https://github.com/reactjs/react-redux/releases/tag/v2.0.0)
    if (module.hot) {
        module.hot.accept('./core/rootReducers', () => {
            const nextRootReducers = require('./core/rootReducers').default;
            store.replaceReducer(nextRootReducers);
        });
    }

    return store;
}
