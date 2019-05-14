import React from "react";

class SiderSwitch extends React.Component {
    render() {
        const { activeItem } = this.props;
        let type = activeItem && activeItem.type;
        return React.Children.map(this.props.children, child => {
            if (child.props.siderIndex != type) return;
            return child;
        });
    }
}

export default SiderSwitch;
