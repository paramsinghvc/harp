import React, { Component } from 'react';

import TrackItem from '../track-item/TrackItem';
require('./TracksList.scss');

export default class TracksList extends Component {
    render() {
        return (
            <section className="tracks-list">
	        	<ul className="header">
	        		<li>Song</li>
	        		<li>Artist</li>
	        		<li>Album</li>
	        	</ul>
				{this.props.tracks.map((trackItem, i) => <TrackItem key={i} track={trackItem.get('track') || trackItem}/>)}
		</section>
        )
    }
}
