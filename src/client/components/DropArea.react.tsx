import React, { PureComponent } from 'react';
import { connect } from 'react-redux';
import classes from 'classnames';
import Dropzone, { DropzoneProps } from 'react-dropzone';
import DropMenu from 'client/components/DropMenu.react';
import { FFile } from 'ts/File';
import { MusicFile } from 'ts/MusicFile';
import { addMusicFiles } from 'client/redux/actions/musicFilesActions';

interface DropFilesDispatchProps {
    addMusicFiles: (newFiles: FFile[]) => void;
}

interface DropFilesOwnProps {
    menuItems: MusicFile[];
    allowedFileTypes?: DropzoneProps['accept'];
    disabled?: DropzoneProps['disabled'];
    multiple?: DropzoneProps['disabled'];
    noDrag?: DropzoneProps['noDrag'];
}

interface Props extends DropFilesDispatchProps, DropFilesOwnProps {}

class DropArea extends PureComponent<Props> {
    onDrop = (newFiles: FFile[]): void => {
        const { addMusicFiles } = this.props;

        addMusicFiles(newFiles);
    };

    render() {
        const { disabled, allowedFileTypes, multiple, menuItems, noDrag } = this.props;

        return (
            <Dropzone
                disabled={disabled}
                onDrop={this.onDrop}
                accept={allowedFileTypes}
                multiple={multiple}
                noDrag={noDrag}
            >
                {({ getRootProps, isDragActive, isDragAccept, isDragReject }) => {
                    const isDragEffect = isDragActive || isDragAccept || isDragReject;

                    const classNames = classes('drop-area', {
                        'drop-area_disabled': disabled,
                        'drop-area_active': isDragActive,
                        'drop-area_accepted': isDragAccept,
                        'drop-area_rejected': isDragReject
                    });

                    return (
                        <div className={classNames} {...getRootProps()}>
                            <DropMenu items={menuItems} isDragEffect={isDragEffect} />
                        </div>
                    );
                }}
            </Dropzone>
        );
    }
}

const mapStateToProps = () => ({});

export default connect(mapStateToProps, { addMusicFiles })(DropArea);
