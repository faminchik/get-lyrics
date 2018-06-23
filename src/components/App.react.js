import React, { Component } from 'react';
import { connect } from 'react-redux';
import _ from 'lodash';
import DropFiles from './DropFiles.react';
import GeniusRequest from './GeniusRequest.react';

class App extends Component {
    render() {
        let { musicFiles } = this.props;

        const allowRequest = !_.isEmpty(musicFiles);

        return (
            <React.Fragment>
                <DropFiles allowedFileTypes={['audio/mp3']} menuItems={musicFiles} />
                <GeniusRequest musicFiles={musicFiles} allowRequest={allowRequest} />
            </React.Fragment>
        );
    }
}

export default connect(state => ({
    musicFiles: state.musicFiles
}))(App);
