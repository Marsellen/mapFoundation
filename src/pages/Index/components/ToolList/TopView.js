import React from 'react';
import { inject, observer } from 'mobx-react';
import ToolIcon from 'src/components/ToolIcon';

//不支持俯视图模式的图层
const UNABLE_TOP_VIEW_LAYERS = ['AD_TrafficLight', 'AD_TrafficSign', 'AD_Pole', 'AD_RS_Barrier'];
//支持复制面要素的图层
const COPY_POLYGON_LAYERS = ['AD_Arrow', 'AD_LaneMark_Plg', 'AD_Text'];
//拾取错误工具
const CHOOSE_ERROR_TOOLS = ['error_layer', 'choose_error_feature'];
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
        const { DataLayerStore, ToolCtrlStore, AttributeStore, RightMenuStore } = this.props;
        const { isTopView, editType } = DataLayerStore;
        const layer = DataLayerStore.getEditLayer() || {};
        const { layerName } = layer;

        if (!isTopView) {
            if (
                layer.layerName === 'AD_TrafficLight' ||
                layer.layerName === 'AD_TrafficSign' ||
                layer.layerName === 'AD_RS_Barrier'
            ) {
                DataLayerStore.activeEditor();
                ToolCtrlStore.updateByEditLayer();
            } else {
                ToolCtrlStore.updateByEditLayer(layer);
            }
            if (!CHOOSE_ERROR_TOOLS.includes(editType)) {
                AttributeStore.hide();
            }
            RightMenuStore.hide();
        } else {
            //退出俯视图模式
            if (DataLayerStore.editType == 'move_point_feature') {
                DataLayerStore.exitEdit();
            }
            //复制状态时，有些面图层不退出编辑状态
            if (DataLayerStore.editType == 'copy_line') {
                if (!COPY_POLYGON_LAYERS.includes(layerName)) {
                    DataLayerStore.exitEdit();
                }
            }
        }

        DataLayerStore.topViewMode(!isTopView);
    };
}

export default TopView;
