import React from 'react';
import SiderBar from './SiderBar';
import SiderItem from './SiderItem';
import 'less/components/sider.less';
import ViewAttribute from '../../pages/Index/components/ToolList/ViewAttribute';

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
                    <ViewAttribute />
                </SiderBar>
            </div>
        );
    }
}

export default Sider;
