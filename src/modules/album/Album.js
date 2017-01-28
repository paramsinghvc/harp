import React, { Component } from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import RaisedButton from 'material-ui/RaisedButton';
import { Map } from 'immutable';

import bindThis from '../../shared/bindThis';
import { getAlbumData } from './AlbumActions';
import { setAndLaunchPlayerQueue } from '../player/PlayerActions';
import TracksList from '../../components/tracks-list/TracksList';

require('./Album.scss');

@connect((state) => {
    return {
        isLoading: state.app.get('isLoading'),
        album: state.album.get('data')
    }
}, (dispatch) => {
    return bindActionCreators({ getAlbumData, setAndLaunchPlayerQueue }, dispatch)
})
class Album extends Component {
    constructor(props) {
        super(props);
    }
    componentDidMount() {
        const { albumId } = this.props.params;
        this.props.getAlbumData(albumId);
    }

    @bindThis
    queueTracks() {
        let queue = this.props.album.getIn(['tracks', 'items']).map(track => {
            return Map({
                name: track.get('name'),
                artists: (track.get('artists')).map(artist => artist.get('name')).join(', '),
                url: track.get('preview_url')
            });
        })
        this.props.setAndLaunchPlayerQueue(queue);
    }

    render() {
        return (
            <main className="album">
            {!this.props.isLoading &&
                (
                <div>
                    <section className="hero-section" tabIndex="0" aria-labelledby="album-info-section"> 
                        <img src={this.props.album.get('images').first().get('url')} alt={this.props.album.get('name')} />
                        <div className="info-section" id="album-info-section">
                            <p>{this.props.album.get('name')}</p>
                            <RaisedButton label="Play" primary={true} style={{marginTop: 20}} onClick={this.queueTracks} aria-label="Play Button"/>
                        </div>
                    </section>
                    <section className="album-tracks" tabIndex="0" aria-label="Tracks List">
                        <TracksList tracks={this.props.album.getIn(['tracks', 'items'])}/>
                    </section>
                </div>
            )}
            </main>
        )
    }
}

export default Album;
