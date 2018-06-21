import React, { Component } from 'react';
import { Button } from 'react-bootstrap';
import Genius from '../utils/Genius/Genius';
import { ACCESS_TOKEN } from '../constants/geniusConstants';

const genius = new Genius(ACCESS_TOKEN);

export default class App extends Component {
    onClick = async () => {
        const musicTrack = 'G-Eazy & Halsey - Him & I';

        const lyrics = await genius.getLyricsByTrackName(musicTrack);
    };

    render() {
        return (
            <div className="request_container">
                <Button onClick={this.onClick}>Get Lyrics</Button>
            </div>
        );
    }
}
