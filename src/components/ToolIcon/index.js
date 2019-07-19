import React from 'react';
import { Tooltip, Icon } from 'antd';
import 'less/components/tool-icon.less';
import IconFont from '../IconFont';

class ToolIcon extends React.Component {
    render() {
        const { title, icon, action, disabled } = this.props;
        return (
            <Tooltip placement="bottom" title={title}>
                <IconFont
                    type={`icon-${icon}`}
                    className={`ad-icon ${disabled && 'ad-disabled-icon'}`}
                    onClick={disabled ? () => {} : action}
                />
            </Tooltip>
        );
    }
}

export default ToolIcon;
