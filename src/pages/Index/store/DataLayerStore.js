import { action, configure } from 'mobx';
import LayerStore from './LayerStore';
import { EditControl } from 'addis-viz-sdk';

configure({ enforceActions: 'always' });
class DataLayerStore extends LayerStore {
    constructor() {
        super();
        this.editor;
    }

    @action toggle = (name, checked) => {
        this.layers.find(layer => layer.value == name).checked = checked;
        let layer = this.layerGroup.find(layer => layer.layerName == name)
            .layer;
        if (checked) {
            layer.show();
        } else {
            layer.hide();
            this.clearChoose();
        }
        this.updateKey = Math.random();
    };

    @action toggleAll = checked => {
        this.layers.map(layer => (layer.checked = checked));
        if (!checked) {
            this.clearChoose();
        }
        this.updateKey = Math.random();
    };

    @action hasShow = () => {
        return this.layers.findIndex(layer => layer.checked);
    };

    @action updataAttributes = (name, features) => {
        let layer = this.getLayerByName(name).layer;
        layer.updateFeatures(features);
    };

    @action initEditor = callback => {
        this.editor = new EditControl();
        map.getControlManager().addControl(this.editor);
        this.editor.onFeatureSelected(callback);
    };

    @action activeEditor = (name, callback) => {
        let layer = this.getLayerByName(name);
        if (this.editor) {
            // TODO
            this.editor.cancel();
            this.editor.editLayer = layer;
        } else {
            this.editor = new EditControl(layer);
            map.getControlManager().addControl(this.editor);
        }
        this.editor.onFeatureCreated(callback);
        return layer;
    };

    @action getEditLayer = () => {
        return this.editor.editLayer;
    };

    @action clearChoose = () => {
        this.editor.clear();
    };

    @action getLayerByName = name => {
        return this.layerGroup.find(layer => layer.layerName == name);
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
