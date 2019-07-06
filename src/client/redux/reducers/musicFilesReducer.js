import _ from 'lodash';
import {
    ADD_MUSIC_FILES,
    REMOVE_MUSIC_FILE,
    UPDATE_MUSIC_FILES,
    UPDATE_MUSIC_FILE
} from 'client/constants/ActionTypes';

export default (state = [], action) => {
    const { type, payload } = action;

    if (type === ADD_MUSIC_FILES) {
        return [...state, ...payload];
    }

    if (type === REMOVE_MUSIC_FILE) {
        return _.filter(state, ({ id }) => id !== payload);
    }

    if (type === UPDATE_MUSIC_FILES) {
        return _.map(state, file => {
            const fileToUpdate = _.find(payload, { id: file.id });
            return _.isNil(fileToUpdate) ? file : fileToUpdate;
        });
    }

    if (type === UPDATE_MUSIC_FILE) {
        return _.map(state, file => (file.id == payload.id ? payload : file));
    }

    return state;
};
