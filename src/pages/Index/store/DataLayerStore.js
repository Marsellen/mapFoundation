import { action, configure, flow, observable, computed } from 'mobx';
import { EditControl, MeasureControl, VectorLayer } from 'addis-viz-sdk';
import TaskService from 'src/services/TaskService';
import { Modal, message } from 'antd';
import {
    getLayerExByName,
    getFeatureOption,
    getLayerByName,
    getAllLayersExByName,
    getAllChooseLayersExByName
} from 'src/utils/vectorUtils';
import { addClass, removeClass, throttle, getCSYS } from 'src/utils/utils';
import AdEmitter from 'src/models/event';
import EditorConfig from 'src/config/ConctrolConfig';
import AttributeStore from 'src/pages/Index/store/AttributeStore.js';
import QCMarkerStore from 'src/pages/Index/store/QCMarkerStore';
import RightMenuStore from 'src/pages/Index/store/RightMenuStore';
import { getEventPointWkt, getFeaturePointWkt } from 'src/utils/pictureCtrl';
import sysProperties from 'src/models/sysProperties';
import BatchBuildStore from './BatchBuildStore';
import { editLock } from 'src/utils/decorator';
import { LINE_LAYERS } from 'src/config/DataLayerConfig';
import OtherVectorConfig from 'src/config/OtherVectorConfig';

const TRACKS = ['TraceListLayer', 'TraceLayer'];

configure({ enforceActions: 'always' });
class DataLayerStore {
    constructor() {
        this.editor;
        this.measureControl;
        this.highLightFeatures = [];

        // 修整线要素的吸附模式,默认为1
        // 1 表示既能拾取修正的线要素，又能拾取点云；
        // 0 表示只能拾取点云
        this.modifyLineAdsorbMode = 1;

        this.bindKeyEvent();
        this.readCoordinateEvent = throttle(this.readCoordinate, 10);
    }
    @observable adEditLayer;
    @observable editType = 'normal';
    @observable editStatus = 'normal'; //当前有两种编辑状态：normal（普通模式）、union-break（联合打断模式）
    @observable beenPick;
    @observable isTopView = false;
    @observable readCoordinateResult;
    @observable updateKey;
    @observable brushDisadled = true;
    @observable isQcOpen = false;
    @observable isMessage = true;
    @observable checkedPoint = [];
    @observable modifyLineType = true;
    //是否是联合打断模式
    @computed get isUnionBreak() {
        return this.editStatus === 'union-break';
    }
    //设置编辑状态
    @action setEditStatus = status => {
        this.clearEffect();
        this.editStatus = status;
    };
    //清除重置编辑状态的复作用
    clearEffect = () => {
        if (this.editStatus === 'union-break') {
            message.info({
                content: '退出联合打断状态',
                key: 'union-break',
                duration: 1
            });
        }
    };

    initEditor = layers => {
        const adsorbThreshold = sysProperties.getConfig('adsorbThreshold');
        this.editor = new EditControl();
        window.map && window.map.getControlManager().addControl(this.editor);
        this.targetLayers = (layers || []).flatMap(item => (item ? [item] : []));
        this.fetchTargetLayers();
        this.editor.setConfig && this.editor.setConfig(EditorConfig);
        this.editor.setAdsorbThreshold && this.editor.setAdsorbThreshold(adsorbThreshold);
        this.editor.setEditBoundary && this.editor.setEditBoundary(this.regionGeojson);
    };

    addTargetLayers = layers => {
        this.targetLayers = (this.targetLayers || []).concat(layers);
        this.fetchTargetLayers();
    };

    fetchTargetLayers = () => {
        if (!this.editor) return;
        this.editor.setTargetLayers(this.targetLayers);
    };

    setTargetLayers = layers => {
        if (!this.editor) return;
        this.editor.setTargetLayers(layers);
    };

    initMeasureControl = () => {
        this.measureControl = new MeasureControl();
        //设置测距参考坐标系1、墨卡托，2、局部地心
        this.measureControl.setMeasureMode(getCSYS());
        map.getControlManager().addControl(this.measureControl);
        map.getEventManager().register('editor_event_selectpoint_start', data =>
            this.moveSelectPoint(data)
        );
    };

