import { action, configure, flow, observable, computed } from 'mobx';
import LayerStore from './LayerStore';
import { EditControl, MeasureControl } from 'addis-viz-sdk';
import TaskService from '../service/TaskService';
import { Modal } from 'antd';
import {
    getLayerExByName,
    getFeatureOption,
    getLayerByName
} from 'src/utils/vectorUtils';
import { addClass, removeClass, throttle } from 'src/utils/utils';

configure({ enforceActions: 'always' });
class DataLayerStore extends LayerStore {
    constructor() {
        super();
        this.editor;
        this.measureControl;
        this.highLightFeatures = [];

        this.bindKeyEvent();
        this.readCoordinateEvent = throttle(this.readCoordinate, 10);
    }
    @observable editType = 'normal';
    @observable beenPick;
    @observable isTopView = false;
    @observable readCoordinateResult;
    @computed get isCheckedAll() {
        return this.layers.every(layer => layer.checked);
    }

    @computed get indeterminate() {
        let checkedLayers = this.layers.filter(layer => layer.checked);
        return (
            checkedLayers.length && checkedLayers.length !== this.layers.length
        );
    }

    @action toggle = (name, checked) => {
        this.layers.find(layer => layer.value == name).checked = checked;
        let layer = getLayerExByName(name).layer;
        if (checked) {
            layer.show();
        } else {
            layer.hide();
            this.exitEdit();
        }

        this.updateKey = Math.random();
    };

    @action toggleAll = checked => {
        this.layers.map(layer => (layer.checked = checked));
        if (!checked) {
            this.exitEdit();
        }
        this.updateKey = Math.random();
    };

    @action hasShow = () => {
        return this.layers.findIndex(layer => layer.checked);
    };

    @action initEditor = layers => {
        this.editor = new EditControl();
        window.map && window.map.getControlManager().addControl(this.editor);
        layers && this.editor.setTargetLayers(layers);
    };

    addTargetLayers = layers => {
        this.editor.setTargetLayers([...this.editor.targetLayers, ...layers]);
    };

    @action initMeasureControl = () => {
        this.measureControl = new MeasureControl();
        map.getControlManager().addControl(this.measureControl);
        this.measureControl.onMeasureFinish(() => {
            this.measureControl.startMeatureDistance();
        });
    };

