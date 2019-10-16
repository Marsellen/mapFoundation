import React from 'react';
import SiderBar from './SiderBar';
import SiderItem from './SiderItem';
import 'less/components/sider.less';
import VersionInfo from '../../pages/Index/components/VersionInfo';
import HotKey from '../../pages/Index/components/HotKey';

class Sider extends React.Component {
    render() {
        const { menus } = this.props;
        return (
            <div className="flex ad-sider">
                <SiderBar>
                    {menus.map(record => (
                        <SiderItem
                            key={record.type}
                            record={record}
                            content={this.props.children}
                        />
                    ))}
                </SiderBar>
                <HotKey />
                <VersionInfo />
            </div>
        );
    }
}

export default Sider;
