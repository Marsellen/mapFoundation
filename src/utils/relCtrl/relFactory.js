import {
    REL_DATA_SET,
    ATTR_REL_DATA_SET,
    REL_DATA_MAP
} from 'src/config/RelsConfig';
import RelDataToTable from './relDataToTable';
import RelTableToData from './relTableToData';
import IndexedDB from 'src/utils/IndexedDB';
import { REL_TYPE_KEY_MAP, OBJ_REL_KEY_MAP } from 'src/config/ADMapDataConfig';
import { DATA_LAYER_MAP } from 'src/config/DataLayerConfig';

class relFactory {
    relDataToTable = data => {
        let relData = this.filterRelData(data);
        return relData.reduce((total, feature) => {
            let spec = feature.name;
            let func = REL_DATA_MAP[spec] && REL_DATA_MAP[spec].func;
            if (!func || typeof RelDataToTable[func] !== 'function') {
                return total;
            }
            feature.features.map(f => {
                let records = RelDataToTable[func](f.properties, spec);
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
            let func = REL_DATA_MAP[spec] && REL_DATA_MAP[spec].func;
            if (!func || typeof RelTableToData[func] !== 'function') {
                return total;
            }
            total[spec] = total[spec] || [];
            let features = RelTableToData[func](record);
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
        return ((data && data.features) || []).filter(d =>
            REL_DATA_SET.includes(d.name)
        );
    };

    async getTabelData(type, properties) {
        let keys = Object.keys(OBJ_REL_KEY_MAP);
        if (!keys.includes(type)) return;
        let relStore = new IndexedDB('relationships', 'rels');
        return await relStore.open().then(
            async store => {
                let IDKey = DATA_LAYER_MAP[type]
                    ? DATA_LAYER_MAP[type].id
                    : 'id';
                let id = properties[IDKey];
                let relKeyMap = OBJ_REL_KEY_MAP[type];
                let tableData = [];
                await Promise.all(
                    relKeyMap.OBJ_TYPE_KEYS.map(async key => {
                        let records = await relStore.queryByIndex(
                            store,
                            'obj',
                            [key, id]
                        );
                        records = records.map(record => {
                            let defRecord =
                                REL_TYPE_KEY_MAP[record.relObjType] ||
                                REL_TYPE_KEY_MAP[DEFAULT];
                            return {
                                ...defRecord,
                                value: record.relObjId
                            };
                        });
                        tableData = tableData.concat(records);
                    })
                );
                await Promise.all(
                    relKeyMap.REL_OBJ_TYPE_KEYS.map(async key => {
                        let records = await relStore.queryByIndex(
                            store,
                            'relObj',
                            [key, id]
                        );
                        records = records.map(record => {
                            let defRecord =
                                REL_TYPE_KEY_MAP[record.objType] ||
                                REL_TYPE_KEY_MAP[DEFAULT];
                            return {
                                ...defRecord,
                                value: record.objId
                            };
                        });
                        tableData = tableData.concat(records);
                    })
                );

                return tableData;
            },
            error => {
                console.log(error);
            }
        );
    }
}

export default new relFactory();
