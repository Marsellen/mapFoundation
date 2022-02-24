import { observable, configure, action } from 'mobx';
import {
    POINT_ICON_MAP,
    CONFIGURABLE_LAYERS,
    VECTOR_CONFIG_MAP
} from 'src/config/vectorConfig/vectorConfigMap';
import { TYPE_SELECT_OPTION_MAP, LAYER_TYPE_MAP } from 'src/config/adMapDataConfig';
import SettingStore from 'src/store/setting/settingStore';

configure({ enforceActions: 'always' });
class DefineModeStore {
    vectorConfig = {}; //当前任务符号配置
    boundaryVectorConfig = {}; //周边底图符号配置
    @observable globalUpdateKey;
    @observable updateKey;
    @observable updateColorKey;
    @observable globalPointEnabledStatus = true; //全局首尾点可用状态
    @observable globalArrowEnabledStatus = true; //全局箭头可用状态
    @observable vectorConfigMap = {};

    getDefaultConfig = (mode, taskProcessName) => {
        const configType = mode === 'common' ? taskProcessName : mode;
        const configName = VECTOR_CONFIG_MAP[configType];
        const configMap = SettingStore.getConfig(configName);
        return JSON.parse(JSON.stringify(configMap));
    };

    //初始化符号配置
    @action initVectorConfig = (mode, taskProcessName) => {
        if (!taskProcessName) return;
        this.globalPointEnabledStatus = true;
        this.globalArrowEnabledStatus = true;
        this.vectorConfigMap = this.getDefaultConfig(mode, taskProcessName);
        this.globalUpdateKey = Math.random();
        //初始化所有图层
        CONFIGURABLE_LAYERS.forEach(key => {
            const { checked } = this.vectorConfigMap[key];
            this.batchSetVectorConfig({ key, resetType: checked ? 'default' : 'common' });
        });
    };

    //初始化某图层符号配置
    @action initLayerVectorConfig = (key, checked) => {
        this.vectorConfigMap[key].checked = checked;
        this.batchSetVectorConfig({ key, resetType: checked ? 'default' : 'common' });
        this.updateKey = Math.random();
    };

    //设置全局首尾点的可用状态
    @action setGlobalPointEnabledStatus = checked => {
        this.globalPointEnabledStatus = checked;
        CONFIGURABLE_LAYERS.forEach(layerName => {
            this.batchSetVectorConfig({
                key: layerName,
                styleKey: 'pointEnabledStatus',
                styleValue: checked
            });
        });
    };

    //设置全局箭头的可用状态
    @action setGlobalArrowEnabledStatus = checked => {
        this.globalArrowEnabledStatus = checked;
        CONFIGURABLE_LAYERS.forEach(layerName => {
            this.batchSetVectorConfig({
                key: layerName,
                styleKey: 'arrowEnabledStatus',
                styleValue: checked
            });
        });
    };

    //重新渲染符号样式
    redrawVector = (key, config) => {
        if (!window.vectorLayerGroup) return;
        const { layers } = window.vectorLayerGroup;
        const { layer } = layers.find(item => item.layerName === key) || {};
        layer && layer.resetConfig(config);
    };

    //重新渲染周边底图符号样式
    redrawBoundaryVector = (key, config) => {
        if (!window.boundaryLayerGroup) return;
        const { layers } = window.boundaryLayerGroup;
        const { layer } = layers.find(item => item.layerName === key) || {};
        layer && layer.resetConfig(config);
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
                switch (styleValue) {
                    case 'solid':
                        styleObj.dashSize && delete styleObj.dashSize;
                        styleObj.gapSize && delete styleObj.gapSize;
                        break;
                    case 'dashed': //4:4
                        styleObj.dashSize = 0.5;
                        styleObj.gapSize = 0.5;
                        break;
                    case 'dashed1': //2:2
                        styleObj.dashSize = 0.25;
                        styleObj.gapSize = 0.25;
                        break;
                    case 'dashed2': //4:2
                        styleObj.dashSize = 1;
                        styleObj.gapSize = 0.25;
                        break;
                    case 'dashed3': //4:1
                        styleObj.dashSize = 0.5;
                        styleObj.gapSize = 0.125;
                        break;
                    default:
                        styleObj[styleKey] = styleValue;
                        break;
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

    //获取当前分类所有属性值的默认style
    getDefaultTypeStyle = ({ key, commonStyle }) => {
        const { showFields } = commonStyle;
        const typeStyle = this.vectorConfigMap?.[key]?.typeStyleMap?.[showFields];
        return typeStyle && JSON.parse(JSON.stringify(typeStyle));
    };

    //以通用style重新设置当前分类所有属性值的style
    getCommonTypeStyle = ({ key, commonStyle }) => {
        const { showFields } = commonStyle;
        if (showFields === 'NOKEY') return [commonStyle];
        const { type } = LAYER_TYPE_MAP[key].find(item => item.key === showFields);
        let constants = TYPE_SELECT_OPTION_MAP[type];
        if (Array.isArray(constants[0])) {
            constants = constants.flat();
            return constants.map(item => {
                return { ...item, ...commonStyle };
            });
        }
        return TYPE_SELECT_OPTION_MAP[type].map(item => {
            return { ...item, ...commonStyle };
        });
    };

    //初始化当前分类字段所有属性值的style
    resetTypeStyle = ({ key, styleKey, resetType, typeStyle, commonStyle }) => {
        if (styleKey === 'showFields' || resetType === 'default') {
            let defaultTypeStyle = this.getDefaultTypeStyle({ key, commonStyle });
            if (defaultTypeStyle) return defaultTypeStyle;
            return this.getCommonTypeStyle({ key, commonStyle });
        }

        if (resetType === 'common') {
            return this.getCommonTypeStyle({ key, commonStyle });
        }

        return typeStyle;
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
                point,
                pointEnabledStatus,
                arrowEnabledStatus
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
            if (point && pointEnabledStatus) {
                pointFLStyleArr.push({
                    value,
                    style: { ...style, radius: pointSize }
                });
                boundaryPointFLStyleArr.push({
                    value,
                    style: { ...boundaryStyle, radius: pointSize }
                });
            }
            if (arrow && arrowEnabledStatus) {
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
    @action batchSetVectorConfig = ({ key, resetType, styleKey, styleValue }) => {
        //修改通用style
        let commonStyle = this.vectorConfigMap[key].commonStyle;
        this.handleStyle(commonStyle, styleKey, styleValue);
        //获取typeStyle
        const { showFields } = commonStyle;
        let typeStyle = this.vectorConfigMap[key].typeStyle;
        typeStyle = this.resetTypeStyle({ key, styleKey, resetType, typeStyle, commonStyle });
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
        if (!window.boundaryLayerGroup || !this.boundaryVectorConfig) return;
        window.boundaryLayerGroup.resetStyleConfig(this.boundaryVectorConfig);
    };
}

export default new DefineModeStore();