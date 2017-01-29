import React, { Component } from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import RaisedButton from 'material-ui/RaisedButton';
import { Map } from 'immutable';
import { Tabs, Tab } from 'material-ui/Tabs';

import bindThis from '../../shared/bindThis';
import { getUserData, getUserFollowedArtists, getUserSavedAlbums } from './UserActions';
import { setAndLaunchPlayerQueue } from '../player/PlayerActions';
import TracksList from '../../components/tracks-list/TracksList';
import SearchAlbumItem from '../search/components/SearchAlbumItem';
import SearchArtistItem from '../search/components/SearchArtistItem';

require('./User.scss');

@connect((state) => {
    return {
        isLoading: state.app.get('isLoading'),
        userInfo: state.user.get('data'),
        user: state.user
    }
}, (dispatch) => {
    return bindActionCreators({ getUserData, getUserFollowedArtists, getUserSavedAlbums, setAndLaunchPlayerQueue }, dispatch)
})
class User extends Component {
    constructor(props) {
        super(props);
    }
    componentDidMount() {
        this.props.getUserData();
    }

    @bindThis
    queueTracks() {
        let queue = this.props.user.getIn(['savedTracks', 'items']).map(t => {
            let track = t.get('track');
            return Map({
                name: track.get('name'),
                artists: (track.get('artists')).map(artist => artist.get('name')).join(', '),
                url: track.get('preview_url')
            });
        })
        this.props.setAndLaunchPlayerQueue(queue);
    }

    render() {
        let imgUrl = this.props.userInfo.get('images').first().get('url');
        return (
            <main className="user">
            {!this.props.isLoading &&
                (
                <div>
                    <section className="hero-section" tabIndex="0" aria-labelledby="user-info-section"> 
                        <div style={{backgroundImage : `url(${imgUrl})`}} className="hero-bg-image"></div>
                        <div className="hero-content">
                            <img src={imgUrl} alt={this.props.userInfo.get('display_name')} />
                            <div className="info-section" id="user-info-section">
                                <p>{this.props.userInfo.get('display_name')}</p>
                                <section className="buttons">
                                    <RaisedButton label="Play" primary={true} style={{marginTop: 20, marginRight: 20}} onClick={this.queueTracks} aria-label="Play Button"/>                                
                                </section>
                            </div>
                        </div>
                    </section>
                    <Tabs>
                        <Tab label="Saved Tracks">
                            <section className="user-tracks" tabIndex="0" aria-label="Tracks List">
                                <TracksList tracks={this.props.user.getIn(['savedTracks', 'items'])}/>
                            </section>
                        </Tab>
                        <Tab label="Followed Artists" onActive={this.props.getUserFollowedArtists}>
                            <section className="r-holder">
                                {this.props.user.getIn(['followedArtists', 'items']).map((artistItem, i) => <SearchArtistItem artist={artistItem} key={i} idx={i}  closeSearchOverlay={() => {}} />)}
                            </section>
                        </Tab>
                        <Tab label="Saved Albums" onActive={this.props.getUserSavedAlbums}>
                            <section className="r-holder">
                            {this.props.user.getIn(['savedAlbums', 'items']).map(albumItem => albumItem.get('album')).map((albumItem, i) => <SearchAlbumItem album={albumItem} key={i} idx={i}  closeSearchOverlay={() => {}} />)}
                            </section>
                        </Tab>
                    </Tabs>                    
                </div>
            )}
            </main>
        )
    }
}

export default User;
