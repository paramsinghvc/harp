import { fromJS, Map } from 'immutable';

import CategoriesConstants from './CategoriesConstants';

const initialState = fromJS({
    data: {
        items: []
    },
    selectedCategory: {
        icons: [{
            url: ''
        }]
    },
    playlists: {
        items: []
    }
});

const CategoriesReducer = (state = initialState, action) => {
    switch (action.type) {
        case CategoriesConstants.SET_CATEGORIES_DATA:
            return state.setIn(['data'], fromJS(action.payload))
        case CategoriesConstants.SET_SELECTED_CATEGORY:
            return state.setIn(['selectedCategory'], fromJS(action.payload))
        case CategoriesConstants.SET_SELECTED_CATEGORY_PLAYLISTS:
            return state.setIn(['playlists'], fromJS(action.payload))
        default:
            return state;
    }
};

export default CategoriesReducer;
