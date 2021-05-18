import React, { PureComponent } from 'react';

interface Props {
    className?: string;
    checked: boolean;
    onChange: (isChecked: boolean) => void;
}

export default class Checkbox extends PureComponent<Props> {
    static defaultProps = {
        checked: false
    };

    private checkboxRef: React.RefObject<HTMLInputElement>;

    constructor(props: Props) {
        super(props);

        this.checkboxRef = React.createRef();
    }

    getChecked(): boolean {
        return this.checkboxRef.current?.checked ?? false;
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
