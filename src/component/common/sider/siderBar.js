import React from 'react';

class SiderBar extends React.Component {
    render() {
        return <div className="flex flex-column ad-sider-bar">{this.props.children}</div>;
    }
}

export default SiderBar;
