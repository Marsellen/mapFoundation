import React from 'react';
import { Popover } from 'antd';
import SiderSwitch from './SiderSwitch';
import IconFont from '../IconFont';

class SiderItem extends React.Component {
    render() {
        const { record } = this.props;
        return (
            <div className={`flex flex-center ad-sider-item ${record.type}`}>
                <Popover
                    placement="rightTop"
                    title={record.label}
                    content={this._renderContent()}
                    trigger="hover"
                    getPopupContainer={triggerNode => triggerNode.parentNode}>
                    <IconFont
                        type={`icon-${record.icon}`}
                        className="ad-menu-icon"
                    />
                </Popover>
            </div>
        );
    }

    _renderContent() {
        const { record, content } = this.props;
        return (
            <div onMouseLeave={this.onMouseLeave}>
                <SiderSwitch siderType={record.type}>{content}</SiderSwitch>
            </div>
        );
    }

    // 解决popover action为hover时，多次点击浮动层触发onMouseLeave导致浮动层隐藏问题
    onMouseLeave = e => {
        if (e.relatedTarget === window) {
            e.stopPropagation();
        }
    };
}

export default SiderItem;
