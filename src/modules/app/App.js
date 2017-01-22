import React, { Component, PropTypes } from 'react';
import { connect } from 'react-redux';
// import CSSModules from 'react-css-modules';

// Import Style
const appStyles = require('./App.scss');

// Import Components
import DevTools from './components/ReduxDevTools';

// @CSSModules(appStyles)
export class App extends Component {
  constructor(props) {
    super(props);
    this.state = { isMounted: false };
  }

  componentDidMount() {
    this.setState({isMounted: true});
  }  

  render() {
    return (
      <div>
        {this.state.isMounted && !window.devToolsExtension && process.env.NODE_ENV === 'development' && <DevTools />}
        <div>                  	
            <h1>Hola Mundo! 
                <span>{this.props.isLoading ? 'Loading...' : ''}</span>
            </h1>
            <div>
              {this.props.children}
            </div>          
        </div>
      </div>
    );
  }
}

App.propTypes = {
};

// Retrieve data from store as props
function mapStateToProps(state) {
  return {
    isLoading: state.app.get('isLoading')
  };
}

export default connect(mapStateToProps)(App);
