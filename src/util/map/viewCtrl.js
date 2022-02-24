import DataLayerStore from 'src/store/home/dataLayerStore';
import AttributeStore from 'src/store/home/attributeStore';
import PictureShowStore from 'src/store/home/pictureShowStore';
import ResourceLayerStore from 'src/store/home/resourceLayerStore';
import RightMenuStore from 'src/store/home/rightMenuStore';
import TaskStore from 'src/store/home/taskStore';
import RelStore from 'src/store/home/relStore';
import AttrStore from 'src/store/home/attrStore';
import VectorsStore from 'src/store/home/vectorsStore';

export const showPictureShowView = obj => {
    const { data } = obj;
    const { properties: activeTrackPoint } = data;
    window.trackLayer.unSelect();
    PictureShowStore.setPicData(data);
    ResourceLayerStore.selectLinkTrackByTrackPoint(activeTrackPoint);
    ResourceLayerStore.getTrackPart(activeTrackPoint);
};

export const showAttributesModal = (obj, event) => {
    //判断没有按住ctrl左击
    if ((event && event.ctrlKey) || (event && event.button === 2)) return;
    let editLayer = DataLayerStore.getAdEditLayer();
    let readonly = (editLayer && editLayer.layerId !== obj.layerId) || !editLayer;
    DataLayerStore.clearHighLightFeatures();
    AttributeStore.setModel(obj);
    AttributeStore.show(readonly, obj);
};

/**
 * 不是通过点击选中要素，无event，加载“右键菜单”，隐藏起来
 * 左键，加载“右键菜单”，隐藏起来
 * 右键，加载“右键菜单”，显示出来
 * @param {Array} features 选中要素
 * @param {Object} option 右键菜单位置
 * @param {String<Number>} zIndex 右键菜单z轴层级，控制右键菜单显隐
 * @param {<boolean} isCurrentLayer 判断所选要素和当前图层是否一致
 * @param {Object} event 鼠标点击事件的event对象，可用event判断本次操作是否鼠标点击事件
 */
export const showRightMenu = (features, event) => {
    const editLayer = DataLayerStore.getAdEditLayer();
    const layerName = editLayer && editLayer.layerName;
    const hasOtherFeature = features.find(feature => feature.layerName != layerName);
    const { x, y, button } = event || {};
    const isRightClick = button === 2;
    const option = event ? { x, y } : {};
    const zIndex = isRightClick ? 'auto' : -1;
    const isCurrentLayer = layerName && !hasOtherFeature;
    RightMenuStore.show(features, option, zIndex, isCurrentLayer, event);
};

//重新获取3个geojson，并更新画布
export const updateData = async () => {
    try {
        const { isEditableTask, taskFileMap, boundaryFileMap } = TaskStore;
        //销毁indexDB的关联关系表和关联属性表
        await Promise.allSettled([RelStore.destroy(), AttrStore.destroy()]);
        //判断如果是“开始任务”，则重新获取当前任务和周边底图数据，更新indexDB表
        //判断如果是“浏览任务”，则重新获取当前任务，更新indexDB表
        if (isEditableTask) {
            await Promise.allSettled([
                window.vectorLayerGroup.resetData(taskFileMap.vectors),
                RelStore.addRecords(taskFileMap.rels, 'current'),
                AttrStore.addRecords(taskFileMap.attrs, 'current'),
                RelStore.addRecords(boundaryFileMap.rels, 'boundary'),
                AttrStore.addRecords(boundaryFileMap.attrs, 'boundary')
            ]);
        } else {
            await Promise.allSettled([
                window.vectorLayerGroup.resetData(taskFileMap.vectors),
                RelStore.addRecords(taskFileMap.rels, 'current'),
                AttrStore.addRecords(taskFileMap.attrs, 'current')
            ]);
        }
        //更新高精数据图层
        VectorsStore.addLayer(window.vectorLayerGroup);
        return true;
    } catch (e) {
        console.error('更新数据失败', e.message ?? e ?? '');
    }
};