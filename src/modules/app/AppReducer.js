import { fromJS, Map } from 'immutable';

import config from '../../shared/config';
import AppConstants from './AppConstants';

const initialState = fromJS({
    isLoading: false,
    appName: config.APP_NAME
});

const AppReducer = (state = initialState, action) => {
    switch (action.type) {
    	case AppConstants.SET_LOADER: 
    		return state.merge({
    			isLoading: action.payload
    		})
        default: return state;
    }
};

export default AppReducer;
