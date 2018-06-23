import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import * as ra from '../constants/reducersActions';

class DropMenuItem extends Component {
    static propTypes = {
        item: PropTypes.object
    };

    static defaultProps = {
        item: {}
    };

    removeItem = item => {
        const { onMusicFile } = this.props;
        onMusicFile(item);
    };

    render() {
        const { item } = this.props;

        return (
            <div className="drop-menu-item">
                <div className="track-name">{item.name}</div>
                <div className="remove-button_container">
                    <button className="clr-but" onClick={() => this.removeItem(item)}>
                        <span className="zmdi zmdi-delete zmdi-hc-2x" />
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
