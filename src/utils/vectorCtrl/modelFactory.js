import {
    DEFAULT_PROPERTIES_MAP,
    TABLE_DATA_MAP
} from 'src/config/ADMapDataConfig';
import { getLayerIDKey } from 'src/utils/vectorUtils';
import _ from 'lodash';

class modelFactory {
    getTabelData = (layerName, properties) => {
        let tableData = _.cloneDeep(TABLE_DATA_MAP[layerName]);
        return tableData.map(record => {
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

    getBatchAssignTableData = (layerName, properties) => {
        let tableData = _.cloneDeep(TABLE_DATA_MAP[layerName]);
        return tableData.map(record => {
            let uniProperties = properties.reduce((total, property) => {
                if (!total.includes(property[record.key])) {
                    total.push(property[record.key]);
                }
                return total;
            }, []);
            if (uniProperties.length == 1) {
                record.value = uniProperties[0];
            } else {
                record.readonly = true;
            }

            return record;
        });
    };
}

export default new modelFactory();
