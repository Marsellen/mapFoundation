import React from 'react';
import { inject, observer } from 'mobx-react';
import { Menu } from 'antd';
import 'src/asset/less/setting.less';
import SettingForm from 'src/component/setting/settingForm';
import logo from 'src/asset/img/logo.png';
import Avatar from 'src/component/home/avatar';
import { SETTING_MENUS } from 'src/config/settingConfig';

@inject('SettingStore')
@observer
class Setting extends React.Component {
    componentWillMount = () => {
        const { SettingStore } = this.props;
        SettingStore.queryConfig();
    };

    handleClick = e => {
        const { SettingStore } = this.props;
        SettingStore.setActiveKey(e.key);
    };

    renderMenu = menus => {
        return menus.map(item => {
            const { key, title, type, children } = item;
            switch (type) {
                case 'Item':
                    return <Menu.Item key={key}>{title}</Menu.Item>;
                case 'SubMenu':
                    return (
                        <Menu.SubMenu key={key} title={title}>
                            {this.renderMenu(children)}
                        </Menu.SubMenu>
                    );
                case 'ItemGroup':
                    return <Menu.ItemGroup key={key} title={title}></Menu.ItemGroup>;
                default:
                    return;
            }
        });
    };

    render() {
        const { SettingStore } = this.props;
        return (
            <div className="setting-wrap">
                <header className="header-wrap">
                    <img className="logo" src={logo} alt="logo" />
                    <Avatar />
                </header>

                <div className="content-wrap">
                    <Menu
                        mode="inline"
                        className="menu-wrap"
                        onClick={this.handleClick}
                        defaultOpenKeys={['VECTOR_CONFIG', 'TEXT_CONFIG']}
                    >
                        {this.renderMenu(SETTING_MENUS)}
                    </Menu>
                    {SettingStore.activeKey && <SettingForm key={SettingStore.updateKey} />}
                </div>
            </div>
        );
    }
}

export default Setting;
