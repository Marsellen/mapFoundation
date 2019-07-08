const AD_LANE_DIVIDER_ID = '用户编号';
const AD_LANE_DIVIDER_TYPE = '车道线类型';
const AD_LANE_DIVIDER_DIRECTION = '交通流方向';
const AD_LANE_DIVIDER_REF_LINE = '参考线标识';
const AD_LANE_DIVIDER_SHARE_LINE = '共用车道线标识';
const AD_LANE_DIVIDER_RD_STATUS = '通行状态';
const AD_LANE_DIVIDER_LANE_TYPE = '车道类型';
const AD_LANE_DIVIDER_LANE_NO = '车道编号';

const AD_REFERENCELINE_REFLINE_ID = '用户编号';
const AD_REFERENCELINE_TYPE = '参考线类型';
const AD_REFERENCELINE_RD_STATUS = '通行状态';

const AD_LANE_ALANE_ID = '用户编号';
const AD_LANE_REFLINE_ID = '关联参考线ID';
const AD_LANE_L_DIV_ID = '左侧车道线ID';
const AD_LANE_R_DIV_ID = '右侧车道线ID';
const AD_LANE_TYPE = '车道类型';
const AD_LANE_LANE_NO = '车道编号';
const AD_LANE_DIRECTION = '交通流方向';
const AD_LANE_RESTRICT = '限制类型';
const AD_LANE_VALUE = '限制取值';
const AD_LANE_STATUS = '通行状态';
const AD_LANE_OBJECT_ID = '关联停止位置ID';

const AD_STOPLOCATION_OBJECT_ID = '用户编号';
const AD_STOPLOCATION_TYPE = '类型';

const AD_POLYGON_OBJECT_ID = '用户编号';
const AD_POLYGON_TYPE = '面要素类型';

const AD_ARROW_OBJECT_ID = '用户编号';
const AD_ARROW_ARR_DIRECT = '箭头方向';
const AD_ARROW_ALANE_ID = '关联车道号';

const AD_LANEATTRPOINT_ALAP_ID = '用户编号';
const AD_LANEATTRPOINT_TYPE = '属性变化点类型';
const AD_LANEATTRPOINT_REF_LINE = '关联参考线ID';

const AD_TRAFFICSIGN_OBJECT_ID = '用户编号';
const AD_TRAFFICSIGN_TYPE = '标志牌类型';
const AD_TRAFFICSIGN_VALUE = '类型取值';

const AD_TRAFFIC_LIGHT_OBJECT_ID = '用户编号';
const AD_TRAFFIC_LIGHT_TYPE = '交通灯类型';
const AD_TRAFFIC_LIGHT_REFLINE_ID = '用户编号';

class modelFactory {
    getTabelData = (type, properties) => {
        return this[type](properties);
    };

    LaneDivider = properties => {
        return [
            {
                key: 'ALDIV_ID',
                name: AD_LANE_DIVIDER_ID,
                value: properties.ALDIV_ID,
                type: 'AD_LANE_DIVIDER_ID',
                domType: 'Text'
            },
            {
                key: 'TYPE',
                name: AD_LANE_DIVIDER_TYPE,
                value: properties.TYPE,
                type: 'AD_LANE_DIVIDER_TYPE',
                domType: 'RadioIconGroup'
            },
            {
                key: 'LANE_TYPE',
                name: AD_LANE_DIVIDER_LANE_TYPE,
                value: properties.LANE_TYPE,
                type: 'AD_LANE_DIVIDER_LANE_TYPE',
                domType: 'RadioIconGroup'
            },
            {
                key: 'REF_LINE',
                name: AD_LANE_DIVIDER_REF_LINE,
                value: properties.REF_LINE,
                type: 'AD_LANE_DIVIDER_REF_LINE',
                domType: 'Select'
            },
            {
                key: 'SHARE_LINE',
                name: AD_LANE_DIVIDER_SHARE_LINE,
                value: properties.SHARE_LINE,
                type: 'AD_LANE_DIVIDER_SHARE_LINE',
                domType: 'Select'
            },
            {
                key: 'DIRECTION',
                name: AD_LANE_DIVIDER_DIRECTION,
                value: properties.DIRECTION,
                type: 'AD_LANE_DIVIDER_DIRECTION',
                domType: 'Select'
            },
            {
                key: 'RD_STATUS',
                name: AD_LANE_DIVIDER_RD_STATUS,
                value: properties.RD_STATUS,
                type: 'AD_LANE_DIVIDER_RD_STATUS',
                domType: 'Select'
            },
            {
                key: 'LANE_NO',
                name: AD_LANE_DIVIDER_LANE_NO,
                value: properties.LANE_NO,
                type: 'AD_LANE_DIVIDER_LANE_NO',
                domType: 'Text'
            }
        ];
    };

