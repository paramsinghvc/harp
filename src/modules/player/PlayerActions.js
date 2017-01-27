import makeActionCreator from '../../shared/ActionCreator';
import PlayerConstants from './PlayerConstants';

import { handleError } from '../app/AppActions';

export const setVolume = makeActionCreator(PlayerConstants.SET_VOLUME, 'payload');
export const setAudio = makeActionCreator(PlayerConstants.SET_AUDIO, 'payload');
export const playAudio = makeActionCreator(PlayerConstants.PLAY_AUDIO);
export const pauseAudio = makeActionCreator(PlayerConstants.PAUSE_AUDIO);
export const togglePlayPause = makeActionCreator(PlayerConstants.TOGGLE_PLAY_PAUSE);
export const setAudioDuration = makeActionCreator(PlayerConstants.SET_AUDIO_DURATION, 'payload');
export const setCurrentPosition = makeActionCreator(PlayerConstants.SET_CURRENT_POSITION, 'payload');
