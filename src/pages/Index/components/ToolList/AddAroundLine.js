import React from 'react';
import ToolIcon from 'src/components/ToolIcon';
import { inject, observer } from 'mobx-react';
import { getLayerIDKey, getLayerByName } from 'src/utils/vectorUtils';
import { Modal, Icon, InputNumber, message } from 'antd';
import { getNewLine } from 'src/utils/relCtrl/operateCtrl';
import AdMessage from 'src/components/AdMessage';
import editLog from 'src/models/editLog';
import 'less/components/tool-icon.less';
import 'less/components/uturn-line.less';

@inject('DataLayerStore')
@inject('AttributeStore')
@inject('OperateHistoryStore')
@observer
class AddAroundLine extends React.Component {
    constructor() {
        super();
        this.state = {
            visibleModal: false,
            num: 8.0
        };
        this.params = {};
        this.result = [];
    }
    componentDidMount() {
        const { DataLayerStore } = this.props;
        let editLayer = DataLayerStore.getEditLayer();
        const active = editLayer && editLayer.layerName == 'AD_Lane';

        DataLayerStore.setStraightCallback((result, event) => {
            if (event.button !== 2) return false;
            if (result.length !== 2) {
                message.warning(
                    active
                        ? '应选择 2 条道路中心线，车道中心线生成失败'
                        : '应选择 2 条道路参考线，道路参考线生成失败',
                    3
                );
                DataLayerStore.exitEdit();
            } else {
                if (
                    this.params.crsLaneType === 3 ||
                    this.params.crsRoadType === 3
                ) {
                    this.setState({
                        visibleModal: true
                    });
                    this.result = result;
                } else {
                    if (
                        active &&
                        result[0].data.properties.LANE_ID >
                            result[1].data.properties.LANE_ID
                    ) {
                        //判断顺序
                        message.warning('两条车道中心线顺序错误', 3);
                        DataLayerStore.exitEdit();
                        return false;
                    } else if (
                        !active &&
                        result[0].data.properties.ROAD_ID >
                            result[1].data.properties.ROAD_ID
                    ) {
                        //判断顺序
                        message.warning('两条道路参考线顺序错误', 3);
                        DataLayerStore.exitEdit();
                        return false;
                    } else {
                        this.getParams(active, result);
                        DataLayerStore.exitEdit();
                        this.addLines(result);
                    }
                }
            }
        });
    }
    render() {
        const reg = new RegExp('^[0-9]+.?[0-9]*$');
        const { visibleModal, num } = this.state;
        const { DataLayerStore } = this.props;
        const { updateKey } = DataLayerStore;
        let visible = DataLayerStore.editType == 'new_straight_line'; //直行
        let visibleTurn = DataLayerStore.editType == 'new_turn_line'; //转弯
        let visibleUTurn = DataLayerStore.editType == 'new_Uturn_line'; //掉头
        let editLayer = DataLayerStore.getEditLayer();

        return (
            <span>
                <span
                    className={visible ? 'ad-icon-active' : ''}
                    key={updateKey}>
                    <ToolIcon
                        icon="zhixing"
                        title={
                            editLayer && editLayer.layerName == 'AD_Lane'
                                ? '路口内直行中心线生成'
                                : '路口内直行参考线生成'
                        }
                        action={() => this.action(editLayer, 1)}
                    />
                </span>
                <span className={visibleTurn ? 'ad-icon-active' : ''}>
                    <ToolIcon
                        icon="zhuanwan"
                        title={
                            editLayer && editLayer.layerName == 'AD_Lane'
                                ? '路口内转弯中心线生成'
                                : '路口内转弯参考线生成'
                        }
                        action={() => this.action(editLayer, 2)}
                    />
                </span>
                <span className={visibleUTurn ? 'ad-icon-active' : ''}>
                    <ToolIcon
                        icon="diaotou"
                        title={
                            editLayer && editLayer.layerName == 'AD_Lane'
                                ? '掉头中心线生成'
                                : '掉头参考线生成'
                        }
                        action={() => this.action(editLayer, 3)}
                    />
                </span>
                <AdMessage
                    visible={visible || visibleTurn || visibleUTurn}
                    content={this.content(editLayer)}
                />
                <Modal
                    className="set-length"
                    title="跨路口延伸长度设置"
                    visible={visibleModal}
                    width={255}
                    onOk={this.handleOk}
                    onCancel={this.handleCancel}
                    maskClosable={false}
                    okText="确定"
                    cancelText="取消">
                    <InputNumber
                        value={num}
                        step={0.01}
                        onChange={this.inputChange}
                    />
                    <span className="unit">m</span>
                    <p id="checkNumber">
                        {num < 0
                            ? '延伸长度必须大于0'
                            : !reg.test(num)
                            ? '请输入数字'
                            : ''}
                    </p>
                </Modal>
            </span>
        );
    }

