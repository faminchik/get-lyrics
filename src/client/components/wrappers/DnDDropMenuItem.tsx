import React, { PureComponent } from 'react';
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
import { MusicFile } from 'ts/MusicFile';
import DropMenuItem from 'client/components/DropMenuItem';
import { MENU_ITEM } from 'client/constants/DnDTypes';
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
        const dropsIntoSelf = sourceItem.id === targetItem.id;

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

class DnDDropMenuItem extends PureComponent<Props> {
    override render() {
        const { item, connectDropTarget, connectDragSource, isDragging, isOverCurrent, canDrop } =
            this.props;

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

const ComposedDnDDropMenuItem = DragSource(
    MENU_ITEM,
    menuItemDragSourceSpec,
    menuItemDragSourceCollector
)(DropTarget(MENU_ITEM, menuItemDropTargetSpec, menuItemDropTargetCollector)(DnDDropMenuItem));

const mapStateToProps = () => ({});

export default connect(mapStateToProps, { updateMusicFilesOrder, turnOnDropzone, turnOffDropzone })(
    ComposedDnDDropMenuItem
);
