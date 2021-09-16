import {  observable, configure, action } from 'mobx';
import { BUFFER_CONFIG_MAP, BUFFER_LAYER_STYLE_CONFIG } from 'src/config/bufferConfig/bufferConfigMap';
import { VectorLayer } from 'addis-viz-sdk';
import RightMenuStore from 'src/store/home/rightMenuStore';

configure({ enforceActions: 'always' });
class BufferStore {
    @observable bufferMode = 1;
    @observable bufferEnableStatus = true;
    @observable visible = false;
    @observable bufferConfigMap = BUFFER_CONFIG_MAP; //所有buffer图层要素
    @observable bufferConfig = {}; //当前显示buffer的要素
    @observable defaultBufferConfig = BUFFER_LAYER_STYLE_CONFIG; //默认buffer样式
    @observable editStatus = 'normal';
    @observable bufferStyle = { color: 'rgb(255,800,80)', opacity: 0.2, radius: 0.2 };

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
        this.bufferMode = 1;
        this.bufferEnableStatus = true;
        this.visible = false;
        this.bufferConfigMap = BUFFER_CONFIG_MAP;
        this.bufferConfig = {};
        this.defaultBufferConfig = BUFFER_LAYER_STYLE_CONFIG;
        this.bufferStyle = { color: 'rgb(255,800,80)', opacity: 0.2, radius: 0.2 };
    };

    /**
     * 公用部分
     */

    // 切换buffer渲染重置全图层渲染样式
    @action initAllLayersBufferConfig = () => {
        this.bufferConfigMap = BUFFER_CONFIG_MAP;
        this.bufferConfig = {};
    }

    // 切换buffer渲染重置单要素渲染
    @action initfeatureBufferConfig = () => {
        this.defaultBufferConfig = BUFFER_LAYER_STYLE_CONFIG;
        this.bufferStyle = { color: 'rgb(255,800,80)', opacity: 0.2, radius: 0.2 };
        this.clearBufferRender();
        window.bufferLayer = null;
    }

    // 切换buffer渲染
    @action toggleBuffer = value => {
        this.bufferMode = value;
        if (value == 2) {
            this.initBufferLayer();
            this.initAllLayersBufferConfig();
            this.initBufferConfigMap();
        } else {
            this.initfeatureBufferConfig();
        }
    }

    // 启用/禁用buffer渲染
    @action switchBuffer = checked => {
        this.bufferEnableStatus = checked;
        this.initBufferConfig(checked);
        if (checked && this.bufferMode == 2) {
            this.showBufferRender();
        } else {
            this.hideBufferRender();
        }
    }

    // 启用/禁用buffer
    @action initBufferConfig = (checked) => {
        Object.values(this.bufferConfig).map(item => {
            this.resetBufferStyle(item.key, checked);
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

    /**
     * 全图层渲染
     */

    // 重置buffer
    @action initBufferConfigMap = () => {
        Object.values(this.bufferConfigMap).map(item => {
            const { key, bufferFields, bufferStyle } = item;
            const config = this.getBufferConfig({ bufferFields, bufferStyle });
            const vectorLayer = this.getVectorLayer(key);
            const boundaryLayer = this.getBoundaryLayer(key);
            vectorLayer && vectorLayer.resetConfig(config);
            boundaryLayer && boundaryLayer.resetConfig(config);
            vectorLayer?.hideBuffer();
            boundaryLayer?.hideBuffer();
        })
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
    @action showBuffer = (key, checked) => {
        this.bufferConfigMap[key].checked = checked;
        Object.values(this.bufferConfigMap).map(item => {
            const { key, checked } = item;
            if (checked) {
                this.bufferConfig = { ...this.bufferConfig, [key]: item };
            } else {
                delete this.bufferConfig[key];
            }
        });
        this.resetBufferStyle(key, checked);
    }

    // 修改样式渲染全图层buffer
    @action batchSetBufferConfig = ({key, bufferStyleMap, styleKey, styleValue}) => {
        if (!styleKey) return;
        bufferStyleMap.map(item => {
            item.style[styleKey] = styleValue;
        });
        let { bufferFields, bufferStyle } = this.bufferConfig[key];
        bufferFields.map(field => bufferStyle[field] = bufferStyleMap);
        const vectorLayer = this.getVectorLayer(key);
        const boundaryLayer = this.getBoundaryLayer(key);
        const config = this.getBufferConfig({ bufferFields, bufferStyle });
        vectorLayer.resetConfig(config);
        boundaryLayer.resetConfig(config);
    }

    /**
     * 选择要素渲染
     */

    // 设置单要素渲染时buffer状态
    @action setEditStatus = status => {
        this.editStatus = status;
    };

    // 单要素渲染
    @action initBufferLayer = () => {
        if (window.bufferLayer) return;
        const bufferLayer = new VectorLayer(null, { layerConfig: this.defaultBufferConfig });
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
        window.bufferLayer.layer.updateFeatures(features);
    }

    // 修改选择要素buffer渲染样式
    @action singleSelectBufferConfig = ({ styleKey, styleValue }) => {
        this.bufferStyle[styleKey] = styleValue;
        let features = RightMenuStore.getFeatures();
        let { NOKEY } = this.defaultBufferConfig.bufferStyle;
        NOKEY[0].style[styleKey] = styleValue;
        if (!features) return;
        window.bufferLayer.layer.resetConfig(this.defaultBufferConfig);
        window.bufferLayer.layer.updateFeatures(features);
    }

    removeBufferLayer = features => {
        features.forEach(item => {
            window.bufferLayer.layer.removeBufferById(item.uuid)
        })
    }

    clearBufferRender = () => {
        window.bufferLayer?.layer?.clear?.();
    };

    showBufferRender = () => {
        window.bufferLayer?.layer?.show?.();
    };

    hideBufferRender = () => {
        window.bufferLayer?.layer?.hide?.();
    };

    updateBufferRender = history => {
        if (this.bufferMode != 2 || this.editStatus != 'buffer_render') return;
        const features = !history.pureFeatures ? history.features : history.pureFeatures;
        this.removeBufferLayer(features[0]);
        this.updateFeatures(features[1]);
    }

}

export default new BufferStore();
