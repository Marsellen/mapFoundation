import React from 'react';
import { Menu, Empty, Modal } from 'antd';
import { inject, observer } from 'mobx-react';
import AdLocalStorage from 'src/util/adLocalStorage';
import { TASK_TYPE } from 'src/config/taskConfig';
import 'less/sider.less';
import ToolIcon from 'src/component/common/toolIcon';
import CONFIG from 'src/config';
import { saveTaskData } from 'src/util/taskUtils';
import { editLock } from 'src/util/decorator';
import BuriedPoint from 'src/util/buriedPoint';
import AdEmitter from 'src/util/event';

const processNameOptions = CONFIG.processNameOptions;

@inject('TaskStore')
@inject('OperateHistoryStore')
@inject('DataLayerStore')
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
                                <span>{this.getTaskLabel(item)}</span>
                                <ToolIcon
                                    icon="kaishi"
                                    className="task-start-button"
                                    disabled={isEditableTask && taskIndex && index == taskIndex}
                                    action={e => this.chooseTask(e, item.taskId)}
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
            postProcess
        } = task;
        if (isLocal) {
            let processNameLabel = processNameOptions.find(
                option => option.value === processName
            ).label;
            return `${taskId}-${processNameLabel}`;
        }
        const taskSubTypeLabel = TASK_TYPE[task_sub_type] || '底图新增';
        const postProcessLabel =
            postProcess == 1 ? '【制图后处理】' : postProcess == 2 ? '【二次质检】' : '';
        return `${taskId}-${taskSubTypeLabel}-${nodeDesc}-${manualStatusDesc}${postProcessLabel}`;
    };

    @editLock
    chooseTask = (e, id) => {
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
                    await saveTaskData('toggle_task');
                    this.toggleTask(id);
                }
            });
        } else {
            this.toggleTask(id);
        }
    };

    toggleTask = id => {
        //防抖，减少重置画布次数
        this.timeout && clearTimeout(this.timeout);
        this.timeout = setTimeout(async () => {
            try {
                await BuriedPoint.buriedPointEnd('toggle_task');

                const { current } = this.state;
                const { TaskStore, DataLayerStore } = this.props;
                const { taskIdList } = TaskStore;

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
                DataLayerStore.exitEdit();
                await TaskStore.setActiveTask(id);
                await TaskStore.startTaskEdit(id);
                this.setState({ current: id });
                AdEmitter.emit('taskChanged');
            } catch (e) {
                console.log(`切换任务报错：${e.message || e}`);
            }
        }, 1000);
    };
}

export default Task;
