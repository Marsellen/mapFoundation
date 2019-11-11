import React from 'react';
import { Tooltip, AutoComplete, Select } from 'antd';
import IconFont from '../IconFont';
import './index.less';

const { Option } = AutoComplete;

class SearchIconGroup extends React.Component {
    render() {
        const { options, disabled, active, value } = this.props;
        let iconClass = 'ad-icon';
        if (disabled) iconClass = iconClass + ' ad-disabled-icon';
        if (active) iconClass = iconClass + ' ad-active-icon';

        return (
            <div className="attr-icon-box search-icon-box">
                <Select
                    allowClear={true}
                    onChange={this.ChooseIcon}
                    filterOption={(input, option) =>
                        option.props.children
                            .toLowerCase()
                            .indexOf(input.toLowerCase()) >= 0
                    }>
                    {options.map(opt => (
                        <Option
                            key={opt.icon}
                            value={`${opt.value}-${opt.label}`}>
                            {`${opt.value}-${opt.label}`}
                        </Option>
                    ))}
                </Select>
                <div>
                    {options.map((option, index) => {
                        let active = value == option.value;
                        return (
                            <SearchIcon
                                key={index}
                                icon={option.icon}
                                disabled={option.disabled || disabled}
                                active={active}
                                label={option.label}
                            />
                        );
                    })}
                </div>
            </div>
        );
    }

    ChooseIcon = val => {
        const { options, onChange } = this.props;
        const obj = {};
        obj.value = val.split('-')[0];
        options.forEach(item => {
            if (item.value === Number(obj.value)) {
                obj.label = item.label;
            }
        });
        if (typeof onChange === 'function') {
            onChange(Number(obj.value));
        }
        this.props.getContent(obj.label);
    };
}

class SearchIcon extends React.Component {
    render() {
        const { icon, disabled, active, action, label } = this.props;
        let iconClass = 'ad-icon';
        if (disabled) iconClass = iconClass + ' ad-disabled-icon';
        if (active) iconClass = iconClass + ' ad-active-icon';
        return (
            <Tooltip placement="top" mouseEnterDelay={1} title={label}>
                <IconFont
                    label={label}
                    type={`icon-${icon}`}
                    className={iconClass}
                    onClick={disabled ? () => {} : action}
                />
            </Tooltip>
        );
    }
}

export default SearchIconGroup;
