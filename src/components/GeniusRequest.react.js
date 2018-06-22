import React, { Component } from 'react';
import PropTypes from 'prop-types';
import _ from 'lodash';
import { Button } from 'react-bootstrap';
import Genius from '../utils/Genius/Genius';
import { ACCESS_TOKEN } from '../constants/geniusConstants';
import { getFileNameByFullName, trimMusicFileName } from '../utils/filesNameUtils';

const genius = new Genius(ACCESS_TOKEN);

export default class App extends Component {
    static propTypes = {
        // musicFiles: PropTypes.object
        // allowRequest: PropTypes.bool
    };

    onGetLyrics = async () => {
        const { musicFiles } = this.props;

        if (_.isEmpty(musicFiles)) return;

        const musicFilesInfo = _.map(musicFiles, file => {
            console.log('file', file);
            const fileFullName = _.get(file, 'name', null);
            const fileName = getFileNameByFullName(fileFullName);
            const trimmedFileName = _.trim(trimMusicFileName(fileName), ' ');
            return {
                trimmedName: trimmedFileName,
                name: fileName,
                path: _.get(file, 'path', null)
            };
        });

        const result = await _.reduce(
            musicFilesInfo,
            async (acc, file) => {
                const lyrics = await genius.getLyricsByTrackName(file.trimmedName);
                // TODO acc is Promise → use Promise.all and _.reduce inside
                acc.push({
                    ...file,
                    lyrics
                });
                return acc;
            },
            []
        );

        console.log('result', result);

        // console.log('musicFilesInfo', musicFilesInfo);

        // const promises = _.map(musicFilesInfo, file =>
        //     genius.getLyricsByTrackName(file.trimmedName)
        // );

        // const lyrics = await Promise.all(promises).then(values => values);

        // console.log('lyrics', lyrics);
    };

    render() {
        const { allowRequest = false } = this.props;

        return (
            <div className="request_container">
                <Button onClick={this.onGetLyrics} /*disabled={!allowRequest} */>Get Lyrics</Button>
            </div>
        );
    }
}
