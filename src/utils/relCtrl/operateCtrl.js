import IndexedDB from 'src/utils/IndexedDB';
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
import {
    getFeatureOption,
    getLayerIDKey,
    getLayerByName
} from '../vectorUtils';

const deleteLine = async features => {
    let { rels, attrs } = await features.reduce(
        async (total, feature) => {
            let layerName = feature.layerName;
            let layer = getLayerByName(layerName);
            let option = getFeatureOption(feature);
            layer.removeFeatureByOption(option);
            let rels = await getFeatureRels(layerName, feature.data.properties);
            let attrs = await attrFactory.getFeatureAttrs(
                layerName,
                feature.data.properties
            );
            total = await total;
            total.rels = total.rels.concat(rels);
            total.attrs = total.attrs.concat(attrs);
            return total;
        },
        { rels: [], attrs: [] }
    );

    let relStore = new IndexedDB('relationships', 'rels');
    await Promise.all(rels.map(rel => relStore.deleteById(rel.id)));

    let attrStore = new IndexedDB('attributes', 'attr');
    await Promise.all(attrs.map(attr => attrStore.deleteById(attr.id)));

    let historyLog = {
        features: [features, []],
        rels: [rels, []],
        attrs: [attrs, []]
    };
    return historyLog;
};

const breakLine = async (breakPoint, features, task_id) => {
    let point = geometryToWKT(breakPoint.data.geometry);
    let { lines, oldRels, oldAttrs } = await getLines(features);
    let option = { point, lines, task_id };
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

    rels = uniqRels(rels);
    let historyLog = {
        features: [features, newFeatures],
        rels: [oldRels, rels],
        attrs: [oldAttrs, attrs]
    };
    await updateFeatures(historyLog);

    return historyLog;
};

const mergeLine = async (features, task_id) => {
    let { lines, oldRels, oldAttrs } = await getLines(features);
    let option = { lines, task_id };
    let result = await EditorService.mergeLines(option);
    if (result.code !== 1) throw result;
    let { newFeatures, rels, attrs } = fetchFeatureRels(features, [
        result.data.feature
    ]);
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
    let IDKey = getLayerIDKey(specKey);
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
    let feature = getLayerByName(layerName).getFeatureByOption(option);
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
    return Object.keys(relation || {}).reduce((arr, spec) => {
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

const uniqRels = rels => {
    let REL_IDS = [];
    return rels.reduce((total, rel) => {
        let relId = rel.extraInfo && rel.extraInfo.REL_ID;
        if (!(relId && REL_IDS.includes(relId))) {
            if (relId) REL_IDS.push(relId);
            total.push(rel);
        }
        return total;
    }, []);
};

const calcAttrs = relation => {
    return Object.keys(relation || {}).reduce((arr, spec) => {
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
    let IDKey1 = getLayerIDKey(spec);
    let IDKey2 = getLayerIDKey(layerName);
    return properties.reduce((arr, property) => {
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
        if (relSpec) {
            const { objType, relObjType } = relSpec;
            let objId, relObjId;
            if (relSpec.objSpec == spec) {
                objId = property[IDKey1];
                relObjId = property[IDKey2];
            } else {
                objId = property[IDKey2];
                relObjId = property[IDKey1];
            }
            arr.push({
                spec: relSpec.source,
                objId,
                relObjId,
                objType,
                relObjType
            });
        }
        return arr;
    }, []);
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
    let layerName = (oldFeatures[0] || newFeatures[0]).layerName;
    let layer = getLayerByName(layerName);
    let updateFeatures = [];
    newFeatures.forEach(feature => {
        let option = getFeatureOption(feature);
        let _feature = layer.getFeatureByOption(option);
        if (_feature) {
            updateFeatures.push(option.key + option.value);
            layer.updateFeatures([feature]);
        } else {
            layer.addFeatures([feature.data]);
        }
    });
    if (rels) {
        await updateRels(rels);
    }
    if (attrs) {
        await attrFactory.replaceAttrs(attrs);
    }
    oldFeatures.forEach(feature => {
        let option = getFeatureOption(feature);
        if (updateFeatures.includes(option.key + option.value)) return;
        layer.removeFeatureByOption(option);
    });
};

const updateRels = async ([oldRels, newRels] = []) => {
    let relStore = new IndexedDB('relationships', 'rels');
    let oldRelIds = await oldRels.reduce(async (total, record) => {
        total = await total;
        if (record.id) {
            total.push(record.id);
        } else {
            let _record = await relStore.get(
                [
                    record.objType,
                    record.objId,
                    record.relObjType,
                    record.relObjId
                ],
                'REL_KEYS'
            );
            total.push(_record.id);
        }
        return total;
    }, []);
    await Promise.all(oldRelIds.map(id => relStore.deleteById(id)));
    await relStore.batchAdd(newRels);
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
            arr.push(pointStr.split(' ').map(parseFloat));
            return arr;
        }, []);
    } else if (wkt.startsWith('POINT')) {
        geoJson['type'] = 'Point';
        let firstLeftIndex = wkt.indexOf('(');
        // 去掉首尾括号
        let str = wkt.substring(firstLeftIndex + 1, wkt.length - 1);
        geoJson['coordinates'] = str.split(' ').map(parseFloat);
    } else if (wkt.startsWith('LINESTRING')) {
        geoJson['type'] = 'LineString';
        let firstLeftIndex = wkt.indexOf('(');
        // 去掉首尾括号
        let str = wkt.substring(firstLeftIndex + 1, wkt.length - 1);
        geoJson['coordinates'] = str.split(',').reduce((arr, pointStr) => {
            arr.push(pointStr.split(' ').map(parseFloat));
            return arr;
        }, []);
    }
    return geoJson;
};

export { deleteLine, breakLine, mergeLine, updateFeatures, updateRels };
