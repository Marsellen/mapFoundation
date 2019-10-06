export const ATTR_SPEC_CONFIG = [
    // { source: 'AD_LaneShape', key: 'LANE_ID', relSpec: 'AD_Lane' },
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
        source: 'AD_TS_Content',
        sourceId: 'CONT_ID',
        key: 'SIGN_ID',
        relSpec: 'AD_TrafficSign'
    },
    {
        source: 'AD_Sub_Lamp',
        sourceId: 'LAMP_ID',
        key: 'LIGHT_ID',
        relSpec: 'AD_TrafficLight'
    }
    //{ source: 'AD_Data_Confidence', key: 'FEAT_ID', relSpec: 'FEAT_TYPE' }
];

export const ATTR_TABLE_CONFIG = {
    AD_TS_Content: [
        {
            key: 'CONT_ID',
            name: '用户编号',
            domType: 'Text',
            placeholder: '系统自动生成'
        },
        {
            key: 'SIGN_NO',
            name: '标志牌编号',
            domType: 'Input'
        },
        {
            key: 'SIGN_TYPE',
            name: '标志牌类型',
            type: 'AD_TS_CONTENT_SIGN_TYPE',
            domType: 'RadioIconGroup'
        },
        {
            key: 'CONT_TYPE',
            name: '交通标志牌语义类型',
            type: 'AD_TS_CONTENT_CONT_TYPE',
            domType: 'Select'
        },
        {
            key: 'CONT_VALUE',
            name: '标志牌语义内容',
            validates: [
                {
                    message: '[0,120]的整数',
                    type: 'integer',
                    max: 120,
                    min: 0,
                    transform(value) {
                        if (value) {
                            return Number(value);
                        }
                    }
                }
            ],
            getValueFromEvent: e => {
                let value = Number(e.target.value);
                return !value ? e.target.value : value;
            },
            domType: 'Input'
        },

        {
            key: 'TIMEDOM',
            name: '中心线限制时间描述',
            domType: 'Input'
        }
    ],
    AD_Sub_Lamp: [
        {
            key: 'LAMP_ID',
            name: '用户编号',
            domType: 'Text',
            placeholder: '系统自动生成'
        },
        {
            key: 'LAMP_NO',
            name: '信号灯灯头编号',
            domType: 'Input'
        },
        {
            key: 'LAMP_TYPE',
            name: '信号灯灯头子类型',
            type: 'AD_SUB_LAMP_TYPE',
            domType: 'Select'
        }
    ],
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
            domType: 'Input'
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
            domType: 'Input'
        }
    ]
};