import React, { Component } from 'react';
import PropTypes from 'prop-types';
import classes from 'classnames';
import _ from 'lodash';
import DropMenuItem from 'client/components/DropMenuItem.react';

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

        return _.map(items, (item, key) => <DropMenuItem item={item} key={key} />);
    };

    render() {
        const { isDragEffect } = this.props;

        const classNames = classes('drop-menu_container', {
            'drag-effect': isDragEffect
        });

        return <div className={classNames}>{this.renderMenuItems()}</div>;
    }
}
