import React from 'react';
import { Modal, Menu, message } from 'antd';
import { inject, observer } from 'mobx-react';
import {
    deleteLine,
    forceDelete,
    batchMergeLine,
    breakLine,
    mergeLine,
    breakLineByLine
} from 'src/utils/relCtrl/operateCtrl';
import { getLayerByName, checkSdkError } from 'src/utils/vectorUtils';
import AdMessage from 'src/components/AdMessage';
import _ from 'lodash';
import {
    getLayerIDKey,
    isRegionContainsElement,
    modUpdStatGeometry,
    layerUpdateFeatures
} from 'src/utils/vectorUtils';
import { isManbuildTask } from 'src/utils/taskUtils';
import { logDecorator } from 'src/utils/decorator';
import BatchAssignStore from 'src/pages/Index/store/BatchAssignStore';
import ToolCtrlStore from 'src/pages/Index/store/ToolCtrlStore';
import appStore from 'src/store/appStore';
import AttributeStore from 'src/pages/Index/store/AttributeStore';
import NewFeatureStore from 'src/pages/Index/store/NewFeatureStore';
import TaskStore from 'src/pages/Index/store/TaskStore';

import 'src/assets/less/components/right-menu-modal.less';

const EDIT_TYPE = [
    'move_point_feature',
    'copy_line',
    'change_points',
    'break_line',
    'reverse_order_line',
    'create_line_break_line'
];

const CHINESE_EDIT_TYPE = [
    {
        type: 'move_point_feature',
        value: '左键选择新点位，点击右键实现平移'
    },
    {
        type: 'copy_line',
        value: '复制线要素'
    },
    {
        type: 'change_points',
        value: '修改形状点'
    },
    {
        type: 'break_line',
        value: '在线上选择一个打断点，右键执行打断'
    },
    {
        type: 'reverse_order_line',
        value: '点击进行线要素逆序'
    },
    {
        type: 'create_line_break_line',
        value: '两点绘制一条打断线，右键执行打断'
    }
];

@inject('RightMenuStore')
@inject('DataLayerStore')
@observer
class RightMenuModal extends React.Component {
    componentDidMount() {
        this.installListener();
    }

