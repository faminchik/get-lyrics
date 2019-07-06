import _ from 'lodash';
import React, { Component } from 'react';
import PropTypes from 'prop-types';
import * as keyCodes from 'client/constants/keyCodes';

const INNER_TEXT = 'innerText';

export default class InlineEditing extends Component {
    static propTypes = {
        value: PropTypes.string.isRequired,
        className: PropTypes.string,
        onFinish: PropTypes.func
    };

    constructor(props) {
        super(props);

        const { value } = this.props;
        this.state = {
            value,
            contentEditable: false
        };
    }

    componentDidUpdate() {
        this._setInnerHTML();
    }

    componentDidMount() {
        this._setInnerHTML();
    }

    componentWillReceiveProps(nextProps) {
        const { value: newValue } = nextProps;
        const { value: oldValue } = this.state;

        if (newValue !== oldValue) {
            this.setState({ value: newValue });
        }
    }

    onBlur = () => {
        if (!this.state.contentEditable) return;

        const { onFinish } = this.props;
        const value = this.refs.element[INNER_TEXT];
        this.setState({ contentEditable: false, value }, () => {
            if (_.isFunction(onFinish)) {
                onFinish(value);
            }
        });
    };

    onFocus = () => {
        this.setState({ contentEditable: true });
    };

    handleEscape = () => {
        this.setState({ contentEditable: false }, () => {
            this._simulateDomBlurEvent();
        });
    };

    onKeyDown = event => {
        if (!this.state.contentEditable) return;

        if (event.keyCode === keyCodes.ENTER) {
            this.onBlur();
            this._simulateDomBlurEvent();
        }

        if (event.keyCode === keyCodes.ESCAPE) {
            this.handleEscape();
        }
    };

    _setInnerHTML = () => {
        this.refs.element.innerHTML = this.state.value;
    };

    _simulateDomBlurEvent = () => {
        this.refs.element.blur();
    };

    render() {
        const { contentEditable } = this.state;
        const { className } = this.props;

        return (
            <div
                tabIndex="0"
                ref="element"
                className={className}
                onBlur={this.onBlur}
                onFocus={this.onFocus}
                onKeyDown={this.onKeyDown}
                contentEditable={contentEditable.toString()}
            />
        );
    }
}
