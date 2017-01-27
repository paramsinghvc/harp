import { combineReducers } from 'redux';

// Import Reducers
import AppReducer from './modules/app/AppReducer';
import CategoriesReducer from './modules/categories/CategoriesReducer';
import PlaylistReducer from './modules/playlist/PlaylistReducer';
import PlayerReducer from './modules/player/PlayerReducer';
import AlbumReducer from './modules/album/AlbumReducer';

// Combine all reducers into one root reducer
export default combineReducers({
	app: AppReducer,
	categories: CategoriesReducer,
	playlist: PlaylistReducer,
	player: PlayerReducer,
	album: AlbumReducer
});
