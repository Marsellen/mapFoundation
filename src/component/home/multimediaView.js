import React from 'react';
import { inject, observer } from 'mobx-react';
import 'less/multimedia-modal.less';
import ZoomIn from './toolList/zoomIn';
import ZoomOut from './toolList/zoomOut';
import UnderView from './toolList/underView';
import TopView from './toolList/topView';
import SaveTimeView from './saveTimeView';
import RelModeTheme from 'src/component/home/renderMode/relModeTheme';
import UpdStatModeTheme from 'src/component/home/renderMode/updStatModeTheme';
import PCView from './toolList/pointCloudView';

@inject('DefineModeStore')
@inject('RenderModeStore')
@inject('TextStore')
@inject('PictureShowStore')
@inject('PointCloudStore')
@inject('BufferStore')
@observer
class MultimediaView extends React.Component {
    render() {
        const { activeMode } = this.props.RenderModeStore;
        return (
            <div className="multimedia-container">
                {/* 关联关系专题图 */}
                {activeMode === 'relation' && <RelModeTheme />}
                {activeMode === 'update' && <UpdStatModeTheme />}

                <div className="right-footer">
                    {/* 俯视图、放大、缩小、还原 */}
                    <div className="set-compass">
                        <PCView key="PC_VIEW" />
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
