import React, { Component } from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import {browserHistory} from 'react-router';

import { setSnackbar } from '../app/AppActions';
import LoginService from './LoginService';

require('./Login.scss');

@connect((state) => {
    return {}
}, (dispatch) => {
    return bindActionCreators({ setSnackbar }, dispatch)
})
class Login extends Component {
    constructor(props) {
        super(props);
        this.subscription = null;
    }
    componentDidMount() {
        LoginService.initHandlers();
        this.subscription = LoginService.accessToken$.subscribe(res => {
            if (res) {
                this.props.setSnackbar({
                    message: 'Login Successful',
                    open: true
                });
                browserHistory.push('/');
            }
        }, err => {
            this.props.setSnackbar({
                message: err,
                open: true
            })
        })
    }
    componentWillUnmount() {
        this.subscription.unsubscribe();
    }
    render() {
        return (
            <section className="login-holder">
	    		<img className="logo" src="/assets/images/spotify-128.png" />
	    		<button className="login-button ripple" onClick={LoginService.launchPopup}>Login to Spotify</button>
    		</section>
        )
    }
}

export default Login;
