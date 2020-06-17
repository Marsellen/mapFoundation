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
                    action={this.action}
                />
            </div>
        ) : null;
    }

    action = () => {
        // map.setView('U');
        // 按钮选中状态
        const {
            DataLayerStore,
            ToolCtrlStore,
            AttributeStore,
            RightMenuStore
        } = this.props;
        const { isTopView, editType } = DataLayerStore;
        let layer = DataLayerStore.getEditLayer() || {};

        if (!isTopView) {
            if (
                layer.layerName === 'AD_TrafficLight' ||
                layer.layerName === 'AD_TrafficSign' ||
                layer.layerName === 'AD_Pole' ||
                layer.layerName === 'AD_RS_Barrier'
            ) {
                DataLayerStore.activeEditor();
                ToolCtrlStore.updateByEditLayer();
            } else {
                ToolCtrlStore.updateByEditLayer(layer);
            }
            editType != 'error_layer' && AttributeStore.hide();
            RightMenuStore.hide();
        } else {
            if (
                DataLayerStore.editType == 'copyLine' ||
                DataLayerStore.editType == 'movePointFeature'
            ) {
                DataLayerStore.exitEdit();
            }
        }

        DataLayerStore.topViewMode(!isTopView);
    };
}

export default TopView;
