import React, { Component } from 'react';
import { Link } from 'react-router';

export default class SearchPlaylistItem extends Component {
    render() {
        let imgUrl = this.props.playlist.get('images').size > 0 ? this.props.playlist.get('images').first().get('url') : null;
        return (
        	<Link to={`/playlist/${this.props.playlist.getIn(['owner', 'id'])}/${this.props.playlist.get('id')}`} className="search-playlist-item" onClick={this.props.closeSearchOverlay}>
        		<section className="container">
                    <div className="img-holder">
                        <div className="bgImage" style={{backgroundImage: `url(${imgUrl}`}}></div>
                        <img src={imgUrl} />
                    </div>
        			<p className="title">{this.props.playlist.get('name')}</p>
        		</section>
        	</Link>
        )
    }
}
