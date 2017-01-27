import { fromJS, Map } from 'immutable';

import AlbumConstants from './AlbumConstants';

const initialState = fromJS({
    data: {
        images: [{}],
        tracks: {
        	items: []
        }
    }
});

const AlbumReducer = (state = initialState, action) => {
    switch (action.type) {
        case AlbumConstants.SET_ALBUM_DATA:{
            action.payload.tracks.items = action.payload.tracks.items.map(i => {
                 i['album'] = {
                    name: action.payload.name
                 }
                 return i;
            })
            return state.setIn(['data'], fromJS(action.payload))
        }
        default:
            return state;
    }
};

export default AlbumReducer;