    @action moveSelectPoint = data => {
        this.checkedPoint = data;
    };

    @action clearCheckedPoint = () => {
        this.checkedPoint = [];
    };

    //可能不传参数，可能传图层名，可能传图层
    @action activeEditor = name => {
        let layer;
        switch (typeof name) {
            case 'object':
                layer = name;
                break;
            case 'string':
                layer = getLayerExByName(name);
                break;
            default:
                layer = null;
                break;
        }
        this.editor?.setEditLayer(layer);
        if (layer?.layerName !== 'AD_Horizontal') {
            this.editor ? this.exitEdit() : this.initEditor();
            this.adEditLayer = layer;
            this.setEditStatus('normal'); //设置编辑状态
            this.isTopView && this.enableRegionSelect(); //重置框选可选图层
            this.updateKey = Math.random();
        }
        return layer;
    };

    // 质检员选取错误数据
    @action QCAttrModal = () => {
        this.isQcOpen = true;
    };

    // 质检员选取错误数据
    @action UnQCAttrModal = editTypeArr => {
        if (!editTypeArr.includes(this.editType)) return;
        this.isQcOpen = false;
        this.setEditType();
        let viz = document.querySelector('#viz');
        removeClass(viz, 'error-viz');
        this.fetchTargetLayers();
    };

    setSelectedCallBack = callback => {
        this.editor.onFeatureSelected((result, event) => {
            switch (this.editType) {
                case 'normal':
                    // console.log(result);
                    callback(result, event);
                    this.normalLocatePicture(result, event);
                    break;
                case 'new_rel':
                    this.newRelCallback(result, event);
                    break;
                case 'del_rel':
                    this.delRelCallback(result, event);
                    break;
                case 'break_line':
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
                case 'attribute_brush':
                    this.attributeBrushCallback(result, event);
                    break;
                case 'error_layer':
                    this.errorLayerCallback(result, event);
                    break;
                case 'choose_error_feature':
                    this.chooseErrorFeatureCallback(result, event);
                    break;
                case 'dashed_polygon_create':
                    this.dashedPolygonCreateCallback(result, event);
                    break;
                case 'group_move':
                    this.groupMoveCallback(result, event);
                    break;
                case 'batch_build':
                    break;
                case 'buffer_render':
                    this.bufferRenderCallback(result, event);
                    break;
            }
        });
    };

    @action attributeBrushPick = () => {
        //属性刷置灰
        this.brushDisadled = true;
    };
    @action unAttributeBrushPick = () => {
        //属性刷置灰
        this.brushDisadled = false;
    };

    normalLocatePicture = (result, event) => {
        if (this.locatePictureStatus && (!event || event.button === 0)) {
            if (!result.length) {
                let pointWkt = getEventPointWkt(event);
                this.locatePictureEvent(pointWkt);
            } else if (!TRACKS.includes(result[0].type)) {
                let pointWkt = getFeaturePointWkt(result[0]);
                this.locatePictureEvent(pointWkt);
            }
        }
    };

    setCreatedCallBack = callback => {
        this.editor.onFeatureCreated(async (result, event) => {
            if (result.layerName === 'AD_Marker') {
                this.QCMarkerCallback(result, event);
            } else {
                switch (this.editType) {
                    case 'break_line_by_line':
                        this.breakByLineCallback(result);
                        break;
                    case 'copy_line':
                        this.copyLineCallback(result, event);
                        break;
                    case 'group_move':
                        this.groupMoveRightCallback(result, event);
                        break;
                    case 'assign_line_batch':
                        this.newFixLineCallback(result, event);
                        break;
                    case 'batch_build':
                        this.horizontalCallback(result, event);
                        break;
                    default:
                        callback && (await callback(result));
                        AdEmitter.emit('fetchViewAttributeData');
                        break;
                }
            }
        });
    };

    setEditedCallBack = callback => {
        this.editor.onFeatureEdited(async result => {
            if (this.editType == 'move_point_feature') {
                this.movePointFeatureCallback(result, event);
            } else if (this.editType == 'change_points') {
                this.changePointsCallback(result);
            } else {
                callback && (await callback(result));
            }
        });
    };

