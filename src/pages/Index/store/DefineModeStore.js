import { observable, configure, action } from 'mobx';
import { LAYER_VECTOR_MAP } from 'src/config/VectorConfigMap.js';
import VectorsConfig from 'src/config/VectorsConfig';
import {
    TYPE_SELECT_OPTION_MAP,
    LAYER_TYPE_MAP
} from 'src/config/ADMapDataConfig';
import HalfWhiteVectorsConfig from 'src/config/HalfWhiteVectorsConfig';
import dianfuhao from 'src/assets/img/dianfuhao.png';
import dianfuhao1 from 'src/assets/img/dianfuhao1.png';
import dianfuhao2 from 'src/assets/img/dianfuhao2.png';
import dianfuhao3 from 'src/assets/img/dianfuhao3.png';
import dianfuhao4 from 'src/assets/img/dianfuhao4.png';
import dianfuhao5 from 'src/assets/img/dianfuhao5.png';
import dianfuhao6 from 'src/assets/img/dianfuhao6.png';
import dianfuhao7 from 'src/assets/img/dianfuhao7.png';
import dianfuhao8 from 'src/assets/img/dianfuhao8.png';

const dianfuhaoMap = {
    dianfuhao: dianfuhao,
    dianfuhao1: dianfuhao1,
    dianfuhao2: dianfuhao2,
    dianfuhao3: dianfuhao3,
    dianfuhao4: dianfuhao4,
    dianfuhao5: dianfuhao5,
    dianfuhao6: dianfuhao6,
    dianfuhao7: dianfuhao7,
    dianfuhao8: dianfuhao8
};

configure({ enforceActions: 'always' });
class DefineModeStore {
    boundaryVectorConfig = {};
    @observable updateKey;
    @observable vectorConfig = {}; //符号默认配置，页面根据这个字段渲染

    //初始化符号配置
    @action initVectorConfig = () => {
        this.vectorConfigMap = JSON.parse(JSON.stringify(LAYER_VECTOR_MAP));
        this.vectorConfig = JSON.parse(JSON.stringify(VectorsConfig));
    };

    //初始化某图层符号配置
    @action initLayerVectorConfig = (key, checked) => {
        const vectorConfigMap = JSON.parse(JSON.stringify(LAYER_VECTOR_MAP));
        const vectorConfig = JSON.parse(JSON.stringify(VectorsConfig));
        this.vectorConfigMap[key] = vectorConfigMap[key];
        this.vectorConfigMap[key].checked = checked;
        this.vectorConfig[key] = vectorConfig[key];
        this.batchSetVectorConfig(key);
        this.updateKey = Math.random();
    };

    //重新渲染符号样式
    resetVectorStyle = (key, config) => {
        if (!window.vectorLayerGroup) return;
        const { layers } = window.vectorLayerGroup;
        const { layer } = layers.find(item => item.layerName === key) || {};
        layer.resetConfig(config);
    };

    halfColor = color => {
        let newColor = color;
        let newColorArr = [];

        if (newColor.includes('rgba')) {
            newColor = newColor.replace('rgba(', '');
            newColor = newColor.replace(')', '');
            newColorArr = newColor.split(',');
            newColorArr.pop();
        } else if (newColor.includes('rgb')) {
            newColor = newColor.replace('rgb(', '');
            newColor = newColor.replace(')', '');
            newColorArr = newColor.split(',');
        }

        const newColorStr = newColorArr.map(item => parseInt(item / 2)).join();

        return `rgba(${newColorStr})`;
    };

    //重新渲染周边底图符号样式
    resetBoundaryVectorStyle = (key, config) => {
        //颜色改成半透明
        const typeKey = Object.keys(config.vectorStyle)[0];
        const vectorStyleArr = config.vectorStyle[typeKey];
        vectorStyleArr.map(item => {
            const { style } = item;
            const { color } = style;
            item.style = { ...style, color: this.halfColor(color) };
            return item;
        });
        this.boundaryVectorConfig[key] = config;

        if (!window.boundaryLayerGroup) return;
        const { layers } = window.boundaryLayerGroup;
        const { layer } = layers.find(item => item.layerName === key) || {};
        layer.resetConfig(config);
    };

