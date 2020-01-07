import React from 'react';
import ToolIcon from 'src/components/ToolIcon';
import { message } from 'antd';
import { inject, observer } from 'mobx-react';
import AdMessage from 'src/components/AdMessage';

@inject('DataLayerStore')
@inject('AttributeStore')
@inject('TaskStore')
@observer
class RoadSet extends React.Component {
    componentDidMount() {
        const { DataLayerStore } = this.props;
        DataLayerStore.setRoadPlaneCallback(this.roadPlaneCallback);
    }
    render() {
        const { TaskStore, DataLayerStore } = this.props;
        const { activeTaskId } = TaskStore;
        let visible = DataLayerStore.editType == 'select_road_plane';

        return (
            <span className={visible ? 'ad-icon-active' : ''}>
                <ToolIcon
                    id="road-set-btn"
                    icon="lumianshezhi"
                    title="路面设置"
                    disabled={!activeTaskId}
                    action={this.action}
                />
                <AdMessage visible={visible} content={this.content()} />
            </span>
        );
    }

    action = () => {
        const { DataLayerStore, AttributeStore } = this.props;
        if (DataLayerStore.editType == 'select_road_plane') return;
        AttributeStore.hideRelFeatures();
        DataLayerStore.selectPointFromPC();
    };

    roadPlaneCallback = async (result, event) => {
        if (event.button !== 2) return false;
        const { DataLayerStore } = this.props;
        try {
            if (result && result[0].data) {
                const coordinates = result[0].data.geometry.coordinates;
                // 获取落点的点元素Z轴位置
                const pointZ = coordinates[2] - 0.05;
                window.map && window.map.setBaseElevation(pointZ);
            }
            DataLayerStore.exitEdit();
        } catch (e) {
            console.log(e);
            message.warning(e.message, 3);
            DataLayerStore.exitEdit();
        }
    };

    content = () => {
        return <label>左键选择路面点云位置，点击右键完成路面设置</label>;
    };
}

export default RoadSet;
