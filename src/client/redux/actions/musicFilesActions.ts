import _ from 'lodash';
import BPromise from 'bluebird';
import { AnyAction } from 'redux';
import { ThunkAction } from 'redux-thunk';
import { AppState } from 'client/redux/reducers';
import { FFile } from 'ts/interfaces/file.interfaces';
import {
    AddMusicFilesAction,
    RemoveMusicFileAction,
    UpdateMusicFilesOrderAction,
    UpdateMusicFileAction,
    UpdateMusicFilesAction
} from 'ts/interfaces/reducer.interfaces';
import { MusicFile } from 'ts/interfaces/musicFile.interfaces';
import { MultipleSetTagsData } from 'ts/interfaces/nodeID3.interfaces';
import {
    ADD_MUSIC_FILES,
    REMOVE_MUSIC_FILE,
    UPDATE_MUSIC_FILE,
    UPDATE_MUSIC_FILES,
    UPDATE_MUSIC_FILES_ORDER
} from 'client/constants/ActionTypes';
import mfp from 'client/constants/MusicFileProperties';
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

export const getLyrics = (musicFiles: MusicFile[]): MusicFilesThunkAction => async dispatch => {
    const func = async () => {
        const updatedMusicFiles = await BPromise.reduce(
            musicFiles,
            async (acc: MusicFile[], file) => {
                if (!file[mfp.SHOULD_SEARCH_LYRICS]) return acc;

                const trimmedFileName = trimMusicFileNameByParentheses(file[mfp.NAME]);
                const trackInfo = await getTrackRequest(trimmedFileName);

                if (!trackInfo) {
                    acc.push({
                        ...resetMusicFileAdditionalParams(file),
                        [mfp.ARE_TAGS_FOUND]: false
                    });
                    return acc;
                }

                const { url: trackUrl, song_art_image_thumbnail_url: artwork } = trackInfo;
                const lyrics = await getLyricsRequest(trackUrl);

                acc.push({
                    ...file,
                    [mfp.LYRICS]: lyrics ?? '',
                    [mfp.TRACK_URL]: trackUrl,
                    [mfp.ARTWORK]: artwork,
                    [mfp.ARE_TAGS_FOUND]: true,
                    [mfp.SHOULD_SEARCH_LYRICS]: !lyrics
                });
                return acc;
            },
            []
        );

        dispatch(updateMusicFiles(updatedMusicFiles));
    };

    await loadingWrapper(func, dispatch);
};

export const setLyrics = (musicFile: MusicFile): MusicFilesThunkAction => async dispatch => {
    const func = async () => {
        const { [mfp.PATH]: path, [mfp.LYRICS]: lyrics } = musicFile;
        const result = await setLyricsRequest(path, lyrics);
        const status = result?.status ?? rs.ERROR;

        dispatch(updateMusicFile({ ...musicFile, [mfp.SET_LYRICS_STATUS]: status }));
    };

    await loadingWrapper(func, dispatch);
};

export const multipleSetLyrics = (
    musicFiles: MusicFile[]
): MusicFilesThunkAction => async dispatch => {
    const func = async () => {
        const dataToSet = _.reduce(
            musicFiles,
            (acc: MultipleSetTagsData[], file) => {
                const { [mfp.PATH]: path, [mfp.LYRICS]: lyrics, [mfp.ID]: id } = file;

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

                    if (musicFile) acc.push({ ...musicFile, [mfp.SET_LYRICS_STATUS]: status });
                    return acc;
                },
                []
            );

            dispatch(updateMusicFiles(filesToUpdate));
        }
    };

    await loadingWrapper(func, dispatch);
};
