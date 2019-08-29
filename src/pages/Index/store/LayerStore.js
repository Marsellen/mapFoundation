import { observable, configure, action } from 'mobx';
import { getLayerByName } from 'src/utils/vectorUtils';

configure({ enforceActions: 'always' });
class LayerStore {
    @observable layers;
    @observable updateKey;

    @action init = layers => {
        this.layers = (layers || []).map(layer => {
            return {
                value: layer.layerName,
                checked: true
            };
        });
    };

    @action toggle = (name, checked) => {
        this.layers.find(layer => layer.value == name).checked = checked;
        let layer = getLayerByName(name);
        if (checked) {
            layer.show();
        } else {
            layer.hide();
        }
        this.updateKey = Math.random();
    };
}

export default LayerStore;
