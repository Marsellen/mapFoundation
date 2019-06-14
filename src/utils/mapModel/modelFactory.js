const AD_LANE_DIVIDER_ID = '用户编号';
const AD_LANE_DIVIDER_TYPE = '车道线类型';
const AD_LANE_DIVIDER_DIRECTION = '车道交通流方向';
const AD_LANE_DIVIDER_REF_LINE = '参考线标识';
const AD_LANE_DIVIDER_SHARE_LINE = '共用车道线标识';
const AD_LANE_DIVIDER_RD_STATUS = '道路通行状态';
const AD_LANE_DIVIDER_LANE_TYPE = '车道类型';
const AD_LANE_DIVIDER_LANE_NO = '车道编号';

const AD_REFERENCELINE_REFLINE_ID = '用户编号';
const AD_REFERENCELINE_TYPE = '参考线类型';
const AD_REFERENCELINE_RD_STATUS = '道路通行状态';

const AD_LANE_ALANE_ID = '用户编号';
const AD_LANE_REFLINE_ID = '关联对应参考线ID';
const AD_LANE_L_DIV_ID = '关联车道左侧车道线ID';
const AD_LANE_R_DIV_ID = '关联车道右侧车道线ID';
const AD_LANE_TYPE = '车道类型';
const AD_LANE_LANE_NO = '车道编号';
const AD_LANE_DIRECTION = '车道交通流方向';
const AD_LANE_RESTRICT = '车道限制类型';
const AD_LANE_VALUE = '车道限制取值';
const AD_LANE_STATUS = '车道通行状态';
const AD_LANE_OBJECT_ID = '关联停止位置ID';

const AD_STOPLOCATION_OBJECT_ID = '用户编号';
const AD_STOPLOCATION_TYPE = '类型';

const AD_POLYGON_OBJECT_ID = '用户编号';
const AD_POLYGON_TYPE = '面要素类型';

const AD_ARROW_OBJECT_ID = '用户编号';
const AD_ARROW_ARR_DIRECT = '箭头方向';
const AD_ARROW_ALANE_ID = '关联车道号';

class ADLaneDivider {
    constructor(option) {
        this.ALDIV_ID = option.ALDIV_ID;
        this.TYPE = option.TYPE;
        this.DIRECTION = option.DIRECTION;
        this.REF_LINE = option.REF_LINE;
        this.SHARE_LINE = option.SHARE_LINE;
        this.RD_STATUS = option.RD_STATUS;
        this.LANE_TYPE = option.LANE_TYPE;
        this.LANE_NO = option.LANE_NO;
    }

    tableData = () => {
        return [
            {
                key: 'ALDIV_ID',
                name: AD_LANE_DIVIDER_ID,
                value: this.ALDIV_ID,
                type: 'AD_LANE_DIVIDER_ID',
                domType: 'Text'
            },
            {
                key: 'TYPE',
                name: AD_LANE_DIVIDER_TYPE,
                value: this.TYPE,
                type: 'AD_LANE_DIVIDER_TYPE',
                domType: 'Select'
            },
            {
                key: 'DIRECTION',
                name: AD_LANE_DIVIDER_DIRECTION,
                value: this.DIRECTION,
                type: 'AD_LANE_DIVIDER_DIRECTION',
                domType: 'Select'
            },
            {
                key: 'REF_LINE',
                name: AD_LANE_DIVIDER_REF_LINE,
                value: this.REF_LINE,
                type: 'AD_LANE_DIVIDER_REF_LINE',
                domType: 'Select'
            },
            {
                key: 'SHARE_LINE',
                name: AD_LANE_DIVIDER_SHARE_LINE,
                value: this.SHARE_LINE,
                type: 'AD_LANE_DIVIDER_SHARE_LINE',
                domType: 'Select'
            },
            {
                key: 'RD_STATUS',
                name: AD_LANE_DIVIDER_RD_STATUS,
                value: this.RD_STATUS,
                type: 'AD_LANE_DIVIDER_RD_STATUS',
                domType: 'Select'
            },
            {
                key: 'LANE_TYPE',
                name: AD_LANE_DIVIDER_LANE_TYPE,
                value: this.LANE_TYPE,
                type: 'AD_LANE_DIVIDER_LANE_TYPE',
                domType: 'Select'
            },
            {
                key: 'LANE_NO',
                name: AD_LANE_DIVIDER_LANE_NO,
                value: this.LANE_NO,
                type: 'AD_LANE_DIVIDER_LANE_NO',
                domType: 'Text'
            }
        ];
    };
}

class ADReferenceLine {
    constructor(option) {
        this.REFLINE_ID = option.REFLINE_ID;
        this.TYPE = option.TYPE;
        this.RD_STATUS = option.RD_STATUS;
    }

    tableData = () => {
        return [
            {
                key: 'REFLINE_ID',
                name: AD_REFERENCELINE_REFLINE_ID,
                value: this.REFLINE_ID,
                type: 'AD_REFERENCELINE_REFLINE_ID',
                domType: 'Text'
            },
            {
                key: 'TYPE',
                name: AD_REFERENCELINE_TYPE,
                value: this.TYPE,
                type: 'AD_REFERENCELINE_TYPE',
                domType: 'Select'
            },
            {
                key: 'RD_STATUS',
                name: AD_REFERENCELINE_RD_STATUS,
                value: this.RD_STATUS,
                type: 'AD_REFERENCELINE_RD_STATUS',
                domType: 'Select'
            }
        ];
    };
}

