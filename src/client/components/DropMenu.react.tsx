import _ from 'lodash';
import React, { Component } from 'react';
import { DndProvider } from 'react-dnd';
import HTML5Backend from 'react-dnd-html5-backend';
import classes from 'classnames';
import { MusicFile } from 'ts/interfaces/musicFile.interfaces';
import DnDDropMenuItem from 'client/components/wrappers/DnDDropMenuItem.react';

interface Props {
    items: MusicFile[];
    isDragEffect: boolean;
}

export default class DropMenu extends Component<Props> {
    static defaultProps = {
        items: [],
        isDragEffect: false
    };

    renderMenuItems = (): JSX.Element[] => {
        const { items } = this.props;

        return _.map(items, (item, key) => <DnDDropMenuItem item={item} key={key} />);
    };

    render() {
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
