import React from 'react';
import { Menu, Empty, Modal, message } from 'antd';
import { inject, observer } from 'mobx-react';
import AdLocalStorage from 'src/utils/AdLocalStorage';
import { RESOURCE_LAYER_BOUNDARY } from 'src/config/DataLayerConfig';
import 'less/components/sider.less';
import ToolIcon from 'src/components/ToolIcon';
import CONFIG from 'src/config';
import { saveTaskDate } from 'src/utils/taskUtils';

const processNameOptions = CONFIG.processNameOptions;

@inject('DefineModeStore')
@inject('TextStore')
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
            let taskIndex = TaskStore.validTasks.findIndex(item => item.taskId === activeTaskId);
            taskIndex = taskIndex > -1 ? taskIndex.toString() : '';
            return (
                <Menu className="menu" selectedKeys={[taskIndex]}>
                    {validTasks.map((item, index) => (
                        <Menu.Item key={index}>
                            <p className="menu-item-box">
                                <span onClick={e => this.chooseTask(e, item.taskId, false)}>
                                    {this.getTaskLabel(item)}
                                </span>
                                <ToolIcon
                                    icon="kaishi"
                                    className="task-start-button"
                                    disabled={isEditableTask && taskIndex && index == taskIndex}
                                    action={e => this.chooseTask(e, item.taskId, true)}
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
            let processName = processNameOptions.find(option => option.value === task.processName)
                .label;
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
                    await saveTaskDate();
                    this.toggleTask(id, isEdit);
                }
            });
        } else {
            this.toggleTask(id, isEdit);
        }
    };

    handleReportOpen = async () => {
        const {
            TaskStore: { activeTaskId },
            appStore: { loginUser: { roleCode } } = {},
            QualityCheckStore,
            QualityCheckStore: { handleQualityGetMisreport, openCheckReport, setActiveKey }
        } = this.props;

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
                if (QualityCheckStore.reportListL === 0) return;
                setActiveKey('check');
                openCheckReport();
                break;
            default:
                break;
        }
    };

    toggleTask = (id, isEdit) => {
        //防抖，减少重置画布次数
        this.timeout && clearTimeout(this.timeout);
        this.timeout = setTimeout(async () => {
            try {
                const { TaskStore, QualityCheckStore, RenderModeStore } = this.props;
                const { current } = this.state;
                const { taskIdList, activeTaskId } = TaskStore;

                // 切换任务时，保存上一个任务的缩放比例，该方法需最先执行
                if (window.map && current && taskIdList.includes(current)) {
                    const preTaskScale = window.map.getEyeView();
                    const { position } = preTaskScale;
                    const { x, y, z } = position;
                    if (!(x === 0 && y === 0 && z === 0)) {
                        AdLocalStorage.setTaskInfosStorage({
                            taskId: current,
                            taskScale: preTaskScale
                        });
                    }
                }

                if (activeTaskId !== id) {
                    QualityCheckStore.closeCheckReport();
                    QualityCheckStore.clearCheckReport();
                }

                await TaskStore.setActiveTask(id);
                isEdit && (await TaskStore.startTaskEdit(id));
                this.handleReportOpen();

                //先浏览再开始任务时，获取周边底图
                activeTaskId === id && isEdit && this.fetchLayerGroup();

                this.setState({ current: id });
            } catch (e) {
                const msg = e.message || e || '';
                console.log('切换任务报错:' + msg);
                if (e.key === 'task_error') {
                    this.props.TaskStore.startTaskEdit();
                    message.error(msg);
                }
            }
        }, 1000);
    };

    //不同模式下，处理底图数据
    handleBoundaryfeature = () => {
        const { RenderModeStore, TextStore, DefineModeStore } = this.props;
        const { whiteRenderMode, resetSelectOption, setRels, activeMode } = RenderModeStore;
        const { resetBoundaryTextStyle } = TextStore;
        const { updateBoundaryVectorStyle } = DefineModeStore;

        switch (activeMode) {
            case 'common':
            case 'check':
            case 'define':
                //按符号设置，更新后加载的周边底图
                updateBoundaryVectorStyle();
                break;
            case 'relation':
                //将重置专题图
                resetSelectOption();
                //白色渲染模式/要素都是白色
                whiteRenderMode();
                //将有关联关系的要素，按专题图进行分组
                setRels();
                break;
            default:
                break;
        }

        //将后加载的周边底图按当前注记配置渲染
        resetBoundaryTextStyle();
    };

    fetchLayerGroup = async () => {
        try {
            const { TaskStore, DataLayerStore, ResourceLayerStore, VectorsStore } = this.props;
            window.boundaryLayerGroup = await TaskStore.getBoundaryLayer();
            if (!window.boundaryLayerGroup) return;
            DataLayerStore.addTargetLayers(window.boundaryLayerGroup.layers);
            ResourceLayerStore.updateLayerByName(
                RESOURCE_LAYER_BOUNDARY,
                window.boundaryLayerGroup
            );
            VectorsStore.addBoundaryLayer(window.boundaryLayerGroup);
            this.handleBoundaryfeature();
        } catch (e) {
            message.warning('当前任务没有周边底图数据');
            console.error(`周边底图数据加载失败: ${e.message || e}`);
        }
    };
}

export default Task;
