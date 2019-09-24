import React from 'react';
import { Modal, Menu, message } from 'antd';
import { inject, observer } from 'mobx-react';
import { DATA_LAYER_MAP } from 'src/config/DataLayerConfig';
import {
    deleteLine,
    breakLine,
    mergeLine
} from 'src/utils/relCtrl/operateCtrl';
import AdMessage from 'src/components/AdMessage';

const EDIT_TYPE = ['delPoint', 'changePoints', 'insertPoints', 'select_point'];

const CHINESE_EDIT_TYPE = [
    {
        type: 'delPoint',
        value: '删除形状点'
    },
    {
        type: 'changePoints',
        value: '修改形状点'
    },
    {
        type: 'insertPoints',
        value: '新增形状点'
    },
    {
        type: 'select_point',
        value: '选择一个点进行打断'
    }
];

@inject('RightMenuStore')
@inject('OperateHistoryStore')
@inject('DataLayerStore')
@inject('AttributeStore')
@inject('TaskStore')
@inject('BatchAssignStore')
@observer
class RightMenuModal extends React.Component {
    componentDidMount() {
        this.installListener();
    }

    render() {
        const {
            RightMenuStore: { visible, menus },
            DataLayerStore: { editType }
        } = this.props;
        if (!visible) {
            let messageVisible = EDIT_TYPE.includes(editType);
            return (
                <AdMessage visible={messageVisible} content={this.content()} />
            );
        }

        return (
            <div>
                <Modal
                    visible={visible}
                    footer={null}
                    title={null}
                    mask={false}
                    closable={false}
                    style={{
                        position: 'absolute',
                        paddingBottom: 0,
                        ...this.getPosition()
                    }}
                    width={100}
                    bodyStyle={{ padding: 0, fontSize: 12 }}
                    onCancel={this.handleCancel}>
                    <Menu className="menu">
                        {this.getMenus().map(menu => {
                            return menus.includes(menu.key) && menu;
                        })}
                    </Menu>
                </Modal>
            </div>
        );
    }

    getMenus = () => {
        return [
            <Menu.Item
                key="delete"
                onClick={this.deleteFeature}
                style={{ marginTop: 0, marginBottom: 0, fontSize: 12 }}>
                <span>删除</span>
            </Menu.Item>,
            <Menu.Item
                key="insertPoints"
                onClick={this.insertPoints}
                style={{ marginTop: 0, marginBottom: 0, fontSize: 12 }}>
                <span>新增形状点</span>
            </Menu.Item>,
            <Menu.Item
                key="changePoints"
                onClick={this.changePoints}
                style={{ marginTop: 0, marginBottom: 0, fontSize: 12 }}>
                <span>修改形状点</span>
            </Menu.Item>,
            <Menu.Item
                key="deletePoints"
                onClick={this.deletePoints}
                style={{ marginTop: 0, marginBottom: 0, fontSize: 12 }}>
                <span>删除形状点</span>
            </Menu.Item>,
            <Menu.Item
                key="break"
                onClick={this.breakLine}
                style={{ marginTop: 0, marginBottom: 0, fontSize: 12 }}>
                <span>打断</span>
            </Menu.Item>,
            <Menu.Item
                key="breakGroup"
                onClick={this.breakLine}
                style={{ marginTop: 0, marginBottom: 0, fontSize: 12 }}>
                <span>齐打断</span>
            </Menu.Item>,
            <Menu.Item
                key="merge"
                onClick={this.mergeLine}
                style={{ marginTop: 0, marginBottom: 0, fontSize: 12 }}>
                <span>合并</span>
            </Menu.Item>,
            <Menu.Item
                key="batchAssign"
                onClick={this.batchAssign}
                style={{ marginTop: 0, marginBottom: 0, fontSize: 12 }}>
                <span>批量赋值</span>
            </Menu.Item>
        ];
    };

    content = () => {
        const {
            DataLayerStore: { editType }
        } = this.props;
        let config = CHINESE_EDIT_TYPE.find(item => item.type == editType);
        const text = config ? config.value : '';
        return <div>{text}</div>;
    };

    getPosition = () => {
        const { option } = this.props.RightMenuStore;
        if (!option) return { top: -1000, left: -1000 };
        let { x, y } = option;
        if (x + 100 > innerWidth) {
            x = x - 100;
        }
        let num = DATA_LAYER_MAP[option.layerName]
            ? DATA_LAYER_MAP[option.layerName].rightTools.length
            : 0;
        if (y + 40 * num > innerHeight) {
            y = y - 40 * num;
        }
        return { top: y, left: x };
    };

