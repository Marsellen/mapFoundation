//文字注记默认配置
export default {
    AD_Pole_Geo: {
        type: 'Line',
        textFields: ['OBJ_ID'],
        order: 23,
        showStyles: ['textStyle']
    },
    AD_TrafficLight_Geo: {
        type: 'Polygon',
        textFields: ['FEAT_TYPE'],
        order: 22,
        showStyles: ['textStyle']
    },
    AD_TrafficSign_Geo: {
        type: 'Polygon',
        textFields: ['FEAT_TYPE'],
        order: 21,
        showStyles: ['textStyle']
    },
    AD_LaneMark_Geo: {
        type: 'Polygon',
        textFields: ['FEAT_TYPE'],
        order: 20,
        showStyles: ['textStyle']
    },
    AD_Arrow_Geo: {
        type: 'Polygon',
        textFields: ['FEAT_TYPE'],
        order: 19,
        showStyles: ['textStyle']
    },
    AD_StopLocation_Geo: {
        type: 'Polygon',
        textFields: ['FEAT_TYPE'],
        order: 18,
        showStyles: ['textStyle']
    },
    AD_LaneDivider_Plg: {
        type: 'Polygon',
        textFields: ['FEAT_TYPE'],
        order: 17,
        showStyles: ['textStyle']
    },
    AD_LaneDivider_Pln: {
        type: 'Line',
        textFields: ['FEAT_TYPE'],
        order: 16,
        showStyles: ['textStyle']
    },
    AD_Road: {
        type: 'Line',
        //文字注记配置按什么类别展示，当前支持一个
        textFields: ['TYPE', 'RD_STATUS', 'CROSSING', 'DIRECTION'],
        order: 15,
        //要展示的样式，['vectorStyle','textStyle','pointFLStyle','arrowStyle']
        showStyles: ['textStyle']
    },
    AD_LaneDivider: {
        type: 'Line',
        textFields: ['TYPE', 'LANE_TYPE', 'SHARE_LINE', 'DIRECTION', 'LANESTATUS', 'LANE_NO'],
        order: 14,
        showStyles: ['textStyle']
    },
    AD_Lane: {
        type: 'Line',
        textFields: ['TYPE', 'LANE_NO', 'DIRECTION', 'STATUS'],
        order: 13,
        showStyles: ['textStyle']
    },
    AD_LaneAttrPoint: {
        type: 'Point',
        textFields: ['TYPE'],
        order: 11,
        showStyles: ['textStyle']
    },
    AD_Arrow: {
        type: 'Polygon',
        textFields: ['ARR_DIRECT'],
        order: 10,
        showStyles: ['textStyle']
    },
    AD_StopLocation: {
        type: 'Line',
        textFields: ['TYPE'],
        order: 9,
        showStyles: ['textStyle']
    },
    AD_LaneMark_Plg: {
        type: 'Polygon',
        textFields: ['TYPE'],
        order: 8,
        showStyles: ['textStyle']
    },
    AD_Text: {
        type: 'Polygon',
        textFields: ['CONT_TYPE'],
        order: 7,
        showStyles: ['textStyle']
    },
    AD_TrafficSign: {
        type: 'Polygon',
        textFields: ['SIGN_STYLE'],
        order: 6,
        showStyles: ['textStyle']
    },
    AD_TrafficLight: {
        type: 'Polygon',
        textFields: ['TYPE'],
        order: 5,
        showStyles: ['textStyle']
    },
    AD_RS_Barrier: {
        type: 'Line',
        textFields: ['TYPE', 'MATERIAL'],
        order: 3,
        showStyles: ['textStyle']
    }
};
