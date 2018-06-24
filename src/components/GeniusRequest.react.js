import React, { Component } from 'react';
import PropTypes from 'prop-types';
import _ from 'lodash';
import { Button } from 'react-bootstrap';
import { connect } from 'react-redux';
import Genius from '../utils/Genius/Genius';
import { ACCESS_TOKEN } from '../constants/geniusConstants';
import * as ra from '../constants/reducersActions';

const genius = new Genius(ACCESS_TOKEN);

class GeniusRequest extends Component {
    static propTypes = {
        musicFiles: PropTypes.array,
        allowRequest: PropTypes.bool
    };

    static defaultProps = {
        allowRequest: false,
        musicFiles: []
    };

    onGetLyrics = async () => {
        let { musicFiles } = this.props;
        let { onMusicTrack } = this.props;

        if (_.isEmpty(musicFiles)) return;

        console.log('musicFiles | onGetLyrics', musicFiles);

        musicFiles = await _.reduce(
            musicFiles,
            async (previousPromise, file) => {
                const collection = await previousPromise;

                if (_.get(file, 'lyrics')) {
                    collection.push(file);
                    return collection;
                }

                const track = await genius.getTrack(file.trimmedName);
                if (!track) {
                    collection.push(file);
                    return collection;
                }

                const { url: trackUrl, song_art_image_thumbnail_url: artwork } = track;
                const lyrics = await genius.getLyricsByTrackUrl(trackUrl);
                collection.push({
                    ...file,
                    lyrics,
                    trackUrl,
                    artwork
                });
                return collection;
            },
            Promise.resolve([])
        );

        console.log('result', musicFiles);
        onMusicTrack(musicFiles);
    };

    render() {
        const { allowRequest } = this.props;

        return (
            <div className="request_container">
                <Button bsStyle="warning" onClick={this.onGetLyrics} disabled={!allowRequest}>
                    Get Lyrics
                </Button>
            </div>
        );
    }
}

export default connect(
    state => ({}),
    dispatch => ({
        onMusicTrack: musicFiles => {
            dispatch({ type: ra.UPDATE_MUSIC_FILES, musicFiles });
        }
    })
)(GeniusRequest);
