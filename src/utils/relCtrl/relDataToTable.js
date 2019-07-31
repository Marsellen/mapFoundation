import { REL_DATA_MAP, ATTR_REL_DATA_SET } from 'src/config/RelsConfig';

export default (properties, spec) => {
    return (REL_DATA_MAP[spec] || []).map(rel => {
        const { objId, objType, relObjId, relObjType } = rel;
        let record = {
            spec,
            objId: properties[objId],
            relObjId: properties[relObjId],
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
