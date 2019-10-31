import React from 'react';
import ToolIcon from 'src/components/ToolIcon';
import { inject, observer } from 'mobx-react';
import { getLayerIDKey, getLayerByName } from 'src/utils/vectorUtils';
import { Icon, message } from 'antd';
import { getNewLine } from 'src/utils/relCtrl/operateCtrl';
import AdMessage from 'src/components/AdMessage';
import editLog from 'src/models/editLog';
import 'less/components/tool-icon.less';

@inject('DataLayerStore')
@inject('AttributeStore')
@inject('OperateHistoryStore')
@observer
class AddAdLine extends React.Component {
    componentDidMount() {
        const { DataLayerStore } = this.props;
        let editLayer = DataLayerStore.getEditLayer();
        DataLayerStore.setAroundCallback((result, event) => {
            if (event.button !== 2) return false;
            if (editLayer && editLayer.layerName == 'AD_Lane') {
                //车道中心线
                if (result.length !== 2) {
                    message.warning('应选择 2 条车道线，车道中心线生成失败', 3);
                    DataLayerStore.exitEdit();
                } else if (result[0].layerName !== 'AD_LaneDivider') {
                    message.warning('应选择车道中心线，车道中心线生成失败', 3);
                    DataLayerStore.exitEdit();
                } else {
                    if (
                        result[0].data.properties.LDIV_ID >
                        result[1].data.properties.LDIV_ID
                    ) {
                        //判断顺序
                        message.warning('两条车道线顺序错误', 3);
                        DataLayerStore.exitEdit();
                        return false;
                    }
                    this.addLines(result, this.getParams(result), 'adLine');
                    DataLayerStore.exitEdit();
                }
            } else {
                //道路参考线
                if (result.length !== 1) {
                    message.warning('应选择 1 条车道线，道路参考线生成失败', 3);
                    DataLayerStore.exitEdit();
                } else if (result[0].layerName !== 'AD_LaneDivider') {
                    message.warning('应选择道路参考线，道路参考线生成失败', 3);
                    DataLayerStore.exitEdit();
                } else {
                    this.addLines(result, this.getParams(result), 'adRoad');
                    DataLayerStore.exitEdit();
                }
            }
        });
    }
    render() {
        const { DataLayerStore } = this.props;
        const { updateKey } = DataLayerStore;
        let visible = DataLayerStore.editType == 'new_around_line';
        let editLayer = DataLayerStore.getEditLayer();

        return (
            <span className={visible ? 'ad-icon-active' : ''} key={updateKey}>
                <ToolIcon
                    icon={
                        editLayer && editLayer.layerName == 'AD_Lane'
                            ? 'zuoyouchedaoxianshengchengzhongxinxian'
                            : 'luduanzhongcankaoxianshengcheng'
                    }
                    title={
                        editLayer && editLayer.layerName == 'AD_Lane'
                            ? '左右车道线生成中心线'
                            : '路段中参考线生成'
                    }
                    action={this.action}
                />
                <AdMessage
                    visible={visible}
                    content={this.content(editLayer)}
                />
            </span>
        );
    }

    action = () => {
        const { DataLayerStore, AttributeStore } = this.props;
        if (DataLayerStore.editType == 'new_around_line') return;
        AttributeStore.hideRelFeatures();
        DataLayerStore.newAroundLine();
    };

    // 获得接口传参
    getParams = result => {
        let AD_LaneDivider = {};
        AD_LaneDivider.type = 'FeatureCollection';
        AD_LaneDivider.features = [];
        result.forEach(item => {
            AD_LaneDivider.features.push(item.data);
        });
        const params = {
            AD_LaneDivider: AD_LaneDivider
        };
        return params;
    };

    // 新建
    addLines = async (result, params, lines) => {
        const {
            DataLayerStore,
            AttributeStore,
            OperateHistoryStore
        } = this.props;
        let editLayer = DataLayerStore.getEditLayer();
        const layerLine = editLayer && editLayer.layerName == 'AD_Lane';

        try {
            let historyLog = await getNewLine(layerLine, params, lines);
            this.activeLine(layerLine, historyLog);

            // 日志与历史
            let history = {
                type: 'updateFeatureRels',
                data: historyLog
            };
            let log = {
                operateHistory: history,
                action: 'getNewLine',
                result: 'success'
            };
            OperateHistoryStore.add(history);
            editLog.store.add(log);
            message.success(
                layerLine ? '成功生成车道中心线' : '成功生成道路参考线',
                3
            );
        } catch (e) {
            console.log(e);
            message.warning('操作失败:' + e.msg, 3);
            let history = {
                result
            };
            let log = {
                operateHistory: history,
                action: 'getNewLine',
                result: 'fail',
                failReason: e.message
            };
            editLog.store.add(log);
        }
        DataLayerStore.exitEdit();
        AttributeStore.hideRelFeatures();
    };

    // 显示新构建出的道路线并为选中状态
    activeLine = (layerLine, historyLog) => {
        let layerName = historyLog.features[1][0].layerName;
        let value = layerLine
            ? historyLog.features[1][0].data.properties.LANE_ID
            : historyLog.features[1][0].data.properties.ROAD_ID;
        let IDKey = getLayerIDKey(layerName);
        let option = {
            key: IDKey,
            value: value
        };
        let layer = getLayerByName(layerName);
        if (layer.getFeatureByOption(option)) {
            let feature = layer.getFeatureByOption(option).properties;
            let extent = map.getExtent(feature.data.geometry);
            map.setView('U');
            map.setExtent(extent);
            this.showAttributesModal(feature);
        } else {
            message.warning('所在图层与用户编号不匹配！', 3);
        }
    };

    showAttributesModal = obj => {
        const { AttributeStore, DataLayerStore } = this.props;
        let editLayer = DataLayerStore.getEditLayer();
        let readonly =
            !editLayer || (editLayer && editLayer.layerName !== obj.layerName);
        AttributeStore.setModel(obj);
        DataLayerStore.clearHighLightFeatures();
        DataLayerStore.setFeatureColor(obj, 0xcc00ff);
        AttributeStore.show(readonly);
    };

    content = editLayer => {
        const text =
            editLayer && editLayer.layerName == 'AD_Lane'
                ? '选择一对左右车道线，左右车道线应方向一致'
                : '选择一条车道线';
        return (
            <label>
                <Icon type="info-circle" /> {text}
            </label>
        );
    };
}

export default AddAdLine;
