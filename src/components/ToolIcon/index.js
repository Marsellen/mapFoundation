import React from 'react';
import { Tooltip, Icon } from 'antd';

class ToolIcon extends React.Component {
    render() {
        const { title, icon, action } = this.props;
        return (
            <Tooltip placement="bottom" title={title}>
                <Icon type={icon} className="ad-icon" onClick={action} />
            </Tooltip>
        );
    }
}

export default ToolIcon;
