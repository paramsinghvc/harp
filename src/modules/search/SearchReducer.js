import { fromJS, Map } from 'immutable';

import SearchConstants from './SearchConstants';

const initialState = fromJS({
    
});

const PlaylistReducer = (state = initialState, action) => {
    switch (action.type) {
        case SearchConstants.SET_PLAYLIST_DATA:
            return state.setIn(['data'], fromJS(action.payload))
        default:
            return state;
    }
};

export default PlaylistReducer;
