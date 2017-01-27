import makeActionCreator from '../../shared/ActionCreator';
import AlbumConstants from './AlbumConstants';
import ApiBridge from '../../shared/ApiBridge';
import { handleError } from '../app/AppActions';

export const setAlbumData = makeActionCreator(AlbumConstants.SET_ALBUM_DATA, 'payload');

export const getAlbumData = (albumId) => {
    return (dispatch) => {
        ApiBridge.makeGet(`/v1/albums/${albumId}`)
            .then(res => {
                dispatch(setAlbumData(res));
            })
            .catch(err => {
                dispatch(handleError(err));
            })
    }
}