import React from 'react';
import { Menu, Empty, Modal } from 'antd';
import { inject, observer } from 'mobx-react';
import { setTaskScaleStorage } from 'src/utils/vectorUtils';
import editLog from 'src/models/editLog';

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
        const { validTasks } = TaskStore;

        if (validTasks && validTasks.length > 0) {
            let index = validTasks.findIndex(
                item => item.taskId === this.state.current
            );
            index = index === -1 ? '0' : index.toString();
            return (
                <Menu className="menu" selectedKeys={[index]}>
                    {validTasks.map((item, index) => (
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
        editLog.store.clear();
        DataLayerStore.activeEditor();
        ToolCtrlStore.updateByEditLayer();
        AttributeStore.hide();
        PictureShowStore.hide();
        PictureShowStore.destory();

        // 切换任务时，保存上一个任务的缩放比例
        if (this.state.current) {
            const preTaskScale = map.getEyeView();
            setTaskScaleStorage(this.state.current, preTaskScale);
        }

        this.setState({
            current: id
        });
    };
}

export default Task;
