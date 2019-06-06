import React from 'react';
import { Icon, Tooltip } from 'antd';

class MultimediaView extends React.Component {
    state = {
        hide: true
    };

    render() {
        return (
            <div>
                {!this.state.hide && this._renderOpenView()}
                {this.state.hide && this._renderHidenView()}
            </div>
        );
    }

    _renderOpenView() {
        return (
            <div className="multimedia-view-container">
                <Icon
                    type="double-right"
                    className="muti-toggle-icon"
                    onClick={this.toggle}
                />
            </div>
        );
    }

    _renderHidenView() {
        return (
            <Tooltip placement="left" title="图片显示窗口">
                <Icon
                    type="double-left"
                    className="muti-toggle-icon"
                    onClick={this.toggle}
                />
            </Tooltip>
        );
    }

    toggle = () => {
        this.setState({
            hide: !this.state.hide
        });
    };
}

export default MultimediaView;
