import React from 'react';
import { Menu } from 'antd';
import { inject, observer } from 'mobx-react';

@inject('taskStore')
@inject('AttributeStore')
@observer
class Task extends React.Component {
    componentDidMount() {
        this.props.taskStore.init();
    }

    render() {
        const { taskStore } = this.props;
        return (
            <Menu className="menu">
                {taskStore.tasks &&
                    taskStore.tasks.map(item => (
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
    }

    toggleTask = id => {
        const { taskStore, AttributeStore } = this.props;
        taskStore.setActiveTaskId(id);
        AttributeStore.hide();
    };
}

export default Task;
