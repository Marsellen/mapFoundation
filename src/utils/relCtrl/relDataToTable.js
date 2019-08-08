import { REL_SPEC_CONFIG, ATTR_REL_DATA_SET } from 'src/config/RelsConfig';

export default (properties, spec) => {
    let relSpecs = REL_SPEC_CONFIG.filter(relSpec => relSpec.source == spec);
    return relSpecs.map(relSpec => {
        const { objKeyName, objType, relObjKeyName, relObjType } = relSpec;
        let record = {
            spec,
            objId: properties[objKeyName],
            relObjId: properties[relObjKeyName],
            objType,
            relObjType
        };
        if (!ATTR_REL_DATA_SET.includes(spec)) {
            record = {
                ...record,
                extraInfo: properties
            };
        }
        return record;
    });
};
