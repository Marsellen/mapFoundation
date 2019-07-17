import React from 'react';
import { Icon, Tooltip } from 'antd';
import { inject, observer } from 'mobx-react';
import PictureShowView from './PictureShowView';
import 'less/components/multimedia-modal.less';

@inject('PictureShowStore')
@observer
class MultimediaView extends React.Component {
    render() {
        const { PictureShowStore } = this.props;
        const { visible } = PictureShowStore;
        return (
            <div
                className={`multimedia-container ${visible ? 'show' : 'hide'}`}>
                <div className="multimedia-header">
                    {this._renderHidenView()}
                    {visible && this._renderNextOrPreviousView()}
                </div>
                {visible && this._renderOpenView()}
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

    _renderNextOrPreviousView() {
        return (
            <div className="multimedia-fun">
                <div
                    className="multimedia-i next-dot"
                    title="下一个轨迹点"
                    onClick={this.next}>
                    <Icon type="caret-down" />
                </div>
                <div
                    className="multimedia-i previou-dot"
                    title="上一个轨迹点"
                    onClick={this.previous}>
                    <Icon type="caret-up" />
                </div>
            </div>
        );
    }

    _renderHidenView() {
        const { PictureShowStore } = this.props;
        const { visible } = PictureShowStore;
        return (
            <div
                className="multimedia-menu"
                title="图片显示窗口"
                onClick={this.toggle}>
                <Icon
                    type={visible ? 'right' : 'left'}
                    className="muti-toggle-icon"
                />
            </div>
        );
    }

    next = () => {
        const { PictureShowStore } = this.props;
        let idx = PictureShowStore.getIdx() + 1;
        this.jumpToPoint(idx);
    };

    previous = () => {
        const { PictureShowStore } = this.props;
        let idx = PictureShowStore.getIdx() - 1;
        this.jumpToPoint(idx);
    };

    jumpToPoint = idx => {
        const { PictureShowStore } = this.props;
        debugger;
        window.traceLayer.getPoint(idx, item => {
            window.traceLayer.unselect();
            window.traceLayer.select(idx);
            window.map.look({
                x: item.properties.X,
                y: item.properties.Y,
                z: item.properties.Z
            });
            PictureShowStore.getPicData(item);
        });
    };

    toggle = () => {
        const { PictureShowStore } = this.props;
        const { visible, show, hide } = PictureShowStore;
        visible ? hide() : show();
    };
}

export default MultimediaView;
