import _ from 'lodash';
import React, { PureComponent } from 'react';
import { connect } from 'react-redux';
import { Image, Button } from 'react-bootstrap';
import classes from 'classnames';
import { MusicFile } from 'ts/MusicFile';
import LyricsModalWindow from 'client/components/LyricsModalWindow';
import InlineEditing from 'client/components/elements/InlineEditing';
import Checkbox from 'client/components/elements/Checkbox';
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
        const { id } = item;

        this.props.removeMusicFile(id);
    };

    onSetLyrics = (item: MusicFile): void => {
        this.props.setLyrics(item);
    };

    onFinishEditingItemName = (itemName: string): void => {
        const { updateMusicFile, item } = this.props;

        updateMusicFile({ ...item, name: itemName });
    };

    onChangeCheckboxValue = (isChecked: boolean): void => {
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
            areTagsFound,
            setLyricsStatus,
            shouldSearchLyrics
        } = item;

        const isLyricsExist = !_.isEmpty(lyrics);

        const trackInfoClassName = classes('track-info_container', {
            'not-found': areTagsFound === false,
            success: setLyricsStatus === rs.SUCCESS,
            error: setLyricsStatus === rs.ERROR
        });

        return (
            <div className="drop-menu-item">
                {artwork && <Image className="artwork" src={artwork} />}
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
