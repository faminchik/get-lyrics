import _ from 'lodash';
import React, { PureComponent } from 'react';
import { connect } from 'react-redux';
import { AppState } from 'client/redux/reducers';
import { MusicFile } from 'ts/MusicFile';
import DropArea from 'client/components/DropArea';
import RequestsPanel from 'client/components/RequestsPanel';
import Spinner from 'client/components/layout/Spinner';

interface ViewportStateProps {
    musicFiles: MusicFile[];
    isLoading: boolean;
    isTurnedOff: boolean;
}

interface Props extends ViewportStateProps {}

class Viewport extends PureComponent<Props> {
    render() {
        const { musicFiles, isLoading, isTurnedOff } = this.props;

        const allowRequest = _.some(musicFiles, item => item.shouldSearchLyrics);

        return (
            <>
                <DropArea
                    allowedFileTypes={['audio/mp3', 'audio/mpeg']}
                    menuItems={musicFiles}
                    noDrag={isTurnedOff}
                    multiple={true}
                />
                <RequestsPanel musicFiles={musicFiles} allowRequest={allowRequest} />
                {isLoading ? <Spinner /> : null}
            </>
        );
    }
}

const mapStateToProps = (state: AppState): ViewportStateProps => ({
    musicFiles: state.musicFiles,
    isLoading: state.loading.isLoading,
    isTurnedOff: state.dropzone.isTurnedOff
});

export default connect(mapStateToProps)(Viewport);
