import IndexedDB from 'src/utils/IndexedDB';
import { DATA_LAYER_MAP } from 'src/config/DataLayerConfig';
import {
    SPEC_REL_KEY_SET,
    REL_DATA_SET,
    ATTR_REL_DATA_SET,
    REL_SPEC_CONFIG
} from 'src/config/RelsConfig';
import { updateFeaturesByRels } from './relCtrl';
import EditorService from 'src/pages/Index/service/EditorService';

const breakLine = async (breakPoint, features) => {
    let point = geometryToWKT(breakPoint.data.geometry);
    let { lines, allRels } = await getLines(features);
    let option = { point, lines };
    let result = await EditorService.breakLines(option);
    let { newFeatures, rels } = fetchFeatureRels(
        features,
        result.data[0].features
    );
    updateFeatures(features, newFeatures);
    await updateRels(allRels, rels);

    return {
        features: {
            oldFeatures: features,
            newFeatures: newFeatures
        },
        rels: {
            oldRels: allRels,
            newRels: rels
        }
    };
};

const mergeLine = async features => {
    let { lines, allRels } = await getLines(features);
    let option = { lines };
    let result = await EditorService.mergeLines(option);

    let { newFeatures, rels } = fetchFeatureRels(features, result.data.feature);
    updateFeatures(features, newFeatures);
    await updateRels(allRels, rels);

    return {
        features: {
            oldFeatures: features,
            newFeatures: newFeatures
        },
        rels: {
            oldRels: allRels,
            newRels: rels
        }
    };
};

const getLines = async features => {
    let allRels = [];
    let lines = await features.reduce(async (total, feature) => {
        let { relation, rels } = await getRelation(feature);
        allRels = allRels.concat(rels);
        let line = {
            type: feature.layerName,
            attr: {
                ...feature.data.properties,
                geom: geometryToWKT(feature.data.geometry)
            },
            relation
        };
        total = await total;
        total.push(line);
        return total;
    }, []);
    return {
        lines,
        allRels
    };
};

const getRelation = async feature => {
    let layerName = feature.layerName;
    let IDKey = DATA_LAYER_MAP[layerName] ? DATA_LAYER_MAP[layerName].id : 'id';
    let id = feature.data.properties[IDKey];
    let relStore = new IndexedDB('relationships', 'rels');
    let rels = await relStore.openTransaction().then(
        async transaction => {
            transaction.onabort = error => {
                console.log(transaction.error.message);
            };

            let store = transaction.objectStore(relStore.tableName);
            let relKeyMap = SPEC_REL_KEY_SET.filter(record => {
                return record.spec == layerName;
            });
            return await relKeyMap.reduce(async (total, relKey) => {
                let records = await relStore.queryByIndex(
                    store,
                    relKey.relType,
                    [relKey.relKey, id]
                );
                total = await total;
                total = total.concat(records);
                return total;
            }, []);
        },
        error => {
            console.log(error);
        }
    );
    return {
        relation: relsFormat(rels, layerName),
        rels: rels
    };
};

const relsFormat = (rels, layerName) => {
    return rels.reduce((total, record) => {
        return relToSpecData(record, layerName, total);
    }, {});
};

const relToSpecData = (record, layerName, total) => {
    let relSpec = REL_SPEC_CONFIG.find(
        rs => rs.objType == record.objType && rs.relObjType == record.relObjType
    );
    let specKey, id;
    if (layerName == relSpec.objSpec) {
        specKey = relSpec.relObjSpec;
        id = record.relObjId;
    } else {
        specKey = relSpec.objSpec;
        id = record.objId;
    }
    let IDKey = DATA_LAYER_MAP[specKey] ? DATA_LAYER_MAP[specKey].id : 'id';
    let feature = queryFeature(specKey, {
        key: IDKey,
        value: id
    });
    if (!feature) return total;
    let geom = geometryToWKT(feature.data.geometry);
    if (ATTR_REL_DATA_SET.includes(record.spec)) {
        total[specKey] = total[specKey] || [];

        total[specKey].push({
            [IDKey]: id,
            geom,
            ...feature.data.properties
        });
    } else {
        total[record.spec] = total[record.spec] || [];

        total[record.spec].push({
            ...record.extraInfo,
            [relSpec.objKeyName]: record.objId,
            [relSpec.relObjKeyName]: record.relObjId,
            geom
        });
    }
    return total;
};

const queryFeature = (layerName, option) => {
    let feature = map
        .getLayerManager()
        .getLayersByType('VectorLayer')
        .find(layer => layer.layerName == layerName)
        .layer.getFeatureByOption(option);
    return feature && feature.properties;
};

const fetchFeatureRels = (oldFeatures, features) => {
    let layerName = oldFeatures[0].layerName;
    return calcFeatureRels(layerName, features).reduce(
        (total, fr) => {
            total.newFeatures.push(fr.feature);
            total.rels = total.rels.concat(fr.rels);
            return total;
        },
        { newFeatures: [], rels: [] }
    );
};

const calcFeatureRels = (layerName, features) => {
    features = Array.isArray(features) ? features : [features];
    return features.map(feature => {
        return {
            feature: calcFeatures(feature[layerName]),
            rels: calcRels(layerName, feature.relation, feature[layerName])
        };
    });
};

const calcFeatures = feature => {
    let { geom, ...properties } = feature;
    return {
        geometry: WKTToGeom(geom),
        properties,
        type: 'Feature'
    };
};

