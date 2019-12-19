import React from 'react';
import ToolIcon from 'src/components/ToolIcon';
import { inject, observer } from 'mobx-react';
import { getLayerIDKey, getLayerByName } from 'src/utils/vectorUtils';
import { Modal, Icon, message } from 'antd';
import { autoCreateLine } from 'src/utils/relCtrl/operateCtrl';
import AdMessage from 'src/components/AdMessage';
import editLog from 'src/models/editLog';
import 'less/components/tool-icon.less';
import 'less/components/uturn-line.less';
import AdInputNumber from 'src/components/Form/AdInputNumber';
import AdEmitter from 'src/models/event';
import { isManbuildTask } from 'src/utils/taskUtils';

@inject('DataLayerStore')
@inject('AttributeStore')
@inject('OperateHistoryStore')
@inject('TaskStore')
@observer
class HalfAutoCreate extends React.Component {
    constructor() {
        super();
        this.state = {
            visibleModal: false,
            num: 8.0,
            params: {}
        };
    }
    componentDidMount() {
        const { DataLayerStore } = this.props;
        DataLayerStore.setStraightCallback((result, event) => {
            let editLayer = DataLayerStore.getEditLayer();
            if (event.button !== 2) return false;
            this.getParams(editLayer, result);
        });
    }
    render() {
        const reg = new RegExp(
            '^[1-9]\\d{0,9}(\\.\\d{1,2})?$|^0(\\.\\d{1,2})?$'
        );
        const { visibleModal, num } = this.state;
        const { DataLayerStore } = this.props;
        let visible = DataLayerStore.editType == 'new_straight_line'; //直行
        let visibleTurn = DataLayerStore.editType == 'new_turn_line'; //转弯
        let visibleUTurn = DataLayerStore.editType == 'new_Uturn_line'; //掉头
        let editLayer = DataLayerStore.getEditLayer();

        return (
            <span>
                {!this.disEditable() && this.renderTools()}
                <AdMessage
                    visible={visible || visibleTurn || visibleUTurn}
                    content={this.content(editLayer && editLayer.layerName)}
                />
                <Modal
                    className="set-length"
                    title="跨路口延伸长度设置"
                    visible={visibleModal}
                    width={255}
                    onOk={this.handleOk}
                    onCancel={this.handleCancel}
                    maskClosable={false}
                    keyboard={false}
                    okText="确定"
                    cancelText="取消">
                    <div className="set-length-number">
                        <AdInputNumber
                            width="66%"
                            type="number"
                            value={num}
                            step={0.01}
                            onChange={this.inputChange}
                        />
                    </div>
                    <span className="unit">m</span>
                    <p id="checkNumber">
                        {num < 0.01
                            ? '延伸长度必须大于0'
                            : !reg.test(num)
                            ? ' 请输入数字，如有小数请精确到小数点后两位'
                            : ''}
                    </p>
                </Modal>
            </span>
        );
    }

