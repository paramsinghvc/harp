import React, { Component } from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';

import { getNewReleasesData } from './NewReleasesActions';
import AlbumItem from '../../components/album-item/AlbumItem';
require('./NewReleases.scss');

@connect((state) => {
    return {
        newReleasesAlbums: state.newReleases.get('data')
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
            <section className="new-releases-holder">
                <h2> New Releases</h2>
                <main className="albums">
                    {this.props.newReleasesAlbums.get('items').map((album , i) => <AlbumItem album={album} key={i} />)}
                </main>
    		</section>
        )
    }
}

export default NewReleases;
