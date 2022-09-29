import { observable, configure, action, computed, flow } from 'mobx';
import { Map, PcdLayer, VectorLayer, Utils, LayerGroup } from '@ad/xmap';
import axios from 'axios';
import { getFeatureByOptionFormAll } from 'src/util/vectorUtils';
import { fetchCallback } from 'src/util/map/utils';
import { showPictureShowView, showAttributesModal, showRightMenu } from 'src/util/map/viewCtrl';
import { modUpdStatGeometry, checkSdkError, getLayerExByName } from 'src/util/vectorUtils';
import { logDecorator, editOutputLimit } from 'src/util/decorator';
import HomeVisiteHistory from 'src/util/visiteHistory/homeVisiteHistory';
import { installMapListener } from 'src/util/map/event';
import editLog from 'src/util/editLog';
import TextStore from 'src/store/home/textStore';
import ResourceLayerStore from 'src/store/home/resourceLayerStore';
import BatchAssignStore from 'src/store/home/batchAssignStore';
import DataLayerStore from 'src/store/home/dataLayerStore';
import NewFeatureStore from 'src/store/home/newFeatureStore';
import DefineModeStore from 'src/store/home/defineModeStore';
import PictureShowStore from 'src/store/home/pictureShowStore';
import OperateHistoryStore from 'src/store/home/operateHistoryStore';
import AttributeStore from 'src/store/home/attributeStore';
import RenderModeStore from 'src/store/home/renderModeStore';
import RelStore from 'src/store/home/relStore';
import AttrStore from 'src/store/home/attrStore';
import TaskStore from 'src/store/home/taskStore';
import PointCloudStore from 'src/store/home/pointCloudStore';
import VectorsStore from 'src/store/home/vectorsStore';
import ToolCtrlStore from 'src/store/home/toolCtrlStore';
import QCMarkerStore from 'src/store/home/qcMarkerStore';
import InformationStore from 'src/store/home/informationStore';
import BufferStore from 'src/store/home/bufferStore';
import QualityCheckStore from 'src/store/home/qualityCheckStore';
import BatchBuildStore from 'src/store/home/batchBuildStore';
import UpdStatModeStore from 'src/store/home/updStatModeStore';
import CheckModeStore from 'src/store/home/checkModeStore';
import RightMenuStore from 'src/store/home/rightMenuStore';
import AttrRightMenuStore from 'src/store/home/attrRightMenuStore';
import { RESOURCE_LAYER_VECTOR } from 'src/config/dataLayerConfig';
import { DefaultStyleConfig } from 'src/config/defaultStyleConfig';

configure({ enforceActions: 'always' });
/**
 *  控制地图的所有全量
 */
