import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import _ from 'lodash';
import Dropzone from 'client/components/React-Dropzone';
import { addMusicFiles } from 'client/redux/actions/musicFilesActions';

class DropFiles extends Component {
    static propTypes = {
        addMusicFiles: PropTypes.func.isRequired,
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
        const { addMusicFiles } = this.props;

        addMusicFiles(newFiles);
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

const mapStateToProps = state => ({});

export default connect(
    mapStateToProps,
    { addMusicFiles }
)(DropFiles);
