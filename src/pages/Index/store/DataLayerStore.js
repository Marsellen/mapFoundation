import { action, configure, flow, observable } from 'mobx';
import { EditControl, MeasureControl } from 'addis-viz-sdk';
import TaskService from 'src/services/TaskService';
import { Modal, message } from 'antd';
import {
    getLayerExByName,
    getFeatureOption,
    getLayerByName,
    getAllLayersExByName
} from 'src/utils/vectorUtils';
import { addClass, removeClass, throttle, getCSYS } from 'src/utils/utils';
import AdEmitter from 'src/models/event';
import EditorConfig from 'src/config/ConctrolConfig';

configure({ enforceActions: 'always' });
class DataLayerStore {
    constructor() {
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
    @observable updateKey;

    initEditor = layers => {
        this.editor = new EditControl();
        window.map && window.map.getControlManager().addControl(this.editor);
        this.targetLayers = layers || [];
        this.fetchTargetLayers();
        this.editor.setConfig && this.editor.setConfig(EditorConfig);
        this.editor.setAdsorbThreshold && this.editor.setAdsorbThreshold(0.05);
        this.editor.setEditBoundary &&
            this.editor.setEditBoundary(this.regionGeojson);
    };

    addTargetLayers = layers => {
        this.targetLayers = (this.targetLayers || []).concat(layers);
        this.fetchTargetLayers();
    };

    fetchTargetLayers = () => {
        this.editor.setTargetLayers(this.targetLayers);
    };

    initMeasureControl = () => {
        this.measureControl = new MeasureControl();
        //设置测距参考坐标系1、墨卡托，2、局部地心
        this.measureControl.setMeasureMode(getCSYS());
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

    setSelectedCallBack = callback => {
        this.editor.onFeatureSelected((result, event) => {
            switch (this.editType) {
                case 'normal':
                    // console.log(result);
                    callback(result, event);
                    this.normalLocatePicture(result, event);
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
                case 'select_road_plane':
                    this.roadPlaneCallback(result, event);
                    break;
                case 'line_snap_stop':
                    this.selectFeatureCallback(result, event);
                    break;
                case 'assign_line_batch':
                    this.newFixLineCallback(result, event);
                    break;
            }
        });
    };

    normalLocatePicture = (result, event) => {
        if (
            (!result.length || result[0].type !== 'TraceLayer') &&
            this.locatePictureStatus &&
            event.button === 0
        ) {
            this.locatePictureEvent(event);
        }
    };

    setCreatedCallBack = callback => {
        this.editor.onFeatureCreated(async result => {
            if (this.editType === 'create_break_line') {
                this.breakByLineCallback(result);
            } else if (this.editType == 'copyLine') {
                this.copyLineCallback(result, event);
            } else if (this.editType == 'assign_line_batch') {
                this.newFixLineCallback(result, event);
            } else {
                callback && (await callback(result));
                AdEmitter.emit('fetchViewAttributeData');
            }
        });
    };

    setEditedCallBack = callback => {
        this.editor.onFeatureEdited(async result => {
            if (this.editType == 'movePointFeature') {
                this.movePointFeatureCallback(result, event);
            } else {
                callback && (await callback(result));
            }
        });
    };

    getEditLayer = () => {
        return this.editor && this.editor.editLayer;
    };

    //只消除选择
    clearPick = () => {
        if (!this.editor) return;
        this.editor.clear();
    };

    clearChoose = () => {
        this.removeCur();
        if (!this.editor) return;
        this.setEditType();
        this.editor.clear();
        this.editor.cancel();
        this.unPick();
    };

    @action setEditType = type => {
        this.editType = type || 'normal';
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

    delPointStyle = () => {
        let viz = document.querySelector('#viz');
        addClass(viz, 'move-point-viz');
    };

    roadPlanePointStyle = () => {
        let viz = document.querySelector('#viz');
        addClass(viz, 'crosshair-viz');
    };

    removeCur = () => {
        let viz = document.querySelector('#viz');
        removeClass(viz, 'edit-viz');
        removeClass(viz, 'ruler-viz');
        removeClass(viz, 'shape-viz');
        removeClass(viz, 'crosshair-viz');
        removeClass(viz, 'move-point-viz');
    };

    newPoint = () => {
        this.exitEdit();
        if (!this.editor) return;
        this.disableOtherCtrl();
        this.setEditType('new_point');
        this.changeCur();
        this.editor.newPoint();
    };

    newLine = () => {
        this.exitEdit();
        if (!this.editor) return;
        this.disableOtherCtrl();
        this.setEditType('new_line');
        this.changeCur();
        this.editor.newLine();
    };

    newCurvedLine = () => {
        this.exitEdit();
        if (!this.editor) return;
        this.disableOtherCtrl();
        this.setEditType('new_curved_line');
        this.changeCur();
        this.editor.newLine();
    };

    newPolygon = () => {
        this.exitEdit();
        if (!this.editor) return;
        this.disableOtherCtrl();
        this.setEditType('new_polygon');
        this.changeCur();
        this.editor.newPolygon();
    };

    newGroundRectangle = () => {
        this.exitEdit();
        if (!this.editor) return;
        this.disableOtherCtrl();
        this.setEditType('new_ground_rectangle');
        this.changeCur();
        this.editor.newPlaneTextMatrix();
    };

    newFacadeRectangle = () => {
        this.exitEdit();
        if (!this.editor) return;
        this.disableOtherCtrl();
        this.setEditType('new_facade_rectangle');
        this.changeCur();
        this.editor.newMatrix();
    };

    selectPointFromPC = () => {
        this.exitEdit();
        if (!this.editor) return;
        this.disableOtherCtrl();
        this.setEditType('select_road_plane');
        this.editor.selectPointFromPC();
        this.roadPlanePointStyle();
    };

    // 左右车道线生成中心线
    newAroundLine = () => {
        this.exitEdit();
        if (!this.editor) return;
        this.disableOtherCtrl();
        this.setEditType('new_around_line');
        this.editor.clear();
        this.editor.toggleMode(61); //多选模式
        this.removeCur();
        let layers = getAllLayersExByName('AD_LaneDivider');
        this.editor.setTargetLayers(layers);
    };

    // 路口内直行中心线生成
    newStraightLine = () => {
        this.exitEdit();
        if (!this.editor) return;
        this.disableOtherCtrl();
        this.setEditType('new_straight_line');
        this.editor.clear();
        this.editor.toggleMode(61);
        this.removeCur();
        let layers = getAllLayersExByName(this.editor.editLayer.layerName);
        this.editor.setTargetLayers(layers);
    };

    // 路口内转弯中心线生成
    newTurnLine = () => {
        this.exitEdit();
        if (!this.editor) return;
        this.disableOtherCtrl();
        this.setEditType('new_turn_line');
        this.editor.clear();
        this.editor.toggleMode(61);
        this.removeCur();
        let layers = getAllLayersExByName(this.editor.editLayer.layerName);
        this.editor.setTargetLayers(layers);
    };

    // 路口内掉头中心线生成
    newUTurnLine = () => {
        this.exitEdit();
        if (!this.editor) return;
        this.disableOtherCtrl();
        this.setEditType('new_Uturn_line');
        this.editor.clear();
        this.editor.toggleMode(61);
        this.removeCur();
        let layers = getAllLayersExByName(this.editor.editLayer.layerName);
        this.editor.setTargetLayers(layers);
    };

    @action topViewMode = opt => {
        if (!window.map) return;
        this.isTopView = opt;
        if (opt) {
            window.map.setCurrentView('U');
            window.map.disableRotate();
            this.enableRegionSelect();
        } else {
            window.map.enableRotate();
            this.disableRegionSelect();
        }
    };

    newVerticalMatrix = () => {
        this.exitEdit();
        if (!this.editor) return;
        this.disableOtherCtrl();
        this.setEditType('new_vertical_matrix');
        this.changeCur();
        this.editor.newVerticalMatrix();
    };

    newRel = () => {
        this.exitEdit();
        if (this.editType == 'newRel') return;
        this.disableOtherCtrl();
        this.setEditType('newRel');
        this.editor.clear();
        this.editor.toggleMode(61);
    };

    delRel = () => {
        if (this.editType == 'delRel') return;
        this.disableOtherCtrl();
        this.setEditType('delRel');
    };

    //

    lineSnapStop = (step = 0) => {
        if (step === 0) {
            if (this.editType == 'line_snap_stop') return;
            this.disableOtherCtrl();
            this.clearChoose();
            this.setEditType('line_snap_stop');
        } else if (step === 1) {
            this.editor.selectFeature(1);
            let layers = getAllLayersExByName('AD_StopLocation');
            this.editor.setTargetLayers(layers);
        }
    };

    batchAssinLaneNo = (step = 0) => {
        if (step === 0) {
            if (this.editType == 'assign_line_batch') return;
            this.disableOtherCtrl();
            this.clearChoose();
            this.setEditType('assign_line_batch');
        } else if (step === 1) {
            this.editor.newFixLine(2, 1);
        }
    };

    setSelectFeatureCallback = callback => {
        this.selectFeatureCallback = callback;
    };

    setNewFixLineCallback = callback => {
        this.newFixLineCallback = callback;
    };

    setNewRelCallback = callback => {
        this.newRelCallback = callback;
    };

    setRoadPlaneCallback = callback => {
        this.roadPlaneCallback = callback;
    };

    setDelRelCallback = callback => {
        this.delRelCallback = callback;
    };

    setBreakCallback = callback => {
        this.breakCallback = callback;
    };
    // 复制线要素
    setCopyLineCallback = callback => {
        this.copyLineCallback = callback;
    };

    setMovePointFeatureCallback = callback => {
        this.movePointFeatureCallback = callback;
    };

    setBreakByLineCallback = callback => {
        this.breakByLineCallback = callback;
    };

    // 两条车道线自动生成中心线
    setStraightCallback = callback => {
        this.straightCallback = callback;
    };

    // 路口内直行中心线生成
    setAroundCallback = callback => {
        this.aroundCallback = callback;
    };

    // 路口内转弯中心线生成
    setTurnCallback = callback => {
        this.turnCallback = callback;
    };

    // 输入两条路口进出中心线生成路口内中心线
    setUTurnCallback = callback => {
        this.uturnCallback = callback;
    };

    newCircle = () => {
        this.exitEdit();
        if (!this.editor) return;
        this.disableOtherCtrl();
        this.setEditType('new_circle');
        this.changeCur();
        this.editor.newFixedPolygon(3);
    };

    updateResult = flow(function* (result) {
        try {
            if (this.editType != 'new_circle') {
                return result;
            }
            let points = result.data.geometry.coordinates[0];
            let _result = yield TaskService.creatCircle(points);
            result.data.geometry.coordinates[0] = _result.data;
            return result;
        } catch (e) {
            console.log(e);
            message.warning('三点画圆服务请求失败：' + e.message, 3);
        }
    });

    updateFeature = result => {
        this.editor.editLayer.layer.updateFeatures([result]);
        return result;
    };

    insertPoints = () => {
        if (!this.editor) return;
        this.disableOtherCtrl();
        this.setEditType('insertPoints');
        this.editor.insertPoints();
        this.addShapePoint();
    };

    changePoints = () => {
        if (!this.editor) return;
        this.disableOtherCtrl();
        this.setEditType('changePoints');
        this.editor.changePoints();
    };

    deletePoints = () => {
        if (!this.editor) return;
        this.disableOtherCtrl();
        this.setEditType('delPoint');
        this.editor.deletePoints();
        this.delPointStyle();
    };

    movePointFeature = () => {
        if (!this.editor) return;
        this.disableOtherCtrl();
        this.setEditType('movePointFeature');
        this.editor.movePointFeature();
    };

    dragCopyedFeature = () => {
        if (!this.editor) return;
        this.disableOtherCtrl();
        this.setEditType('copyLine');
        this.changeCur();
        this.editor.dragCopyedFeature();
    };

    setPointSize = size => {
        pointCloudLayer.setPointSize(size);
    };

    @action pick = () => {
        this.beenPick = true;
    };

    @action unPick = () => {
        this.beenPick = false;

        this.clearHighLightFeatures();
    };

    startMeatureDistance = () => {
        this.exitEdit();
        this.setEditType('meature_distance');
        this.measureControl.startMeatureDistance();
        this.ruler();
    };

    startReadCoordinate = () => {
        this.exitEdit();
        this.setEditType('read_coordinate');
        this.addReadCoordinateLinstener();
    };

    getMeasureControlMode = () => {
        return this.measureControl.mode;
    };

    selectPointFromHighlight = () => {
        this.disableOtherCtrl();
        this.setEditType('select_point');
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
        switch (this.editType) {
            case 'meature_distance':
                this.measureControl.clear();
                break;
            case 'read_coordinate':
                this.removeReadCoordinateLinstener();
                break;
            case 'new_Uturn_line':
                this.newUturnExitEvent();
                this.fetchTargetLayers();
                break;
            case 'line_snap_stop':
            case 'new_around_line':
            case 'new_straight_line':
            case 'new_turn_line':
                this.fetchTargetLayers();
                break;
            default:
                break;
        }
    };

    bindKeyEvent = () => {
        document.onkeyup = event => {
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

    readCoordinate = event => {
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

    exitReadCoordinate = () => {
        if (this.editType === 'read_coordinate') {
            this.removeReadCoordinateLinstener();
            this.setEditType();
        }
    };

    @action setReadCoordinateResult = result => {
        this.readCoordinateResult = result;
    };

    @action setRegionGeojson = RegionGeojson => {
        this.regionGeojson = RegionGeojson;
    };

    enableRegionSelect = () => {
        this.editor && this.editor.enableRegionSelect();
    };

    disableRegionSelect = () => {
        this.editor && this.editor.disableRegionSelect();
    };

    setNewUturnExitEvent = event => {
        this.newUturnExitEvent = event;
    };

    toggleLocatePicture = () => {
        this.locatePictureStatus = !this.locatePictureStatus;
        this.locatePictureStatus
            ? this.openLocatePicture()
            : this.closeLocatePicture();
    };

    registerLocatePictureEvent = event => {
        this.locatePictureEvent = event;
    };

    createBreakLine = () => {
        if (!this.editor) return;
        this.setEditType('create_break_line');
        this.changeCur();
        this.editor.newFixLine(2);
    };

    openLocatePicture = () => {
        let viz = document.querySelector('#viz');
        viz.addEventListener('click', this.locatePicture);
    };

    closeLocatePicture = () => {
        let viz = document.querySelector('#viz');
        viz.removeEventListener('click', this.locatePicture);
    };

    locatePicture = event => {
        let isNotNormal = this.editType !== 'normal';
        if (isNotNormal && this.locatePictureStatus && event.button === 0) {
            this.locatePictureEvent(event);
        }
    };
}

export default new DataLayerStore();
