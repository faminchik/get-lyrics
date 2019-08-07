import _ from 'lodash';
import React, { PureComponent } from 'react';
import { oc } from 'ts-optchain';
import * as keyCodes from 'client/constants/KeyCodes';

const INNER_TEXT = 'innerText';

interface Props {
    value: string;
    className: string;
    onFinish: (isChecked: string) => void;
}

interface State {
    value: string;
    contentEditable: boolean;
}
export default class InlineEditing extends PureComponent<Props, State> {
    private elementRef: React.RefObject<HTMLInputElement>;

    constructor(props: Props) {
        super(props);

        const { value } = this.props;
        this.state = { value, contentEditable: false };

        this.elementRef = React.createRef();
    }

    static defaultProps = {
        className: ''
    };

    componentDidUpdate() {
        this._setInnerHTML();
    }

    componentDidMount() {
        this._setInnerHTML();
    }

    componentWillReceiveProps(nextProps: Props) {
        const { value: newValue } = nextProps;
        const { value: oldValue } = this.state;

        if (newValue !== oldValue) {
            this.setState({ value: newValue });
        }
    }

    onBlur = (): void => {
        if (!this.state.contentEditable) return;

        const value = oc(this.elementRef).current[INNER_TEXT](this.state.value);
        this.setState({ contentEditable: false, value }, () => {
            this.props.onFinish(value);
        });
    };

    onFocus = (): void => {
        this.setState({ contentEditable: true });
    };

    handleEscape = (): void => {
        this.setState({ contentEditable: false }, () => {
            this._simulateDomBlurEvent();
        });
    };

    onKeyDown = (event: React.KeyboardEvent): void => {
        if (!this.state.contentEditable) return;

        if (event.keyCode === keyCodes.ENTER) {
            this._simulateDomBlurEvent();
        }

        if (event.keyCode === keyCodes.ESCAPE) {
            this.handleEscape();
        }
    };

    _setInnerHTML = (): void => {
        _.set(this.elementRef, 'current.innerHTML', this.state.value);
    };

    _simulateDomBlurEvent = (): void => {
        _.invoke(this.elementRef, 'current.blur');
    };

    render() {
        const { contentEditable } = this.state;
        const { className } = this.props;

        return (
            <div
                tabIndex={0}
                ref={this.elementRef}
                className={className}
                onBlur={this.onBlur}
                onFocus={this.onFocus}
                onKeyDown={this.onKeyDown}
                contentEditable={contentEditable}
            />
        );
    }
}
