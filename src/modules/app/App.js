import React, { Component, PropTypes } from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider';
import getMuiTheme from 'material-ui/styles/getMuiTheme';
import Snackbar from 'material-ui/Snackbar';

import { setSnackbar } from '../app/AppActions';

const muiTheme = getMuiTheme({
    palette: {
        primary1Color: '#00d95f',
        textColor: '#000',
    }
});

const appStyles = require('./App.scss');

import DevTools from './components/ReduxDevTools';

@connect((state) => {
    return {
        sbOpen: state.app.getIn(['snackBar', 'open']),
        sbMsg: state.app.getIn(['snackBar', 'message'])
    }
}, (dispatch) => {
    return bindActionCreators({ setSnackbar }, dispatch)
})
class App extends Component {
    constructor(props) {
        super(props);
        this.state = { isMounted: false };
    }

    componentDidMount() {
        this.setState({ isMounted: true });
    }

    render() {
        return (
            <div>
                {this.state.isMounted && !window.devToolsExtension && process.env.NODE_ENV === 'development' && <DevTools />}
                <MuiThemeProvider muiTheme={muiTheme}>    
                    <div>                                                  
                        {this.props.children}               
                          <Snackbar
                              open={this.props.sbOpen}
                              message={this.props.sbMsg}
                              autoHideDuration={2000}
                              onRequestClose={() => {
                                this.props.setSnackbar({
                                    open: false,
                                    message: ''
                                })
                              }}
                            />
                    </div>                              
                </MuiThemeProvider>
            </div>
        );
    }
}

App.propTypes = {};

export default App;
