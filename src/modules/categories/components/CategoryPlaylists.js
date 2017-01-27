import React, { Component } from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';

import { getSelectedCategoryDetails } from '../CategoriesActions';
import PlaylistItem from '../../../components/playlist-item/PlaylistItem';

require('./CategoryPlaylists.scss');

@connect((state) => {
    return {
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
            <div className="cat-playlists">
            	<div className="hero-section">
            		<img src={this.props.category.get('icons').first().get('url')} />
        			<div className="info-section">
        				<p>{this.props.category.get('name')}</p>
        			</div>
            	</div>
	            <div className="playlists">
	            	{this.props.playlists.map((playlist, i) => <PlaylistItem playlist={playlist} key={i} />)}
	            </div>
        	</div>
        )
    }

}
