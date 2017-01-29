import { fromJS, Map } from 'immutable';

import UserConstants from './UserConstants';

const initialState = fromJS({
    data: {
        images: [{}],
    },
    followedArtists: {
        items: []
    },
    savedTracks: {
        items: []
    },
    savedAlbums: {
        items: []
    }
});

const UserReducer = (state = initialState, action) => {
    switch (action.type) {
        case UserConstants.SET_USER_DATA:
            return state.merge(fromJS({
                data: action.payload
            }));
        case UserConstants.SET_USER_SAVED_TRACKS:
            return state.merge(fromJS({
                savedTracks: action.payload
            }));
        case UserConstants.SET_USER_FOLLOWED_ARTISTS:
            return state.merge(fromJS({
                followedArtists: action.payload
            }));
        case UserConstants.SET_USER_SAVED_ALBUMS:
            return state.merge(fromJS({
                savedAlbums: action.payload
            }));
        default:
            return state;
    }
};

export default UserReducer;
