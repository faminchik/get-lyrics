import React, { Component } from 'react';
import { connect } from 'react-redux';
import _ from 'lodash';
import DropFiles from 'client/components/DropFiles.react';
import RequestsPanel from 'client/components/RequestsPanel.react';
import Spinner from 'client/components/layout/Spinner.react';
import * as mfp from 'client/constants/MusicFileProperties';

class Viewport extends Component {
    render() {
        const { musicFiles, isLoading } = this.props;

        const allowRequest =
            !_.isEmpty(musicFiles) && !_.isEmpty(_.filter(musicFiles, mfp.SHOULD_SEARCH_LYRICS));

        return (
            <React.Fragment>
                <DropFiles allowedFileTypes={['audio/mp3']} menuItems={musicFiles} />
                <RequestsPanel musicFiles={musicFiles} allowRequest={allowRequest} />
                {isLoading ? <Spinner /> : null}
            </React.Fragment>
        );
    }
}

const mapStateToProps = state => ({
    musicFiles: state.musicFiles,
    isLoading: state.loading.isLoading
});

export default connect(mapStateToProps)(Viewport);
