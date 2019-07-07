import _ from 'lodash';
import React, { Component } from 'react';
import PropTypes from 'prop-types';

export default class Checkbox extends Component {
    static propTypes = {
        className: PropTypes.string,
        checked: PropTypes.bool,
        onChange: PropTypes.func
    };

    static defaultProps = {
        checked: false
    };

    getChecked() {
        return this.refs.checkbox.checked;
    }

    onChange = () => {
        const isChecked = this.getChecked();

        const { onChange } = this.props;
        if (_.isFunction(onChange)) {
            onChange(isChecked);
        }
    };

    render() {
        const { className, checked } = this.props;

        return (
            <input
                checked={checked}
                className={className}
                type="checkbox"
                ref="checkbox"
                onChange={this.onChange}
            />
        );
    }
}
