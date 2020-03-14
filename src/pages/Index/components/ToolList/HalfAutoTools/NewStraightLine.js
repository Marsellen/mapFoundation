import React from 'react';
import ToolIcon from 'src/components/ToolIcon';
import { inject, observer } from 'mobx-react';
import { getLayerIDKey, getLayerByName } from 'src/utils/vectorUtils';
import { Icon, message } from 'antd';
import { autoCreateLine } from 'src/utils/relCtrl/operateCtrl';
import AdMessage from 'src/components/AdMessage';
import editLog from 'src/models/editLog';
import 'less/components/tool-icon.less';
import 'less/components/uturn-line.less';
import AdEmitter from 'src/models/event';
import { isManbuildTask } from 'src/utils/taskUtils';

@inject('RenderModeStore')
@inject('DataLayerStore')
@inject('AttributeStore')
@inject('OperateHistoryStore')
@inject('TaskStore')
@observer
class NewStraightLine extends React.Component {
    componentDidMount() {
        const { DataLayerStore } = this.props;
        DataLayerStore.setStraightCallback((result, event) => {
            if (event.button !== 2) return false;
            this.handleData(result);
        });
    }

    render() {
        const { DataLayerStore } = this.props;
        const { updateKey } = DataLayerStore;
        let visible = DataLayerStore.editType == 'new_straight_line'; //直行
        let editLayer = DataLayerStore.getEditLayer();
        let layerName = editLayer && editLayer.layerName;

        return (
            <div
                id="new-straight-line"
                key={updateKey}
                onClick={this.action}
                className="flex-1"
            >
                <ToolIcon icon="zhixing1" />
                <div>
                    {layerName == 'AD_Lane'
                        ? '路口内直行中心线生成'
                        : '路口内直行参考线生成'}
                </div>
                <AdMessage visible={visible} content={this.content()} />
            </div>
        );
    }

    disEditable = () => {
        const { TaskStore } = this.props;

        return !isManbuildTask(TaskStore.activeTask);
    };

    handleData = res => {
        const { DataLayerStore } = this.props;
        let editLayer = DataLayerStore.getEditLayer();
        let layerName = editLayer && editLayer.layerName;
        let layerNameCN = layerName == 'AD_Lane' ? '车道中心线' : '道路参考线';
        if (
            res.length !== 2 ||
            res[0].layerName !== layerName ||
            res[1].layerName !== layerName
        ) {
            message.warning(`操作错误：应选择 2 条${layerNameCN}`, 3);
            DataLayerStore.exitEdit();
            return;
        }
        let params = {};
        params[layerName] = {};
        params[layerName].type = 'FeatureCollection';
        params[layerName].features = [];
        res.forEach(item => {
            params[layerName].features.push(item.data);
        });
        //直行
        params[layerName == 'AD_Lane' ? 'crsLaneType' : 'crsRoadType'] = 1;
        this.addLines(params);
    };

    action = () => {
        if (this.disEditable()) return;
        const { DataLayerStore, AttributeStore } = this.props;
        if (DataLayerStore.editType == 'new_straight_line') return;
        DataLayerStore.newStraightLine();
        AttributeStore.hideRelFeatures();
    };

    // 新建
    addLines = async params => {
        const {
            DataLayerStore,
            AttributeStore,
            OperateHistoryStore,
            RenderModeStore
        } = this.props;
        let editLayer = DataLayerStore.getEditLayer();
        let layerName = editLayer && editLayer.layerName;
        try {
            let historyLog = await autoCreateLine(layerName, params);
            DataLayerStore.exitEdit();
            if (!historyLog) return;
            this.activeLine(layerName, historyLog);

            // 日志与历史
            let history = {
                type: 'updateFeatureRels',
                data: historyLog
            };
            let log = {
                operateHistory: history,
                action: 'autoCreateLine',
                result: 'success'
            };
            OperateHistoryStore.add(history);
            editLog.store.add(log);
            // 刷新属性列表
            AdEmitter.emit('fetchViewAttributeData');
            message.success(
                layerName === 'AD_Lane'
                    ? '成功生成车道中心线'
                    : '成功生成道路参考线',
                3
            );
            //关联关系查看模式下，更新要素显示效果
            RenderModeStore.updateRels(history);
        } catch (e) {
            const msg = layerName === 'AD_Lane' ? '车道中心线' : '道路参考线';
            message.warning(`${msg}生成失败：` + e.message, 3);
            let history = {
                params
            };
            let log = {
                operateHistory: history,
                action: 'autoCreateLine',
                result: 'fail',
                failReason: e.message
            };
            editLog.store.add(log);
            DataLayerStore.exitEdit();
        }
        AttributeStore.hideRelFeatures();
    };

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
        if (layer.getFeatureByOption(option)) {
            const { RenderModeStore } = this.props;
            const { activeMode, getRelFeatures } = RenderModeStore;
            let feature = layer.getFeatureByOption(option).properties;
            this.showAttributesModal(feature);
            //关联关系模式，选中效果
            activeMode === 'relation' && getRelFeatures(layerName, value);
        } else {
            message.warning('所在图层与用户编号不匹配！', 3);
        }
    };

    showAttributesModal = async obj => {
        const { AttributeStore, DataLayerStore } = this.props;
        let editLayer = DataLayerStore.getEditLayer();
        let layerName = editLayer && editLayer.layerName;
        let readonly = layerName !== obj.layerName || !editLayer;
        DataLayerStore.clearHighLightFeatures();
        DataLayerStore.clearPick();
        await AttributeStore.setModel(obj);
        DataLayerStore.setFeatureColor(obj, 'rgb(255,134,237)');
        AttributeStore.show(readonly);
    };

    content = () => {
        const { DataLayerStore } = this.props;
        let editLayer = DataLayerStore.getEditLayer();
        let layerName = editLayer && editLayer.layerName;
        const text =
            layerName == 'AD_Lane'
                ? '先选择一条进入中心线，再选择一条退出中心线'
                : '先选择一条进入参考线，再选择一条退出参考线';
        return (
            <label>
                <Icon type="info-circle" /> {text}
            </label>
        );
    };
}

export default NewStraightLine;
