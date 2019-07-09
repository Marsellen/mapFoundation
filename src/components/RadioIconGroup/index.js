import React from 'react';
import { Tooltip, Icon } from 'antd';
import IconFont from '../IconFont';

class RadioIconGroup extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            value: props.value
        };
    }

    render() {
        const { value } = this.state;
        const { options, disabled } = this.props;
        return (
            <div className="attr-icon-box">
                {options.map((option, index) => {
                    let active = value == option.value;
                    return (
                        <RadioIcon
                            key={index}
                            icon={option.icon}
                            disabled={option.disabled || disabled}
                            active={active}
                            label={option.label}
                            action={() => {
                                this.onChange(option.value);
                            }}
                        />
                    );
                })}
            </div>
        );
    }

    onChange = value => {
        const { onChange } = this.props;
        this.setState(
            {
                value: value
            },
            () => {
                if (typeof onChange === 'function') {
                    onChange(this.state.value);
                }
            }
        );
    };
}

class RadioIcon extends React.Component {
    render() {
        const { icon, disabled, active, action, label } = this.props;
        let iconClass = 'ad-icon';
        if (disabled) iconClass = iconClass + ' ad-disabled-icon';
        if (active) iconClass = iconClass + ' ad-active-icon';
        return (
            <Tooltip placement="top" title={label}>
                <IconFont
                    type={`icon-${icon}`}
                    className={iconClass}
                    onClick={disabled ? () => {} : action}
                />
            </Tooltip>
        );
    }
}

export default RadioIconGroup;
