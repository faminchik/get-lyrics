import _ from 'lodash';
import React, { PureComponent } from 'react';
import { Button, Modal } from 'react-bootstrap';
import CopyToClipboard from 'react-copy-to-clipboard';

interface Props {
    disabled: boolean;
    text: string;
    buttonText: string;
    modalTitle: string;
}

interface State {
    showModal: boolean;
}

export default class LyricsModalWindow extends PureComponent<Props, State> {
    static defaultProps: Partial<Props> = {
        disabled: true,
        text: '',
        buttonText: '',
        modalTitle: ''
    };

    override state = { showModal: false };

    handleShow = (): void => {
        this.setState({ showModal: true });
    };

    handleClose = (): void => {
        this.setState({ showModal: false });
    };

    override render() {
        const { disabled, text, buttonText, modalTitle } = this.props;
        const { showModal } = this.state;

        const textWithBreakLines = _.replace(text, /\r\n?|\n/g, '<br>');

        return (
            <>
                <Button bsStyle="info" bsSize="small" disabled={disabled} onClick={this.handleShow}>
                    {buttonText}
                </Button>

                <Modal show={showModal} onHide={this.handleClose}>
                    <Modal.Header>
                        <Modal.Title>{modalTitle}</Modal.Title>
                    </Modal.Header>
                    <Modal.Body>
                        <CopyToClipboard text={text}>
                            <div className="copy-to-clipboard_container">
                                <span className="zmdi zmdi-copy zmdi-hc-2x copy-to-clipboard" />
                            </div>
                        </CopyToClipboard>
                        <p dangerouslySetInnerHTML={{ __html: textWithBreakLines }} />
                    </Modal.Body>
                    <Modal.Footer>
                        <Button onClick={this.handleClose}>Close</Button>
                    </Modal.Footer>
                </Modal>
            </>
        );
    }
}
