import React, { Component, PropTypes } from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';

import { setLoading, toggleAppDrawer } from '../app/AppActions';
import Header from './components/Header';

require('./Home.scss');
const mapStateToProps = (state) => {
  return {
    isLoading: state.app.get('isLoading'),
    appName: state.app.get('appName'),
    appDrawerOpen: state.app.get('appDrawerOpen')
  };
}

const mapDispatchToProps = (dispatch) => {
    return bindActionCreators({
        setLoading,
        toggleAppDrawer
    }, dispatch);
}

@connect(mapStateToProps, mapDispatchToProps)
class Home extends Component {
    render() {
        return (
        	<div className="home">
        	 	<Header title={this.props.appName} toggleAppDrawer={this.props.toggleAppDrawer} appDrawerOpen={this.props.appDrawerOpen} />
        		<p>Home Works!</p>
        		<div>
        			{this.props.children}
        		</div>
        	</div>
        )
    }
}

export default Home;