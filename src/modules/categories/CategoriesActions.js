import makeActionCreator from '../../shared/ActionCreator';
import CategoriesConstants from './CategoriesConstants';
import ApiBridge from '../../shared/ApiBridge';
import { handleError, setLoading } from '../app/AppActions';

export const setCatgoriesData = makeActionCreator(CategoriesConstants.SET_CATEGORIES_DATA, 'payload');
export const setSelectedCategory = makeActionCreator(CategoriesConstants.SET_SELECTED_CATEGORY, 'payload');
export const setSelectedCategoryPlaylists = makeActionCreator(CategoriesConstants.SET_SELECTED_CATEGORY_PLAYLISTS, 'payload');
export const setFeaturedPlaylists = makeActionCreator(CategoriesConstants.SET_FEATURED_PLAYLISTS, 'payload');

export const getCategories = () => {
    return (dispatch) => {
        dispatch(setLoading(true));
        ApiBridge.makeGet('/v1/browse/categories', undefined, undefined, true)
            .then(res => {
                dispatch(setCatgoriesData(res.categories));
                dispatch(setLoading(false));
            })
            .catch(err => {
                dispatch(handleError(err));
            })
    }
}

export const getSelectedCategoryDetails = (catId) => {
    return (dispatch) => {
        dispatch(setLoading(true));
        ApiBridge.makeGet(`/v1/browse/categories/${catId}`, undefined, undefined, true)
            .then(res => {
                dispatch(setLoading(false));
                dispatch(setSelectedCategory(res));
                dispatch(getCategoryPlaylists(catId));
            }).catch(err => {
                dispatch(handleError(err));
            })
    }
}

export const getCategoryPlaylists = (catId) => {
    return (dispatch) => {
        dispatch(setLoading(true));
        ApiBridge.makeGet(`/v1/browse/categories/${catId}/playlists`, undefined, undefined, true)
            .then(res => {
                dispatch(setLoading(false));
                dispatch(setSelectedCategoryPlaylists(res.playlists))
            })
            .catch(err => {
                dispatch(handleError(err));
            })

    }
}

export const getFeaturedPlaylists = () => {
    return (dispatch) => {
        dispatch(setLoading(true));
        ApiBridge.makeGet(`/v1/browse/featured-playlists`, [`country=SE`], undefined, true)
            .then(res => {
                dispatch(setLoading(false));
                dispatch(setFeaturedPlaylists(res.playlists));
            }).catch(err => {
                dispatch(handleError(err));
            })

    }
}
