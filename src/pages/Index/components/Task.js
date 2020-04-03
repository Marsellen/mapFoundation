import React from 'react';
import { Menu, Empty, Modal } from 'antd';
import { inject, observer } from 'mobx-react';
import AdLocalStorage from 'src/utils/AdLocalStorage';
import editLog from 'src/models/editLog';
import { RESOURCE_LAYER_BOUNDARY } from 'src/config/DataLayerConfig';
import 'less/components/sider.less';
import ToolIcon from 'src/components/ToolIcon';
import CONFIG from 'src/config';

const processNameOptions = CONFIG.processNameOptions;

@inject('DefineModeStore')
@inject('RenderModeStore')
@inject('QualityCheckStore')
@inject('appStore')
@inject('TaskStore')
@inject('AttributeStore')
@inject('OperateHistoryStore')
@inject('DataLayerStore')
@inject('ToolCtrlStore')
@inject('PictureShowStore')
@inject('ResourceLayerStore')
@inject('VectorsStore')
@observer
class Task extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            current: null
        };
    }

    render() {
        const { TaskStore } = this.props;
        const { activeTaskId, validTasks, isEditableTask } = TaskStore;

        if (validTasks && validTasks.length > 0) {
            let taskIndex = TaskStore.validTasks.findIndex(
                item => item.taskId === activeTaskId
            );
            taskIndex = taskIndex > -1 ? taskIndex.toString() : '';
            return (
                <Menu className="menu" selectedKeys={[taskIndex]}>
                    {validTasks.map((item, index) => (
                        <Menu.Item key={index}>
                            <p className="menu-item-box">
                                <span
                                    onClick={e =>
                                        this.chooseTask(e, item.taskId, false)
                                    }>
                                    {this.getTaskLabel(item)}
                                </span>
                                <ToolIcon
                                    icon="kaishi"
                                    className="task-start-button"
                                    disabled={
                                        isEditableTask &&
                                        taskIndex &&
                                        index == taskIndex
                                    }
                                    action={e =>
                                        this.chooseTask(e, item.taskId, true)
                                    }
                                />
                            </p>
                        </Menu.Item>
                    ))}
                </Menu>
            );
        } else {
            return this.renderNoData();
        }
    }

    componentDidMount() {
        const { TaskStore } = this.props;
        const { bindLocalTaskCallback } = TaskStore;
        bindLocalTaskCallback(this.LocalTaskCallback);
    }

    LocalTaskCallback = taskId => {
        this.setState({
            current: taskId
        });
    };

    renderNoData = () => {
        return <Empty image={Empty.PRESENTED_IMAGE_SIMPLE} />;
    };

    getTaskLabel = task => {
        if (task.isLocal) {
            let processName = processNameOptions.find(
                option => option.value === task.processName
            ).label;
            return `${task.taskId}-${processName}`;
        }
        return `${task.taskId}-${task.nodeDesc}-${task.manualStatusDesc}`;
    };

    chooseTask = (e, id, isEdit) => {
        // e.stopPropagation();
        const { current: currentTaskId } = this.state;
        if (currentTaskId == id && !isEdit) {
            return;
        }

        const { OperateHistoryStore } = this.props;
        let { currentNode, savedNode } = OperateHistoryStore;
        let shouldSave = currentNode > savedNode;
        if (shouldSave) {
            Modal.confirm({
                title: '提示： 当前任务未保存。',
                okText: '保存并切换',
                cancelText: '取消',
                okType: 'danger',
                onOk: async () => {
                    const { TaskStore, OperateHistoryStore } = this.props;

                    await TaskStore.submit();
                    await TaskStore.writeEditLog();
                    OperateHistoryStore.save();
                    this.toggleTask(id, isEdit);
                }
            });
        } else {
            this.toggleTask(id, isEdit);
        }
    };

    handleReportOpen = async () => {
        const { appStore, QualityCheckStore, TaskStore } = this.props;
        const { activeTaskId } = TaskStore;
        const { loginUser } = appStore;
        const { roleCode } = loginUser;
        const {
            handleQualityGetMisreport,
            openCheckReport
        } = QualityCheckStore;

        switch (roleCode) {
            case 'producer':
                // //返工返修任务，自动打开质检报表
                // if (
                //     TaskStore.activeTaskStatus === 4 ||
                //     TaskStore.activeTaskStatus === 5
                // ) {
                //     await getReport({
                //         task_id: activeTaskId
                //     });
                //     QualityCheckStore.reportListL > 0 && openCheckReport();
                // }
                break;
            case 'quality':
                await handleQualityGetMisreport({
                    taskId: activeTaskId,
                    status: '1,2,4'
                });
                QualityCheckStore.reportListL > 0 && openCheckReport();
                break;
            default:
                break;
        }
    };

    toggleTask = async (id, isEdit) => {
        if (this.isToggling) return;
        this.isToggling = true;

        try {
            const {
                TaskStore,
                QualityCheckStore,
                DataLayerStore,
                RenderModeStore
            } = this.props;
            const { current } = this.state;
            const { taskIdList, activeTaskId } = TaskStore;

            // 切换任务时，保存上一个任务的缩放比例，该方法需最先执行
            if (current && taskIdList.includes(current)) {
                const preTaskScale = map.getEyeView();
                const { position } = preTaskScale;
                const { x, y, z } = position;
                if (!(x === 0 && y === 0 && z === 0)) {
                    AdLocalStorage.setTaskInfosStorage({
                        taskId: current,
                        taskScale: preTaskScale
                    });
                }
            }

            //渲染模式重置
            activeTaskId !== id && RenderModeStore.setMode('common');

            QualityCheckStore.closeCheckReport();
            QualityCheckStore.clearCheckReport();
            await TaskStore.setActiveTask(id);
            await this.clearWorkSpace();
            if (isEdit) {
                this.handleReportOpen();
                window.boundaryLayerGroup = await TaskStore.startTaskEdit(id);
                this.fetchLayerGroup(window.boundaryLayerGroup);
                window.map && window.map.enableRotate();
                DataLayerStore.disableRegionSelect();
            }

            this.setState({ current: id }, () => {
                this.isToggling = false;
            });
        } catch (e) {
            this.isToggling = false;
        }
    };

    clearWorkSpace = async () => {
        const {
            OperateHistoryStore,
            DataLayerStore,
            ToolCtrlStore,
            AttributeStore,
            PictureShowStore
        } = this.props;
        await OperateHistoryStore.destroy();
        await editLog.store.clear();
        DataLayerStore.activeEditor();
        DataLayerStore.topViewMode(false);
        ToolCtrlStore.updateByEditLayer();
        AttributeStore.hide();
        PictureShowStore.hide();
        PictureShowStore.destory();

        //切换任务 关闭所有弹框
        document.querySelectorAll('.ant-modal-close').forEach(element => {
            element.click();
        });
    };

    //关联关系模式下，处理底图数据
    handleBoundaryfeature = () => {
        const { RenderModeStore, DefineModeStore } = this.props;
        const {
            whiteRenderMode,
            resetSelectOption,
            setRels,
            activeMode
        } = RenderModeStore;
        const { resetBoundaryStyle } = DefineModeStore;

        switch (activeMode) {
            case 'relation':
                //将重置专题图
                resetSelectOption();
                //周边底图要素，采用配置：HalfWhiteVectorsConfig，半透明白
                whiteRenderMode();
                //将有关联关系的要素，按专题图进行分组
                setRels();
                break;
            case 'define':
                //重置周边底图高精数据图层样式
                resetBoundaryStyle();
                break;
            default:
                break;
        }
    };

    fetchLayerGroup = boundaryLayerGroup => {
        if (!boundaryLayerGroup) {
            return;
        }
        const { DataLayerStore, ResourceLayerStore, VectorsStore } = this.props;
        DataLayerStore.addTargetLayers(boundaryLayerGroup.layers);
        ResourceLayerStore.updateLayerByName(
            RESOURCE_LAYER_BOUNDARY,
            boundaryLayerGroup
        );
        VectorsStore.addBoundaryLayer(boundaryLayerGroup);
        this.handleBoundaryfeature();
    };
}

export default Task;
