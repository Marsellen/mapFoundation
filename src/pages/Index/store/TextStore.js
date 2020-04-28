import { observable, configure, action, computed } from 'mobx';
import { LAYER_TEXT_MAP } from 'src/config/TextConfigMap';
import TextVectorConfig from 'src/config/TextVectorConfig';
import {
    TYPE_SELECT_OPTION_MAP,
    TABLE_DATA_MAP
} from 'src/config/ADMapDataConfig';

configure({ enforceActions: 'always' });
class TextStore {
    textSettedMap = {}; //记录当前图层是否设置过文字注记
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
    @action initLayerTextConfig = () => {
        this.vectorTextConfig = JSON.parse(JSON.stringify(LAYER_TEXT_MAP));
        this.textSettedMap = {};
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
        if (this.textSettedMap[key]) {
            this.toggleText(window.vectorLayerGroup, key, checked);
            this.toggleText(window.boundaryLayerGroup, key, checked);
        } else {
            const config = TextVectorConfig[key];
            this.textSettedMap[key] = config;
            this.resetTextStyle(window.vectorLayerGroup, key, config);
            this.resetTextStyle(window.boundaryLayerGroup, key, config);
        }
    };

    //重置文字注记
    @action setLayerTextConfig = (key, styleKey, styleValue) => {
        let config = {};
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

        if (TYPE_SELECT_OPTION_MAP[type]) {
            //获取当前图层当前分类的所有值，并加上文字样式
            const textStyleArr = TYPE_SELECT_OPTION_MAP[type].map(item => {
                return {
                    ...item,
                    style: newDefaultStyle
                };
            });
            //组合成新的注记配置
            config = {
                ...TextVectorConfig[key],
                textField,
                textStyle: {
                    dataType: 'label',
                    [textField]: textStyleArr
                }
            };
        } else {
            //用户编辑类不做翻译
            config = {
                ...TextVectorConfig[key],
                textField,
                textStyle: {
                    dataType: 'value',
                    [textField]: [{ style: newDefaultStyle }]
                }
            };
        }

        this.textSettedMap[key] = config;
        this.vectorTextConfig[key] = this.vectorTextConfig[key] || {};
        this.vectorTextConfig[key].defaultStyle = newDefaultStyle;
        this.resetTextStyle(window.vectorLayerGroup, key, config);
        this.resetTextStyle(window.boundaryLayerGroup, key, config);
    };

    //将后加载的周边底图按当前注记配置渲染
    @action resetBoundaryTextStyle = () => {
        //遍历所有设置过注记的图层，将底图按配置显示注记
        Object.keys(this.textSettedMap).forEach(key => {
            const config = this.textSettedMap[key];
            this.resetTextStyle(window.boundaryLayerGroup, key, config);
            //未勾选的图层，隐藏注记
            if (this.checkedList.includes(key)) return;
            this.toggleText(window.boundaryLayerGroup, key, false);
        });
    };
}

export default new TextStore();
