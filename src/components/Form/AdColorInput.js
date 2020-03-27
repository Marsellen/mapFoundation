import React from 'react';
import 'src/assets/less/components/ad-color-input.less';
import { SketchPicker } from 'react-color';
import IconFont from 'src/components/IconFont';

class AdColorInput extends React.Component {
    state = {
        color: this.props.color || '#fff',
        visible: false
    };

    handleChange = value => {
        const { rgb } = value;
        const { r, g, b, a } = rgb;
        const color = `rgba(${r},${g},${b},${a})`;
        this.setState({
            color
        });
        this.props.onChange(color);
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
        const { size, icon } = this.props;
        const { color, visible } = this.state;
        return (
            // 当前AdColorInput组件设置z-index，防图层遮盖
            <div className={`color-box ${visible ? 'set-z-index' : ''}`}>
                <div type="primary" className="color-btn" onClick={this.show}>
                    <IconFont
                        type={`icon-${icon}`}
                        style={{ fontSize: size, color: color }}
                    />
                </div>
                {/* 调色板 */}
                {visible && (
                    <div onClick={this.stopPropagation}>
                        <SketchPicker
                            className="color-palette"
                            color={color}
                            onChange={this.handleChange}
                        />
                    </div>
                )}
            </div>
        );
    }
}

export default AdColorInput;
