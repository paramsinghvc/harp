import React, { Component } from 'react';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import { browserHistory } from 'react-router';

import bindThis from '../../shared/bindThis';
import { setAudio, playAudio } from '../../modules/player/PlayerActions'

require('./TrackItem.scss');

@connect((state) => {
    return {}
}, (dispatch) => {
    return bindActionCreators({ setAudio, playAudio }, dispatch);
})
export default class TrackItem extends Component {
    constructor(props) {
        super(props);
    }

    @bindThis
    sendPlayTrackBeacon() {
        let audioObj = {
            name: this.props.track.get('name'),
            artists: this.prepareArtistsString(this.props.track.get('artists')),
            url: this.props.track.get('preview_url')
        }
        this.props.setAudio(audioObj);

        this.props.playAudio();
    }

    @bindThis
    prepareArtistsString(artists) {
        return artists.map(artist => artist.get('name')).join(', ')
    }

    @bindThis
    openAlbumPage(albumId) {
        browserHistory.push(`/album/${albumId}`);
    }

    render() {
        return (
            <section className="track-item">
                <div className="play-button" onClick={this.sendPlayTrackBeacon}>
                    <i className="material-icons"></i>
                </div>
                <p className="song-name">
                    <span className="name">{this.props.track.get('name')}</span>
                    {this.props.track.get('explicit') && <span className="explicit-callout">EXPLICIT</span>}
                </p>
                <p className="artists">
                    {this.prepareArtistsString(this.props.track.get('artists'))}
                </p>
                <p className="album-name" onClick={() => {this.openAlbumPage(this.props.track.getIn(['album', 'id']))}}>
                    {this.props.track.getIn(['album', 'name'])}
                </p>
            </section>
        )
    }
}
