import React, { Component } from 'react';
import ReactDOM from 'react-dom';
import Rx from 'rxjs/Rx';

export default class SearchBox extends Component {
    constructor(props) {
        super(props);
    }

    componentDidMount() {
        Rx.Observable.fromEvent(ReactDOM.findDOMNode(this.refs.sb), 'keyup')
            .map(e => this.refs.sb.value)
            .filter(val => val.length > 0)
            .debounceTime(250)
            .subscribe(query => {
            	this.props.performSearch(query);
            })
    }

    render() {
        return (
            <input type="search" id="search-box" placeholder="Search" ref="sb"/>
        )
    }
}
