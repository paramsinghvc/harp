import makeActionCreator from '../../shared/ActionCreator';
import PlaylistConstants from './PlaylistConstants';
import ApiBridge from '../../shared/ApiBridge';
import { handleError, setLoading } from '../app/AppActions';

export const setPlaylistData = makeActionCreator(PlaylistConstants.SET_PLAYLIST_DATA, 'payload');

export const getPlaylistData = (userId, playlistId) => {
    return (dispatch) => {
    	dispatch(setLoading(true));
        ApiBridge.makeGet(`/v1/users/${userId}/playlists/${playlistId}`, [], undefined, true)
            .then(res => {
            	dispatch(setLoading(false));
                dispatch(setPlaylistData(res));
            })
            .catch(err => {
                dispatch(handleError(err));
            })
    }
}