import React from 'react';
import { Menu, Empty, Modal } from 'antd';
import { inject, observer } from 'mobx-react';

@inject('TaskStore')
@inject('AttributeStore')
@inject('OperateHistoryStore')
@inject('DataLayerStore')
@inject('ToolCtrlStore')
@observer
class Task extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            current: null
        };
    }

    handleClick = e => {
        this.setState({
            current: e.key
        });
    };

    render() {
        const { TaskStore } = this.props;
        const { tasks } = TaskStore;
        // const { activeTaskId } = TaskStore;

        if (tasks && tasks.length > 0) {
            return (
                <Menu
                    className="menu"
                    selectedKeys={[
                        tasks.filter(
                            item =>
                                item.taskId.toString() === this.state.current
                        ).length > 0
                            ? this.state.current
                            : tasks[0].taskId.toString()
                    ]}
                    onClick={this.handleClick}>
                    {tasks.map(item => (
                        <Menu.Item
                            key={item.taskId}
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
            ToolCtrlStore
        } = this.props;
        TaskStore.setActiveTask(id);
        OperateHistoryStore.destroy();
        DataLayerStore.activeEditor();
        ToolCtrlStore.updateByEditLayer();
        AttributeStore.hide();
        this.setState({
            current: id
        });
    };
}

export default Task;