    handleCancel = e => {
        const { RightMenuStore } = this.props;
        RightMenuStore.hide();
    };

    installListener = () => {
        const { DataLayerStore } = this.props;
        DataLayerStore.setBreakCallback(this.breakCallBack);
    };

    breakCallBack = result => {
        const {
            DataLayerStore,
            RightMenuStore,
            OperateHistoryStore,
            AttributeStore,
            TaskStore
        } = this.props;
        if (result.errorCode) {
            let arr = result.desc.split(':');
            let desc = arr[arr.length - 1];
            message.warning(desc, 3);
            DataLayerStore.clearChoose();
            return;
        }
        let {
            activeTask: { taskId: task_id }
        } = TaskStore;
        Modal.confirm({
            title: '您确认执行操作？',
            okText: '确定',
            okType: 'danger',
            cancelText: '取消',
            onOk: async () => {
                try {
                    let features = RightMenuStore.getFeatures();
                    let historyLog = await breakLine(
                        result[0],
                        features,
                        task_id
                    );
                    // console.log(result);
                    OperateHistoryStore.add({
                        type: 'updateFeatureRels',
                        data: historyLog
                    });
                    message.success('操作完成', 3);
                } catch (e) {
                    console.log(e);
                    message.warning('操作失败:' + e.message, 3);
                }
                DataLayerStore.clearChoose();
                AttributeStore.hideRelFeatures();
            },
            onCancel() {
                DataLayerStore.clearChoose();
                AttributeStore.hideRelFeatures();
            }
        });
    };

    deleteFeature = () => {
        const {
            RightMenuStore,
            OperateHistoryStore,
            DataLayerStore,
            AttributeStore
        } = this.props;
        Modal.confirm({
            title: '您确认删除该要素？',
            okText: '确定',
            okType: 'danger',
            cancelText: '取消',
            onOk: async () => {
                let result = RightMenuStore.delete();
                let historyLog = await deleteLine(result);
                DataLayerStore.clearChoose();
                AttributeStore.hideRelFeatures();
                OperateHistoryStore.add({
                    type: 'updateFeatureRels',
                    data: historyLog
                });
            }
        });
    };

    insertPoints = () => {
        const { DataLayerStore, RightMenuStore } = this.props;
        DataLayerStore.insertPoints();
        RightMenuStore.hide();
    };

    changePoints = () => {
        const { DataLayerStore, RightMenuStore } = this.props;
        DataLayerStore.changePoints();
        RightMenuStore.hide();
    };

    deletePoints = () => {
        const { DataLayerStore, RightMenuStore } = this.props;
        DataLayerStore.deletePoints();
        RightMenuStore.hide();
    };

    breakLine = () => {
        const { DataLayerStore, RightMenuStore } = this.props;
        DataLayerStore.selectPointFromHighlight();
        RightMenuStore.hide();
    };

    mergeLine = () => {
        const {
            RightMenuStore,
            DataLayerStore,
            OperateHistoryStore,
            AttributeStore,
            TaskStore
        } = this.props;
        let {
            activeTask: { taskId: task_id }
        } = TaskStore;
        Modal.confirm({
            title: '您确认执行操作？',
            okText: '确定',
            okType: 'danger',
            cancelText: '取消',
            onOk: async () => {
                try {
                    let features = RightMenuStore.getFeatures();
                    let historyLog = await mergeLine(features, task_id);
                    OperateHistoryStore.add({
                        type: 'updateFeatureRels',
                        data: historyLog
                    });
                    message.success('操作完成', 3);
                } catch (e) {
                    console.log(e);
                    message.warning('操作失败:' + e.message, 3);
                }
                DataLayerStore.clearChoose();
                AttributeStore.hideRelFeatures();
            },
            onCancel() {
                DataLayerStore.clearChoose();
                AttributeStore.hideRelFeatures();
            }
        });
        RightMenuStore.hide();
    };

    batchAssign = () => {
        const { RightMenuStore, BatchAssignStore } = this.props;
        let features = RightMenuStore.getFeatures();
        BatchAssignStore.show(features);
        RightMenuStore.hide();
    };
}

export default RightMenuModal;
