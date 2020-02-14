import React from 'react';
import 'less/components/sider.less';
import SiderBar from './SiderBar';
import SiderItem from './SiderItem';
import VersionInfo from 'src/pages/Index/components/VersionInfo';
import HelpList from 'src/pages/Index/components/HelpList';
import RenderMode from 'src/pages/Index/components/RenderMode/RenderMode';

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
                <RenderMode />
                <HelpList />
                <VersionInfo />
            </div>
        );
    }
}

export default Sider;
