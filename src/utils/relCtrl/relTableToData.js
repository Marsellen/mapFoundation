import { REL_DATA_MAP } from 'src/config/RelsConfig';

export default (record, spec) => {
    return (REL_DATA_MAP[spec] || []).map(rel => {
        let { objId, relObjId, extraInfo } = record;
        return {
            type: 'Feature',
            properties: {
                ...extraInfo,
                [rel.objId]: objId,
                [rel.relObjId]: relObjId
            }
        };
    });
};
