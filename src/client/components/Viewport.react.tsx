import _ from 'lodash';
import React, { Component } from 'react';
import { connect } from 'react-redux';
import { AppState } from 'client/redux/reducers';
import { MusicFile } from 'ts/interfaces/musicFile.interfaces';
import DropArea from 'client/components/DropArea.react';
import RequestsPanel from 'client/components/RequestsPanel.react';
import Spinner from 'client/components/layout/Spinner.react';
import * as mfp from 'client/constants/MusicFileProperties';

interface ViewportStateProps {
    musicFiles: MusicFile[];
    isLoading: boolean;
    isTurnedOff: boolean;
}

interface Props extends ViewportStateProps {}

class Viewport extends Component<Props> {
    render() {
        const { musicFiles, isLoading, isTurnedOff } = this.props;

        const allowRequest =
            !_.isEmpty(musicFiles) && !_.isEmpty(_.filter(musicFiles, mfp.SHOULD_SEARCH_LYRICS));

        return (
            <React.Fragment>
                <DropArea
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

const mapStateToProps = (state: AppState): ViewportStateProps => ({
    musicFiles: state.musicFiles,
    isLoading: state.loading.isLoading,
    isTurnedOff: state.dropzone.isTurnedOff
});

export default connect(mapStateToProps)(Viewport);
