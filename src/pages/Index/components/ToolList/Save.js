import React from 'react';
import ToolIcon from 'src/components/ToolIcon';
import { inject, observer } from 'mobx-react';
import { message, Modal } from 'antd';
import config from 'src/config';
import { getAuthentication, logout } from 'src/utils/Session';

@inject('TaskStore')
@inject('OperateHistoryStore')
@inject('DataLayerStore')
@inject('ToolCtrlStore')
@observer
class Save extends React.Component {
    constructor(props) {
        super(props);
        this.loop();
    }

    render() {
        const { OperateHistoryStore } = this.props;
        let { currentNode, savedNode } = OperateHistoryStore;
        let shouldSave = currentNode > savedNode;
        return (
            <ToolIcon
                id="save-btn"
                icon="baocun"
                title="保存"
                disabled={!shouldSave}
                action={this.action}
            />
        );
    }

    action = async () => {
        await this.save();
        message.success('保存成功', 3);
    };

    save = async () => {
        const { TaskStore, OperateHistoryStore } = this.props;

        await TaskStore.submit();
        await TaskStore.writeEditLog();
        OperateHistoryStore.save();
    };

    loop = () => {
        let { timestamp, expireTime = config.expireTime } = getAuthentication();
        expireTime = expireTime > 3600 ? expireTime - 3600 : 0; // 提前一小时提醒
        let time = new Date(timestamp) - new Date() + expireTime * 1000;
        window.setTimeout(this.expireConfirm, time);

        window.setInterval(this.autoSave, config.autoSaveTime);
        this.loopLoadTask();
    };

    loopLoadTask = () => {
        window.setTimeout(this.loadTask, config.loopTaskTime);
    };

    autoSave = async () => {
        const { OperateHistoryStore, TaskStore } = this.props;
        let { currentNode, savedNode } = OperateHistoryStore;
        let shouldSave = currentNode > savedNode;
        if (shouldSave) {
            await TaskStore.submit();
            await TaskStore.writeEditLog();
            message.success('自动保存成功', 3);
        }
    };

    expireConfirm = () => {
        Modal.warning({
            title: '提示',
            content: '登录超时，请重新登录',
            okText: '保存并退出',
            keyboard: false,
            onOk: this.quitWithSave
        });
    };

    quitWithSave = async () => {
        await this.save();
        logout();
        location.reload();
    };

    loadTask = async () => {
        if (location.pathname === '/source') return; //手动加载任务不做任务移交挂起校验

        const { TaskStore, DataLayerStore, ToolCtrlStore } = this.props;
        const { tasks: oldTasks } = TaskStore;
        await TaskStore.initTask({ type: 4 });
        const { tasks: newTasks, activeTask } = TaskStore;

        let isTransfer =
            activeTask.taskId &&
            newTasks.length &&
            !newTasks.some(task => task.taskId == activeTask.taskId);

        if (isTransfer) {
            return Modal.warning({
                title: '提示',
                content: '当前任务已移交',
                okText: '保存并退出任务',
                keyboard: false,
                onOk: this.switchWithSave
            });
        }

        let newTasksMap = newTasks.reduce((total, task) => {
            total[task.taskId] = task;
            return total;
        }, {});
        let taskChangeList = oldTasks.map(task => {
            let newTask = newTasksMap[task.taskId];
            let newTaskStatus = newTask ? newTask.manualStatus : 'x';
            let oldTaskStatus = task.manualStatus;
            return {
                taskId: task.taskId,
                change: `${oldTaskStatus}-${newTaskStatus}`
            };
        });

        let activeTaskChange = taskChangeList.find(task => {
            return task.taskId == activeTask.taskId;
        });

        let change = activeTaskChange && activeTaskChange.change;
        let isStop = /-3/.test(change) && !/3-3/.test(change);
        if (isStop) {
            DataLayerStore.activeEditor();
            ToolCtrlStore.updateByEditLayer();

            return Modal.warning({
                title: '提示',
                content: '当前任务已挂起',
                okText: '保存并退出任务',
                keyboard: false,
                onOk: this.switchWithSave
            });
        }

        let restoreTasks = taskChangeList.filter(task => {
            let change = task.change;
            return /3-/.test(change) && !/3-3/.test(change);
        });
        if (restoreTasks.length) {
            let ids = restoreTasks.map(task => task.taskId).join('、');
            return Modal.info({
                title: '提示',
                content: `任务【${ids}】已恢复`,
                okText: '好的',
                onOk: this.loopLoadTask
            });
        }

        this.loopLoadTask();
    };

    switchWithSave = async () => {
        const { TaskStore } = this.props;
        await this.save();
        TaskStore.setActiveTask();
        this.loopLoadTask();
    };
}

export default Save;
