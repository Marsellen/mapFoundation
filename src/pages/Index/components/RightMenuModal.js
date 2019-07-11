import React from 'react';
import { Modal, Menu } from 'antd';
import { inject, observer } from 'mobx-react';
import { DATA_LAYER_MAP } from 'src/config/DataLayerConfig';

@inject('RightMenuStore')
@inject('OperateHistoryStore')
@inject('DataLayerStore')
@observer
class RightMenuModal extends React.Component {
    render() {
        const { visible, option } = this.props.RightMenuStore;
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
                        return (
                            option &&
                            DATA_LAYER_MAP[
                                option.layerName
                            ].rightTools.includes(menu.key) &&
                            menu
                        );
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
                style={{ marginTop: 0, marginBottom: 0 }}>
                <span>删除</span>
            </Menu.Item>,
            <Menu.Item
                key="insertPoints"
                onClick={this.insertPoints}
                style={{ marginTop: 0, marginBottom: 0 }}>
                <span>新增形状点</span>
            </Menu.Item>,
            <Menu.Item
                key="changePoints"
                onClick={this.changePoints}
                style={{ marginTop: 0, marginBottom: 0 }}>
                <span>修改形状点</span>
            </Menu.Item>,
            <Menu.Item
                key="deletePoints"
                onClick={this.deletePoints}
                style={{ marginTop: 0, marginBottom: 0 }}>
                <span>删除形状点</span>
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
                RightMenuStore.delete(result => {
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
}

export default RightMenuModal;
