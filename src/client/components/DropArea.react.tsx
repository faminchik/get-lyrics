import React, { PureComponent } from 'react';
import { connect } from 'react-redux';
import { FFile } from 'ts/File';
import { MusicFile } from 'ts/MusicFile';
import Dropzone from 'client/components/React-Dropzone';
import { addMusicFiles } from 'client/redux/actions/musicFilesActions';

interface DropFilesDispatchProps {
    addMusicFiles: (newFiles: FFile[]) => void;
}

interface DropFilesOwnProps {
    allowedFileTypes: string[] | string;
    disabled: boolean;
    multiple: boolean;
    menuItems: MusicFile[];
    turnedOff: boolean;
}

interface Props extends DropFilesDispatchProps, DropFilesOwnProps {}

class DropArea extends PureComponent<Props> {
    static defaultProps = {
        disabled: false,
        multiple: true,
        menuItems: [],
        turnedOff: false
    };

    onDrop = (newFiles: FFile[]): void => {
        const { addMusicFiles } = this.props;

        addMusicFiles(newFiles);
    };

    render() {
        const { disabled, allowedFileTypes, multiple, menuItems, turnedOff } = this.props;

        return (
            <Dropzone
                className="drop-area"
                disabledClassName="disabled"
                activeClassName="active"
                acceptClassName="accept"
                rejectClassName="reject"
                disabled={disabled}
                onDrop={this.onDrop}
                accept={allowedFileTypes}
                multiple={multiple}
                menuItems={menuItems}
                turnedOff={turnedOff}
            />
        );
    }
}

const mapStateToProps = () => ({});

export default connect(mapStateToProps, { addMusicFiles })(DropArea);
