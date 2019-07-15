import _ from 'lodash';
import {
    ADD_MUSIC_FILES,
    REMOVE_MUSIC_FILE,
    UPDATE_MUSIC_FILES,
    UPDATE_MUSIC_FILE,
    UPDATE_MUSIC_FILES_ORDER
} from 'client/constants/ActionTypes';
import * as mfp from 'client/constants/MusicFileProperties';
import { detectUniqueFiles, convertFileToObject } from 'client/utils/files';
import { extendMusicFileInfo } from 'client/helpers/musicFileInfo';

export default (state = [], action) => {
    const { type, payload } = action;

    if (type === ADD_MUSIC_FILES) {
        const newFiles = _.map(payload, convertFileToObject);

        const newUniqueFiles = detectUniqueFiles(state, newFiles);
        if (_.isEmpty(newUniqueFiles)) return state;

        const extendedNewUniqueFiles = _.map(newUniqueFiles, extendMusicFileInfo);
        return [...state, ...extendedNewUniqueFiles];
    }

    if (type === REMOVE_MUSIC_FILE) {
        return _.filter(state, ({ [mfp.ID]: id }) => id !== payload);
    }

    if (type === UPDATE_MUSIC_FILES) {
        return _.map(state, file => {
            const fileToUpdate = _.find(payload, { [mfp.ID]: file[mfp.ID] });
            return _.isNil(fileToUpdate) ? file : fileToUpdate;
        });
    }

    if (type === UPDATE_MUSIC_FILE) {
        return _.map(state, file => (file[mfp.ID] === payload[mfp.ID] ? payload : file));
    }

    if (type === UPDATE_MUSIC_FILES_ORDER) {
        const { source, target } = payload;
        const { id: idSource } = source;
        const { id: idTarget } = target;

        let immutableState = _.cloneDeep(state);
        const sourceIndex = _.findIndex(immutableState, { id: idSource });
        const targetIndex = _.findIndex(immutableState, { id: idTarget });

        immutableState = timm.removeAt(immutableState, sourceIndex);
        immutableState = timm.insert(immutableState, targetIndex, action.source);

        return immutableState;
    }

    return state;
};