    //处理style
    handleStyle = (styleObj, styleKey, styleValue) => {
        switch (styleKey) {
            case 'pointIcon':
                if (styleValue === 'dianyaosu') {
                    styleObj.url && delete styleObj.url;
                } else {
                    styleObj.url = dianfuhaoMap[styleValue];
                }
                break;
            case 'lineStyle':
                if (styleValue === 'solid') {
                    styleObj.dashSize && delete styleObj.dashSize;
                    styleObj.gapSize && delete styleObj.gapSize;
                }
                if (styleValue === 'dashed') {
                    styleObj.dashSize = 0.5;
                    styleObj.gapSize = 0.5;
                }
                break;
            default:
                break;
        }
        styleObj[styleKey] = styleValue;

        return styleObj;
    };

    //批量重置符号样式
    @action batchSetVectorConfig = (key, styleKey, styleValue) => {
        //生成新的默认样式
        const newDefaultStyle = { ...this.vectorConfigMap[key].defaultStyle };
        this.handleStyle(newDefaultStyle, styleKey, styleValue);
        const { showFields } = newDefaultStyle;

        //获取当前图层当前分类的组合名
        const { type } = LAYER_TYPE_MAP[key].find(
            item => item.key === showFields
        );
        //获取当前图层当前分类的所有值，并加上符号样式
        const vectorStyleArr = TYPE_SELECT_OPTION_MAP[type].map(item => {
            return {
                ...item,
                style: newDefaultStyle
            };
        });

        //组合成新的注记配置
        const config = {
            ...VectorsConfig[key],
            showFields: [showFields],
            vectorStyle: {
                [showFields]: vectorStyleArr
            }
        };

        this.vectorConfig[key] = config;
        this.vectorConfigMap[key] = this.vectorConfigMap[key] || {};
        this.vectorConfigMap[key].defaultStyle = newDefaultStyle;
        this.resetVectorStyle(key, config);
        this.resetBoundaryVectorStyle(key, config);
    };

    //重置符号样式
    @action setVectorConfig = (key, typeValkey, styleKey, styleValue) => {
        //获取当前所选类型的所选值的样式配置
        const { showFields } = this.vectorConfigMap[key].defaultStyle;
        const vectorStyleArr = this.vectorConfig[key].vectorStyle[showFields];
        const typeValVectorStyle = vectorStyleArr.find(
            item => item.value === typeValkey
        );
        const newDefaultStyle = typeValVectorStyle.style;

        //将用户设置处理成配置文件所需格式
        this.handleStyle(newDefaultStyle, styleKey, styleValue);

        //更新渲染画布
        const config = this.vectorConfig[key];
        this.resetVectorStyle(key, config);
        this.resetBoundaryVectorStyle(key, config);
    };

    //只批量重置颜色符号样式
    @action batchSetVectorColor = (key, styleKey, styleValue) => {
        //获取当前所选类型的所有值的样式配置
        const { showFields } = this.vectorConfigMap[key].defaultStyle;
        const vectorStyleArr = this.vectorConfig[key].vectorStyle[showFields];

        //将用户设置处理成配置文件所需格式
        vectorStyleArr.map(item => {
            this.handleStyle(item.style, styleKey, styleValue);
            return item;
        });

        //更新数据并重新渲染画布
        const config = this.vectorConfig[key];
        this.vectorConfig[key] = config;
        this.vectorConfigMap[key].defaultStyle.color = styleValue;
        this.resetVectorStyle(key, config);
        this.resetBoundaryVectorStyle(key, config);
        this.updateKey = Math.random();
    };

    @action updateBoundaryVectorStyle = () => {
        if (!window.boundaryLayerGroup) return;
        const config = Object.assign(
            HalfWhiteVectorsConfig,
            this.boundaryVectorConfig
        );
        window.boundaryLayerGroup.resetStyleConfig(config);
    };
}

export default new DefineModeStore();
