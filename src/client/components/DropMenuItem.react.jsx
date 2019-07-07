import _ from 'lodash';
import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { Image, Button } from 'react-bootstrap';
import classes from 'classnames';
import * as mfp from 'client/constants/MusicFileProperties';
import LyricsModalWindow from 'client/components/LyricsModalWindow.react';
import InlineEditing from 'client/components/elements/InlineEditing.react';
import Checkbox from 'client/components/elements/Checkbox.react';
import {
    removeMusicFile,
    updateMusicFile,
    setLyrics
} from 'client/redux/actions/musicFilesActions';
import { SUCCESS } from 'shared/constants/responseStatus';

class DropMenuItem extends Component {
    static propTypes = {
        removeMusicFile: PropTypes.func.isRequired,
        updateMusicFile: PropTypes.func.isRequired,
        setLyrics: PropTypes.func.isRequired,
        item: PropTypes.object
    };

    static defaultProps = {
        item: {}
    };

    onRemoveItem = item => {
        const { removeMusicFile } = this.props;
        const { [mfp.ID]: id } = item;

        removeMusicFile(id);
    };

    onSetLyrics = item => {
        const { setLyrics } = this.props;

        setLyrics(item);
    };

    onFinishEditingItemName = itemName => {
        const { updateMusicFile, item } = this.props;

        updateMusicFile({ ...item, [mfp.NAME]: itemName });
    };

    onChangeCheckboxValue = isChecked => {
        const { updateMusicFile, item } = this.props;

        updateMusicFile({ ...item, [mfp.SHOULD_SEARCH_LYRICS]: isChecked });
    };

    render() {
        const { item } = this.props;
        const {
            [mfp.NAME]: name,
            [mfp.ARTWORK]: artwork,
            [mfp.TRACK_URL]: trackUrl,
            [mfp.LYRICS]: lyrics,
            [mfp.ARE_TAGS_FOUND]: areTagsFound,
            [mfp.SET_LYRICS_STATUS]: setLyricsStatus,
            [mfp.SHOULD_SEARCH_LYRICS]: shouldSearchLyrics
        } = item;

        const isLyricsExist = !_.isEmpty(lyrics);

        const trackInfoClassName = classes('track-info_container', {
            'not-found': areTagsFound === false,
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
                    <LyricsModalWindow
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
                        onClick={() => this.onSetLyrics(item)}
                    >
                        Set Lyrics
                    </Button>
                </div>
                <div className="checkbox_container">
                    <Checkbox onChange={this.onChangeCheckboxValue} checked={shouldSearchLyrics} />
                </div>
                <div className="remove-button_container">
                    <button className="clr-but" onClick={() => this.onRemoveItem(item)}>
                        <span className="zmdi zmdi-delete zmdi-hc-lg" />
                    </button>
                </div>
            </div>
        );
    }
}

const mapStateToProps = state => ({});

export default connect(
    mapStateToProps,
    { removeMusicFile, updateMusicFile, setLyrics }
)(DropMenuItem);
