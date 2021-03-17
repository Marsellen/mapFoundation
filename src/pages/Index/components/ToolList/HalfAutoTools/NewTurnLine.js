import React from 'react';
import ToolIcon from 'src/components/ToolIcon';
import { inject, observer } from 'mobx-react';
import { getLayerIDKey, getLayerByName } from 'src/utils/vectorUtils';
import { Icon, message } from 'antd';
import { autoCreateLine, updateFeatures } from 'src/utils/relCtrl/operateCtrl';
import AdMessage from 'src/components/AdMessage';
import 'less/components/tool-icon.less';
import 'less/components/uturn-line.less';
import { DATA_LAYER_MAP } from 'src/config/DataLayerConfig';
import { logDecorator, editInputLimit, editOutputLimit, editLock } from 'src/utils/decorator';

const ACTION_MAP = {
    AD_Lane: '路口内转弯中心线生成',
    AD_Road: '路口内转弯参考线生成'
};

const TIPS_MAP = {
    AD_Lane: '先选择一条进入中心线，再选择一条退出中心线',
    AD_Road: '先选择一条进入参考线，再选择一条退出参考线'
};

@inject('DataLayerStore')
@inject('AttributeStore')
@observer
class NewTurnLine extends React.Component {
    state = { visible: false };

    componentDidMount() {
        const { DataLayerStore } = this.props;
        DataLayerStore.setTurnCallback((result, event) => {
            if (event.button !== 2) return false;
            this.handleData(result);
            this.setState({ visible: false });
        });
    }
    render() {
        const { DataLayerStore } = this.props;
        const { updateKey } = DataLayerStore;
        let visible = DataLayerStore.editType == 'new_turn_line' && this.state.visible; //转弯
        let editLayer = DataLayerStore.getAdEditLayer();
        let layerName = editLayer && editLayer.layerName;

        return (
            <div id="new-turn-line" key={updateKey} onClick={this.action} className="flex-1">
                <ToolIcon icon="zhuanwan" />
                <div>{ACTION_MAP[layerName]}</div>
                <AdMessage visible={visible} content={this.content()} />
            </div>
        );
    }

    @editInputLimit({ editType: 'new_turn_line' })
    @logDecorator({ operate: ACTION_MAP })
    async handleData(result) {
        try {
            const { DataLayerStore } = this.props;
            let editLayer = DataLayerStore.getAdEditLayer();
            let layerName = editLayer && editLayer.layerName;
            let layerNameCN = DATA_LAYER_MAP[layerName].label;
            if (result.length !== 2) {
                throw new Error(`操作错误：应选择 2 条${layerNameCN}`);
            }
            message.loading({
                content: '正在构建要素...',
                key: 'new_turn_line',
                duration: 0
            });
            let params = {};
            params[layerName] = {};
            params[layerName].type = 'FeatureCollection';
            params[layerName].features = [];
            result.forEach(item => {
                params[layerName].features.push(item.data);
            });
            //转弯
            let type = layerName == 'AD_Lane' ? 'crsLaneType' : 'crsRoadType';
            params[type] = 2;
            return await this.addLines(params);
        } catch (e) {
            message.error({
                content: e.message,
                key: 'new_turn_line',
                duration: 3
            });
            throw e;
        }
    }

    @editLock
    action = () => {
        const { DataLayerStore, AttributeStore } = this.props;
        if (DataLayerStore.editType == 'new_turn_line') return;
        DataLayerStore.newTurnLine();
        AttributeStore.hide();
        AttributeStore.hideRelFeatures();
        this.setState({ visible: true });
    };

    // 新建
    addLines = async params => {
        const { DataLayerStore } = this.props;
        let editLayer = DataLayerStore.getAdEditLayer();
        let layerName = editLayer && editLayer.layerName;
        let layerNameCN = DATA_LAYER_MAP[layerName].label;
        try {
            let historyLog = await autoCreateLine(layerName, params);
            await this.drawLine(historyLog.features[1], historyLog);
            this.activeLine(layerName, historyLog);
            message.success({
                content: `${layerNameCN}生成成功`,
                key: 'new_turn_line',
                duration: 3
            });
            return historyLog;
        } catch (e) {
            throw new Error(`${layerNameCN}生成失败：${e.message}`);
        }
    };

    @editOutputLimit()
    async drawLine(outputData, historyLog) {
        await updateFeatures(historyLog);
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
        let editLayer = DataLayerStore.getAdEditLayer();
        let readonly = (editLayer && editLayer.layerName !== obj.layerName) || !editLayer;
        DataLayerStore.clearHighLightFeatures();
        DataLayerStore.clearPick();
        await AttributeStore.setModel(obj);
        DataLayerStore.setFeatureColor(obj, 'rgb(255,134,237)');
        AttributeStore.show(readonly);
    };

    content = () => {
        const { DataLayerStore } = this.props;
        let editLayer = DataLayerStore.getAdEditLayer();
        let layerName = editLayer && editLayer.layerName;
        const text = TIPS_MAP[layerName];
        return (
            <label>
                <Icon type="info-circle" /> {text}
            </label>
        );
    };
}

export default NewTurnLine;
