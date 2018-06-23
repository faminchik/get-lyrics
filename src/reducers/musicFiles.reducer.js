import _ from 'lodash';
import * as ra from '../constants/reducersActions';

export default (state = [], action) => {
    if (action.type === ra.ADD_MUSIC_FILES) {
        return [...state, ...action.musicFiles];
    }

    if (action.type === ra.REMOVE_MUSIC_FILE) {
        return _.filter(state, file => file !== action.musicFileToRemove);
    }

    return state;
};