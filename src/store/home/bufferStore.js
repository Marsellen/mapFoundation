import {  observable, configure, action } from 'mobx';
import { BUFFER_CONFIG_MAP, BUFFER_LAYER_STYLE_CONFIG, BUFFER_STYLE, EDIT_TYPE_OF_BUFFER_LAYERS } from 'src/config/bufferConfig/bufferConfigMap';
import { VectorLayer } from 'addis-viz-sdk';
import RightMenuStore from 'src/store/home/rightMenuStore';
import DataLayerStore from 'src/store/home/dataLayerStore';

configure({ enforceActions: 'always' });
class BufferStore {
    @observable mode = 1;
    @observable disabled = true;
    @observable visible = false;
    @observable allLayerBufferConfigMap = BUFFER_CONFIG_MAP; //所有buffer图层要素
    @observable defaultBufferLayerConfig = BUFFER_LAYER_STYLE_CONFIG; //默认buffer样式
    @observable bufferStyle = BUFFER_STYLE;
    @observable currentBuffer = [];
    
    /**
     * buffer渲染窗口开启关闭
     */

    @action show = () => {
        this.visible = true;
    };

    @action hide = () => {
        this.visible = false;
    };

    @action release = () => {
        this.mode = 1;
        this.disabled = true;
        this.visible = false;
        this.allLayerBufferConfigMap = BUFFER_CONFIG_MAP;
        this.defaultBufferLayerConfig = BUFFER_LAYER_STYLE_CONFIG;
        this.bufferStyle = { color: 'rgb(255,800,80)', opacity: 0.2, radius: 0.2 };
        this.currentBuffer = [];
        RightMenuStore.clearFeatures();
    };

    /**
     * 公用部分
     */

    // 切换buffer渲染重置全图层渲染样式
    @action initAllLayersBufferConfig = () => {
        this.allLayerBufferConfigMap = BUFFER_CONFIG_MAP;
        Object.values(this.allLayerBufferConfigMap).map(item => {
            const { key, bufferFields, bufferStyle } = item;
            const vectorLayer = this.getVectorLayer(key);
            const boundaryLayer = this.getBoundaryLayer(key);
            const config = this.getBufferConfig({ bufferFields, bufferStyle });
            vectorLayer && vectorLayer.resetConfig(config);
            boundaryLayer && boundaryLayer.resetConfig(config);
        })
    }

    // 切换buffer渲染重置单要素渲染
    @action initfeatureBufferConfig = () => {
        this.defaultBufferLayerConfig = BUFFER_LAYER_STYLE_CONFIG;
        this.bufferStyle = { color: 'rgb(255,800,80)', opacity: 0.2, radius: 0.2 };
        this.clearBufferRender();
        window.bufferLayer = null;
        this.currentBuffer = [];
        RightMenuStore.clearFeatures();
    }

    // 切换buffer渲染
    @action toggleBuffer = value => {
        this.mode = value;
        if (value == 2) {
            this.initfeatureBufferConfig();
            this.initBufferConfig(false)
            this.initBufferLayer();
        } else {
            this.hideBufferRender();
            this.initAllLayersBufferConfig();
            this.initBufferConfigMap();
        }
    }

    // 启用/禁用buffer渲染
    @action switchBuffer = checked => {
        this.disabled = checked;
        if (this.mode == 1) {
            this.initBufferConfig(checked);
        } else {
            checked ? this.showBufferRender() : this.hideBufferRender();
        }
    }

    // 启用/禁用buffer
    @action initBufferConfig = (checked) => {
            Object.values(this.allLayerBufferConfigMap).map(item => {
                const check = checked ? item.checked : false;
                this.resetBufferStyle(item.key, check);
            })
    }

    // 要素展示buffer
    @action resetBufferStyle = (key, checked) => {
        const vectorLayer = this.getVectorLayer(key);
        const boundaryLayer = this.getBoundaryLayer(key);
        if (checked) {
            vectorLayer?.showBuffer()
            boundaryLayer?.showBuffer()
        } else {
            vectorLayer?.hideBuffer();
            boundaryLayer?.hideBuffer();

        }
    }

