import { TYPE_SELECT_OPTION_MAP } from 'src/config/ADMapDataConfig';

export const FORM_CONFIG = [
    {
        label: '车道线类型',
        name: 'TYPE',
        type: 'RadioIconGroup',
        editable: true,
        layout: {
            labelCol: { span: 24 },
            wrapperCol: { span: 24 }
        },
        option: {
            data: TYPE_SELECT_OPTION_MAP['AD_LANE_DIVIDER_TYPE'],
            label: 'label',
            value: 'value'
        },
        resetField: {
            default: {
                RD_EDGE: 2
            },
            11: {
                RD_EDGE: 1
            },
            13: {
                RD_EDGE: 1
            },
            99: {
                RD_EDGE: 1
            }
        }
    },
    {
        label: '车道类型',
        name: 'LANE_TYPE',
        type: 'RadioIconGroup',
        editable: true,
        layout: {
            labelCol: { span: 24 },
            wrapperCol: { span: 24 }
        },
        option: {
            data: TYPE_SELECT_OPTION_MAP['AD_LANE_DIVIDER_LANE_TYPE'],
            label: 'label',
            value: 'value'
        }
    },
    {
        label: '道路参考线标识',
        name: 'RD_LINE',
        type: 'Select',
        editable: true,
        option: {
            data: TYPE_SELECT_OPTION_MAP['AD_LANE_DIVIDER_RD_LINE'],
            label: 'label',
            value: 'value'
        }
    },
    {
        label: '共用车道线标识',
        name: 'SHARE_LINE',
        type: 'Select',
        editable: true,
        option: {
            data: TYPE_SELECT_OPTION_MAP['AD_LANE_DIVIDER_SHARE_LINE'],
            label: 'label',
            value: 'value'
        }
    },
    {
        label: '道路边界标识',
        name: 'RD_EDGE',
        type: 'Select',
        editable: true,
        option: {
            data: TYPE_SELECT_OPTION_MAP['AD_LANE_DIVIDER_RD_EDGE'],
            label: 'label',
            value: 'value'
        },
        resetField: {
            1: {
                DIRECTION: 0,
                LANE_STATUS: 0,
                LANE_TYPE: 0,
                LANE_NO: 0,
                RD_FORM: 0
            }
        }
    },
    {
        label: '车道通行方向',
        name: 'DIRECTION',
        type: 'Select',
        editable: true,
        option: {
            data: TYPE_SELECT_OPTION_MAP['AD_LANE_DIVIDER_DIRECTION'],
            label: 'label',
            value: 'value'
        }
    },
    {
        label: '车道通行状态',
        name: 'LANE_STATUS',
        type: 'Select',
        editable: true,
        option: {
            data: TYPE_SELECT_OPTION_MAP['AD_LANE_DIVIDER_LANE_STATUS'],
            label: 'label',
            value: 'value'
        }
    },
    {
        label: '车道编号',
        name: 'LANE_NO',
        type: 'InputNumber',
        editable: true,
        rules: {
            required: {
                value: true,
                message: '车道编号必填'
            },
            validator: 'Numeric|range|-99|99'
        },
        option: {
            data: TYPE_SELECT_OPTION_MAP['AD_LANE_DIVIDER_LANE_NO'],
            label: 'label',
            value: 'value'
        },
        resetField: {
            default: {
                DIRECTION: 1,
                LANE_STATUS: 1
            },
            0: {
                DIRECTION: 0,
                LANE_STATUS: 0
            },
            1: {
                RD_LINE: 1,
                DIRECTION: 1,
                LANE_STATUS: 1,
                RD_FORM: 1
            }
        }
    },
    {
        label: '道路形态',
        name: 'RD_FORM',
        type: 'Select',
        editable: true,
        option: {
            data: TYPE_SELECT_OPTION_MAP['AD_LANE_DIVIDER_RD_FORM'],
            label: 'label',
            value: 'value'
        }
    }
];
