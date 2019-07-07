import React, { Component } from 'react';
import { connect } from 'react-redux';
import _ from 'lodash';
import DropFiles from 'client/components/DropFiles.react';
import RequestsPanel from 'client/components/RequestsPanel.react';
import Spinner from 'client/components/layout/Spinner.react';
import addParamsToMusicFile from 'client/helpers/addParamsToMusicFile';

class Viewport extends Component {
    render() {
        const { musicFiles, isLoading } = this.props;

        const allowRequest =
            !_.isEmpty(musicFiles) && !_.isEmpty(_.filter(musicFiles, 'shouldSearchLyrics'));

        return (
            <React.Fragment>
                <DropFiles
                    allowedFileTypes={['audio/mp3']}
                    menuItems={musicFiles}
                    addParamsToFile={addParamsToMusicFile}
                />
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
