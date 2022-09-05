import { getLayerByName, getLayerIDKey } from '../vectorUtils';
import { ATTR_TABLE_CONFIG } from 'src/config/attrsConfig';
import { REL_DATA_SET } from 'src/config/relsConfig';
import Attr from 'src/util/attr';
import Rel from 'src/util/relevance';
const ATTR_SPECS = Object.keys(ATTR_TABLE_CONFIG);
import { REL_SPEC_CONFIG } from 'src/config/relsConfig';

export const getLayerItems = async layerName => {
    if (!layerName) {
        return [];
    }

    if (isAttrLayer(layerName)) {
        return await getAttrData(layerName);
    } else if (isRelLayer(layerName)) {
        return await getRelData(layerName);
    } else {
        return getVectorData(layerName);
    }
};

export const isAttrLayer = layerName => {
    return ATTR_SPECS.includes(layerName);
};

export const isRelLayer = layerName => {
    return REL_DATA_SET.includes(layerName);
};

const getVectorData = layerName => {
    let layer = getLayerByName(layerName);
    let IDKey = getLayerIDKey(layerName);
    return layer
        .getVectorData()
        .features.sort((a, b) => {
            return parseInt(a.properties[IDKey]) - parseInt(b.properties[IDKey]);
        })
        .map((feature, index) => {
            return { ...feature.properties, index: index + 1 };
        });
};

const getAttrData = async layerName => {
    let attrStore = Attr.store;
    let attrs = await attrStore.getAll();
    let IDKey = getLayerIDKey(layerName);
    return attrs
        .filter(attr => {
            return attr.source === layerName && attr.dataType !== 'boundary';
        })
        .sort((a, b) => {
            return parseInt(a.properties[IDKey]) - parseInt(b.properties[IDKey]);
        })
        .map((attr, index) => {
            return { ...attr.properties, index: index + 1 };
        });
};

const getRelData = async layerName => {
    let relStore = Rel.store;
    let rels = await relStore.getAll();
    let IDKey = getLayerIDKey(layerName);
    let relSpec = REL_SPEC_CONFIG.find(conf => conf.source == layerName);
    return rels
        .filter(rel => {
            return rel.spec === layerName && rel.dataType !== 'boundary';
        })
        .sort((a, b) => {
            return parseInt(a.extraInfo[IDKey]) - parseInt(b.extraInfo[IDKey]);
        })
        .map((rel, index) => {
            return {
                ...rel.extraInfo,
                [relSpec.objKeyName]: rel.objId,
                [relSpec.relObjKeyName]: rel.relObjId,
                index: index + 1
            };
        });
};

export const findRelDataById = async rel_id => {
    let relStore = Rel.store;
    let rels = await relStore.getAll();
    return rels.find(rel => {
        return rel.extraInfo && rel.extraInfo.REL_ID == rel_id;
    });
};

export const vectorDataToTable = data => {
    let map = {};
    if (data.length > 0) {
        data.forEach(response => {
            const { data: feature } = response;
            const spec = feature.name;
            const features = feature.features;
            map[spec] = { features };
        });
    }
    else {
        const { features, name } = data;
        const spec = name;
        map[spec] = { features };

    }

    return map
};

export default {
    vectorDataToTable
};