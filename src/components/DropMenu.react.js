import React, { Component } from 'react';
import PropTypes from 'prop-types';
import DropMenuItem from './DropMenuItem.react';

export default class DropMenu extends Component {
    static propTypes = {
        items: PropTypes.array
    };

    static defaultProps = {
        items: []
    };

    renderMenuItems = () => {
        const { items } = this.props;

        return _.map(items, (item, key) => <DropMenuItem item={item} key={key} />);
    };

    render() {
        return <div className="drop-menu_container">{this.renderMenuItems()}</div>;
    }
}
