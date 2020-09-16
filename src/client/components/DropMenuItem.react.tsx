import _ from 'lodash';
import React, { PureComponent } from 'react';
import { connect } from 'react-redux';
import { Image, Button } from 'react-bootstrap';
import classes from 'classnames';
import { MusicFile } from 'ts/interfaces/musicFile.interfaces';
import mfp from 'client/constants/MusicFileProperties';
import LyricsModalWindow from 'client/components/LyricsModalWindow.react';
import InlineEditing from 'client/components/elements/InlineEditing.react';
import Checkbox from 'client/components/elements/Checkbox.react';
import {
    removeMusicFile,
    updateMusicFile,
    setLyrics
} from 'client/redux/actions/musicFilesActions';
import rs from 'shared/constants/ResponseStatus';

interface DropMenuItemDispatchProps {
    removeMusicFile: (musicFileId: MusicFile['id']) => void;
    updateMusicFile: (musicFile: MusicFile) => void;
    setLyrics: (musicFile: MusicFile) => void;
}

interface DropMenuItemOwnProps {
    item: MusicFile;
}

interface Props extends DropMenuItemDispatchProps, DropMenuItemOwnProps {}

class DropMenuItem extends PureComponent<Props> {
    onRemoveItem = (item: MusicFile): void => {
        const { [mfp.ID]: id } = item;

        this.props.removeMusicFile(id);
    };

    onSetLyrics = (item: MusicFile): void => {
        this.props.setLyrics(item);
    };

    onFinishEditingItemName = (itemName: string): void => {
        const { updateMusicFile, item } = this.props;

        updateMusicFile({ ...item, [mfp.NAME]: itemName });
    };

    onChangeCheckboxValue = (isChecked: boolean): void => {
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
            success: setLyricsStatus === rs.SUCCESS,
            error: setLyricsStatus === rs.ERROR
        });

        return (
            <div className="drop-menu-item">
                <Image className="artwork" src={artwork} />
                <div className={trackInfoClassName}>
                    <InlineEditing
                        className="track-name"
                        value={name}
                        onFinish={this.onFinishEditingItemName}
                    />
                    <a
                        href={trackUrl}
                        className="track-url"
                        target="_blank"
                        rel="noopener noreferrer"
                    >
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

const mapStateToProps = () => ({});

export default connect(mapStateToProps, { removeMusicFile, updateMusicFile, setLyrics })(
    DropMenuItem
);
