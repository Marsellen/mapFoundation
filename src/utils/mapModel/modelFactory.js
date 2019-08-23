import {
    DEFAULT_PROPERTIES_MAP,
    TABLE_DATA_MAP
} from 'src/config/ADMapDataConfig';
import { DATA_LAYER_MAP } from 'src/config/DataLayerConfig';

class modelFactory {
    getTabelData = (type, properties) => {
        return TABLE_DATA_MAP[type].map(record => {
            record.value = properties[record.key];
            return record;
        });
    };

    getDefaultProperties = (type, id) => {
        let defaultProperties = DEFAULT_PROPERTIES_MAP[type] || {};
        let IDKey = DATA_LAYER_MAP[type] ? DATA_LAYER_MAP[type].id : 'id';
        return {
            ...defaultProperties,
            [IDKey]: id
        };
    };
}

export default new modelFactory();
