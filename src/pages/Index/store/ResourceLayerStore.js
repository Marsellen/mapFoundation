import { action, configure, computed } from 'mobx';
import LayerStore from './LayerStore';
import {
    RESOURCE_LAYER_VETOR,
    RESOURCE_LAYER_POINT_CLOUD
} from 'src/config/DataLayerConfig';

configure({ enforceActions: 'always' });
class ResourceLayerStore extends LayerStore {
    constructor() {
        super();
    }

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
}

export default new ResourceLayerStore();
