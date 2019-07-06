import _ from 'lodash';
import {
    ADD_MUSIC_FILES,
    REMOVE_MUSIC_FILE,
    UPDATE_MUSIC_FILE,
    UPDATE_MUSIC_FILES
} from 'client/constants/ActionTypes';
import getTrackRequest from 'shared/requests/getTrack';
import getLyricsRequest from 'shared/requests/getLyrics';
import setLyricsRequest from 'shared/requests/setLyrics';
import multipleSetLyricsRequest from 'shared/requests/multipleSetLyrics';
import loadingWrapper from 'client/redux/actions/utils/loadingWrapper';
import { trimMusicFileName } from 'client/utils/filesNameUtils';

export const addMusicFiles = musicFiles => dispatch => {
    dispatch({ type: ADD_MUSIC_FILES, payload: musicFiles });
};

export const removeMusicFile = musicFileId => dispatch => {
    dispatch({ type: REMOVE_MUSIC_FILE, payload: musicFileId });
};

export const updateMusicFile = musicFile => dispatch => {
    dispatch({ type: UPDATE_MUSIC_FILE, payload: musicFile });
};

export const getLyrics = musicFiles => async dispatch => {
    const func = async () => {
        const updatedMusicFiles = await _.reduce(
            musicFiles,
            async (previousPromise, file) => {
                const collection = await previousPromise;

                if (!_.get(file, 'shouldSearchLyrics')) {
                    collection.push(file);
                    return collection;
                }

                const trimmedName = trimMusicFileName(file.name);
                const track = await getTrackRequest(trimmedName);
                if (!track) {
                    collection.push({
                        ...file,
                        isTagsFound: false,
                        shouldSearchLyrics: true
                    });
                    return collection;
                }

                const { url: trackUrl, song_art_image_thumbnail_url: artwork } = track;
                const lyrics = await getLyricsRequest(trackUrl);
                collection.push({
                    ...file,
                    lyrics,
                    trackUrl,
                    artwork,
                    isTagsFound: true,
                    shouldSearchLyrics: false
                });
                return collection;
            },
            Promise.resolve([])
        );

        console.log('result', updatedMusicFiles);
        dispatch({ type: UPDATE_MUSIC_FILES, payload: updatedMusicFiles });
    };

    await loadingWrapper(func, dispatch);
};

export const setLyrics = musicFile => async dispatch => {
    const func = async () => {
        const { path, lyrics } = musicFile;
        const result = await setLyricsRequest(path, lyrics);
        const setLyricsStatus = _.get(result, 'resultStatus');

        dispatch({ type: UPDATE_MUSIC_FILE, payload: { ...musicFile, setLyricsStatus } });
    };

    await loadingWrapper(func, dispatch);
};

export const multipleSetLyrics = musicFiles => async dispatch => {
    const func = async () => {
        const dataToSet = _.reduce(
            musicFiles,
            (acc, file) => {
                const { path, lyrics, id } = file;
                if (!_.isNil(lyrics)) {
                    acc.push({ path, lyrics, id });
                }
                return acc;
            },
            []
        );

        const resultData = await multipleSetLyricsRequest(dataToSet);
        const resultInfo = _.get(resultData, 'resultInfo');

        if (resultInfo) {
            const filesToUpdate = _.map(resultInfo, item => {
                const { id, status } = item;
                const musicFile = _.find(musicFiles, { id });
                return { ...musicFile, setLyricsStatus: status };
            });

            dispatch({ type: UPDATE_MUSIC_FILES, payload: filesToUpdate });
        }
    };

    await loadingWrapper(func, dispatch);
};
