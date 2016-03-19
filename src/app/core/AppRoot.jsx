import 'babel-polyfill';

import React from 'react';
import Helmet from 'react-helmet';
import {Router, Route, browserHistory, IndexRoute} from 'react-router';
import {Provider} from 'react-redux';
import {syncHistoryWithStore} from 'react-router-redux';

import configureStore from './../store';
import initialState from './initialState';
import Layout from './components/Layout.jsx';
import {getClientUrl} from './helpers';

const store = configureStore(initialState);

const history = syncHistoryWithStore(browserHistory, store);

const Home = React.createClass({
    render() {
        return (
            <div>
                <Helmet title="Home"/>
                <h2>Home</h2>
            </div>
        );
    }
});

const AppRoot = React.createClass({
    render() {
        return (
            <Provider store={store}>
                <Router history={history}>
                    <Route path={getClientUrl('/')} component={Layout}>
                        <IndexRoute component={Home}/>
                    </Route>
                </Router>
            </Provider>
        );
    }
});

export default AppRoot;
