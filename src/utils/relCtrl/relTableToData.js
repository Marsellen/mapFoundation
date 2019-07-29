const laneCon = record => {
    const {
        objId,
        relObjId,
        extraInfo: { ALCN_ID }
    } = record;
    return [
        {
            type: 'Feature',
            properties: { ALCN_ID, FROM_ALANE: objId, TO_ALANE: relObjId }
        }
    ];
};

const objLaneRel = record => {
    const {
        objId,
        relObjId,
        extraInfo: { OBJ_TYPE }
    } = record;
    return [
        {
            type: 'Feature',
            properties: {
                ALANE_ID: objId,
                OBJECT_ID: relObjId,
                OBJ_TYPE: OBJ_TYPE
            }
        }
    ];
};

const refLineCon = record => {
    const {
        objId,
        relObjId,
        extraInfo: { REF_REL_ID }
    } = record;
    return [
        {
            type: 'Feature',
            properties: {
                REF_REL_ID,
                F_REF_LINE: objId,
                T_REF_LINE: relObjId
            }
        }
    ];
};

export default { laneCon, objLaneRel, refLineCon };
