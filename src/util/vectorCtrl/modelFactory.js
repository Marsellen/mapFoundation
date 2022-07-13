import { DEFAULT_PROPERTIES_MAP, DEFAULT_CONFIDENCE_MAP } from 'src/config/adMapDataConfig';
import { getLayerIDKey } from 'src/util/vectorUtils';
import _ from 'lodash';
import SettingStore from 'src/store/setting/settingStore';
import TaskStore from 'src/store/home/taskStore';

class modelFactory {
    getTabelData = (layerName, properties) => {
        const tableDataMap = SettingStore.getConfig('TABLE_DATA_MAP');
        let tableData = _.cloneDeep(tableDataMap[layerName]);
        // 如果是人工检修任务，则增加可跨越性字段TRAVERSAL
        const { isMrTask } = TaskStore;
        if (!isMrTask) {
            tableData = tableData.filter(item => item.key != 'TRAVERSAL');
        }
        return tableData.map(record => {
            record.value = properties[record.key];
            return record;
        });
    };

    getDefaultProperties = (layerName, id) => {
        let defaultProperties = DEFAULT_PROPERTIES_MAP[layerName] || {};

        let defaultConfidence = DEFAULT_CONFIDENCE_MAP[layerName];
        let UPD_STAT = '{"GEOMETRY":"ADD"}';
        let extrInfo = {
            UPD_STAT,
            COLL_TIME: '',
            MAKE_TIME: '',
            TILE_ID: ''
        };
        if (defaultConfidence) {
            extrInfo.CONFIDENCE = defaultConfidence;
        }

        let IDKey = getLayerIDKey(layerName);
        return {
            ...defaultProperties,
            [IDKey]: id,
            ...extrInfo
        };
    };

    getBatchAssignTableData = (layerName, properties) => {
        const tableDataMap = SettingStore.getConfig('TABLE_DATA_MAP');
        let tableData = _.cloneDeep(tableDataMap[layerName]);
        // 如果是人工检修任务，则增加可跨越性字段TRAVERSAL
        const { isMrTask } = TaskStore;
        if (!isMrTask) {
            tableData = tableData.filter(item => item.key != 'TRAVERSAL');
        }
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
