import React, { Component } from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import RaisedButton from 'material-ui/RaisedButton';
import { Map } from 'immutable';

import bindThis from '../../shared/bindThis';
import { getPlaylistData } from './PlaylistActions';
import { setAndLaunchPlayerQueue } from '../player/PlayerActions';
import TracksList from '../../components/tracks-list/TracksList';

require('./Playlist.scss');

@connect((state) => {
    return {
        isLoading: state.app.get('isLoading'),
        playlist: state.playlist.get('data')
    }
}, (dispatch) => {
    return bindActionCreators({ getPlaylistData, setAndLaunchPlayerQueue }, dispatch)
})
class Categories extends Component {
    constructor(props) {
        super(props);
    }
    componentDidMount() {
        const { userId, playlistId } = this.props.params;
        this.props.getPlaylistData(userId, playlistId);
    }
    @bindThis
    queueTracks() {
        let queue = this.props.playlist.getIn(['tracks', 'items']).map(track => {
            return Map({
                name: track.getIn(['track', 'name']),
                artists: (track.getIn(['track', 'artists'])).map(artist => artist.get('name')).join(', '),
                url: track.getIn(['track', 'preview_url'])
            });
        })
        this.props.setAndLaunchPlayerQueue(queue);
    }
    render() {
        return (
            <main className="playlist" aria-labelledby="playlist-name" tabIndex="0">
            {!this.props.isLoading && 
            (<div>
                <section className="hero-section">
                    <img src={this.props.playlist.get('images').first().get('url')} alt={this.props.playlist.get('name')} />
                    <div className="info-section">
                        <p id="playlist-name">{this.props.playlist.get('name')}</p>
                        <RaisedButton label="Play" primary={true} style={{marginTop: 20}} onClick={this.queueTracks}/>
                    </div>
                </section>
                <section className="playlist-tracks" aria-label="Playlist Tracks">
                    <TracksList tracks={this.props.playlist.getIn(['tracks', 'items'])}/>
                </section>
            </div>
            )}
            </main>
        )
    }
}

export default Categories;
