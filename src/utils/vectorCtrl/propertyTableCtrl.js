import { getLayerByName, getLayerIDKey } from '../vectorUtils';
import { ATTR_TABLE_CONFIG } from 'src/config/AttrsConfig';
import Attr from 'src/models/attr';
const ATTR_SPECS = Object.keys(ATTR_TABLE_CONFIG);

export const getLayerItems = async layerName => {
    if (!layerName) {
        return [];
    }

    if (isAttrLayer(layerName)) {
        return await getAttrData(layerName);
    } else {
        return getVectorData(layerName);
    }
};

export const isAttrLayer = layerName => {
    return ATTR_SPECS.includes(layerName);
};

const getVectorData = layerName => {
    let layer = getLayerByName(layerName);
    let IDKey = getLayerIDKey(layerName);
    return layer
        .getVectorData()
        .features.sort((a, b) => {
            return (
                parseInt(a.properties[IDKey]) - parseInt(b.properties[IDKey])
            );
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
        .filter(attr => attr.source === layerName)
        .sort((a, b) => {
            return (
                parseInt(a.properties[IDKey]) - parseInt(b.properties[IDKey])
            );
        })
        .map((attr, index) => {
            return { ...attr.properties, index: index + 1 };
        });
};
