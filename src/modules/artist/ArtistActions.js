import makeActionCreator from '../../shared/ActionCreator';
import ArtistConstants from './ArtistConstants';
import ApiBridge from '../../shared/ApiBridge';
import { handleError } from '../app/AppActions';

export const setArtistData = makeActionCreator(ArtistConstants.SET_ARTIST_DATA, 'payload');
export const setArtistTracks = makeActionCreator(ArtistConstants.SET_ARTIST_TRACKS, 'payload');

export const getArtistData = (artistId) => {
    return (dispatch) => {
        ApiBridge.makeGet(`/v1/artists/${artistId}`, undefined, undefined, true)
            .then(res => {
                dispatch(setArtistData(res));
            })
            .catch(err => {
                dispatch(handleError(err));
            })
    }
}

export const getArtistTracks = (artistId) => {
    return (dispatch) => {
        ApiBridge.makeGet(`/v1/artists/${artistId}/top-tracks`, undefined, undefined, true)
            .then(res => {
                dispatch(setArtistTracks(res.tracks));
            })
            .catch(err => {
                dispatch(handleError(err));
            })
    }
}