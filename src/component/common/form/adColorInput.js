import React from 'react';
import 'src/asset/less/ad-color-input.less';
import { SketchPicker } from 'react-color';
import IconFont from 'src/component/common/iconFont';

class AdColorInput extends React.Component {
    constructor(props) {
        super(props);
        let { color, background } = this.props;
        this.state = {
            color: color || 'rgba(255,255,255,1)',
            background: background || 'rgba(18,25,35,1)',
            visible: false
        };
        this.timeout = false;
    }

    handleChange = value => {
        const { rgb } = value;
        const { r, g, b, a } = rgb;
        const color = `rgba(${r},${g},${b},${a})`;

        this.setState({
            color
        });

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

    hide = () => {
        this.setState({
            visible: false
        });
        //解除全局事件绑定
        document.removeEventListener('click', this.hide);
    };

    show = e => {
        //获取当前点击的颜色按钮
        const currentColorBox = this.getCurrentColorBox(e);
        //获取当前点击的颜色按钮的scroll父元素
        const scrollWrap = this.getScrollWrap(e);
        //获取当前点击的颜色按钮的top、left、width、height
        const { offsetTop, offsetLeft, clientWidth, clientHeight } = currentColorBox;
        //获取当前点击的颜色按钮的scroll父元素的scrollTop、scrollLeft
        const { scrollTop = 0, scrollLeft = 0 } = scrollWrap;
        //计算调色板的top、left
        this.setState({
            visible: true,
            top: offsetTop + clientHeight - scrollTop,
            left: offsetLeft + clientWidth / 2 - scrollLeft
        });
        //全局绑定隐藏事件，点击页面任何地方都将调用this.hide()，调用后解除全局事件绑定
        document.addEventListener('click', this.hide);
    };

    //根据当前要素向上找指定className的父元素，最多找5层
    getCurrentColorBox = e => {
        let i = 0;
        let node = e.target;
        let isColorBtn = false;
        while (i < 5 && !isColorBtn) {
            isColorBtn =
                node &&
                node.className &&
                node.className.includes &&
                node.className.includes('color-box');
            if (!isColorBtn) {
                node = node && node.parentNode;
            }
            i = i + 1;
        }
        return node;
    };

    //根据当前要素向上找指定样式的父元素，最多找10层
    getScrollWrap = e => {
        let i = 0;
        let node = e.target;
        let isScrollEle = false;
        while (i < 20 && !isScrollEle) {
            isScrollEle = node.style.overflow;
            if (!isScrollEle) {
                node = node.parentNode;
            }
            i = i + 1;
        }
        return node;
    };

    render() {
        //有icon参数，background才有效
        const { size, icon, disableAlpha } = this.props;
        const { color, visible, background, top, left } = this.state;
        return (
            // 当前AdColorInput组件设置z-index，防图层遮盖
            <div className={`color-box ${visible ? 'set-z-index' : ''}`}>
                {icon ? (
                    <div
                        type="primary"
                        className="color-btn"
                        onClick={this.show}
                        style={{ background }}
                    >
                        <IconFont type={`icon-${icon}`} style={{ fontSize: size, color }} />
                    </div>
                ) : (
                    <div type="primary" className="color-btn" onClick={this.show}>
                        <div className="color-content" style={{ background: color }}></div>
                    </div>
                )}

                {/* 调色板 */}
                {visible && (
                    <div
                        onClick={this.stopPropagation}
                        className="color-palette"
                        style={{ top, left }}
                    >
                        <SketchPicker
                            color={color}
                            disableAlpha={disableAlpha}
                            onChange={this.handleChange}
                        />
                    </div>
                )}
            </div>
        );
    }
}

export default AdColorInput;
