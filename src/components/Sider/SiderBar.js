import React from 'react';

class SiderBar extends React.Component {
    render() {
        return <div style={styles.siderBar}>{this.props.children}</div>;
    }
}

const styles = {
    siderBar: {
        background: 'rgba(0, 0, 0, 0.85)',
        height: '100%',
        display: 'flex',
        flexDirection: 'column'
    }
};

export default SiderBar;
