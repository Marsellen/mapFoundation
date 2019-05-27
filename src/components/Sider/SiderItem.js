import React from 'react';
import { Icon, Popover } from 'antd';
import SiderSwitch from './SiderSwitch';

class SiderItem extends React.Component {
    render() {
        const { record, activeItem } = this.props;
        let type = activeItem && activeItem.type;
        let fillColor = type == record.type ? '#fff' : '#bbb';
        return (
            <div style={styles.siderItem}>
                <Popover
                    placement="rightTop"
                    title={record.label}
                    content={this._renderContent()}
                    trigger="hover">
                    <Icon
                        type={record.icon}
                        style={{ ...styles.menuIcon, color: fillColor }}
                    />
                </Popover>
            </div>
        );
    }

    _renderContent() {
        const { record, content } = this.props;
        return <SiderSwitch siderType={record.type}>{content}</SiderSwitch>;
    }
}

const styles = {
    siderItem: {
        width: 50,
        height: 45,
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center'
    },
    menuIcon: {
        cursor: 'pointer',
        fontSize: 20,
        ':hover': {
            color: '#fff'
        }
    }
};

export default SiderItem;
