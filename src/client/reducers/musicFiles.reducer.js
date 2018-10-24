import _ from 'lodash';
import timm from 'timm';
import * as ra from '../constants/reducersActions';

export default (state = [], action) => {
    if (action.type === ra.ADD_MUSIC_FILES) {
        return [...state, ...action.musicFiles];
    }

    if (action.type === ra.REMOVE_MUSIC_FILE) {
        return _.filter(state, file => file.id !== action.musicFileIdToRemove);
    }

    if (action.type === ra.UPDATE_MUSIC_FILES) {
        return _.map(state, file => {
            const fileToUpdate = _.find(action.musicFiles, { id: file.id });
            return _.isNil(fileToUpdate) ? file : fileToUpdate;
        });
    }

    if (action.type === ra.UPDATE_MUSIC_FILE) {
        return _.map(state, file => (file.id == action.musicFiles.id ? action.musicFiles : file));
    }

    if (action.type === ra.UPDATE_MUSIC_FILES_ORDER) {
        const { id: idSource } = action.source;
        const { id: idTarget } = action.target;

        let immutableState = _.cloneDeep(state);
        const sourceIndex = _.findIndex(immutableState, { id: idSource });
        const targetIndex = _.findIndex(immutableState, { id: idTarget });

        immutableState = timm.removeAt(immutableState, sourceIndex);
        immutableState = timm.insert(immutableState, targetIndex, action.source);

        return immutableState;
    }

    return state;
};
