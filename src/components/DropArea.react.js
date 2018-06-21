import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import Dropzone from 'react-dropzone';
import classes from 'classnames';
import getUniqueFiles from '../utils/getUniqueFiles';
import * as ra from '../constants/reducersActions';

class DropArea extends Component {
    constructor() {
        super();
        this.state = { files: [] };
    }

    static propTypes = {
        allowedFileTypes: PropTypes.oneOfType([
            PropTypes.string,
            PropTypes.arrayOf(PropTypes.string)
        ]),
        disabled: PropTypes.bool,
        multiple: PropTypes.bool
    };

    onDrop = newFiles => {
        const newUniqueFiles = getUniqueFiles(this.state.files, newFiles);

        if (_.isEmpty(newUniqueFiles)) return;

        const { onAddMusicFiles } = this.props;

        this.setState(
            {
                files: [...this.state.files, ...newUniqueFiles]
            },
            () => {
                console.log('this.state.files', this.state.files);
                onAddMusicFiles(this.state.files);
            }
        );
    };

    render() {
        const { disabled = false, allowedFileTypes, multiple = true } = this.props;

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
            />
        );
    }
}

export default connect(
    state => ({}),
    dispatch => ({
        onAddMusicFiles: musicFiles => {
            dispatch({ type: ra.ADD_MUSIC_FILES, musicFiles });
        }
    })
)(DropArea);
