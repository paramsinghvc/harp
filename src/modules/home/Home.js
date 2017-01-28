import React, { Component, PropTypes } from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import CircularProgress from 'material-ui/CircularProgress';

import { setLoading, toggleAppDrawer } from '../app/AppActions';
import Header from './components/Header';
import Footer from './components/Footer';
import Player from '../player/Player';
import Search from '../search/Search';

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
                <a className="skip-link" href="#main-content" tabIndex="0">Skip to main content</a>
        	 	<Header title={this.props.appName} toggleAppDrawer={this.props.toggleAppDrawer} appDrawerOpen={this.props.appDrawerOpen} />        		        
                <div id="main-content">{this.props.children}</div>
                {(this.props.isLoading === true) && <CircularProgress size={60} thickness={3} style={{position: 'fixed', top: '50%', left: '50%', marginLeft: '-30px', marginTop: '-30px'}} />}
                {/*<Search />*/}
                <div className="bottom-spacer" />                
                {/*<Footer appName={this.props.appName} />*/}
                <Player />
        	</div>
        )
    }
}

export default Home;