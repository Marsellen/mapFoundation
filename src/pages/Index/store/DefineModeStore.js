import { observable, configure, action } from 'mobx';
import {
    POINT_ICON_MAP,
    MODE_VECTOR_CONFIG_MAP,
    MODE_VECTOR_CONFIG,
    MODE_BOUNDARY_VECTOR_CONFIG
} from 'src/config/VectorsConfigMap.js';
import { TYPE_SELECT_OPTION_MAP, LAYER_TYPE_MAP } from 'src/config/ADMapDataConfig';

configure({ enforceActions: 'always' });
class DefineModeStore {
    vectorConfig = {}; //当前任务符号配置
    boundaryVectorConfig = {}; //周边底图符号配置
    @observable updateKey;
    @observable updateColorKey;
    @observable pointEnabledStatus = true; //全局首尾点可用状态
    @observable arrowEnabledStatus = true; //全局箭头可用状态
    @observable vectorConfigMap = {};

    //初始化符号配置
    @action initVectorConfig = mode => {
        this.vectorConfigMap = JSON.parse(JSON.stringify(MODE_VECTOR_CONFIG_MAP[mode]));
        this.vectorConfig = JSON.parse(JSON.stringify(MODE_VECTOR_CONFIG[mode]));
        this.boundaryVectorConfig = JSON.parse(JSON.stringify(MODE_BOUNDARY_VECTOR_CONFIG[mode]));
        //默认勾选分类设色的图层，初始化该图层当前分类所有值的符号配置
        Object.keys(this.vectorConfigMap).forEach(key => {
            const { checked } = this.vectorConfigMap[key];
            checked && this.batchSetVectorConfig({ key });
        });
        this.updateKey = Math.random();
    };

    //初始化某图层符号配置
    @action initLayerVectorConfig = (key, checked) => {
        this.vectorConfigMap[key].checked = checked;
        this.batchSetVectorConfig({ key, isReset: true });
        this.updateKey = Math.random();
    };

    //设置全局首尾点的可用状态
    @action setPointEnabledStatus = checked => {
        this.pointEnabledStatus = checked;
        this.toggleGlobalPointFL(checked);
    };

    //设置全局箭头的可用状态
    @action setArrowEnabledStatus = checked => {
        this.arrowEnabledStatus = checked;
        this.toggleGlobalArrow(checked);
    };

    //显隐所有要素的首尾点
    toggleGlobalPointFL = checked => {
        //显隐当前任务要素首尾点
        if (!window.vectorLayerGroup) return;
        window.vectorLayerGroup.layers.forEach(item => {
            const { layer } = item;
            checked ? layer.showPointFL() : layer.hidePointFL();
        });
        //显隐周边底图要素首尾点
        if (!window.boundaryLayerGroup) return;
        window.boundaryLayerGroup.layers.forEach(item => {
            const { layer } = item;
            checked ? layer.showPointFL() : layer.hidePointFL();
        });
    };

    //显隐所有要素的箭头
    toggleGlobalArrow = checked => {
        //显隐当前任务要素箭头
        if (!window.vectorLayerGroup) return;
        window.vectorLayerGroup.layers.forEach(item => {
            const { layer } = item;
            checked ? layer.showArrow() : layer.hideArrow();
        });
        //显隐周边底图要素箭头
        if (!window.boundaryLayerGroup) return;
        window.boundaryLayerGroup.layers.forEach(item => {
            const { layer } = item;
            checked ? layer.showArrow() : layer.hideArrow();
        });
    };

    //重新渲染符号样式
    redrawVector = (key, config) => {
        if (!window.vectorLayerGroup) return;
        const { layers } = window.vectorLayerGroup;
        const { layer } = layers.find(item => item.layerName === key) || {};
        layer.resetConfig(config);
    };

    //重新渲染周边底图符号样式
    redrawBoundaryVector = (key, config) => {
        if (!window.boundaryLayerGroup) return;
        const { layers } = window.boundaryLayerGroup;
        const { layer } = layers.find(item => item.layerName === key) || {};
        layer.resetConfig(config);
    };

    //处理颜色，将rgba转成rgb+opacity
    handleColor = color => {
        const newColor = color.replace('rgba(', '').replace('rgb(', '').replace(')', '');
        const newColorArr = newColor.split(',');
        const [r, g, b, a = 1] = newColorArr || [];

        return {
            color: `rgb(${r},${g},${b})`,
            opacity: a
        };
    };

    //处理style
    handleStyle = (styleObj, styleKey, styleValue) => {
        if (!styleKey) return;
        switch (styleKey) {
            case 'color':
                const { color, opacity } = this.handleColor(styleValue);
                styleObj.color = color;
                styleObj.opacity = opacity;
                break;
            case 'pointStyle':
                if (styleValue === 'dianyaosu') {
                    styleObj.url && delete styleObj.url;
                } else {
                    styleObj.url = POINT_ICON_MAP[styleValue];
                }
                styleObj[styleKey] = styleValue;
                break;
            case 'lineStyle':
            case 'polygonStyle':
                if (styleValue === 'solid') {
                    styleObj.dashSize && delete styleObj.dashSize;
                    styleObj.gapSize && delete styleObj.gapSize;
                }
                if (styleValue === 'dashed') {
                    styleObj.dashSize = 0.5;
                    styleObj.gapSize = 0.5;
                }
                styleObj[styleKey] = styleValue;
                break;
            default:
                styleObj[styleKey] = styleValue;
                break;
        }
    };

    //处理属性值的style
    handleTypeStyle = ({ typeStyle, typeValKey, styleKey, styleValue }) => {
        const typeValVectorStyle = typeStyle.find(item => item.value === typeValKey);
        this.handleStyle(typeValVectorStyle, styleKey, styleValue);
    };

