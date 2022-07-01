import { ATTR_SPEC_CONFIG } from 'src/config/attrsConfig';
import { getLayerIDKey, deleteAtt } from 'src/util/vectorUtils';
import _ from 'lodash';
import Relevance from 'src/util/relevance';
import Attr from 'src/util/attr';

const attrDataToTable = (data, dataType) => {
    return data.reduce((total, response) => {
        const { data: feature } = response;
        const spec = feature.name;
        feature.features.forEach(f => {
            let record = dataToTable(f.properties, spec);
            record.dataType = dataType;
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

const dataToTable = (properties, spec) => {
    let attrConfig = ATTR_SPEC_CONFIG.find(config => config.source == spec);
    return {
        key: properties[attrConfig.key],
        sourceId: properties[attrConfig.sourceId],
        spec: attrConfig.relSpec,
        source: attrConfig.source,
        properties
    };
};

const REL_RS = [
    {
        spec: 'AD_Lane',
        relKey: 'FROM_LANE',
        relType: 'OBJ_TYPE_KEYS',
        source: 'AD_Lane_Con'
    },
    {
        spec: 'AD_Lane',
        relKey: 'TO_LANE',
        relType: 'REL_OBJ_TYPE_KEYS',
        source: 'AD_Lane_Con'
    },
    {
        spec: 'AD_Road',
        relKey: 'FROM_ROAD',
        relType: 'OBJ_TYPE_KEYS',
        source: 'AD_Road_Con'
    },
    {
        spec: 'AD_Road',
        relKey: 'TO_ROAD',
        relType: 'REL_OBJ_TYPE_KEYS',
        source: 'AD_Road_Con'
    },
    {
        spec: 'AD_LaneDivider',
        relKey: 'F_LDIV_ID',
        relType: 'OBJ_TYPE_KEYS',
        source: 'AD_Boundary_Rel'
    },
    {
        spec: 'AD_LaneDivider',
        relKey: 'S_LDIV_ID',
        relType: 'REL_OBJ_TYPE_KEYS',
        source: 'AD_Boundary_Rel'
    }
];

const getTabelData = attrs => {
    return attrs.reduce((total, record) => {
        total[record.source] = total[record.source] || [];
        total[record.source].push(record);
        return total;
    }, {});
};

/**
 * 通过要素的规格和属性查询IndexedDB中关联属性记录集合
 * @method getFeatureAttrs
 * @param {String} layerName 要素规格
 * @param {Object} properties 要素属性
 * @returns {Array} attrs 关联属性记录集合
 */
const getFeatureAttrs = async (layerName, properties) => {
    let IDKey = getLayerIDKey(layerName);
    let id = properties[IDKey];
    let attrStore = Attr.store;
    let attrs = await attrStore.getAll([layerName, id], 'SPEC_KEY');
    let configs = REL_RS.filter(config => layerName == config.spec);
    if (configs.length > 0) {
        let relStore = Relevance.store;
        let rels = await configs.reduce(async (total, config) => {
            total = await total;
            let records = await relStore.getAll([config.relKey, id], config.relType);
            let data = records.map(record => {
                return {
                    id: record.extraInfo.REL_ID,
                    layerName: config.source
                };
            });
            total = total.concat(data);
            return total;
        }, []);
        let relAttrs = await rels.reduce(async (total, { layerName, id }) => {
            total = await total;
            let data = await attrStore.getAll([layerName, id], 'SPEC_KEY');
            total = total.concat(data);
            return total;
        }, []);
        attrs = attrs.concat(relAttrs);
    }
    return attrs;
};

const updateAttrs = async attrs => {
    let attrStore = Attr.store;
    let newRecords = [];
    Object.keys(attrs).forEach(key => {
        let records = attrs[key];
        newRecords = newRecords.concat(records);
        records.forEach(record => {
            if (record.id) {
                attrStore.edit(record);
            } else {
                attrStore.add(record);
            }
        });
    });
    return newRecords;
};

const calcNewAttrs = attrs => {
    return Object.keys(attrs).flatMap(key => {
        let records = attrs[key];
        return records;
    });
};

const deleteRecord = id => {
    let attrStore = Attr.store;
    return attrStore.deleteById(id);
};

const replaceAttrs = async ([oldAttrs, newAttrs] = []) => {
    let attrStore = Attr.store;
    let oldAttrIds = await oldAttrs.reduce(async (total, record) => {
        total = await total;
        let _record = await attrStore.get([record.source, record.sourceId], 'SOURCE_ID');
        total.push(_record.id);
        return total;
    }, []);
    await Promise.all(oldAttrIds.map(id => attrStore.deleteById(id)));
    // 删除重复的数据
    if (newAttrs.length > 0) {
        if (newAttrs[0]?.id !== undefined) {
            newAttrs = deleteAtt(newAttrs);
        }
    }
    await attrStore.batchAdd(newAttrs);
};

const calcDiffAttrs = (oldAttrs, newAttrs) => {
    let oldDiffAttrs = _.differenceWith(oldAttrs, newAttrs, (arrVal, othVal) => {
        return _.isEqual(arrVal.properties, othVal.properties);
    });
    let newDiffAttrs = _.differenceWith(newAttrs, oldAttrs, (arrVal, othVal) => {
        return _.isEqual(arrVal.properties, othVal.properties);
    });

    return [[...oldDiffAttrs], [...newDiffAttrs]];
};

export default {
    attrDataToTable,
    attrTableToData,
    dataToTable,
    getTabelData,
    getFeatureAttrs,
    updateAttrs,
    replaceAttrs,
    deleteRecord,
    calcNewAttrs,
    calcDiffAttrs
};
