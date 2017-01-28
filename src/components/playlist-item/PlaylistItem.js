import React, { Component } from 'react';
import { Link } from 'react-router';

require('./PlaylistItem.scss');

export default class PlaylistItem extends Component {
    render() {
        return (
        <Link aria-label={this.props.playlist.get('name')} aria-posinset={this.props.idx + 1} aria-level="1"
            aria-setsize={this.props.setSize} aria-describedby={`info-overlay${this.props.idx}`} to={`/playlist/${this.props.playlist.getIn(['owner', 'id'])}/${this.props.playlist.get('id')}`} className="playlist-item">
			<img src={this.props.playlist.get('images').first().get('url')} />
			<section className="info-overlay" id={`info-overlay${this.props.idx}`}>
                <h4>{this.props.playlist.get('name')}</h4>
                <p className="total-tracks">{this.props.playlist.getIn(['tracks', 'total'])} Tracks</p>
            </section>
		</Link>
        )
    }
}
