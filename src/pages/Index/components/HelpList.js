import React from 'react';
import HotKey from './HotKey';
import 'src/assets/less/components/hotkey.less';
import ToolIcon from 'src/components/ToolIcon';

class HelpList extends React.Component {
    state = {
        clicked: false,
        hovered: false
    };

    hide = () => {
        this.setState({
            clicked: false,
            hovered: false
        });
    };

    handleClickChange = visible => {
        this.setState({
            clicked: visible,
            hovered: false
        });
    };

    render() {
        return (
            <ToolIcon
                icon="bangzhu"
                className="ad-sider-bottom-item"
                visible={this.state.clicked}
                popover={{
                    title: '帮助中心',
                    placement: 'rightBottom',
                    visible: this.state.clicked,
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
            <div onClick={this.hide}>
                <HotKey />
            </div>
        );
    }
}

export default HelpList;
