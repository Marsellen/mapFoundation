export const ATTR_SPEC_CONFIG = [
    {
        source: 'AD_Lane_RS',
        sourceId: 'RS_ID',
        key: 'LANE_ID',
        relSpec: 'AD_Lane'
    },
    {
        source: 'AD_Lane_Con_RS',
        sourceId: 'RS_ID',
        key: 'REL_ID',
        relSpec: 'AD_Lane_Con'
    },
    {
        source: 'AD_Road_Con_RS',
        sourceId: 'RS_ID',
        key: 'REL_ID',
        relSpec: 'AD_Road_Con'
    },
    {
        source: 'AD_Lane_Speed',
        sourceId: 'SPEED_ID',
        key: 'LANE_ID',
        relSpec: 'AD_Lane'
    }
];

export const ATTR_TABLE_CONFIG = {
    AD_Lane_RS: [
        {
            key: 'RS_ID',
            name: '用户编号',
            domType: 'Text',
            placeholder: '系统自动生成'
        },
        {
            key: 'RS_TYPE',
            name: '限制类型',
            type: 'AD_LANE_RS_TYPE',
            domType: 'Select',
            link: 'RS_VALUE'
        },
        {
            key: 'RS_VALUE',
            name: '限制取值',
            type: 'AD_LANE_RS_VALUE',
            domType: 'Select'
        },
        {
            key: 'TIMEDOM',
            name: '限制时间描述',
            domType: 'AdDateInput',
            validates: 'Char|250'
        }
    ],
    AD_Lane_Con_RS: [
        {
            key: 'RS_ID',
            name: '用户编号',
            domType: 'Text',
            placeholder: '系统自动生成'
        },
        {
            key: 'RS_TYPE',
            name: '限制类型',
            type: 'AD_LANE_CON_RS_TYPE',
            domType: 'Select'
        },
        {
            key: 'TIMEDOM',
            name: '限制时间描述',
            domType: 'AdDateInput',
            validates: 'Char|250'
        }
    ],
    AD_Road_Con_RS: [
        {
            key: 'RS_ID',
            name: '用户编号',
            domType: 'Text',
            placeholder: '系统自动生成'
        },
        {
            key: 'RS_TYPE',
            name: '限制类型',
            type: 'AD_ROAD_CON_RS_TYPE',
            domType: 'Select'
        },
        {
            key: 'TIMEDOM',
            name: '限制时间描述',
            domType: 'AdDateInput',
            validates: 'Char|250'
        }
    ],
    AD_Lane_Speed: [
        {
            key: 'SPEED_ID',
            name: '用户编号',
            domType: 'Text',
            placeholder: '系统自动生成'
        },
        {
            key: 'SPD_TYPE',
            name: '限速类型',
            type: 'AD_LANE_SPD_TYPE',
            domType: 'Select'
        },
        {
            key: 'SPEED',
            name: '限速值',
            type: 'AD_LANE_SPEED',
            domType: 'InputNumber',
            validates: 'Numeric|range|0|150',
            batchAssign:true
        },
        {
            key: 'SPD_SOURCE',
            name: '限速来源',
            type: 'AD_LANE_SPD_SOURCE',
            domType: 'Select',
            batchAssign:true
        },
        {
            key: 'OFFSET',
            name: '限速区间',
            domType: 'RangeInputNumber',
            OFFSETMin: 0,
            OFFSETMax: 0,
            validates: {
                max: '100000',
                min: '0'
            } 
        },
        {
            key: 'UPD_STAT',
            name: '更新标识',
            filterBy: 'updStatFilter',
            domType: 'Text',
            batchAssign:true
        }
    ]
};

export const REL_ATTR_LAYERS = ['AD_Lane_Con_RS', 'AD_Road_Con_RS'];

export const TO_REMOVE_FIELDS = ['OFFSETMax', 'OFFSETMin'];
