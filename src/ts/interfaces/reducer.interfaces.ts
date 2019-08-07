import {
    START_LOADING,
    STOP_LOADING,
    TURN_ON_DROPZONE,
    TURN_OFF_DROPZONE,
    ADD_MUSIC_FILES,
    REMOVE_MUSIC_FILE,
    UPDATE_MUSIC_FILES,
    UPDATE_MUSIC_FILE,
    UPDATE_MUSIC_FILES_ORDER
} from 'client/constants/ActionTypes';
import { MusicFile } from 'ts/interfaces/musicFile.interfaces';
import { FFile } from 'ts/interfaces/file.interfaces';

// @loadingReducer
export interface LoadingAction {
    type: typeof START_LOADING | typeof STOP_LOADING;
    payload: string;
}

// @dropzoneReducer
export interface DropzoneAction {
    type: typeof TURN_ON_DROPZONE | typeof TURN_OFF_DROPZONE;
}

// @musicFilesReducer
interface AddMusicFilesAction {
    type: typeof ADD_MUSIC_FILES;
    payload: FFile[];
}

interface RemoveMusicFileAction {
    type: typeof REMOVE_MUSIC_FILE;
    payload: string;
}

interface UpdateMusicFilesAction {
    type: typeof UPDATE_MUSIC_FILES;
    payload: MusicFile[];
}

interface UpdateMusicFileAction {
    type: typeof UPDATE_MUSIC_FILE;
    payload: MusicFile;
}

interface UpdateMusicFilesOrderAction {
    type: typeof UPDATE_MUSIC_FILES_ORDER;
    payload: { source: MusicFile; target: MusicFile };
}

export type MusicFilesAction =
    | AddMusicFilesAction
    | RemoveMusicFileAction
    | UpdateMusicFilesAction
    | UpdateMusicFileAction
    | UpdateMusicFilesOrderAction;
