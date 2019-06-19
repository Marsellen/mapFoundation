import React from 'react';
import { Tooltip, Icon } from 'antd';
import 'less/components/tool-icon.less';

class ToolIcon extends React.Component {
    render() {
        const { title, icon, action, disabled } = this.props;
        return (
            <Tooltip placement="bottom" title={title}>
                <Icon
                    type={icon}
                    className={`ad-icon ${disabled && 'ad-disabled-icon'}`}
                    onClick={disabled ? () => {} : action}
                />
            </Tooltip>
        );
    }
}

export default ToolIcon;
