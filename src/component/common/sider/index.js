import React from 'react';
import 'less/sider.less';
import SiderBar from './siderBar';
import SiderItem from './siderItem';
import VersionInfo from 'src/component/home/versionInfo';
import HelpList from 'src/component/home/helpList';

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
                <HelpList />
                <VersionInfo />
            </div>
        );
    }
}

export default Sider;
