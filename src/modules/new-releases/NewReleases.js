import React, { Component } from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';

require('./Login.scss');

@connect((state) => {
    return {}
}, (dispatch) => {
    return bindActionCreators({ }, dispatch)
})
class Categories extends Component {
    constructor(props) {
        super(props);        
    }
    componentDidMount() {
        
    }
    render() {
        return (
            <section className="categories-holder">
	    		
    		</section>
        )
    }
}

export default Login;
