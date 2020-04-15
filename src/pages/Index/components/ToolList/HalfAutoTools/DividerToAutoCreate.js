import React from 'react';
import ToolIcon from 'src/components/ToolIcon';
import { inject, observer } from 'mobx-react';
import { getLayerIDKey, getLayerByName } from 'src/utils/vectorUtils';
import { Icon, message } from 'antd';
import { autoCreateLineByLaneDivider } from 'src/utils/relCtrl/operateCtrl';
import AdMessage from 'src/components/AdMessage';
import { logDecorator } from 'src/utils/decorator';
import { DATA_LAYER_MAP } from 'src/config/DataLayerConfig';
import 'less/components/tool-icon.less';

const ACTION_MAP = {
    AD_Lane: '左右车道线生成中心线',
    AD_Road: '路段中参考线生成'
};
const ICON_MAP = {
    AD_Lane: 'zuoyouchedaoxianshengchengzhongxinxian',
    AD_Road: 'luduanzhongcankaoxian'
};
const TIPS_MAP = {
    AD_Lane: '选择一对左右车道线，左右车道线应方向一致',
    AD_Road: '选择一条车道线'
};

@inject('DataLayerStore')
@inject('AttributeStore')
@observer
class DividerToAutoCreate extends React.Component {
    state = {
        visible: false
    };

    componentDidMount() {
        const { DataLayerStore } = this.props;
        DataLayerStore.setAroundCallback((result, event) => {
            if (event.button !== 2) return false;
            this.createLineByDivider(result);
            this.setState({ visible: false });
        });
    }
    render() {
        const { DataLayerStore } = this.props;
        const { updateKey } = DataLayerStore;
        let visible =
            DataLayerStore.editType == 'new_around_line' && this.state.visible;
        let editLayer = DataLayerStore.getEditLayer();

        return (
            <div
                id="divider-to-auto-create"
                className="flex-1"
                onClick={this.action}
                key={updateKey}>
                <ToolIcon icon={editLayer && ICON_MAP[editLayer.layerName]} />
                <div>{editLayer && ACTION_MAP[editLayer.layerName]}</div>
                <AdMessage
                    visible={visible}
                    content={this.content(editLayer)}
                />
            </div>
        );
    }

    action = () => {
        const { DataLayerStore, AttributeStore } = this.props;
        if (DataLayerStore.editType == 'new_around_line') return;
        AttributeStore.hideRelFeatures();
        DataLayerStore.newAroundLine();
        this.setState({ visible: true });
    };

    @logDecorator({ operate: ACTION_MAP })
    async createLineByDivider(result) {
        const { DataLayerStore } = this.props;
        let editLayer = DataLayerStore.getEditLayer();
        let layerName = editLayer && editLayer.layerName;
        if (
            (result.length === 2 && layerName == 'AD_Lane') ||
            (result.length === 1 && layerName == 'AD_Road')
        ) {
            message.loading({
                content: '处理中...',
                key: 'new_around_line',
                duration: 0
            });
            let AD_LaneDivider = {};
            AD_LaneDivider.type = 'FeatureCollection';
            AD_LaneDivider.features = [];
            result.forEach(item => {
                AD_LaneDivider.features.push(item.data);
            });
            return await this.addLines({ AD_LaneDivider });
        } else {
            let layerNameCN = DATA_LAYER_MAP[layerName].label;
            let errorMessage = `${layerNameCN}生成失败`;
            message.error({
                content: errorMessage,
                key: 'new_around_line',
                duration: 3
            });
            throw new Error(errorMessage);
        }
    }

    async addLines(params) {
        const { DataLayerStore } = this.props;
        let editLayer = DataLayerStore.getEditLayer();
        let layerName = editLayer && editLayer.layerName;

        let historyLog = await autoCreateLineByLaneDivider(layerName, params);

        this.activeLine(layerName, historyLog);

        let layerNameCN = DATA_LAYER_MAP[layerName].label;
        message.success({
            content: `${layerNameCN}生成成功`,
            key: 'new_around_line',
            duration: 3
        });
        return historyLog;
    }

    // 显示新构建出的道路线并为选中状态
    activeLine = (layerLine, historyLog) => {
        let layerName = historyLog.features[1][0].layerName;
        let value =
            historyLog.features[1][0].data.properties[
                layerLine === 'AD_Lane' ? 'LANE_ID' : 'ROAD_ID'
            ];
        let IDKey = getLayerIDKey(layerName);
        let option = {
            key: IDKey,
            value: value
        };
        let layer = getLayerByName(layerName);
        let result = layer.getFeatureByOption(option);
        if (result) {
            let feature = result.properties;
            this.showAttributesModal(feature);
        } else {
            message.warning('所在图层与用户编号不匹配！', 3);
        }
    };

    showAttributesModal = async obj => {
        const { AttributeStore, DataLayerStore } = this.props;
        let editLayer = DataLayerStore.getEditLayer();
        let readonly =
            (editLayer && editLayer.layerName !== obj.layerName) || !editLayer;
        DataLayerStore.clearHighLightFeatures();
        DataLayerStore.clearPick();
        await AttributeStore.setModel(obj);
        DataLayerStore.setFeatureColor(obj, 'rgb(255,134,237)');
        AttributeStore.show(readonly);
    };

    content = editLayer => {
        const text = editLayer && TIPS_MAP[editLayer.layerName];
        return (
            <label>
                <Icon type="info-circle" /> {text}
            </label>
        );
    };
}

export default DividerToAutoCreate;
