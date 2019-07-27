import _ from 'lodash';
import BPromise from 'bluebird';
import {
    ADD_MUSIC_FILES,
    REMOVE_MUSIC_FILE,
    UPDATE_MUSIC_FILE,
    UPDATE_MUSIC_FILES,
    UPDATE_MUSIC_FILES_ORDER
} from 'client/constants/ActionTypes';
import * as mfp from 'client/constants/MusicFileProperties';
import getTrackRequest from 'shared/requests/getTrack';
import getLyricsRequest from 'shared/requests/getLyrics';
import setLyricsRequest from 'shared/requests/setLyrics';
import multipleSetLyricsRequest from 'shared/requests/multipleSetLyrics';
import loadingWrapper from 'client/redux/actions/utils/loadingWrapper';
import { trimMusicFileNameByParentheses } from 'client/utils/fileNames';
import { resetMusicFileAdditionalParams } from 'client/helpers/musicFileInfo';

export const addMusicFiles = musicFiles => dispatch => {
    dispatch({ type: ADD_MUSIC_FILES, payload: musicFiles });
};

export const removeMusicFile = musicFileId => dispatch => {
    dispatch({ type: REMOVE_MUSIC_FILE, payload: musicFileId });
};

export const updateMusicFile = musicFile => dispatch => {
    dispatch({ type: UPDATE_MUSIC_FILE, payload: musicFile });
};

export const updateMusicFilesOrder = ({ source, target }) => dispatch => {
    dispatch({ type: UPDATE_MUSIC_FILES_ORDER, payload: { source, target } });
};

export const getLyrics = musicFiles => async dispatch => {
    const func = async () => {
        const updatedMusicFiles = await BPromise.reduce(
            musicFiles,
            async (acc, file) => {
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
                    [mfp.LYRICS]: lyrics,
                    [mfp.TRACK_URL]: trackUrl,
                    [mfp.ARTWORK]: artwork,
                    [mfp.ARE_TAGS_FOUND]: true,
                    [mfp.SHOULD_SEARCH_LYRICS]: false
                });
                return acc;
            },
            []
        );

        dispatch({ type: UPDATE_MUSIC_FILES, payload: updatedMusicFiles });
    };

    await loadingWrapper(func, dispatch);
};

export const setLyrics = musicFile => async dispatch => {
    const func = async () => {
        const { [mfp.PATH]: path, [mfp.LYRICS]: lyrics } = musicFile;
        const result = await setLyricsRequest(path, lyrics);
        const status = _.get(result, 'status');

        dispatch({
            type: UPDATE_MUSIC_FILE,
            payload: { ...musicFile, [mfp.SET_LYRICS_STATUS]: status }
        });
    };

    await loadingWrapper(func, dispatch);
};

export const multipleSetLyrics = musicFiles => async dispatch => {
    const func = async () => {
        const dataToSet = _.reduce(
            musicFiles,
            (acc, file) => {
                const { [mfp.PATH]: path, [mfp.LYRICS]: lyrics, [mfp.ID]: id } = file;
                if (!_.isNil(lyrics)) {
                    acc.push({ path, lyrics, id });
                }
                return acc;
            },
            []
        );

        const result = await multipleSetLyricsRequest(dataToSet);

        if (!_.isEmpty(result)) {
            const filesToUpdate = _.map(result, item => {
                const { id, status } = item;
                const musicFile = _.find(musicFiles, { id });
                return { ...musicFile, [mfp.SET_LYRICS_STATUS]: status };
            });

            dispatch({ type: UPDATE_MUSIC_FILES, payload: filesToUpdate });
        }
    };

    await loadingWrapper(func, dispatch);
};
