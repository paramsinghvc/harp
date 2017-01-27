import React, { Component } from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';

import { getFeaturedPlaylists } from '../CategoriesActions';
import PlaylistItem from '../../../components/playlist-item/PlaylistItem';

require('./FeaturedPlaylists.scss');

@connect((state) => {
    return {
        playlists: state.categories.getIn(['featuredPlaylists', 'items'])
    }
}, (dispatch) => {
    return bindActionCreators({ getFeaturedPlaylists }, dispatch)
})
export default class FeaturedPlaylists extends Component {
    componentDidMount() {
        this.props.getFeaturedPlaylists();
    }

    render() {
        return (
            <div className="featured-playlists">
                <h2> Featured Playlists</h2>
	            <div className="playlists">
	            	{this.props.playlists.map((playlist, i) => <PlaylistItem playlist={playlist} key={i} />)}
	            </div>
        	</div>
        )
    }

}
