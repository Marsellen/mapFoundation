import { action, configure, computed, observable } from 'mobx';
import {
    RESOURCE_LAYER_VETOR,
    RESOURCE_LAYER_POINT_CLOUD
} from 'src/config/DataLayerConfig';

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
            layer => layer.value == RESOURCE_LAYER_VETOR
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
        this.layers = this.layers.concat(layers);
    };

    @action updateLayerByName = (name, layer) => {
        this.layers.find(layer => layer.value === name).layer = layer;
        this.updateKey = Math.random();
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
