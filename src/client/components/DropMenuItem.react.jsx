import _ from 'lodash';
import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { Image, Button } from 'react-bootstrap';
import classes from 'classnames';
import ModalWindow from 'client/components/ModalWindow.react';
import InlineEditing from 'client/components/InlineEditing.react';
import Checkbox from 'client/components/Checkbox.react';
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
        const { id } = item;

        removeMusicFile(id);
    };

    onSetLyrics = item => {
        const { setLyrics } = this.props;

        setLyrics(item);
    };

    onFinishEditingItemName = itemName => {
        const { updateMusicFile, item } = this.props;

        updateMusicFile({ ...item, name: itemName });
    };

    onChangeCheckboxValue = isChecked => {
        const { updateMusicFile, item } = this.props;

        updateMusicFile({ ...item, shouldSearchLyrics: isChecked });
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
