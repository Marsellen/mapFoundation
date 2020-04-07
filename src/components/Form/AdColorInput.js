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

    show = e => {
        //获取当前点击的颜色按钮
        const currentColorBox = this.getCurrentColorBox(e);
        //获取当前点击的颜色按钮的scroll父元素
        const scrollWrap = this.getScrollWrap(e);
        //获取当前点击的颜色按钮的top、left、width、height
        const {
            offsetTop,
            offsetLeft,
            clientWidth,
            clientHeight
        } = currentColorBox;
        //获取当前点击的颜色按钮的scroll父元素的scrollTop、scrollLeft
        const { scrollTop, scrollLeft } = scrollWrap;
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
        while (i < 10 && !isScrollEle) {
            isScrollEle = node.scrollTop || node.scrollLeft;
            if (!isScrollEle) {
                node = node.parentNode;
            }
            i = i + 1;
        }
        return node;
    };

    render() {
        //有icon参数，background才有效
        const { size, icon } = this.props;
        const { color, visible, background, top, left } = this.state;
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
                    <div
                        onClick={this.stopPropagation}
                        className="color-palette"
                        style={{ top, left }}>
                        <SketchPicker
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
