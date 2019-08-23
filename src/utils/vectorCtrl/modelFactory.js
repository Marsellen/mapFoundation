import {
    DEFAULT_PROPERTIES_MAP,
    TABLE_DATA_MAP
} from 'src/config/ADMapDataConfig';
import { getLayerIDKey } from 'src/utils/vectorUtils';

class modelFactory {
    getTabelData = (layerName, properties) => {
        return TABLE_DATA_MAP[layerName].map(record => {
            record.value = properties[record.key];
            return record;
        });
    };

    getDefaultProperties = (layerName, id) => {
        let defaultProperties = DEFAULT_PROPERTIES_MAP[layerName] || {};
        let IDKey = getLayerIDKey(layerName);
        return {
            ...defaultProperties,
            [IDKey]: id
        };
    };
}

export default new modelFactory();
