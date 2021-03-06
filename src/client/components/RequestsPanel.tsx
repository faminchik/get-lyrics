import React, { PureComponent } from 'react';
import _ from 'lodash';
import { Button } from 'react-bootstrap';
import { connect } from 'react-redux';
import { MusicFile } from 'ts/MusicFile';
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

class RequestsPanel extends PureComponent<Props> {
    static defaultProps = {
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

    render() {
        const { allowRequest, musicFiles } = this.props;

        const alllowMultipleSetLyrics = _.some(musicFiles, item => item.lyrics);

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
            </div>
        );
    }
}

const mapStateToProps = () => ({});

export default connect(mapStateToProps, { getLyrics, multipleSetLyrics })(RequestsPanel);
