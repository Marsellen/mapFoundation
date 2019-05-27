import React from 'react';
import SiderBar from './SiderBar';
import SiderItem from './SiderItem';

class Sider extends React.Component {
    state = {
        activeItem: null
    };

    render() {
        const { activeItem } = this.state;
        const { menus } = this.props;
        return (
            <div style={styles.sider}>
                <SiderBar>
                    {menus.map(record => (
                        <SiderItem
                            key={record.type}
                            record={record}
                            activeItem={activeItem}
                            content={this.props.children}
                        />
                    ))}
                </SiderBar>
            </div>
        );
    }
}

const styles = {
    sider: {
        height: 'calc(100vh - 40px)',
        display: 'flex'
    }
};

export default Sider;
