import IndexedDB from 'src/utils/IndexedDB';
import { DATA_LAYER_MAP } from 'src/config/DataLayerConfig';
import {
    REL_DATA_SET,
    ATTR_REL_DATA_SET,
    REL_SPEC_CONFIG
} from 'src/config/RelsConfig';
import { ATTR_SPEC_CONFIG } from 'src/config/AttrsConfig';
import { updateFeaturesByRels } from './relCtrl';
import EditorService from 'src/pages/Index/service/EditorService';
import { getFeatureRels } from './utils';
import attrFactory from '../attrCtrl/attrFactory';

const breakLine = async (breakPoint, features) => {
    let point = geometryToWKT(breakPoint.data.geometry);
    let { lines, oldRels, oldAttrs } = await getLines(features);
    let option = { point, lines };
    let result = await EditorService.breakLines(option);
    if (result.code !== 1) throw result;
    let { newFeatures, rels, attrs } = result.data.reduce(
        (total, data) => {
            let { newFeatures, rels, attrs } = fetchFeatureRels(
                features,
                data.features
            );
            total.newFeatures = total.newFeatures.concat(newFeatures);
            total.rels = total.rels.concat(rels);
            total.attrs = total.attrs.concat(attrs);
            return total;
        },
        { newFeatures: [], rels: [], attrs: [] }
    );

    let historyLog = {
        features: [features, newFeatures],
        rels: [oldRels, rels],
        attrs: [oldAttrs, attrs]
    };
    await updateFeatures(historyLog);

    return historyLog;
};

const mergeLine = async features => {
    let { lines, oldRels, oldAttrs } = await getLines(features);
    let option = { lines };
    let result = await EditorService.mergeLines(option);
    if (result.code !== 1) throw result;
    let { newFeatures, rels, attrs } = fetchFeatureRels(
        features,
        result.data.feature
    );
    let historyLog = {
        features: [features, newFeatures],
        rels: [oldRels, rels],
        attrs: [oldAttrs, attrs]
    };
    await updateFeatures(historyLog);

    return historyLog;
};

const getLines = async features => {
    let oldRels = [];
    let oldAttrs = [];
    let lines = await features.reduce(async (total, feature) => {
        let { relation, rels, attrs } = await getRelation(feature);
        oldRels = oldRels.concat(rels);
        oldAttrs = oldAttrs.concat(attrs);
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
        oldRels,
        oldAttrs
    };
};

const getRelation = async feature => {
    let layerName = feature.layerName;
    let rels = await getFeatureRels(layerName, feature.data.properties);
    let attrs = await attrFactory.getFeatureAttrs(
        layerName,
        feature.data.properties
    );
    let relRelation = relRelationFormat(rels, layerName);
    let attrRelation = attrRelationFormat(attrs);
    return {
        relation: {
            ...relRelation,
            ...attrRelation
        },
        rels: rels,
        attrs: attrs
    };
};

const relRelationFormat = (rels, layerName) => {
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

const attrRelationFormat = attrs => {
    return attrs.reduce((total, attr) => {
        total[attr.source] = total[attr.source] || [];
        total[attr.source].push(attr.properties);
        return total;
    }, {});
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
            total.attrs = total.attrs.concat(fr.attrs);
            return total;
        },
        { newFeatures: [], rels: [], attrs: [] }
    );
};

const calcFeatureRels = (layerName, features) => {
    features = Array.isArray(features) ? features : [features];
    return features.map(feature => {
        return {
            feature: calcFeatures(feature[layerName], layerName),
            rels: calcRels(layerName, feature.relation, feature[layerName]),
            attrs: calcAttrs(feature.relation)
        };
    });
};

const calcFeatures = (feature, layerName) => {
    let { geom, ...properties } = feature;
    return {
        layerName,
        data: {
            geometry: WKTToGeom(geom),
            properties,
            type: 'Feature'
        }
    };
};

const calcRels = (layerName, relation, feature) => {
    return Object.keys(relation).reduce((arr, spec) => {
        let properties = relation[spec];
        if (REL_DATA_SET.includes(spec)) {
            arr = arr.concat(relDataFormat(spec, properties));
        } else if (ATTR_REL_DATA_SET.includes(spec)) {
            arr = arr.concat(
                attrRelDataFormat(layerName, spec, properties, feature)
            );
        }
        return arr;
    }, []);
};

const calcAttrs = relation => {
    return Object.keys(relation).reduce((arr, spec) => {
        if (ATTR_SPEC_CONFIG.map(config => config.source).includes(spec)) {
            arr = arr.concat(attrsDataFormat(relation[spec], spec));
        }
        return arr;
    }, []);
};

const relDataFormat = (spec, properties) => {
    let relSpec = REL_SPEC_CONFIG.find(relSpec => relSpec.source == spec);
    const { objKeyName, objType, relObjKeyName, relObjType } = relSpec;
    return properties.map(property => {
        let {
            [objKeyName]: objId,
            [relObjKeyName]: relObjId,
            ...extraInfo
        } = property;
        return {
            spec,
            objId,
            relObjId,
            objType,
            relObjType,
            extraInfo
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
        let objId, relObjId;
        if (relSpec.objSpec == spec) {
            objId = property[IDKey1];
            relObjId = property[IDKey2];
        } else {
            objId = property[IDKey2];
            relObjId = property[IDKey1];
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

const attrsDataFormat = (data, source) => {
    return data.map(d => {
        let config = ATTR_SPEC_CONFIG.find(c => c.source == source);
        return {
            source,
            spec: config.relSpec,
            properties: d,
            key: d[config.key],
            sourceId: d[config.sourceId]
        };
    });
};

const updateFeatures = async ({ features, rels, attrs } = {}) => {
    let [oldFeatures, newFeatures] = features;
    let layerName = oldFeatures[0].layerName;
    let layer = map
        .getLayerManager()
        .getLayersByType('VectorLayer')
        .find(layer => layer.layerName == layerName).layer;
    layer.addFeatures(newFeatures.map(f => f.data));
    await updateRels(rels);
    await attrFactory.replaceAttrs(attrs);
    oldFeatures.map(feature => {
        let layerName = feature.layerName;
        let properties = feature.data.properties;
        let IDKey = DATA_LAYER_MAP[layerName]
            ? DATA_LAYER_MAP[layerName].id
            : 'id';
        let id = properties[IDKey];
        layer.removeFeatureByOption({
            key: IDKey,
            value: id
        });
    });
};

const updateRels = async ([oldRels, newRels] = []) => {
    let relStore = new IndexedDB('relationships', 'rels');
    await relStore.open().then(
        async store => {
            oldRels.map(async record => {
                if (record.id) {
                    store.delete(record.id);
                } else {
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
                }
            });

            newRels.map(record => {
                store.add(record);
            });
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
