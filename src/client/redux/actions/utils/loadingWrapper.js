import _ from 'lodash';
import { START_LOADING, STOP_LOADING } from 'client/constants/ActionTypes';
import uuidv4 from 'uuid/v4';

export default async (callback, dispatch) => {
    const id = uuidv4();

    dispatch({ type: START_LOADING, payload: id });

    if (_.isFunction(callback)) await callback();

    dispatch({ type: STOP_LOADING, payload: id });
};
