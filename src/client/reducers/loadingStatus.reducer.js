import { UPDATE_LOADING_STATUS } from '../constants/reducersActions';

export default (state = false, action) => {
    if (action.type === UPDATE_LOADING_STATUS) {
        return action.isLoading;
    }
    return state;
};
