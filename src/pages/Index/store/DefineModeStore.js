import { observable, configure, action, computed } from 'mobx';
import WhiteVectorsConfig from 'src/config/WhiteVectorsConfig';
import HalfWhiteVectorsConfig from 'src/config/HalfWhiteVectorsConfig';

configure({ enforceActions: 'always' });
class DefineModeStore {
    @observable vectorTextConfig = {};
    @observable visible = false;
    @observable updateKey;
    //获取文字注记窗口中已勾选的项目
    @computed get checkedList() {
        const vectorTextConfigArr = Object.values(this.vectorTextConfig);
        return vectorTextConfigArr.filter(item => item.checked);
    }
    @computed get setVectorsConfig() {
        //拷贝配置
        const initConfig = JSON.parse(JSON.stringify(WhiteVectorsConfig));
        const initBoundaryConfig = JSON.parse(
            JSON.stringify(HalfWhiteVectorsConfig)
        );

        //在当前任务和周边底图配置对象中加入文字注记配置
        const config = this.setConfig(initConfig);
        const boundaryConfig = this.setConfig(initBoundaryConfig);

        //重置当前任务高精数据图层样式
        if (window.vectorLayerGroup) {
            window.vectorLayerGroup.resetStyleConfig(config);
        }
        //重置周边底图高精数据图层样式
        if (window.boundaryLayerGroup) {
            window.boundaryLayerGroup.resetStyleConfig(boundaryConfig);
        }

        return this.updateKey;
    }

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

    @action show = () => {
        this.visible = true;
    };

    @action hide = () => {
        this.visible = false;
    };

    @action toggleLayerTextConfig = (key, checked) => {
        this.vectorTextConfig[key] = this.vectorTextConfig[key] || {};
        this.vectorTextConfig[key].checked = checked;
        this.updateKey = new Date();
    };

    @action initLayerTextConfig = (key, config) => {
        this.vectorTextConfig[key] = config;
        this.updateKey = new Date();
    };

    @action setLayerTextConfig = (key, styleKey, styleValue) => {
        this.vectorTextConfig[key] = this.vectorTextConfig[key] || {};
        this.vectorTextConfig[key][styleKey] = styleValue;
        this.updateKey = new Date();
    };
}

export default new DefineModeStore();
