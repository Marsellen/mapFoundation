import { action, configure, computed, observable } from 'mobx';
import {
    RESOURCE_LAYER_POINT_CLOUD,
    RESOURCE_LAYER_VECTOR,
    RESOURCE_LAYER_TRACE,
    RESOURCE_LAYER_TASK_SCOPE,
    RESOURCE_LAYER_BOUNDARY
} from 'src/config/DataLayerConfig';

const LAYER_SORT_MAP = {
    [RESOURCE_LAYER_POINT_CLOUD]: 0,
    [RESOURCE_LAYER_VECTOR]: 1,
    [RESOURCE_LAYER_TRACE]: 2,
    [RESOURCE_LAYER_TASK_SCOPE]: 3,
    [RESOURCE_LAYER_BOUNDARY]: 4
};

configure({ enforceActions: 'always' });
class ResourceLayerStore {
    @observable layers;
    @observable updateKey;

    @computed get pointCloudChecked() {
        let pointCloud = (this.layers || []).find(
            layer => layer.value == RESOURCE_LAYER_POINT_CLOUD
        );
        return pointCloud && pointCloud.checked;
    }

    @action toggleVertor = value => {
        let vetor = this.layers.find(
            layer => layer.value == RESOURCE_LAYER_VECTOR
        );
        if (vetor && vetor.checked != value) {
            vetor.checked = value;
            this.updateKey = Math.random();
        }
    };

    @action addLayers = layers => {
        layers = (layers || []).map(layer => {
            return {
                layer: layer.layer,
                value: layer.layerName,
                checked: true
            };
        });
        this.layers = this.layers.concat(layers).sort((a, b) => {
            return LAYER_SORT_MAP[a.value] < LAYER_SORT_MAP[b.value] ? -1 : 1;
        });
    };

    @action updateLayerByName = (name, layer) => {
        let result = this.layers.find(layer => layer.value === name);
        if (result) {
            result.layer = layer;
        } else {
            this.layers.push({
                layer: layer,
                value: name,
                checked: true
            });
            this.layers = this.layers.sort((a, b) => {
                return LAYER_SORT_MAP[a.value] < LAYER_SORT_MAP[b.value]
                    ? -1
                    : 1;
            });
        }
    };

    @action toggle = (name, checked, isKeyCode) => {
        let layerEx = this.layers.find(layer => layer.value == name);
        if (isKeyCode) {
            layerEx.checked = !layerEx.checked;
        } else {
            layerEx.checked = checked;
        }
        if (layerEx.checked) {
            layerEx.layer.show();
        } else {
            layerEx.layer.hide();
        }
        this.updateKey = Math.random();
    };

    @action release = () => {
        this.layers = [];
    };
}

export default new ResourceLayerStore();
