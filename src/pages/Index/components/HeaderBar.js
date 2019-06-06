import React from 'react';
import Avatar from './Avatar';
import ToolCtrl from './ToolCtrl';
import ToolList from './ToolList';

class HeaderBar extends React.Component {
    render() {
        return (
            <div className="flex">
                <ToolCtrl>{ToolList}</ToolCtrl>
                <Avatar />
            </div>
        );
    }
}

export default HeaderBar;
