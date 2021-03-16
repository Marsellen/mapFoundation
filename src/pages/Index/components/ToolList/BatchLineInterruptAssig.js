import React from 'react';
import { inject, observer } from 'mobx-react';
import ToolIcon from 'src/components/ToolIcon';
import { Modal, message } from 'antd';
import { logDecorator, editLock } from 'src/utils/decorator';
import sysProperties from 'src/models/sysProperties';
@inject('TaskStore')
@inject('ManualBuildStore')
@observer
class BatchLineInterruptAssig extends React.Component {
    state = {
        clicked: false
    };

    isDisabled = () => {
        const { TaskStore } = this.props;
        const { activeTaskId } = TaskStore;
        return !activeTaskId;
    };
    @editLock
    handleClick = () => {
        this.setState({ clicked: true });
    };

    @logDecorator({ operate: '批量线要素打断赋值', skipRenderMode: true })
    handleOk = async () => {
        const { TaskStore, ManualBuildStore } = this.props;
        const {
            activeTask: { taskId }
        } = TaskStore;
        this.setState({
            clicked: false
        });
        message.loading({
            key: 'batch_assignment',
            content: '正在批量线要素打断赋值要素...',
            duration: 0
        });
        const inputLayers = sysProperties.getConfig('inputEditLayer');
        const layers = vectorLayerGroup.layers;
        const layerMap = {};
        const inputLayerMap = {};
        layers.forEach(layerItem => {
            const { layerName, layer } = layerItem;
            if (inputLayers.includes(layerName)) {
                inputLayerMap[layerName] = layer.getAllFeatures();
            }
            layerMap[layerName] = layer;
        });

        try {
            const result = await ManualBuildStore.batchLineInterruptAssig({
                Function_Name: 'BreakLine',
                TaskId: taskId,
                data: inputLayerMap
            });
            const outputLayers = sysProperties.getConfig('outputEditLayer');
            outputLayers.forEach(layerName => {
                if (!result.data[layerName]) return;
                const layer = layerMap[layerName];
                if (!layer) return;
                layer.clear();
                layer.addFeatures(result.data.layerName);
            });

            message.success({
                key: 'batch_assignment',
                content: '批量线要素打断赋值完成',
                duration: 1
            });
        } catch (e) {
            message.error({
                key: 'batch_assignment',
                content: `批量线要素打断赋值失败,${e.message}`,
                duration: 1
            });
        }
    };

    render() {
        const {
            TaskStore: { isMsTask }
        } = this.props;
        const { clicked } = this.state;
        if (isMsTask) {
            return (
                <>
                    <ToolIcon
                        icon="piliangxianyaosudaduanfuzhi"
                        title="批量线要素打断赋值"
                        visible={clicked}
                        disabled={this.isDisabled()}
                        action={this.handleClick}
                    />
                    <Modal
                        title="批量线要素打断赋值"
                        okText="确定"
                        cancelText="取消"
                        visible={clicked}
                        autoFocusButton={null}
                        onOk={this.handleOk}
                        onCancel={() => {
                            this.setState({ clicked: false });
                        }}
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

export default BatchLineInterruptAssig;
