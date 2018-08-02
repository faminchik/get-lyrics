import _ from 'lodash';
import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { Image, Button } from 'react-bootstrap';
import classes from 'classnames';
import ModalWindow from './ModalWindow.react';
import InlineEditing from './InlineEditing.react';
import Checkbox from './Checkbox.react';
import * as ra from '../constants/reducersActions';
import { SUCCESS } from '../../shared/constants/responseStatus';
import setLyrics from '../../shared/requests/setLyrics';

class DropMenuItem extends Component {
    static propTypes = {
        item: PropTypes.object
    };

    static defaultProps = {
        item: {}
    };

    removeItem = item => {
        const { onRemoveMusicFile } = this.props;
        const { id } = item;

        onRemoveMusicFile(id);
    };

    setLyrics = async item => {
        const { onUpdateMusicFile } = this.props;
        const { path, lyrics } = item;

        const result = await setLyrics(path, lyrics);

        const setLyricsStatus = _.get(result, 'responseStatus') || result;

        onUpdateMusicFile({
            ...item,
            setLyricsStatus
        });
    };

    onFinishEditingItemName = itemName => {
        const { onUpdateMusicFile, item } = this.props;

        onUpdateMusicFile({
            ...item,
            name: itemName
        });
    };

    onChangeCheckboxValue = isChecked => {
        const { onUpdateMusicFile, item } = this.props;

        onUpdateMusicFile({
            ...item,
            shouldSearchLyrics: isChecked
        });
    };

    render() {
        const { item } = this.props;
        const {
            name,
            artwork,
            trackUrl,
            lyrics,
            isTagsFound,
            setLyricsStatus,
            shouldSearchLyrics
        } = item;

        const isLyricsExist = !_.isEmpty(lyrics);

        const trackInfoClassName = classes('track-info_container', {
            'not-found': isTagsFound === false,
            success: setLyricsStatus === SUCCESS
        });

        return (
            <div className="drop-menu-item">
                <Image className={'artwork'} src={artwork} />
                <div className={trackInfoClassName}>
                    <InlineEditing
                        className="track-name"
                        value={name}
                        onFinish={this.onFinishEditingItemName}
                    />
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
                <div className="checkbox_container">
                    <Checkbox onChange={this.onChangeCheckboxValue} checked={shouldSearchLyrics} />
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
        onRemoveMusicFile: musicFileIdToRemove => {
            dispatch({ type: ra.REMOVE_MUSIC_FILE, musicFileIdToRemove });
        },
        onUpdateMusicFile: musicFiles => {
            dispatch({ type: ra.UPDATE_MUSIC_FILE, musicFiles });
        }
    })
)(DropMenuItem);
