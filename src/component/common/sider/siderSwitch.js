import React from 'react';

class SiderSwitch extends React.Component {
    render() {
        const { siderType } = this.props;
        return React.Children.map(this.props.children, child => {
            if (child.props.siderIndex != siderType) return;
            return child;
        });
    }
}

export default SiderSwitch;
