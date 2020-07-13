import { TYPE_SELECT_OPTION_MAP, TABLE_DATA_MAP } from 'src/config/ADMapDataConfig';
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
        type: 'Input',
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
            data: TABLE_DATA_MAP,
            fieldName: 'fileName',
            label: 'name',
            value: 'key'
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
            data: TABLE_DATA_MAP,
            second: 'fileName',
            label: 'name',
            value: 'key'
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
