import React from 'react';
import { Icon, Tooltip } from 'antd';

class MultimediaView extends React.Component {
    state = {
        hide: false
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
            <div style={Styles.contentBox}>
                <Icon
                    type="double-right"
                    style={Styles.icon}
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
                    style={Styles.icon}
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

const Styles = {
    contentBox: {
        width: '25vw',
        minWidth: 300,
        position: 'relative'
    },
    icon: {
        position: 'absolute',
        right: 0,
        margin: 10,
        cursor: 'pointer',
        background: '#fff'
    }
};

export default MultimediaView;
