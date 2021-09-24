import { observable, configure, action } from 'mobx';
import { BUFFER_CONFIG_MAP, BUFFER_LAYER_STYLE_CONFIG, BUFFER_STYLE } from 'src/config/bufferConfig/bufferConfigMap';
import { VectorLayer } from 'addis-viz-sdk';
import RightMenuStore from 'src/store/home/rightMenuStore';
import AttributeStore from 'src/store/home/attributeStore';
import { getFeatureOption } from 'src/tool/vectorUtils';

configure({ enforceActions: 'always' });
class BufferStore {
    currentBufferLogIndex = 0;
    bufferLog = [];
    @observable mode = 1;
    @observable disabled = true;
    @observable visible = false;
    @observable allLayerBufferConfigMap = BUFFER_CONFIG_MAP; //所有buffer图层要素
    @observable defaultBufferLayerConfig = BUFFER_LAYER_STYLE_CONFIG; //默认buffer样式
    @observable bufferStyle = BUFFER_STYLE;
    @observable currentBuffers = [];

    /**
     * buffer渲染窗口开启关闭
     */

    @action show = () => {
        this.visible = true;
    };

    @action hide = () => {
        this.visible = false;
    };

    /**
     * 公用部分
     */

    @action release = () => {
        this.currentBufferLogIndex = 0;
        this.bufferLog = [];
        this.mode = 1;
        this.disabled = true;
        this.visible = false;
        this.allLayerBufferConfigMap = BUFFER_CONFIG_MAP;
        this.defaultBufferLayerConfig = BUFFER_LAYER_STYLE_CONFIG;
        this.bufferStyle = BUFFER_STYLE;
        this.currentBuffers = [];
    };

    // 清除选中要素
    @action clearSelectBufferEffect = () => {
        RightMenuStore.clearFeatures();
        AttributeStore.hideRelFeatures();
    };

    // 切换buffer渲染
    @action setBufferMode = value => {
        this.mode = value;
        this.clearSelectBufferEffect();
        if (value == 1) {
            // 清除单要素配置及buffer，初始化全图层配置和buffer
            this.clearBufferLayer();
            this.initLayersBufferConfig();
            this.initLayersBufferRender();
        } else {
            // 清除全图层配置和buffer，初始化单要素配置及buffer
            this.toggleLayersBufferRender(false);
            this.initSelectBufferConfig();
            this.initBufferLayer();
        }
    };

    // 启用/禁用buffer渲染
    @action switchBuffer = checked => {
        this.disabled = checked;
        if (this.mode == 1) {
            this.toggleLayersBufferRender(checked);
        } else {
            checked ? this.showBufferLayer() : this.hideBufferLayer();
        }
    };

    /**
     * 全图层渲染
     */

    // 初始化全图层config
    @action initLayersBufferConfig = () => {
        this.allLayerBufferConfigMap = BUFFER_CONFIG_MAP;
    };

    // 初始化全图层buffer样式
    @action initLayersBufferRender = () => {
        Object.values(this.allLayerBufferConfigMap).map(item => {
            this.resetLayerBufferRender(item);
        });
    };

    // 获得layer
    @action getVectorLayer = key => {
        if (!window.vectorLayerGroup) return;
        const { layers } = window.vectorLayerGroup;
        const { layer } = layers.find(item => item.layerName === key) || {};
        return layer;
    };

    // 获得周边底图layer
    @action getBoundaryLayer = key => {
        if (!window.boundaryLayerGroup) return;
        const { layers } = window.boundaryLayerGroup;
        const { layer } = layers.find(item => item.layerName === key) || {};
        return layer;
    };

    // 全图层渲染单个图层显示buffer/隐藏buffer
    @action toggleLayerBuffer = (key, checked) => {
        this.toggleLayerBufferChecked(key, checked);
        this.layersBufferRender(this.allLayerBufferConfigMap);
    };

    // 全图层buffer渲染中单个图层显示buffer/隐藏buffer
    @action toggleLayerBufferChecked = (key, checked) => {
        this.allLayerBufferConfigMap[key].checked = checked;
    };

    // 全图层渲染有buffer样式则显隐，没有则添加
    layersBufferRender = (bufferConfigMap) => {
        Object.values(bufferConfigMap).forEach(item => {
            const { key, checked } = item;
            const vectorLayer = this.getVectorLayer(key);
            if (vectorLayer.layerConfig.bufferStyle) {
                this.toggleLayerBufferRender(key, checked);
            } else {
                if (!checked) return;
                this.resetLayerBufferRender(item);
            }
        });
    };

    // 全图层buffer渲染启用/禁用
    @action toggleLayersBufferRender = (checked) => {
        Object.values(this.allLayerBufferConfigMap).map(item => {
            const check = item.checked ? checked : false;
            this.toggleLayerBufferRender(item.key, check);
        });
    };

    // 全图层buffer样式显隐
    @action toggleLayerBufferRender = (key, checked) => {
        const vectorLayer = this.getVectorLayer(key);
        const boundaryLayer = this.getBoundaryLayer(key);
        if (checked) {
            vectorLayer?.showBuffer();
            boundaryLayer?.showBuffer();
        } else {
            vectorLayer?.hideBuffer();
            boundaryLayer?.hideBuffer();
        }
    };

    // 重置全图层buffer渲染
    resetLayerBufferRender = (configMap) => {
        const { key, bufferFields, bufferStyle } = configMap;
        const vectorLayer = this.getVectorLayer(key);
        const boundaryLayer = this.getBoundaryLayer(key);
        const config = {
            showStyles: ['bufferStyle'],
            bufferFields,
            bufferStyle
        };
        vectorLayer && vectorLayer.resetConfig(config);
        boundaryLayer && boundaryLayer.resetConfig(config);
    };

