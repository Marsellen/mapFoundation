import React from 'react';
import ToolIcon from 'src/components/ToolIcon';
import { inject, observer } from 'mobx-react';
import { getLayerIDKey, getLayerByName } from 'src/utils/vectorUtils';
import { Icon, message } from 'antd';
import { autoCreateLine } from 'src/utils/relCtrl/operateCtrl';
import AdMessage from 'src/components/AdMessage';
import editLog from 'src/models/editLog';
import 'less/components/tool-icon.less';

@inject('DataLayerStore')
@inject('AttributeStore')
@inject('OperateHistoryStore')
@observer
class DividerToAutoCreate extends React.Component {
    componentDidMount() {
        const { DataLayerStore } = this.props;
        DataLayerStore.setAroundCallback((result, event) => {
            let editLayer = DataLayerStore.getEditLayer();
            if (event.button !== 2) return false;
            this.getParams(editLayer && editLayer.layerName, result);
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
    getParams = (editLayer, res) => {
        let AD_LaneDivider = {};
        AD_LaneDivider.type = 'FeatureCollection';
        AD_LaneDivider.features = [];
        res.forEach(item => {
            AD_LaneDivider.features.push(item.data);
        });
        const { DataLayerStore } = this.props;
        if (res.length === 2) {
            //选择两条时
            if (editLayer == 'AD_Lane') {
                //车道中心线
                if (
                    res[0].layerName !== 'AD_LaneDivider' ||
                    res[1].layerName !== 'AD_LaneDivider'
                ) {
                    // 判断选中线要素是否为当前编辑图层需要的线要素
                    message.warning('应选择 2 条车道线，车道中心线生成失败', 3);
                    DataLayerStore.exitEdit();
                } else {
                    this.addLines({ AD_LaneDivider: AD_LaneDivider }, 'adLine');
                    DataLayerStore.exitEdit();
                }
            } else {
                message.warning('道路参考线生成失败', 3);
                DataLayerStore.exitEdit();
            }
        } else if (res.length === 1) {
            //选择一条时
            if (editLayer == 'AD_Road') {
                if (res[0].layerName !== 'AD_LaneDivider') {
                    message.warning('应选择车道线，道路参考线生成失败', 3);
                    DataLayerStore.exitEdit();
                } else {
                    this.addLines({ AD_LaneDivider: AD_LaneDivider }, 'adRoad');
                    DataLayerStore.exitEdit();
                }
            } else {
                message.warning(
                    `${
                        editLayer == 'AD_Road' ? '道路参考线' : '车道中心线'
                    }生成失败`,
                    3
                );
                DataLayerStore.exitEdit();
            }
        } else {
            //其他
            message.warning(
                `${
                    editLayer == 'AD_Lane' ? '车道中心线' : '道路参考线'
                }生成失败`,
                3
            );
            DataLayerStore.exitEdit();
        }
    };

    // 新建
    addLines = async (params, lines) => {
        const {
            DataLayerStore,
            AttributeStore,
            OperateHistoryStore
        } = this.props;
        let editLayer = DataLayerStore.getEditLayer();

        try {
            let historyLog = await autoCreateLine(
                editLayer && editLayer.layerName,
                params,
                lines
            );
            this.activeLine(editLayer && editLayer.layerName, historyLog);

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
            message.success(
                editLayer && editLayer.layerName === 'AD_Lane'
                    ? '成功生成车道中心线'
                    : '成功生成道路参考线',
                3
            );
        } catch (e) {
            console.log(e);
            message.warning('操作失败:' + e.msg, 3);
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

export default DividerToAutoCreate;