    horizontalCallback = (result, event) => {
        try {
            if (result.errorCode == 301) {
                BatchBuildStore.setHorizontalToolStatus(true);
                this.openDrawHorizontal();
                return;
            }
            result.layerName = window.horizontal.layerName;
            result.layerId = window.horizontal.layerId;
            result.data = {
                geometry: result.data.geometry,
                properties: { HORIZONTAL_ID: 1 },
                type: 'Feature'
            };
            if (event.button == 2) {
                this.openDrawHorizontal();
            }
        } catch (e) {
            if (result) {
                let layer = this.getAdEditLayer();
                layer && layer.layer.removeFeatureById(result.uuid);
            }
        }
    };

    getEditLayer = () => {
        return this.editor?.editLayer;
    };

    getAdEditLayer = () => {
        return this.adEditLayer;
    };

    //获取编辑图层名
    getEditLayerName = () => {
        return this.editor?.editLayer?.layerName;
    };

    getAdEditLayerName = () => {
        return this.adEditLayer?.layerName;
    };

    //只消除选择
    clearPick = () => {
        if (!this.editor) return;
        this.editor.clear();
    };

    clearChoose = () => {
        if (!window.map) return;
        if (!this.editor) return;
        this.clearSelfDebuff();
        this.setEditType();
        this.editor.clear();
        this.editor.cancel();
        this.unPick();
        this.UnQCAttrModal(['error_layer', 'choose_error_feature']);
        this.attributeBrushPick();
        this.showMessage();
        this.clearCheckedPoint();
        AttributeStore.showTime(true);
    };

