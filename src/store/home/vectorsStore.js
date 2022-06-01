import { observable, configure, flow, action, computed } from 'mobx';
import { DATA_LAYER_MAP, MB_EDIT_LAYER_MAP } from 'src/config/dataLayerConfig';
import vectorFactory from 'src/util/vectorCtrl/propertyTableCtrl';
import _ from 'lodash';
import axios from 'axios';
import { TYPE_SELECT_OPTION_MAP } from 'src/config/adMapDataConfig';
import Attr from 'src/util/attr';
const DATA_LAYER_CHECK_MAP = Object.values(MB_EDIT_LAYER_MAP).reduce((checkMap, layerNames) => {
    return layerNames.reduce(
        (_checkMap, layerName) => ({ ..._checkMap, [layerName]: true }),
        checkMap
    );
}, {});

configure({ enforceActions: 'always' });
class VectorsStore {
    layerMap = {};
    boundaryFeatures = new Set(); //[id,id...]
    @observable vectors = {};
    @observable layerType = 'vector';
    @observable updateKey;
    @observable firstPoint = [];
    @computed get isCheckedNone() {
        const type = this.layerType;
        if (!this.vectors[type]) return false;
        return Object.values(this.vectors[type]).every(checked => !checked);
    }
    @computed get isCheckedAll() {
        const type = this.layerType;
        if (!this.vectors[type]) return false;
        return Object.values(this.vectors[type]).every(checked => checked);
    }
    @computed get indeterminate() {
        const type = this.layerType;
        if (!this.vectors[type]) return false;
        let checkedValues = Object.values(this.vectors[type]);
        const checkeds = checkedValues.filter(checked => checked);
        return checkeds.length && checkeds.length !== checkedValues.length;
    }

    @action addLayer = layerGroup => {
        const { layers } = layerGroup;
        this.layerMap.vector = {};
        layers.forEach(layerItem => {
            const { layer, layerName } = layerItem;
            this.layerMap.vector[layerName] = layer;
        });
        this.vectors.vector = {
            checkMap: _.cloneDeep(DATA_LAYER_CHECK_MAP),
            disabled: false
        };
    };

    @action addBoundaryLayer = layerGroup => {
        const { layers } = layerGroup;
        this.layerMap.boundary = {};
        layers.forEach(layerItem => {
            const { layer, layerName } = layerItem;
            this.layerMap.boundary[layerName] = layer;
        });
        this.vectors.boundary = {
            checkMap: _.cloneDeep(DATA_LAYER_CHECK_MAP),
            disabled: false
        };

        this.boundaryFeatures = this.handleFeatures(layers);
    };

    //存储周边底图矢量数据
    handleFeatures = layers => {
        const featuresSet = new Set();

        layers.forEach(layerItem => {
            const { layer } = layerItem;
            if (!layer) return;
            const { layerName } = layer;
            const key = DATA_LAYER_MAP[layerName]?.id;
            if (!key) return;
            const features = layer.getAllFeatures();
            if (!features || features.length === 0) return;
            features.forEach(feature => {
                const id = feature.data.properties[key];
                if (!id) return;

                featuresSet.add(id);
            });
        });

        return featuresSet;
    };

    @action setLayerType = layerType => {
        this.layerType = layerType;
    };

    @action toggle = (name, checked) => {
        const type = this.layerType;
        if (!this.vectors[type]) return false;
        this.vectors[type].checkMap[name] = checked;
        const layer = this.layerMap?.[type]?.[name];
        checked ? layer?.show() : layer?.hide();
        this.updateKey = Math.random();
    };

    @action toggleStratification = (stratification, checked) => {
        const type = this.layerType;
        if (!this.vectors[type]) return false;
        MB_EDIT_LAYER_MAP[stratification].forEach(layerName => {
            this.vectors[type].checkMap[layerName] = checked;
            const layer = this.layerMap?.[type]?.[layerName];
            checked ? layer?.show() : layer?.hide();
        });
        this.updateKey = Math.random();
    };

    @action toggleAll = (checked, layerType, isInvert) => {
        const type = layerType || this.layerType;
        if (!this.vectors[type]) return false;
        Object.entries(this.vectors[type].checkMap).forEach(([layerName, value]) => {
            this.vectors[type].checkMap[layerName] = isInvert ? !value : checked;
        });
        this.updateKey = Math.random();
    };

    @action switchToggle = (disabled, layerType, isInvert) => {
        const type = layerType || this.layerType;
        if (!this.vectors[type]) return false;
        disabled = isInvert ? !this.vectors[type].disabled : disabled;
        this.vectors[type].disabled = disabled;
        Object.entries(this.layerMap[type]).forEach(([layerName, layer]) => {
            let checked = this.vectors[type].checkMap[layerName];
            checked && !disabled ? layer.show() : layer.hide();
        });
        this.updateKey = Math.random();
    };

    @action release = () => {
        this.vectors = {};
        this.layerType = 'vector';
    };

    @action getBoundaryLayerIds = () => {
        if (!this.layerMap.boundary) return [];
        let boundaries = Object.values(this.layerMap.boundary);
        return boundaries.map(item => item.layerId);
    };

    addRecords = flow(function* (urls, dataType) { 
        // console.log('8加载矢量数据开始：', new Date);
        const response = yield Promise.all(urls.map(axios.get));
        // console.log('8加载矢量数据结束：', new Date);
        // 处理数据
        // console.log('9渲染矢量数据开始：', new Date);
        // 获取缓存中的数据表
        let attrs = yield Attr.store.getAll();
        // 处理车道中心线和关联表的关系
        const addFeatureJson = vectorFactory.vectorDataToTable(response);
        addFeatureJson.AD_Lane.features.forEach((feature, index) => {
            let rsvalue = '';
            let speed = '';
            let AD_LANE_RS_VALUE;
            attrs.forEach((att, i) => {
                if (att.properties.LANE_ID === feature.properties.LANE_ID) {
                    // 判断关联关系
                    if (att.source === "AD_Lane_RS") {
                        if (att.properties.RS_TYPE === 1) {
                            AD_LANE_RS_VALUE = TYPE_SELECT_OPTION_MAP.AD_LANE_RS_VALUE1;
                        }
                        else if (att.properties.RS_TYPE === 2) {
                            AD_LANE_RS_VALUE = TYPE_SELECT_OPTION_MAP.AD_LANE_RS_VALUE2;
                        }
                        else if (att.properties.RS_TYPE === 3) {
                            AD_LANE_RS_VALUE = TYPE_SELECT_OPTION_MAP.AD_LANE_RS_VALUE3;
                        }
                        rsvalue += AD_LANE_RS_VALUE.find(c => c.value === att.properties.RS_VALUE).alias + '/';
                    }
                    else if (att.source === "AD_Lane_Speed") {
                        if (att.properties.SPD_TYPE === 1 || att.properties.SPD_TYPE === 2) {
                            let option = TYPE_SELECT_OPTION_MAP.AD_LANE_SPD_TYPE.find(c => c.value === att.properties.SPD_TYPE);
                            speed += option.alias + att.properties.SPEED + '/';
                        }
                    }

                }
            });
            feature.properties.RS_VALUE = rsvalue.substring(0, rsvalue.length - 1);
            feature.properties.SPEED = speed.substring(0, speed.length - 1);
        });
        yield window.vectorLayerGroup.addLayersFeature(addFeatureJson);
        this.firstPoint = addFeatureJson?.AD_Lane?.features[0]?.geometry?.coordinates[0] || undefined;
        // console.log('9渲染矢量数据结束：', new Date);
        // yield Relevance.store.batchAdd(records);
    });
}

export default new VectorsStore();
