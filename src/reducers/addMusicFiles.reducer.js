import * as ra from '../constants/reducersActions';

export default (state = {}, action) => {
    if (action.type === ra.ADD_MUSIC_FILES) {
        return action.musicFiles;
    }
    return state;
};
