import { observable, configure, action } from 'mobx';

configure({ enforceActions: 'always' });
class LayerStore {
    layerGroup;
    @observable layers = [];
    @observable updateKey;

    @action init = layers => {
        this.layerGroup = layers;
        this.layers = layers.map(layer => {
            return {
                label: layer.layerName,
                value: layer.layerId,
                checked: true
            };
        });
    };

    @action toggle = (id, checked) => {
        this.layers.find(layer => layer.value == id).checked = checked;
        let layer = this.layerGroup.find(layer => layer.layerId == id).layer;
        if (checked) {
            layer.show();
        } else {
            layer.hide();
        }
        this.updateKey = Math.random();
    };
}

export default LayerStore;
