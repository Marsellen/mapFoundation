import { action, configure } from 'mobx';
import LayerStore from './LayerStore';

configure({ enforceActions: 'always' });
class DataLayerStore extends LayerStore {
    constructor() {
        super();
    }

    @action toggleAll = checked => {
        this.layers.map(layer => (layer.checked = checked));
        this.updateKey = Math.random();
    };
}

export default new DataLayerStore();
