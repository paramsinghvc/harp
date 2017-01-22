import React, { Component, PropTypes } from 'react';
import { connect } from 'react-redux';

// Import Style
// import styles from './App.css';

// Import Components
import DevTools from './components/ReduxDevTools';

export class App extends Component {
  constructor(props) {
    super(props);
    this.state = { isMounted: false };
  }

  componentDidMount() {
    this.setState({isMounted: true});
  }

  toggleAddPostSection = () => {
    // this.props.dispatch(toggleAddPost());
  };

  render() {
    return (
      <div>
        {this.state.isMounted && !window.devToolsExtension && process.env.NODE_ENV === 'development' && <DevTools />}
        <div>                  	
            <h1>Hola Mundo!</h1>
            <div>
            
            </div>          
        </div>
      </div>
    );
  }
}

App.propTypes = {
};

// Retrieve data from store as props
function mapStateToProps(store) {
  return {
  };
}

export default connect(mapStateToProps)(App);
