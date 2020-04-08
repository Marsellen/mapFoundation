import React from 'react';
import { Icon } from 'antd';
import { inject, observer } from 'mobx-react';
import PictureShowView from './PictureShowView';
import DefineRenderMode from './RenderMode/DefineRenderMode';
import 'less/components/multimedia-modal.less';
import ZoomIn from './ToolList/ZoomIn';
import ZoomOut from './ToolList/ZoomOut';
import UnderView from './ToolList/UnderView';
import TopView from './ToolList/TopView';
import SaveTimeView from './SaveTimeView';
import ToolIcon from 'src/components/ToolIcon';

@inject('RenderModeStore')
@inject('DefineModeStore')
@inject('PictureShowStore')
@observer
class MultimediaView extends React.Component {
    togglePicture = () => {
        const { PictureShowStore, DefineModeStore } = this.props;
        const { visible, show, hide } = PictureShowStore;
        DefineModeStore.hide();
        visible ? hide() : show();
    };

    toggleDefine = () => {
        const { PictureShowStore, DefineModeStore } = this.props;
        const { visible, show, hide } = DefineModeStore;
        PictureShowStore.hide();
        visible ? hide() : show();
    };

    render() {
        let { PictureShowStore, DefineModeStore, RenderModeStore } = this.props;
        let { visible: pictureVisible } = PictureShowStore;
        let { visible: DefineVisible } = DefineModeStore;
        let { activeMode } = RenderModeStore;
        let isDefineMode = activeMode === 'define';

        return (
            <div
                className={`multimedia-container ${
                    isDefineMode ? '' : 'inner'
                }`}>
                <div
                    id="muti-toggle-icon"
                    title="图片显示窗口"
                    onClick={this.togglePicture}
                    className={`picture-icon ${pictureVisible ? 'on' : ''}`}>
                    {!isDefineMode && (
                        <Icon type={pictureVisible ? 'right' : 'left'} />
                    )}
                    {isDefineMode && <ToolIcon icon="zhaopianshezhi" />}
                </div>

                {isDefineMode && (
                    <div
                        title="符号设置"
                        onClick={this.toggleDefine}
                        className={`define-icon ${DefineVisible ? 'on' : ''}`}>
                        <ToolIcon icon="xuanranshezhi" />
                    </div>
                )}

                {pictureVisible && <PictureShowView />}
                {isDefineMode && DefineVisible && <DefineRenderMode />}

                <div className="right-footer">
                    {/* 俯视图、放大、缩小、还原 */}
                    <div className="set-compass">
                        <TopView key="TOP_VIEW" />
                        <ZoomOut key="ZOOM_OUT" />
                        <ZoomIn key="ZOOM_IN" />
                        <UnderView key="UNDER_VIEW" />
                    </div>
                    {/* 保存时间 */}
                    <SaveTimeView />
                </div>
            </div>
        );
    }
}

export default MultimediaView;