    renderLayerBuffer = (bufferConfigMap, type) => {
        Object.values(bufferConfigMap).forEach(item => {
            const { key, checked, bufferFields, bufferStyle } = item;
            const vectorLayer = this.getVectorLayer(key);
            const boundaryLayer = this.getBoundaryLayer(key);
            const config = this.getBufferConfig({ bufferFields, bufferStyle });
            if (!vectorLayer.layerConfig.bufferStyle) {
                if (!checked) return;
                vectorLayer && vectorLayer.resetConfig(config);
                boundaryLayer && boundaryLayer.resetConfig(config);
            } else {
                this.resetBufferStyle(key, checked);
            }
        })
    }

    /**
     * 全图层渲染
     */

    // 重置buffer
    @action initBufferConfigMap = () => {
        this.renderLayerBuffer(this.allLayerBufferConfigMap);
    }

    @action resetConfig = (key, bufferFields, bufferStyle) => {
        const vectorLayer = this.getVectorLayer(key);
        const boundaryLayer = this.getBoundaryLayer(key);
        const config = this.getBufferConfig({ bufferFields, bufferStyle });
        vectorLayer && vectorLayer.resetConfig(config);
        boundaryLayer && boundaryLayer.resetConfig(config);
    }

    getBufferConfig = ({ bufferFields, bufferStyle }) => {
        return {
            showStyles: ['bufferStyle'],
            bufferFields,
            bufferStyle
        }
    }

    @action getVectorLayer = key => {
        if (!window.vectorLayerGroup) return;
        const { layers } = window.vectorLayerGroup;
        const { layer } = layers.find(item => item.layerName === key) || {};
        return layer;
    }

    @action getBoundaryLayer = key => {
        if (!window.boundaryLayerGroup) return;
        const { layers } = window.boundaryLayerGroup;
        const { layer } = layers.find(item => item.layerName === key) || {};
        return layer;
    }

    // 显示buffer
    @action toggleLayerBuffer = (key, checked) => {
        this.allLayerBufferConfigMap[key].checked = checked;
        this.renderLayerBuffer(this.allLayerBufferConfigMap);
    }

    // 修改样式渲染全图层buffer
    @action batchSetBufferConfig = ({key, bufferStyleMap, styleKey, styleValue}) => {
        if (!styleKey) return;
        bufferStyleMap.map(item => {
            item.style[styleKey] = styleValue;
        });
        let { bufferFields, bufferStyle } = this.allLayerBufferConfigMap[key];
        bufferFields.map(field => bufferStyle[field] = bufferStyleMap);
        const vectorLayer = this.getVectorLayer(key);
        const boundaryLayer = this.getBoundaryLayer(key);
        const config = this.getBufferConfig({ bufferFields, bufferStyle });
        vectorLayer && vectorLayer.resetConfig(config);
        boundaryLayer && boundaryLayer.resetConfig(config);
    }

    /**
     * 选择要素渲染
     */

    // 单要素渲染
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

    @action updateFeatures = features => {
        this.clearBufferRender();
        window.bufferLayer?.layer?.updateFeatures?.(features);
        this.currentBuffer = features;
    }

    // 修改选择要素buffer渲染样式
    @action selectBufferConfig = ({ styleKey, styleValue }) => {
        this.bufferStyle[styleKey] = styleValue;
        let features = RightMenuStore.getFeatures();
        let { NOKEY } = this.defaultBufferLayerConfig.bufferStyle;
        NOKEY[0].style[styleKey] = styleValue;
        if (!features) return;
        window.bufferLayer.layer.resetConfig(this.defaultBufferLayerConfig);
        window.bufferLayer.layer.updateFeatures(features);
    }

    @action removeBufferLayer = features => {
        this.currentBuffer = [];
        features.forEach(item => {
            window.bufferLayer?.layer?.removeBufferById?.(item.uuid)
        })
    }

    clearBufferRender = () => {
        this.currentBuffer = [];
        window.bufferLayer?.layer?.clear?.();
    };

    showBufferRender = () => {
        window.bufferLayer?.layer?.show?.();
    };

    hideBufferRender = () => {
        window.bufferLayer?.layer?.hide?.();
    };

    isSelectBufferMode = () => {
        return this.mode === 2 && this.disabled === true;
    }

    updateBufferRender = historyLog => {
        if (!this.isSelectBufferMode && !EDIT_TYPE_OF_BUFFER_LAYERS.includes(DataLayerStore.editType)) return;
        const { pureFeatures, features } = historyLog;
        if (pureFeatures) {
            this.removeBufferLayer(pureFeatures[0]);
            this.updateFeatures(pureFeatures[1]);
        } else {
            this.removeBufferLayer(features[0]);
            this.updateFeatures(features[1]);
        }
    }
}

export default new BufferStore();
