const laneCon = (properties, spec) => {
    let { FROM_ALANE, TO_ALANE, ...extraInfo } = properties;
    return [
        {
            spec,
            objId: FROM_ALANE,
            objType: 'FROM_ALANE',
            relObjId: TO_ALANE,
            relObjType: 'TO_ALANE',
            extraInfo: extraInfo
        }
    ];
};

const objLaneRel = (properties, spec) => {
    let { ALANE_ID, OBJECT_ID, ...extraInfo } = properties;
    return [
        {
            spec,
            objId: ALANE_ID,
            objType: 'Lane',
            relObjId: OBJECT_ID,
            relObjType: 'obj',
            extraInfo: extraInfo
        }
    ];
};

const refLineCon = (properties, spec) => {
    let { F_REF_LINE, T_REF_LINE, ...extraInfo } = properties;
    return [
        {
            spec,
            objId: F_REF_LINE,
            objType: 'F_REF_LINE',
            relObjId: T_REF_LINE,
            relObjType: 'T_REF_LINE',
            extraInfo: extraInfo
        }
    ];
};

const lane = (properties, spec) => {
    let { ALANE_ID, REFLINE_ID, L_DIV_ID, R_DIV_ID } = properties;
    return [
        {
            spec,
            objId: ALANE_ID,
            objType: 'Lane',
            relObjId: L_DIV_ID,
            relObjType: 'L_DIV'
        },
        {
            spec,
            objId: ALANE_ID,
            objType: 'Lane',
            relObjId: R_DIV_ID,
            relObjType: 'R_DIV'
        },
        {
            spec,
            objId: ALANE_ID,
            objType: 'Lane',
            relObjId: REFLINE_ID,
            relObjType: 'REFLINE'
        }
    ];
};

export default {
    laneCon,
    objLaneRel,
    refLineCon,
    lane
};
