import _ from 'lodash';
import uuidv4 from 'uuid/v4';
import { AnyAction } from 'redux';
import { ThunkDispatch } from 'redux-thunk';
import { AppState } from 'client/redux/reducers';
import { StartLoadingAction, StopLoadingAction } from 'ts/interfaces/reducer.interfaces';
import { START_LOADING, STOP_LOADING } from 'client/constants/ActionTypes';

const startLoading = (id: string): StartLoadingAction => ({
    type: START_LOADING,
    payload: id
});

const stopLoading = (id: string): StopLoadingAction => ({
    type: STOP_LOADING,
    payload: id
});

export default async (
    callback: () => Promise<void>,
    dispatch: ThunkDispatch<AppState, {}, AnyAction>
) => {
    const id = uuidv4();

    dispatch(startLoading(id));

    if (_.isFunction(callback)) await callback();

    dispatch(stopLoading(id));
};