    @action activeEditor = name => {
        let layer = name ? getLayerExByName(name) : null;
        if (this.editor) {
            this.exitEdit();
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
                case 'new_around_line':
                    this.aroundCallback(result, event);
                    break;
                case 'new_straight_line':
                    this.straightCallback(result, event);
                    break;
                case 'new_turn_line':
                    this.turnCallback(result, event);
                    break;
                case 'new_Uturn_line':
                    this.uturnCallback(result, event);
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
        this.removeCur();
        if (!this.editor) return;
        this.editType = 'normal';
        this.editor.clear();
        this.editor.cancel();
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
    };

    // 修改，删除形状点鼠标样式
    delShapePoint = () => {
        let viz = document.querySelector('#viz');
        addClass(viz, 'del-viz');
    };

    removeCur = () => {
        let viz = document.querySelector('#viz');
        removeClass(viz, 'edit-viz');
        removeClass(viz, 'ruler-viz');
        removeClass(viz, 'shape-viz');
        removeClass(viz, 'del-viz');
        removeClass(viz, 'crosshair-viz');
    };

    @action newPoint = () => {
        if (!this.editor) return;
        this.disableOtherCtrl();
        this.editType = 'new_point';
        this.changeCur();
        this.editor.newPoint();
    };

    @action newLine = () => {
        if (!this.editor) return;
        this.disableOtherCtrl();
        this.editType = 'new_line';
        this.changeCur();
        this.editor.newLine();
    };

    @action newPolygon = () => {
        if (!this.editor) return;
        this.disableOtherCtrl();
        this.editType = 'new_polygon';
        this.changeCur();
        this.editor.newPolygon();
    };
    @action newGroundRectangle = () => {
        if (!this.editor) return;
        this.disableOtherCtrl();
        this.editType = 'new_ground_rectangle';
        this.changeCur();
        this.editor.newPlaneTextMatrix();
    };

    @action newFacadeRectangle = () => {
        if (!this.editor) return;
        this.disableOtherCtrl();
        this.editType = 'new_facade_rectangle';
        this.changeCur();
        this.editor.newMatrix();
    };

    // 左右车道线生成中心线
    @action newAroundLine = () => {
        if (!this.editor) return;
        this.disableOtherCtrl();
        this.editType = 'new_around_line';
        this.editor.clear();
        this.editor.toggleMode(61);
        this.removeCur();
    };

    // 路口内直行中心线生成
    @action newStraightLine = () => {
        if (!this.editor) return;
        this.disableOtherCtrl();
        this.editType = 'new_straight_line';
        this.editor.clear();
        this.editor.toggleMode(61);
        this.removeCur();
    };

    // 路口内转弯中心线生成
    @action newTurnLine = () => {
        if (!this.editor) return;
        this.disableOtherCtrl();
        this.editType = 'new_turn_line';
        this.editor.clear();
        this.editor.toggleMode(61);
        this.removeCur();
    };

    // 路口内掉头中心线生成
    @action newUTurnLine = () => {
        if (!this.editor) return;
        this.disableOtherCtrl();
        this.editType = 'new_Uturn_line';
        this.editor.clear();
        this.editor.toggleMode(61);
        this.removeCur();
    };

    @action topViewMode = opt => {
        if (opt) {
            this.isTopView = true;
        } else {
            this.isTopView = false;
        }
    };

    @action newVerticalMatrix = () => {
        if (!this.editor) return;
        this.disableOtherCtrl();
        this.editType = 'new_vertical_matrix';
        this.changeCur();
        this.editor.newVerticalMatrix();
    };

    @action newRel = () => {
        if (this.editType == 'newRel') return;
        this.disableOtherCtrl();
        this.editType = 'newRel';
        this.editor.clear();
        this.editor.toggleMode(61);
    };

    @action delRel = () => {
        if (this.editType == 'delRel') return;
        this.disableOtherCtrl();
        this.editType = 'delRel';
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

    // 两条车道线自动生成中心线
    @action setStraightCallback = callback => {
        this.straightCallback = callback;
        this.turnCallback = callback;
        this.uturnCallback = callback;
    };

    // 路口内直行中心线生成
    @action setAroundCallback = callback => {
        this.aroundCallback = callback;
    };

    // 路口内转弯中心线生成
    @action setTurnCallback = callback => {
        this.turnCallback = callback;
    };

    // 输入两条路口进出中心线生成路口内中心线
    @action setUTurnCallback = callback => {
        this.uturnCallback = callback;
    };

    @action newCircle = () => {
        if (!this.editor) return;
        this.disableOtherCtrl();
        this.editType = 'new_circle';
        this.changeCur();
        this.editor.newFixedPolygon(3);
    };

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

    @action updateFeature = result => {
        this.editor.editLayer.layer.updateFeatures([result]);
        return result;
    };

    @action insertPoints = () => {
        if (!this.editor) return;
        this.disableOtherCtrl();
        this.editType = 'insertPoints';
        this.editor.insertPoints();
        this.addShapePoint();
    };

    @action changePoints = () => {
        if (!this.editor) return;
        this.disableOtherCtrl();
        this.editType = 'changePoints';
        this.editor.changePoints();
        this.delShapePoint();
    };

    @action deletePoints = () => {
        if (!this.editor) return;
        this.disableOtherCtrl();
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
        this.exitEdit();

        this.editType = 'meature_distance';
        this.measureControl.startMeatureDistance();
        this.ruler();
    };

    @action startReadCoordinate = () => {
        this.exitEdit();

        this.editType = 'read_coordinate';
        this.addReadCoordinateLinstener();
    };

    @action getMeasureControlMode = () => {
        return this.measureControl.mode;
    };

    @action selectPointFromHighlight = () => {
        this.disableOtherCtrl();
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

    //启用编辑控件时禁用测距和拾取控件
    disableOtherCtrl = () => {
        this.triggerEscEvent();
        switch (this.editType) {
            case 'meature_distance':
                this.measureControl.clear();
                break;
            case 'read_coordinate':
                this.removeReadCoordinateLinstener();
                break;
            default:
                break;
        }
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
                        onOk: this.exitEdit
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

    exitEdit = () => {
        this.disableOtherCtrl();
        this.clearChoose();
    };

    @action readCoordinate = event => {
        if (this.readCoordinateClosed) {
            return;
        }
        let result = map.detectPointObjFromPointCloud(event);
        let position = result && result.point.position;
        this.coordinateViewPosition = event;
        this.setReadCoordinateResult(position);
    };

    addReadCoordinateLinstener = () => {
        let viz = document.querySelector('#viz');
        viz.addEventListener('mousemove', this.readCoordinateEvent);
        viz.addEventListener('mousedown', this.closeReadCoordinate);
        viz.addEventListener('mouseup', this.openReadCoordinate);
        viz.addEventListener('mouseout', () => {
            setTimeout(this.setReadCoordinateResult, 0);
        });
        addClass(viz, 'crosshair-viz');
    };

    closeReadCoordinate = () => {
        this.readCoordinateClosed = true;
        let viz = document.querySelector('#viz');
        removeClass(viz, 'crosshair-viz');
        this.setReadCoordinateResult();
    };

    openReadCoordinate = event => {
        this.readCoordinateClosed = false;
        let viz = document.querySelector('#viz');
        addClass(viz, 'crosshair-viz');
        let result = map.detectPointObjFromPointCloud(event);
        let position = result && result.point.position;
        this.coordinateViewPosition = event;
        this.setReadCoordinateResult(position);
    };

    removeReadCoordinateLinstener = () => {
        let viz = document.querySelector('#viz');
        viz.removeEventListener('mousemove', this.readCoordinateEvent);
        viz.removeEventListener('mousedown', this.closeReadCoordinate);
        viz.removeEventListener('mouseup', this.openReadCoordinate);
        removeClass(viz, 'crosshair-viz');
        this.setReadCoordinateResult();
    };

    @action setReadCoordinateResult = result => {
        this.readCoordinateResult = result;
    };

    @action setRegionGeojson = RegionGeojson => {
        this.regionGeojson = RegionGeojson;
    };

    enableRegionSelect = () => {
        this.editor.enableRegionSelect();
    };

    disableRegionSelect = () => {
        this.editor.disableRegionSelect();
    };

    registerEscEvent = event => {
        this.escEvent = event;
    };

    triggerEscEvent = () => {
        this.escEvent && this.escEvent();
        this.escEvent = null;
    };
}

export default new DataLayerStore();