    render() {
        const {
            RightMenuStore: { visible, zIndex },
            DataLayerStore: { editType }
        } = this.props;
        if (!visible) {
            let messageVisible = EDIT_TYPE.includes(editType);
            return <AdMessage visible={messageVisible} content={this.content()} />;
        }
        const menuList = this.menuList();

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
                        ...this.getPosition(menuList)
                    }}
                    className="right-menu-modal"
                    onCancel={this.handleCancel}
                >
                    <Menu className="menu">{menuList}</Menu>
                </Modal>
            </div>
        );
    }

    menuList = () => {
        const { menus, zIndex } = this.props.RightMenuStore;
        return this.getMenus().map(menu => {
            if (menus) {
                return menus.includes(menu.key) && menu;
            } else {
                return zIndex && menu;
            }
        });
    };

    getMenus = () => {
        const menuArr = [
            <Menu.Item
                id="set-edit-layer-btn"
                key="setEditLayer"
                onClick={this.setEditLayerFeature}
                className="right-menu-item"
            >
                <span>设置为可编辑图层</span>
            </Menu.Item>,
            <Menu.Item
                id="delete-btn"
                key="delete"
                onClick={this.deleteFeature}
                className="right-menu-item"
            >
                <span>删除</span>
            </Menu.Item>,
            <Menu.Item
                id="force-delete-btn"
                key="forceDelete"
                onClick={this.forceDeleteFeature}
                className="right-menu-item"
            >
                <span>强制删除</span>
            </Menu.Item>,
            <Menu.Item
                id="change-points-btn"
                key="changePoints"
                onClick={this.changePoints}
                className="right-menu-item"
            >
                <span>修改形状点</span>
            </Menu.Item>,
            <Menu.Item
                id="break-line-btn"
                key="break"
                onClick={this.breakLine}
                className="right-menu-item"
            >
                <span>打断</span>
            </Menu.Item>,
            <Menu.Item
                id="reverse-order-line-btn"
                key="reverseOrderLine"
                onClick={this.reverseOrderLine}
                className="right-menu-item"
            >
                <span>线要素逆序</span>
            </Menu.Item>,
            <Menu.Item id="trim-btn" key="trim" onClick={this.trim} className="right-menu-item">
                <span>修整</span>
            </Menu.Item>,
            <Menu.Item
                id="break-group-btn"
                key="breakGroup"
                onClick={this.breakLine}
                className="right-menu-item"
            >
                <span>齐打断</span>
            </Menu.Item>,
            <Menu.Item
                id="merge-line-btn"
                key="merge"
                onClick={this.mergeLine}
                className="right-menu-item"
            >
                <span>合并</span>
            </Menu.Item>,
            <Menu.Item
                id="batch-merge-btn"
                key="batchMerge"
                onClick={this.batchMergeLine}
                className="right-menu-item"
            >
                <span>批量线合并</span>
            </Menu.Item>,
            <Menu.Item
                id="batch-assign-btn"
                key="batchAssign"
                onClick={this.batchAssign}
                className="right-menu-item"
            >
                <span>批量赋值</span>
            </Menu.Item>,
            <Menu.Item
                id="break-by-line-btn"
                key="breakByLine"
                onClick={this.breakByLine}
                className="right-menu-item"
            >
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
                    className="right-menu-item"
                >
                    <span>复制</span>
                </Menu.Item>,
                <Menu.Item
                    id="translation-point-btn"
                    key="movePointFeature"
                    onClick={this.movePointFeature}
                    className="right-menu-item"
                >
                    <span>平移</span>
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

    getPosition = menuList => {
        const { option } = this.props.RightMenuStore;
        if (!option) return { top: -1000, left: -1000 };
        let { x, y } = option;
        if (x + 100 > innerWidth) {
            x = x - 100;
        }
        let num = _.compact(menuList).length;
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
        DataLayerStore.setBreakCallback(result => {
            this.breakCallBack(result);
        });
        DataLayerStore.setCopyLineCallback(result => {
            this.copyLineCallback(result);
        });
        DataLayerStore.setMovePointFeatureCallback(result => {
            this.movePointFeatureCallback(result);
        });
        DataLayerStore.setBreakByLineCallback(result => {
            this.breakByLineCallback(result);
        });
    };

    @logDecorator({ operate: '线打断', onlyRun: true })
    breakCallBack(result) {
        try {
            checkSdkError(result, '未选择打断点');
            this.breakLineHandler(result);
        } catch (e) {
            message.error(e.message);
            throw e;
        }
    }

    @logDecorator({ operate: '线打断' })
    async breakLineHandler(result) {
        const { RightMenuStore } = this.props;
        let features = RightMenuStore.getFeatures();
        try {
            let historyLog = await breakLine(result[0], features, TaskStore.activeTask);
            return historyLog;
        } catch (e) {
            message.warning('打断失败：' + e.message, 3);
            throw e;
        }
    }

    @logDecorator({ operate: '复制线要素', skipRenderMode: true })
    async copyLineCallback(result) {
        const { DataLayerStore, RightMenuStore } = this.props;
        let data;
        try {
            checkSdkError(result);
            this.regionCheck(result);
            let feature = RightMenuStore.getFeatures()[0];
            let IDKey = getLayerIDKey(feature.layerName);
            {
                delete feature.data.properties[IDKey];
                delete feature.data.properties.UPD_STAT;
                delete feature.data.properties.CONFIDENCE;
            }
            // 请求id服务，申请id
            data = await NewFeatureStore.init(result, isManbuildTask());
            data.data.properties = {
                ...data.data.properties,
                ...feature.data.properties
            };
            // 更新id到sdk
            DataLayerStore.updateFeature(data);
            let history = {
                features: [[], [data]]
            };
            return history;
        } catch (e) {
            if (result) {
                let layer = DataLayerStore.getEditLayer();
                layer.layer.removeFeatureById(result.uuid);
            }
            message.warning('复制线要素失败：' + e.message, 3);
            throw e;
        }
    }

    @logDecorator({ operate: '平移点要素', onlyRun: true })
    movePointFeatureCallback(result) {
        const { RightMenuStore } = this.props;
        checkSdkError(result);
        const oldFeature = RightMenuStore.getFeatures()[0];
        this.movePointFeatureHandler(result, oldFeature);
    }

    @logDecorator({ operate: '平移点要素', skipRenderMode: true })
    async movePointFeatureHandler(result, oldFeature) {
        try {
            this.regionCheck(result);
            // 更新标识
            if (!isManbuildTask()) {
                result = modUpdStatGeometry(result);
            }
            let history = {
                features: [[oldFeature], [result]]
            };
            message.success('平移成功', 3);
            return history;
        } catch (e) {
            message.warning('平移点要素失败：' + e.message, 3);
            DataLayerStore.updateFeature(oldFeature);
            throw e;
        }
    }

    regionCheck = data => {
        const { DataLayerStore } = this.props;
        let isLocal = TaskStore.activeTask.isLocal;
        if (isLocal) return;
        //判断要素是否在任务范围内
        const elementGeojson = _.cloneDeep(data.data);
        let isInRegion = isRegionContainsElement(elementGeojson, DataLayerStore.regionGeojson);
        if (!isInRegion) {
            throw new Error('绘制失败，请在任务范围内绘制');
        }
    };

    setEditLayerFeature = () => {
        //设置可编辑图层交互
        const { RightMenuStore, DataLayerStore } = this.props;
        const { features } = RightMenuStore;
        let userInfo = appStore.loginUser;
        let layer = DataLayerStore.activeEditor(features[0].layerName);
        ToolCtrlStore.updateByEditLayer(layer, userInfo);
        AttributeStore.hide();
        AttributeStore.hideRelFeatures();
        RightMenuStore.hide();
    };

    deleteFeature = () => {
        const { RightMenuStore, DataLayerStore } = this.props;
        if (this.checkDisabled()) return;
        if (DataLayerStore.changeUnAble()) {
            return message.error({
                content: '请先结束当前编辑操作！',
                duration: 3,
                key: 'edit_error'
            });
        }
        this.deleteFeatureHandler();
        RightMenuStore.hide();
    };

    @logDecorator({ operate: '删除要素' })
    async deleteFeatureHandler() {
        const { RightMenuStore, DataLayerStore } = this.props;
        DataLayerStore.setEditType('delete');
        let result = RightMenuStore.delete();
        let historyLog = await deleteLine(result, TaskStore.activeTask);
        AttributeStore.hideRelFeatures();
        AttributeStore.hide();
        return historyLog;
    }

    forceDeleteFeature = () => {
        const { RightMenuStore, DataLayerStore } = this.props;
        if (this.checkDisabled()) return;
        if (DataLayerStore.changeUnAble()) {
            return message.error({
                content: '请先结束当前编辑操作！',
                duration: 3,
                key: 'edit_error'
            });
        }
        Modal.confirm({
            title: '您确认强制删除此要素？删除时关联属性和关联关系不会连带删除',
            okText: '确定',
            okType: 'danger',
            cancelText: '取消',
            onOk: this.forceDeleteFeatureHandler.bind(this),
            onCancel() {
                DataLayerStore.exitEdit();
            }
        });
        RightMenuStore.hide();
    };

    @logDecorator({ operate: '强制删除要素' })
    async forceDeleteFeatureHandler() {
        const { RightMenuStore, DataLayerStore } = this.props;
        DataLayerStore.setEditType('force_delete');
        let result = RightMenuStore.delete();
        let historyLog = await forceDelete(result, TaskStore.activeTask);
        AttributeStore.hideRelFeatures();
        AttributeStore.hide();
        return historyLog;
    }

    copyLine = () => {
        const { RightMenuStore, DataLayerStore } = this.props;
        if (this.checkDisabled()) return;
        if (DataLayerStore.changeUnAble()) {
            return message.error({
                content: '请先结束当前编辑操作！',
                duration: 3,
                key: 'edit_error'
            });
        }
        DataLayerStore.dragCopyedFeature();
        RightMenuStore.hide();
        AttributeStore.hideRelFeatures();
    };

    changePoints = () => {
        const { DataLayerStore, RightMenuStore } = this.props;
        if (this.checkDisabled()) return;
        if (DataLayerStore.changeUnAble()) {
            return message.error({
                content: '请先结束当前编辑操作！',
                duration: 3,
                key: 'edit_error'
            });
        }
        DataLayerStore.changePoints();
        RightMenuStore.hide();
        AttributeStore.hide();
        AttributeStore.hideRelFeatures();
    };

    movePointFeature = () => {
        const { DataLayerStore, RightMenuStore } = this.props;
        if (this.checkDisabled()) return;
        if (DataLayerStore.changeUnAble()) {
            return message.error({
                content: '请先结束当前编辑操作！',
                duration: 3,
                key: 'edit_error'
            });
        }
        DataLayerStore.movePointFeature();
        RightMenuStore.hide();
        AttributeStore.hide();
        AttributeStore.hideRelFeatures();
    };

    breakLine = () => {
        const { DataLayerStore, RightMenuStore } = this.props;
        if (this.checkDisabled()) return;
        if (DataLayerStore.changeUnAble()) {
            return message.error({
                content: '请先结束当前编辑操作！',
                duration: 3,
                key: 'edit_error'
            });
        }
        DataLayerStore.selectPointFromHighlight();
        RightMenuStore.hide();
        AttributeStore.hide();
        AttributeStore.hideRelFeatures();
    };

    reverseOrderLine = () => {
        const { RightMenuStore, DataLayerStore } = this.props;
        if (this.checkDisabled()) return;
        if (DataLayerStore.changeUnAble()) {
            return message.error({
                content: '请先结束当前编辑操作！',
                duration: 3,
                key: 'edit_error'
            });
        }
        this.reverseOrderLineHandler();
        RightMenuStore.hide();
    };

    @logDecorator({ operate: '线要素逆序' })
    reverseOrderLineHandler() {
        try {
            const { RightMenuStore, DataLayerStore } = this.props;
            DataLayerStore.setEditType('reverse_order_line');
            let features = RightMenuStore.getFeatures();
            let oldFeatures = _.cloneDeep(features);
            let newFeatures = features.map(item => {
                item.data.geometry.coordinates.reverse();
                return item;
            });
            let layer = getLayerByName(newFeatures[0].layerName);
            layerUpdateFeatures(layer, newFeatures);
            let historyLog = {
                features: [oldFeatures, newFeatures]
            };
            message.success('线要素逆序已完成', 3);
            return historyLog;
        } catch (e) {
            message.warning('线要素逆序处理失败：' + e.message, 3);
            throw e;
        }
    }

    mergeLine = () => {
        const { RightMenuStore, DataLayerStore } = this.props;
        if (this.checkDisabled()) return;
        if (DataLayerStore.changeUnAble()) {
            return message.error({
                content: '请先结束当前编辑操作！',
                duration: 3,
                key: 'edit_error'
            });
        }
        this.mergeLineHandler();
        RightMenuStore.hide();
        AttributeStore.hide();
        AttributeStore.hideRelFeatures();
    };

    @logDecorator({ operate: '合并线要素' })
    async mergeLineHandler() {
        try {
            const { RightMenuStore, DataLayerStore } = this.props;
            DataLayerStore.setEditType('merge_line');
            let features = RightMenuStore.getFeatures();
            let historyLog = await mergeLine(features, TaskStore.activeTask);
            return historyLog;
        } catch (e) {
            message.warning('合并失败：' + e.message, 3);
            throw e;
        }
    }

    batchMergeLine = () => {
        const { RightMenuStore, DataLayerStore } = this.props;
        if (this.checkDisabled()) return;
        if (DataLayerStore.changeUnAble()) {
            return message.error({
                content: '请先结束当前编辑操作！',
                duration: 3,
                key: 'edit_error'
            });
        }
        this.batchMergeLineHandler();
        RightMenuStore.hide();
        AttributeStore.hide();
        AttributeStore.hideRelFeatures();
    };

    @logDecorator({ operate: '批量线合并' })
    async batchMergeLineHandler() {
        try {
            const { RightMenuStore, DataLayerStore } = this.props;
            DataLayerStore.setEditType('batch_merge_line');
            let features = RightMenuStore.getFeatures();
            let historyLog = await batchMergeLine(features, TaskStore.activeTask);
            return historyLog;
        } catch (e) {
            message.warning('批量线合并失败：' + e.message, 3);
            throw e;
        }
    }

    batchAssign = () => {
        const { DataLayerStore, RightMenuStore } = this.props;
        if (this.checkDisabled()) return;
        if (DataLayerStore.changeUnAble()) {
            return message.error({
                content: '请先结束当前编辑操作！',
                duration: 3,
                key: 'edit_error'
            });
        }
        let features = RightMenuStore.getFeatures();
        BatchAssignStore.show(features);
        RightMenuStore.hide();
        AttributeStore.hide();
    };

    breakByLine = () => {
        const { DataLayerStore, RightMenuStore } = this.props;
        if (this.checkDisabled()) return;
        if (DataLayerStore.changeUnAble()) {
            return message.error({
                content: '请先结束当前编辑操作！',
                duration: 3,
                key: 'edit_error'
            });
        }
        DataLayerStore.createBreakLine();
        RightMenuStore.hide();
        AttributeStore.hide();
        AttributeStore.hideRelFeatures();
    };

    @logDecorator({ operate: '拉线齐打断', onlyRun: true })
    breakByLineCallback(result) {
        try {
            checkSdkError(result, '打断辅助线绘制失败');
            this.breakByLineHandler(result);
        } catch (e) {
            message.error(e.message);
            throw e;
        }
    }

    @logDecorator({ operate: '拉线齐打断' })
    async breakByLineHandler(result) {
        const { RightMenuStore } = this.props;
        let features = RightMenuStore.getFeatures();
        try {
            let historyLog = await breakLineByLine(result, features, TaskStore.activeTask);
            return historyLog;
        } catch (e) {
            message.warning('拉线齐打断失败：' + e.message, 3);
            throw e;
        }
    }

    trim = () => {
        const { DataLayerStore, RightMenuStore } = this.props;
        if (this.checkDisabled()) return;
        if (DataLayerStore.changeUnAble()) {
            return message.error({
                content: '请先结束当前编辑操作！',
                duration: 3,
                key: 'edit_error'
            });
        }
        DataLayerStore.trim();
        RightMenuStore.hide();
        AttributeStore.hide();
        AttributeStore.hideRelFeatures();
    };

    checkDisabled = () => {
        const { RightMenuStore } = this.props;
        const { features, isCurrentLayer } = RightMenuStore;
        if (!features) return true;
        if (!isCurrentLayer) {
            message.warning('只能选取当前编辑图层要素！', 3);
            return true;
        }
    };
}

export default RightMenuModal;
