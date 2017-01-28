import React, { Component } from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import { Link } from 'react-router';

import bindThis from '../../shared/bindThis';
import { getCategories, setSelectedCategory } from './CategoriesActions';

require('./Categories.scss');

@connect((state) => {
    return {
        isLoading: state.app.get('isLoading'),
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

    render() {
        return (
            <section className="categories-holder" aria-labelledby="categories-header" tabIndex="0">
                <h2 id="categories-header">Top Categories - Genres & Moods </h2>
                {!this.props.isLoading && (<main className="categories"> 
                {this.props.categories.map((cat, i) => {
                    let icon = cat.get('icons').first();
                    return (
                        <Link to={`/categories/${cat.get('id')}`} aria-label={cat.get('name')} className="cat" key={i}>
                            <img src={icon.get('url')} width={icon.get('width')} height={icon.get('height')} alt={cat.get('name')}/>
                        </Link>
                    )
                })}
                </main>)}
            </section>
        )
    }
}

export default Categories;
