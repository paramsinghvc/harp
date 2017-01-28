import React, { Component } from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';

import { getSelectedCategoryDetails } from '../CategoriesActions';
import PlaylistItem from '../../../components/playlist-item/PlaylistItem';

require('./CategoryPlaylists.scss');

@connect((state) => {
    return {
        isLoading: state.app.get('isLoading'),
        category: state.categories.getIn(['selectedCategory']),
        playlists: state.categories.getIn(['playlists', 'items'])
    }
}, (dispatch) => {
    return bindActionCreators({ getSelectedCategoryDetails }, dispatch)
})
export default class CategoryPlaylists extends Component {
    componentDidMount() {
        this.props.getSelectedCategoryDetails(this.props.params.id);
    }

    render() {
        return (
            <main className="cat-playlists" aria-labelledby="cat-name" tabIndex="0">
            {!this.props.isLoading && 
            	(<div>
                    <section className="hero-section">
            		<img src={this.props.category.get('icons').first().get('url')} alt={this.props.category.get('name')} tabIndex="0" />
        			<section className="info-section">
        				<p id="cat-name" role="heading" tabIndex="0">{this.props.category.get('name')}</p>
        			</section>
                	</section>
    	            <div className="playlists" role="list" >
    	            	{this.props.playlists.map((playlist, i) => <PlaylistItem playlist={playlist} idx={i} key={i} setSize={this.props.playlists.size}/>)}
    	            </div>
                </div>
                )}
        	</main>
        )
    }

}
