import makeActionCreator from '../../shared/ActionCreator';
import CategoriesConstants from './CategoriesConstants';
import ApiBridge from '../../shared/ApiBridge';
import { handleError } from '../app/AppActions';

export const setCatgoriesData = makeActionCreator(CategoriesConstants.SET_CATEGORIES_DATA, 'payload');
export const setSelectedCategory = makeActionCreator(CategoriesConstants.SET_SELECTED_CATEGORY, 'payload');
export const setSelectedCategoryPlaylists = makeActionCreator(CategoriesConstants.SET_SELECTED_CATEGORY_PLAYLISTS, 'payload');

export const getCategories = () => {
    return (dispatch) => {
        ApiBridge.makeGet('/v1/browse/categories', undefined, undefined, true)
            .then(res => {
                dispatch(setCatgoriesData(res.categories));
            })
            .catch(err => {
                dispatch(handleError(err));
            })
    }
}

export const getSelectedCategoryDetails = (catId) => {
	return (dispatch) => {
		ApiBridge.makeGet(`/v1/browse/categories/${catId}`, undefined, undefined, true)
			.then(res => {
				dispatch(setSelectedCategory(res));
				dispatch(getCategoryPlaylists(catId));
			}).catch(err => {
				dispatch(handleError(err));
			}) 
	}
}

export const getCategoryPlaylists = (catId) => {
    return (dispatch) => {
        ApiBridge.makeGet(`/v1/browse/categories/${catId}/playlists`, undefined, undefined, true)
            .then(res => {
            	dispatch(setSelectedCategoryPlaylists(res.playlists))
            })
            .catch(err => {
                dispatch(handleError(err));
            })

    }
}
