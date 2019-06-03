import { observable, flow, configure } from 'mobx';

configure({ enforceActions: 'always' });
class DataLayerStore {
    layerGroup;
    @observable layers;

    init = flow(function*(layerGroup) {
        this.layerGroup = layerGroup;
        this.layers = layerGroup.map(layer => {
            return {
                name: layer.layerName,
                value: layer,
                checked: true
            };
        });
    });
}

export default new DataLayerStore();
