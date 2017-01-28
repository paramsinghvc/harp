import React, { Component } from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';

import { getNewReleasesData } from './NewReleasesActions';
import AlbumItem from '../../components/album-item/AlbumItem';
require('./NewReleases.scss');

@connect((state) => {
    return {
        isLoading: state.app.get('isLoading'),
        newReleasesAlbums: state.newReleases.getIn(['data', 'items'])
    }
}, (dispatch) => {
    return bindActionCreators({ getNewReleasesData }, dispatch)
})
class NewReleases extends Component {
    constructor(props) {
        super(props);        
    }
    componentDidMount() {
        this.props.getNewReleasesData();
    }
    render() {
        return (
            <section className="new-releases-holder" aria-labelledby="new-releases-holder" tabIndex="0">
                <h2 id="new-releases-holder"> New Releases</h2>
                {!this.props.isLoading && (<main className="albums">
                    {this.props.newReleasesAlbums.map((album , i) => <AlbumItem album={album} key={i} idx={i} setSize={this.props.newReleasesAlbums.size} />)}
                </main>)}
    		</section>
        )
    }
}

export default NewReleases;
