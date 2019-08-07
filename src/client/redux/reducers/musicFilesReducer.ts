import _ from 'lodash';
import timm from 'timm';
import { MusicFile } from 'ts/interfaces/musicFile.interfaces';
import { MusicFilesAction } from 'ts/interfaces/reducer.interfaces';
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

type MusicFilesReducerState = MusicFile[];

const initialState: MusicFilesReducerState = [];

export default (state = initialState, action: MusicFilesAction): MusicFilesReducerState => {
    if (action.type === ADD_MUSIC_FILES) {
        const { payload } = action;
        const newFiles = _.map(payload, item => convertFileToObject(item));

        const newUniqueFiles = detectUniqueFiles(state, newFiles);
        if (_.isEmpty(newUniqueFiles)) return state;

        const extendedNewUniqueFiles = _.map(newUniqueFiles, extendMusicFileInfo);
        return [...state, ...extendedNewUniqueFiles];
    }

    if (action.type === REMOVE_MUSIC_FILE) {
        const { payload } = action;
        return _.filter(state, ({ [mfp.ID]: id }) => id !== payload);
    }

    if (action.type === UPDATE_MUSIC_FILES) {
        const { payload } = action;
        return _.map(state, file => {
            const fileToUpdate = _.find(payload, { [mfp.ID]: file[mfp.ID] });
            return _.isNil(fileToUpdate) ? file : fileToUpdate;
        });
    }

    if (action.type === UPDATE_MUSIC_FILE) {
        const { payload } = action;
        return _.map(state, file => (file[mfp.ID] === payload[mfp.ID] ? payload : file));
    }

    if (action.type === UPDATE_MUSIC_FILES_ORDER) {
        const { payload } = action;

        const { source, target } = payload;
        const { [mfp.ID]: idSource } = source;
        const { [mfp.ID]: idTarget } = target;

        const sourceIndex = _.findIndex(state, { [mfp.ID]: idSource });
        const targetIndex = _.findIndex(state, { [mfp.ID]: idTarget });

        state = timm.removeAt(state, sourceIndex);
        state = timm.insert(state, targetIndex, source);

        return state;
    }

    return state;
};
