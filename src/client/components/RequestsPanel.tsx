import React, { PureComponent } from 'react';
import _ from 'lodash';
import { Button } from 'react-bootstrap';
import { connect } from 'react-redux';
import { MusicFile } from 'ts/MusicFile';
import {
    multipleSetLyrics,
    getLyrics,
    removeAllMusicFiles
} from 'client/redux/actions/musicFilesActions';

interface RequestsPanelDispatchProps {
    getLyrics: (musicFiles: MusicFile[]) => void;
    multipleSetLyrics: (musicFiles: MusicFile[]) => void;
    removeAllMusicFiles: () => void;
}

interface RequestsPanelOwnProps {
    musicFiles: MusicFile[];
    allowRequest: boolean;
}

interface Props extends RequestsPanelDispatchProps, RequestsPanelOwnProps {}

class RequestsPanel extends PureComponent<Props> {
    static defaultProps: Partial<Props> = {
        allowRequest: false
    };

    onGetLyrics = (): void => {
        const { musicFiles, getLyrics } = this.props;
        if (_.isEmpty(musicFiles)) return;

        getLyrics(musicFiles);
    };

    onMultipleSetLyrics = (): void => {
        const { musicFiles, multipleSetLyrics } = this.props;

        multipleSetLyrics(musicFiles);
    };

    onRemoveAllMusicFiles = (): void => {
        const { removeAllMusicFiles } = this.props;

        removeAllMusicFiles();
    };

    override render() {
        const { allowRequest, musicFiles } = this.props;

        const alllowMultipleSetLyrics = _.some(musicFiles, item => item.lyrics);
        const areMusicFilesEmpty = _.isEmpty(musicFiles);

        return (
            <div className="request-container">
                <div className="request-container__button-wrapper">
                    <Button bsStyle="warning" onClick={this.onGetLyrics} disabled={!allowRequest}>
                        Get Lyrics
                    </Button>
                </div>
                <div className="request-container__button-wrapper">
                    <Button
                        bsStyle="success"
                        onClick={this.onMultipleSetLyrics}
                        disabled={!alllowMultipleSetLyrics}
                    >
                        Set Lyrics
                    </Button>
                </div>
                <div className="request-container__button-wrapper">
                    <Button
                        bsStyle="primary"
                        onClick={this.onRemoveAllMusicFiles}
                        disabled={areMusicFilesEmpty}
                    >
                        Remove All
                    </Button>
                </div>
            </div>
        );
    }
}

const mapStateToProps = () => ({});

export default connect(mapStateToProps, { getLyrics, multipleSetLyrics, removeAllMusicFiles })(
    RequestsPanel
);
