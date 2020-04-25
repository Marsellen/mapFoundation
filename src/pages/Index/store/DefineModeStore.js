import { observable, configure, action, computed } from 'mobx';
import { LAYER_TEXT_MAP } from 'src/config/TextMapConfig';
import TextVectorConfig from 'src/config/TextVectorConfig';
import {
    TYPE_SELECT_OPTION_MAP,
    TABLE_DATA_MAP
} from 'src/config/ADMapDataConfig';

configure({ enforceActions: 'always' });
class DefineModeStore {
    visiteStatusMap = {}; //记录当前图层是否设置过文字注记
    @observable vectorTextConfig = {}; //注记默认配置，页面根据这个字段渲染
    @observable visible = false; //显隐渲染模式窗口
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

    //初始化文字注记配置
    @action initLayerTextConfig = () => {
        this.vectorTextConfig = JSON.parse(JSON.stringify(LAYER_TEXT_MAP));
        this.visiteStatusMap = {};
    };

    //重置图层注记样式
    resetTextStyle = (layerGroup, key, config) => {
        if (!layerGroup) return;
        const { layers } = layerGroup;
        const { layer } = layers.find(item => item.layerName === key) || {};
        layer.resetConfig(config);
    };

    //显隐图层注记样式
    toggleText = (layerGroup, key, checked) => {
        if (!layerGroup) return;
        const { layers } = layerGroup;
        const { layer } = layers.find(item => item.layerName === key) || {};
        checked ? layer.showText() : layer.hideText();
    };

    @action toggleLayerTextConfig = (key, checked) => {
        //记录勾选状态
        this.vectorTextConfig[key] = this.vectorTextConfig[key] || {};
        this.vectorTextConfig[key].checked = checked;

        //第一次勾选调设置方法，第二次勾选调显隐方法
        if (this.visiteStatusMap[key]) {
            this.toggleText(window.vectorLayerGroup, key, checked);
            this.toggleText(window.boundaryLayerGroup, key, checked);
        } else {
            const config = TextVectorConfig[key];
            this.visiteStatusMap[key] = true;
            this.resetTextStyle(window.vectorLayerGroup, key, config);
            this.resetTextStyle(window.boundaryLayerGroup, key, config);
        }
    };

    //重置文字注记
    @action setLayerTextConfig = (key, styleKey, styleValue) => {
        //获取新的默认样式
        const newDefaultStyle = {
            ...this.vectorTextConfig[key].defaultStyle,
            [styleKey]: styleValue
        };
        const { textField } = newDefaultStyle;
        //获取当前图层当前分类的组合名
        const { type } = TABLE_DATA_MAP[key].find(
            item => item.key === textField
        );
        //获取当前图层当前分类的所有值，并加上文字样式
        const textStyleArr = TYPE_SELECT_OPTION_MAP[type].map(item => {
            return {
                ...item,
                style: newDefaultStyle
            };
        });
        //组合成新的注记配置
        const config = {
            ...TextVectorConfig[key],
            textField,
            textStyle: {
                [textField]: textStyleArr
            }
        };

        this.vectorTextConfig[key] = this.vectorTextConfig[key] || {};
        this.vectorTextConfig[key].defaultStyle = newDefaultStyle;
        this.resetTextStyle(window.vectorLayerGroup, key, config);
        this.resetTextStyle(window.boundaryLayerGroup, key, config);
    };
}

export default new DefineModeStore();
