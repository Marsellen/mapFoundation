import { observable, configure, action, computed } from 'mobx';
import { DATA_LAYER_MAP, DATA_LAYER_STRATIFICATION } from 'src/config/DataLayerConfig';
import _ from 'lodash';

const DATA_LAYER_CHECK_MAP = Object.values(DATA_LAYER_STRATIFICATION).reduce(
    (checkMap, layerNames) => {
        return layerNames.reduce(
            (_checkMap, layerName) => ({ ..._checkMap, [layerName]: true }),
            checkMap
        );
    },
    {}
);

configure({ enforceActions: 'always' });
class VectorsStore {
    layerMap = {};
    boundaryFeatures = new Set(); //[id,id...]
    @observable vectors = {};
    @observable layerType = 'vector';
    @observable updateKey;
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
        DATA_LAYER_STRATIFICATION[stratification].forEach(layerName => {
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
            this.vectors[type][layerName] = isInvert ? !value : checked;
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
}

export default new VectorsStore();