    ReferenceLine = properties => {
        return [
            {
                key: 'REFLINE_ID',
                name: AD_REFERENCELINE_REFLINE_ID,
                value: properties.REFLINE_ID,
                type: 'AD_REFERENCELINE_REFLINE_ID',
                domType: 'Text'
            },
            {
                key: 'TYPE',
                name: AD_REFERENCELINE_TYPE,
                value: properties.TYPE,
                type: 'AD_REFERENCELINE_TYPE',
                domType: 'Select'
            },
            {
                key: 'RD_STATUS',
                name: AD_REFERENCELINE_RD_STATUS,
                value: properties.RD_STATUS,
                type: 'AD_REFERENCELINE_RD_STATUS',
                domType: 'Select'
            }
        ];
    };

    Lane = properties => {
        return [
            {
                key: 'ALANE_ID',
                name: AD_LANE_ALANE_ID,
                value: properties.ALANE_ID,
                type: 'AD_LANE_ALANE_ID',
                domType: 'Text'
            },
            {
                key: 'REFLINE_ID',
                name: AD_LANE_REFLINE_ID,
                value: properties.REFLINE_ID,
                type: 'AD_LANE_REFLINE_ID',
                domType: 'Text'
            },
            {
                key: 'L_DIV_ID',
                name: AD_LANE_L_DIV_ID,
                value: properties.L_DIV_ID,
                type: 'AD_LANE_L_DIV_ID',
                domType: 'Text'
            },
            {
                key: 'R_DIV_ID',
                name: AD_LANE_R_DIV_ID,
                value: properties.R_DIV_ID,
                type: 'AD_LANE_R_DIV_ID',
                domType: 'Text'
            },
            {
                key: 'TYPE',
                name: AD_LANE_TYPE,
                value: properties.TYPE,
                type: 'AD_LANE_TYPE',
                domType: 'Select'
            },
            {
                key: 'LANE_NO',
                name: AD_LANE_LANE_NO,
                value: properties.LANE_NO,
                type: 'AD_LANE_LANE_NO',
                domType: 'Text'
            },
            {
                key: 'DIRECTION',
                name: AD_LANE_DIRECTION,
                value: properties.DIRECTION,
                type: 'AD_LANE_DIRECTION',
                domType: 'Select'
            },
            {
                key: 'RESTRICT',
                name: AD_LANE_RESTRICT,
                value: properties.RESTRICT,
                type: 'AD_LANE_RESTRICT',
                domType: 'Select'
            },
            {
                key: 'VALUE',
                name: AD_LANE_VALUE,
                value: properties.VALUE,
                type: 'AD_LANE_VALUE',
                domType: 'Input'
            },
            {
                key: 'STATUS',
                name: AD_LANE_STATUS,
                value: properties.STATUS,
                type: 'AD_LANE_STATUS',
                domType: 'Select'
            },
            {
                key: 'OBJECT_ID',
                name: AD_LANE_OBJECT_ID,
                value: properties.OBJECT_ID,
                type: 'AD_LANE_OBJECT_ID',
                domType: 'Text'
            }
        ];
    };

