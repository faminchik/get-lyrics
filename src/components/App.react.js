import React, { Component } from 'react';
import { connect } from 'react-redux';
import DropArea from './DropArea.react';
import GeniusRequest from './GeniusRequest.react';

class App extends Component {
    render() {
        const { musicFiles } = this.props;
        console.log('musicFiles', musicFiles);

        // TODO: allowRequest via store regarding whether musicFiles are empty

        return (
            <React.Fragment>
                <DropArea allowedFileTypes={['audio/mp3']} />
                <GeniusRequest musicFiles={musicFiles} /*allowRequest={allowRequest}*/ />
            </React.Fragment>
        );
    }
}

export default connect(state => ({
    musicFiles: state.addMusicFiles
}))(App);
