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

    handleClick = (e) => {
        this.setState({
            current: e.key
        })
    }

    render() {
        const { taskStore } = this.props;
        const { workData } = taskStore;
        // const { activeTaskId } = taskStore;

        if (workData && workData.length > 0) {
            return (
                <Menu className="menu" selectedKeys={[workData.filter(item => item.taskId.toString() === this.state.current).length > 0 ? this.state.current : workData[0].taskId.toString()]}  onClick={this.handleClick}>
                    {workData.map(item => (
                        <Menu.Item
                            key={item.taskId}
                            onClick={() => {
                                this.chooseTask(item.Input_imp_data_path, item.taskId);
                            }}>
                            <span>{`${item.taskId}-${item.nodeDesc}-${item.manualStatusDesc}`}</span>
                        </Menu.Item>
                    ))}
                </Menu>
            );
        } else {
            return this.renderNoData();
        }

        // if (taskStore.tasks && taskStore.tasks.length > 0) {
        //     return (
        //         <Menu className="menu" selectedKeys={[activeTaskId]}>
        //             {taskStore.tasks.map(item => (
        //                 <Menu.Item
        //                     key={item._id}
        //                     onClick={() => {
        //                         this.chooseTask(item._id);
        //                     }}>
        //                     <span>{item.name}</span>
        //                 </Menu.Item>
        //             ))}
        //         </Menu>
        //     );
        // } else {
        //     return this.renderNoData();
        // }
    }

    renderNoData = () => {
        return <Empty image={Empty.PRESENTED_IMAGE_SIMPLE} />;
    };

    chooseTask = (path, id) => {
        const { taskStore } = this.props;
        taskStore.setActiveTaskNames(id);
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
        })
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
