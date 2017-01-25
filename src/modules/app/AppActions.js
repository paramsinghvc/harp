import makeActionCreator from '../../shared/ActionCreator';
import AppConstants from './AppConstants';

export const setLoading = makeActionCreator(AppConstants.SET_LOADER, 'payload');
export const toggleAppDrawer = makeActionCreator(AppConstants.TOGGLE_APP_DRAWER);
export const setSnackbar = makeActionCreator(AppConstants.SET_SNACKBAR, 'payload');

