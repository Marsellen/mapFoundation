import React from 'react';
import { inject, observer } from 'mobx-react';
import ToolIcon from 'src/components/ToolIcon';
import { TOP_VIEW_DISABLED_LAYERS } from 'src/config/DataLayerConfig';
import { getLayersByNames } from 'src/utils/vectorUtils';

@inject('TaskStore')
@inject('DataLayerStore')
@inject('ToolCtrlStore')
@inject('AttributeStore')
@inject('RightMenuStore')
@observer
class TopView extends React.Component {
    render() {
        const { TaskStore, DataLayerStore } = this.props;
        const { activeTaskId } = TaskStore;
        const { isTopView } = DataLayerStore;
        return activeTaskId ? (
            <div>
                <ToolIcon
                    id="top-view-btn"
                    icon="fushitu"
                    title="俯视图模式"
                    placement="left"
                    className="ad-icon-topview"
                    visible={isTopView}
                    disabled={DataLayerStore.editType == 'posture_adjust'}
                    action={this.action}
                />
            </div>
        ) : null;
    }

    action = () => {
        if (!window.map) return;
        const {
            ToolCtrlStore,
            RightMenuStore,
            DataLayerStore: {
                isTopView,
                topViewMode,
                isUnionBreak,
                activeEditor,
                getEditLayerName,
                enableRegionSelect,
                disableRegionSelect
            }
        } = this.props;
        if (!isTopView) {
            //进入俯视图模式
            window.map.setCurrentView('U');
            window.map.disableRotate();
            //不支持俯视图模式的图层，退出编辑图层，退出编辑状态，隐藏右键菜单
            const layerName = getEditLayerName();
            if (TOP_VIEW_DISABLED_LAYERS.includes(layerName)) {
                activeEditor();
                ToolCtrlStore.updateByEditLayer();
                RightMenuStore.hide();
            }
            //如果是联合打断状态，设置可框选车道线和隔离带、护栏
            //如果不是联合打断状态，设置可框选当前编辑图层
            if (isUnionBreak) {
                const layerNames = ['AD_LaneDivider', 'AD_RS_Barrier'];
                const layers = getLayersByNames(layerNames);
                enableRegionSelect(layers);
            } else {
                enableRegionSelect();
            }
        } else {
            //退出俯视图模式
            window.map.enableRotate();
            disableRegionSelect();
        }
        topViewMode(!isTopView);
    };
}

export default TopView;
