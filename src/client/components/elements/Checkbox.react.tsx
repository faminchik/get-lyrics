import React, { Component } from 'react';
import { oc } from 'ts-optchain';

interface Props {
    className: string;
    checked: boolean;
    onChange: (isChecked: boolean) => void;
}

export default class Checkbox extends Component<Props> {
    static defaultProps = {
        checked: false,
        className: ''
    };

    private checkboxRef: React.RefObject<HTMLInputElement>;

    constructor(props: Props) {
        super(props);

        this.checkboxRef = React.createRef();
    }

    getChecked(): boolean {
        return oc(this.checkboxRef).current.checked(false);
    }

    onChangeValue = (): void => {
        const isChecked = this.getChecked();

        this.props.onChange(isChecked);
    };

    render() {
        const { className, checked } = this.props;

        return (
            <input
                checked={checked}
                className={className}
                type="checkbox"
                ref={this.checkboxRef}
                onChange={this.onChangeValue}
            />
        );
    }
}
