import React, { Component } from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import RaisedButton from 'material-ui/RaisedButton';

import bindThis from '../../shared/bindThis';
import {  } from './SearchActions';

require('./Search.scss');

@connect((state) => {
    return {
        isLoading: state.app.get('isLoading')
    }
}, (dispatch) => {
    return bindActionCreators({ }, dispatch)
})
class Search extends Component {
    constructor(props) {
        super(props);
    }
    componentDidMount() {
    
    }
    
    render() {
        return (
            <section className="search-overlay">
                SearchBox
            </section>
        )
    }
}

export default Search;
