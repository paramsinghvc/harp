import React, { Component } from 'react';
import { Link } from 'react-router';

require('./AlbumItem.scss');

export default class AlbumItem extends Component {
    render() {
        return (
        <Link to={`/album/${this.props.album.getIn(['id'])}`} className="album-item">
			<img src={this.props.album.get('images').first().get('url')} />
			<section className="info-overlay">
                <h4>{this.props.album.get('name')}</h4>
                <p className="artists">{this.props.album.get('artists').map(artist => artist.get('name')).join(', ')}</p>
            </section>
		</Link>
        )
    }
}
