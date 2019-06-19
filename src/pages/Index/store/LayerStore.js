import { observable, configure, action } from 'mobx';

configure({ enforceActions: 'always' });
class LayerStore {
    layerGroup;
    @observable layers;
    @observable updateKey;

    @action init = layers => {
        this.layerGroup = layers || [];
        this.layers = this.layerGroup.map(layer => {
            return {
                value: layer.layerName,
                checked: true
            };
        });
    };

    @action toggle = (name, checked) => {
        this.layers.find(layer => layer.value == name).checked = checked;
        let layer = this.layerGroup.find(layer => layer.layerName == name).layer;
        if (checked) {
            layer.show();
        } else {
            layer.hide();
        }
        this.updateKey = Math.random();
    };
}

export default LayerStore;
