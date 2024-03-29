import _ from 'lodash';
import BPromise from 'bluebird';
import { AnyAction } from 'redux';
import { ThunkAction } from 'redux-thunk';
import { AppState } from 'client/redux/reducers';
import { FFile } from 'ts/File';
import {
    AddMusicFilesAction,
    RemoveMusicFileAction,
    RemoveAllMusicFilesAction,
    UpdateMusicFilesOrderAction,
    UpdateMusicFileAction,
    UpdateMusicFilesAction
} from 'ts/Reducer';
import { MusicFile } from 'ts/MusicFile';
import { MultipleSetTagsData } from 'ts/NodeID3';
import {
    ADD_MUSIC_FILES,
    REMOVE_MUSIC_FILE,
    REMOVE_ALL_MUSIC_FILES,
    UPDATE_MUSIC_FILE,
    UPDATE_MUSIC_FILES,
    UPDATE_MUSIC_FILES_ORDER
} from 'client/constants/ActionTypes';
import rs from 'shared/constants/ResponseStatus';
import getTrackRequest from 'shared/requests/getTrack';
import getLyricsRequest from 'shared/requests/getLyrics';
import setLyricsRequest from 'shared/requests/setLyrics';
import multipleSetLyricsRequest from 'shared/requests/multipleSetLyrics';
import loadingWrapper from 'client/redux/actions/utils/loadingWrapper';
import { trimMusicFileNameByParentheses } from 'client/utils/fileNames';
import { resetMusicFileAdditionalParams } from 'client/helpers/musicFileInfo';

type MusicFilesThunkAction = ThunkAction<void, AppState, unknown, AnyAction>;

interface UpdateMusicFilesOrderPayload {
    source: MusicFile;
    target: MusicFile;
}

export const addMusicFiles = (musicFiles: FFile[]): AddMusicFilesAction => ({
    type: ADD_MUSIC_FILES,
    payload: musicFiles
});

export const removeMusicFile = (musicFileId: MusicFile['id']): RemoveMusicFileAction => ({
    type: REMOVE_MUSIC_FILE,
    payload: musicFileId
});

export const removeAllMusicFiles = (): RemoveAllMusicFilesAction => ({
    type: REMOVE_ALL_MUSIC_FILES
});

export const updateMusicFile = (musicFile: MusicFile): UpdateMusicFileAction => ({
    type: UPDATE_MUSIC_FILE,
    payload: musicFile
});

const updateMusicFiles = (musicFiles: MusicFile[]): UpdateMusicFilesAction => ({
    type: UPDATE_MUSIC_FILES,
    payload: musicFiles
});

export const updateMusicFilesOrder = ({
    source,
    target
}: UpdateMusicFilesOrderPayload): UpdateMusicFilesOrderAction => ({
    type: UPDATE_MUSIC_FILES_ORDER,
    payload: { source, target }
});

export const getLyrics =
    (musicFiles: MusicFile[]): MusicFilesThunkAction =>
    async dispatch => {
        const func = async () => {
            const updatedMusicFiles = await BPromise.reduce(
                musicFiles,
                async (acc: MusicFile[], file) => {
                    if (!file.shouldSearchLyrics) return acc;

                    const trimmedFileName = trimMusicFileNameByParentheses(file.name);
                    const trackInfo = await getTrackRequest(trimmedFileName);

                    if (!trackInfo) {
                        acc.push({
                            ...resetMusicFileAdditionalParams(file),
                            areTagsFound: false
                        });
                        return acc;
                    }

                    const { url: trackUrl, song_art_image_thumbnail_url: artwork } = trackInfo;
                    const lyrics = await getLyricsRequest(trackUrl);

                    acc.push({
                        ...file,
                        lyrics: lyrics ?? '',
                        trackUrl,
                        artwork,
                        areTagsFound: true,
                        shouldSearchLyrics: !lyrics
                    });
                    return acc;
                },
                []
            );

            dispatch(updateMusicFiles(updatedMusicFiles));
        };

        await loadingWrapper(func, dispatch);
    };

export const setLyrics =
    (musicFile: MusicFile): MusicFilesThunkAction =>
    async dispatch => {
        const func = async () => {
            const { path, lyrics } = musicFile;
            const result = await setLyricsRequest(path, lyrics);
            const status = result?.status ?? rs.ERROR;

            dispatch(updateMusicFile({ ...musicFile, setLyricsStatus: status }));
        };

        await loadingWrapper(func, dispatch);
    };

export const multipleSetLyrics =
    (musicFiles: MusicFile[]): MusicFilesThunkAction =>
    async dispatch => {
        const func = async () => {
            const dataToSet = _.reduce(
                musicFiles,
                (acc: MultipleSetTagsData[], file) => {
                    const { path, lyrics, id } = file;

                    if (!_.isEmpty(lyrics)) {
                        acc.push({ path, lyrics, id });
                    }
                    return acc;
                },
                []
            );

            const result = await multipleSetLyricsRequest(dataToSet);

            if (!_.isEmpty(result)) {
                const filesToUpdate = _.reduce(
                    result,
                    (acc: MusicFile[], item) => {
                        const { id, status } = item;
                        const musicFile = _.find(musicFiles, { id });

                        if (musicFile) acc.push({ ...musicFile, setLyricsStatus: status });
                        return acc;
                    },
                    []
                );

                dispatch(updateMusicFiles(filesToUpdate));
            }
        };

        await loadingWrapper(func, dispatch);
    };
