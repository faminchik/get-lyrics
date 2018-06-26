import _ from 'lodash';
import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { Image, Button } from 'react-bootstrap';
import ModalWindow from './ModalWindow.react';
import * as ra from '../constants/reducersActions';

class DropMenuItem extends Component {
    static propTypes = {
        item: PropTypes.object,
        artwork: PropTypes.string
    };

    static defaultProps = {
        item: {},
        artwork: ''
    };

    removeItem = item => {
        const { onRemoveMusicFile } = this.props;
        onRemoveMusicFile(item);
    };

    setLyrics = item => {
        const { path } = item;

        console.log('path', path);
    };

    render() {
        const { item } = this.props;
        const { name, artwork, trackUrl, lyrics } = item;

        console.log('item', item);

        const isLyricsExist = !_.isEmpty(lyrics);

        return (
            <div className="drop-menu-item">
                <Image className={'artwork'} src={artwork} />
                <div className="track-info_container">
                    <div className="track-name">{name}</div>
                    <a href={trackUrl} className="track-url" target="_blank">
                        {trackUrl}
                    </a>
                </div>
                <div className="show-lyrics-button_container">
                    <ModalWindow
                        disabled={!isLyricsExist}
                        buttonText="Show Lyrics"
                        text={lyrics}
                        modalTitle="Lyrics"
                    />
                </div>
                <div className="set-lyrics-button_container">
                    <Button
                        bsStyle="success"
                        bsSize="small"
                        disabled={!isLyricsExist}
                        onClick={() => this.setLyrics(item)}
                    >
                        Set Lyrics
                    </Button>
                </div>
                <div className="remove-button_container">
                    <button className="clr-but" onClick={() => this.removeItem(item)}>
                        <span className="zmdi zmdi-delete zmdi-hc-lg" />
                    </button>
                </div>
            </div>
        );
    }
}

export default connect(
    state => ({}),
    dispatch => ({
        onRemoveMusicFile: musicFileToRemove => {
            dispatch({ type: ra.REMOVE_MUSIC_FILE, musicFileToRemove });
        }
    })
)(DropMenuItem);
