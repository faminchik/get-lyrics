import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import _ from 'lodash';
import uuidv4 from 'uuid/v4';
import Dropzone from './React-Dropzone';
import { getUniqueFiles, convertFileToObject } from '../utils/filesUtils';
import * as ra from '../constants/reducersActions';
import { getFileNameByFullName, trimMusicFileName } from '../utils/filesNameUtils';

const includeSomeFileParams = musicFile => {
    const { name: fileFullName = null, ...restData } = musicFile;
    const fileName = getFileNameByFullName(fileFullName);
    const trimmedFileName = trimMusicFileName(fileName);
    return {
        trimmedName: trimmedFileName,
        name: fileName,
        nameWithExtension: fileFullName,
        id: uuidv4(),
        setLyricsStatus: null,
        ...restData
    };
};

class DropFiles extends Component {
    static propTypes = {
        allowedFileTypes: PropTypes.oneOfType([
            PropTypes.string,
            PropTypes.arrayOf(PropTypes.string)
        ]),
        disabled: PropTypes.bool,
        multiple: PropTypes.bool,
        menuItems: PropTypes.array
    };

    static defaultProps = {
        disabled: false,
        multiple: true,
        menuItems: []
    };

    onDrop = newFiles => {
        const { onAddMusicFiles, musicFiles } = this.props;

        newFiles = _.map(newFiles, newFile => convertFileToObject(newFile));

        let newUniqueFiles = getUniqueFiles(musicFiles, newFiles);
        if (_.isEmpty(newUniqueFiles)) return;

        newUniqueFiles = _.map(newUniqueFiles, newFile => includeSomeFileParams(newFile));
        onAddMusicFiles(newUniqueFiles);
    };

    render() {
        const { disabled, allowedFileTypes, multiple, menuItems } = this.props;

        return (
            <Dropzone
                className={'drop-area'}
                disabledClassName={'disabled'}
                activeClassName={'active'}
                acceptClassName={'accept'}
                rejectClassName={'reject'}
                disabled={disabled}
                onDrop={this.onDrop}
                accept={allowedFileTypes}
                multiple={multiple}
                menuItems={menuItems}
            />
        );
    }
}

export default connect(
    state => ({
        musicFiles: state.musicFiles
    }),
    dispatch => ({
        onAddMusicFiles: musicFiles => {
            dispatch({ type: ra.ADD_MUSIC_FILES, musicFiles });
        }
    })
)(DropFiles);
