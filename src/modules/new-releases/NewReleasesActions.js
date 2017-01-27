import makeActionCreator from '../../shared/ActionCreator';
import NewReleasesConstants from './NewReleasesConstants';
import ApiBridge from '../../shared/ApiBridge';
import { handleError, setLoading } from '../app/AppActions';

export const setData = makeActionCreator(NewReleasesConstants.SET_DATA, 'payload');

export const getNewReleasesData = () => {
    return (dispatch) => {
    	dispatch(setLoading(true));
        ApiBridge.makeGet(`/v1/browse/new-releases`, [`country=US`], undefined, true)
            .then(res => {
            	dispatch(setLoading(false));
                dispatch(setData(res.albums));
            })
            .catch(err => {
                dispatch(handleError(err));
            })
    }
}