class ADLane {
    constructor(option) {
        this.ALANE_ID = option.ALANE_ID;
        this.REFLINE_ID = option.REFLINE_ID;
        this.L_DIV_ID = option.L_DIV_ID;
        this.R_DIV_ID = option.R_DIV_ID;
        this.TYPE = option.TYPE;
        this.DIRECTION = option.DIRECTION;
        this.VALUE = option.VALUE;
        this.STATUS = option.STATUS;
        this.OBJECT_ID = option.OBJECT_ID;
    }

    tableData = () => {
        return [
            {
                key: 'ALANE_ID',
                name: AD_LANE_ALANE_ID,
                value: this.ALANE_ID,
                type: 'AD_LANE_ALANE_ID',
                domType: 'Text'
            },
            {
                key: 'REFLINE_ID',
                name: AD_LANE_REFLINE_ID,
                value: this.REFLINE_ID,
                type: 'AD_LANE_REFLINE_ID',
                domType: 'Text'
            },
            {
                key: 'L_DIV_ID',
                name: AD_LANE_L_DIV_ID,
                value: this.L_DIV_ID,
                type: 'AD_LANE_L_DIV_ID',
                domType: 'Text'
            },
            {
                key: 'R_DIV_ID',
                name: AD_LANE_R_DIV_ID,
                value: this.R_DIV_ID,
                type: 'AD_LANE_R_DIV_ID',
                domType: 'Text'
            },
            {
                key: 'TYPE',
                name: AD_LANE_TYPE,
                value: this.TYPE,
                type: 'AD_LANE_TYPE',
                domType: 'Select'
            },
            {
                key: 'LANE_NO',
                name: AD_LANE_LANE_NO,
                value: this.LANE_NO,
                type: 'AD_LANE_LANE_NO',
                domType: 'Text'
            },
            {
                key: 'DIRECTION',
                name: AD_LANE_DIRECTION,
                value: this.DIRECTION,
                type: 'AD_LANE_DIRECTION',
                domType: 'Select'
            },
            {
                key: 'RESTRICT',
                name: AD_LANE_RESTRICT,
                value: this.RESTRICT,
                type: 'AD_LANE_RESTRICT',
                domType: 'Select'
            },
            {
                key: 'VALUE',
                name: AD_LANE_VALUE,
                value: this.VALUE,
                type: 'AD_LANE_VALUE',
                domType: 'Input'
            },
            {
                key: 'STATUS',
                name: AD_LANE_STATUS,
                value: this.STATUS,
                type: 'AD_LANE_STATUS',
                domType: 'Select'
            },
            {
                key: 'OBJECT_ID',
                name: AD_LANE_OBJECT_ID,
                value: this.OBJECT_ID,
                type: 'AD_LANE_OBJECT_ID',
                domType: 'Text'
            }
        ];
    };
}

class ADStopLocation {
    constructor(option) {
        this.OBJECT_ID = option.OBJECT_ID;
        this.TYPE = option.TYPE;
    }

    tableData = () => {
        return [
            {
                key: 'OBJECT_ID',
                name: AD_STOPLOCATION_OBJECT_ID,
                value: this.OBJECT_ID,
                type: 'AD_STOPLOCATION_OBJECT_ID',
                domType: 'Text'
            },
            {
                key: 'TYPE',
                name: AD_STOPLOCATION_TYPE,
                value: this.TYPE,
                type: 'AD_STOPLOCATION_TYPE',
                domType: 'Select'
            }
        ];
    };
}

class ADPolygon {
    constructor(option) {
        this.OBJECT_ID = option.OBJECT_ID;
        this.TYPE = option.TYPE;
    }

    tableData = () => {
        return [
            {
                key: 'OBJECT_ID',
                name: AD_POLYGON_OBJECT_ID,
                value: this.OBJECT_ID,
                type: 'AD_POLYGON_OBJECT_ID',
                domType: 'Text'
            },
            {
                key: 'TYPE',
                name: AD_POLYGON_TYPE,
                value: this.TYPE,
                type: 'AD_POLYGON_TYPE',
                domType: 'Select'
            }
        ];
    };
}

class ADArrow {
    constructor(option) {
        this.OBJECT_ID = option.OBJECT_ID;
        this.ARR_DIRECT = option.ARR_DIRECT;
        this.ALANE_ID = option.ALANE_ID;
    }

    tableData = () => {
        return [
            {
                key: 'OBJECT_ID',
                name: AD_ARROW_OBJECT_ID,
                value: this.OBJECT_ID,
                type: 'AD_ARROW_OBJECT_ID',
                domType: 'Text'
            },
            {
                key: 'ARR_DIRECT',
                name: AD_ARROW_ARR_DIRECT,
                value: this.ARR_DIRECT,
                type: 'AD_ARROW_ARR_DIRECT',
                domType: 'Input'
            },
            {
                key: 'ALANE_ID',
                name: AD_ARROW_ALANE_ID,
                value: this.ALANE_ID,
                type: 'AD_ARROW_ALANE_ID',
                domType: 'Text'
            }
        ];
    };
}

function modelFactory(type, option) {
    let model = eval(type);
    return new model(option);
}

export default modelFactory;
