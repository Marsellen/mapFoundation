import React from 'react';
import { inject, observer } from 'mobx-react';
import { Steps, Modal } from 'antd';
import { logDecorator } from 'src/util/decorator';
import { getBuildUrl } from 'src/util/taskUtils';
import 'src/asset/less/set-step-size.less';
import ToolIcon from 'src/component/common/toolIcon';
import { completeEditUrl } from 'src/util/taskUtils';
import { VECTOR_FILES } from 'src/config/taskConfig';

const { Step } = Steps;
const contentSteps = ['路段中心线构建', '路口中心线+参考线构建', '参考线/中心线关系构建'];

@inject('TaskStore')
@inject('ManualBuildStore')
@inject('DataLayerStore')
@observer
class BuildStep extends React.Component {
    constructor(props) {
        super(props);
        this.handleOk = this.handleOk.bind(this);
        this.state = {
            clicked: false
        };
    }

    handleClickChange = visible => {
        if (this.isDisabled()) return;
        this.setState({
            clicked: visible
        });
    };

    isDisabled = () => {
        const { TaskStore } = this.props;
        const { isManBuildTask } = TaskStore;
        return !isManBuildTask;
    };

    onChange = current => {
        const { TaskStore } = this.props;
        const content = (
            <>
                <p>{`是否确定进行${contentSteps[current]}？`}</p>
                <p>该操作只能进行一次。</p>
            </>
        );
        Modal.confirm({
            title: false,
            zIndex: 99999,
            content,
            okText: '确定',
            cancelText: '取消',
            onOk: () => {
                TaskStore.setSplitBuildStep(current);
                this.handleOk(current);
            }
        });
    };

    @logDecorator({ operate: '逻辑构建', skipRenderMode: true })
    async handleOk(current) {
        const {
            ManualBuildStore,
            TaskStore: { activeTask }
        } = this.props;

        // todo 根据taskinfos中的splitBuildStep值判断初始化的current
        // todo 根据不同的current 请求不同的逻辑构建api，返回的值是outputLayers
        // 判断返回的是适量图层还是关联关系，是关联关系要更新关联关系
        const path = getBuildUrl(activeTask);
        const params = { taskId: activeTask.taskId, ADMAP_IMPTASK_MAP_BASEDIR: path };
        let outputLayers = {};
        switch (current) {
            case 0:
                outputLayers = await ManualBuildStore.buildLane(params);
                break;
            case 1:
                outputLayers = await ManualBuildStore.buildRoad(params);
                break;
            case 2:
                outputLayers = await ManualBuildStore.buildLink(params);
                break;

            default:
                break;
        }
        if (outputLayers.code !== 1) return;
        const layers = window.vectorLayerGroup.layers;
        const layerMap = {};
        const layerNames = outputLayers.data?.layers.map(n => n.replace('.geojson', ''));
        const urls = outputLayers.data?.layers.map(layerName => completeEditUrl(layerName, activeTask));
        const result = await ManualBuildStore.getLayers(urls);

        //渲染返回要素
        const newAllFeatures = [];
        const oldAllFeatures = [];
        layers.forEach(layerItem => {
            const { layerName, layer } = layerItem;
            const oldLayerFeatures = layer.getVectorData();
            if (layerNames.includes(layerName)) {
                oldLayerFeatures.features.forEach(feature => {
                    oldAllFeatures.push({
                        layerName,
                        type: 'VectorLayer',
                        data: feature
                    });
                });
                layerMap[layerName] = layer;
            }
        });
        layerNames.forEach(layerName => {
            const newLayerFeatures = result[layerName].features;
            if (VECTOR_FILES.includes(`${layerName}.geojson`)) {
                // 如果是矢量图层
                const layer = layerMap[layerName];
                layer && layer.clear();
                layer && layer.addFeatures(newLayerFeatures);
            }
            newLayerFeatures.forEach(feature => {
                newAllFeatures.push({
                    layerName,
                    data: feature,
                    type: 'VectorLayer'
                });
            });
            // 如果是矢量图层
            //     if (!result[layerName]) return;
            //     const layer = layerMap[layerName];
            //     if (!layer) return;
            //     layer.clear();
            //     const newLayerFeatures = result[layerName].features;
            //     layer.addFeatures(newLayerFeatures);
            //     newLayerFeatures.forEach(feature => {
            //         newAllFeatures.push({
            //             layerName,
            //             data: feature,
            //             type: 'VectorLayer'
            //         });
            //     });
        });
        //日志数据
        const history = {
            features: [oldAllFeatures, newAllFeatures]
        };
        return history;
    }

    _renderContent = () => {
        const { TaskStore: { splitBuildStep } } = this.props;
        return (
            <div className="build-step">
                <Steps current={splitBuildStep} initial={0} onChange={this.onChange} size="small">
                    {contentSteps.map((item, ix) => (
                        <Step
                            key={item}
                            disabled={splitBuildStep + 1 > ix || splitBuildStep + 1 < ix}
                            title={item}
                        />
                    ))}
                </Steps>
                <div className="build-step-hint">
                    <ToolIcon icon="gantanhao" />
                    进入下一步逻辑构建前，请先查看检查项。
                </div>
            </div>
        );
    };

    render() {
        return (
            <ToolIcon
                icon="yichaisantubiao"
                title="逻辑构建"
                visible={this.state.clicked}
                disabled={this.isDisabled()}
                popover={{
                    title: '逻辑构建',
                    placement: 'bottom',
                    visible: this.state.clicked,
                    onVisibleChange: this.handleClickChange,
                    content: this._renderContent(),
                    trigger: 'click'
                }}
            />
        );
    }
}

export default BuildStep;
