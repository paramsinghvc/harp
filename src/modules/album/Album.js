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
                <section className="hero-section">
                    <img src={this.props.album.get('images').first().get('url')} />
                    <div className="info-section">
                        <p>{this.props.album.get('name')}</p>
                        <RaisedButton label="Play" primary={true} style={{marginTop: 20}} onClick={this.queueTracks}/>
                    </div>
                </section>
                <section className="album-tracks">
                    <TracksList tracks={this.props.album.getIn(['tracks', 'items'])}/>
                </section>
            </main>
        )
    }
}

export default Album;
