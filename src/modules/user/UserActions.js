import makeActionCreator from '../../shared/ActionCreator';
import UserConstants from './UserConstants';
import ApiBridge from '../../shared/ApiBridge';
import { handleError } from '../app/AppActions';

export const setUserData = makeActionCreator(UserConstants.SET_USER_DATA, 'payload');
export const setUserSavedTracks = makeActionCreator(UserConstants.SET_USER_SAVED_TRACKS, 'payload');
export const setUserFollowedArtists = makeActionCreator(UserConstants.SET_USER_FOLLOWED_ARTISTS, 'payload');
export const setUserSavedAlbums = makeActionCreator(UserConstants.SET_USER_SAVED_ALBUMS, 'payload');

export const getUserData = () => {
    return (dispatch) => {
        ApiBridge.makeGet(`/v1/me`, undefined, undefined, true)
            .then(res => {
                dispatch(setUserData(res));
                dispatch(getUserSavedTracks());
            })
            .catch(err => {
                dispatch(handleError(err));
            })
    }
}

export const getUserSavedTracks = () => {
    return (dispatch, getState) => {
    	// const userId = getState().user.getIn(['data', 'id']);
        ApiBridge.makeGet(`/v1/me/tracks`, undefined, undefined, true)
            .then(res => {
                dispatch(setUserSavedTracks(res));
            })
            .catch(err => {
                dispatch(handleError(err));
            })
    }
}

export const getUserFollowedArtists = () => {
    return (dispatch) => {
        ApiBridge.makeGet(`/v1/me/following`, [`type=artist`], undefined, true)
            .then(res => {
                dispatch(setUserFollowedArtists(res.artists));
            })
            .catch(err => {
                dispatch(handleError(err));
            })
    }
}

export const getUserSavedAlbums = () => {
    return (dispatch) => {
        ApiBridge.makeGet(`/v1/me/albums`, undefined, undefined, true)
            .then(res => {
                dispatch(setUserSavedAlbums(res));
            })
            .catch(err => {
                dispatch(handleError(err));
            })
    }
}