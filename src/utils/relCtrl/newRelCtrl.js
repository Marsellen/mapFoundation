import IndexedDB from 'src/utils/IndexedDB';
import { OBJ_REL_DATA_MAP } from 'src/config/RelsConfig';
import { DATA_LAYER_MAP } from 'src/config/DataLayerConfig';

const newRel = (features, layerName) => {
    try {
        let [mainFeature, ...relFeatures] = features;
        basicCheck(mainFeature, relFeatures, layerName);

        return batchCreateRel(mainFeature, relFeatures);
    } catch (e) {
        return new Promise((reslove, reject) => {
            reject(e);
        });
    }
};

const basicCheck = (mainFeature, relFeatures, layerName) => {
    if (mainFeature.layerName != layerName) {
        throw {
            message: '首选要素所在图层和编辑图层不一致'
        };
    }
    let relFeatureTypes = relFeatures.reduce((total, feature) => {
        if (!total.includes(feature.layerName)) total.push(feature.layerName);
        return total;
    }, []);
    if (relFeatureTypes.length !== 1) {
        throw {
            message: '只允许建立两类要素之间的关联关系'
        };
    }
    if (
        !OBJ_REL_DATA_MAP[layerName] ||
        !OBJ_REL_DATA_MAP[layerName][relFeatureTypes[0]]
    ) {
        throw {
            message: `无法构建${layerName}和${relFeatureTypes[0]}的关联关系`
        };
    }
};

const batchCreateRel = (mainFeature, relFeatures) => {
    let relStore = new IndexedDB('relationships', 'rels');

    let rels = relFeatures.map((feature, index) => {
        return createRel(mainFeature, feature, index);
    });

    return relStore.batchAdd(rels);
};

const createRel = (mainFeature, feature, index) => {
    let mainLayer = mainFeature.layerName;
    let relLayer = feature.layerName;
    let mainObjId = mainFeature.data.properties[DATA_LAYER_MAP[mainLayer].id];
    let relObjId = feature.data.properties[DATA_LAYER_MAP[relLayer].id];
    let { reverse, relObjType, ...rel } = OBJ_REL_DATA_MAP[mainLayer][relLayer];
    if (Array.isArray(relObjType)) {
        relObjType = relObjType[index];
    }
    if (reverse) {
        return {
            ...rel,
            relObjType,
            objId: relObjId,
            relObjId: mainObjId
        };
    } else {
        return {
            ...rel,
            relObjType,
            relObjId: relObjId,
            objId: mainObjId
        };
    }
};

export default newRel;
