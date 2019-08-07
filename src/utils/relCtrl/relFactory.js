import { REL_DATA_SET, ATTR_REL_DATA_SET } from 'src/config/RelsConfig';
import RelDataToTable from './relDataToTable';
import RelTableToData from './relTableToData';
import IndexedDB from 'src/utils/IndexedDB';
import { DATA_LAYER_MAP } from 'src/config/DataLayerConfig';
import {
    REL_TYPE_KEY_MAP,
    SPEC_REL_KEY_SET,
    REL_OBJ_KEY_MAP,
    REL_SPEC_CONFIG
} from 'src/config/RelsConfig';
import { updateFeaturesByRels } from './relCtrl';

class relFactory {
    relDataToTable = data => {
        let relData = this.filterRelData(data);
        return relData.reduce((total, feature) => {
            let spec = feature.name;

            feature.features.map(f => {
                let records = RelDataToTable(f.properties, spec);
                total = total.concat(records);
            });
            return total;
        }, []);
    };

    relTableToData = records => {
        records = records.filter(
            record => !ATTR_REL_DATA_SET.includes(record.spec)
        );

        let featureMap = records.reduce((total, record) => {
            let spec = record.spec;
            total[spec] = total[spec] || [];
            let features = RelTableToData(record, spec);
            total[spec] = total[spec].concat(features);
            return total;
        }, {});

        return Object.keys(featureMap).map(name => {
            let features = featureMap[name].map(properties => {
                return {
                    properties,
                    type: 'Feature'
                };
            });
            return {
                name,
                features,
                type: 'FeatureCollection'
            };
        });
    };

    filterRelData = data => {
        return ((data && data.features) || []).filter(
            d =>
                REL_DATA_SET.includes(d.name) ||
                ATTR_REL_DATA_SET.includes(d.name)
        );
    };

    async getTabelData(type, properties) {
        let relKeyMap = SPEC_REL_KEY_SET.filter(record => {
            return record.spec == type;
        });
        if (relKeyMap.length == 0) return;
        let relStore = new IndexedDB('relationships', 'rels');
        return await relStore.open().then(
            async store => {
                let IDKey = DATA_LAYER_MAP[type]
                    ? DATA_LAYER_MAP[type].id
                    : 'id';
                let id = properties[IDKey];
                let tableData = [];
                await Promise.all(
                    relKeyMap.map(async relKey => {
                        let records = await relStore.queryByIndex(
                            store,
                            relKey.relType,
                            [relKey.relKey, id]
                        );
                        let keyMap = REL_OBJ_KEY_MAP[relKey.relType];
                        let recordMap = records.reduce((map, record) => {
                            let relObjKey = record[keyMap.type];
                            map[relObjKey] = map[relObjKey] || [];
                            map[relObjKey].push(record);
                            return map;
                        }, {});
                        tableData = Object.keys(recordMap).reduce(
                            (total, key) => {
                                let defRecord =
                                    REL_TYPE_KEY_MAP[key] ||
                                    REL_TYPE_KEY_MAP.DEFAULT;
                                if (recordMap[key].length == 1) {
                                    let record = recordMap[key][0];
                                    record = this.tableFormat(
                                        record,
                                        defRecord,
                                        keyMap
                                    );
                                    total.push(record);
                                    return total;
                                } else {
                                    recordMap[key].map((record, index) => {
                                        record = this.tableFormat(
                                            record,
                                            defRecord,
                                            keyMap,
                                            index + 1
                                        );
                                        total.push(record);
                                    });
                                    return total;
                                }
                            },
                            tableData
                        );
                    })
                );
                return tableData;
            },
            error => {
                console.log(error);
            }
        );
    }

    async updateRels(rels, type, properties) {
        let IDKey = DATA_LAYER_MAP[type] ? DATA_LAYER_MAP[type].id : 'id';
        let id = properties[IDKey];
        if (type == 'AD_Lane') {
            if ((rels.L_LDIV || rels.R_LDIV) && rels.L_LDIV === rels.R_LDIV) {
                throw {
                    message: '车道线关联错误'
                };
            }
        }
        // 关系数据转为IndexDB数据格式
        let newRecords = Object.keys(rels).map(key => {
            let relKey = key.replace(/[0-9]/, '');

            let relSpecs = REL_SPEC_CONFIG.filter(relSpec => {
                return (
                    (relSpec.objSpec == type && relSpec.relObjType == relKey) ||
                    (relSpec.relObjSpec == type && relSpec.objType == relKey)
                );
            });
            let relSpec = relSpecs[0];
            let rel;
            if (relSpec.objSpec == type) {
                rel = {
                    objId: id,
                    relObjId: rels[key]
                };
            } else {
                rel = {
                    objId: rels[key],
                    relObjId: id
                };
            }
            let { objType, relObjType, source: spec } = relSpec;
            return {
                ...rel,
                objType,
                relObjType,
                spec
            };
        });
        // console.log(newRecords);

        let relStore = new IndexedDB('relationships', 'rels');
        return await relStore.openTransaction().then(
            async transaction => {
                let store = transaction.objectStore(relStore.tableName);
                let relKeyMap = SPEC_REL_KEY_SET.filter(record => {
                    return record.spec == type;
                });
                await Promise.all(
                    relKeyMap.map(async relKey => {
                        let records = await relStore.queryByIndex(
                            store,
                            relKey.relType,
                            [relKey.relKey, id]
                        );
                        let ids = records.map(record => record.id);
                        ids.map(index => {
                            store.delete(index);
                        });
                        updateFeaturesByRels(records, true);
                    })
                );
                newRecords.map(record => {
                    store.add(record);
                });
                updateFeaturesByRels(newRecords);

                transaction.onabort = error => {
                    console.log(transaction.error.message);
                };
            },
            error => {
                console.log(error);
            }
        );
    }

    tableFormat = (record, defRecord, keyMap, count) => {
        let { name } = defRecord;
        let fix = count || '';
        return {
            name: name + fix,
            key: record[keyMap.type] + fix,
            value: record[keyMap.id]
        };
    };
}

export default new relFactory();
