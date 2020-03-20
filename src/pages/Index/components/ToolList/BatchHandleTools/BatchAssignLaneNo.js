import React from 'react';
import { Modal, Select, message } from 'antd';
import ToolIcon from 'src/components/ToolIcon';
import AdMessage from 'src/components/AdMessage';
import { inject, observer } from 'mobx-react';
import editLog from 'src/models/editLog';
import AdEmitter from 'src/models/event';
import { batchAssignment } from 'src/utils/relCtrl/operateCtrl';
import { DATA_LAYER_MAP } from 'src/config/DataLayerConfig';
import 'less/components/tool-icon.less';
import 'less/components/batch-tools.less';

const { Option } = Select;

@inject('DataLayerStore')
@inject('TaskStore')
@inject('OperateHistoryStore')
@observer
class AssignLineNoInBatch extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            step: 0,
            messageVisible: false,
            message: '',
            startNumber: 0
        };
        this.result = [];
    }
    componentDidMount() {
        const { DataLayerStore } = this.props;
        DataLayerStore.setNewFixLineCallback(this.newFixLineCallback);
    }
    render() {
        const { DataLayerStore } = this.props;
        let { messageVisible, message } = this.state;
        let visible = DataLayerStore.editType == 'assign_line_batch';
        messageVisible = visible && messageVisible;
        return (
            <div
                id="assign-line-batch-btn"
                className="flex-1"
                onClick={this.action}>
                <ToolIcon icon="piliangfuchedaofenzubianhao" />
                <div>批量赋车道分组编号</div>
                <AdMessage visible={messageVisible} content={message} />
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
                <div style={{ marginTop: 8 }}>
                    起始车道编号:
                    {
                        <Select
                            value={this.state.startNumber}
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
        DataLayerStore.batchAssinLaneNo();
        this.setState({
            step: 0,
            message: '选择需赋值线要素，然后按shift进入下一步',
            messageVisible: true
        });
    };

    handleChange = val => {
        this.setState({
            startNumber: val
        });
    };

    addEventListener = () => {
        document.addEventListener('keyup', this.shiftCallback);
    };

    shiftCallback = event => {
        if (event.key !== 'Shift') return;
        try {
            this.lineCheck(); //条件判断
            const { DataLayerStore } = this.props;
            DataLayerStore.batchAssinLaneNo(1);
            this.removeEventListener();
            this.setState({
                step: 1,
                message:
                    '两点绘制一条线与所选数据相交，线方向与车道编号增长趋势一致，右键完成赋值',
                visible: true
            });
        } catch (e) {
            this.setState({
                message: e.message
            });
            setTimeout(() => {
                this.setState({
                    message: '选择待处理的线要素，然后按shift进入下一步'
                });
            }, 1000);
        }
    };

    removeEventListener = () => {
        document.removeEventListener('keyup', this.shiftCallback);
    };

    lineCheck = () => {
        const { DataLayerStore } = this.props;
        let layerName = DataLayerStore.getEditLayer().layerName;
        if (!this.result || this.result.length === 0) {
            throw new Error('未选择要素!');
        }
        for (let i = 0; i < this.result.length; i++) {
            if (this.result[i].layerName !== layerName) {
                throw new Error('所选要素不符合要求!');
            }
        }
    };

    newFixLineCallback = async (result, event) => {
        const { step } = this.state;
        this.result = result;
        if (step === 1) {
            this.handleAssign(event);
            this.setState({
                step: 0,
                messageVisible: false,
                message: ''
            });
        }
    };

    handleAssign = async event => {
        if (event.button !== 2) return;
        const { OperateHistoryStore, DataLayerStore, TaskStore } = this.props;
        const { activeTask } = TaskStore;
        let layerName = DataLayerStore.getEditLayer().layerName;
        message.loading({ content: '处理中...', key: 'assign_lane_no' });
        try {
            if (this.result.errorCode) {
                //没有绘制辅助线直接右键
                throw new Error('没有做赋值处理');
            }
            let [features, [fixLine]] = this.result;
            let historyLog = await batchAssignment(
                features,
                fixLine,
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
                action: 'batchAssignLaneNo',
                result: 'success'
            };
            OperateHistoryStore.add(history);
            editLog.store.add(log);
            // 刷新属性列表
            AdEmitter.emit('fetchViewAttributeData');
            DataLayerStore.exitEdit();
        } catch (e) {
            message.error({
                content: e.message,
                key: 'assign_lane_no',
                duration: 3
            });
            this.removeEventListener();
            DataLayerStore.exitEdit();
        }
    };
}

export default AssignLineNoInBatch;
