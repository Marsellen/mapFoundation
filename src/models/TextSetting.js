import TextVectorConfig from 'src/config/TextVectorConfig';
import { LAYER_TEXT_MAP } from 'src/config/TextConfigMap';
import {
    TYPE_SELECT_OPTION_MAP,
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
                let constants = TYPE_SELECT_OPTION_MAP[type.type];
                if (constants) {
                    set[type.key] = constants;
                }
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
        Object.keys(vectorConfig.textStyle).forEach(key => {
            vectorConfig.textStyle[key].style = style;
        });
        return vectorConfig;
    };

    updateLayerConfig = (layerName, config) => {
        this.layerConfig[layerName].defaultStyle = {
            ...this.layerConfig[layerName].defaultStyle,
            ...config
        };
    };
}

export default TextSetting;
