import DataLayerStore from 'src/pages/Index/store/DataLayerStore';
import AttributeStore from 'src/pages/Index/store/AttributeStore';
import PictureShowStore from 'src/pages/Index/store/PictureShowStore';
import ResourceLayerStore from 'src/pages/Index/store/ResourceLayerStore';
import RightMenuStore from 'src/pages/Index/store/RightMenuStore';
import TaskStore from 'src/pages/Index/store/TaskStore';
import RelStore from 'src/pages/Index/store/RelStore';
import AttrStore from 'src/pages/Index/store/AttrStore';
import VectorsStore from 'src/pages/Index/store/VectorsStore';
import CONFIG from 'src/config';
import { completeBoundaryUrl } from 'src/utils/taskUtils';

export const showPictureShowView = obj => {
    const { data } = obj;
    const { properties: activeTrackPoint } = data;
    window.trackLayer.unSelect();
    PictureShowStore.setPicData(obj.data);
    ResourceLayerStore.getTrackPart(activeTrackPoint);
};

export const showAttributesModal = (obj, event) => {
    //判断没有按住ctrl左击
    if ((event && event.ctrlKey) || (event && event.button === 2)) return;
    let editLayer = DataLayerStore.getEditLayer();
    let readonly = (editLayer && editLayer.layerId !== obj.layerId) || !editLayer;
    DataLayerStore.clearHighLightFeatures();
    AttributeStore.setModel(obj);
    AttributeStore.show(readonly);
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
    const editLayer = DataLayerStore.getEditLayer();
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
        const { activeTask, isEditableTask, getTaskFile } = TaskStore;
        const { vectors: vectorUrl, rels: relUrl, attrs: attrUrl } = getTaskFile() || {};
        //销毁indexDB的关联关系表和关联属性表
        await Promise.allSettled([RelStore.destroy(), AttrStore.destroy()]);
        //判断如果是“开始任务”，则重新获取当前任务和周边底图数据，更新indexDB表
        //判断如果是“浏览任务”，则重新获取当前任务，更新indexDB表
        if (isEditableTask) {
            const { boundaryAdsAll, boundaryRels, boundaryAttrs } = CONFIG.urlConfig;
            const boundaryVectorUrl = completeBoundaryUrl(boundaryAdsAll, activeTask);
            const boundaryRelUrl = completeBoundaryUrl(boundaryRels, activeTask);
            const boundaryAttrUrl = completeBoundaryUrl(boundaryAttrs, activeTask);
            await Promise.allSettled([
                window.vectorLayerGroup.resetData(vectorUrl),
                RelStore.addRecords(relUrl, 'current'),
                AttrStore.addRecords(attrUrl, 'current'),
                window.vectorLayerGroup.resetData(boundaryVectorUrl),
                RelStore.addRecords(boundaryRelUrl, 'boundary'),
                AttrStore.addRecords(boundaryAttrUrl, 'boundary')
            ]);
        } else {
            await Promise.allSettled([
                window.vectorLayerGroup.resetData(vectorUrl),
                RelStore.addRecords(relUrl, 'current'),
                AttrStore.addRecords(attrUrl, 'current')
            ]);
        }
        //更新高精数据图层
        VectorsStore.addLayer(window.vectorLayerGroup);
        return true;
    } catch (e) {
        console.error('更新数据失败', e.message ?? e ?? '');
    }
};
