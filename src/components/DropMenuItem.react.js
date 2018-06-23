import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { Image } from 'react-bootstrap';
import * as ra from '../constants/reducersActions';

class DropMenuItem extends Component {
    static propTypes = {
        item: PropTypes.object,
        artwork: PropTypes.string
    };

    static defaultProps = {
        item: {},
        artwork: ''
    };

    removeItem = item => {
        const { onMusicFile } = this.props;
        onMusicFile(item);
    };

    render() {
        const { item } = this.props;
        const { name, artwork } = item;

        console.log('item', item);
        return (
            <div className="drop-menu-item">
                <Image className={'artwork'} src={artwork} />
                <div className="track-name">{name}</div>
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
        onMusicFile: musicFileToRemove => {
            dispatch({ type: ra.REMOVE_MUSIC_FILE, musicFileToRemove });
        }
    })
)(DropMenuItem);
