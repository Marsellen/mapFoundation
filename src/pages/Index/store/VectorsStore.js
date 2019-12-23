import { observable, configure, action, computed } from 'mobx';
import {
    RESOURCE_LAYER_VETOR,
    RESOURCE_LAYER_BOUNDARY
} from 'src/config/DataLayerConfig';

configure({ enforceActions: 'always' });

class VectorsStore {
    @observable vectors = {};
    @observable layerType = RESOURCE_LAYER_VETOR;
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
        this.vectors[RESOURCE_LAYER_VETOR] = layerGroup.layers.map(layer => {
            return {
                layer: layer.layer,
                value: layer.layerName,
                checked: true
            };
        });
    };

    @action addBoundaryLayer = layerGroup => {
        this.vectors[RESOURCE_LAYER_BOUNDARY] = layerGroup.layers
            .filter(layer => layer.layerName !== 'AD_Map_QC')
            .map(layer => {
                return {
                    layer: layer.layer,
                    value: layer.layerName,
                    checked: true
                };
            });
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
}

export default new VectorsStore();
