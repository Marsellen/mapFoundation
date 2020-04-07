import React from 'react';
import { Modal, Menu, message } from 'antd';
import { inject, observer } from 'mobx-react';
import { DATA_LAYER_MAP } from 'src/config/DataLayerConfig';
import {
    deleteLine,
    breakLine,
    mergeLine,
    breakLineByLine,
} from 'src/utils/relCtrl/operateCtrl';
import { getLayerByName } from 'src/utils/vectorUtils';
import AdMessage from 'src/components/AdMessage';
import editLog from 'src/models/editLog';
import _ from 'lodash';
import AdEmitter from 'src/models/event';
import {
    getLayerIDKey,
    isRegionContainsElement,
    modUpdStatGeometry,
    layerUpdateFeatures,
} from 'src/utils/vectorUtils';
import { isManbuildTask } from 'src/utils/taskUtils';
import 'src/assets/less/components/right-menu-modal.less';

const EDIT_TYPE = [
    'delPoint',
    'movePointFeature',
    'copyLine',
    'changePoints',
    'insertPoints',
    'select_point',
    'reverseOrderLine',
    'create_break_line',
];

const CHINESE_EDIT_TYPE = [
    {
        type: 'delPoint',
        value: '删除形状点',
    },
    {
        type: 'movePointFeature',
        value: '左键选择新点位，点击右键实现平移',
    },
    {
        type: 'copyLine',
        value: '复制线要素',
    },
    {
        type: 'changePoints',
        value: '修改形状点',
    },
    {
        type: 'insertPoints',
        value: '新增形状点',
    },
    {
        type: 'select_point',
        value: '在线上选择一个打断点，右键执行打断',
    },
    {
        type: 'reverseOrderLine',
        value: '点击进行线要素逆序',
    },
    {
        type: 'create_break_line',
        value: '两点绘制一条打断线，右键执行打断',
    },
];

@inject('RenderModeStore')
@inject('RightMenuStore')
@inject('NewFeatureStore')
@inject('OperateHistoryStore')
@inject('DataLayerStore')
@inject('AttributeStore')
@inject('TaskStore')
@inject('BatchAssignStore')
@inject('ToolCtrlStore')
@inject('appStore')
@observer
class RightMenuModal extends React.Component {
    componentDidMount() {
        this.installListener();
    }

    render() {
        const {
            RightMenuStore: { visible, menus, zIndex },
            DataLayerStore: { editType },
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
                        ...this.getPosition(),
                    }}
                    width={136}
                    bodyStyle={{ padding: 0, fontSize: 12 }}
                    onCancel={this.handleCancel}>
                    <Menu className="menu">
                        {this.getMenus().map((menu) => {
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
                id="set-edit-layer-btn"
                key="setEditLayer"
                onClick={this.setEditLayerFeature}
                style={{ marginTop: 0, marginBottom: 0 }}>
                <span>设置可编辑图层</span>
                <span className="cut-line" />
            </Menu.Item>,
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
            </Menu.Item>,
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
                </Menu.Item>,
                <Menu.Item
                    id="translation-point-btn"
                    key="movePointFeature"
                    onClick={this.movePointFeature}
                    style={{ marginTop: 0, marginBottom: 0, fontSize: 12 }}>
                    <span>平移</span>
                </Menu.Item>
            );
        }

        return menuArr;
    };

