import makeActionCreator from '../../shared/ActionCreator';
import AppConstants from './AppConstants';

export const setLoading = makeActionCreator(AppConstants.SET_LOADER, payload);

