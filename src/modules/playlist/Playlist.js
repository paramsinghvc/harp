import React, { Component } from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';

import bindThis from '../../shared/bindThis';
import { getPlaylistData } from './PlaylistActions';
import TracksList from '../../components/tracks-list/TracksList';

require('./Playlist.scss');

@connect((state) => {
    return {
        playlist: state.playlist.get('data')
    }
}, (dispatch) => {
    return bindActionCreators({ getPlaylistData }, dispatch)
})
class Categories extends Component {
    constructor(props) {
        super(props);
    }
    componentDidMount() {
        const { userId, playlistId } = this.props.params;
        this.props.getPlaylistData(userId, playlistId);
    }
    render() {
        return (
            <main className="playlist">
                <section className="hero-section">
                    <img src={this.props.playlist.get('images').first().get('url')} />
                    <div className="info-section">
                        <p>{this.props.playlist.get('name')}</p>
                    </div>
                </section>
                <section className="playlist-tracks">
                    <TracksList tracks={this.props.playlist.getIn(['tracks', 'items'])}/>
                </section>
            </main>
        )
    }
}

export default Categories;
