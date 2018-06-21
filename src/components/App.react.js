import React, { Component } from 'react';
import DropArea from './DropArea.react';
import GeniusRequest from './GeniusRequest.react';

export default class App extends Component {
    render() {
        return (
            <React.Fragment>
                <DropArea allowedFileTypes={['audio/mp3']} />
                <GeniusRequest />
            </React.Fragment>
        );
    }
}
