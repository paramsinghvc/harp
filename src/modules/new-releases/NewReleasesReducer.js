import { fromJS, Map } from 'immutable';

import NewReleasesConstants from './NewReleasesConstants';

const initState = fromJS({
    data: {
    	items : []
    }
});

const NewReleasesReducer = (state = initState, action) => {
    switch (action.type) {
        case NewReleasesConstants.SET_DATA:
            return state.setIn(['data'], fromJS(action.payload));
        default:
            return state;
    }
}

export default NewReleasesReducer;
