import { action, configure } from 'mobx';
import LayerStore from './LayerStore';

configure({ enforceActions: 'always' });
class ResourceLayerStore extends LayerStore {
    constructor() {
        super();
    }

    @action showVertor = () => {
        let vetor = this.layers.find(layer => layer.value == 'vector');
        if (vetor && !vetor.checked) {
            vetor.checked = true;
            this.updateKey = Math.random();
        }
    };
}

export default new ResourceLayerStore();
