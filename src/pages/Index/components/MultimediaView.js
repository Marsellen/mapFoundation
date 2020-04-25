import React from 'react';
import { Icon } from 'antd';
import { inject, observer } from 'mobx-react';
import PictureShowView from './PictureShowView';
import RenderConfigWindow from './RenderMode/RenderConfigWindow';
import 'less/components/multimedia-modal.less';
import ZoomIn from './ToolList/ZoomIn';
import ZoomOut from './ToolList/ZoomOut';
import UnderView from './ToolList/UnderView';
import TopView from './ToolList/TopView';
import SaveTimeView from './SaveTimeView';
import ToolIcon from 'src/components/ToolIcon';
import RelationModal from 'src/pages/Index/components/RenderMode/RelationModal';

@inject('RenderModeStore')
@inject('TextStore')
@inject('PictureShowStore')
@observer
class MultimediaView extends React.Component {
    togglePicture = () => {
        const { PictureShowStore, TextStore } = this.props;
        const { visible, show, hide } = PictureShowStore;
        TextStore.hide();
        visible ? hide() : show();
    };

    toggleDefine = () => {
        const { PictureShowStore, TextStore } = this.props;
        const { visible, show, hide } = TextStore;
        PictureShowStore.hide();
        visible ? hide() : show();
    };

    render() {
        const { PictureShowStore, RenderModeStore, TextStore } = this.props;
        const { activeMode } = RenderModeStore;
        const { visible: pictureVisible } = PictureShowStore;
        const { visible: DefineVisible } = TextStore;

        return (
            <div className="multimedia-container">
                <div
                    id="muti-toggle-icon"
                    title="图片显示窗口"
                    onClick={this.togglePicture}
                    className={`picture-icon ${pictureVisible ? 'on' : ''}`}>
                    <ToolIcon icon="zhaopianshezhi" />
                </div>
                <div
                    title="渲染设置窗口"
                    onClick={this.toggleDefine}
                    className={`define-icon ${DefineVisible ? 'on' : ''}`}>
                    <ToolIcon icon="xuanranshezhi" />
                </div>

                {pictureVisible && <PictureShowView />}
                {DefineVisible && <RenderConfigWindow />}

                {/* 关联关系专题图 */}
                {activeMode === 'relation' && <RelationModal />}

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
