import { observable, configure, action } from 'mobx';

configure({ enforceActions: 'always' });
class LayerStore {
    @observable layers;
    @observable updateKey;

    @action init = layers => {
        this.layers = (layers || []).map(layer => {
            return {
                layer: layer.layer,
                value: layer.layerName,
                checked: true
            };
        });
    };

    @action toggle = (name, checked, isDataLayer) => {
        let layerEx = this.layers.find(layer => layer.value == name);
        layerEx.checked = checked;
        if (checked) {
            layerEx.layer.show();
        } else {
            layerEx.layer.hide();
        }
        this.updateKey = Math.random();
    };
}

export default LayerStore;
