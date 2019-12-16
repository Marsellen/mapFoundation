import React from 'react';
import { Tooltip, message } from 'antd';
import IconFont from '../IconFont';

class AdSubLamp extends React.Component {
    render() {
        const { options, disabled, value } = this.props;

        return (
            <div className="attr-icon-box">
                {options.map((opt, index) => {
                    let active = value && value.includes(opt.value);
                    return (
                        <SubLampIcon
                            key={index}
                            icon={opt.label}
                            disabled={opt.disabled || disabled}
                            active={active}
                            label={opt.label}
                            action={() => {
                                this.onChange(opt.value);
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

class SubLampIcon extends React.Component {
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

export default AdSubLamp;