class mapStore {
    constructor() {
        this.createdCallBack = this.createdCallBack.bind(this);
        this.handleCreatedCallBack = this.handleCreatedCallBack.bind(this);
    }
    // 地图试图
    mapViewer = null;
    // 临时图层
    vectorLayer = null;
    // 临时存储高亮数据
    tempObjs = [];
    // 加载矢量地图
    addVectorLayer = (opts = {}) => {
        let layer = null;
        if (!opts.url) {
            layer = new VectorLayer(null, opts);
        } else {
            layer = new VectorLayer(opts.url, opts);
        }
        layer.setDefaultStyle(opts);
        let layerName;
        if (opts.layerName === '' || opts.layerName === undefined) {
            layerName = layer.layerId;
            layer.layerName = layer.layerId;
        }
        else {
            layerName = opts.layerName;
        }
        this.mapViewer.getLayerManager().addLayer('VectorLayer', layer);
        if (opts.tracePoint) {
            DataLayerStore.addTargetLayers({ layerId: layer.layerId, layerName: layerName, layer });
            if (DataLayerStore.measureControl) {
                DataLayerStore.measureControl.addTargetLayers({ layerId: layer.layerId, layerName: layerName, layer });
            }
        }
        return layer;
    };
    init = async () => {
        await this.release();
        this.initMap('viz');
        this.mapViewer.setKeySpeedRange(1, 0.125, 16);
        this.mapViewer.viewer.setControls('EarthControls');
        window.map = this.mapViewer;
        this.initVectors();
        //设置画面缩放比例
        this.installListener();
        this.renderMode(); //根据渲染模式，初始化注记和符号
        // this.setBackground('./bg.png')
    };
    // 初始化地图
    initMap = name => {
        const div = document.getElementById(name);
        this.mapViewer = new Map(div, { isLevel: false });
        this.mapViewer._scene.view.maxPitch = (-10 * Math.PI) / 180;
    };
    // 将文件geojson数据转换成图层要素
    addGeoToFeatures = (layer, urls) => {
        // let res = yield Promise.all(urls.map(axios.get));
        if (urls.length > 0) {
            urls.forEach(url => {
                axios(url)
                    .then(res => {
                        if (res.data.features.length > 0) {
                            layer.addFeatures(res.data.features);
                        }
                    })
                    .catch(error => {
                        console.log(error);
                    });
            });
        }

        // if (res.length > 0) {
        //     res.forEach(item => {
        //         if (item.data.features.length > 0) {
        //             layer.addFeatures(item.data.features);
        //         }
        //     });
        // }
    };
    addGeoToFeature = flow(function* (layer, url, opts) {
        yield axios(url)
            .then(res => {
                if (res.data.features.length > 0) {
                    res.data.features.forEach(feature => {
                        feature.properties = Object.assign(feature.properties, opts);
                    });
                    layer.addFeatures(res.data.features);
                }
                return true;
            })
            .catch(error => {
                console.log(error);
                return false;
            });
    });
    updateFeatureColor(layerName, option, matOption) {
        let [layer] = getFeatureByOptionFormAll(layerName, option);
        if (layer) {
            layer.updateFeatureColor(option, matOption.color, false);
            const objs = this.lineToFatline(layer.shapeNode, option, matOption);
            if (objs.length > 0) {
                objs.forEach(obj => {
                    this.tempObjs.push(obj);
                    this.mapViewer._scene.scene.add(obj);
                });
            }
        }
    }
    clear() {
        this.tempObjs.forEach(item => {
            this.mapViewer._scene.scene.remove(item);
        });
        this.tempObjs = [];
    }
    lineToFatline(shapeNode, option, matOption) {
        return Utils.lineToFatline(shapeNode, option, matOption);
    }
    // release = () => {
    //     this.mapViewer && this.mapViewer.release();
    //     this.mapViewer = null;
    // };
    initVectors = async () => {
        window.vectorLayerGroup = new LayerGroup([], {
            styleConifg: DefaultStyleConfig
        });
        await map.getLayerManager().addLayerGroup(vectorLayerGroup, fetchCallback);
        VectorsStore.addLayer(vectorLayerGroup);

        return {
            layerName: RESOURCE_LAYER_VECTOR,
            layer: vectorLayerGroup
        };
    };
    installListener = () => {
        //禁用浏览器默认右键菜单
        document.oncontextmenu = function (e) {
            e.preventDefault();
            // return false;
        };

        //监听浏览器即将离开当前页面事件
        window.onbeforeunload = function (e) {
            //保存当前任务比例
            if (window.map) {
                const { activeTaskId } = TaskStore;
                const preTaskScale = window.map.getEyeView();
                const { position } = preTaskScale;
                const { x, y, z } = position;
                if (!(x === 0 && y === 0 && z === 0)) {
                    // AdLocalStorage.setTaskInfosStorage({
                    //     taskId: activeTaskId,
                    //     taskScale: preTaskScale
                    // });
                }
            }
            //离开页面时减少访问次数
            HomeVisiteHistory.removeVisitedHistory();
            const visiteHistory = HomeVisiteHistory.getVisitedHistory();
            const isDevelopment = process.env.NODE_ENV === 'development';
            if (visiteHistory.length < 1 && !isDevelopment) {
                e = window.event || e;
                e.returnValue = `确定离开当前页面吗？`;
                return e.returnValue;
            }
        };

        // attributes 拾取控件
        let boundaryLayers = window.boundaryLayerGroup ? window.boundaryLayerGroup.layers : [];
        const vectorLayers = window.vectorLayerGroup ? window.vectorLayerGroup.layers : [];

        DataLayerStore.initEditor([
            { layer: pointCloudLayer },
            ...vectorLayers,
            // { layer: window.trackLayer },
            ...boundaryLayers,
            window.markerLayer,
            window.informationLayer
        ]);

        DataLayerStore.initMeasureControl();
        DataLayerStore.setSelectedCallBack(this.selectedCallBack);
        DataLayerStore.setCreatedCallBack(this.createdCallBack);
        DataLayerStore.setEditedCallBack(this.editedCallBack);

        installMapListener();
    };
    @logDecorator({ operate: '修改要素几何', skipRenderMode: true })
    editedCallBack(result) {
        const oldFeature = RightMenuStore.getFeatures()[0];
        try {
            //判断是否绘制成功
            checkSdkError(result);

            if (DataLayerStore.editType === 'change_points') {
                message.success('修改形状点完成，需检查数据的关联关系正确性');
            }
            if (DataLayerStore.editType === 'trim') {
                message.info({
                    key: 'trim',
                    duration: 3,
                    content: '线要素修整成功'
                });
            }

            result = modUpdStatGeometry(result);

            let history = { features: [[oldFeature], [result]] };
            return history;
        } catch (e) {
            //恢复要素
            DataLayerStore.updateFeature(oldFeature);
            message.error({
                key: DataLayerStore.editType,
                duration: 3,
                content: e.message
            });
            throw e;
        }
    }
    @logDecorator({ operate: '新建要素', skipRenderMode: true })
    async createdCallBack(result) {
        //console.log(result);
        let data;
        DataLayerStore.hideMessage();
        try {
            //判断是否绘制成功
            checkSdkError(result);
            //更新要素
            data = result;
            data = await DataLayerStore.updateResult(result);
            await this.handleCreatedCallBack(data);
            let history = { features: [[], [data]] };
            return history;
        } catch (e) {
            if (data) {
                let layer = DataLayerStore.getAdEditLayer();
                layer && layer.layer.removeFeatureById(data.uuid);
            }
            throw e;
        }
    }
    @editOutputLimit()
    async handleCreatedCallBack(data) {
        // 请求id服务，申请id
        data = await NewFeatureStore.init(data);
        // 更新id到sdk
        DataLayerStore.updateFeature(data);
        //显示要素属性窗口
        showAttributesModal(data);
    }
    selectedCallBack = (result, event) => {
        if (result && result.length > 0) {
            const firstFeature = result[0];
            const { type: featureType, layerName: featureLayerName } = firstFeature;
            // const editLayers = TASK_EDIT_LAYER_MAP?.[TaskStore.taskProcessName] ?? [];
            // const isEditableLayer = editLayers.includes(featureLayerName);
            switch (featureType) {
                case 'VectorLayer': //矢量要素
                    if (result.length === 1) {
                        const editStatus = DataLayerStore.editStatus;
                        const layerName = DataLayerStore.getAdEditLayerName();
                        if (
                            editStatus === 'normal' && //当前是普通模式，不是联合打断模式
                            layerName !== featureLayerName //选中要素所属图层不是当前编辑图层
                        ) {
                            //设置选中要素所属图层为编辑图层，并重置顶部工具栏
                            const layer = getLayerExByName(featureLayerName);
                            DataLayerStore.activeEditor({
                                layer,
                                channel: 'select_data',
                                toolChannel: 'toggle',
                                noClear: true
                            });
                            ToolCtrlStore.updateByEditLayer(layer);
                        }
                        DataLayerStore.pick();
                    } else {
                        DataLayerStore.unPick();
                    }
                    this.showAttributesModal(result, event);
                    showRightMenu(result, event);
                    break;
                case 'TraceListLayer': //轨迹点
                    showPictureShowView(firstFeature);
                    PictureShowStore.show('TraceListLayer');
                    break;
                default:
                    break;
            }
            window.currentSelectFeatures = result;
        } else {
            DataLayerStore.unPick();
            AttributeStore.hide('other_close');
            RightMenuStore.hide();
            AttrRightMenuStore.hide();
            window?.trackLayer?.unSelect?.();
            this.handleCancelSelect();
        }
        BatchAssignStore.hide('other_close');
    };
    //不同模式下取消关联要素高亮
    handleCancelSelect = () => {
        const { activeMode, cancelSelect } = RenderModeStore;
        if (activeMode === 'relation') {
            cancelSelect();
        } else {
            AttributeStore.hideRelFeatures();
        }
    };
    //显示属性窗口
    showAttributesModal = (result, event) => {
        const isMarkerLayer = result[0].layerName === 'AD_Marker';
        const isInformationLayer = result[0].layerName === 'AD_Information';
        if (isMarkerLayer) {
            if (QCMarkerStore.isCreateMarker()) return;
            QCMarkerStore.show();
            QCMarkerStore.setEditStatus('visite', 'toggle_select');
            QCMarkerStore.initCurrentMarker(result[0]);
        } else if (isInformationLayer) {
            if (InformationStore.isCreateMarker()) return;
            InformationStore.show();
            InformationStore.setEditStatus('visite', 'toggle_select');
            InformationStore.initCurrentMarker(result[0]);
        } else {
            showAttributesModal(result[0], event);
        }
    };

