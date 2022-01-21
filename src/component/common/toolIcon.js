import React from 'react';
import { Tooltip, Popover } from 'antd';
import 'less/tool-icon.less';
import IconFont from 'src/component/common/iconFont';

class ToolIcon extends React.Component {
    state = { tooltipVisible: false };

    static getDerivedStateFromProps(nextProps, prevState) {
        const { tooltipVisible } = prevState;
        const { popover, visible } = nextProps;
        //图标有气泡弹窗，气泡弹窗显示时，隐藏文字提示
        if (popover && visible && tooltipVisible) {
            return { tooltipVisible: false };
        }
        return null;
    }

    handleHoverChange = tooltipVisible => {
        //有popover，不显示tooltip
        const { popover, visible } = this.props;
        if (popover) {
            this.setState({
                tooltipVisible: visible ? false : tooltipVisible
            });
        } else {
            this.setState({
                tooltipVisible
            });
        }
    };

    _icon = () => {
        const { id, icon, action, disabled, tooltip, title, placement } = this.props;
        const { tooltipVisible } = this.state;

        return (
            <Tooltip
                placement={placement ? placement : 'bottom'}
                title={title}
                visible={tooltipVisible}
                onVisibleChange={this.handleHoverChange}
                {...tooltip}
            >
                <IconFont
                    id={id}
                    type={`icon-${icon}`}
                    className="ad-icon"
                    onClick={disabled ? null : action}
                />
            </Tooltip>
        );
    };

    render() {
        const {
            disabled,
            visible,
            popover,
            title,
            className = '',
            focusClassName,
            focusColor = true
        } = this.props;
        const disabledClassName = disabled ? 'ad-icon-disabled' : '';
        const popoverClassName = popover && !title ? 'ad-icon-popover' : '';
        const colorClassName = visible && focusColor ? `ad-icon-color` : '';
        const activeClassName = visible ? focusClassName : '';

        return (
            <span
                className={`ad-icon-wrap ${className} ${disabledClassName} ${popoverClassName} ${colorClassName} ${activeClassName}`}
            >
                {popover && <Popover {...popover}>{this._icon()}</Popover>}
                {!popover && this._icon()}
            </span>
        );
    }
}

export default ToolIcon;
