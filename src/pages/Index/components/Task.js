import React from 'react';
import { Menu, Empty, Modal, Button } from 'antd';
import { inject, observer } from 'mobx-react';
import AdLocalStorage from 'src/utils/AdLocalStorage';
import editLog from 'src/models/editLog';
import 'less/components/sider.less';

@inject('TaskStore')
@inject('AttributeStore')
@inject('OperateHistoryStore')
@inject('DataLayerStore')
@inject('ToolCtrlStore')
@inject('PictureShowStore')
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
                            <p>
                                <span
                                    onClick={e =>
                                        this.chooseTask(e, item.taskId, false)
                                    }>
                                    {`${item.taskId}-${item.nodeDesc}-${item.manualStatusDesc}`}
                                </span>
                                <Button
                                    className="task-start-button"
                                    disabled={
                                        isEditableTask &&
                                        taskIndex &&
                                        index == taskIndex
                                    }
                                    onClick={e =>
                                        this.chooseTask(e, item.taskId, true)
                                    }>
                                    开始
                                </Button>
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

    chooseTask = (e, id, isEditableTask) => {
        e.stopPropagation();
        const { OperateHistoryStore } = this.props;
        let { currentNode, savedNode } = OperateHistoryStore;
        let shouldSave = currentNode > savedNode;
        if (shouldSave) {
            Modal.confirm({
                title: '当前任务未保存，切换任务后会丢失，是否继续？',
                okText: '确定',
                cancelText: '取消',
                okType: 'danger',
                onOk: () => {
                    this.toggleTask(id, isEditableTask);
                    document.getElementById('save-btn').click();
                }
            });
        } else {
            this.toggleTask(id, isEditableTask);
        }
    };

    toggleTask(id, isEditableTask) {
        const {
            TaskStore,
            AttributeStore,
            OperateHistoryStore,
            DataLayerStore,
            ToolCtrlStore,
            PictureShowStore
        } = this.props;
        const { current: currentTaskId } = this.state;

        this.setState({
            current: id
        });

        TaskStore.setActiveTask(id);
        isEditableTask && TaskStore.startTaskEdit();
        OperateHistoryStore.destroy();
        editLog.store.clear();
        DataLayerStore.activeEditor();
        ToolCtrlStore.updateByEditLayer();
        AttributeStore.hide();
        PictureShowStore.hide();
        PictureShowStore.destory();

        // 切换任务时，保存上一个任务的缩放比例
        if (currentTaskId) {
            const preTaskScale = map.getEyeView();
            AdLocalStorage.setTaskInfosStorage({
                taskId: currentTaskId,
                taskScale: preTaskScale
            });
        }
    }
}

export default Task;
