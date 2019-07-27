import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import _ from 'lodash';
import DropFiles from 'client/components/DropFiles.react';
import RequestsPanel from 'client/components/RequestsPanel.react';
import Spinner from 'client/components/layout/Spinner.react';
import * as mfp from 'client/constants/MusicFileProperties';

class Viewport extends Component {
    static propTypes = {
        musicFiles: PropTypes.array.isRequired,
        isLoading: PropTypes.bool.isRequired,
        isTurnedOff: PropTypes.bool.isRequired
    };

    render() {
        const { musicFiles, isLoading, isTurnedOff } = this.props;

        const allowRequest =
            !_.isEmpty(musicFiles) && !_.isEmpty(_.filter(musicFiles, mfp.SHOULD_SEARCH_LYRICS));

        return (
            <React.Fragment>
                <DropFiles
                    allowedFileTypes={['audio/mp3']}
                    menuItems={musicFiles}
                    turnedOff={isTurnedOff}
                />
                <RequestsPanel musicFiles={musicFiles} allowRequest={allowRequest} />
                {isLoading ? <Spinner /> : null}
            </React.Fragment>
        );
    }
}

const mapStateToProps = state => ({
    musicFiles: state.musicFiles,
    isLoading: state.loading.isLoading,
    isTurnedOff: state.dropzone.isTurnedOff
});

export default connect(mapStateToProps)(Viewport);
