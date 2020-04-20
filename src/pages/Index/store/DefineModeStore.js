import { observable, configure, action, computed } from 'mobx';
import WhiteVectorsConfig from 'src/config/WhiteVectorsConfig';
import HalfWhiteVectorsConfig from 'src/config/HalfWhiteVectorsConfig';
import { LAYER_TEXT_MAP } from 'src/config/TextVectorConfig';

configure({ enforceActions: 'always' });
class DefineModeStore {
    @observable vectorTextConfig = {};
    @observable visible = false;
    //获取文字注记窗口中已勾选的项目
    @computed get checkedList() {
        const vectorTextConfigArr = Object.values(this.vectorTextConfig);
        return vectorTextConfigArr.filter(item => item.checked);
    }

    @action show = () => {
        this.visible = true;
    };

    @action hide = () => {
        this.visible = false;
    };

    //重置当前任务高精数据图层样式
    resetVectorStyle = () => {
        if (!window.vectorLayerGroup) return;
        //拷贝配置
        const initConfig = JSON.parse(JSON.stringify(WhiteVectorsConfig));
        //在当前任务和周边底图配置对象中加入文字注记配置
        const config = this.setConfig(initConfig);
        window.vectorLayerGroup.resetStyleConfig(config);
    };

    //重置周边底图高精数据图层样式
    resetBoundaryStyle = () => {
        if (!window.boundaryLayerGroup) return;
        //拷贝配置
        const initBoundaryConfig = JSON.parse(
            JSON.stringify(HalfWhiteVectorsConfig)
        );
        //在当前任务和周边底图配置对象中加入文字注记配置
        const boundaryConfig = this.setConfig(initBoundaryConfig);
        window.boundaryLayerGroup.resetStyleConfig(boundaryConfig);
    };

    setConfig = vectorsConfig => {
        this.checkedList.forEach(textConfigItem => {
            const layerConfig = vectorsConfig.layers[textConfigItem.key];
            const afterName = layerConfig.filter[0];
            layerConfig.showText = true;
            vectorsConfig.styles[`${textConfigItem.key}_${afterName}`].map(
                layerConfigItem => {
                    return (layerConfigItem.textStyle = textConfigItem);
                }
            );
        });
        return vectorsConfig;
    };

    @action toggleLayerTextConfig = (key, checked) => {
        this.vectorTextConfig[key] = this.vectorTextConfig[key] || {};
        this.vectorTextConfig[key].checked = checked;
        this.resetVectorStyle();
        this.resetBoundaryStyle();
    };

    @action initLayerTextConfig = () => {
        Object.values(LAYER_TEXT_MAP).forEach(item => {
            const { key } = item;
            this.vectorTextConfig[key] = item;
        });
        this.resetVectorStyle();
        this.resetBoundaryStyle();
    };

    @action setLayerTextConfig = (key, styleKey, styleValue) => {
        this.vectorTextConfig[key] = this.vectorTextConfig[key] || {};
        this.vectorTextConfig[key][styleKey] = styleValue;
        this.resetVectorStyle();
        this.resetBoundaryStyle();
    };
}

export default new DefineModeStore();
