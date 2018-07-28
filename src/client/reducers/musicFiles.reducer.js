import _ from 'lodash';
import * as ra from '../constants/reducersActions';

export default (state = [], action) => {
    if (action.type === ra.ADD_MUSIC_FILES) {
        return [...state, ...action.musicFiles];
    }

    if (action.type === ra.REMOVE_MUSIC_FILE) {
        return _.filter(state, file => file.id !== action.musicFileIdToRemove);
    }

    if (action.type === ra.UPDATE_MUSIC_FILES) {
        return action.musicFiles;
    }

    if (action.type === ra.UPDATE_MUSIC_FILE) {
        return _.map(state, file => (file.id == action.musicFiles.id ? action.musicFiles : file));
    }

    return state;
};
