import React from 'react'
import { Tooltip, Icon } from 'antd'

class SiderItem extends React.Component {
    render() {
        const {record, clickAction, activeItem} = this.props
        let type = activeItem && activeItem.type
        let fillColor = type == record.type ? '#fff' : '#bbb'
        return (
            <div style={styles.siderItem}>
                <Tooltip placement="right" title={record.label}>
                    <Icon type={record.icon} style={{...styles.menuIcon, color: fillColor}} onClick={() => {clickAction(record)}} />
                </Tooltip>
            </div>
        )
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
        fontSize: 20
    }
}

export default SiderItem