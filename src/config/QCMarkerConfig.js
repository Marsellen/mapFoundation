import { TYPE_SELECT_OPTION_MAP } from 'src/config/ADMapDataConfig';
import ChooseErrorFeature from 'src/pages/Index/components/ToolList/ChooseErrorFeature';

const { AD_MAP_QC_FILE_NAME } = TYPE_SELECT_OPTION_MAP;

const ERROR_TYPE = [
    { value: 0, label: '未定义' },
    { value: 1, label: '几何形状错误' },
    { value: 2, label: '拓扑连接错误' },
    { value: 3, label: '属性错误' },
    { value: 4, label: '打断位置错误' },
    { value: 5, label: '多做' },
    { value: 6, label: '制作遗漏' },
    { value: 7, label: '其他' }
];

const FIX_STATUS_OPTIONS = [
    { value: 1, label: '待修正' }, //默认
    { value: 2, label: '无需修正' },
    { value: 3, label: '已修正' }
];

const QC_STATUS_OPTIONS = [
    { value: 1, label: '待修正' }, //默认
    { value: 2, label: '无需修正' },
    { value: 3, label: '已修正' }
];

const FIELD_NAME_MAP = {
    AD_Road: [
        { value: 'TYPE', label: '道路参考线类型' },
        { value: 'RD_CLASS', label: '道路等级' },
        { value: 'CROSSING', label: '交叉口标识' },
        { value: 'RD_STATUS', label: '道路通行状态' },
        { value: 'RD_FORM', label: '道路形态' },
        { value: 'DIRECTION', label: '道路通行方向' },
        { value: 'LENGTH', label: '道路长度' },
        { value: 'MAX_SPEED', label: '道路最高行驶速度' },
        { value: 'CONNECTION', label: '道路参考线连通关系' },
        { value: 'RS_TYPE', label: '参考线连接关系限制类型' },
        { value: 'TIMEDOM', label: '参考线连接关系限制时间' }
    ],
    AD_LaneDivider: [
        { value: 'TYPE', label: '车道线类型' },
        { value: 'RD_LINE', label: '道路参考线标识' },
        { value: 'SHARE_LINE', label: '共用车道线标识' },
        { value: 'RD_EDGE', label: '道路边界标识' },
        { value: 'DIRECTION', label: '车道通行方向' },
        { value: 'LANESTATUS', label: '车道通行状态' },
        { value: 'LANE_TYPE', label: '车道类型' },
        { value: 'LANE_NO', label: '车道编号' },
        { value: 'RD_FORM', label: '道路形态' }
    ],
    AD_Lane: [
        { value: 'ROAD_ID', label: '关联道路参考线' },
        { value: 'L_LDIV_ID', label: '左侧车道线' },
        { value: 'R_LDIV_ID', label: '右侧车道线' },
        { value: 'TYPE', label: '车道类型' },
        { value: 'LANE_NO', label: '车道编号' },
        { value: 'DIRECTION', label: '车道通行方向' },
        { value: 'STATUS', label: '车道通行状态' },
        { value: 'MAX_SPEED', label: '车道最高行驶速度' },
        { value: 'MAX_SP_TYP', label: '车道最高行驶速度来源' },
        { value: 'MIN_SPEED', label: '车道最低行驶速度' },
        { value: 'MIN_SP_TYP', label: '车道最低行驶速度来源' },
        { value: 'CONNECTION', label: '车道中心线连接关系' },
        { value: 'RS_TYPE', label: '车道中心线限制类型' },
        { value: 'RS_VALUE', label: '车道中心线限制取值' },
        { value: 'TIMEDOM', label: '车道中心线限制时间描述' },
        { value: 'CON_RS_TYPE', label: '车道中心线连接关系限制类型' },
        { value: 'CON_TIMEDOM', label: '车道中心线连接关系限制时间描述' }
    ],
    AD_LaneAttrPoint: [
        { value: 'TYPE', label: '属性变化点类型' },
        { value: 'ROAD_ID', label: '属性变化点关联关系' }
    ],
    AD_Arrow: [
        { value: 'ARR_DIRECT', lable: '箭头方向' },
        { value: 'LANE_ID', lable: '箭头关联关系' }
    ],
    AD_StopLocation: [
        { value: 'TYPE', label: '停止位置类型' },
        { value: 'LANE_ID', label: '停止位置关联关系' }
    ],
    AD_LaneMark_Plg: [
        { value: 'TYPE', label: '面状标识物类型' },
        { value: 'LANE_ID', label: '面状标识物关联关系' }
    ],
    AD_Text: [
        { value: 'TYPE', label: '文字类型' },
        { value: 'VALUE', label: '文字内容' },
        { value: 'LANE_ID', label: '文字关联关系' }
    ],
    AD_TrafficSign: [
        { value: 'SIGN_STYLE', label: '交通牌样式' },
        { value: 'SIGN_NO', label: '交通牌编号' },
        { value: 'SIGN_TYPE', label: '交通牌类型' },
        { value: 'CONT_TYPE', label: '交通牌语义类型' },
        { value: 'CONT_VALUE', label: '交通牌语义内容' },
        { value: 'TIMEDOM', label: '交通牌限制时间' },
        { value: 'LANE_ID', label: '交通牌关联关系' }
    ],
    AD_TrafficLight: [
        { value: 'TYPE', label: '交通灯类型' },
        { value: 'LAYOUT', label: '交通灯灯头布局' },
        { value: 'LAMP_COUNT', label: '交通灯灯头数量' },
        { value: 'LAMP_NO', label: '交通灯灯头编号' },
        { value: 'LAMP_TYPE', label: '交通灯灯头子类型' },
        { value: 'LANE_ID', label: '交通灯关联关系' }
    ],
    AD_Pole: [],
    AD_RS_Barrier: [
        { value: 'TYPE', label: '隔离带护栏类型' },
        { value: 'MATERIAL', label: '隔离带护栏材质' }
    ]
};

