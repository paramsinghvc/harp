import React, { Component } from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import RaisedButton from 'material-ui/RaisedButton';

import bindThis from '../../shared/bindThis';
import SearchArtistItem from './components/SearchArtistItem';
import SearchPlaylistItem from './components/SearchPlaylistItem';
import SearchAlbumItem from './components/SearchAlbumItem';
import TracksList from '../../components/tracks-list/TracksList';
import { setSearchOverlayDisplay } from './SearchActions';

require('./Search.scss');

@connect((state) => {
    return {
        isLoading: state.app.get('isLoading'),
        search: state.search
    }
}, (dispatch) => {
    return bindActionCreators({
        setSearchOverlayDisplay
    }, dispatch)
})
class Search extends Component {
    constructor(props) {
        super(props);
    }
    componentDidMount() {

    }
    @bindThis
    closeSearchOverlay() {
        this.props.setSearchOverlayDisplay(false)
    }

    render() {
        return (
            <section className="search-overlay">
                <section className="header">
                    <h2>Showing results for "{this.props.search.get('searchText')}"</h2>
                    <i className="material-icons" onClick={this.closeSearchOverlay}>close</i>
                </section>
                <main className="search-results-holder">                
                    <section className="artists-results">
                        <h3>Artists</h3>
                        <section className="r-holder">
                            {this.props.search.getIn(['searchResult', 'artists', 'items']).map((artistItem, i) => <SearchArtistItem artist={artistItem} key={i} idx={i} closeSearchOverlay={this.closeSearchOverlay} />)}
                        </section>
                    </section>
                    <section className="playlists-results">
                        <h3>Playlists</h3>
                        <section className="r-holder">
                            {this.props.search.getIn(['searchResult', 'playlists', 'items']).map((playlistItem, i) => <SearchPlaylistItem playlist={playlistItem} key={i} idx={i}  closeSearchOverlay={this.closeSearchOverlay} />)}
                        </section>
                    </section>
                    <section className="albums-results">
                        <h3>Albums</h3>
                        <section className="r-holder">
                            {this.props.search.getIn(['searchResult', 'albums', 'items']).map((albumItem, i) => <SearchAlbumItem album={albumItem} key={i} idx={i}  closeSearchOverlay={this.closeSearchOverlay} />)}
                        </section>
                    </section>
                    <section className="tracks-results">
                        <h3>Songs</h3>
                        <section className="r-holder">
                            <TracksList tracks={this.props.search.getIn(['searchResult', 'tracks', 'items'])}/>
                        </section>
                    </section>
                </main>
            </section>
        )
    }
}

export default Search;
