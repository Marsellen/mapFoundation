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
            name: '限制取值',
            key: 'RS_VALUE',
            type: 'AD_LANE_RS_VALUE',
            domType: 'Select'
        },
        {
            name: '限制时间描述',
            key: 'TIMEDOM',
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
            name: '限制时间描述',
            key: 'TIMEDOM',
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
            name: '限制时间描述',
            key: 'TIMEDOM',
            domType: 'AdDateInput',
            validates: 'Char|250'
        }
    ]
};

export const REL_ATTR_LAYERS = ['AD_Lane_Con_RS', 'AD_Road_Con_RS'];