export const ATTR_FORM_FIELD_MAP = {
    fixStatus: {
        label: '作业查看状态',
        name: 'fixStatus',
        type: 'Select',
        initialValue: 1,
        editable: false,
        rules: {
            required: {
                value: true,
                message: '作业查看状态必填'
            }
        },
        option: {
            data: FIX_STATUS_OPTIONS,
            label: 'label',
            value: 'value'
        }
    },
    qcStatus: {
        label: '质检查看状态',
        name: 'qcStatus',
        type: 'Select',
        initialValue: 1,
        editable: true,
        className: 'bottom-border',
        rules: {
            required: {
                value: true,
                message: '质检查看状态必填'
            }
        },
        option: {
            data: QC_STATUS_OPTIONS,
            label: 'label',
            value: 'value'
        }
    },
    fileName: {
        label: '图层',
        name: 'fileName',
        type: 'Select',
        initialValue: null,
        editable: false,
        tool: ChooseErrorFeature,
        rules: {
            required: {
                value: true,
                message: '质检查看状态必填'
            }
        },
        option: {
            data: AD_MAP_QC_FILE_NAME,
            label: 'label',
            value: 'value'
        },
        resetField: {
            featId: null,
            errorType: 0,
            errorDesc: null,
            fieldName: null
        },
        layout: {
            labelCol: {
                xs: { span: 8 },
                sm: { span: 8 }
            },
            wrapperCol: {
                xs: { span: 13 },
                sm: { span: 13 }
            }
        }
    },
    featId: {
        label: '要素ID',
        name: 'featId',
        type: 'InputNumber',
        initialValue: null,
        editable: false
    },
    errorType: {
        label: '错误类型',
        name: 'errorType',
        type: 'Select',
        initialValue: 0,
        editable: false,
        editableByField: {
            fieldName: 'fileName'
            // fieldValue: 'AD_Lane'
        },
        rules: {
            required: {
                value: true,
                message: '错误类型必填'
            }
        },
        option: {
            data: ERROR_TYPE,
            label: 'label',
            value: 'value'
        },
        resetField: {
            fieldName: null
        }
    },
    fieldName: {
        label: '字段名称',
        name: 'fieldName',
        type: 'Select',
        editable: false,
        editableByField: {
            fieldName: 'errorType',
            fieldValue: 3
        },
        rules: {
            required: {
                fieldName: 'errorType',
                fieldValue: 3,
                message: '字段名称必填'
            }
        },
        option: {
            data: FIELD_NAME_MAP,
            fieldName: 'fileName',
            label: 'label',
            value: 'value'
        }
    },
    errorDesc: {
        label: '错误描述',
        name: 'errorDesc',
        type: 'TextArea',
        initialValue: null,
        editable: false
    },
    editDesc: {
        label: '作业说明',
        name: 'editDesc',
        type: 'TextArea',
        initialValue: null,
        editable: false
    }
};

