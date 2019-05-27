import React from 'react';

class ToolCtrl extends React.Component {
    render() {
        return <div style={Styles.container}>{this.props.children}</div>;
    }
}

const Styles = {
    container: {
        flexGrow: 1
    }
}

export default ToolCtrl;
