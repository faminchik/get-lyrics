import React, { Component } from 'react';
import PropTypes from 'prop-types';
import _ from 'lodash';
import { Button } from 'react-bootstrap';
import { connect } from 'react-redux';
import getTrack from '../../shared/requests/getTrack';
import getLyrics from '../../shared/requests/getLyrics';
import multipleSetLyrics from '../../shared/requests/multipleSetLyrics';
import * as ra from '../constants/reducersActions';
import { trimMusicFileName } from '../utils/filesNameUtils';

class Index extends Component {
    static propTypes = {
        musicFiles: PropTypes.array,
        allowRequest: PropTypes.bool
    };

    static defaultProps = {
        allowRequest: false,
        musicFiles: []
    };

    onGetLyrics = async () => {
        const { musicFiles, onUpdateMusicFiles, onUpdateLoadingStatus } = this.props;

        if (_.isEmpty(musicFiles)) return;

        console.log('musicFiles | onGetLyrics', musicFiles);

        onUpdateLoadingStatus({ isLoading: true });
        const updatedMusicFiles = await _.reduce(
            musicFiles,
            async (previousPromise, file) => {
                const collection = await previousPromise;

                if (!_.get(file, 'shouldSearchLyrics')) {
                    collection.push(file);
                    return collection;
                }

                const trimmedName = trimMusicFileName(file.name);
                const { track } = await getTrack(trimmedName);
                if (!track) {
                    collection.push({
                        ...file,
                        isTagsFound: false,
                        shouldSearchLyrics: true
                    });
                    return collection;
                }

                const { url: trackUrl, song_art_image_thumbnail_url: artwork } = track;
                const lyrics = await getLyrics(trackUrl);
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
        onUpdateMusicFiles(updatedMusicFiles);
        onUpdateLoadingStatus({ isLoading: false });
    };

    onMultipleSetLyrics = async () => {
        const { musicFiles, onUpdateMusicFiles, onUpdateLoadingStatus } = this.props;

        const data = _.reduce(
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

        onUpdateLoadingStatus({ isLoading: true });
        const resultData = await multipleSetLyrics(data);
        const resultInfo = _.get(resultData, 'resultInfo');

        if (resultInfo) {
            const filesToUpdate = _.map(resultInfo, item => {
                const { id, status } = item;
                const musicFile = _.find(musicFiles, { id });
                return { ...musicFile, setLyricsStatus: status };
            });

            onUpdateMusicFiles(filesToUpdate);
            onUpdateLoadingStatus({ isLoading: false });
        }
    };

    render() {
        const { allowRequest, musicFiles } = this.props;

        const alllowMultipleSeLyrics = !_.isEmpty(_.filter(musicFiles, file => file.lyrics));

        return (
            <div className="request_container">
                <div className="button_container">
                    <Button bsStyle="warning" onClick={this.onGetLyrics} disabled={!allowRequest}>
                        Get Lyrics
                    </Button>
                </div>
                <div className="button_container">
                    <Button
                        bsStyle="success"
                        onClick={this.onMultipleSetLyrics}
                        disabled={!alllowMultipleSeLyrics}
                    >
                        Set Lyrics
                    </Button>
                </div>
            </div>
        );
    }
}

export default connect(
    state => ({}),
    dispatch => ({
        onUpdateMusicFiles: musicFiles => {
            dispatch({ type: ra.UPDATE_MUSIC_FILES, musicFiles });
        },
        onUpdateLoadingStatus: ({ isLoading }) => {
            dispatch({ type: ra.UPDATE_LOADING_STATUS, isLoading });
        }
    })
)(Index);
