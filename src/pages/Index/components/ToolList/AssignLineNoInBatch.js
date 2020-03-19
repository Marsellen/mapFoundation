import React from 'react';
import { Modal, Select, message } from 'antd';
import ToolIcon from 'src/components/ToolIcon';
import { inject, observer } from 'mobx-react';
import editLog from 'src/models/editLog';
import AdEmitter from 'src/models/event';
import { batchAssignment } from 'src/utils/relCtrl/operateCtrl';
import { DATA_LAYER_MAP } from 'src/config/DataLayerConfig';
import 'less/components/tool-icon.less';
import 'less/components/batch-tools.less';

const { Option } = Select;

const key = 'batchAssign';
@inject('DataLayerStore')
@inject('TaskStore')
@inject('OperateHistoryStore')
@observer
class AssignLineNoInBatch extends React.Component {
    constructor() {
        super();
        this.state = {
            startNumber: '0',
            holdShiftKey: false
        };
    }
    componentDidMount() {
        const { DataLayerStore } = this.props;
        DataLayerStore.setNewFixLineCallback(this.newFixLineCallback);
    }
    render() {
        const { DataLayerStore } = this.props;
        let visible = DataLayerStore.editType == 'assign_line_batch';
        return (
            <div
                id="assign-line-batch-btn"
                className="flex-1"
                onClick={this.action}>
                <ToolIcon icon="dimianjuxing" />
                <div>批量赋车道分组编号</div>
                <Modal
                    className="batch-assign"
                    wrapClassName="batch-assign-modal-wrap"
                    title="批量赋车道分组编号"
                    visible={visible}
                    footer={null}
                    mask={false}
                    closable={false}
                    zIndex={999}
                    width={250}
                    maskClosable={false}>
                    {this._renderModal(visible)}
                </Modal>
            </div>
        );
    }

    _renderModal = visible => {
        const { DataLayerStore } = this.props;
        const editLayer = DataLayerStore.getEditLayer();
        let layerName = editLayer && editLayer.layerName;

        return visible ? (
            <span>
                <div>
                    赋值图层：
                    <span style={{ marginLeft: '10px' }}>
                        {DATA_LAYER_MAP[layerName].label}
                    </span>
                </div>
                <div>
                    起始车道编号:
                    {
                        <Select
                            defaultValue="0"
                            style={{ width: 70, marginLeft: '10px' }}
                            onChange={this.handleChange}>
                            <Option value="0">0</Option>
                            <Option value="-1">-1</Option>
                            <Option value="-2">-2</Option>
                        </Select>
                    }
                </div>
            </span>
        ) : null;
    };

    action = () => {
        const { DataLayerStore } = this.props;
        if (DataLayerStore.editType == 'assign_line_batch') return;
        this.addEventListener();
        DataLayerStore.newFixLine();
        message.warning({
            content: '选择需赋值线要素，然后按shift进入下一步',
            key,
            duration: 0
        });
    };

    handleChange = val => {
        this.setState({
            startNumber: val
        });
    };

    addEventListener = () => {
        const { DataLayerStore } = this.props;
        document.addEventListener('keydown', event => {
            if (!event.shiftKey) {
                event.preventDefault();
                event.stopPropagation();
                return false;
            }
            this.lineCheck(); //条件判断
        });
    };

    lineCheck = () => {
        const { DataLayerStore } = this.props;
        let layerName = DataLayerStore.getEditLayer().layerName;
        const { result } = this.state;
        for (let i = 0; i < result.length; i++) {
            if (result[i].layerName !== layerName) {
                message.error('所选要素不符合要求');
                return;
            }
        }

        if (result.length === 0) {
            message.error('请选择要素');
            return false;
        }
        message.warning({
            content:
                '两点绘制一条线与所选数据相交，线方向与车道编号增长趋势一致，右键完成赋值',
            key,
            duration: 0
        });
        this.setState({
            holdShiftKey: true
        });
        DataLayerStore.getNewFixLine(2, 1);
    };

    newFixLineCallback = async (result, event) => {
        const { OperateHistoryStore, DataLayerStore, TaskStore } = this.props;
        const { activeTask } = TaskStore;
        let layerName = DataLayerStore.getEditLayer().layerName;
        this.setState({
            result
        });
        if (event.button !== 2) return false;
        try {
            if (this.state.holdShiftKey && event.button === 2) {
                let [mainFeature, relFeatures] = result;
                if (relFeatures.length === 0) {
                    //没有选择停止线直接右键
                    message.error('没有做赋值处理');
                    message.warning({
                        content:
                            '两点绘制一条线与所选数据相交，线方向与车道编号增长趋势一致，右键完成赋值',
                        key,
                        duration: 1
                    });
                    DataLayerStore.exitEdit();
                    return false;
                }
                let { historyLog, Message } = await batchAssignment(
                    mainFeature,
                    relFeatures,
                    layerName,
                    this.state.startNumber,
                    activeTask
                );
                let history = {
                    type: 'updateFeatureRels',
                    data: historyLog
                };
                let log = {
                    operateHistory: history,
                    action: 'batchAssignment',
                    result: 'success'
                };
                OperateHistoryStore.add(history);
                editLog.store.add(log);
                message.success(Message, 3);
                message.warning({
                    content:
                        '两点绘制一条线与所选数据相交，线方向与车道编号增长趋势一致，右键完成赋值',
                    key,
                    duration: 1
                });
                // 刷新属性列表
                AdEmitter.emit('fetchViewAttributeData');
                DataLayerStore.exitEdit();
            }
        } catch (e) {
            message.warning('赋值失败：' + e.message, 3);
            message.warning({
                content: '选择需赋值线要素，然后按shift进入下一步',
                key,
                duration: 1
            });
            DataLayerStore.exitEdit();
        }
    };
}

export default AssignLineNoInBatch;
