import React from 'react';
import 'src/assets/less/components/ad-node-select.less';
import { Select } from 'antd';
import IconFont from 'src/components/IconFont';

const { Option } = Select;

class AdNodeSelect extends React.Component {
    constructor(props) {
        super(props);
        this.options = this.handleOptions();
        //为让select内容居中，区分下拉框里有无滚动条，padding距离不同
        this.padding = this.options.length > 8 ? 'padding-5' : 'padding-12';
    }

    handleChange = value => {
        const { key } = value;
        this.props.onChange && this.props.onChange(key);
    };

    //图标组件
    _optionIconNode = icon => {
        const { size: fontSize } = this.props;
        //根据width不同加载不同字体图标（待UI提供图标）
        return (
            <div className={`select-icon-box`}>
                <IconFont type={`icon-${icon}`} style={{ fontSize }} />
            </div>
        );
    };

    //将options处理成[{key:xx,label:ReactNode}]
    handleOptions = () => {
        const newOptions = [];
        this.props.options.forEach(item => {
            const { key, icon } = item;
            const newItem = {
                key,
                label: this._optionIconNode(icon)
            };
            newOptions.push(newItem);
        });
        return newOptions;
    };

    render() {
        const { width, className, disabled, value } = this.props;
        const currentValue =
            this.options.find(item => item.key === value) || this.options[0];

        return (
            // labelInValue={true} 会把 Select 的 value 类型从 string 变为 {key: string, label: ReactNode} 的格式
            // 所以defaultValue 也应该是这种格式 {key: string, label: ReactNode}
            <Select
                style={{ width }}
                disabled={disabled}
                className={`ad-node-select ${className}`}
                value={currentValue}
                labelInValue={true}
                dropdownClassName={`ad-node-select-dropdown ${this.padding}`}
                onChange={this.handleChange}>
                {this.options.map(item => {
                    const { key, label } = item;
                    return (
                        <Option value={key} key={`option_${key}`}>
                            {label}
                        </Option>
                    );
                })}
            </Select>
        );
    }
}

export default AdNodeSelect;
