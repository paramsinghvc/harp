import React, { Component } from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import RaisedButton from 'material-ui/RaisedButton';
import Chip from 'material-ui/Chip';
import { Map } from 'immutable';

import bindThis from '../../shared/bindThis';
import { getArtistData } from './ArtistActions';
import { setAndLaunchPlayerQueue } from '../player/PlayerActions';
import TracksList from '../../components/tracks-list/TracksList';

require('./Artist.scss');

@connect((state) => {
    return {
        isLoading: state.app.get('isLoading'),
        artist: state.artist.get('data')
    }
}, (dispatch) => {
    return bindActionCreators({ getArtistData, setAndLaunchPlayerQueue }, dispatch)
})
class Artist extends Component {
    constructor(props) {
        super(props);
    }
    componentDidMount() {
        const { artistId } = this.props.params;
        this.props.getArtistData(artistId);
    }
    
    componentWillReceiveProps(nextProps) {
        if (this.props.params.artistId != nextProps.params.artistId) {
            const { artistId } = nextProps.params;
            console.log(nextProps.params);
            this.props.getArtistData(artistId);
        }
    }

    @bindThis
    queueTracks() {
        let queue = this.props.artist.getIn(['tracks', 'items']).map(track => {
            return Map({
                name: track.get('name'),
                artists: (track.get('artists')).map(artist => artist.get('name')).join(', '),
                url: track.get('preview_url')
            });
        })
        this.props.setAndLaunchPlayerQueue(queue);
    }

    render() {
        let imgUrl = this.props.artist.get('images').first().get('url');
        return (
            <main className="artist">
            {!this.props.isLoading &&
                (
                <div>
                    <section className="hero-section" tabIndex="0" aria-labelledby="artist-info-section"> 
                        <div style={{backgroundImage : `url(${imgUrl})`}} className="hero-bg-image"></div>
                        <div className="hero-content">
                            <img src={imgUrl} alt={this.props.artist.get('name')} />
                            <div className="info-section" id="artist-info-section">
                                <p>{this.props.artist.get('name')}</p>
                                <section className="chips-holder">
                                    {this.props.artist.get('genres').map((genre, i) => <div className="chip" key={i}>{genre}</div>)}
                                </section>
                                <p>{this.props.artist.getIn(['followers', 'total'])} Followers</p>
                                {/*<RaisedButton label="Play" primary={true} style={{marginTop: 20}} onClick={this.queueTracks} aria-label="Play Button"/>*/}
                            </div>
                        </div>
                    </section>
                    <section className="artist-tracks" tabIndex="0" aria-label="Tracks List">
                        {/*<TracksList tracks={this.props.artist.getIn(['tracks', 'items'])}/>*/}
                    </section>
                </div>
            )}
            </main>
        )
    }
}

export default Artist;
