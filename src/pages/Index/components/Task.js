import React from 'react';
import { Menu, Empty } from 'antd';
import { inject, observer } from 'mobx-react';

@inject('taskStore')
@inject('AttributeStore')
@inject('OperateHistoryStore')
@inject('DataLayerStore')
@inject('ToolCtrlStore')
@observer
class Task extends React.Component {
    componentDidMount() {
        //this.props.taskStore.init();
    }

    render() {
        const { taskStore } = this.props;
        if (taskStore.tasks && taskStore.tasks.length > 0) {
            return (
                <Menu className="menu">
                    {taskStore.tasks.map(item => (
                        <Menu.Item
                            key={item._id}
                            onClick={() => {
                                this.toggleTask(item._id);
                            }}>
                            <span>{item.name}</span>
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

    toggleTask = id => {
        const {
            taskStore,
            AttributeStore,
            OperateHistoryStore,
            DataLayerStore,
            ToolCtrlStore
        } = this.props;
        taskStore.setActiveTaskId(id);
        OperateHistoryStore.destroy();
        DataLayerStore.activeEditor();
        ToolCtrlStore.updateByEditLayer();
        AttributeStore.hide();
    };
}

export default Task;