    // 修改全图层渲染buffer样式
    @action resetLayerBuffer = ({ key, bufferStyleMap, styleKey, styleValue }) => {
        if (!styleKey) return;
        bufferStyleMap.map(item => {
            item.style[styleKey] = styleValue;
        });
        let { bufferFields, bufferStyle } = this.allLayerBufferConfigMap[key];
        bufferFields.map(field => bufferStyle[field] = bufferStyleMap);
        this.resetLayerBufferRender(this.allLayerBufferConfigMap[key]);
    };

    /**
     * 选择要素渲染
     */

    // 初始化选择要素渲染
    @action initBufferLayer = () => {
        if (window.bufferLayer) return;
        const bufferLayer = new VectorLayer(null, { layerConfig: this.defaultBufferLayerConfig });
        bufferLayer.layerName = 'AD_bufferLayer';
        window.map.getLayerManager().addLayer('VectorLayer', bufferLayer);
        window.bufferLayer = {
            layerName: bufferLayer.layerName,
            layerId: bufferLayer.layerId,
            layer: bufferLayer
        };
    };

    // 重置选择要素渲染中的config
    @action initSelectBufferConfig = () => {
        this.defaultBufferLayerConfig = BUFFER_LAYER_STYLE_CONFIG;
        this.bufferStyle = BUFFER_STYLE;
        this.currentBuffers = [];
        this.currentBufferLogIndex = 0;
        this.bufferLog = [];
    };

    // 选择要素渲染添加buffer样式
    @action resetBuffer = (features) => {
        this.clearBufferLayer();
        window.bufferLayer?.layer?.updateFeatures?.(features);
        this.currentBuffers = features;
        this.updateBufferLatestLog();
    };

    @action addBuffer = (features) => {
        window.bufferLayer?.layer?.updateFeatures?.(features);
        this.currentBuffers = [...this.currentBuffers, ...features];
        this.updateBufferLatestLog();
    };

    // 修改选择要素渲染buffer样式
    @action resetSelectBuffer = ({ styleKey, styleValue }) => {
        this.bufferStyle[styleKey] = styleValue;
        let features = RightMenuStore.cloneFeatures;
        let { NOKEY } = this.defaultBufferLayerConfig.bufferStyle;
        NOKEY[0].style[styleKey] = styleValue;
        if (!features) return;
        window.bufferLayer.layer.resetConfig(this.defaultBufferLayerConfig);
        window.bufferLayer.layer.updateFeatures(features);
        this.currentBuffers = [...this.currentBuffers, ...features];
        this.updateBufferLatestLog();
    };

    // 删除选中要素buffer渲染
    @action removeBuffer = features => {
        features.forEach(feature => {
            const option = getFeatureOption(feature);
            window.bufferLayer.layer.removeFeatureByOption(option);
            const index = this.currentBuffers.findIndex(buffer => {
                const option = getFeatureOption(buffer);
                const { key, value } = option;
                return value == feature.data.properties[key];
            });
            this.currentBuffers.splice(index, 1);
        });
        this.updateBufferLatestLog();
    };

    // 清空选择要素渲染layer
    clearBufferLayer = () => {
        window.bufferLayer?.layer?.clear?.();
        this.currentBuffers = [];
        this.updateBufferLatestLog();
    };

    // 显示选择要素渲染
    showBufferLayer = () => {
        window.bufferLayer?.layer?.show?.();
    };

    // 隐藏选择要素渲染
    hideBufferLayer = () => {
        window.bufferLayer?.layer?.hide?.();
    };

    // 选择要素渲染且启用状态时
    isSelectBufferMode = () => {
        return this.mode === 2 && this.disabled === true;
    };

    updateBufferLatestLog = () => {
        this.bufferLog[this.currentBufferLogIndex] = JSON.parse(JSON.stringify(this.currentBuffers));
    };

    // 编辑操作时更新选择要素渲染buffer
    @action updateSelectBufferRender = (editType, history) => {
        if (!this.isSelectBufferMode) return;
        switch (editType) {
            case 'redo':
                this.currentBufferLogIndex = this.currentBufferLogIndex + 1;
                this.resetBuffer(this.bufferLog[this.currentBufferLogIndex] || []);
                break;
            case 'undo':
                this.currentBufferLogIndex = this.currentBufferLogIndex - 1;
                this.resetBuffer(this.bufferLog[this.currentBufferLogIndex] || []);
                break;
            default:
                this.updateBufferLatestLog();
                this.currentBufferLogIndex = this.currentBufferLogIndex + 1;
                const [oldFeatures, newFeatures] = history?.features ?? [[], []];
                const oldBufferFeatures = [];
                const newBufferFeatures = [];
                this.currentBuffers.forEach(bufferFeature => {
                    const bufferFeatureId = getFeatureOption(bufferFeature).value;
                    const oldBufferFeature = oldFeatures.find(oldFeature => {
                        const oldFeatureId = getFeatureOption(oldFeature).value;
                        return oldFeatureId === bufferFeatureId;
                    });
                    const newBufferFeature = newFeatures.find(newFeature => {
                        const newFeatureId = getFeatureOption(newFeature).value;
                        return newFeatureId === bufferFeatureId;
                    });
                    oldBufferFeature && oldBufferFeatures.push(oldBufferFeature);
                    newBufferFeature && newBufferFeatures.push(newBufferFeature);
                });
                this.removeBuffer(oldBufferFeatures);
                this.addBuffer(newBufferFeatures);
                this.updateBufferLatestLog();
                break;
        }
    };
}

export default new BufferStore();
