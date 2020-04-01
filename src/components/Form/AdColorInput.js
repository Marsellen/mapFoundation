import React from 'react';
import 'src/assets/less/components/ad-color-input.less';
import { SketchPicker } from 'react-color';
import IconFont from 'src/components/IconFont';

class AdColorInput extends React.Component {
    constructor(props) {
        super(props);
        let { color, background } = this.props;
        this.state = {
            color: color || { r: 255, g: 255, b: 255, a: 1 },
            background: background || { r: 18, g: 25, b: 35, a: 1 },
            visible: false
        };
        this.timeout = false;
    }

    objectToString = rgba => {
        const { r, g, b, a } = rgba;
        return `rgba(${r},${g},${b},${a})`;
    };

    handleChange = value => {
        const { rgb } = value;
        this.setState({
            color: rgb
        });

        //防抖，减少重置画布次数
        this.timeout && clearTimeout(this.timeout);
        this.timeout = setTimeout(() => {
            this.props.onChange && this.props.onChange(rgb);
        }, 500);
    };

    //阻止事件向上层冒泡，点击调色板时，不会调用this.hide()
    stopPropagation = e => {
        e.stopPropagation();
        e.nativeEvent.stopImmediatePropagation();
    };

    hide = () => {
        this.setState({
            visible: false
        });
        //解除全局事件绑定
        document.removeEventListener('click', this.hide);
    };

    show = () => {
        this.setState({
            visible: true
        });
        //全局绑定隐藏事件，点击页面任何地方都将调用this.hide()，调用后解除全局事件绑定
        document.addEventListener('click', this.hide);
    };

    render() {
        //有icon参数，background才有效
        const { size, icon } = this.props;
        const { color, visible, background } = this.state;
        const currentColor = this.objectToString(color);
        const currentBackground = this.objectToString(background);
        return (
            // 当前AdColorInput组件设置z-index，防图层遮盖
            <div className={`color-box ${visible ? 'set-z-index' : ''}`}>
                <div
                    type="primary"
                    className="color-btn"
                    onClick={this.show}
                    style={{ background: currentBackground }}>
                    {icon ? (
                        <IconFont
                            type={`icon-${icon}`}
                            style={{ fontSize: size, color: currentColor }}
                        />
                    ) : (
                        <div
                            className="color-content"
                            style={{ background: currentColor }}></div>
                    )}
                </div>
                {/* 调色板 */}
                {visible && (
                    <div onClick={this.stopPropagation}>
                        <SketchPicker
                            className="color-palette"
                            color={currentColor}
                            onChange={this.handleChange}
                        />
                    </div>
                )}
            </div>
        );
    }
}

export default AdColorInput;
