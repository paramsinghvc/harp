import React, { Component } from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';

import bindThis from '../../shared/bindThis';
import { getAlbumData } from './AlbumActions';
import TracksList from '../../components/tracks-list/TracksList';

require('./Album.scss');

@connect((state) => {
    return {
        album: state.album.get('data')
    }
}, (dispatch) => {
    return bindActionCreators({ getAlbumData }, dispatch)
})
class Album extends Component {
    constructor(props) {
        super(props);
    }
    componentDidMount() {
        const { albumId } = this.props.params;
        this.props.getAlbumData(albumId);
    }
    render() {
        return (
            <main className="album">
                <section className="hero-section">
                    <img src={this.props.album.get('images').first().get('url')} />
                    <div className="info-section">
                        <p>{this.props.album.get('name')}</p>
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
