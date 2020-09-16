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
import { MusicFile } from 'ts/MusicFile';
import { FFile } from 'ts/File';

// @loadingReducer
export interface StartLoadingAction {
    type: typeof START_LOADING;
    payload: string;
}

export interface StopLoadingAction {
    type: typeof STOP_LOADING;
    payload: string;
}

export type LoadingAction = StartLoadingAction | StopLoadingAction;

// @dropzoneReducer
export interface TurnOnDropzoneAction {
    type: typeof TURN_ON_DROPZONE;
}

export interface TurnOffDropzoneAction {
    type: typeof TURN_OFF_DROPZONE;
}

export type DropzoneAction = TurnOnDropzoneAction | TurnOffDropzoneAction;

// @musicFilesReducer
export interface AddMusicFilesAction {
    type: typeof ADD_MUSIC_FILES;
    payload: FFile[];
}

export interface RemoveMusicFileAction {
    type: typeof REMOVE_MUSIC_FILE;
    payload: string;
}

export interface UpdateMusicFilesAction {
    type: typeof UPDATE_MUSIC_FILES;
    payload: MusicFile[];
}

export interface UpdateMusicFileAction {
    type: typeof UPDATE_MUSIC_FILE;
    payload: MusicFile;
}

export interface UpdateMusicFilesOrderAction {
    type: typeof UPDATE_MUSIC_FILES_ORDER;
    payload: { source: MusicFile; target: MusicFile };
}

export type MusicFilesAction =
    | AddMusicFilesAction
    | RemoveMusicFileAction
    | UpdateMusicFilesAction
    | UpdateMusicFileAction
    | UpdateMusicFilesOrderAction;
