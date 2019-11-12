import React from 'react';
import { Tooltip, AutoComplete, Select } from 'antd';
import IconFont from '../IconFont';
import './index.less';

const { Option } = AutoComplete;

class SearchIconGroup extends React.Component {
    constructor() {
        super();
        this.state = {
            content: {
                label: '未定义',
                value: 0,
                icon: 'weidingyi'
            }
        };
    }
    render() {
        const { content } = this.state;
        const { options, disabled } = this.props;

        return (
            <div className="attr-icon-box search-icon-box">
                <span className="search-label-icon">{content.label}</span>
                <Select
                    showSearch
                    allowClear={true}
                    value={content.label}
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
                        let active = content.value == option.value;
                        return (
                            <SearchIcon
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
            </div>
        );
    }

    ChooseIcon = val => {
        const { onChange } = this.props;
        const value = Number(val.split('-')[0]);
        if (typeof onChange === 'function') {
            onChange(value);
        }
        this.setState({
            content: this.getLabelSetting(value)
        });
    };

    onChange = value => {
        const { onChange } = this.props;
        if (typeof onChange === 'function') {
            onChange(value);
        }
        this.setState({
            content: this.getLabelSetting(value)
        });
    };

    getLabelSetting = value => {
        const { options } = this.props;
        let obj = {};
        const pos = options.findIndex(val => val.value === value);
        obj.value = value;
        obj.label =
            pos != -1 && this.isPresent(options[pos].label)
                ? options[pos].label
                : '--';
        obj.icon =
            pos != -1 && this.isPresent(options[pos].icon)
                ? options[pos].icon
                : '--';
        return obj;
    };

    isPresent(obj) {
        return (!!obj && String(obj) != '') || obj === 0;
    }
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
                    type={`icon-${icon}`}
                    className={iconClass}
                    onClick={disabled ? () => {} : action}
                />
            </Tooltip>
        );
    }
}

export default SearchIconGroup;
