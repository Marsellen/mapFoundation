import React from 'react';
import { Tooltip } from 'antd';
import 'less/components/tool-icon.less';
import IconFont from '../IconFont';

class ToolIcon extends React.Component {
    render() {
        const { title, icon, action, disabled, id, className } = this.props;
        return (
            <Tooltip placement="bottom" title={title}>
                <IconFont
                    id={id}
                    type={`icon-${icon}`}
                    className={`ad-icon ${className} ${disabled &&
                        'ad-disabled-icon'}`}
                    onClick={disabled ? () => {} : action}
                />
            </Tooltip>
        );
    }
}

export default ToolIcon;
