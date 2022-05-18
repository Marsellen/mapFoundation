import ChooseInformFeature from 'src/component/home/toolList/chooseInformFeature';
import ChangeInformFeature from 'src/component/home/toolList/changeInformFeature';
import SettingStore from 'src/store/setting/settingStore';

export const INFOMATION_FIELD_CONFIG = () => {
    const { FILE_NAME_OPTIONS, ERROR_TYPE_OPTIONS, ERROR_LEVEL_OPTIONS } = SettingStore.getConfig(
        'INFOMATION_OPTION_CONFIG'
    );

    return {
        layer: {
            label: '图层',
            name: 'layer',
            type: 'Select',
            initialValue: null,
            editable: false,
            tool: ChooseInformFeature,
            rules: {
                required: {
                    value: true,
                    message: '图层必填'
                }
            },
            option: {
                data: FILE_NAME_OPTIONS,
                label: 'label',
                value: 'value'
            },
            resetField: {
                default: {
                    featureId: null
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
        featureId: {
            label: '要素ID',
            name: 'featureId',
            type: 'InputNumber',
            initialValue: null,
            editable: false
        },
        errorType: {
            label: '错误类型',
            name: 'errorType',
            type: 'Select',
            initialValue: null,
            editable: false,
            rules: {
                required: {
                    value: true,
                    message: '错误类型必选'
                }
            },
            option: {
                data: ERROR_TYPE_OPTIONS,
                label: 'label',
                value: 'value'
            }
        },
        errorLevel: {
            label: '问题等级',
            name: 'errorLevel',
            type: 'Select',
            initialValue: null,
            editable: false,
            rules: {
                required: {
                    value: true,
                    message: '问题等级必填'
                }
            },
            option: {
                data: ERROR_LEVEL_OPTIONS,
                label: 'label',
                value: 'value'
            }
        },
        errorDesc: {
            label: '问题描述',
            name: 'errorDesc',
            type: 'TextArea',
            initialValue: null,
            editable: false
        },
        geometry: {
            label: '几何位置',
            name: 'geometry',
            type: 'Text',
            initialValue: '已绘制',
            editable: false,
            tool: ChangeInformFeature,
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
        }
    };
};

export const INFOMATION_FORM_CONFIG = () => {
    return {
        //质检员创建标注的表单配置-人工识别后质检
        MS_QC_CREATE_CONFIG: [
            { name: 'layer', editable: true },
            { name: 'featureId', editable: true },
            { name: 'errorType', editable: true },
            { name: 'errorLevel', editable: true },
            { name: 'errorDesc', editable: true },
            { name: 'geometry', editable: false }
        ],
        QC_READ_ONLEY_CONFIG: [
            { name: 'layer', editable: false },
            { name: 'featureId', editable: false },
            { name: 'errorType', editable: false },
            { name: 'errorLevel', editable: false },
            { name: 'errorDesc', editable: false },
            { name: 'geometry', editable: false }
        ]
    };
};
