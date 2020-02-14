import { observable, configure, action, computed } from 'mobx';
import { DATA_LAYER_MAP } from 'src/config/DataLayerConfig';

configure({ enforceActions: 'always' });

class VectorsStore {
    boundaryFeaturesMap = {};
    boundaryFeatures = [];
    @observable vectors = {};
    @observable layerType = 'vector';
    @observable updateKey;
    @computed get isCheckedNone() {
        const type = this.layerType;
        if (!this.vectors[type]) return false;
        return this.vectors[type].every(layer => !layer.checked);
    }
    @computed get isCheckedAll() {
        const type = this.layerType;
        if (!this.vectors[type]) return false;
        return this.vectors[type].every(layer => layer.checked);
    }
    @computed get indeterminate() {
        const type = this.layerType;
        if (!this.vectors[type]) return false;
        const checkedLayers = this.vectors[type].filter(layer => layer.checked);
        const checkedLayersL = checkedLayers.length;
        return checkedLayersL && checkedLayersL !== this.vectors[type].length;
    }

    @action addLayer = layerGroup => {
        const { layers } = layerGroup;
        this.vectors.vector = layers.map(layer => {
            return {
                layer: layer.layer,
                value: layer.layerName,
                checked: true
            };
        });
    };

    @action addBoundaryLayer = layerGroup => {
        const { layers } = layerGroup;
        this.vectors.boundary = layers
            .filter(layer => layer.layerName !== 'AD_Map_QC')
            .map(layer => {
                return {
                    layer: layer.layer,
                    value: layer.layerName,
                    checked: true
                };
            });

        const { featuresMap, featuresArr } = this.handleFeatures(layers);
        this.boundaryFeaturesMap = featuresMap;
        this.boundaryFeatures = featuresArr;
    };

    //存储周边底图矢量数据
    handleFeatures = layers => {
        const featuresMap = {};
        const featuresArr = [];

        layers.map(layer => {
            const { features, layerName } = layer.layer || {};
            if (!features || features.length === 0) return;
            features.map(feature => {
                const { geometry, properties } = feature;
                const key = DATA_LAYER_MAP[layerName].id;
                if (!key) return;
                const id = properties[key];
                if (!id) return;
                featuresMap[id] = {
                    id: id,
                    geometry,
                    properties
                };
                featuresArr.push(id);
            });
        });

        return { featuresMap, featuresArr };
    };

    @action setLayerType = layerType => {
        this.layerType = layerType;
    };

    @action toggle = (name, checked) => {
        const type = this.layerType;
        if (!this.vectors[type]) return false;
        this.vectors[type].find(layer => layer.value == name).checked = checked;
        const layer = this.vectors[type].find(layer => layer.value == name)
            .layer;
        checked ? layer.show() : layer.hide();
        this.updateKey = Math.random();
    };

    @action toggleAll = (checked, layerType, isInvert) => {
        const type = layerType || this.layerType;
        if (!this.vectors[type]) return false;
        this.vectors[type].map(layer => {
            return (layer.checked = isInvert ? !layer.checked : checked);
        });
        this.updateKey = Math.random();
    };

    @action release = () => {
        this.vectors = {};
        this.layerType = 'vector';
    };
}

export default new VectorsStore();
