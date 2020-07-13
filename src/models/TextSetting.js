import TextVectorConfig from 'src/config/TextVectorConfig';
import { LAYER_TEXT_MAP } from 'src/config/TextConfigMap';
import {
    TYPE_SELECT_OPTION_MAP,
    EXTRA_TEXT_CONFIG,
    LAYER_TYPE_MAP
} from 'src/config/ADMapDataConfig';
import _ from 'lodash';

class TextSetting {
    constructor() {
        this.vectorConfig;
        this.layerConfig;
        this.init();
    }

    init() {
        let config = _.cloneDeep(TextVectorConfig);
        Object.keys(config).forEach(layerName => {
            let types = LAYER_TYPE_MAP[layerName];
            config[layerName].textStyle = types.reduce((set, type) => {
                set[type.key] = this.getTextConfig(type.type);
                return set;
            }, {});
        });
        this.vectorConfig = config;

        this.layerConfig = _.cloneDeep(LAYER_TEXT_MAP);
    }

    getVectorConfig = layerName => {
        let vectorConfig = this.vectorConfig[layerName];
        let { textFields, ...style } = this.layerConfig[layerName].defaultStyle;
        vectorConfig.textFields = textFields;
        vectorConfig.textStyle.defaultStyle = style;
        return vectorConfig;
    };

    getTextConfig = type => {
        if (TYPE_SELECT_OPTION_MAP[type]) {
            let constants = TYPE_SELECT_OPTION_MAP[type];
            if (EXTRA_TEXT_CONFIG[type]) {
                constants = constants.concat(EXTRA_TEXT_CONFIG[type]);
            }
            return constants.map(config => {
                return { value: config.value, label: config.abbreviation };
            });
        }
        return [];
    };

    updateLayerConfig = (layerName, config) => {
        this.layerConfig[layerName].defaultStyle = {
            ...this.layerConfig[layerName].defaultStyle,
            ...config
        };
    };
}

export default TextSetting;
