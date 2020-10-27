import { observable, configure, action, computed } from 'mobx';
import { DATA_LAYER_MAP } from 'src/config/DataLayerConfig';

configure({ enforceActions: 'always' });

class VectorsStore {
    vectorLayerMap = {}; //{图层名:layer}
    boundaryLayerMap = {}; //{图层名:layer}
    boundaryFeatures = new Set(); //[id,id...]
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
        this.vectors.vector = layers.map(layerItem => {
            const { layer, layerName } = layerItem;
            this.vectorLayerMap[layerName] = layer;

            return {
                layer: layer,
                value: layerName,
                checked: true
            };
        });
    };

    @action addBoundaryLayer = layerGroup => {
        const { layers } = layerGroup;
        this.vectors.boundary = layers
            .map(layerItem => {
                const { layer, layerName } = layerItem;
                this.boundaryLayerMap[layerName] = layer;
                return {
                    layer: layer,
                    value: layerName,
                    checked: true
                };
            })
            .filter(layerItem => layerItem.value !== 'AD_Map_QC');

        const featuresSet = this.handleFeatures(layers);
        this.boundaryFeatures = featuresSet;
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
        this.vectors[type].find(layer => layer.value == name).checked = checked;
        const layer = this.vectors[type].find(layer => layer.value == name).layer;
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

    @action switchToggle = (disabled, layerType, isInvert) => {
        const type = layerType || this.layerType;
        if (!this.vectors[type]) return false;
        disabled = isInvert ? !this.vectors[type].disabled : disabled;
        this.vectors[type].disabled = disabled;
        this.vectors[type].forEach(layer => {
            layer.checked && !disabled ? layer.layer.show() : layer.layer.hide();
        });
        this.updateKey = Math.random();
    };

    @action release = () => {
        this.vectors = {};
        this.layerType = 'vector';
    };

    @action getBoundaryLayerIds = () => {
        if (!this.vectors.boundary) return [];
        return this.vectors.boundary.map(item => item.layer.layerId);
    };
}

export default new VectorsStore();
