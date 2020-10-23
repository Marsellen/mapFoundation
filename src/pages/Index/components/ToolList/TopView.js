import React from 'react';
import { inject, observer } from 'mobx-react';
import ToolIcon from 'src/components/ToolIcon';

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
        // map.setView('U');
        // 按钮选中状态
        const { DataLayerStore, ToolCtrlStore, AttributeStore, RightMenuStore } = this.props;
        const { isTopView, editType } = DataLayerStore;
        let layer = DataLayerStore.getEditLayer() || {};

        if (!isTopView) {
            if (layer.layerName === 'AD_TrafficLight' || layer.layerName === 'AD_RS_Barrier') {
                DataLayerStore.activeEditor();
                ToolCtrlStore.updateByEditLayer();
            } else {
                ToolCtrlStore.updateByEditLayer(layer);
            }
            if (!['error_layer', 'choose_error_feature'].includes(editType)) {
                AttributeStore.hide();
            }
            RightMenuStore.hide();
        } else {
            if (
                DataLayerStore.editType == 'copy_line' ||
                DataLayerStore.editType == 'move_point_feature'
            ) {
                DataLayerStore.exitEdit();
            }
        }

        DataLayerStore.topViewMode(!isTopView);
    };
}

export default TopView;
