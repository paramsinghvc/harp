import { combineReducers } from 'redux';

// Import Reducers
import AppReducer from './modules/app/AppReducer';

// Combine all reducers into one root reducer
export default combineReducers({
	app: AppReducer
});
