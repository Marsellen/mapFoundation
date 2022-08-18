import React from 'react';
import { inject, observer } from 'mobx-react';
import { Steps, Modal, Tooltip } from 'antd';
import { logDecorator } from 'src/util/decorator';
import { getBuildUrl } from 'src/util/taskUtils';
import { geojsonToDbData } from 'src/util/relCtrl/utils';
import 'src/asset/less/set-step-size.less';
import ToolIcon from 'src/component/common/toolIcon';
import { completeEditUrl } from 'src/util/taskUtils';
import { VECTOR_FILES, REL_FILES } from 'src/config/taskConfig';
import { updateFeatures } from 'src/util/relCtrl/operateCtrl';
import { querySameAttrTypeRels } from 'src/util/relCtrl/relCtrl';
import Relevance from 'src/util/relevance';
import RelStore from 'src/store/home/relStore';

const { Step } = Steps;
const contentSteps = ['路段中心线构建', '路口中心线+参考线构建', '参考线/中心线关系构建'];

@inject('TaskStore')
@inject('QualityCheckStore')
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
        const {
            TaskStore: { isEditableTask },
            DataLayerStore
        } = this.props;
        if (!isEditableTask) return;
        if (visible) {
            DataLayerStore.setEditType('logic_build', 'button');
        } else {
            DataLayerStore.setEditType();
        }
    };

    // isDisabled = () => {
    //     const { TaskStore } = this.props;
    //     const { isManBuildTask } = TaskStore;
    //     return !isManBuildTask;
    // };

    onChange = current => {
        const { TaskStore, DataLayerStore } = this.props;
        const content = (
            <>
                <p>{`是否确定进行${contentSteps[current]}？`}</p>
                <p>该操作只能进行一次。</p>
            </>
        );
        DataLayerStore.setEditType('logic_build_load');
        Modal.confirm({
            title: false,
            zIndex: 99999,
            content,
            okText: '确定',
            cancelText: '取消',
            onOk: () => {
                this.handleOk(current);
            },
            onCancel: this.handleCancel
        });
    };

    handleCancel = () => {
        this.props.DataLayerStore.setEditType();
    };

    @logDecorator({ operate: '逻辑构建', skipRenderMode: true })
    async handleOk(current) {
        const { ManualBuildStore, TaskStore } = this.props;
        const { activeTask, splitBuildStep, getTaskFile } = TaskStore;
        const path = getBuildUrl(activeTask);
        const isBack = splitBuildStep >= current;
        const params = {
            taskId: activeTask.taskId,
            ADMAP_IMPTASK_MAP_BASEDIR: path,
            PRJ_LIST: activeTask.PRJ_LIST
        };
        let outputLayers = {};
        if (isBack) {
            params.reback = 1;
            params.step = current + 1;
            outputLayers = await ManualBuildStore.buildReback(params);
        } else {
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
        }
        if (outputLayers.code !== 1) return {};
        TaskStore.setSplitBuildStep(isBack ? current - 1 : current);

        const layers = window.vectorLayerGroup.layers;
        const layerMap = {};
        const fileNames = outputLayers.data?.layers;
        const layerNames = fileNames.map(n => n.replace('.geojson', ''));
        const urls = outputLayers.data?.layers.map(layerName =>
            completeEditUrl(layerName, activeTask)
        );
        const result = await ManualBuildStore.getLayers(urls, layerNames);

        //渲染返回要素
        let newAllFeatures = [];
        let oldAllFeatures = [];
        let newRels = [];
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
                newLayerFeatures.forEach(feature => {
                    newAllFeatures.push({
                        layerName,
                        data: feature,
                        type: 'VectorLayer'
                    });
                });
            }
            if (REL_FILES.includes(`${layerName}.geojson`)) {
                const spec = layerName;
                const dataType = 'current';
                newLayerFeatures.forEach(feature => {
                    const records = geojsonToDbData(feature.properties, spec, dataType);
                    newRels = newRels.concat(records);
                });
            }
        });
        // 获取旧关联关系
        // let { rels: oldRels } = await querySameAttrTypeRels(newRels);
        let history = {};
        const taskFile = getTaskFile();
        // 日志数据
        history = {
            features: [oldAllFeatures, newAllFeatures]
        };
        // 更新矢量
        await updateFeatures(history);
        // 清空indexDB中的关系
        await RelStore.destroy();
        // 向indexDB中添加新关联关系
        await RelStore.addRecords(taskFile.rels, 'current');
        // 进行检查
        const {
            QualityCheckStore: {
                handleProducerGetReport,
                openCheckReport,
                setActiveKey,
                handleProducerCheck
            }
        } = this.props;
        //质量检查
        const checkRes = await handleProducerCheck();
        if (checkRes) {
            //轮询质检结果
            const reportList = await handleProducerGetReport();
            if (reportList) {
                const reportListL = reportList.length;
                if (reportListL > 0) {
                    setActiveKey('check');
                    openCheckReport();
                }
            }
        }

        return history;
    }

    handleClickBack = current => {
        const { TaskStore, DataLayerStore } = this.props;
        const content = (
            <>
                <p>{`是否确认回退至“${contentSteps[current]}”步骤前？将会丢失该步骤后所有编辑操作。`}</p>
            </>
        );
        DataLayerStore.setEditType('logic_build_load');
        Modal.confirm({
            title: false,
            zIndex: 99999,
            content,
            okText: '确定',
            cancelText: '取消',
            onOk: () => {
                this.handleOk(current);
            },
            onCancel: this.handleCancel
        });
    };

    _renderContent = () => {
        const {
            TaskStore: { splitBuildStep }
        } = this.props;
        return (
            <div className="build-step">
                <Steps current={splitBuildStep} initial={0} onChange={this.onChange} size="small">
                    {contentSteps.map((item, ix) => (
                        <Step
                            key={item}
                            disabled={splitBuildStep + 1 > ix || splitBuildStep + 1 < ix}
                            title={item}
                            description={
                                ix < splitBuildStep + 1 && (
                                    <Tooltip
                                        placement="right"
                                        title={`返回至“${contentSteps[ix]}”前状态`}
                                    >
                                        <span
                                            className="build-step-back"
                                            onClick={e => {
                                                e.preventDefault();
                                                this.handleClickBack(ix);
                                            }}
                                        >
                                            <ToolIcon icon="fanhui" />
                                        </span>
                                    </Tooltip>
                                )
                            }
                        ></Step>
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
        const {
            TaskStore: { isManBuildTask, isEditableTask },
            DataLayerStore: { editType }
        } = this.props;
        const visible = editType === 'logic_build';

        if (isManBuildTask) {
            return (
                <ToolIcon
                    icon="yichaisantubiao"
                    title="逻辑构建"
                    visible={visible}
                    disabled={!isEditableTask}
                    popover={{
                        title: '逻辑构建',
                        placement: 'bottom',
                        visible: visible,
                        onVisibleChange: this.handleClickChange,
                        content: this._renderContent(),
                        trigger: 'click'
                    }}
                />
            );
        } else {
            return null;
        }
    }
}

export default BuildStep;
