import { observable, configure, action, computed } from 'mobx';
import { TEXT_CONFIG_MAP, CHECK_MODE_TEXT_CONFIG_MAP } from 'src/config/TextConfigMap';
import { CONFIGURABLE_LAYERS } from 'src/config/VectorsConfigMap';
import TextSetting from 'src/models/TextSetting';

configure({ enforceActions: 'always' });
class TextStore {
    textSetting = null;
    @observable vectorTextConfig = {}; //注记默认配置，页面根据这个字段渲染
    @observable visible = false; //显隐渲染模式窗口
    //获取文字注记窗口中已勾选的项目
    @computed get checkedList() {
        const textConfigArr = Object.values(this.vectorTextConfig);
        const checkedTextKeyArr = textConfigArr.flatMap(item => {
            const { key, checked } = item;
            return checked ? [key] : [];
        });
        return checkedTextKeyArr;
    }

    @action show = () => {
        this.visible = true;
    };

    @action hide = () => {
        this.visible = false;
    };

    //初始化文字注记配置
    @action initTextConfig = (mode, taskProcessName) => {
        //质检符号模式是根据任务类型采用对应配置，其它模式采用通用配置
        const defaultTextConfig =
            mode === 'check' ? CHECK_MODE_TEXT_CONFIG_MAP[taskProcessName] : TEXT_CONFIG_MAP[mode];
        this.vectorTextConfig = JSON.parse(JSON.stringify(defaultTextConfig));
        this.textSetting = new TextSetting(this.vectorTextConfig);

        //根据配置中checked显隐图层的文字注记
        CONFIGURABLE_LAYERS.forEach(key => {
            const { checked } = this.vectorTextConfig[key];
            this.toggleLayerTextConfig(key, checked);
        });
    };

    //重置图层注记样式
    resetTextStyle = (layerGroup, key, config) => {
        if (!layerGroup) return;
        const { layers } = layerGroup;
        const { layer } = layers.find(item => item.layerName === key) || {};
        layer && layer.resetConfig(config);
    };

    //删除图层文字注记
    removeLayerText = (layerGroup, key) => {
        if (!layerGroup) return;
        const { layers } = layerGroup;
        const { layer } = layers.find(item => item.layerName === key) || {};
        layer && layer.removeAllConfigTexts();
    };

    @action toggleLayerTextConfig = (key, checked) => {
        //记录勾选状态
        this.vectorTextConfig[key] = this.vectorTextConfig[key] || {};
        this.vectorTextConfig[key].checked = checked;

        if (checked) {
            const config = this.textSetting.getVectorConfig(key);
            this.resetTextStyle(window.vectorLayerGroup, key, config);
            this.resetTextStyle(window.boundaryLayerGroup, key, config);
        } else {
            this.removeLayerText(window.vectorLayerGroup, key);
            this.removeLayerText(window.boundaryLayerGroup, key);
        }
    };

    //重置文字注记
    @action setLayerTextConfig = (key, styleKey, styleValue) => {
        this.textSetting.updateLayerConfig(key, { [styleKey]: styleValue });
        let config = this.textSetting.getVectorConfig(key);
        this.vectorTextConfig[key] = this.vectorTextConfig[key] || {};
        this.vectorTextConfig[key].defaultStyle = {
            ...config.textStyle.defaultStyle,
            textFields: config.textFields
        };
        this.resetTextStyle(window.vectorLayerGroup, key, config);
        this.resetTextStyle(window.boundaryLayerGroup, key, config);
    };

    //将后加载的周边底图按当前注记配置渲染
    @action resetBoundaryTextStyle = () => {
        this.checkedList.forEach(key => {
            const config = this.textSetting.getVectorConfig(key);
            this.resetTextStyle(window.boundaryLayerGroup, key, config);
        });
    };
}

export default new TextStore();