    // 修改场景背景
    setBackground(url) {
        this.mapViewer.viewer.background = 'gradient';
        this.mapViewer._scene.setBackground(url);
    }

    //不同任务类型采用不同渲染模式
    renderMode = () => {
        const { taskProcessName } = TaskStore;
        const { initTextConfig } = TextStore;
        const { setMode } = RenderModeStore;
        const { initVectorConfig } = DefineModeStore;
        //获取渲染模式
        const mode = 'common';
        //设置渲染模式
        setMode(mode);
        //初始化文字注记配置
        initTextConfig(mode, taskProcessName);
        //初始化符号配置
        initVectorConfig(mode, taskProcessName);
    };
    //取消请求
    cancelRequest = async () => {
        await window.__cancelRequestArr.map(item => {
            return item.cancel();
        });
        window.__cancelRequestArr = [];
    };

    clearWorkSpace = async () => {
        await OperateHistoryStore.destroy();
        await editLog.store.clear();
        if (window.map) {
            DataLayerStore.exitEdit();
            DataLayerStore.activeEditor({ toolChannel: 'toggle' });
            DataLayerStore.topViewMode(false);
        }
        ToolCtrlStore.updateByEditLayer();
        AttributeStore.hide('other_close');
        PictureShowStore.hide();
        PictureShowStore.destory();
        TextStore.hide();
    };
    featuresToLayer(layer, features) {
        if (features.length > 0) {
            layer.addFeatures(features);
        }
    }
    getLayers = () => {
        return this.mapViewer.getLayerManager().getLayers();
    };
    // 获得layer
    getLayersByName = (key) => {
        return this.mapViewer.getLayerManager().getLayersByName(key);
    };
    release = async () => {
        await this.cancelRequest();
        await this.clearWorkSpace();

        BatchBuildStore.release();
        QCMarkerStore.release();
        InformationStore.release();
        ResourceLayerStore.release();
        VectorsStore.release();
        PointCloudStore.release();
        DataLayerStore.release();
        DataLayerStore.setRegionGeojson();
        QualityCheckStore.closeCheckReport();
        QualityCheckStore.clearCheckReport();
        BufferStore.release();
        UpdStatModeStore.release();
        CheckModeStore.release();
        window.boundaryLayerGroup = null;
        window.pointCloudLayer = null;
        window.nowPointCloudLayer = null;
        window.vectorLayerGroup = null;
        window.trackLayer = null;

        await RelStore.destroy();
        await AttrStore.destroy();

        window.map && window.map.release();
        window.map = null;
        window.markerLayer = null;
        window.informationLayer = null;
        window.horizontal = null;
        window.bufferLayer = null;
    };
}
export default new mapStore();
