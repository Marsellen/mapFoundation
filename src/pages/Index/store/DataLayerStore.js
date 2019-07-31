import { action, configure, flow } from 'mobx';
import LayerStore from './LayerStore';
import { EditControl } from 'addis-viz-sdk';
import TaskService from '../service/TaskService';
import { Modal } from 'antd';
import newRelCtrl from 'src/utils/relCtrl/newRelCtrl';

configure({ enforceActions: 'always' });
class DataLayerStore extends LayerStore {
    constructor() {
        super();
        this.editor;
        this.createShouldUpdate;
        this.editType = 'normal';
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

    @action initEditor = () => {
        this.editor = new EditControl();
        map.getControlManager().addControl(this.editor);
    };

    @action activeEditor = name => {
        let layer = this.getLayerByName(name);
        if (this.editor) {
            this.clearChoose();
            this.editor.editLayer = layer;
        } else {
            this.editor = new EditControl(layer);
            map.getControlManager().addControl(this.editor);
        }
        this.updateKey = Math.random();
        return layer;
    };

    @action setSelectedCallBack = callback => {
        this.editor.onFeatureSelected((result, event) => {
            switch (this.editType) {
                case 'normal':
                    callback(result, event);
                    break;
                case 'newRel':
                    this.newRelCallback(result, event);
                    break;
            }
        });
    };

    @action setCreatedCallBack = callback => {
        this.editor.onFeatureCreated(result => {
            callback(result, this.createShouldUpdate);
        });
    };

    @action setEditedCallBack = callback => {
        this.editor.onFeatureEdited(callback);
    };

    @action getEditLayer = () => {
        return this.editor && this.editor.editLayer;
    };

    @action clearChoose = () => {
        if (!this.editor) return;
        this.editor.clear();
        this.editor.cancel();
        this.setPointSize(0.5);
    };

    @action getLayerByName = name => {
        return this.layerGroup.find(layer => layer.layerName == name);
    };

    @action newPoint = () => {
        if (!this.editor) return;
        this.createShouldUpdate = false;
        this.editor.newPoint();
        this.setPointSize(3);
    };

    @action newLine = () => {
        if (!this.editor) return;
        this.createShouldUpdate = false;
        console.log(this.editor);
        this.editor.newLine();
        this.setPointSize(3);
    };

    @action newPolygon = () => {
        if (!this.editor) return;
        this.createShouldUpdate = false;
        this.editor.newPolygon();
        this.setPointSize(3);
    };

    @action newFacadeRectangle = () => {
        if (!this.editor) return;
        this.createShouldUpdate = false;
        this.editor.newMatrix();
        this.setPointSize(3);
    };

    @action newRel = callback => {
        this.editType = 'newRel';
        this.worker = new newRelCtrl(callback);
    };

    @action newRelCallback = (result, event) => {
        switch (this.worker.step) {
            case 0:
                this.worker.setObj(result);
                this.updateKey = Math.random();
                //this.worker.next(); 可以在其他时机执行，例如点击下一步按钮
                break;
            case 1:
                this.worker.setRelObj(result);
                //this.worker.finish(); 可以在其他时机执行，例如点击完成按钮
                //this.refreshEditType();
                break;
        }
    };

    @action refreshEditType = () => {
        this.editType = 'normal';
    };

    newCircle = flow(function*() {
        if (!this.editor) return;
        this.createShouldUpdate = true;
        this.editor.newFixedPolygon(3);
        this.setPointSize(5);
    });

    updateResult = flow(function*(result) {
        try {
            if (!this.createShouldUpdate) {
                return result;
            }
            let points = result.data.geometry.coordinates[0];
            let _result = yield TaskService.creatCircle(points).catch(e => {
                Modal.error({
                    title: '三点画圆服务请求失败',
                    okText: '确定'
                });
            });
            result.data.geometry.coordinates[0] = _result.data;
            return result;
        } catch (e) {
            console.log(e);
        }
    });

    updateFeature = flow(function*(result) {
        this.editor.editLayer.layer.updateFeatures([result]);
        return result;
    });

    @action insertPoints = () => {
        if (!this.editor) return;
        this.editor.insertPoints();
        this.setPointSize(3);
    };

    @action changePoints = () => {
        if (!this.editor) return;
        this.editor.changePoints();
        this.setPointSize(3);
    };

    @action deletePoints = () => {
        if (!this.editor) return;
        this.editor.deletePoints();
        this.setPointSize(3);
    };

    @action setPointSize = size => {
        pointCloudLayer.setPointSize(size);
    };
}

export default new DataLayerStore();
