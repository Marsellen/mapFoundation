import React from 'react';
import { Tooltip, message } from 'antd';
import IconFont from '../IconFont';

class CheckBoxIconGroup extends React.Component {
    render() {
        const { value } = this.props;
        const { options, disabled } = this.props;
        return (
            <div className="attr-icon-box">
                {options.map((option, index) => {
                    let active = value && value.includes(option.value);
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

    onChange = record => {
        const { onChange, value } = this.props;
        if (typeof onChange === 'function') {
            let _value = value + '';
            if (_value.includes(record)) {
                _value = _value.replace(record, '');
            } else {
                switch (_value.length < 3) {
                    case true:
                        _value = _value + record;
                        break;
                    case false:
                        message.warning('最多允许选3个！');
                        break;
                    default:
                        _value = _value + record;
                }
            }
            onChange(_value);
        }
    };
}

class RadioIcon extends React.Component {
    render() {
        const { icon, disabled, active, action, label } = this.props;
        let iconClass = 'ad-icon';
        if (disabled) iconClass = iconClass + ' ad-disabled-icon';
        if (active) iconClass = iconClass + ' ad-active-icon';
        return (
            <Tooltip placement="top" mouseEnterDelay={1} title={label}>
                <IconFont
                    type={`icon-${icon}`}
                    className={iconClass}
                    onClick={disabled ? () => {} : action}
                />
            </Tooltip>
        );
    }
}

export default CheckBoxIconGroup;
