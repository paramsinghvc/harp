import { fromJS, Map } from 'immutable';

import ArtistConstants from './ArtistConstants';

const initialState = fromJS({
    data: {
        images: [{}],
        genres: []
    },
    tracks: []
});

const ArtistReducer = (state = initialState, action) => {
    switch (action.type) {
        case ArtistConstants.SET_ARTIST_DATA:
            {
                return state.setIn(['data'], fromJS(action.payload))
            }
        default:
            return state;
    }
};

export default ArtistReducer;
