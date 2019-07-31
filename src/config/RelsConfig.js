export const REL_DATA_SET = [
    'AD_Lane_Con',
    'AD_Road_Con',
    'AD_StopL_Lane_Rel',
    'AD_Plg_Lane_Rel',
    'AD_Sign_Lane_Rel',
    'AD_Light_Lane_Rel',
    'AD_Lane'
];
export const ATTR_REL_DATA_SET = ['AD_Lane'];

export const REL_DATA_MAP = {
    AD_Lane_Con: [
        {
            objId: 'FROM_LANE',
            relObjId: 'TO_LANE',
            objType: 'FROM_LANE',
            relObjType: 'TO_LANE'
        }
    ],
    AD_Road_Con: [
        {
            objId: 'FROM_ROAD',
            relObjId: 'TO_ROAD',
            objType: 'FROM_ROAD',
            relObjType: 'TO_ROAD'
        }
    ],
    AD_StopL_Lane_Rel: [
        {
            objId: 'LANE_ID',
            relObjId: 'STOPL_ID',
            objType: 'LANE',
            relObjType: 'STOPL'
        }
    ],
    AD_Plg_Lane_Rel: [
        {
            objId: 'LANE_ID',
            relObjId: 'PLG_ID',
            objType: 'LANE',
            relObjType: 'PLG'
        }
    ],
    AD_Sign_Lane_Rel: [
        {
            objId: 'LANE_ID',
            relObjId: 'SIGN_ID',
            objType: 'LANE',
            relObjType: 'SIGN'
        }
    ],
    AD_Light_Lane_Rel: [
        {
            objId: 'LANE_ID',
            relObjId: 'LIGHT_ID',
            objType: 'LANE',
            relObjType: 'LIGHT'
        }
    ],
    AD_Lane: [
        {
            objId: 'LANE_ID',
            relObjId: 'ROAD_ID',
            objType: 'LANE',
            relObjType: 'ROAD'
        },
        {
            objId: 'LANE_ID',
            relObjId: 'L_LDIV_ID',
            objType: 'LANE',
            relObjType: 'L_LDIV'
        },
        {
            objId: 'LANE_ID',
            relObjId: 'R_LDIV_ID',
            objType: 'LANE',
            relObjType: 'R_LDIV'
        }
    ]
};
