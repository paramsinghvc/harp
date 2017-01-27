import makeActionCreator from '../../shared/ActionCreator';
import PlayerConstants from './PlayerConstants';
import { is } from 'immutable';
import { handleError } from '../app/AppActions';

export const setVolume = makeActionCreator(PlayerConstants.SET_VOLUME, 'payload');
export const setAudio = makeActionCreator(PlayerConstants.SET_AUDIO, 'payload');
export const playAudio = makeActionCreator(PlayerConstants.PLAY_AUDIO);
export const pauseAudio = makeActionCreator(PlayerConstants.PAUSE_AUDIO);
export const togglePlayPause = makeActionCreator(PlayerConstants.TOGGLE_PLAY_PAUSE);
export const setAudioDuration = makeActionCreator(PlayerConstants.SET_AUDIO_DURATION, 'payload');
export const setCurrentPosition = makeActionCreator(PlayerConstants.SET_CURRENT_POSITION, 'payload');
export const setPlayerQueue = makeActionCreator(PlayerConstants.SET_PLAYER_QUEUE, 'payload');
export const clearPlayerQueue = makeActionCreator(PlayerConstants.CLEAR_PLAYER_QUEUE);

export const setAndLaunchPlayerQueue = (queue) => {
    return (dispatch) => {
        if (queue.size > 0) {
            dispatch(setPlayerQueue(queue));
            dispatch(setAudio(queue.first()));
            dispatch(playAudio());
        }
    }
}

export const playNextAudio = () => {
    return (dispatch, getState) => {
        const { player } = getState();
        let queue = player.get('queue');
        let currentAudio = player.get('audioInfo');

        let idx = queue.indexOf(currentAudio);

        console.log(idx);
        if (idx > -1) {
            if (queue.has(idx + 1)) {
                dispatch(setAudio(queue.get(idx + 1)));
            }
        } else {
            dispatch(setAudio(queue.first()));
        }
    }
}

export const playPrevAudio = () => {
    return (dispatch, getState) => {
        const { player } = getState();
        let queue = player.get('queue');
        let currentAudio = player.get('audioInfo');

        let idx = queue.indexOf(currentAudio);

        console.log(idx);
        if (idx > -1) {
            if (queue.has(idx - 1)) {
                dispatch(setAudio(queue.get(idx - 1)));
                dispatch(playAudio());
            }
        }
    }
}
