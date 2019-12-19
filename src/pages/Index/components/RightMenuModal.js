import React from 'react';
import { Modal, Menu, message } from 'antd';
import { inject, observer } from 'mobx-react';
import { DATA_LAYER_MAP } from 'src/config/DataLayerConfig';
import {
    deleteLine,
    breakLine,
    mergeLine,
    breakLineByLine
} from 'src/utils/relCtrl/operateCtrl';
import { getLayerByName } from 'src/utils/vectorUtils';
import AdMessage from 'src/components/AdMessage';
import editLog from 'src/models/editLog';
import _ from 'lodash';
import AdEmitter from 'src/models/event';
import { getLayerIDKey } from 'src/utils/vectorUtils';

const EDIT_TYPE = [
    'delPoint',
    'copyLine',
    'changePoints',
    'insertPoints',
    'select_point',
    'reverseOrderLine',
    'create_break_line'
];

const CHINESE_EDIT_TYPE = [
    {
        type: 'delPoint',
        value: '删除形状点'
    },
    {
        type: 'copyLine',
        value: '复制线要素'
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
    },
    {
        type: 'reverseOrderLine',
        value: '点击进行线要素逆序'
    },
    {
        type: 'create_break_line',
        value: '绘制一条打断线'
    }
];

@inject('RightMenuStore')
@inject('NewFeatureStore')
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
            RightMenuStore: { visible, menus, zIndex },
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
                    zIndex={zIndex}
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
                            if (menus) {
                                return menus.includes(menu.key) && menu;
                            } else {
                                return (
                                    zIndex && menu.key !== 'breakGroup' && menu
                                );
                            }
                        })}
                    </Menu>
                </Modal>
            </div>
        );
    }

    getMenus = () => {
        const menuArr = [
            <Menu.Item
                id="delete-btn"
                key="delete"
                onClick={this.deleteFeature}
                style={{ marginTop: 0, marginBottom: 0, fontSize: 12 }}>
                <span>删除</span>
            </Menu.Item>,
            <Menu.Item
                id="insert-points-btn"
                key="insertPoints"
                onClick={this.insertPoints}
                style={{ marginTop: 0, marginBottom: 0, fontSize: 12 }}>
                <span>新增形状点</span>
            </Menu.Item>,
            <Menu.Item
                id="change-points-btn"
                key="changePoints"
                onClick={this.changePoints}
                style={{ marginTop: 0, marginBottom: 0, fontSize: 12 }}>
                <span>修改形状点</span>
            </Menu.Item>,
            <Menu.Item
                id="delete-points-btn"
                key="deletePoints"
                onClick={this.deletePoints}
                style={{ marginTop: 0, marginBottom: 0, fontSize: 12 }}>
                <span>删除形状点</span>
            </Menu.Item>,
            <Menu.Item
                id="break-line-btn"
                key="break"
                onClick={this.breakLine}
                style={{ marginTop: 0, marginBottom: 0, fontSize: 12 }}>
                <span>打断</span>
            </Menu.Item>,
            <Menu.Item
                id="reverse-order-line-btn"
                key="reverseOrderLine"
                onClick={this.reverseOrderLine}
                style={{ marginTop: 0, marginBottom: 0, fontSize: 12 }}>
                <span>线要素逆序</span>
            </Menu.Item>,
            <Menu.Item
                id="break-group-btn"
                key="breakGroup"
                onClick={this.breakLine}
                style={{ marginTop: 0, marginBottom: 0, fontSize: 12 }}>
                <span>齐打断</span>
            </Menu.Item>,
            <Menu.Item
                id="merge-line-btn"
                key="merge"
                onClick={this.mergeLine}
                style={{ marginTop: 0, marginBottom: 0, fontSize: 12 }}>
                <span>合并</span>
            </Menu.Item>,
            <Menu.Item
                id="batch-assign-btn"
                key="batchAssign"
                onClick={this.batchAssign}
                style={{ marginTop: 0, marginBottom: 0, fontSize: 12 }}>
                <span>批量赋值</span>
            </Menu.Item>,
            <Menu.Item
                id="break-by-line-btn"
                key="breakByLine"
                onClick={this.breakByLine}
                style={{ marginTop: 0, marginBottom: 0, fontSize: 12 }}>
                <span>拉线齐打断</span>
            </Menu.Item>
        ];

        // 俯视图模式下，显示复制功能
        if (this.props.DataLayerStore.isTopView) {
            menuArr.splice(
                1,
                0,
                <Menu.Item
                    id="copy-btn"
                    key="copyLine"
                    onClick={this.copyLine}
                    style={{ marginTop: 0, marginBottom: 0, fontSize: 12 }}>
                    <span>复制</span>
                </Menu.Item>
            );
        }

        return menuArr;
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
        const { RightMenuStore, DataLayerStore } = this.props;
        RightMenuStore.hide();
        //关闭右键菜单时，取消选择
        DataLayerStore.exitEdit();
    };

    installListener = () => {
        const { DataLayerStore } = this.props;
        DataLayerStore.setBreakCallback(this.breakCallBack);
        DataLayerStore.setCopyLineCallback(this.copyLineCallback);
        DataLayerStore.setBreakByLineCallback(this.breakByLineCallback);
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
            // let arr = result.desc.split(':');
            // let desc = arr[arr.length - 1];
            message.warning('未选择打断点', 3);
            DataLayerStore.exitEdit();
            return;
        }
        let { activeTask } = TaskStore;
        Modal.confirm({
            title: '您确认执行操作？',
            okText: '确定',
            okType: 'danger',
            cancelText: '取消',
            onOk: async () => {
                let features = RightMenuStore.getFeatures();
                try {
                    let historyLog = await breakLine(
                        result[0],
                        features,
                        activeTask
                    );
                    let history = {
                        type: 'updateFeatureRels',
                        data: historyLog
                    };
                    let log = {
                        operateHistory: history,
                        action: 'breakLine',
                        result: 'success'
                    };
                    OperateHistoryStore.add(history);
                    editLog.store.add(log);
                    AdEmitter.emit('fetchViewAttributeData');
                } catch (e) {
                    //console.log(e);
                    message.warning('操作失败:' + e.message, 3);
                    let history = {
                        features,
                        breakNode: result[0]
                    };
                    let log = {
                        operateHistory: history,
                        action: 'breakLine',
                        result: 'fail',
                        failReason: e.message
                    };
                    editLog.store.add(log);
                }
                DataLayerStore.exitEdit();
                AttributeStore.hideRelFeatures();
            },
            onCancel() {
                DataLayerStore.exitEdit();
                AttributeStore.hideRelFeatures();
            }
        });
    };

    copyLineCallback = async result => {
        const {
            DataLayerStore,
            RightMenuStore,
            NewFeatureStore,
            OperateHistoryStore,
            AttributeStore
        } = this.props;
        // console.log(result);

        if (!RightMenuStore.isCurrentLayer) {
            message.warning('只能选取当前编辑图层要素！', 3);
            return false;
        }

        let data;
        try {
            //判断是否绘制成功
            if (result.errorCode) {
                // 解析sdk抛出异常信息
                let arr = result.desc.split(':');
                let desc = arr[arr.length - 1];
                throw desc;
            }

            let feature = RightMenuStore.getFeatures()[0];
            let IDKey = getLayerIDKey(feature.layerName);
            delete feature.data.properties[IDKey];

            // 请求id服务，申请id
            data = await NewFeatureStore.init(result);
            data.data.properties = {
                ...data.data.properties,
                ...feature.data.properties
            };
            // 更新id到sdk
            DataLayerStore.updateFeature(data);
            let history = {
                type: 'addFeature',
                feature: data.data,
                layerName: data.layerName
            };
            let log = {
                operateHistory: history,
                action: 'copyLine',
                result: 'success'
            };
            OperateHistoryStore.add(history);
            editLog.store.add(log);
        } catch (e) {
            if (data) {
                let layer = DataLayerStore.getEditLayer();
                layer.layer.removeFeatureById(data.uuid);
            }
            message.warning('操作失败:' + e, 3);
        }
        DataLayerStore.exitEdit();
        AttributeStore.hideRelFeatures();
    };

    deleteFeature = () => {
        const {
            RightMenuStore,
            OperateHistoryStore,
            DataLayerStore,
            AttributeStore,
            TaskStore
        } = this.props;

        if (!RightMenuStore.isCurrentLayer) {
            message.warning('只能选取当前编辑图层要素！', 3);
            return false;
        }

        Modal.confirm({
            title: '您确认删除该要素？',
            okText: '确定',
            okType: 'danger',
            cancelText: '取消',
            onOk: async () => {
                let result = RightMenuStore.delete();
                let historyLog = await deleteLine(result, TaskStore.activeTask);
                //console.log(result, historyLog);

                DataLayerStore.exitEdit();
                AttributeStore.hideRelFeatures();
                AttributeStore.hide();
                let history = {
                    type: 'updateFeatureRels',
                    data: historyLog
                };
                let log = {
                    operateHistory: history,
                    action: 'deleteFeature',
                    result: 'success'
                };
                OperateHistoryStore.add(history);
                editLog.store.add(log);
                AdEmitter.emit('fetchViewAttributeData');
            },
            onCancel() {
                DataLayerStore.exitEdit();
                AttributeStore.hideRelFeatures();
            }
        });
        RightMenuStore.hide();
    };

    copyLine = () => {
        const { RightMenuStore, DataLayerStore } = this.props;
        if (!RightMenuStore.isCurrentLayer) {
            message.warning('只能选取当前编辑图层要素！', 3);
            return false;
        }
        DataLayerStore.dragCopyedFeature();
        RightMenuStore.hide();
    };

    insertPoints = () => {
        const { DataLayerStore, RightMenuStore } = this.props;

        if (!RightMenuStore.isCurrentLayer) {
            message.warning('只能选取当前编辑图层要素！', 3);
            return false;
        }

        DataLayerStore.insertPoints();
        RightMenuStore.hide();
    };

    changePoints = () => {
        const { DataLayerStore, RightMenuStore } = this.props;

        if (!RightMenuStore.isCurrentLayer) {
            message.warning('只能选取当前编辑图层要素！', 3);
            return false;
        }

        DataLayerStore.changePoints();
        RightMenuStore.hide();
    };

    deletePoints = () => {
        const { DataLayerStore, RightMenuStore } = this.props;

        if (!RightMenuStore.isCurrentLayer) {
            message.warning('只能选取当前编辑图层要素！', 3);
            return false;
        }

        DataLayerStore.deletePoints();
        RightMenuStore.hide();
    };

    breakLine = () => {
        const { DataLayerStore, RightMenuStore } = this.props;

        if (!RightMenuStore.isCurrentLayer) {
            message.warning('只能选取当前编辑图层要素！', 3);
            return false;
        }

        DataLayerStore.selectPointFromHighlight();
        RightMenuStore.hide();
    };

    reverseOrderLine = () => {
        const {
            RightMenuStore,
            DataLayerStore,
            AttributeStore,
            OperateHistoryStore
        } = this.props;

        if (!RightMenuStore.isCurrentLayer) {
            message.warning('只能选取当前编辑图层要素！', 3);
            return false;
        }
        Modal.confirm({
            title: '您确认执行线要素逆序操作？',
            okText: '确定',
            okType: 'danger',
            cancelText: '取消',
            onOk: async () => {
                let features = RightMenuStore.getFeatures();

                try {
                    let oldFeatures = _.cloneDeep(features);
                    let newFeatures = features.map(item => {
                        item.data.geometry.coordinates.reverse();
                        return item;
                    });
                    let layer = getLayerByName(newFeatures[0].layerName);
                    layer.updateFeatures(newFeatures);

                    DataLayerStore.exitEdit();
                    AttributeStore.hideRelFeatures();
                    let historyLog = {
                        features: [oldFeatures, newFeatures]
                    };
                    let history = {
                        type: 'updateFeatureRels',
                        data: historyLog
                    };
                    let log = {
                        operateHistory: history,
                        action: 'reverseOrderLine',
                        result: 'success'
                    };
                    OperateHistoryStore.add(history);
                    editLog.store.add(log);
                    message.success('线要素逆序已完成', 3);
                } catch (e) {
                    message.warning('线要素逆序处理失败', 3);
                    let history = { features };
                    let log = {
                        operateHistory: history,
                        action: 'reverseOrderLine',
                        result: 'fail',
                        failReason: e.message
                    };
                    editLog.store.add(log);
                }
            },
            onCancel() {
                DataLayerStore.exitEdit();
                AttributeStore.hideRelFeatures();
            }
        });

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

        if (!RightMenuStore.isCurrentLayer) {
            message.warning('只能选取当前编辑图层要素！', 3);
            return false;
        }

        let { activeTask } = TaskStore;
        Modal.confirm({
            title: '您确认执行操作？',
            okText: '确定',
            okType: 'danger',
            cancelText: '取消',
            onOk: async () => {
                let features = RightMenuStore.getFeatures();
                try {
                    let historyLog = await mergeLine(features, activeTask);
                    let history = {
                        type: 'updateFeatureRels',
                        data: historyLog
                    };
                    let log = {
                        operateHistory: history,
                        action: 'mergeLine',
                        result: 'success'
                    };
                    OperateHistoryStore.add(history);
                    editLog.store.add(log);
                    AdEmitter.emit('fetchViewAttributeData');
                } catch (e) {
                    console.log(e);
                    message.warning('操作失败:' + e.message, 3);
                    let history = { features };
                    let log = {
                        operateHistory: history,
                        action: 'mergeLine',
                        result: 'fail',
                        failReason: e.message
                    };
                    editLog.store.add(log);
                }
                DataLayerStore.exitEdit();
                AttributeStore.hideRelFeatures();
            },
            onCancel() {
                DataLayerStore.exitEdit();
                AttributeStore.hideRelFeatures();
            }
        });
        RightMenuStore.hide();
    };

    batchAssign = () => {
        const { RightMenuStore, BatchAssignStore } = this.props;

        if (!RightMenuStore.isCurrentLayer) {
            message.warning('只能选取当前编辑图层要素！', 3);
            return false;
        }

        let features = RightMenuStore.getFeatures();
        BatchAssignStore.show(features);
        RightMenuStore.hide();
    };

    breakByLine = () => {
        const { DataLayerStore, RightMenuStore } = this.props;

        if (!RightMenuStore.isCurrentLayer) {
            message.warning('只能选取当前编辑图层要素！', 3);
            return false;
        }

        DataLayerStore.createBreakLine();
        RightMenuStore.hide();
    };

    breakByLineCallback = result => {
        const {
            DataLayerStore,
            RightMenuStore,
            OperateHistoryStore,
            AttributeStore,
            TaskStore
        } = this.props;

        if (result.errorCode) {
            message.warning('打断辅助线绘制失败', 3);
            DataLayerStore.exitEdit();
            return;
        }
        let { activeTask } = TaskStore;
        Modal.confirm({
            title: '您确认执行操作？',
            okText: '确定',
            okType: 'danger',
            cancelText: '取消',
            onOk: async () => {
                let features = RightMenuStore.getFeatures();
                try {
                    let historyLog = await breakLineByLine(
                        result,
                        features,
                        activeTask
                    );
                    let history = {
                        type: 'updateFeatureRels',
                        data: historyLog
                    };
                    let log = {
                        operateHistory: history,
                        action: 'breakLineByLine',
                        result: 'success'
                    };
                    OperateHistoryStore.add(history);
                    editLog.store.add(log);
                    AdEmitter.emit('fetchViewAttributeData');
                } catch (e) {
                    //console.log(e);
                    message.warning('操作失败:' + e.message, 3);
                    let history = {
                        features,
                        breakLine: result
                    };
                    let log = {
                        operateHistory: history,
                        action: 'breakLineByLine',
                        result: 'fail',
                        failReason: e.message
                    };
                    editLog.store.add(log);
                }
                DataLayerStore.exitEdit();
                AttributeStore.hideRelFeatures();
            },
            onCancel() {
                DataLayerStore.exitEdit();
                AttributeStore.hideRelFeatures();
            }
        });
    };
}

export default RightMenuModal;
