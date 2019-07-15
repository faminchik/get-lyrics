import _ from 'lodash';
import { START_LOADING, STOP_LOADING } from 'client/constants/ActionTypes';

const initialState = {
    isLoading: false,
    spinnerIds: []
};

export default (state = initialState, action) => {
    const { type, payload } = action;

    if (type === START_LOADING) {
        return { isLoading: true, spinnerIds: [...state.spinnerIds, payload] };
    }

    if (type === STOP_LOADING) {
        const filteredSpinnerIds = _.filter(state.spinnerIds, id => id !== payload);
        const isLoading = !_.isEmpty(filteredSpinnerIds);
        return { isLoading, spinnerIds: filteredSpinnerIds };
    }

    return state;
};
