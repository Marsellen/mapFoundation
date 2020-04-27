import React from 'react';
import 'src/assets/less/components/ad-color-select.less';
import { Select } from 'antd';
import { SketchPicker } from 'react-color';

const { Option } = Select;

class AdColorSelect extends React.Component {
    constructor(props) {
        super(props);
        let { color } = this.props;
        this.options = this.handleOptions();
        //为让select内容居中，区分下拉框里有无滚动条，padding距离不同
        this.margin = this.options.length > 8 ? 'margin-5' : 'margin-12';

        this.state = {
            visible: false,
            color: color || '#fff',
            currentValue: this.getColorNodeKey(color || '#fff')
        };

        this.timeout = false;
    }

    //将options处理成[{key:xx,label:ReactNode}]
    handleOptions = () => {
        const newOptions = [];
        this.props.options.forEach(item => {
            const { key, color } = item;
            const newItem = {
                key,
                label: this._optionIconNode(color)
            };
            newOptions.push(newItem);
        });
        return newOptions;
    };

    //图标组件
    _optionIconNode = color => {
        const { width } = this.props;
        //根据width不同加载不同字体图标（待UI提供图标）
        return (
            <div className="color-select-box">
                <div
                    style={{
                        height: '15px',
                        width: width - 30,
                        border: '1px solid #D7D7D7',
                        background: color
                    }}></div>
            </div>
        );
    };

    getColorNodeKey = color => {
        return {
            key: color,
            label: this._optionIconNode(color)
        };
    };

    setColor = color => {
        this.setState({
            color,
            currentValue: this.getColorNodeKey(color)
        });
        this.props.onChange && this.props.onChange(color);
    };

    //antd select组件 change事件
    handleChange = value => {
        const { key: color } = value;
        this.setColor(color);
    };

    //自定义调色板change
    handleDefineChange = value => {
        const { rgb } = value;
        const { r, g, b, a } = rgb;
        const color = `rgba(${r},${g},${b},${a})`;
        this.setColor(color);

        //防抖，减少重置画布次数
        this.timeout && clearTimeout(this.timeout);
        this.timeout = setTimeout(() => {
            this.props.onChange && this.props.onChange(color);
        }, 500);
    };

    //阻止事件向上层冒泡，点击调色板时，不会调用this.hide()
    stopPropagation = e => {
        e.stopPropagation();
        e.nativeEvent.stopImmediatePropagation();
    };

    //隐藏调色板
    hide = () => {
        this.setState({
            visible: false
        });
        //解除全局事件绑定
        document.removeEventListener('click', this.hide);
    };

    //显示调色板
    show = e => {
        this.setState({
            visible: true
        });
        //全局绑定隐藏事件，点击页面任何地方都将调用this.hide()，调用后解除全局事件绑定
        document.addEventListener('click', this.hide);
    };

    //自定义下拉菜单
    dropdownRender = menu => {
        const { width } = this.props;
        return (
            <div>
                {menu}
                <div
                    className="define-color-box"
                    onMouseDown={e => e.preventDefault()}>
                    <div
                        className="define-color-btn"
                        onClick={this.show}
                        style={{
                            width: width - 30
                        }}>
                        自定义
                    </div>
                </div>
            </div>
        );
    };

    render() {
        const { width, disableAlpha } = this.props;
        const { visible, color, currentValue } = this.state;
        return (
            // labelInValue={true} 会把 Select 的 value 类型从 string 变为 {key: string, label: ReactNode} 的格式
            // 所以defaultValue 也应该是这种格式 {key: string, label: ReactNode}
            <div
                className={`ad-color-select-box ${
                    visible ? 'set-z-index' : ''
                }`}>
                <Select
                    style={{ width }}
                    className="ad-color-select"
                    defaultValue={this.options[0]}
                    value={currentValue}
                    labelInValue={true}
                    dropdownClassName={`ad-color-select-dropdown ${
                        visible ? 'hide' : ''
                    } ${this.margin}`}
                    onChange={this.handleChange}
                    dropdownRender={this.dropdownRender}>
                    {this.options.map(item => {
                        const { key, label } = item;
                        return (
                            <Option value={key} key={`option_${key}`}>
                                {label}
                            </Option>
                        );
                    })}
                </Select>
                {/* 调色板 */}
                {visible && (
                    <div onClick={this.stopPropagation}>
                        <SketchPicker
                            className="color-palette"
                            color={color}
                            disableAlpha={disableAlpha}
                            onChange={this.handleDefineChange}
                        />
                    </div>
                )}
            </div>
        );
    }
}

export default AdColorSelect;
