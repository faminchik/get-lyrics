import _ from 'lodash';
import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { DragSource, DropTarget } from 'react-dnd';
import { connect } from 'react-redux';
import classes from 'classnames';
import DropMenuItem from 'client/components/DropMenuItem.react';
import * as mfp from 'client/constants/MusicFileProperties';
import { MENU_ITEM } from 'client/constants/DNDTypes';
import { updateMusicFilesOrder } from 'client/redux/actions/musicFilesActions';
import { turnOnDropzone, turnOffDropzone } from 'client/redux/actions/dropzoneActions';

const menuItemDragSource = {
    beginDrag: props => {
        _.invoke(props, 'turnOffDropzone');
        const { item } = props;
        return item;
    },
    endDrag: props => {
        _.invoke(props, 'turnOnDropzone');
    }
};

const menuItemDropTarget = {
    canDrop: (props, monitor) => {
        const sourceItem = monitor.getItem();
        const { item: targetItem } = props;
        const dropsIntoSelf = sourceItem[mfp.ID] === targetItem[mfp.ID];

        return !dropsIntoSelf;
    },
    drop: (props, monitor) => {
        if (monitor.didDrop()) return;

        const { item: targetItem } = props;
        const sourceItem = monitor.getItem();
        _.invoke(props, 'updateMusicFilesOrder', { source: sourceItem, target: targetItem });
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
        updateMusicFilesOrder: PropTypes.func.isRequired,
        turnOnDropzone: PropTypes.func.isRequired,
        turnOffDropzone: PropTypes.func.isRequired,
        connectDragSource: PropTypes.func.isRequired,
        isDragging: PropTypes.bool.isRequired,
        connectDropTarget: PropTypes.func.isRequired,
        isOverCurrent: PropTypes.bool.isRequired,
        canDrop: PropTypes.bool.isRequired,
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

        const classNames = classes('dnd-drop-menu-item', {
            'drop-source': isDragging,
            'drop-target': isOverCurrent && canDrop
        });

        return connectDropTarget(
            connectDragSource(
                <div className={classNames}>
                    <DropMenuItem item={item} />
                </div>
            )
        );
    }
}

const mapStateToProps = state => ({});

export default connect(
    mapStateToProps,
    { updateMusicFilesOrder, turnOnDropzone, turnOffDropzone }
)(DnDDropMenuItem);
