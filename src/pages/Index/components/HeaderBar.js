import React from 'react';
import Avatar from './Avatar';
import ToolCtrl from './ToolCtrl';
import ToolList from './ToolList';

class HeaderBar extends React.Component {
    render() {
        return (
            <div style={Styles.container}>
                <ToolCtrl>{ToolList}</ToolCtrl>
                <Avatar />
            </div>
        );
    }
}

const Styles = {
    container: {
        display: 'flex'
    }
};

export default HeaderBar;
