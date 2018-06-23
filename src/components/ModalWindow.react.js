import _ from 'lodash';
import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { Button, Modal } from 'react-bootstrap';
import { CopyToClipboard } from 'react-copy-to-clipboard';

export default class ModalWindow extends Component {
    static propTypes = {
        disabled: PropTypes.bool,
        text: PropTypes.string,
        buttonText: PropTypes.string,
        modalTitle: PropTypes.string
    };

    static defaultProps = {
        disabled: true,
        text: '',
        buttonText: '',
        modalTitle: ''
    };

    constructor() {
        super();
        this.state = {
            showModal: false
        };
    }

    handleShow = () => {
        this.setState({ showModal: true });
    };

    handleClose = () => {
        this.setState({ showModal: false });
    };

    showLyrics = () => {};

    render() {
        const { disabled, text, buttonText, modalTitle } = this.props;
        const { showModal } = this.state;

        const textWithBreakLines = _.replace(text, /\r\n?|\n/g, '<br>');

        return (
            <React.Fragment>
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
            </React.Fragment>
        );
    }
}
