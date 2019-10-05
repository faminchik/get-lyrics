import React, { Component } from 'react';
import _ from 'lodash';
import { Button } from 'react-bootstrap';
import { connect } from 'react-redux';
import { MusicFile } from 'ts/interfaces/musicFile.interfaces';
import mfp from 'client/constants/MusicFileProperties';
import { multipleSetLyrics, getLyrics } from 'client/redux/actions/musicFilesActions';

interface RequestsPanelDispatchProps {
    getLyrics: (musicFiles: MusicFile[]) => void;
    multipleSetLyrics: (musicFiles: MusicFile[]) => void;
}

interface RequestsPanelOwnProps {
    musicFiles: MusicFile[];
    allowRequest: boolean;
}

interface Props extends RequestsPanelDispatchProps, RequestsPanelOwnProps {}

class RequestsPanel extends Component<Props> {
    static defaultProps = {
        allowRequest: false,
        musicFiles: []
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

    render() {
        const { allowRequest, musicFiles } = this.props;

        const alllowMultipleSeLyrics = !_.isEmpty(_.filter(musicFiles, mfp.LYRICS));

        return (
            <div className="request_container">
                <div className="button_container">
                    <Button bsStyle="warning" onClick={this.onGetLyrics} disabled={!allowRequest}>
                        Get Lyrics
                    </Button>
                </div>
                <div className="button_container">
                    <Button
                        bsStyle="success"
                        onClick={this.onMultipleSetLyrics}
                        disabled={!alllowMultipleSeLyrics}
                    >
                        Set Lyrics
                    </Button>
                </div>
            </div>
        );
    }
}

const mapStateToProps = () => ({});

export default connect(
    mapStateToProps,
    { getLyrics, multipleSetLyrics }
)(RequestsPanel);
