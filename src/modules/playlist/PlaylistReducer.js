import { fromJS, Map } from 'immutable';

import PlaylistConstants from './PlaylistConstants';

const initialState = fromJS({
    data: {
        images: [{}],
        tracks: {
        	items: []
        }
    }
});

const PlaylistReducer = (state = initialState, action) => {
    switch (action.type) {
        case PlaylistConstants.SET_PLAYLIST_DATA:
            return state.setIn(['data'], fromJS(action.payload))
        default:
            return state;
    }
};

export default PlaylistReducer;
