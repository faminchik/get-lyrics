import React, { Component } from 'react';
import { connect } from 'react-redux';
import _ from 'lodash';
import DropFiles from './DropFiles.react';
import GeniusRequest from './GeniusRequest.react';
import addParamsToMusicFile from '../helpers/addParamsToMusicFile';

class App extends Component {
    render() {
        let { musicFiles } = this.props;

        const allowRequest =
            !_.isEmpty(musicFiles) &&
            !_.isEmpty(_.filter(musicFiles, file => file.shouldSearchLyrics));

        return (
            <React.Fragment>
                <DropFiles
                    allowedFileTypes={['audio/mp3']}
                    menuItems={musicFiles}
                    addParamsToFile={addParamsToMusicFile}
                />
                <GeniusRequest musicFiles={musicFiles} allowRequest={allowRequest} />
            </React.Fragment>
        );
    }
}

export default connect(state => ({
    musicFiles: state.musicFiles
}))(App);
