import React from 'react';
import { message, Modal, Select } from 'antd';
import ToolIcon from 'src/components/ToolIcon';
import AdMessage from 'src/components/AdMessage';
import { inject, observer } from 'mobx-react';
import { batchAssignment } from 'src/utils/relCtrl/operateCtrl';
import { DATA_LAYER_MAP } from 'src/config/DataLayerConfig';
import { logDecorator, editInputLimit } from 'src/utils/decorator';
import DataLayerStore from 'src/pages/Index/store/DataLayerStore';
import TaskStore from 'src/pages/Index/store/TaskStore';

import 'less/components/tool-icon.less';
import 'less/components/batch-tools.less';
import { checkSdkError } from 'src/utils/vectorUtils';

const { Option } = Select;

@inject('DataLayerStore')
@observer
class BatchAssignLaneNo extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            step: 0,
            messageVisible: false,
            message: '',
            startNumber: props.layerName === 'AD_Lane' ? '1' : '0',
            layerName: props.layerName
        };
        this.result = [];
    }

    static getDerivedStateFromProps(props, state) {
        if (props.layerName !== state.layerName) {
            return {
                ...state,
                startNumber: props.defaultNumber,
                layerName: props.layerName
            };
        }
        return null;
    }
    componentDidMount() {
        const { DataLayerStore } = this.props;
        DataLayerStore.setNewFixLineCallback(this.newFixLineCallback);
    }

    componentWillUnmount() {
        this.removeEventListener();
    }
    render() {
        const { DataLayerStore } = this.props;
        let { messageVisible, message } = this.state;
        let visible = DataLayerStore.editType == 'assign_line_batch';
        messageVisible = visible && messageVisible;
        return (
            <div id="assign-line-batch-btn" className="flex-1" onClick={this.action}>
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
                    width={318}
                    maskClosable={false}
                >
                    {this._renderModal(visible)}
                </Modal>
            </div>
        );
    }

    _renderModal = () => {
        const { layerName, defaultNumber } = this.props;
        const { startNumber } = this.state;

        return (
            <div>
                <div>
                    <span className="batch-label">赋值图层</span>
                    <span className="batch-content">{DATA_LAYER_MAP[layerName].label}</span>
                </div>
                <div style={{ marginTop: 8 }}>
                    <span className="batch-label">起始车道编号</span>
                    {
                        <Select
                            className="batch-content"
                            value={startNumber}
                            onChange={this.handleChange}
                        >
                            <Option value={defaultNumber}>{defaultNumber}</Option>
                            <Option value="-1">-1</Option>
                            <Option value="-2">-2</Option>
                        </Select>
                    }
                </div>
            </div>
        );
    };

    action = () => {
        const { DataLayerStore } = this.props;
        if (DataLayerStore.editType == 'assign_line_batch') return;
        this.result = [];
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
        const { DataLayerStore } = this.props;
        if (event.key !== 'Shift' || DataLayerStore.editType !== 'assign_line_batch') return;
        try {
            this.lineCheck(); //条件判断
            const { DataLayerStore } = this.props;
            DataLayerStore.batchAssinLaneNo(1);
            this.removeEventListener();
            this.setState({
                step: 1,
                message: '两点绘制一条线与所选数据相交，线方向与车道编号增长趋势一致，右键完成赋值',
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
        if (result && result.desc) {
            let arr = result.desc.split(':');
            message.warning(arr[arr.length - 1], 3);
            DataLayerStore.exitEdit();
            return;
        }
        const { step } = this.state;
        this.result = result;
        if (step === 1) {
            this.handleAssign(result[0], event);
            this.setState({
                step: 0,
                messageVisible: false,
                message: ''
            });
        }
    };

    @editInputLimit({ editType: 'assign_line_batch' })
    @logDecorator({ operate: '批量赋值车道分组编号' })
    async handleAssign(inputData, event) {
        if (event.button !== 2) return;
        try {
            const { activeTask } = TaskStore;
            let layerName = DataLayerStore.getEditLayer().layerName;
            const { startNumber } = this.state;
            checkSdkError(this.result, '没有做赋值处理');

            let [features, [fixLine]] = this.result;
            let historyLog = await batchAssignment(
                features,
                fixLine,
                layerName,
                startNumber,
                activeTask
            );

            return historyLog;
        } catch (e) {
            this.removeEventListener();
            throw e;
        }
    }
}

export default BatchAssignLaneNo;
