import React from 'react';
import { inject, observer } from 'mobx-react';
import ToolIcon from 'src/components/ToolIcon';
import { Modal } from 'antd';
import { logDecorator, editLock } from 'src/utils/decorator';
import sysProperties from 'src/models/sysProperties';

@inject('TaskStore')
@inject('ManualBuildStore')
@inject('DataLayerStore')
@observer
class BatchBreak extends React.Component {
    constructor(props) {
        super(props);
        this.handleOk = this.handleOk.bind(this);
    }

    isDisabled = () => {
        const { TaskStore } = this.props;
        const { activeTaskId } = TaskStore;
        return !activeTaskId;
    };

    @editLock
    handleClick = () => {
        this.props.DataLayerStore.setEditType('batch_break', 'button');
    };

    @logDecorator({ operate: '批量线要素打断赋值', skipRenderMode: true })
    async handleOk() {
        const {
            ManualBuildStore,
            TaskStore: {
                activeTask: { taskId }
            }
        } = this.props;
        //获取参数
        const inputLayers = sysProperties.getConfig('inputEditLayer');
        const layers = vectorLayerGroup.layers;
        const layerMap = {};
        const inputLayerMap = {};
        layers.forEach(layerItem => {
            const { layerName, layer } = layerItem;
            if (inputLayers.includes(layerName)) {
                inputLayerMap[layerName] = layer.getVectorData();
            }
            layerMap[layerName] = layer;
        });
        //发送请求
        const result = await ManualBuildStore.batchBreak({
            Function_Name: 'BreakLine',
            TaskId: taskId,
            data: inputLayerMap
        });
        //渲染返回要素
        const outputLayers = sysProperties.getConfig('outputEditLayer');
        outputLayers.forEach(layerName => {
            if (!result.data[layerName]) return;
            const layer = layerMap[layerName];
            if (!layer) return;
            layer.clear();
            layer.addFeatures(result.data.layerName);
        });
        //日志数据
        const history = {};
        return history;
    }

    handleCancel = () => {
        this.props.DataLayerStore.setEditType();
    };

    render() {
        const {
            TaskStore: { isMsTask },
            DataLayerStore: { editType }
        } = this.props;
        const visible = editType === 'batch_break';

        if (isMsTask) {
            return (
                <>
                    <ToolIcon
                        icon="piliangxianyaosudaduanfuzhi"
                        title="批量线要素打断赋值"
                        visible={visible}
                        disabled={this.isDisabled()}
                        action={this.handleClick}
                    />
                    <Modal
                        title="批量线要素打断赋值"
                        okText="确定"
                        cancelText="取消"
                        visible={visible}
                        autoFocusButton={null}
                        onOk={this.handleOk}
                        onCancel={this.handleCancel}
                    >
                        <div>
                            <p>
                                输入：几何正确,类型属性正确的车道线（含道路边界）,隔离带&护栏,停止位置
                            </p>
                            <p>输出：经过自动齐打断,属性调整后的车道线,隔离带&护栏</p>
                            <p style={{ color: 'red' }}>注：此功能只在人工识别, 底图新增阶段使用</p>
                        </div>
                    </Modal>
                </>
            );
        } else {
            return null;
        }
    }
}

export default BatchBreak;
