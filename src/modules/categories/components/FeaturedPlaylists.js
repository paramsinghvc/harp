import React, { Component } from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';

import { getFeaturedPlaylists } from '../CategoriesActions';
import PlaylistItem from '../../../components/playlist-item/PlaylistItem';

require('./FeaturedPlaylists.scss');

@connect((state) => {
    return {
        isLoading: state.app.get('isLoading'),
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
            <section className="featured-playlists"  aria-labelledby="f-name" tabIndex="0">
                <h2 id="f-name"> Featured Playlists</h2>
	            {!this.props.isLoading && (<section className="playlists" tabIndex="0" aria-label="Playlists">
	            	{this.props.playlists.map((playlist, i) => <PlaylistItem playlist={playlist} key={i} idx={i} setSize={this.props.playlists.size}/>)}
	            </section>)}
        	</section>
        )
    }

}
