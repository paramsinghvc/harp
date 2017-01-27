import makeActionCreator from '../../shared/ActionCreator';
import PlaylistConstants from './PlaylistConstants';
import ApiBridge from '../../shared/ApiBridge';
import { handleError } from '../app/AppActions';

export const setPlaylistData = makeActionCreator(PlaylistConstants.SET_PLAYLIST_DATA, 'payload');

export const getPlaylistData = (userId, playlistId) => {
    return (dispatch) => {
        ApiBridge.makeGet(`/v1/users/${userId}/playlists/${playlistId}`, [], undefined, true)
            .then(res => {
                dispatch(setPlaylistData(res));
            })
            .catch(err => {
                dispatch(handleError(err));
            })
    }
}