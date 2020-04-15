import DataLayerStore from 'src/pages/Index/store/DataLayerStore';
import AttributeStore from 'src/pages/Index/store/AttributeStore';
import PictureShowStore from 'src/pages/Index/store/PictureShowStore';
import ResourceLayerStore from 'src/pages/Index/store/ResourceLayerStore';
import RightMenuStore from 'src/pages/Index/store/RightMenuStore';

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
    let readonly =
        (editLayer && editLayer.layerId !== obj.layerId) || !editLayer;
    DataLayerStore.clearHighLightFeatures();
    AttributeStore.setModel(obj);
    AttributeStore.show(readonly);
};

export const showRightMenu = (features, event) => {
    const editLayer = DataLayerStore.getEditLayer();
    let layerName = editLayer && editLayer.layerName;

    let hasOtherFeature = features.find(
        feature => feature.layerName != layerName
    );

    const isCurrentLayer = layerName && !hasOtherFeature;

    // 左键，加载“右键菜单”，隐藏起来
    // console.log('features', features);
    if (event.button === 0) {
        RightMenuStore.show(
            features,
            {
                x: event.x,
                y: event.y
            },
            -1,
            isCurrentLayer
        );
    }

    //右键，加载“右键菜单”，显示出来
    if (event.button === 2) {
        AttributeStore.hide();
        RightMenuStore.show(
            features,
            {
                x: event.x,
                y: event.y
            },
            'auto',
            isCurrentLayer
        );
    }
};
