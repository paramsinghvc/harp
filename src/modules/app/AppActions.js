import makeActionCreator from '../../shared/ActionCreator';
import AppConstants from './AppConstants';
import { browserHistory } from 'react-router';

export const setLoading = makeActionCreator(AppConstants.SET_LOADER, 'payload');
export const toggleAppDrawer = makeActionCreator(AppConstants.TOGGLE_APP_DRAWER);
export const setSnackbar = makeActionCreator(AppConstants.SET_SNACKBAR, 'payload');

export const handleError = (error) => {
    return (dispatch) => {
        console.dir(error);
        let msg = 'Oops! some error Occured!';
        if (error.status === 401) {
            msg = `Oops! You need to login`;
            browserHistory.push('/login');
        }
        dispatch(setSnackbar({
            message: msg,
            open: true
        }));
    }
}
