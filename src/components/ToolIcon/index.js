import React from 'react';
import { Tooltip, Icon } from 'antd';

class ToolIcon extends React.Component {
    render() {
        const { title, icon, action } = this.props;
        return (
            <Tooltip placement="bottom" title={title}>
                <Icon type={icon} style={Styles.icon} onClick={action} />
            </Tooltip>
        );
    }
}

const Styles = {
    icon: {
        color: '#dedede',
        fontSize: 16,
        margin: 10
    }
};

export default ToolIcon;
