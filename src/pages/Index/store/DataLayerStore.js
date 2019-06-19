import { action, configure } from 'mobx';
import LayerStore from './LayerStore';
import { EditControl } from 'addis-viz-sdk';

configure({ enforceActions: 'always' });
class DataLayerStore extends LayerStore {
    constructor() {
        super();
        this.editor;
        this.editorLayerId;
    }

    @action toggleAll = checked => {
        this.layers.map(layer => (layer.checked = checked));
        this.updateKey = Math.random();
    };

    @action updataAttributes = (id, features) => {
        let layer = this.layerGroup.find(layer => layer.layerId == id).layer;
        layer.updateFeatures(features);
    };

    @action activeEditor = (id, callback) => {
        this.editorLayerId = id;
        let layer = this.layerGroup.find(layer => layer.layerId == id);
        if (this.editor) {
            // TODO
            this.editor.editLayer = layer;
        } else {
            this.editor = new EditControl(layer);
            map.getControlManager().addControl(this.editor);
            this.editor.onFeatureCreated(callback);
        }
        return layer;
    };

    @action newPoint = () => {
        if (!this.editor) return;
        this.editor.newPoint();
    };

    @action newLine = () => {
        if (!this.editor) return;
        this.editor.newLine();
    };

    @action newPolygon = () => {
        if (!this.editor) return;
        this.editor.newPolygon();
    };

    @action stopEdit = () => {
        if (!this.editor) return;
        this.editor.toggleMode();
    };
}

export default new DataLayerStore();
