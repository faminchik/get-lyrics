import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { DndProvider } from 'react-dnd';
import HTML5Backend from 'react-dnd-html5-backend';
import classes from 'classnames';
import _ from 'lodash';
import DnDDropMenuItem from 'client/components/wrappers/DnDDropMenuItem.react';

export default class DropMenu extends Component {
    static propTypes = {
        items: PropTypes.array,
        isDragEffect: PropTypes.bool
    };

    static defaultProps = {
        items: [],
        isDragEffect: false
    };

    renderMenuItems = () => {
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