const calcRels = (layerName, relation, feature) => {
    return Object.keys(relation).reduce((arr, spec) => {
        let properties = relation[spec];
        if (REL_DATA_SET.includes(spec)) {
            arr = arr.concat(relDataFormat(spec, properties));
        } else {
            arr = arr.concat(
                attrRelDataFormat(layerName, spec, properties, feature)
            );
        }
        return arr;
    }, []);
};

const relDataFormat = (spec, properties) => {
    let relSpec = REL_SPEC_CONFIG.find(relSpec => relSpec.source == spec);
    const { objKeyName, objType, relObjKeyName, relObjType } = relSpec;
    return properties.map(property => {
        return {
            spec,
            objId: property[objKeyName],
            relObjId: property[relObjKeyName],
            objType,
            relObjType,
            extraInfo: property
        };
    });
};

const attrRelDataFormat = (layerName, spec, properties, feature) => {
    let relSpecs = REL_SPEC_CONFIG.filter(
        rs =>
            (rs.objSpec == spec && rs.relObjSpec == layerName) ||
            (rs.relObjSpec == spec && rs.objSpec == layerName)
    );
    let relSpec;
    let IDKey1 = DATA_LAYER_MAP[spec] ? DATA_LAYER_MAP[spec].id : 'id';
    let IDKey2 = DATA_LAYER_MAP[layerName]
        ? DATA_LAYER_MAP[layerName].id
        : 'id';
    return properties.map(property => {
        if (relSpecs.length > 1) {
            relSpec = relSpecs.find(rs => {
                if (rs.objSpec == spec) {
                    return property[rs.relObjKeyName] == feature[IDKey2];
                } else {
                    return property[IDKey1] == feature[rs.relObjKeyName];
                }
            });
        } else {
            relSpec = relSpecs[0];
        }
        const { objType, relObjType } = relSpec;
        if (relSpec.objSpec == spec) {
            objId = property[IDKey1];
            relObjId = feature[IDKey2];
        } else {
            objId = property[IDKey2];
            relObjId = feature[IDKey1];
        }
        return {
            spec: relSpec.source,
            objId,
            relObjId,
            objType,
            relObjType
        };
    });
};

const updateFeatures = (oldFeatures, newFeatures) => {
    let layerName = oldFeatures[0].layerName;
    let layer = map
        .getLayerManager()
        .getLayersByType('VectorLayer')
        .find(layer => layer.layerName == layerName).layer;
    oldFeatures.map(feature => {
        layer.removeFeatureById(feature.uuid);
    });
    layer.addFeatures(newFeatures);
};

const updateRels = async (oldRels, newRels) => {
    let relStore = new IndexedDB('relationships', 'rels');
    await relStore.openTransaction().then(
        async transaction => {
            let store = transaction.objectStore(relStore.tableName);

            await Promise.all(
                oldRels.map(async record => {
                    let records = await relStore.queryByIndex(
                        store,
                        'REL_KEYS',
                        [
                            record.objType,
                            record.objId,
                            record.relObjType,
                            record.relObjId
                        ]
                    );
                    store.delete(records[0].id);
                })
            );

            newRels.map(record => {
                store.add(record);
            });

            transaction.onabort = error => {
                console.log(transaction.error.message);
            };
        },
        error => {
            console.log(error);
        }
    );
    updateFeaturesByRels(oldRels, true);
    updateFeaturesByRels(newRels);
};

const geometryToWKT = geometry => {
    if (geometry.type == 'LineString') {
        let geomStr = geometry.coordinates
            .reduce((arr, coordinate) => {
                arr.push(coordinate.join(' '));
                return arr;
            }, [])
            .join(',');
        return 'LINESTRING(' + geomStr + ')';
    } else if (geometry.type == 'Point') {
        let geomStr = geometry.coordinates.join(' ');
        return 'POINT(' + geomStr + ')';
    } else if (geometry.type == 'Polygon') {
        let geomStr = geometry.coordinates[0]
            .reduce((arr, coordinate) => {
                arr.push(coordinate.join(' '));
                return arr;
            }, [])
            .join(',');
        return 'POLYGON((' + geomStr + '))';
    }
};

const WKTToGeom = wkt => {
    let geoJson = {};
    if (wkt.startsWith('POLYGON')) {
        geoJson['type'] = 'Polygon';
        let firstLeftIndex = wkt.indexOf('(');
        let str = wkt.substring(firstLeftIndex + 2, wkt.length - 2);
        // 去掉首尾括号
        geoJson['coordinates'] = str.split(',').reduce((arr, pointStr) => {
            arr.push(pointStr.split(' '));
            return arr;
        }, []);
    } else if (wkt.startsWith('POINT')) {
        geoJson['type'] = 'Point';
        let firstLeftIndex = wkt.indexOf('(');
        // 去掉首尾括号
        let str = wkt.substring(firstLeftIndex + 1, wkt.length - 1);
        geoJson['coordinates'] = str.split(' ');
    } else if (wkt.startsWith('LINESTRING')) {
        geoJson['type'] = 'LineString';
        let firstLeftIndex = wkt.indexOf('(');
        // 去掉首尾括号
        let str = wkt.substring(firstLeftIndex + 1, wkt.length - 1);
        geoJson['coordinates'] = str.split(',').reduce((arr, pointStr) => {
            arr.push(pointStr.split(' '));
            return arr;
        }, []);
    }
    return geoJson;
};

export { breakLine, mergeLine, updateFeatures, updateRels };
