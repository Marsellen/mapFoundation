import { ATTR_SPEC_CONFIG } from 'src/config/AttrsConfig';
import { getLayerIDKey } from 'src/utils/vectorUtils';
import IndexedDB from 'src/utils/IndexedDB';
import _ from 'lodash';

const attrDataToTable = data => {
    let attrData = filterRelData(data);
    return attrData.reduce((total, feature) => {
        let spec = feature.name;

        feature.features.map(f => {
            let record = dataToTable(f.properties, spec);
            total.push(record);
        });
        return total;
    }, []);
};

const attrTableToData = records => {
    let featureMap = records.reduce((total, record) => {
        total[record.source] = total[record.source] || [];
        total[record.source].push({
            type: 'Feature',
            properties: record.properties
        });
        return total;
    }, {});

    return Object.keys(featureMap).map(name => {
        return {
            name,
            features: featureMap[name],
            type: 'FeatureCollection'
        };
    });
};

const filterRelData = data => {
    return ((data && data.features) || []).filter(d =>
        ATTR_SPEC_CONFIG.map(config => config.source).includes(d.name)
    );
};

const dataToTable = (properties, spec) => {
    let attrConfig = ATTR_SPEC_CONFIG.find(config => config.source == spec);
    return {
        key: properties[attrConfig.key],
        spec: attrConfig.relSpec,
        source: attrConfig.source,
        properties
    };
};

const getTabelData = async (layerName, properties) => {
    let IDKey = getLayerIDKey(layerName);
    let id = properties[IDKey];
    let attrStore = new IndexedDB('attributes', 'attr');
    let records = await attrStore.getAll([layerName, id], 'SPEC_KEY');
    return records.reduce((total, record) => {
        total[record.source] = total[record.source] || [];
        total[record.source].push(record);
        return total;
    }, {});
};

const updateAttrs = async attrs => {
    let attrStore = new IndexedDB('attributes', 'attr');
    Object.keys(attrs).map(key => {
        let records = attrs[key];
        records.map(record => {
            if (record.id) {
                attrStore.edit(record);
            } else {
                attrStore.add(record);
            }
        });
    });
};

const deleteRecord = records => {
    let attrStore = new IndexedDB('attributes', 'attr');
    return records.map(record => {
        attrStore.deleteById(record.id);
    });
};

export default {
    attrDataToTable,
    attrTableToData,
    dataToTable,
    getTabelData,
    updateAttrs,
    deleteRecord
};
