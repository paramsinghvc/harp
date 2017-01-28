import makeActionCreator from '../../shared/ActionCreator';
import ApiBridge from '../../shared/ApiBridge';
import { handleError, setLoading } from '../app/AppActions';
import SearchConstants from './SearchConstants';

export const setSearchText = makeActionCreator(SearchConstants.SET_SEARCH_TEXT, 'payload');
export const setSearchResult = makeActionCreator(SearchConstants.SET_SEARCH_RESULT, 'payload');

export const performSearch = (searchText) => {
	return (dispatch) => {
		dispatch(setSearchText(searchText));

	}
}

