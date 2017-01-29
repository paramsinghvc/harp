import React, { Component } from 'react';
import { Link } from 'react-router';

export default class SearchArtistItem extends Component {
    render() {
    	let imgUrl = this.props.artist.get('images').size > 0 ? this.props.artist.get('images').first().get('url') : null;
        return (
        	<Link to={`/artist/${this.props.artist.get('id')}`}  className="search-artist-item" onClick={this.props.closeSearchOverlay}>
        		<section className="container">
        			<div className="img-holder">
        				<div className="bgImage" style={{backgroundImage: `url(${imgUrl}`}}></div>
        				<img src={imgUrl} />
        			</div>
        			<p className="title">{this.props.artist.get('name')}</p>
        		</section>
        	</Link>
        )
    }
}
