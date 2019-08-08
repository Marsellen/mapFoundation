import { action, configure, flow, observable } from 'mobx';
import LayerStore from './LayerStore';
import { EditControl, MeasureControl } from 'addis-viz-sdk';
import TaskService from '../service/TaskService';
import { Modal, message } from 'antd';
import { getFeatureByRels } from 'src/utils/relCtrl/relCtrl';

configure({ enforceActions: 'always' });
class DataLayerStore extends LayerStore {
    constructor() {
        super();
        this.editor;
        this.measureControl;
        document.onkeydown = event => {
            var e =
                event || window.event || arguments.callee.caller.arguments[0];
            if (e && e.keyCode == 27) {
                if (this.editType != 'normal') {
                    Modal.confirm({
                        title: '是否退出',
                        okText: '确定',
                        cancelText: '取消',
                        onOk: () => {
                            this.clearChoose();
                            this.measureControl.clear();
                        }
                    });
                }
                return;
            }
        };
    }
    @observable editType = 'normal';
    @observable beenPick;

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

    @action initEditor = layer => {
        this.editor = new EditControl(layer);
        map.getControlManager().addControl(this.editor);
    };

    @action initMeasureControl = () => {
        this.measureControl = new MeasureControl();
        map.getControlManager().addControl(this.measureControl);
    };

    @action activeEditor = name => {
        let layer = this.getLayerByName(name);
        if (this.editor) {
            this.clearChoose();
            this.editor.editLayer = layer;
        } else {
            this.initEditor(layer);
        }
        this.updateKey = Math.random();
        return layer;
    };

    @action setSelectedCallBack = callback => {
        this.editor.onFeatureSelected((result, event) => {
            switch (this.editType) {
                case 'normal':
                    console.log(result);
                    callback(result, event);
                    break;
                case 'newRel':
                    this.newRelCallback(result, event);
                    break;
                case 'delRel':
                    this.delRelCallback(result, event);
                    break;
                case 'select_point':
                    this.breakCallback(result, event);
                    break;
            }
        });
    };

    @action setCreatedCallBack = callback => {
        this.editor.onFeatureCreated(callback);
    };

    @action setEditedCallBack = callback => {
        this.editor.onFeatureEdited(callback);
    };

    @action getEditLayer = () => {
        return this.editor && this.editor.editLayer;
    };

    @action clearChoose = () => {
        if (!this.editor) return;
        this.editType = 'normal';
        this.editor.clear();
        this.editor.cancel();
        this.setPointSize(0.5);
    };

    @action getLayerByName = name => {
        return this.layerGroup.find(layer => layer.layerName == name);
    };

    @action newPoint = () => {
        if (!this.editor) return;
        this.editType = 'new_point';
        this.editor.newPoint();
        this.setPointSize(3);
    };

    @action newLine = () => {
        if (!this.editor) return;
        this.editType = 'new_line';
        this.editor.newLine();
        this.setPointSize(3);
    };

    @action newPolygon = () => {
        if (!this.editor) return;
        this.editType = 'new_polygon';
        this.editor.newPolygon();
        this.setPointSize(3);
    };

    @action newFacadeRectangle = () => {
        if (!this.editor) return;
        this.editType = 'new_facade_rectangle';
        this.editor.newMatrix();
        this.setPointSize(3);
    };

    @action newRel = () => {
        if (this.editType == 'newRel') return;
        this.editType = 'newRel';
        this.editor.clear();
        this.editor.toggleMode(61);
    };

    @action delRel = rels => {
        if (this.editType == 'delRel') return;
        this.editType = 'delRel';
        this.editor.clear();
        this.editor.toggleMode(61);
        // TODO 设置关联关系高亮
        let features = getFeatureByRels(rels);
        features.map(feature => {
            this.editor.highlightFeature(feature.layerName, feature.option);
        });
    };

    @action setNewRelCallback = callback => {
        this.newRelCallback = callback;
    };

    @action setDelRelCallback = callback => {
        this.delRelCallback = callback;
    };

    @action setBreakCallback = callback => {
        this.breakCallback = callback;
    };

    newCircle = flow(function*() {
        if (!this.editor) return;
        this.editType = 'new_circle';
        this.editor.newFixedPolygon(3);
        this.setPointSize(5);
    });

    updateResult = flow(function*(result) {
        try {
            if (!this.editType != 'new_circle') {
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

    @action pick = () => {
        this.beenPick = true;
    };

    @action unPick = () => {
        this.beenPick = false;
    };

    @action startMeatureDistance = () => {
        this.measureControl.startMeatureDistance();
        this.editType = 'meature_distance';
    };

    @action selectPointFromHighlight = () => {
        this.editor.selectPointFromHighlight();
        this.editType = 'select_point';
    };
}

export default new DataLayerStore();
