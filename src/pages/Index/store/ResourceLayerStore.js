import { action, configure } from 'mobx';
import LayerStore from './LayerStore';
import { RESOURCE_LAYER_VETOR } from 'src/config/DataLayerConfig';

configure({ enforceActions: 'always' });
class ResourceLayerStore extends LayerStore {
    constructor() {
        super();
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
