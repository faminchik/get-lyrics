import _ from 'lodash';
import React, { PureComponent } from 'react';
import { DndProvider } from 'react-dnd';
import { HTML5Backend } from 'react-dnd-html5-backend';
import classes from 'classnames';
import { MusicFile } from 'ts/MusicFile';
import DnDDropMenuItem from 'client/components/wrappers/DnDDropMenuItem';

interface Props {
    items: MusicFile[];
    isDragEffect: boolean;
}

export default class DropMenu extends PureComponent<Props> {
    static defaultProps: Partial<Props> = {
        isDragEffect: false
    };

    renderMenuItems = (): JSX.Element[] => {
        const { items } = this.props;

        return _.map(items, (item, key) => <DnDDropMenuItem item={item} key={key} />);
    };

    override render() {
        const { isDragEffect } = this.props;

        const classNames = classes('drop-menu_container', {
            'drag-effect': isDragEffect
        });

        return (
            <DndProvider backend={HTML5Backend}>
                <div className={classNames}>{this.renderMenuItems()}</div>
            </DndProvider>
        );
    }
}