    StopLocation = properties => {
        return [
            {
                key: 'OBJECT_ID',
                name: AD_STOPLOCATION_OBJECT_ID,
                value: properties.OBJECT_ID,
                type: 'AD_STOPLOCATION_OBJECT_ID',
                domType: 'Text'
            },
            {
                key: 'TYPE',
                name: AD_STOPLOCATION_TYPE,
                value: properties.TYPE,
                type: 'AD_STOPLOCATION_TYPE',
                domType: 'Select'
            }
        ];
    };

    Polygon = properties => {
        return [
            {
                key: 'OBJECT_ID',
                name: AD_POLYGON_OBJECT_ID,
                value: properties.OBJECT_ID,
                type: 'AD_POLYGON_OBJECT_ID',
                domType: 'Text'
            },
            {
                key: 'TYPE',
                name: AD_POLYGON_TYPE,
                value: properties.TYPE,
                type: 'AD_POLYGON_TYPE',
                domType: 'RadioIconGroup'
            }
        ];
    };

    Arrow = properties => {
        return [
            {
                key: 'OBJECT_ID',
                name: AD_ARROW_OBJECT_ID,
                value: properties.OBJECT_ID,
                type: 'AD_ARROW_OBJECT_ID',
                domType: 'Text'
            },
            {
                key: 'ARR_DIRECT',
                name: AD_ARROW_ARR_DIRECT,
                value: properties.ARR_DIRECT,
                type: 'AD_ARROW_ARR_DIRECT',
                domType: 'RadioIconGroup'
            },
            {
                key: 'ALANE_ID',
                name: AD_ARROW_ALANE_ID,
                value: properties.ALANE_ID,
                type: 'AD_ARROW_ALANE_ID',
                domType: 'Text'
            }
        ];
    };

    LaneAttrPoint = properties => {
        return [
            {
                key: 'ALAP_ID',
                name: AD_LANEATTRPOINT_ALAP_ID,
                value: properties.ALAP_ID,
                type: 'AD_LANEATTRPOINT_ALAP_ID',
                domType: 'Text'
            },
            {
                key: 'TYPE',
                name: AD_LANEATTRPOINT_TYPE,
                value: properties.TYPE,
                type: 'AD_LANEATTRPOINT_TYPE',
                domType: 'Select'
            },
            {
                key: 'REF_LINE',
                name: AD_LANEATTRPOINT_REF_LINE,
                value: properties.REF_LINE,
                type: 'AD_LANEATTRPOINT_REF_LINE',
                domType: 'Text'
            }
        ];
    };

    TrafficSign = properties => {
        return [
            {
                key: 'OBJECT_ID',
                name: AD_TRAFFICSIGN_OBJECT_ID,
                value: properties.OBJECT_ID,
                type: 'AD_TRAFFICSIGN_OBJECT_ID',
                domType: 'Text'
            },
            {
                key: 'TYPE',
                name: AD_TRAFFICSIGN_TYPE,
                value: properties.TYPE,
                type: 'AD_TRAFFICSIGN_TYPE',
                domType: 'RadioIconGroup'
            },
            {
                key: 'VALUE',
                name: AD_TRAFFICSIGN_VALUE,
                value: properties.VALUE,
                type: 'AD_TRAFFICSIGN_VALUE',
                domType: 'Input'
            }
        ];
    };

    TrafficLight = properties => {
        return [
            {
                key: 'OBJECT_ID',
                name: AD_TRAFFIC_LIGHT_OBJECT_ID,
                value: properties.OBJECT_ID,
                type: 'AD_TRAFFIC_LIGHT_OBJECT_ID',
                domType: 'Text'
            },
            {
                key: 'TYPE',
                name: AD_TRAFFIC_LIGHT_TYPE,
                value: properties.TYPE,
                type: 'AD_TRAFFIC_LIGHT_TYPE',
                domType: 'RadioIconGroup'
            },
            {
                key: 'REFLINE_ID',
                name: AD_TRAFFIC_LIGHT_REFLINE_ID,
                value: properties.REFLINE_ID,
                type: 'AD_TRAFFIC_LIGHT_REFLINE_ID',
                domType: 'Input'
            }
        ];
    };
}

export default new modelFactory();
