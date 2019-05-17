import React from 'react';

class SiderContent extends React.Component {
    render() {
        const { showContent, activeItem } = this.props;
        let title = activeItem && activeItem.label;
        return (
            <div
                style={{
                    ...styles.siderContent,
                    display: showContent ? 'flex' : 'none'
                }}>
                <div style={styles.contentTitle}>{title}</div>
                <div style={styles.contentView}>{this.props.children}</div>
            </div>
        );
    }
}

const styles = {
    siderContent: {
        height: '100%',
        width: '200px',
        flexDirection: 'column'
    },
    contentTitle: {
        lineHeight: '32px',
        background: 'rgba(0, 0, 0, 0.75)',
        height: 32,
        color: '#ddd',
        fontSize: 12,
        paddingLeft: 16
    },
    contentView: {
        flexGrow: 1,
        background: 'rgba(0, 0, 0, 0.65)'
    }
};

export default SiderContent;
