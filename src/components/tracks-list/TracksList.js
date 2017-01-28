import React, { Component } from 'react';

import TrackItem from '../track-item/TrackItem';
require('./TracksList.scss');

export default class TracksList extends Component {
    render() {
        return (
            <section className="tracks-list" tabIndex="0" aria-label="Tracks List">
	        	<ul className="header">
	        		<li>Song</li>
	        		<li>Artist</li>
	        		<li>Album</li>
	        	</ul>
				{this.props.tracks.map((trackItem, i) => <TrackItem key={i} idx={i} setSize={this.props.tracks.size} track={trackItem.get('track') || trackItem}/>)}
		</section>
        )
    }
}
