import React from 'react';
import HotKey from './hotKey';
import 'src/asset/less/hotkey.less';
import ToolIcon from 'src/component/common/toolIcon';
import FeedBack from './feedBack';

class HelpList extends React.Component {
    state = {
        hovered: false
    };

    hide = () => {
        this.setState({
            hovered: false
        });
    };

    handleClickChange = visible => {
        this.setState({
            hovered: visible
        });
    };

    render() {
        const { hovered } = this.state;
        return (
            <ToolIcon
                icon="bangzhu"
                className="ad-sider-bottom-item"
                visible={hovered}
                popover={{
                    title: '帮助中心',
                    placement: 'bottom',
                    visible: hovered,
                    overlayClassName: 'help-list',
                    onVisibleChange: this.handleClickChange,
                    content: this._renderContent(),
                    trigger: 'hover'
                }}
            />
        );
    }
    _renderContent() {
        return (
            <div onMouseLeave={this.hide}>
                <HotKey />
                <FeedBack />
            </div>
        );
    }
}

export default HelpList;
