import React from 'react';
import SiderSwitch from './siderSwitch';
import ToolIcon from 'src/component/common/toolIcon';

class SiderItem extends React.Component {
    render() {
        const { record } = this.props;
        const { id, label, icon, type, isPopover, hasTitle } = record;
        const visible = this.state && this.state[`visible${id}`];
        return (
            <div className={`ad-sider-item ${type}`}>
                {isPopover && (
                    <ToolIcon
                        icon={icon}
                        className="ad-menu-icon"
                        visible={visible}
                        popover={{
                            placement: 'rightTop',
                            title: hasTitle && label,
                            content: this._renderContent(),
                            trigger: 'hover',
                            visible: visible,
                            onVisibleChange: visible => this.handleChange(id, visible),
                            getPopupContainer: triggerNode => triggerNode.parentNode
                        }}
                    />
                )}
                {!isPopover && this._renderContent()}
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

    handleChange = (id, visible) => {
        this.setState({
            [`visible${id}`]: visible
        });
    };
}

export default SiderItem;