    content = () => {
        const {
            DataLayerStore: { editType },
        } = this.props;
        let config = CHINESE_EDIT_TYPE.find((item) => item.type == editType);
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

    handleCancel = (e) => {
        const { RightMenuStore, DataLayerStore } = this.props;
        RightMenuStore.hide();
        //关闭右键菜单时，取消选择
        DataLayerStore.exitEdit();
    };

    installListener = () => {
        const { DataLayerStore } = this.props;
        DataLayerStore.setBreakCallback(this.breakCallBack);
        DataLayerStore.setCopyLineCallback(this.copyLineCallback);
        DataLayerStore.setMovePointFeatureCallback(
            this.movePointFeatureCallback
        );
        DataLayerStore.setBreakByLineCallback(this.breakByLineCallback);
    };

    breakCallBack = (result) => {
        const {
            DataLayerStore,
            RightMenuStore,
            OperateHistoryStore,
            AttributeStore,
            TaskStore,
            RenderModeStore,
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
                        data: historyLog,
                    };
                    let log = {
                        operateHistory: history,
                        action: 'breakLine',
                        result: 'success',
                    };
                    OperateHistoryStore.add(history);
                    editLog.store.add(log);
                    AdEmitter.emit('fetchViewAttributeData');
                    RenderModeStore.updateRels(history);
                } catch (e) {
                    //console.log(e);
                    message.warning('打断失败：' + e.message, 3);
                    let history = {
                        features,
                        breakNode: result[0],
                    };
                    let log = {
                        operateHistory: history,
                        action: 'breakLine',
                        result: 'fail',
                        failReason: e.message,
                    };
                    editLog.store.add(log);
                }
                DataLayerStore.exitEdit();
                AttributeStore.hideRelFeatures();
            },
            onCancel() {
                DataLayerStore.exitEdit();
                AttributeStore.hideRelFeatures();
            },
        });
    };

    copyLineCallback = async (result) => {
        const {
            DataLayerStore,
            RightMenuStore,
            NewFeatureStore,
            OperateHistoryStore,
            AttributeStore,
            TaskStore,
        } = this.props;
        // console.log(result);

        let data;
        try {
            //判断是否绘制成功
            if (result.errorCode) {
                DataLayerStore.exitEdit();
                return;
            }
            this.regionCheck(result);

            let feature = RightMenuStore.getFeatures()[0];
            let IDKey = getLayerIDKey(feature.layerName);
            {
                delete feature.data.properties[IDKey];
                delete feature.data.properties.UPD_STAT;
                delete feature.data.properties.CONFIDENCE;
            }

            // 请求id服务，申请id
            data = await NewFeatureStore.init(
                result,
                isManbuildTask(TaskStore.activeTask)
            );
            data.data.properties = {
                ...data.data.properties,
                ...feature.data.properties,
            };
            // 更新id到sdk
            DataLayerStore.updateFeature(data);
            let history = {
                type: 'addFeature',
                feature: data.data,
                layerName: data.layerName,
            };
            let log = {
                operateHistory: history,
                action: 'copyLine',
                result: 'success',
            };
            OperateHistoryStore.add(history);
            editLog.store.add(log);
            AdEmitter.emit('fetchViewAttributeData');
        } catch (e) {
            if (result) {
                let layer = DataLayerStore.getEditLayer();
                layer.layer.removeFeatureById(result.uuid);
            }
            message.warning('复制线要素失败：' + e.message, 3);
        }
        DataLayerStore.exitEdit();
        AttributeStore.hideRelFeatures();
    };

    movePointFeatureCallback = (result) => {
        const {
            DataLayerStore,
            OperateHistoryStore,
            RightMenuStore,
            TaskStore,
        } = this.props;
        if (result.errorCode) {
            DataLayerStore.exitEdit();
            return;
        }
        const oldFeature = RightMenuStore.getFeatures()[0];
        Modal.confirm({
            title: '您确认执行该操作？',
            okText: '确定',
            okType: 'danger',
            cancelText: '取消',
            onOk: async () => {
                try {
                    this.regionCheck(result);
                    // 更新标识
                    if (!isManbuildTask(TaskStore.activeTask)) {
                        result = modUpdStatGeometry(result);
                    }
                    let history = {
                        type: 'updateFeatureRels',
                        data: {
                            features: [[oldFeature], [result]],
                        },
                    };
                    let log = {
                        operateHistory: history,
                        action: 'movePointFeature',
                        result: 'success',
                    };
                    OperateHistoryStore.add(history);
                    editLog.store.add(log);
                    message.success('平移成功', 3);
                } catch (e) {
                    message.warning('平移点要素失败：' + e.message, 3);
                    DataLayerStore.updateFeature(oldFeature);
                }
                DataLayerStore.exitEdit();
            },
            onCancel() {
                // 恢复要素
                DataLayerStore.updateFeature(oldFeature);
                DataLayerStore.exitEdit();
            },
        });
    };

    regionCheck = (data) => {
        const { DataLayerStore, TaskStore } = this.props;
        let isLocal = TaskStore.activeTask.isLocal;
        if (isLocal) return;
        //判断要素是否在任务范围内
        const elementGeojson = _.cloneDeep(data.data);
        let isInRegion = isRegionContainsElement(
            elementGeojson,
            DataLayerStore.regionGeojson
        );
        if (!isInRegion) {
            throw new Error('绘制失败，请在任务范围内绘制');
        }
    };

    setEditLayerFeature = () => {
        //设置可编辑图层交互
        const {
            RightMenuStore,
            DataLayerStore,
            AttributeStore,
            ToolCtrlStore,
            appStore,
        } = this.props;
        const { features } = RightMenuStore;
        let userInfo = appStore.loginUser;
        let layer = DataLayerStore.activeEditor(features[0].layerName);
        ToolCtrlStore.updateByEditLayer(layer, userInfo);
        AttributeStore.hide();
        AttributeStore.hideRelFeatures();
    };

    deleteFeature = () => {
        const {
            RightMenuStore,
            OperateHistoryStore,
            DataLayerStore,
            AttributeStore,
            TaskStore,
            RenderModeStore,
        } = this.props;

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
                    data: historyLog,
                };
                let log = {
                    operateHistory: history,
                    action: 'deleteFeature',
                    result: 'success',
                };
                OperateHistoryStore.add(history);
                editLog.store.add(log);
                AdEmitter.emit('fetchViewAttributeData');
                RenderModeStore.updateRels(history);
            },
            onCancel() {
                DataLayerStore.exitEdit();
                AttributeStore.hideRelFeatures();
            },
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

    movePointFeature = () => {
        const { DataLayerStore, RightMenuStore } = this.props;

        DataLayerStore.movePointFeature();
        RightMenuStore.hide();
    };

    breakLine = () => {
        const { DataLayerStore, RightMenuStore } = this.props;

        DataLayerStore.selectPointFromHighlight();
        RightMenuStore.hide();
    };

    reverseOrderLine = () => {
        const {
            RightMenuStore,
            DataLayerStore,
            AttributeStore,
            OperateHistoryStore,
            RenderModeStore,
        } = this.props;

        Modal.confirm({
            title: '您确认执行线要素逆序操作？',
            okText: '确定',
            okType: 'danger',
            cancelText: '取消',
            onOk: async () => {
                let features = RightMenuStore.getFeatures();

                try {
                    let oldFeatures = _.cloneDeep(features);
                    let newFeatures = features.map((item) => {
                        item.data.geometry.coordinates.reverse();
                        return item;
                    });
                    let layer = getLayerByName(newFeatures[0].layerName);
                    //layer.updateFeatures(newFeatures);
                    layerUpdateFeatures(layer, newFeatures);

                    DataLayerStore.exitEdit();
                    AttributeStore.hideRelFeatures();
                    let historyLog = {
                        features: [oldFeatures, newFeatures],
                    };
                    let history = {
                        type: 'updateFeatureRels',
                        data: historyLog,
                    };
                    let log = {
                        operateHistory: history,
                        action: 'reverseOrderLine',
                        result: 'success',
                    };
                    OperateHistoryStore.add(history);
                    editLog.store.add(log);
                    message.success('线要素逆序已完成', 3);
                    RenderModeStore.updateRels(history);
                } catch (e) {
                    message.warning('线要素逆序处理失败：' + e.message, 3);
                    let history = { features };
                    let log = {
                        operateHistory: history,
                        action: 'reverseOrderLine',
                        result: 'fail',
                        failReason: e.message,
                    };
                    editLog.store.add(log);
                }
            },
            onCancel() {
                DataLayerStore.exitEdit();
                AttributeStore.hideRelFeatures();
            },
        });

        RightMenuStore.hide();
    };

    mergeLine = () => {
        const {
            RightMenuStore,
            DataLayerStore,
            OperateHistoryStore,
            AttributeStore,
            TaskStore,
            RenderModeStore,
        } = this.props;

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
                        data: historyLog,
                    };
                    let log = {
                        operateHistory: history,
                        action: 'mergeLine',
                        result: 'success',
                    };
                    OperateHistoryStore.add(history);
                    editLog.store.add(log);
                    AdEmitter.emit('fetchViewAttributeData');
                    RenderModeStore.updateRels(history);
                } catch (e) {
                    console.log(e);
                    message.warning('合并失败：' + e.message, 3);
                    let history = { features };
                    let log = {
                        operateHistory: history,
                        action: 'mergeLine',
                        result: 'fail',
                        failReason: e.message,
                    };
                    editLog.store.add(log);
                }
                DataLayerStore.exitEdit();
                AttributeStore.hideRelFeatures();
            },
            onCancel() {
                DataLayerStore.exitEdit();
                AttributeStore.hideRelFeatures();
            },
        });
        RightMenuStore.hide();
    };

    batchAssign = () => {
        const { RightMenuStore, BatchAssignStore } = this.props;

        let features = RightMenuStore.getFeatures();
        BatchAssignStore.show(features);
        RightMenuStore.hide();
    };

    breakByLine = () => {
        const { DataLayerStore, RightMenuStore } = this.props;

        DataLayerStore.createBreakLine();
        RightMenuStore.hide();
    };

    breakByLineCallback = (result) => {
        const {
            DataLayerStore,
            RightMenuStore,
            OperateHistoryStore,
            AttributeStore,
            TaskStore,
            RenderModeStore,
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
                        data: historyLog,
                    };
                    let log = {
                        operateHistory: history,
                        action: 'breakLineByLine',
                        result: 'success',
                    };
                    OperateHistoryStore.add(history);
                    editLog.store.add(log);
                    AdEmitter.emit('fetchViewAttributeData');
                    RenderModeStore.updateRels(history);
                } catch (e) {
                    //console.log(e);
                    message.warning('拉线齐打断失败：' + e.message, 3);
                    let history = {
                        features,
                        breakLine: result,
                    };
                    let log = {
                        operateHistory: history,
                        action: 'breakLineByLine',
                        result: 'fail',
                        failReason: e.message,
                    };
                    editLog.store.add(log);
                }
                DataLayerStore.exitEdit();
                AttributeStore.hideRelFeatures();
            },
            onCancel() {
                DataLayerStore.exitEdit();
                AttributeStore.hideRelFeatures();
            },
        });
    };
}

export default RightMenuModal;
