import React, { Component } from 'react';
import { Link } from 'react-router';

export default class SearchAlbumItem extends Component {
    render() {
    	let imgUrl = this.props.album.get('images').size > 0 ? this.props.album.get('images').first().get('url') : null;
        return (
        	<Link to={`/album/${this.props.album.get('id')}`}  className="search-album-item" onClick={this.props.closeSearchOverlay}>
        		<section className="container">
        			<div className="img-holder">
        				<div className="bgImage" style={{backgroundImage: `url(${imgUrl}`}}></div>
        				<img src={imgUrl} />
        			</div>
        			<p className="title">{this.props.album.get('name')}</p>
        		</section>
        	</Link>
        )
    }
}
