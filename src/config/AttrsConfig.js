export const ATTR_SPEC_CONFIG = [
    { source: 'AD_LaneShape', key: 'LANE_ID', relSpec: 'AD_Lane' },
    { source: 'AD_Lane_RS', key: 'LANE_ID', relSpec: 'AD_Lane' },
    { source: 'AD_Lane_Con_RS', key: 'REL_ID', relSpec: 'AD_Lane_Con' },
    { source: 'AD_TS_Content', key: 'SIGN_ID', relSpec: 'AD_TrafficSign' },
    { source: 'AD_Sub_Lamp', key: 'LIGHT_ID', relSpec: 'AD_TrafficLight' }
    //{ source: 'AD_Data_Confidence', key: 'FEAT_ID', relSpec: 'FEAT_TYPE' }
];

export const ATTR_TABLE_CONFIG = {
    AD_TrafficSign: {
        AD_TS_Content: [
            {
                key: 'SIGN_NO',
                name: '标志牌编号',
                domType: 'Text'
            },
            {
                key: 'SIGN_TYPE',
                name: '标志牌类型',
                type: 'AD_TS_CONTENT_SIGN_TYPE',
                domType: 'RadioIconGroup'
            },
            {
                key: 'CONT_VALUE',
                name: '标志牌语义内容',
                validates: [
                    {
                        message: '[0,4]的整数',
                        type: 'integer',
                        max: 4,
                        min: 0,
                        transform(value) {
                            if (value) {
                                return Number(value);
                            }
                        }
                    }
                ],
                domType: 'Input'
            },
            {
                key: 'TIMEDOM',
                name: '中心线限制时间描述',
                domType: 'Input'
            }
        ]
    },
    AD_TrafficLight: {
        AD_Sub_Lamp: [
            {
                key: 'LAMP_NO',
                name: '信号灯灯头编号',
                domType: 'Text'
            },
            {
                key: 'LAMP_TYPE',
                name: '信号灯灯头子类型',
                type: 'AD_SUB_LAMP_TYPE',
                domType: 'Select'
            }
        ]
    }
};
