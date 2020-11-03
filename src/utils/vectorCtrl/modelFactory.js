import {
    DEFAULT_PROPERTIES_MAP,
    TABLE_DATA_MAP,
    DEFAULT_CONFIDENCE_MAP
} from 'config/ADMapDataConfig';
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

        let defaultConfidence = DEFAULT_CONFIDENCE_MAP[layerName] || '{}';
        let UPD_STAT = '{"GEOMETRY":"ADD"}';
        let extrInfo = {
            CONFIDENCE: defaultConfidence,
            UPD_STAT,
            COLL_TIME: '',
            MAKE_TIME: ''
        };

        let IDKey = getLayerIDKey(layerName);
        return {
            ...defaultProperties,
            [IDKey]: id,
            ...extrInfo
        };
    };

    getBatchAssignTableData = (layerName, properties) => {
        let tableData = _.cloneDeep(TABLE_DATA_MAP[layerName]);
        return tableData.map(record => {
            let uniProperties = properties.reduce((total, property) => {
                let propertyValue = property[record.key];
                if (!total.includes(propertyValue)) {
                    total.push(propertyValue);
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
