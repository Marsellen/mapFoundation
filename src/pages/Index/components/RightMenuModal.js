import React from 'react';
import { Modal, Menu, message } from 'antd';
import { inject, observer } from 'mobx-react';
import { DATA_LAYER_MAP } from 'src/config/DataLayerConfig';
import { breakLine, mergeLine } from 'src/utils/relCtrl/operateCtrl';

@inject('RightMenuStore')
@inject('OperateHistoryStore')
@inject('DataLayerStore')
@observer
class RightMenuModal extends React.Component {
    componentDidMount() {
        this.installListener();
    }

    render() {
        const { visible, menus } = this.props.RightMenuStore;
        if (!visible) {
            return <div />;
        }
        return (
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
            </Menu.Item>
        ];
    };

    getPosition = () => {
        const { option } = this.props.RightMenuStore;
        if (!option) return { top: -1000, left: -1000 };
        let { x, y } = option || { x: 0, y: 0 };
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
            OperateHistoryStore
        } = this.props;
        if (result.errorCode) {
            let arr = result.desc.split(':');
            let desc = arr[arr.length - 1];
            message.warning(desc, 3);
            DataLayerStore.clearChoose();
            return;
        }
        Modal.confirm({
            title: '您确认执行操作？',
            okText: '确定',
            okType: 'danger',
            cancelText: '取消',
            onOk() {
                let features = RightMenuStore.getFeatures();
                breakLine(result[0], features)
                    .then(result => {
                        console.log(result);
                        OperateHistoryStore.add({
                            type: 'updateFeatureRels',
                            data: result
                        });
                        message.success('操作完成', 3);
                    })
                    .catch(e => {
                        console.log(e);
                        message.warning('操作失败', 3);
                    });
                DataLayerStore.clearChoose();
            },
            onCancel() {
                DataLayerStore.clearChoose();
            }
        });
    };

    deleteFeature = () => {
        const {
            RightMenuStore,
            OperateHistoryStore,
            DataLayerStore
        } = this.props;
        Modal.confirm({
            title: '您确认删除该要素？',
            okText: '确定',
            okType: 'danger',
            cancelText: '取消',
            onOk() {
                let result = RightMenuStore.delete()[0];
                let feature = result.data;
                let layerName = result.layerName;
                let layer = DataLayerStore.getLayerByName(layerName);
                layer.layer.removeFeatureById(result.uuid);
                DataLayerStore.clearChoose();
                OperateHistoryStore.add({
                    type: 'deleteFeature',
                    feature,
                    layerName
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
            OperateHistoryStore
        } = this.props;
        Modal.confirm({
            title: '您确认执行操作？',
            okText: '确定',
            okType: 'danger',
            cancelText: '取消',
            onOk() {
                let features = RightMenuStore.getFeatures();
                mergeLine(features)
                    .then(result => {
                        // console.log(result);
                        OperateHistoryStore.add({
                            type: 'updateFeatureRels',
                            data: result
                        });
                        message.success('操作完成', 3);
                        DataLayerStore.clearChoose();
                    })
                    .catch(e => {
                        console.log(e);
                        message.warning('操作失败', 3);
                        DataLayerStore.clearChoose();
                    });
            },
            onCancel() {
                DataLayerStore.clearChoose();
            }
        });
        RightMenuStore.hide();
    };
}

export default RightMenuModal;