    renderTools = () => {
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
                        action={() => this.action(1)}
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
                        action={() => this.action(2)}
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
                        action={() => this.action(3)}
                    />
                </span>
            </span>
        );
    };

    disEditable = () => {
        const { TaskStore } = this.props;

        return !isManbuildTask(TaskStore.activeTask);
    };

    // 获得接口传参
    getParams = (editLayer, res = []) => {
        const { DataLayerStore } = this.props;
        let layerName = editLayer && editLayer.layerName;
        const params = {};
        // 选中两条的情况
        if (res.length === 2) {
            // 判断选中线要素是否为当前编辑图层需要的线要素
            if (
                res[0].layerName !== layerName ||
                res[1].layerName !== layerName
            ) {
                message.warning(
                    `应选${
                        layerName == 'AD_Lane' ? '车道中心线' : '道路参考线'
                    },${
                        layerName == 'AD_Lane' ? '车道中心线' : '道路参考线'
                    }生成失败`,
                    3
                );
                DataLayerStore.exitEdit();
            } else {
                //参数
                params[layerName] = {};
                params[layerName].type = 'FeatureCollection';
                params[layerName].features = [];
                res.forEach(item => {
                    params[layerName].features.push(item.data);
                });
                if (DataLayerStore.editType == 'new_straight_line') {
                    //直行
                    params[
                        layerName == 'AD_Lane' ? 'crsLaneType' : 'crsRoadType'
                    ] = 1;
                    this.addLines(params);
                } else if (DataLayerStore.editType == 'new_turn_line') {
                    //转弯
                    params[
                        layerName == 'AD_Lane' ? 'crsLaneType' : 'crsRoadType'
                    ] = 2;
                    this.addLines(params);
                } else if (DataLayerStore.editType == 'new_Uturn_line') {
                    //掉头
                    params[
                        layerName == 'AD_Lane' ? 'crsLaneType' : 'crsRoadType'
                    ] = 3;
                    this.setState({
                        visibleModal: true,
                        params: params
                    });
                }
            }
        } else if (res.length === 1) {
            //选中一条的情况
            if (res[0].layerName !== layerName) {
                message.warning(
                    `应选择 2 条${
                        layerName == 'AD_Lane' ? '车道中心线' : '道路参考线'
                    },${
                        layerName == 'AD_Lane' ? '车道中心线' : '道路参考线'
                    }生成失败`,
                    3
                );
                DataLayerStore.exitEdit();
            }
        } else {
            message.warning(
                `${
                    layerName == 'AD_Lane' ? '车道中心线' : '道路参考线'
                }生成失败`,
                3
            );
            DataLayerStore.exitEdit();
        }
        return params;
    };

    action = type => {
        if (this.disEditable()) return;
        const { DataLayerStore, AttributeStore } = this.props;
        if (type === 1) {
            if (DataLayerStore.editType == 'new_straight_line') return;
            DataLayerStore.newStraightLine();
        } else if (type === 2) {
            if (DataLayerStore.editType == 'new_turn_line') return;
            DataLayerStore.newTurnLine();
        } else if (type === 3) {
            if (DataLayerStore.editType == 'new_Uturn_line') return;
            DataLayerStore.newUTurnLine();
            DataLayerStore.registerEscEvent(() => {
                this.setState({
                    visibleModal: false,
                    num: 8.0
                });
            });
        }
        AttributeStore.hideRelFeatures();
    };

    handleOk = () => {
        const reg = new RegExp('^[0-9]+.?[0-9]*$');
        const { num, params } = this.state;
        if (num < 0.01 || !reg.test(num)) return false;
        params.extDistance = num;
        this.setState({
            visibleModal: false
        });
        this.addLines(params);
    };

    handleCancel = () => {
        const { DataLayerStore } = this.props;
        this.setState({
            visibleModal: false,
            num: 8.0
        });
        DataLayerStore.exitEdit();
    };

    inputChange = val => {
        const reg = new RegExp(
            '^[1-9]\\d{0,9}(\\.\\d{1,2})?$|^0(\\.\\d{1,2})?$'
        );
        const checkNumber = document.getElementById('checkNumber');
        if (val < 0.01 || !reg.test(val)) {
            checkNumber.style.display = 'block';
        } else {
            checkNumber.style.display = 'none';
        }
        this.setState({
            num: val
        });
    };

    // 新建
    addLines = async params => {
        const {
            DataLayerStore,
            AttributeStore,
            OperateHistoryStore
        } = this.props;
        let editLayer = DataLayerStore.getEditLayer();
        let historyLog = await autoCreateLine(
            editLayer && editLayer.layerName,
            params
        );
        let newFeatures = historyLog && historyLog.features[1];
        DataLayerStore.exitEdit();
        try {
            if (newFeatures && newFeatures[0].data.geometry) {
                this.activeLine(editLayer && editLayer.layerName, historyLog);
            } else {
                return;
            }

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
                editLayer && editLayer.layerName === 'AD_Lane'
                    ? '成功生成车道中心线'
                    : '成功生成道路参考线',
                3
            );
        } catch (e) {
            console.log(e);
            e
                ? message.warning('操作失败:' + e.message, 3)
                : message.warning('操作失败，请求失败', 3);
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
        const text =
            editLayer == 'AD_Lane'
                ? '先选择一条进入中心线，再选择一条退出中心线'
                : '先选择一条进入参考线，再选择一条退出参考线';
        return (
            <label>
                <Icon type="info-circle" /> {text}
            </label>
        );
    };
}

export default HalfAutoCreate;
