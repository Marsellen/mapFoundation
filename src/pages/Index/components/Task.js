import React from 'react';
import { Menu, Empty, Modal } from 'antd';
import { inject, observer } from 'mobx-react';
import AdLocalStorage from 'src/utils/AdLocalStorage';
import { TASK_TYPE } from 'src/config/TaskConfig';
import 'less/components/sider.less';
import ToolIcon from 'src/components/ToolIcon';
import CONFIG from 'src/config';
import { saveTaskData } from 'src/utils/taskUtils';
import { initBoundary, getCheckReport, getMarkerList } from 'src/utils/TaskStart';
import { editLock } from 'src/utils/decorator';

const processNameOptions = CONFIG.processNameOptions;

@inject('DefineModeStore')
@inject('TextStore')
@inject('RenderModeStore')
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
        const {
            isLocal,
            processName,
            taskId,
            nodeDesc,
            manualStatusDesc,
            task_sub_type,
            hasPostprocessCheck
        } = task;
        if (isLocal) {
            let processNameLabel = processNameOptions.find(option => option.value === processName)
                .label;
            return `${taskId}-${processNameLabel}`;
        }
        const taskSubTypeLabel = TASK_TYPE[task_sub_type] || '底图新增';
        const hasPostprocessCheckLabel = hasPostprocessCheck == 1 ? '【制图后处理】' : '';
        return `${taskId}-${taskSubTypeLabel}-${nodeDesc}-${manualStatusDesc}${hasPostprocessCheckLabel}`;
    };

    @editLock
    chooseTask = (e, id, isEdit) => {
        const { current: currentTaskId } = this.state;
        if (currentTaskId == id && !isEdit) return;
        const { OperateHistoryStore } = this.props;
        let { currentNode, savedNode } = OperateHistoryStore;
        let shouldSave = currentNode > savedNode;
        if (shouldSave) {
            Modal.confirm({
                title: '提示： 当前任务未保存。',
                okText: '保存并切换',
                cancelText: '取消',
                okType: 'danger',
                maskStyle: { zIndex: 99999999 },
                zIndex: 999999999,
                onOk: async () => {
                    await saveTaskData();
                    this.toggleTask(id, isEdit);
                }
            });
        } else {
            this.toggleTask(id, isEdit);
        }
    };

    toggleTask = (id, isEdit) => {
        //防抖，减少重置画布次数
        this.timeout && clearTimeout(this.timeout);
        this.timeout = setTimeout(async () => {
            try {
                const { current } = this.state;
                const { TaskStore } = this.props;
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

                await TaskStore.setActiveTask(id);
                if (isEdit) await TaskStore.startTaskEdit(id);

                //先浏览再开始任务
                if (activeTaskId === id && isEdit) {
                    getCheckReport(); //获取检查结果
                    getMarkerList(); //获取质检标注
                    initBoundary(true); //获取周边底图
                }

                this.setState({ current: id });
            } catch (e) {
                console.log(`切换任务报错：${e.message || e}`);
            }
        }, 1000);
    };
}

export default Task;
