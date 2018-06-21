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

    onClick = async () => {
        const { musicFiles } = this.props;

        if (_.isEmpty(musicFiles)) return;

        const musicFilesInfo = _.map(musicFiles, file => {
            console.log('file', file);
            const fileFullName = _.get(file, 'name', null);
            const fileName = getFileNameByFullName(fileFullName);
            // const trimedFileName = trimMusicFileName(fileName);
            return {
                name: getFileNameByFullName(fileFullName),
                path: _.get(file, 'path', null)
            };
        });

        console.log('musicFilesInfo', musicFilesInfo);

        const promises = _.map(musicFilesInfo, file => genius.getLyricsByTrackName(file.name));

        const lyrics = await Promise.all(promises).then(values => values);

        console.log('lyrics', lyrics);
    };

    render() {
        const { allowRequest = false } = this.props;

        return (
            <div className="request_container">
                <Button onClick={this.onClick} /*disabled={!allowRequest} */>Get Lyrics</Button>
            </div>
        );
    }
}
