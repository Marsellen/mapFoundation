import React from 'react';
import { inject, observer } from 'mobx-react';
import { Modal } from 'antd';
import ToolIcon from 'src/component/common/toolIcon';
import { logDecorator, editLock } from 'src/util/decorator';
import SettingStore from 'src/store/setting/settingStore';
import shizhenghulanxiaya from 'src/asset/img/shizhenghulanxiaya.png';
import 'src/asset/less/attributes-modal.less';

@inject('TaskStore')
@inject('ManualBuildStore')
@inject('DataLayerStore')
@observer
class MunicipalBarrierDown extends React.Component {
    constructor(props) {
        super(props);
        this.handleOk = this.handleOk.bind(this);
    }

    batchBreakModal = () => {
        Modal.confirm({
            title: '市政护栏下压',
            okText: '确定',
            cancelText: '取消',
            content: (
                <div className='municipal_barrier_confirm'>
                    <p>基于护栏上边缘，生成护栏下边缘</p>
                    <div className='municipal_barrier_box'>
                        <img src={shizhenghulanxiaya} alt="市政护栏下压" />
                        <p><span>输入：</span>隔离带护栏（市政护栏类型）与车道线</p>
                        <p><span>输出：</span>车道线（市政护栏类型）</p>
                    </div>
                </div>
            ),
            onOk: this.handleOk,
            onCancel: this.handleCancel
        });
    };

    @editLock
    handleClick = () => {
        this.props.DataLayerStore.setEditType('municipal_barrier_down', 'button');
        this.batchBreakModal();
    };

    @logDecorator({ operate: '市政护栏下压', skipRenderMode: true })
    async handleOk() {
        const {
            ManualBuildStore,
            TaskStore: {
                activeTask: { taskId }
            }
        } = this.props;
        //获取参数
        const inputLayers = JSON.parse(SettingStore.getConfig('OTHER_CONFIG').inputMunicipalBarrierLayer);
        const outputLayers = JSON.parse(SettingStore.getConfig('OTHER_CONFIG').outputMunicipalBarrierLayer);
        const layers = vectorLayerGroup.layers;
        const layerMap = {};
        const inputLayerMap = {};
        const oldAllFeatures = [];
        layers.forEach(layerItem => {
            const { layerName, layer } = layerItem;
            if (inputLayers.includes(layerName)) {
                const oldLayerFeatures = layer.getVectorData();
                inputLayerMap[layerName] = oldLayerFeatures;
                if (outputLayers.includes(layerName)) {
                    oldLayerFeatures.features.forEach(feature => {
                        oldAllFeatures.push({
                            layerName,
                            type: 'VectorLayer',
                            data: feature
                        });
                    });
                }
            }
            layerMap[layerName] = layer;
        });
        //发送请求
        const result = await ManualBuildStore.municipalBarrierDown({
            Function_Name: 'BreakLine',
            TaskId: taskId,
            data: inputLayerMap
        });
        //渲染返回要素
        const newAllFeatures = [];
        outputLayers.forEach(layerName => {
            if (!result.data[layerName]) return;
            const layer = layerMap[layerName];
            if (!layer) return;
            layer.clear();
            const newLayerFeatures = result.data[layerName].features;
            layer.addFeatures(newLayerFeatures);
            newLayerFeatures.forEach(feature => {
                newAllFeatures.push({
                    layerName,
                    data: feature,
                    type: 'VectorLayer'
                });
            });
        });
        //日志数据
        const history = {
            features: [oldAllFeatures, newAllFeatures]
        };
        return history;
    }

    handleCancel = () => {
        this.props.DataLayerStore.setEditType();
    };

    render() {
        const {
            TaskStore: { isMsTask, isEditableTask },
            DataLayerStore: { editType }
        } = this.props;
        const visible = editType === 'municipal_barrier_down';

        if (isMsTask) {
            return (
                <ToolIcon
                    icon="xiayagongnengtubiao"
                    title="市政护栏下压"
                    visible={visible}
                    disabled={!isEditableTask}
                    action={this.handleClick}
                />
            );
        } else {
            return null;
        }
    }
}

export default MunicipalBarrierDown;
