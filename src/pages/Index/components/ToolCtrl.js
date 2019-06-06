import React from 'react';

class ToolCtrl extends React.Component {
    render() {
        return <div className="flex-1">{this.props.children}</div>;
    }
}

export default ToolCtrl;
