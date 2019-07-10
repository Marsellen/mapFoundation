import React from 'react';
import { Icon, Tooltip } from 'antd';
import PictureShowView from './PictureShowView';

class MultimediaView extends React.Component {
    state = {
        hide: true
    };

    render() {
        return (
            <div
                className={`multimedia-container ${
                    !this.state.hide ? 'show' : 'hide'
                }`}>
                <div className="multimedia-header">
                    {this._renderHidenView()}
                </div>
                {!this.state.hide && this._renderOpenView()}
            </div>
        );
    }

    _renderOpenView() {
        return (
            <div className="multimedia-view-container">
                <PictureShowView />
            </div>
        );
    }

    _renderHidenView() {
        return (
            <div
                className="multimedia-menu"
                title="图片显示窗口"
                onClick={this.toggle}>
                <Icon
                    type={this.state.hide ? 'left' : 'right'}
                    className="muti-toggle-icon"
                />
            </div>
        );
    }

    toggle = () => {
        this.setState({
            hide: !this.state.hide
        });
    };
}

export default MultimediaView;
