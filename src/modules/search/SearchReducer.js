import { fromJS, Map } from 'immutable';

import SearchConstants from './SearchConstants';

const initialState = fromJS({
    searchText: null,
    searchOpen: false,
    searchResult: {
        albums: {
            items: []
        },
        playlists: {
            items: []
        },
        artists: {
            items: []
        },
        tracks: {
            items: []
        }
    }
});

const PlaylistReducer = (state = initialState, action) => {
    switch (action.type) {
        case SearchConstants.SET_SEARCH_TEXT:
            return state.setIn(['searchText'], action.payload)
        case SearchConstants.SET_SEARCH_RESULT:
            return state.setIn(['searchResult'], fromJS(action.payload))
        case SearchConstants.RESET_SEARCH:
            return state.merge(initialState);
        case SearchConstants.SET_SEARCH_OVERLAY_DISPLAY:
            return state.setIn(['searchOpen'], action.payload);
        default:
            return state;
    }
};

export default PlaylistReducer;
