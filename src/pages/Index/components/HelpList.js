import React from 'react';
import { Popover, Tooltip } from 'antd';
import HotKey from './HotKey';
import IconFont from 'src/components/IconFont';
import 'src/assets/less/components/hotkey.less';

class HelpList extends React.Component {
    state = {
        clicked: false,
        hovered: false
    };

    handleHoverChange = visible => {
        if (!this.state.clicked) {
            this.setState({
                hovered: visible
            });
        }
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
            <div className="help">
                <Popover
                    title="帮助中心"
                    placement="rightBottom"
                    visible={this.state.clicked}
                    onVisibleChange={this.handleClickChange}
                    content={this._renderContent()}
                    trigger="click"
                    arrowPointAtCenter>
                    <Tooltip
                        title="帮助"
                        visible={this.state.hovered}
                        onVisibleChange={this.handleHoverChange}>
                        <IconFont type="icon-bangzhu" />
                    </Tooltip>
                </Popover>
            </div>
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
