import { fromJS, Map } from 'immutable';

import PlayerConstants from './PlayerConstants';

const initState = fromJS({
    isPlaying: false,
    audioInfo: {
        name: '',
        artists: '',
        url: ''
    },
    audioDuration: 3,
    currentPosition: 0,
    queue: [],
    volume: 3
})

const PlayerReducer = (state = initState, action) => {
    switch (action.type) {
        case PlayerConstants.SET_VOLUME:
            return state.setIn(['volume'], action.payload);
        case PlayerConstants.SET_AUDIO:
            return state.setIn(['audioInfo'], fromJS(action.payload));
        case PlayerConstants.PLAY_AUDIO:
            return state.setIn(['isPlaying'], true);
        case PlayerConstants.PAUSE_AUDIO:
            return state.setIn(['isPlaying'], false);
        case PlayerConstants.SET_AUDIO_DURATION:
            return state.setIn(['audioDuration'], action.payload);
        case PlayerConstants.SET_CURRENT_POSITION:
            return state.setIn(['currentPosition'], action.payload);
        case PlayerConstants.TOGGLE_PLAY_PAUSE:
            return state.update('isPlaying', isPlaying => !isPlaying);
        default:
            return state;
    }
}

export default PlayerReducer;
