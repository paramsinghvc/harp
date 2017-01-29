import makeActionCreator from '../../shared/ActionCreator';
import ApiBridge from '../../shared/ApiBridge';
import { handleError, setLoading } from '../app/AppActions';
import SearchConstants from './SearchConstants';

export const setSearchText = makeActionCreator(SearchConstants.SET_SEARCH_TEXT, 'payload');
export const setSearchResult = makeActionCreator(SearchConstants.SET_SEARCH_RESULT, 'payload');
export const setSearchOverlayDisplay = makeActionCreator(SearchConstants.SET_SEARCH_OVERLAY_DISPLAY, 'payload');

export const performSearch = (searchText, types) => {
    return (dispatch) => {
        dispatch(setSearchText(searchText));
        ApiBridge.makeGet(`/v1/search`, [`q=${encodeURIComponent(searchText)}`, `type=${types ? types : 'album,artist,playlist,track'}`, `limit=5`], undefined, true)
            .then(res => {
            	dispatch(setSearchResult(res));
            	dispatch(setSearchOverlayDisplay(true));
            })
            .catch(err => {
                dispatch(handleError(err));
                dispatch(setSearchOverlayDisplay(false));
            })
    }
}
