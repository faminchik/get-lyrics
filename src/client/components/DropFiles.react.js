import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import _ from 'lodash';
import Dropzone from 'client/components/React-Dropzone';
import { getUniqueFiles, convertFileToObject } from 'client/utils/filesUtils';
import * as ra from 'client/constants/reducersActions';

class DropFiles extends Component {
    static propTypes = {
        allowedFileTypes: PropTypes.oneOfType([
            PropTypes.string,
            PropTypes.arrayOf(PropTypes.string)
        ]),
        disabled: PropTypes.bool,
        multiple: PropTypes.bool,
        menuItems: PropTypes.array,
        addParamsToFile: PropTypes.func
    };

    static defaultProps = {
        disabled: false,
        multiple: true,
        menuItems: []
    };

    onDrop = newFiles => {
        const { onAddMusicFiles, musicFiles, addParamsToFile } = this.props;

        newFiles = _.map(newFiles, newFile => convertFileToObject(newFile));

        let newUniqueFiles = getUniqueFiles(musicFiles, newFiles);
        if (_.isEmpty(newUniqueFiles)) return;

        newUniqueFiles = _.map(newUniqueFiles, newFile =>
            _.isFunction(addParamsToFile) ? addParamsToFile(newFile) : newFile
        );

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
