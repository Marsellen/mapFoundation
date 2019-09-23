import React from 'react';
import { Menu, Empty, Modal } from 'antd';
import { inject, observer } from 'mobx-react';
import { getAuthentication, getCurrentEditingTaskId } from 'src/utils/Session';

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
    componentDidMount() {
        const userInfo = getAuthentication();
        const { userName, taskId } = getCurrentEditingTaskId();
        if (userInfo.username === userName && taskId) {
            this.setState({
                current: taskId
            });
        }
    }

    render() {
        const { TaskStore } = this.props;
        const { tasks } = TaskStore;
        // const { activeTaskId } = TaskStore;

        if (tasks && tasks.length > 0) {
            let index = tasks.findIndex(
                item => item.taskId === this.state.current
            );
            index = index === -1 ? '0' : index.toString();
            return (
                <Menu className="menu" selectedKeys={[index]}>
                    {tasks.map((item, index) => (
                        <Menu.Item
                            key={index}
                            onClick={() => {
                                this.chooseTask(item.taskId);
                            }}>
                            <span>{`${item.taskId}-${item.nodeDesc}-${item.manualStatusDesc}`}</span>
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

    chooseTask = id => {
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
                    this.toggleTask(id);
                }
            });
        } else {
            this.toggleTask(id);
        }
    };

    toggleTask = id => {
        const {
            TaskStore,
            AttributeStore,
            OperateHistoryStore,
            DataLayerStore,
            ToolCtrlStore,
            PictureShowStore
        } = this.props;
        TaskStore.setActiveTask(id);
        OperateHistoryStore.destroy();
        DataLayerStore.activeEditor();
        ToolCtrlStore.updateByEditLayer();
        AttributeStore.hide();
        PictureShowStore.hide();
        this.setState({
            current: id
        });
    };
}

export default Task;
