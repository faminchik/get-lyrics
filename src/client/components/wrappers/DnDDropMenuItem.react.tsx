import compose from 'lodash/fp/compose';
import React, { Component } from 'react';
import { ConnectedComponentClass } from 'react-redux';
import {
    DragSource,
    DropTarget,
    DragSourceSpec,
    DropTargetSpec,
    ConnectDragSource,
    ConnectDropTarget,
    DragSourceMonitor,
    DropTargetMonitor,
    DragSourceConnector,
    DropTargetConnector,
    DragSourceCollector,
    DropTargetCollector
} from 'react-dnd';
import { connect } from 'react-redux';
import classes from 'classnames';
import { MusicFile } from 'ts/interfaces/musicFile.interfaces';
import DropMenuItem from 'client/components/DropMenuItem.react';
import mfp from 'client/constants/MusicFileProperties';
import { MENU_ITEM } from 'client/constants/DNDTypes';
import { updateMusicFilesOrder } from 'client/redux/actions/musicFilesActions';
import { turnOnDropzone, turnOffDropzone } from 'client/redux/actions/dropzoneActions';

interface DnDDropMenuItemDispatchProps {
    updateMusicFilesOrder: ({ source, target }: { source: MusicFile; target: MusicFile }) => void;
    turnOnDropzone: () => void;
    turnOffDropzone: () => void;
}

interface DragSourceProps {
    connectDragSource: ConnectDragSource;
    isDragging: boolean;
}
interface DropTargetProps {
    connectDropTarget: ConnectDropTarget;
    isOverCurrent: boolean;
    canDrop: boolean;
}

interface DnDDropMenuItemOwnProps {
    item: MusicFile;
}

interface Props
    extends DnDDropMenuItemDispatchProps,
        DragSourceProps,
        DropTargetProps,
        DnDDropMenuItemOwnProps {}

const menuItemDragSourceSpec: DragSourceSpec<Props, MusicFile> = {
    beginDrag: (props: Props) => {
        props.turnOffDropzone();

        const { item } = props;
        return item;
    },
    endDrag: (props: Props) => {
        props.turnOnDropzone();
    }
};

const menuItemDropTargetSpec: DropTargetSpec<Props> = {
    canDrop: (props: Props, monitor: DropTargetMonitor) => {
        const sourceItem = monitor.getItem() as MusicFile;
        const { item: targetItem } = props;
        const dropsIntoSelf = sourceItem[mfp.ID] === targetItem[mfp.ID];

        return !dropsIntoSelf;
    },
    drop: (props: Props, monitor: DropTargetMonitor) => {
        if (monitor.didDrop()) return;

        const { item: targetItem } = props;
        const sourceItem = monitor.getItem() as MusicFile;
        props.updateMusicFilesOrder({ source: sourceItem, target: targetItem });
    }
};

const menuItemDragSourceCollector: DragSourceCollector<DragSourceProps, Props> = (
    connect: DragSourceConnector,
    monitor: DragSourceMonitor
) => ({
    connectDragSource: connect.dragSource(),
    isDragging: monitor.isDragging()
});

const menuItemDropTargetCollector: DropTargetCollector<DropTargetProps, Props> = (
    connect: DropTargetConnector,
    monitor: DropTargetMonitor
) => ({
    connectDropTarget: connect.dropTarget(),
    isOverCurrent: monitor.isOver(),
    canDrop: monitor.canDrop()
});

class DnDDropMenuItem extends Component<Props> {
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

const mapStateToProps = () => ({});

// TODO change ?!
const ComposedDnDDropMenuItem = compose(
    DragSource(MENU_ITEM, menuItemDragSourceSpec, menuItemDragSourceCollector),
    DropTarget(MENU_ITEM, menuItemDropTargetSpec, menuItemDropTargetCollector)
)(DnDDropMenuItem) as ConnectedComponentClass<typeof DnDDropMenuItem, Pick<Props, 'item'>>;

export default connect(
    mapStateToProps,
    { updateMusicFilesOrder, turnOnDropzone, turnOffDropzone }
)(ComposedDnDDropMenuItem);
