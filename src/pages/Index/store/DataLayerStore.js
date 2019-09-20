import { action, configure, flow, observable } from 'mobx';
import LayerStore from './LayerStore';
import { EditControl, MeasureControl, DetectorControl } from 'addis-viz-sdk';
import TaskService from '../service/TaskService';
import { Modal } from 'antd';
import { addClass, removeClass } from '../../../utils/utils';
import {
    getLayerExByName,
    getFeatureOption,
    getLayerByName
} from 'src/utils/vectorUtils';

configure({ enforceActions: 'always' });
class DataLayerStore extends LayerStore {
    constructor() {
        super();
        this.editor;
        this.measureControl;
        this.detectorControl;
        this.highLightFeatures = [];

        this.bindKeyEvent();
    }
    @observable editType = 'normal';
    @observable beenPick;

    @action toggle = (name, checked) => {
        this.layers.find(layer => layer.value == name).checked = checked;
        let layer = getLayerExByName(name).layer;
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

    @action initEditor = layers => {
        this.editor = new EditControl();
        layers && this.editor.setTargetLayers(layers);
        map.getControlManager().addControl(this.editor);
    };

    @action initMeasureControl = () => {
        this.measureControl = new MeasureControl();
        map.getControlManager().addControl(this.measureControl);
        this.measureControl.onMeasureFinish(() => {
            this.removeCur();
        });
    };

    @action initDetectorControl = layers => {
        this.detectorControl = new DetectorControl();
        layers && this.detectorControl.setTargetLayers(layers);
        map.getControlManager().addControl(this.detectorControl);
    };

    @action activeEditor = name => {
        let layer = name ? getLayerExByName(name) : null;
        if (this.editor) {
            this.clearChoose();
        } else {
            this.initEditor();
        }
        this.editor.editLayer = layer;
        this.updateKey = Math.random();
        return layer;
    };

    @action setSelectedCallBack = callback => {
        this.editor.onFeatureSelected((result, event) => {
            switch (this.editType) {
                case 'normal':
                    // console.log(result);
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

    @action setBoundarySelectedCallback = callback => {
        this.detectorControl.onFeaturesSelected(result => {
            if (this.editType !== 'normal') return;
            callback(result);
        });
    };

    @action getEditLayer = () => {
        return this.editor && this.editor.editLayer;
    };

    @action clearChoose = () => {
        this.removeCur();
        this.detectorControl.enable();
        if (!this.editor) return;
        this.editType = 'normal';
        this.editor.clear();
        this.editor.cancel();
        this.measureControl.clear();
        this.unPick();
    };

    changeCur = () => {
        let viz = document.querySelector('#viz');
        addClass(viz, 'edit-viz');
    };

    ruler = () => {
        let viz = document.querySelector('#viz');
        addClass(viz, 'ruler-viz');
    };

    // 新增，打断形状点鼠标样式
    addShapePoint = () => {
        let viz = document.querySelector('#viz');
        addClass(viz, 'shape-viz');
    }

    // 修改，删除形状点鼠标样式
    delShapePoint = () => {
        let viz = document.querySelector('#viz');
        addClass(viz, 'del-viz');
    }

    removeCur = () => {
        let viz = document.querySelector('#viz');
        removeClass(viz, 'edit-viz');
        removeClass(viz, 'ruler-viz');
        removeClass(viz, 'shape-viz');
        removeClass(viz, 'del-viz');
    };

    @action newPoint = () => {
        if (!this.editor) return;
        this.measureControl.clear();
        this.editType = 'new_point';
        this.changeCur();
        this.detectorControl.disable();
        this.editor.newPoint();
    };

    @action newLine = () => {
        if (!this.editor) return;
        this.measureControl.clear();
        this.editType = 'new_line';
        this.changeCur();
        this.detectorControl.disable();
        this.editor.newLine();
    };

    @action newPolygon = () => {
        if (!this.editor) return;
        this.measureControl.clear();
        this.editType = 'new_polygon';
        this.changeCur();
        this.detectorControl.disable();
        this.editor.newPolygon();
    };

    @action newFacadeRectangle = () => {
        if (!this.editor) return;
        this.measureControl.clear();
        this.editType = 'new_facade_rectangle';
        this.changeCur();
        this.detectorControl.disable();
        this.editor.newMatrix();
    };

    @action newVerticalMatrix = () => {
        if (!this.editor) return;
        this.measureControl.clear();
        this.editType = 'new_vertical_matrix';
        this.changeCur();
        this.detectorControl.disable();
        this.editor.newVerticalMatrix();
    };

    @action newRel = () => {
        if (this.editType == 'newRel') return;
        this.measureControl.clear();
        this.editType = 'newRel';
        this.editor.clear();
        this.detectorControl.disable();
        this.editor.toggleMode(61);
    };

    @action delRel = () => {
        if (this.editType == 'delRel') return;
        this.measureControl.clear();
        this.editType = 'delRel';
        //this.editor.clear();
        this.detectorControl.disable();
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
        this.measureControl.clear();
        this.editType = 'new_circle';
        this.changeCur();
        this.detectorControl.disable();
        this.editor.newFixedPolygon(3);
    });

    updateResult = flow(function*(result) {
        try {
            if (this.editType != 'new_circle') {
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
        this.measureControl.clear();
        this.editType = 'insertPoints';
        this.editor.insertPoints();
        this.addShapePoint();
    };

    @action changePoints = () => {
        if (!this.editor) return;
        this.measureControl.clear();
        this.detectorControl.disable();
        this.editType = 'changePoints';
        this.editor.changePoints();
        this.delShapePoint();
    };

    @action deletePoints = () => {
        if (!this.editor) return;
        this.measureControl.clear();
        this.detectorControl.disable();
        this.editType = 'delPoint';
        this.editor.deletePoints();
        this.delShapePoint();
    };

    @action setPointSize = size => {
        pointCloudLayer.setPointSize(size);
    };

    @action pick = () => {
        this.beenPick = true;
    };

    @action unPick = () => {
        this.beenPick = false;

        this.clearHighLightFeatures();
    };

    @action startMeatureDistance = () => {
        this.editType = 'meature_distance';
        this.measureControl.startMeatureDistance();
        this.ruler();
    };

    @action getMeasureControlMode = () => {
        return this.measureControl.mode;
    };

    @action selectPointFromHighlight = () => {
        this.measureControl.clear();
        this.detectorControl.disable();
        this.editType = 'select_point';
        this.editor.selectPointFromHighlight();
        this.addShapePoint();
    };

    setFeatureColor = (obj, color) => {
        let option = getFeatureOption(obj);
        getLayerByName(obj.layerName).updateFeatureColor(option, color);
        this.highLightFeatures.push(obj);
    };

    clearHighLightFeatures = () => {
        this.highLightFeatures.map(feature => {
            this.setFeatureColor(feature);
        });
        this.highLightFeatures = [];
    };

    selectFormFeatrues = featrueOptions => {
        let options = featrueOptions.map(option => {
            return {
                layerName: option.layerName,
                ...option.option
            };
        });
        this.editor.selectFeaturesFromSpecified(options);
    };

    bindKeyEvent = () => {
        document.onkeydown = event => {
            var e = event || window.event;
            if (e && e.keyCode == 27) {
                // esc
                if (this.editType != 'normal') {
                    Modal.confirm({
                        title: '是否退出',
                        okText: '确定',
                        cancelText: '取消',
                        onOk: () => {
                            this.clearChoose();
                        }
                    });
                }
                return;
            }
            if (e && e.keyCode == 90) {
                //Z
                if (this.editType.includes('new_')) {
                    this.editor.undo();
                }
            }
        };
    };
}

export default new DataLayerStore();
