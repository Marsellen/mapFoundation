import React from 'react';
import { Icon } from 'antd';
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

    _renderHidenView() {
        const { PictureShowStore } = this.props;
        const { visible } = PictureShowStore;
        return (
            <div
                id="muti-toggle-icon"
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

    toggle = () => {
        const { PictureShowStore } = this.props;
        const { visible, show, hide } = PictureShowStore;
        visible ? hide() : show();
    };
}

export default MultimediaView;
