import React from 'react';
import { Tooltip, Popover } from 'antd';
import 'less/components/tool-icon.less';
import IconFont from '../IconFont';

class ToolIcon extends React.Component {
    state = { tooltipVisible: false };

    componentWillReceiveProps() {
        //有popover，不显示tooltip
        const { popover, visible } = this.props;
        if (popover && !visible) {
            this.setState({
                tooltipVisible: false
            });
        }
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
        const {
            id,
            icon,
            action,
            disabled,
            visible,
            popover,
            tooltip,
            title,
            placement,
            focusColor = true,
            focusBg = false
        } = this.props;
        const { tooltipVisible } = this.state;
        const disabledClassName = disabled ? 'ad-icon-disabled' : '';
        const visibleClassName = visible ? 'ad-icon-visible' : '';
        const popoverClassName = popover && !title ? 'ad-icon-popover' : '';
        const colorClassName = focusColor ? `ad-icon-color` : '';
        const bgClassName = focusBg ? `ad-icon-bg` : '';

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
                    className={`
                        ad-icon
                        ${disabledClassName}
                        ${visibleClassName}
                        ${popoverClassName}
                        ${colorClassName}
                        ${bgClassName}
                    `}
                    onClick={disabled ? null : action}
                />
            </Tooltip>
        );
    };

    render() {
        const { popover, className = '' } = this.props;

        return (
            <span className={`ad-icon-wrap ${className}`}>
                {popover && <Popover {...popover}>{this._icon()}</Popover>}
                {!popover && this._icon()}
            </span>
        );
    }
}

export default ToolIcon;