    @action setEditType = type => {
        RightMenuStore.hide();
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

    errorLayer = () => {
        let viz = document.querySelector('#viz');
        addClass(viz, 'error-viz');
    };

    // 新增，打断形状点鼠标样式
    addShapePoint = () => {
        let viz = document.querySelector('#viz');
        addClass(viz, 'shape-viz');
    };

    roadPlanePointStyle = () => {
        let viz = document.querySelector('#viz');
        addClass(viz, 'crosshair-viz');
    };

    trimStyle = () => {
        let viz = document.querySelector('#viz');
        addClass(viz, 'trim-viz');
    };

    curveStyle = () => {
        let viz = document.querySelector('#viz');
        addClass(viz, 'curve-viz');
    };

    removeCur = () => {
        let viz = document.querySelector('#viz');
        removeClass(viz, 'edit-viz');
        removeClass(viz, 'ruler-viz');
        removeClass(viz, 'shape-viz');
        removeClass(viz, 'crosshair-viz');
        removeClass(viz, 'move-point-viz');
        removeClass(viz, 'shuxingshua-viz');
        removeClass(viz, 'trim-viz');
        removeClass(viz, 'curve-viz');
        removeClass(viz, 'error-viz');
    };

    newPoint = () => {
        this.exitEdit();
        if (!this.editor) return;
        this.setEditType('new_point');
        this.changeCur();
        this.editor.newPoint();
    };

    newLine = () => {
        this.exitEdit();
        if (!this.editor) return;
        this.setEditType('new_line');
        this.changeCur();
        this.editor.newLine();
    };

    newCurvedLine = () => {
        //绘制曲线
        this.exitEdit();
        if (!this.editor) return;
        const drawNodeDensity = sysProperties.getConfig('drawNodeDensity');
        this.setEditType('new_curved_line');
        this.changeCur();
        this.editor.newCurveLine(drawNodeDensity);
    };

    AttributeBrush = () => {
        //属性刷
        if (this.editType == 'attribute_brush') return;
        this.clearAllEditDebuff();
        this.setEditType('attribute_brush');
        this.changeCur();
        this.editor.selectFeature(1);
    };

    newPolygon = () => {
        this.exitEdit();
        if (!this.editor) return;
        this.setEditType('new_polygon');
        this.changeCur();
        this.editor.newPolygon();
    };

    newGroundRectangle = () => {
        this.exitEdit();
        if (!this.editor) return;
        this.setEditType('new_ground_rectangle');
        this.changeCur();
        this.editor.newPlaneTextMatrix();
    };

    newFacadeRectangle = () => {
        this.exitEdit();
        if (!this.editor) return;
        this.setEditType('new_facade_rectangle');
        this.changeCur();
        this.editor.newMatrix();
    };

    selectPointFromPC = () => {
        this.exitEdit();
        if (!this.editor) return;
        this.setEditType('select_road_plane');
        this.editor.selectPointFromPC();
        this.roadPlanePointStyle();
    };

    bufferRender = () => {
        this.exitEdit();
        if (!this.editor) return;
        this.setEditType('buffer_render');
        let layers = getAllLayersExByName(LINE_LAYERS);
        this.enableRegionSelect(layers);
    };

    newQCMarker = () => {
        this.exitEdit();
        if (!this.editor) return;
        this.setEditType('qc_marker');
        this.changeCur();
        this.editor.newLine();
    };

    // 左右车道线生成中心线
    newAroundLine = () => {
        this.exitEdit();
        if (!this.editor) return;
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
        this.setEditType('new_Uturn_line');
        this.editor.clear();
        this.editor.toggleMode(61);
        this.removeCur();
        let layers = getAllLayersExByName(this.editor.editLayer.layerName);
        this.editor.setTargetLayers(layers);
    };

    // 位姿调整
    postureAdjust = () => {
        if (this.editType == 'posture_adjust') return;
        this.clearAllEditDebuff();
        this.setEditType('posture_adjust');
        this.editor.changeFeaturePos();
    };

    // 中心点平移
    ChangeFeaturePosMode = mode => {
        if (!this.editor) return;
        this.changeCur();
        if (mode == 0) {
            //判断是否允许点点平移，0允许，1不允许
            this.editor.setChangeFeaturePosMode(0);
        } else if (mode == 1) {
            this.editor.setChangeFeaturePosMode(1);
        }
    };

    // 位姿调整完成
    finishChangeFeaturePos = () => {
        return this.editor.finishChangeFeaturePos();
    };

    // 位姿调整平移
    changeFeaturePosMicro = (dir, pre) => {
        this.editor.changeFeaturePosMicro(dir, pre);
    };

    // 虚线面构建
    dashedPolygonCreate = (step = 0) => {
        if (step == 0) {
            this.exitEdit();
            if (!this.editor) return;
            this.setEditType('dashed_polygon_create');
            let layers = getAllLayersExByName('AD_LaneDivider');
            this.editor.setTargetLayers(layers);
        } else if (step == 1) {
            this.addShapePoint();
            this.editor.selectFixedPointFromHighlight(3);
        }
    };

    newTemplateArrow() {
        this.exitEdit();
        if (!this.editor) return;
        this.setEditType('new_template_arrow');
        this.changeCur();
        this.editor.newFixedPolygon(3);
    }

    @action topViewMode = opt => {
        this.isTopView = opt;
        this.updateKey = Math.random();
    };

    @action hideMessage = () => {
        this.isMessage = false;
    };

    @action showMessage = () => {
        this.isMessage = true;
    };

    newVerticalMatrix = () => {
        this.exitEdit();
        if (!this.editor) return;
        this.setEditType('new_vertical_matrix');
        this.changeCur();
        this.editor.newVerticalMatrix();
    };

    newRel = () => {
        this.exitEdit();
        if (this.editType == 'new_rel') return;
        this.setEditType('new_rel');
        this.editor.clear();
        this.editor.toggleMode(61);
    };

    delRel = () => {
        if (this.editType == 'del_rel') return;
        this.clearAllEditDebuff();
        this.setEditType('del_rel');
    };

    lineSnapStop = (step = 0) => {
        if (step === 0) {
            if (this.editType == 'line_snap_stop') return;
            this.exitEdit();
            AttributeStore.hide(); //隐藏属性窗口
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
            this.exitEdit();
            AttributeStore.hide(); //隐藏属性窗口
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

    setAttributeBrushCallback = callback => {
        this.attributeBrushCallback = callback;
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

    setChangePointsCallback = callback => {
        this.changePointsCallback = callback;
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

    setErrorLayerCallback = callback => {
        this.errorLayerCallback = callback;
    };

    setChooseErrorFeatureCallback = callback => {
        this.chooseErrorFeatureCallback = callback;
    };

    setQCMarkerCallback = callback => {
        this.QCMarkerCallback = callback;
    };

    setDashedPolygonCreateCallback = callback => {
        this.dashedPolygonCreateCallback = callback;
    };

    setGroupMoveCallback = callback => {
        this.groupMoveCallback = callback;
    };

    setGroupMoveRightCallback = callback => {
        this.groupMoveRightCallback = callback;
    };

    setNewTemplateArrowCallback = callback => {
        this.newTemplateArrowCallback = callback;
    };

    setBufferRenderCallback = callback => {
        this.bufferRenderCallback = callback;
    };

    chooseErrorLayer = editType => {
        this.exitEdit();
        if (!this.editor) return;
        this.setEditType(editType);
        this.errorLayer();
        let layers = getAllChooseLayersExByName('AD_Map_QC');
        this.editor.setTargetLayers(layers);
    };

    newCircle = () => {
        this.exitEdit();
        if (!this.editor) return;
        this.setEditType('new_circle');
        this.changeCur();
        this.editor.newFixedPolygon(3);
    };

    updateResult = flow(function* (result) {
        switch (this.editType) {
            case 'new_circle':
                return yield this.newCircleCallBack(result);
            case 'new_template_arrow':
                return this.newTemplateArrowCallback(result);
            default:
                return result;
        }
    });

    newCircleCallBack = async result => {
        try {
            let points = result.data.geometry.coordinates[0];
            let _result = await TaskService.creatCircle(points);
            result.data.geometry.coordinates[0] = _result.data;
            return result;
        } catch (e) {
            console.log(e);
            message.warning('三点画圆服务请求失败：' + e.message, 3);
        }
    };

    updateFeature = result => {
        let layer = getLayerByName(result.layerName);
        layer.updateFeatures([result]);
        return result;
    };

    forceDeleteFeature = () => {
        if (!this.editor) return;
        this.clearAllEditDebuff();
        this.setEditType('force_delete');
    };

    batchBuildFeature = () => {
        if (!this.editor) return;
        this.clearAllEditDebuff();
        this.setEditType('batch_build');
    };

    openDrawHorizontal = () => {
        if (!this.editor) return;
        this.setEditType('batch_build');
        this.initBuildLayer();
        this.activeEditor(window.horizontal);
        this.horizontalTip = message.info({
            content: '面向道路前进方向，绘制垂直于车道线的路面横截线（2点线）',
            key: 'horizontal',
            duration: 0
        });
        this.changeCur();
        this.editor.newLine();
    };

    closeDrawHorizontal = () => {
        this.horizontalTip?.();
        this.editor.cancel();
        this.removeCur();
    };

    initBufferLayer = () => {
        if (window.bufferLayer) return;
        const bufferLayer = new VectorLayer();
        bufferLayer.layerName = 'AD_bufferLayer';
        window.map.getLayerManager().addLayer('VectorLayer', bufferLayer);
        window.bufferLayer = {
            layerName: bufferLayer.layerName,
            layerId: bufferLayer.layerId,
            layer: bufferLayer
        };
    };

    clearBufferRender = () => {
        window.bufferLayer?.layer?.clear?.();
    };

    clearDrawHorizontal = () => {
        window.horizontal?.layer?.clear?.();
        window.horizontal = null;
    };

    resetEditLayer = () => {
        this.activeEditor(this.getAdEditLayer());
    };

    initBuildLayer = () => {
        if (window.horizontal) return;
        const { AD_Horizontal } = OtherVectorConfig;
        const horizontal = new VectorLayer(null, { layerConfig: AD_Horizontal });
        horizontal.layerName = 'AD_Horizontal';
        window.map.getLayerManager().addLayer('VectorLayer', horizontal);
        window.horizontal = {
            layerName: horizontal.layerName,
            layerId: horizontal.layerId,
            layer: horizontal
        };
    };

    changePoints = () => {
        if (!this.editor) return;
        this.clearAllEditDebuff();
        this.setEditType('change_points');
        this.addShapePoint();
        this.editor.modifyFeaturePoints();
    };

    movePointFeature = () => {
        if (!this.editor) return;
        this.clearAllEditDebuff();
        this.setEditType('move_point_feature');
        this.editor.movePointFeature();
    };

    dragCopyedFeature = () => {
        if (!this.editor) return;
        this.clearAllEditDebuff();
        this.setEditType('copy_line');
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

    //顶部工具栏-测距
    startMeatureDistance_1 = () => {
        this.exitEdit();
        this.setEditType('meature_distance');
        //右键回调
        this.measureControl.onMeasureFinish(() => {
            this.measureControl.startMeatureDistance();
        });
        this.measureControl.startMeatureDistance();
        this.ruler();
    };

    //进入-批量生成-测距
    startMeatureDistance_2 = (featuresName, index) => {
        this.setEditType('meature_distance_2');
        //右键回调
        this.measureControl.onMeasureFinish(result => {
            const distance = Number(result?.distance);
            BatchBuildStore.updateFeature(featuresName, index, 'DISTANCE', distance);
            BatchBuildStore.clearActiveRange();
            this.measureControl.clear();
            this.removeCur();
        });
        this.measureControl.startMeatureDistance();
        this.ruler();
    };

    //退出-批量生成-测距
    exitMeatureDistance_2 = () => {
        this.measureControl.clear();
        this.removeCur();
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
        this.clearAllEditDebuff();
        this.setEditType('break_line');
        this.editor.selectPointFromHighlight();
        this.addShapePoint();
    };

    //选中要素，要素将处于选中状态(变色)，将该要素设置成sdk当前操作要素
    setSelectFeature = (layerId, uuid) => {
        if (!this.editor) return;
        this.editor.setSelectFeature(layerId, uuid);
    };

    //只是改变要素颜色
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

    clearAllEditDebuff = () => {
        this.disableOtherCtrl();
        this.clearSelfDebuff();
    };

    //未执行完此次编辑操作切换控件时触发
    disableOtherCtrl = () => {
        switch (this.editType) {
            case 'meature_distance':
            case 'meature_distance_2':
                this.measureControl.clear();
                break;
            case 'read_coordinate':
                this.removeReadCoordinateLinstener();
                break;
            case 'new_Uturn_line':
                this.newUturnExitEvent();
                break;
            case 'trim':
                message.destroy();
                break;
            case 'error_layer':
            case 'choose_error_feature':
                this.UnQCAttrModal([this.editType]);
                break;
            case 'buffer_render':
                this.clearBufferRender();
                break;
            default:
                break;
        }
    };

    //执行完此次编辑操作切换控件时触发
    clearSelfDebuff = () => {
        switch (this.editType) {
            case 'new_Uturn_line':
            case 'line_snap_stop':
            case 'attribute_brush':
            case 'new_around_line':
            case 'new_straight_line':
            case 'new_turn_line':
            case 'posture_adjust':
            case 'error_layer':
            case 'dashed_polygon_create':
            case 'choose_error_feature':
            case 'buffer_render':
                this.fetchTargetLayers();
                break;
            case 'trim':
                this.modifyLineAdsorbMode = 1;
                this.editor.setModifyLineAdsorbMode(this.modifyLineAdsorbMode);
                this.editor.toggleMode(0);
                this.editor.modifyLineType = 'broken';
                this.setModifyLineType(true);
                break;
            case 'batch_build':
                this.closeDrawHorizontal();
                this.clearDrawHorizontal();
                BatchBuildStore.release();
            case 'meature_distance_2':
                BatchBuildStore.release();
                break;
            default:
                break;
        }

        this.removeCur();
    };

    //注册“退出质检标注图层”事件
    exitMarker = (isDelete = true) => {
        this.exitEdit();
        this.activeEditor();
        this.fetchTargetLayers(); //重置可选图层
        QCMarkerStore.exitMarker(isDelete);
    };

    //esc提示窗
    escModal = callback => {
        Modal.confirm({
            title: '是否退出',
            okText: '确定',
            cancelText: '取消',
            onOk: callback
        });
    };

    bindKeyEvent = () => {
        document.onkeyup = event => {
            if (!event) return;
            switch (event.keyCode) {
                case 27:
                    //esc
                    this.escEvent();
                    break;
                case 90:
                    //Z
                    if (
                        this.editType.includes('new_') ||
                        this.editType == 'trim' ||
                        this.editType == 'dashed_polygon_create'
                    ) {
                        this.editor.undo();
                    }
                    break;
                case 32:
                    //space
                    if (this.editType == 'trim') {
                        this.modifyLineAdsorbMode = 1 - this.modifyLineAdsorbMode;
                        this.setModifyLineAdsorbMode();
                    }
                    break;
                case 74:
                    //Alt + J
                    if (event.altKey == true && this.editType == 'trim' && this.modifyLineType) {
                        let viz = document.querySelector('#viz');
                        switch (this.editor.modifyLineType) {
                            case 'broken':
                                this.editor.modifyLineType = 'curve';
                                this.setModifyTypeContent('curve');
                                this.removeCur();
                                addClass(viz, 'curve-viz');
                                break;
                            case 'curve':
                                this.editor.modifyLineType = 'broken';
                                this.setModifyTypeContent('broken');
                                this.removeCur();
                                addClass(viz, 'trim-viz');
                                break;
                            default:
                                break;
                        }
                    }
                    break;
                default:
                    break;
            }
        };
    };

    @editLock
    escEvent = () => {
        const editLayerName = this.getAdEditLayerName();
        if (editLayerName === 'AD_Marker') {
            this.exitMarker();
            message.warning('退出功能', 3);
        } else if (this.editType !== 'normal') {
            this.exitEdit();
            message.warning('退出功能', 3);
        }
    };

    @action setModifyLineType = visible => {
        this.modifyLineType = visible;
    };

    @action setModifyTypeContent = text => {
        message.info({
            key: 'trim_info',
            duration: 2,
            content: `${text == 'broken' ? '折线' : '曲线'}修复`
        });
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

    enableRegionSelect = layers => {
        const { ZT1, ZT2 } = sysProperties.configs;
        const regionSelect = { regionSelectUp: ZT2, regionSelectDown: ZT1 };
        this.editor && this.editor.enableRegionSelect(layers, regionSelect);
    };

    disableRegionSelect = () => {
        this.editor && this.editor.disableRegionSelect();
    };

    setNewUturnExitEvent = event => {
        this.newUturnExitEvent = event;
    };

    toggleLocatePicture = () => {
        this.locatePictureStatus = !this.locatePictureStatus;
        this.locatePictureStatus ? this.openLocatePicture() : this.closeLocatePicture();
    };

    registerLocatePictureEvent = event => {
        this.locatePictureEvent = event;
    };

    createBreakLine = () => {
        if (!this.editor) return;
        this.setEditType('break_line_by_line');
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
            let pointWkt = getEventPointWkt(event);
            this.locatePictureEvent(pointWkt);
        }
    };

    trim() {
        if (!this.editor) return;
        const repairNodeDensity = sysProperties.getConfig('repairNodeDensity');
        this.clearAllEditDebuff();
        this.setEditType('trim');
        this.trimStyle();
        this.editor.modifyLine(this.editor.modifyLineType, repairNodeDensity);
    }

    groupMove = (data, step = 0) => {
        if (step == 0) {
            if (!this.editor) return;
            this.setEditType('group_move');
            this.addShapePoint();
            this.editor.selectPointFromHighlight();
        } else if (step == 1) {
            this.changeCur();
            this.editor.dragMoveFeature(data, 10);
        }
    };

    setModifyLineAdsorbMode = () => {
        this.editor.setModifyLineAdsorbMode(this.modifyLineAdsorbMode);
        let content = `${this.modifyLineAdsorbMode ? '开启' : '关闭'}吸附到矢量功能`;

        message.info({
            key: 'trim_info',
            duration: 2,
            content
        });
    };

    changeUnAble = () => {
        return UNABLE_CHANGE_TYPES.includes(this.editType);
    };
}

const UNABLE_CHANGE_TYPES = [
    'del_rel',
    'trim',
    'attribute_brush',
    'break_line',
    'copy_line',
    'move_point_feature',
    'change_points',
    'posture_adjust',
    'dashed_polygon_create',
    'group_move'
];

export default new DataLayerStore();
