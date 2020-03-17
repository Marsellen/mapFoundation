import React from 'react';
import { Modal, Select } from 'antd';
import ToolIcon from 'src/components/ToolIcon';
import { inject, observer } from 'mobx-react';
import AdMessage from 'src/components/AdMessage';
import { batchAssignment } from 'src/utils/relCtrl/operateCtrl';
import { DATA_LAYER_MAP } from 'src/config/DataLayerConfig';
import 'less/components/tool-icon.less';
import 'less/components/batch-tools.less';

const { Option } = Select;

@inject('DataLayerStore')
@inject('AttributeStore')
@observer
class AssignLineNoInBatch extends React.Component {
    constructor() {
        super();
        this.state = {
            num: '0',
            nextMsg: false,
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
        let layerName = DataLayerStore.getEditLayer().layerName;
        console.log('layerName', layerName);
        return (
            <div
                id="assign-line-batch-btn"
                className="flex-1"
                onClick={this.action}>
                <ToolIcon icon="dimianjuxing" />
                <div>批量赋车道分组编号</div>
                <AdMessage visible={visible} content={this.content()} />
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
                                <Option value="1">1</Option>
                                <Option value="2">2</Option>
                            </Select>
                        }
                    </div>
                </Modal>
            </div>
        );
    }

    action = () => {
        const { DataLayerStore } = this.props;
        if (DataLayerStore.editType == 'assign_line_batch') return;
        this.addEventListener();
        DataLayerStore.newFixLine();
    };

    handleChange = val => {
        this.setState({
            num: val
        });
    };

    addEventListener = () => {
        const { DataLayerStore } = this.props;
        // if (DataLayerStore.editType == 'assign_line_batch') {
        //当批处理时才会监听shit键

        document.addEventListener('keydown', event => {
            if (!event.shiftKey) {
                event.preventDefault();
                event.stopPropagation();
                return false;
            }

            DataLayerStore.getNewFixLine(2, 1);
            this.setState({
                holdShiftKey: true,
                nextMsg: true
            });
        });
        // }
    };

    newFixLineCallback = async (result, event) => {
        this.addEventListener();
        try {
            if (this.state.holdShiftKey && event.button === 2) {
                let [mainFeature, relFeatures] = result;
                if (!relFeatures) {
                    throw {
                        message: '没有做赋值处理'
                    };
                }
                batchAssignment(
                    mainFeature,
                    relFeatures,
                    layerName,
                    activeTask
                );
            }
        } catch (e) {
            DataLayerStore.exitEdit();
        }
    };

    content = () => {
        const { nextMsg } = this.state;
        return (
            <label>
                {nextMsg
                    ? '两点绘制一条线与所选数据相交，线方向与车道编号增长趋势一致，右键完成赋值'
                    : '选择需赋值线要素，然后按shift进入下一步'}
            </label>
        );
    };

    _renderContent = () => {};
}

export default AssignLineNoInBatch;
