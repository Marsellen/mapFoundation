import React from 'react';
import { Tooltip, Select } from 'antd';
import IconFont from '../IconFont';
import './index.less';

const { Option } = Select;

class SearchIconGroup extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            content: this.getLabelSetting(props.value)
        };
    }
    render() {
        const { content } = this.state;
        const { options } = this.props;
        return (
            <div className="attr-icon-box search-icon-box">
                <span className="search-label-icon">{content.label}</span>
                <Select
                    showSearch
                    value={content.label}
                    onChange={this.ChooseIcon}
                    filterOption={(input, option) =>
                        option.props.children.toLowerCase().indexOf(input.toLowerCase()) >= 0
                    }
                >
                    {this.getOptionsGroup(options).map(opt => (
                        <Option key={opt.icon} value={`${opt.value}-${opt.label}`}>
                            {`${opt.value}-${opt.label}`}
                        </Option>
                    ))}
                </Select>
                <div className="set-icon-group">
                    {options.map((option, index) => {
                        return <div key={`${index}-parent`}>{this.SearchIcon(option, index)}</div>;
                    })}
                </div>
            </div>
        );
    }

    SearchIcon = (option, index) => {
        const { content } = this.state;
        const { disabled } = this.props;
        return (
            <div>
                {option.map((opt, j) => {
                    let active = content.value == opt.value;
                    return (
                        <SearchIcon
                            key={`${index}-child-${j}`}
                            icon={opt.icon}
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
    };

    getOptionsGroup = (options = []) => {
        const opt = options.reduce((a, b) => {
            return a.concat(b);
        }, []);
        return opt;
    };

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
        const opt = this.getOptionsGroup(options);
        let obj = {};
        const pos = opt.findIndex(val => val.value === value);
        obj.value = value;
        obj.label = pos != -1 && this.isPresent(opt[pos].label) ? opt[pos].label : '--';
        obj.icon = pos != -1 && this.isPresent(opt[pos].icon) ? opt[pos].icon : '--';
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
