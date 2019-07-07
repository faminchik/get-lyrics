import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import _ from 'lodash';
import Dropzone from 'client/components/React-Dropzone';
import { detectUniqueFiles, convertFileToObject } from 'client/utils/filesUtils';
import { addMusicFiles } from 'client/redux/actions/musicFilesActions';

class DropFiles extends Component {
    static propTypes = {
        addMusicFiles: PropTypes.func.isRequired,
        musicFiles: PropTypes.array.isRequired,
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
        const { addMusicFiles, musicFiles, addParamsToFile } = this.props;

        // TODO: move this ↓ logic into reducer
        newFiles = _.map(newFiles, newFile => convertFileToObject(newFile));

        let newUniqueFiles = detectUniqueFiles(musicFiles, newFiles);
        if (_.isEmpty(newUniqueFiles)) return;

        newUniqueFiles = _.map(newUniqueFiles, newFile =>
            _.isFunction(addParamsToFile) ? addParamsToFile(newFile) : newFile
        );

        addMusicFiles(newUniqueFiles);
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

const mapStateToProps = state => ({
    musicFiles: state.musicFiles
});

export default connect(
    mapStateToProps,
    { addMusicFiles }
)(DropFiles);
