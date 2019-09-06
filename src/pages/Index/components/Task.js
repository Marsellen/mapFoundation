import React from 'react';
import { Menu, Empty, Modal } from 'antd';
import { inject, observer } from 'mobx-react';

@inject('taskStore')
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
    componentDidMount() {
        // this.props.taskStore.init();
    }

    handleClick = e => {
        this.setState({
            current: e.key
        });
    };

    render() {
        const { taskStore } = this.props;
        const { tasks } = taskStore;
        // const { activeTaskId } = taskStore;

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
                                this.chooseTask(
                                    item.Input_imp_data_path,
                                    item.taskId
                                );
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

    chooseTask = (path, id) => {
        const { taskStore } = this.props;
        taskStore.setActiveTask(id);
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
                    this.toggleTask(path);
                }
            });
        } else {
            this.toggleTask(path);
        }
        this.setState({
            current: id
        });
    };

    toggleTask = path => {
        const {
            taskStore,
            AttributeStore,
            OperateHistoryStore,
            DataLayerStore,
            ToolCtrlStore
        } = this.props;
        taskStore.setActiveTaskId(path);
        OperateHistoryStore.destroy();
        DataLayerStore.activeEditor();
        ToolCtrlStore.updateByEditLayer();
        AttributeStore.hide();
    };
}

export default Task;
