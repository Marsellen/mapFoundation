import React from 'react';
import { inject, observer } from 'mobx-react';
import RenderConfigWindow from './renderMode/renderConfigWindow';
import 'less/multimedia-modal.less';
import ZoomIn from './toolList/zoomIn';
import ZoomOut from './toolList/zoomOut';
import UnderView from './toolList/underView';
import TopView from './toolList/topView';
import SaveTimeView from './saveTimeView';
import ToolIcon from 'src/component/common/toolIcon';
import RelationModal from 'src/component/home/renderMode/relationModal';
import PointCloudLayer from 'src/component/home/pointCloudLayer';

const MENU_LIST = [
    // {
    //     id: 'picture-icon',
    //     title: '图片显示窗口',
    //     icon: 'zhaopianshezhi',
    //     storeName: 'PictureShowStore',
    //     content: <PictureShowView />
    // },
    {
        id: 'define-icon',
        title: '渲染设置窗口',
        icon: 'xuanranshezhi',
        storeName: 'TextStore',
        content: <RenderConfigWindow />
    },
    {
        id: 'point-cloud-icon',
        title: '点云图层窗口',
        icon: 'dianyuncengji',
        storeName: 'PointCloudStore',
        content: <PointCloudLayer />
    }
];
@inject('DefineModeStore')
@inject('RenderModeStore')
@inject('TextStore')
@inject('PictureShowStore')
@inject('PointCloudStore')
@observer
class MultimediaView extends React.Component {
    handleClick = storeName => {
        //点击'渲染设置窗口'，需要等数据准备好之后，才能打开
        if (storeName === 'TextStore') {
            const { vectorConfigMap } = this.props.DefineModeStore;
            if (!vectorConfigMap) return;
        }
        //关闭其它窗口，只显示当前点击窗口
        const { visible, show, hide } = this.props[storeName];
        MENU_LIST.forEach(item => {
            if (item.storeName === storeName) return;
            this.props[item.storeName].hide();
        });
        visible ? hide() : show();
    };

    render() {
        const { activeMode } = this.props.RenderModeStore;
        return (
            <div className="multimedia-container">
                {/* 遍历出页签 */}
                {MENU_LIST.map((item, index) => {
                    const { id, title, storeName, icon, content } = item;
                    const { visible } = this.props[storeName];
                    return (
                        <div key={id}>
                            <div
                                id={id}
                                title={title}
                                onClick={() => this.handleClick(storeName)}
                                style={{ top: 41 * index }}
                                className={`menu-list-icon ${visible ? 'on' : ''}`}
                            >
                                <ToolIcon icon={icon} />
                            </div>
                            {visible && content}
                        </div>
                    );
                })}

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