    //处理所有属性值的style
    handleAllTypeStyle = ({ typeStyle, styleKey, styleValue }) => {
        if (!typeStyle) return;
        return typeStyle.map(item => {
            const newItem = { ...item, [styleKey]: styleValue };
            this.handleStyle(newItem, styleKey, styleValue);
            return newItem;
        });
    };

    //初始化当前分类字段所有属性值的style
    resetTypeStyle = ({ key, styleKey, isReset, typeStyle, commonStyle }) => {
        //当切换分类或需要重置时，将以通用style重新设置当前分类所有属性值的style
        if (styleKey === 'showFields' || isReset) {
            const { showFields } = commonStyle;
            const { type } = LAYER_TYPE_MAP[key].find(item => item.key === showFields);
            return TYPE_SELECT_OPTION_MAP[type].map(item => {
                return { ...item, ...commonStyle };
            });
        } else {
            return typeStyle;
        }
    };

    //根据typeStyle生成sdk所需的配置文件（当前任务和周边底图的配置）
    getTypeConfig = ({ key, typeStyle, showFields }) => {
        if (!typeStyle) return;
        const vectorStyleArr = [];
        const pointFLStyleArr = [];
        const arrowStyleArr = [];
        const boundaryVectorStyleArr = [];
        const boundaryPointFLStyleArr = [];
        const boundaryArrowStyleArr = [];
        typeStyle.forEach(item => {
            let {
                pointSize,
                value,
                url,
                dashSize,
                gapSize,
                color,
                opacity = 1,
                radius,
                size,
                arrow,
                point
            } = item;
            let style = { url, dashSize, gapSize, color, opacity, radius, size };
            let boundaryStyle = { ...style, opacity: opacity / 2 };
            vectorStyleArr.push({
                value,
                style: style
            });
            boundaryVectorStyleArr.push({
                value,
                style: boundaryStyle
            });
            if (point && this.pointEnabledStatus) {
                pointFLStyleArr.push({
                    value,
                    style: { ...style, radius: pointSize }
                });
                boundaryPointFLStyleArr.push({
                    value,
                    style: { ...boundaryStyle, radius: pointSize }
                });
            }
            if (arrow && this.arrowEnabledStatus) {
                arrowStyleArr.push({
                    value,
                    style: style
                });
                boundaryArrowStyleArr.push({
                    value,
                    style: boundaryStyle
                });
            }
        });

        return {
            config: {
                ...this.vectorConfig[key],
                showStyles: ['vectorStyle', 'pointFLStyle', 'arrowStyle'],
                showFields: [showFields],
                pointFLFields: [showFields],
                arrowFields: [showFields],
                vectorStyle: { [showFields]: vectorStyleArr },
                pointFLStyle: { [showFields]: pointFLStyleArr },
                arrowStyle: { [showFields]: arrowStyleArr }
            },
            boundaryConfig: {
                ...this.boundaryVectorConfig[key],
                showStyles: ['vectorStyle', 'pointFLStyle', 'arrowStyle'],
                showFields: [showFields],
                pointFLFields: [showFields],
                arrowFields: [showFields],
                vectorStyle: { [showFields]: boundaryVectorStyleArr },
                pointFLStyle: { [showFields]: boundaryPointFLStyleArr },
                arrowStyle: { [showFields]: boundaryArrowStyleArr }
            }
        };
    };

    //批量重置符号样式
    @action batchSetVectorConfig = ({ key, isReset, styleKey, styleValue }) => {
        //修改通用style
        let commonStyle = this.vectorConfigMap[key].commonStyle;
        this.handleStyle(commonStyle, styleKey, styleValue);
        //修改typeStyle
        const { showFields } = commonStyle;
        let typeStyle = this.vectorConfigMap[key].typeStyle;
        typeStyle = this.resetTypeStyle({ key, styleKey, isReset, typeStyle, commonStyle });
        typeStyle = this.handleAllTypeStyle({ typeStyle, styleKey, styleValue, showFields });
        //更新vectorConfig、boundaryVectorConfig、vectorConfigMap
        const { config, boundaryConfig } = this.getTypeConfig({ key, typeStyle, showFields });
        this.vectorConfig[key] = config;
        this.boundaryVectorConfig[key] = boundaryConfig;
        this.vectorConfigMap[key] = this.vectorConfigMap[key] || {};
        this.vectorConfigMap[key].commonStyle = commonStyle;
        this.vectorConfigMap[key].typeStyle = typeStyle;
        //根据新配置渲染页面
        this.redrawVector(key, config);
        this.redrawBoundaryVector(key, boundaryConfig);
        if (styleKey === 'color') {
            this.updateColorKey = Math.random();
        } else {
            this.updateKey = Math.random();
        }
    };

    //重置符号样式
    @action setVectorConfig = ({ key, typeValKey, styleKey, styleValue }) => {
        //修改当前分类字段当前属性值的style
        let typeStyle = this.vectorConfigMap[key].typeStyle;
        this.handleTypeStyle({ typeStyle, typeValKey, styleKey, styleValue });
        //更新vectorConfig、boundaryVectorConfig
        const { showFields } = this.vectorConfigMap[key].commonStyle;
        const { config, boundaryConfig } = this.getTypeConfig({ key, typeStyle, showFields });
        this.vectorConfig[key] = config;
        this.boundaryVectorConfig[key] = boundaryConfig;
        //根据新配置渲染页面
        this.redrawVector(key, config);
        this.redrawBoundaryVector(key, boundaryConfig);
    };

    //根据当前符号窗口配置，渲染周边底图
    @action updateBoundaryVectorStyle = () => {
        if (!window.boundaryLayerGroup) return;
        window.boundaryLayerGroup.resetStyleConfig(this.boundaryVectorConfig);
    };
}

export default new DefineModeStore();
