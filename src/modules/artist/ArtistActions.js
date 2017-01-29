import makeActionCreator from '../../shared/ActionCreator';
import ArtistConstants from './ArtistConstants';
import ApiBridge from '../../shared/ApiBridge';
import { handleError, setSnackbar } from '../app/AppActions';

export const setArtistData = makeActionCreator(ArtistConstants.SET_ARTIST_DATA, 'payload');
export const setArtistTracks = makeActionCreator(ArtistConstants.SET_ARTIST_TRACKS, 'payload');

export const getArtistData = (artistId) => {
    return (dispatch) => {
        ApiBridge.makeGet(`/v1/artists/${artistId}`, undefined, undefined, true)
            .then(res => {
                dispatch(setArtistData(res));
                dispatch(getArtistTracks(artistId));
            })
            .catch(err => {
                dispatch(handleError(err));
            })
    }
}

export const getArtistTracks = (artistId) => {
    return (dispatch) => {
        ApiBridge.makeGet(`/v1/artists/${artistId}/top-tracks`, [`country=US`], undefined, true)
            .then(res => {
                dispatch(setArtistTracks(res.tracks));
            })
            .catch(err => {
                dispatch(handleError(err));
            })
    }
}

export const followArtist = (artistId) => {
    return (dispatch) => {
        ApiBridge.makePut(`/v1/me/following`, [`type=artist`, `ids=${artistId}`], undefined, true)
            .then(res => {
                dispatch(setSnackbar({
                    message: `Artist Followed`,
                    open: true
                }));
            })
            .catch(err => {
                dispatch(handleError(err));
            })
    }
}
