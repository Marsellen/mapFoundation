import React from 'react';
import IconFont from 'src/components/IconFont';
import { message } from 'antd';
import { inject, observer } from 'mobx-react';
import AdMessage from 'src/components/AdMessage';

@inject('DataLayerStore')
@inject('AttributeStore')
@observer
class RoadSet extends React.Component {
    componentDidMount() {
        const { DataLayerStore } = this.props;
        DataLayerStore.setRoadPlaneCallback(this.roadPlaneCallback);
    }
    render() {
        const { DataLayerStore } = this.props;
        let visible = DataLayerStore.editType == 'select_road_plane';

        return (
            <div id="road-set-btn" className="flex-1" onClick={this.action}>
                <IconFont type="icon-lumianshezhi" />
                <div>路面设置</div>
                <AdMessage visible={visible} content={this.content()} />
            </div>
        );
    }

    action = () => {
        if (this.props.disabled) return;
        const { DataLayerStore, AttributeStore } = this.props;
        if (DataLayerStore.editType == 'select_road_plane') return;
        AttributeStore.hideRelFeatures();
        DataLayerStore.selectPointFromPC();
    };

    roadPlaneCallback = async (result, event) => {
        if (event.button !== 2) return false;
        const { DataLayerStore } = this.props;
        try {
            if (result && result[0] && result[0].data) {
                const coordinates = result[0].data.geometry.coordinates;
                // 获取落点的点元素Z轴位置
                const pointZ = coordinates[2] - 0.05;
                window.map && window.map.setBaseElevation(pointZ);
            }
            DataLayerStore.exitEdit();
        } catch (e) {
            console.log(e);
            message.warning('路面设置失败：' + e.message, 3);
            DataLayerStore.exitEdit();
        }
    };

    content = () => {
        return <label>左键选择路面点云位置，点击右键完成路面设置</label>;
    };
}

export default RoadSet;
