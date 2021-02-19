import React from 'react';
import { Modal, Menu, message } from 'antd';
import { inject, observer } from 'mobx-react';
import 'src/assets/less/components/right-menu-modal.less';
import { SELECT_OPTIONS, OPTION_LAYER_MAP } from 'config/PropertiesTableConfig';
import { getLayerIDKey, getLayerByName, modUpdStatRelation } from 'src/utils/vectorUtils';
import { logDecorator, editLock } from 'src/utils/decorator';
import { ATTR_SPEC_CONFIG } from 'src/config/AttrsConfig';
import Attr from 'src/models/attr';
import Relevance from 'src/models/relevance';
import { findRelDataById } from 'src/utils/vectorCtrl/propertyTableCtrl';

@inject('AttributeStore')
@inject('TaskStore')
@inject('DataLayerStore')
@inject('AttrRightMenuStore')
@observer
class AttrRightMenu extends React.Component {
    constructor(props) {
        super(props);
        const { AttrRightMenuStore } = this.props;
        const { registerForceDelete } = AttrRightMenuStore;
        registerForceDelete(this.handleForceDelete);
    }

    //检查当前编辑图层和要操作条目是否匹配
    checkLayer = () => {
        const { DataLayerStore, AttrRightMenuStore } = this.props;
        const { layerName } = AttrRightMenuStore;
        const editLayer = DataLayerStore.getEditLayer();
        if (!editLayer) {
            message.warning('只能选取当前编辑图层要素！', 3);
            return true;
        }
        const currentLayerName = editLayer.layerName;
        const enableLayerNames = OPTION_LAYER_MAP[layerName];
        const isEnableLayer = enableLayerNames.includes(currentLayerName);
        if (!isEnableLayer) {
            message.warning('只能选取当前编辑图层要素！', 3);
            return true;
        }
    };

    @editLock
    handleForceDelete = () => {
        const { AttrRightMenuStore, DataLayerStore } = this.props;
        if (this.checkLayer()) return;
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
            onOk: this.forceDeleteHandlerOk,
            onCancel: DataLayerStore.exitEdit
        });
        AttrRightMenuStore.hide();
    };

    forceDeleteHandlerOk = () => {
        const { AttrRightMenuStore } = this.props;
        const { layerName, hide } = AttrRightMenuStore;
        const selectOption = SELECT_OPTIONS.find(item => item.items.includes(layerName));
        switch (selectOption.type) {
            case 'vector':
                this.forceDeleteFeature();
                break;
            case 'rel':
                this.forceDeleteRel();
                break;
            case 'attr':
                this.forceDeleteAttr();
                break;
            case 'other':
                this.forceDeleteFeature();
                break;
            default:
                break;
        }
        hide();
    };

    //更新关联关系更新字段
    updateRelationUpdStat = (layerName, id) => {
        const IDKey = getLayerIDKey(layerName);
        const layer = getLayerByName(layerName);
        const option = { key: IDKey, value: id };
        const sdkFeature = layer.getFeatureByOption(option);
        if (!sdkFeature) return;
        const feature = sdkFeature.properties;
        modUpdStatRelation(feature);
        layer.updateFeatures([feature]);
    };

    @logDecorator({ operate: '属性列表-强制删除要素' })
    async forceDeleteFeature() {
        const { AttrRightMenuStore, AttributeStore } = this.props;
        const { layerName, currentData } = AttrRightMenuStore;
        //获取当前点击要素
        const IDKey = getLayerIDKey(layerName);
        const id = currentData[IDKey];
        const option = { key: IDKey, value: id };
        const layer = getLayerByName(layerName);
        const sdkFeature = layer.getFeatureByOption(option);
        const feature = sdkFeature.properties;
        //通过uuid删除要素
        layer.removeFeatureById(feature.uuid);
        //关闭弹窗
        AttributeStore.hideRelFeatures();
        AttributeStore.hide();
        //记录日志
        const historyLog = {
            features: [[feature], []],
            rels: [[], []],
            attrs: [[], []]
        };
        return historyLog;
    }

    @logDecorator({ operate: '属性列表-强制删除关联关系' })
    async forceDeleteRel() {
        const { AttrRightMenuStore, AttributeStore } = this.props;
        const { currentData } = AttrRightMenuStore;
        //找到关联关系
        const rel = await findRelDataById(currentData.REL_ID);
        //删除关联关系
        const relStore = Relevance.store;
        relStore.deleteById(rel.id);

        //更新关联关系更新字段
        const { objId, objSpec, relObjId, relObjSpec } = rel;
        this.updateRelationUpdStat(objSpec, objId);
        this.updateRelationUpdStat(relObjSpec, relObjId);

        //关闭弹窗
        AttributeStore.hideRelFeatures();
        AttributeStore.hide();
        //记录日志
        const historyLog = {
            features: [[], []],
            rels: [[rel], []],
            attrs: [[], []]
        };
        return historyLog;
    }

    @logDecorator({ operate: '属性列表-强制删除关联属性' })
    async forceDeleteAttr() {
        const { AttrRightMenuStore, AttributeStore } = this.props;
        const { layerName, currentData } = AttrRightMenuStore;
        //找到关联属性
        const { source, sourceId } = ATTR_SPEC_CONFIG.find(item => item.source === layerName);
        const sourceIdVal = currentData[sourceId];
        const attrStore = Attr.store;
        const attr = await attrStore.get([source, sourceIdVal], 'SOURCE_ID');
        //删除关联属性
        attrStore.deleteById(attr.id);
        //关闭弹窗
        AttributeStore.hideRelFeatures();
        AttributeStore.hide();
        //记录日志
        const historyLog = {
            features: [[], []],
            rels: [[], []],
            attrs: [[attr], []]
        };
        return historyLog;
    }

    render() {
        const { AttrRightMenuStore } = this.props;
        const { visible, MenuStyle, hide, zIndex } = AttrRightMenuStore;
        return (
            <Modal
                title={null}
                visible={visible}
                closable={false}
                footer={null}
                mask={false}
                style={MenuStyle}
                onCancel={hide}
                zIndex={zIndex}
                destroyOnClose={true}
                className="right-menu-modal"
            >
                <Menu>
                    <Menu.Item
                        id="force-delete-btn"
                        className="right-menu-item"
                        onClick={this.handleForceDelete}
                    >
                        强制删除
                    </Menu.Item>
                </Menu>
            </Modal>
        );
    }
}

export default AttrRightMenu;
