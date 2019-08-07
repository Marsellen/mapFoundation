import { REL_SPEC_CONFIG } from 'src/config/RelsConfig';

export default (record, spec) => {
    let relSpecs = REL_SPEC_CONFIG.filter(relSpec => relSpec.source == spec);
    return relSpecs.map(relSpec => {
        let { objId, relObjId } = record;
        return {
            type: 'Feature',
            properties: {
                [relSpec.objKeyName]: objId,
                [relSpec.relObjKeyName]: relObjId
            }
        };
    });
};
