import ChooseErrorFeature from 'src/component/home/toolList/chooseErrorFeature';
import SettingStore from 'src/store/setting/settingStore';

export const MARKER_FIELD_CONFIG = () => {
    const {
        ERROR_DESC_MAP,
        ERROR_DESC_RESET_FIELD_MAP,
        FILE_NAME_OPTIONS,
        ERROR_TYPE_OPTIONS,
        FIX_STATUS_OPTIONS,
        QC_STATUS_OPTIONS,
        FIELD_NAME_MAP,
        ERROR_CONTENT_OPTIONS,
        ERROR_LEVEL_OPTIONS
    } = SettingStore.getConfig('MARKER_OPTION_CONFIG');

    return {
        fixStatus: {
            label: '作业查看状态',
            name: 'fixStatus',
            type: 'Select',
            initialValue: null,
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
            initialValue: null,
            editable: true,
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
        qcLink: {
            label: '打标环节',
            name: 'qcLink',
            type: 'Select',
            initialValue: null,
            editable: true,
            className: 'bottom-border',
            rules: {
                required: {
                    value: true,
                    message: '打标环节必填'
                }
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
                data: FILE_NAME_OPTIONS,
                label: 'label',
                value: 'value'
            },
            resetField: {
                default: {
                    featId: null,
                    errorDesc: null,
                    errContent: null,
                    errorType: null,
                    fieldName: null,
                    errLevel: null,
                    editDesc: null
                }
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
            editable: false,
            rules: {
                required: {
                    fieldName: 'errorType',
                    fieldValue: [1, 3],
                    message: '要素ID必填'
                }
            }
        },
        errorDesc: {
            label: '错误描述',
            name: 'errorDesc',
            type: 'Select',
            initialValue: null,
            editable: false,
            className: 'select-show-full-content',
            showSearch: true,
            optionClass: 'configurable-form-select-option-scroll',
            option: {
                data: ERROR_DESC_MAP,
                secondKey: 'fileName',
                label: 'label',
                value: 'value'
            },
            rules: {
                required: {
                    value: true,
                    message: '错误描述必填'
                }
            },
            resetFieldByField: {
                data: ERROR_DESC_RESET_FIELD_MAP,
                dependFieldNames: ['fileName', 'errorDesc']
            }
        },
        errContent: {
            label: '错误内容',
            name: 'errContent',
            type: 'Select',
            initialValue: null,
            editable: false,
            editableByField: {
                fieldName: 'errorDesc',
                fieldValue: '其它'
            },
            option: {
                data: ERROR_CONTENT_OPTIONS,
                label: 'label',
                value: 'value'
            },
            resetField: {
                default: {
                    fieldName: null
                }
            }
        },
        errorType: {
            label: '错误类型',
            name: 'errorType',
            type: 'Select',
            initialValue: null,
            editable: false,
            editableByField: {
                fieldName: 'errorDesc',
                fieldValue: '其它'
            },
            option: {
                data: ERROR_TYPE_OPTIONS,
                label: 'label',
                value: 'value'
            }
        },
        fieldName: {
            label: '字段名称',
            name: 'fieldName',
            type: 'Select',
            editable: false,
            editableByField: [
                {
                    fieldName: 'errorDesc',
                    fieldValue: '其它'
                },
                {
                    fieldName: 'errContent',
                    fieldValue: [2, 3]
                }
            ],
            rules: {
                required: {
                    fieldName: 'errContent',
                    fieldValue: [2, 3],
                    message: '字段名称必填'
                }
            },
            option: {
                data: FIELD_NAME_MAP,
                secondKey: 'fileName',
                label: 'label',
                value: 'value'
            }
        },
        errLevel: {
            label: '错误等级',
            name: 'errLevel',
            type: 'Select',
            initialValue: null,
            editable: false,
            editableByField: {
                fieldName: 'errorDesc',
                fieldValue: '其它'
            },
            option: {
                data: ERROR_LEVEL_OPTIONS,
                label: 'label',
                value: 'value'
            }
        },
        qcDesc: {
            label: '质检说明',
            name: 'qcDesc',
            type: 'TextArea',
            initialValue: null,
            editable: false,
            rules: {
                required: {
                    fieldName: 'errorDesc',
                    fieldValue: '其它',
                    message: '质检说明必填'
                }
            }
        },
        editDesc: {
            label: '作业说明',
            name: 'editDesc',
            type: 'TextArea',
            initialValue: null,
            editable: false
        }
    };
};

export const MARKER_FORM_CONFIG = () => {
    const { MS_QC_LINK_OPTIONS, MB_QC_LINK_OPTIONS } =
        SettingStore.getConfig('MARKER_OPTION_CONFIG');

    return {
        //质检员创建标注的表单配置-人工识别后质检
        MS_QC_CREATE_CONFIG: [
            {
                name: 'qcLink',
                initialValue: 1,
                editable: false,
                option: {
                    data: MS_QC_LINK_OPTIONS,
                    label: 'label',
                    value: 'value'
                }
            },
            { name: 'fileName', editable: true },
            { name: 'featId', editable: true },
            { name: 'errorDesc', editable: true },
            { name: 'errContent', editable: true },
            { name: 'errorType', editable: true },
            { name: 'fieldName', editable: true },
            { name: 'errLevel', editable: false },
            { name: 'qcDesc', editable: true }
        ],
        //质检员创建标注的表单配置-人工构建后质检
        MB_QC_CREATE_CONFIG: [
            {
                name: 'qcLink',
                initialValue: 2,
                editable: true,
                option: {
                    data: MB_QC_LINK_OPTIONS,
                    label: 'label',
                    value: 'value'
                }
            },
            { name: 'fileName', editable: true },
            { name: 'featId', editable: true },
            { name: 'errorDesc', editable: true },
            { name: 'errContent', editable: true },
            { name: 'errorType', editable: true },
            { name: 'fieldName', editable: true },
            { name: 'errLevel', editable: false },
            { name: 'qcDesc', editable: true }
        ],
        //质检员首次查看的表单配置-人工识别后质检
        MS_QC_FIRST_VISITE_CONFIG: [
            { name: 'fixStatus', editable: false },
            { name: 'qcStatus', editable: false },
            {
                name: 'qcLink',
                editable: false,
                option: {
                    data: MS_QC_LINK_OPTIONS,
                    label: 'label',
                    value: 'value'
                }
            },
            { name: 'fileName', editable: false },
            { name: 'featId', editable: false },
            { name: 'errorDesc', editable: false },
            { name: 'errContent', editable: false },
            { name: 'errorType', editable: false },
            { name: 'fieldName', editable: false },
            { name: 'errLevel', editable: false },
            { name: 'qcDesc', editable: false },
            { name: 'editDesc', editable: false }
        ],
        //质检员首次查看的表单配置-人工构建后质检
        MB_QC_FIRST_VISITE_CONFIG: [
            { name: 'fixStatus', editable: false },
            { name: 'qcStatus', editable: false },
            {
                name: 'qcLink',
                editable: true,
                option: {
                    data: MB_QC_LINK_OPTIONS,
                    label: 'label',
                    value: 'value'
                }
            },
            { name: 'fileName', editable: false },
            { name: 'featId', editable: false },
            { name: 'errorDesc', editable: false },
            { name: 'errContent', editable: false },
            { name: 'errorType', editable: false },
            { name: 'fieldName', editable: false },
            { name: 'errLevel', editable: false },
            { name: 'qcDesc', editable: false },
            { name: 'editDesc', editable: false }
        ],
        //质检员首次修改标注的表单配置-人工识别后质检
        MS_QC_FIRST_MOD_CONFIG: [
            { name: 'fixStatus', editable: false },
            { name: 'qcStatus', editable: false },
            {
                name: 'qcLink',
                editable: false,
                option: {
                    data: MS_QC_LINK_OPTIONS,
                    label: 'label',
                    value: 'value'
                }
            },
            { name: 'fileName', editable: true },
            { name: 'featId', editable: true },
            { name: 'errorDesc', editable: true },
            { name: 'errContent', editable: true },
            { name: 'errorType', editable: true },
            { name: 'fieldName', editable: true },
            { name: 'errLevel', editable: false },
            { name: 'qcDesc', editable: true },
            { name: 'editDesc', editable: false }
        ],
        //质检员首次修改标注的表单配置-人工构建后质检
        MB_QC_FIRST_MOD_CONFIG: [
            { name: 'fixStatus', editable: false },
            { name: 'qcStatus', editable: false },
            {
                name: 'qcLink',
                editable: true,
                option: {
                    data: MB_QC_LINK_OPTIONS,
                    label: 'label',
                    value: 'value'
                }
            },
            { name: 'fileName', editable: true },
            { name: 'featId', editable: true },
            { name: 'errorDesc', editable: true },
            { name: 'errContent', editable: true },
            { name: 'errorType', editable: true },
            { name: 'fieldName', editable: true },
            { name: 'errLevel', editable: false },
            { name: 'qcDesc', editable: true },
            { name: 'editDesc', editable: false }
        ],
        //质检员非首次查看的表单配置-人工识别后质检
        MS_QC_NOT_FIRST_VISITE_CONFIG: [
            { name: 'fixStatus', editable: false },
            {
                name: 'qcStatus',
                editable: true,
                option: {
                    data_2: [
                        { value: 1, label: '待修正' },
                        { value: 2, label: '无需修正' }
                    ], //data_[fixStatus value]
                    data_3: [
                        { value: 1, label: '待修正' },
                        { value: 3, label: '已修正' }
                    ], //data_[fixStatus value]
                    fieldName: 'fixStatus',
                    label: 'label',
                    value: 'value'
                }
            },
            {
                name: 'qcLink',
                editable: false,
                option: {
                    data: MS_QC_LINK_OPTIONS,
                    label: 'label',
                    value: 'value'
                }
            },
            { name: 'fileName', editable: false },
            { name: 'featId', editable: false },
            { name: 'errorDesc', editable: false },
            { name: 'errContent', editable: false },
            { name: 'errorType', editable: false },
            { name: 'fieldName', editable: false },
            { name: 'errLevel', editable: false },
            { name: 'qcDesc', editable: false },
            { name: 'editDesc', editable: false }
        ],
        //质检员非首次查看的表单配置-人工构建后质检
        MB_QC_NOT_FIRST_VISITE_CONFIG: [
            { name: 'fixStatus', editable: false },
            {
                name: 'qcStatus',
                editable: true,
                option: {
                    data_2: [
                        { value: 1, label: '待修正' },
                        { value: 2, label: '无需修正' }
                    ], //data_[fixStatus value]
                    data_3: [
                        { value: 1, label: '待修正' },
                        { value: 3, label: '已修正' }
                    ], //data_[fixStatus value]
                    fieldName: 'fixStatus',
                    label: 'label',
                    value: 'value'
                }
            },
            {
                name: 'qcLink',
                editable: true,
                option: {
                    data: MB_QC_LINK_OPTIONS,
                    label: 'label',
                    value: 'value'
                }
            },
            { name: 'fileName', editable: false },
            { name: 'featId', editable: false },
            { name: 'errorDesc', editable: false },
            { name: 'errContent', editable: false },
            { name: 'errorType', editable: false },
            { name: 'fieldName', editable: false },
            { name: 'errLevel', editable: false },
            { name: 'qcDesc', editable: false },
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
            { name: 'qcStatus', editable: false, className: 'bottom-border' },
            { name: 'fileName', editable: false },
            { name: 'featId', editable: false },
            { name: 'errorDesc', editable: false },
            { name: 'errContent', editable: false },
            { name: 'errorType', editable: false },
            { name: 'fieldName', editable: false },
            { name: 'errLevel', editable: false },
            { name: 'qcDesc', editable: false },
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
            { name: 'qcStatus', editable: false, className: 'bottom-border' },
            { name: 'fileName', editable: false },
            { name: 'featId', editable: false },
            { name: 'errorDesc', editable: false },
            { name: 'errContent', editable: false },
            { name: 'errorType', editable: false },
            { name: 'fieldName', editable: false },
            { name: 'errLevel', editable: false },
            { name: 'qcDesc', editable: false },
            { name: 'editDesc', editable: true }
        ],
        //默认配置，只能查看，不能修改
        QC_READ_ONLEY_CONFIG: [
            { name: 'fixStatus', editable: false },
            { name: 'qcStatus', editable: false },
            { name: 'qcLink', editable: false },
            { name: 'fileName', editable: false },
            { name: 'featId', editable: false },
            { name: 'errorDesc', editable: false },
            { name: 'errContent', editable: false },
            { name: 'errorType', editable: false },
            { name: 'fieldName', editable: false },
            { name: 'errLevel', editable: false },
            { name: 'qcDesc', editable: false },
            { name: 'editDesc', editable: false }
        ]
    };
};
