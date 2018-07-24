import _ from 'lodash';
import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { Image, Button } from 'react-bootstrap';
import classes from 'classnames';
import ModalWindow from './ModalWindow.react';
import * as ra from '../constants/reducersActions';
import { fetchPostApiRequest } from '../utils/fetchRequests';
import { port } from '../shared/constants/common';
import { SUCCESS } from '../shared/constants/responseStatus';

class DropMenuItem extends Component {
    static propTypes = {
        item: PropTypes.object
    };

    static defaultProps = {
        item: {},
        artwork: ''
    };

    constructor() {
        super();

        this.state = { setLyricsStatus: null };
    }

    removeItem = item => {
        const { onRemoveMusicFile } = this.props;
        onRemoveMusicFile(item);
    };

    setLyrics = async item => {
        const { path, lyrics } = item;

        const result = await fetchPostApiRequest(
            `http://localhost:${port}/setLyrics`,
            { 'Content-Type': 'application/json' },
            { path, lyrics }
        );

        this.setState({
            setLyricsStatus: _.get(result, 'responseStatus') || result
        });
    };

    render() {
        const { item } = this.props;
        const { name, artwork, trackUrl, lyrics, isTagsNotFound } = item;

        const isLyricsExist = !_.isEmpty(lyrics);

        const trackInfoClassName = classes('track-info_container', {
            'not-found': isTagsNotFound,
            success: this.state.setLyricsStatus === SUCCESS
        });

        return (
            <div className="drop-menu-item">
                <Image className={'artwork'} src={artwork} />
                <div className={trackInfoClassName}>
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