export const QC_MARKER_FORM_CONFIG = {
    //质检员创建标注的表单配置
    QC_CREATE_CONFIG: [
        { name: 'fileName', editable: true },
        { name: 'featId', editable: true },
        { name: 'errorType', editable: true },
        { name: 'fieldName', editable: true },
        { name: 'errorDesc', editable: true }
    ],
    //质检员首次查看的表单配置
    QC_FIRST_VISITE_CONFIG: [
        { name: 'fixStatus', editable: false },
        { name: 'qcStatus', editable: false },
        { name: 'fileName', editable: false },
        { name: 'featId', editable: false },
        { name: 'errorType', editable: false },
        { name: 'fieldName', editable: false },
        { name: 'errorDesc', editable: false },
        { name: 'editDesc', editable: false }
    ],
    //质检员非首次查看的表单配置
    QC_NOT_FIRST_VISITE_CONFIG: [
        { name: 'fixStatus', editable: false },
        { name: 'qcStatus', editable: true },
        { name: 'fileName', editable: false },
        { name: 'featId', editable: false },
        { name: 'errorType', editable: false },
        { name: 'fieldName', editable: false },
        { name: 'errorDesc', editable: false },
        { name: 'editDesc', editable: false }
    ],
    //质检员首次修改标注的表单配置
    QC_FIRST_MOD_CONFIG: [
        { name: 'fixStatus', editable: false },
        { name: 'qcStatus', editable: false },
        { name: 'fileName', editable: true },
        { name: 'featId', editable: true },
        { name: 'errorType', editable: true },
        { name: 'fieldName', editable: true },
        { name: 'errorDesc', editable: true },
        { name: 'editDesc', editable: false }
    ],
    //质检员非首次修改标注的表单配置
    QC_NOT_FIRST_MOD_CONFIG: [
        { name: 'fixStatus', editable: false },
        { name: 'qcStatus', editable: true },
        { name: 'fileName', editable: false },
        { name: 'featId', editable: false },
        { name: 'errorType', editable: false },
        { name: 'fieldName', editable: false },
        { name: 'errorDesc', editable: true },
        { name: 'editDesc', editable: false }
    ],
    //作业员查看标注的表单配置
    FIX_VISITE_CONFIG: [
        {
            name: 'fixStatus',
            editable: true,
            editableByField: {
                fieldName: 'qcStatus',
                fieldValue: 1
            }
        },
        { name: 'qcStatus', editable: false },
        { name: 'fileName', editable: false },
        { name: 'featId', editable: false },
        { name: 'errorType', editable: false },
        { name: 'fieldName', editable: false },
        { name: 'errorDesc', editable: false },
        { name: 'editDesc', editable: false }
    ],
    //作业员修改标注的表单配置
    FIX_MOD_CONFIG: [
        {
            name: 'fixStatus',
            editable: true,
            editableByField: {
                fieldName: 'qcStatus',
                fieldValue: 1
            }
        },
        { name: 'qcStatus', editable: false },
        { name: 'fileName', editable: false },
        { name: 'featId', editable: false },
        { name: 'errorType', editable: false },
        { name: 'fieldName', editable: false },
        { name: 'errorDesc', editable: false },
        { name: 'editDesc', editable: true }
    ],
    //默认配置，只能查看，不能修改
    QC_ONLEY_READ_CONFIG: [
        { name: 'fixStatus', editable: false },
        { name: 'qcStatus', editable: false },
        { name: 'fileName', editable: false },
        { name: 'featId', editable: false },
        { name: 'errorType', editable: false },
        { name: 'fieldName', editable: false },
        { name: 'errorDesc', editable: false },
        { name: 'editDesc', editable: false }
    ]
};

export const MARKER_TABLE_COLUMNS = [
    {
        title: '序号',
        dataIndex: 'index',
        key: 'index',
        width: 50
    },
    {
        title: '错误类型',
        dataIndex: 'errorType',
        key: 'errorType',
        isFilter: true,
        describe: {
            data: ERROR_TYPE,
            label: 'label',
            value: 'value'
        },
        width: 130
    },
    {
        title: '字段名称',
        dataIndex: 'fieldName',
        key: 'fieldName',
        width: 100,
        describe: {
            data: FIELD_NAME_MAP,
            second: 'fileName',
            label: 'label',
            value: 'value'
        }
    },
    {
        title: '错误描述',
        dataIndex: 'errorDesc',
        key: 'errorDesc',
        width: 100
    },
    {
        title: '作业说明',
        dataIndex: 'editDesc',
        key: 'editDesc',
        width: 100
    },
    {
        title: '图层',
        dataIndex: 'fileName',
        key: 'fileName',
        isFilter: true,
        width: 160,
        describe: {
            data: AD_MAP_QC_FILE_NAME,
            label: 'label',
            value: 'value'
        }
    },
    {
        title: '要素ID',
        dataIndex: 'featId',
        key: 'featId',
        width: 80
    },
    {
        title: '作业查看状态',
        dataIndex: 'fixStatus',
        key: 'fixStatus',
        isFilter: true,
        width: 120,
        describe: {
            data: FIX_STATUS_OPTIONS,
            label: 'label',
            value: 'value'
        },
        style: {
            styleByValue: 1,
            styleName: 'red-text'
        }
    },
    {
        title: '质检查看状态',
        dataIndex: 'qcStatus',
        key: 'qcStatus',
        isFilter: true,
        width: 120,
        describe: {
            data: QC_STATUS_OPTIONS,
            label: 'label',
            value: 'value'
        },
        style: {
            styleByValue: 1,
            styleName: 'red-text'
        }
    }
];
