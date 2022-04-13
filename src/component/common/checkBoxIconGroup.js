import React from 'react';
import { Tooltip, message } from 'antd';
import IconFont from 'src/component/common/iconFont';

class CheckBoxIconGroup extends React.Component {
    render() {
        const { value } = this.props;
        const { options, disabled, spaceMark } = this.props;
        return (
            <div className="attr-icon-box">
                {options.map((option, index) => {
                    let active = value && value.split(spaceMark).find(i => i == option.value);
                    // let active = value && value.includes(option.value);
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
        const { onChange, value, max, spaceMark } = this.props;
        if (typeof onChange === 'function') {
            let _value = value ? value : '';
            if (value) {
                let valArr = value.split(spaceMark) || [];
                // 判断原来是否包含新增的record，如果有就删除，否则新增
                if (valArr.find(i => i == record)) {
                    valArr.forEach((val, i) => {
                        if (val == record) valArr.splice(i, 1)
                    })
                    _value = valArr.sort().join(spaceMark);
                } else {
                    if (valArr.length < max) {
                        valArr.push(record);
                        _value = valArr.sort().join(spaceMark);
                    } else {
                        message.warning(`最多允许选${max}个！`);
                        return false;
                    }
                }
            } else {
                _value = record + '';
            }
            _value.length > 0 ? onChange(_value) : message.warning('最少选择1个！');
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
                    onClick={disabled ? () => { } : action}
                />
            </Tooltip>
        );
    }
}

export default CheckBoxIconGroup;
