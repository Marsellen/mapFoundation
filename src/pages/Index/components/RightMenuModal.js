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
        const { visible } = this.props.RightMenuStore;
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
                    <Menu.Item
                        key={0}
                        onClick={this.action}
                        style={{ marginTop: 0, marginBottom: 0 }}>
                        <span>删除</span>
                    </Menu.Item>
                </Menu>
            </Modal>
        );
    }

    getPosition = () => {
        const { option } = this.props.RightMenuStore;
        let { x, y } = option || { x: 0, y: 0 };
        if (x + 100 > innerWidth) {
            x = x - 100;
        }
        if (y + 40 > innerHeight) {
            y = y - 40;
        }
        return { top: y, left: x };
    };

    handleCancel = e => {
        const { RightMenuStore } = this.props;
        RightMenuStore.hide();
    };

    action = () => {
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
}

export default RightMenuModal;
