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

export const OBJ_REL_DATA_MAP = {
    AD_Lane: {
        AD_LaneDivider: {
            objType: 'LANE',
            relObjType: ['L_LDIV', 'R_LDIV'],
            spec: 'AD_Lane'
        },
        AD_Road: {
            objType: 'LANE',
            relObjType: 'ROAD',
            spec: 'AD_Lane'
        },
        AD_Arrow: {
            objType: 'LANE',
            relObjType: 'ARROW',
            spec: 'AD_Arrow'
        },
        AD_Text: {
            objType: 'LANE',
            relObjType: 'TEXT',
            spec: 'AD_Text'
        },
        AD_StopLocation: {
            objType: 'LANE',
            relObjType: 'STOPL',
            spec: 'AD_StopL_Lane_Rel'
        },
        AD_LaneMark_Plg: {
            objType: 'LANE',
            relObjType: 'PLG',
            spec: 'AD_Plg_Lane_Rel'
        },
        AD_TrafficSign: {
            objType: 'LANE',
            relObjType: 'SIGN',
            spec: 'AD_Sign_Lane_Rel'
        },
        AD_TrafficLight: {
            objType: 'LANE',
            relObjType: 'LIGHT',
            spec: 'AD_Light_Lane_Rel'
        }
    },
    AD_Arrow: {
        AD_Lane: {
            objType: 'LANE',
            relObjType: 'ARROW',
            spec: 'AD_Arrow',
            reverse: true
        }
    },
    AD_Text: {
        AD_Lane: {
            objType: 'LANE',
            relObjType: 'TEXT',
            spec: 'AD_Text',
            reverse: true
        }
    },
    AD_LaneMark_Plg: {
        AD_Lane: {
            objType: 'LANE',
            relObjType: 'PLG',
            spec: 'AD_Plg_Lane_Rel',
            reverse: true
        }
    },
    AD_StopLocation: {
        AD_Lane: {
            objType: 'LANE',
            relObjType: 'STOPL',
            spec: 'AD_StopL_Lane_Rel',
            reverse: true
        }
    },
    AD_TrafficSign: {
        AD_Lane: {
            objType: 'LANE',
            relObjType: 'SIGN',
            spec: 'AD_Sign_Lane_Rel',
            reverse: true
        }
    },
    AD_TrafficLight: {
        AD_Lane: {
            objType: 'LANE',
            relObjType: 'LIGHT',
            spec: 'AD_Light_Lane_Rel',
            reverse: true
        }
    },
    AD_Road: {
        AD_LaneAttrPoint: {
            objType: 'LANEP',
            relObjType: 'ROAD',
            spec: 'AD_LaneAttrPoint',
            reverse: true
        }
    },
    AD_LaneAttrPoint: {
        AD_Road: {
            objType: 'LANEP',
            relObjType: 'ROAD',
            spec: 'AD_LaneAttrPoint'
        }
    }
};
