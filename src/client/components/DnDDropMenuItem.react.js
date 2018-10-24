import _ from 'lodash';
import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { DragSource, DropTarget, DragDropContext } from 'react-dnd';
import { connect } from 'react-redux';
import classes from 'classnames';
import HTML5Backend from 'react-dnd-html5-backend';
import DropMenuItem from './DropMenuItem.react';
import { MENU_ITEM } from '../constants/DNDTypes';
import * as ra from '../constants/reducersActions';

const menuItemDragSource = {
    beginDrag: props => {
        const { item } = props;
        return item;
    }
};

const menuItemDropTarget = {
    canDrop: (props, monitor) => {
        const sourceItem = monitor.getItem();
        const { item: targetItem } = props;
        const dropsIntoSelf = sourceItem.id === targetItem.id;

        return !dropsIntoSelf;
    },
    drop: (props, monitor) => {
        if (monitor.didDrop()) return;

        const { item: targetItem, onUpdateMusicFilesOrder } = props;
        const sourceItem = monitor.getItem();
        if (!_.isFunction(onUpdateMusicFilesOrder)) return;

        onUpdateMusicFilesOrder(sourceItem, targetItem);
    }
};

@DragSource(MENU_ITEM, menuItemDragSource, (connect, monitor) => ({
    connectDragSource: connect.dragSource(),
    isDragging: monitor.isDragging()
}))
@DropTarget(MENU_ITEM, menuItemDropTarget, (connect, monitor) => ({
    connectDropTarget: connect.dropTarget(),
    isOverCurrent: monitor.isOver(),
    canDrop: monitor.canDrop()
}))
class DnDDropMenuItem extends Component {
    static propTypes = {
        item: PropTypes.object
    };

    static defaultProps = {
        item: {}
    };

    render() {
        const {
            item,
            connectDropTarget,
            connectDragSource,
            isDragging,
            isOverCurrent,
            canDrop
        } = this.props;

        const classNames = classes('dnd-drop-menu-item', { drop_target: isOverCurrent && canDrop });

        return connectDropTarget(
            connectDragSource(
                <div className={classNames}>
                    <DropMenuItem item={item} />
                </div>
            )
        );
    }
}

DnDDropMenuItem = DragDropContext(HTML5Backend)(DnDDropMenuItem);
export default connect(
    state => state,
    dispatch => ({
        onUpdateMusicFilesOrder: (source, target) => {
            dispatch({ type: ra.UPDATE_MUSIC_FILES_ORDER, source, target });
        }
    })
)(DnDDropMenuItem);
