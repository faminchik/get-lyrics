import React, { Component } from 'react';
import PropTypes from 'prop-types';
import _ from 'lodash';
import { Button } from 'react-bootstrap';
import { connect } from 'react-redux';
import { multipleSetLyrics, getLyrics } from 'client/redux/actions/musicFilesActions';

class Index extends Component {
    static propTypes = {
        getLyrics: PropTypes.func.isRequired,
        multipleSetLyrics: PropTypes.func.isRequired,
        musicFiles: PropTypes.array,
        allowRequest: PropTypes.bool
    };

    static defaultProps = {
        allowRequest: false,
        musicFiles: []
    };

    onGetLyrics = async () => {
        const { musicFiles, getLyrics } = this.props;

        if (_.isEmpty(musicFiles)) return;

        console.log('musicFiles | onGetLyrics', musicFiles);
        getLyrics(musicFiles);
    };

    onMultipleSetLyrics = async () => {
        const { musicFiles, multipleSetLyrics } = this.props;

        multipleSetLyrics(musicFiles);
    };

    render() {
        const { allowRequest, musicFiles } = this.props;

        const alllowMultipleSeLyrics = !_.isEmpty(_.filter(musicFiles, file => file.lyrics));

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

const mapStateToProps = state => ({});

export default connect(
    mapStateToProps,
    { getLyrics, multipleSetLyrics }
)(Index);
