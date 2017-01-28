import React, { Component } from 'react';
import { Link } from 'react-router';

require('./AlbumItem.scss');

export default class AlbumItem extends Component {
    render() {
        return (
        <Link to={`/album/${this.props.album.getIn(['id'])}`} className="album-item" 
            aria-labelledby={`album-${this.props.idx}`} aria-posinset={this.props.idx + 1} aria-level="1"
            aria-setsize={this.props.setSize}>
			<img src={this.props.album.get('images').first().get('url')} alt={this.props.album.get('name')}/>
			<section className="info-overlay">
                <h4 id={`album-${this.props.idx}`}>{this.props.album.get('name')}</h4>
                <p className="artists">{this.props.album.get('artists').map(artist => artist.get('name')).join(', ')}</p>
            </section>
		</Link>
        )
    }
}
