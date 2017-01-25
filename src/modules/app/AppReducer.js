import { fromJS, Map } from 'immutable';

import config from '../../shared/config';
import AppConstants from './AppConstants';

const initialState = fromJS({
    isLoading: false,
    appName: config.APP_NAME,
    appDrawerOpen: false,
    snackBar: {
        message: '',
        open: false
    }
});

const AppReducer = (state = initialState, action) => {
    switch (action.type) {
        case AppConstants.SET_LOADER:
            return state.merge({
                isLoading: action.payload
            });
        case AppConstants.TOGGLE_APP_DRAWER:
            return state.update('appDrawerOpen', isOpen => !isOpen);
        case AppConstants.SET_SNACKBAR:
            return state.merge({ 'snackBar': Map(action.payload) });
        default:
            return state;
    }
};

export default AppReducer;
