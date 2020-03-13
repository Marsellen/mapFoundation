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

    getDefaultProperties = (layerName, id, isManbuildTask) => {
        let defaultProperties = DEFAULT_PROPERTIES_MAP[layerName] || {};
        let extrInfo = {};
        if (layerName !== 'AD_Map_QC') {
            let defaultConfidence = DEFAULT_CONFIDENCE_MAP[layerName] || '{}';
            let UPD_STAT = isManbuildTask ? '{}' : '{"GEOMETRY":"ADD"}';
            extrInfo = {
                CONFIDENCE: defaultConfidence,
                UPD_STAT
            };
        }

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