    // 获得接口传参
    getParams = (active, result) => {
        const { DataLayerStore } = this.props;
        if (active) {
            this.params.AD_Lane = {};
            this.params.AD_Lane.type = 'FeatureCollection';
            this.params.AD_Lane.features = [];
            result.forEach(item => {
                this.params.AD_Lane.features.push(item.data);
            });
            if (result[0].layerName !== 'AD_Lane') {
                message.warning('应选择车道中心线，车道中心线生成失败', 3);
                DataLayerStore.exitEdit();
            }
        } else {
            this.params.AD_Road = {};
            this.params.AD_Road.type = 'FeatureCollection';
            this.params.AD_Road.features = [];
            result.forEach(item => {
                this.params.AD_Road.features.push(item.data);
            });
            if (result[0].layerName !== 'AD_Road') {
                message.warning('应选择道路参考线，道路参考线生成失败', 3);
                DataLayerStore.exitEdit();
            }
        }

        return this.params;
    };

    action = (editLayer, type) => {
        const { DataLayerStore, AttributeStore } = this.props;
        if (editLayer && editLayer.layerName == 'AD_Lane') {
            this.params.crsLaneType = type;
        } else {
            this.params.crsRoadType = type;
        }
        if (type === 1) {
            if (DataLayerStore.editType == 'new_straight_line') return;
            DataLayerStore.newStraightLine();
        } else if (type === 2) {
            if (DataLayerStore.editType == 'new_turn_line') return;
            DataLayerStore.newTurnLine();
        } else if (type === 3) {
            if (DataLayerStore.editType == 'new_Uturn_line') return;
            DataLayerStore.newUTurnLine();
        }
        AttributeStore.hideRelFeatures();
    };

    handleOk = () => {
        const { DataLayerStore } = this.props;
        const reg = new RegExp('^[0-9]+.?[0-9]*$');
        let editLayer = DataLayerStore.getEditLayer();
        const active = editLayer && editLayer.layerName == 'AD_Lane';
        const { num } = this.state;
        this.params.extDistance = num;
        if (num < 0 || !reg.test(num)) return false;
        this.setState({
            visibleModal: false
        });

        this.getParams(active, this.result);
        DataLayerStore.exitEdit();
        this.addLines(this.result);
    };

    handleCancel = () => {
        const { DataLayerStore } = this.props;
        this.setState({
            visibleModal: false
        });
        DataLayerStore.exitEdit();
    };

    inputChange = val => {
        const reg = new RegExp('^[0-9]+.?[0-9]*$');
        const checkNumber = document.getElementById('checkNumber');
        if (val < 0 || !reg.test(val)) {
            checkNumber.style.display = 'block';
        } else {
            checkNumber.style.display = 'none';
        }
        this.setState({
            num: val
        });
    };

    // 新建
    addLines = async result => {
        const {
            DataLayerStore,
            AttributeStore,
            OperateHistoryStore
        } = this.props;
        let editLayer = DataLayerStore.getEditLayer();
        const layerLine = editLayer && editLayer.layerName == 'AD_Lane';

        try {
            let historyLog = await getNewLine(layerLine, this.params);
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
            message.warning('操作失败:' + e.message, 3);
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
                ? '先选择一条进入中心线，再选择一条退出中心线'
                : '先选择一条进入参考线，再选择一条退出参考线';
        return (
            <label>
                <Icon type="info-circle" /> {text}
            </label>
        );
    };
}

export default AddAroundLine;
