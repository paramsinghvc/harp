import React, { Component } from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import { browserHistory } from 'react-router';

import bindThis from '../../shared/bindThis';
import { getCategories, setSelectedCategory } from './CategoriesActions';

require('./Categories.scss');

@connect((state) => {
    return {
        categories: state.categories.getIn(['data', 'items'])
    }
}, (dispatch) => {
    return bindActionCreators({ getCategories, setSelectedCategory }, dispatch)
})
class Categories extends Component {
    constructor(props) {
        super(props);
    }
    componentDidMount() {
        this.props.getCategories();
    }
    @bindThis
    selectCategory(cat) {
        browserHistory.push(`/categories/${cat.get('id')}`);
    }
    render() {
        return (
            <section className="categories-holder">
                <h2>Top Categories - Genres & Moods </h2>
                <main className="categories"> 
                {this.props.categories.map((cat, i) => {
                    let icon = cat.get('icons').first();
                    return (
                        <div className="cat" key={i} onClick={() => {this.selectCategory(cat)}}>
                            <img src={icon.get('url')} width={icon.get('width')} height={icon.get('height')} />
                        </div>
                    )
                })}
                </main>
            </section>
        )
    }
}

export default Categories;
