import React from 'react';
import { Provider } from 'react-redux';
import { Router, browserHistory } from 'react-router';
import routes from './routes';

// Base stylesheet
require('./Main.scss');

export default function Main(props) {
    return (
    <Provider store={props.store}>
        <Router history={browserHistory} key={Math.random()}>
        	{routes}
        </Router>    
    </Provider>
    );
}

Main.propTypes = {
    store: React.PropTypes.object.isRequired,
};
