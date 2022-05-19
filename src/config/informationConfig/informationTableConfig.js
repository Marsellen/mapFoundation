import SettingStore from 'src/store/setting/settingStore';

export const MARKER_TABLE_COLUMNS = () => {
    const {
        ERROR_DESC_MAP,
        FILE_NAME_OPTIONS,
        ERROR_TYPE_OPTIONS,
        FIX_STATUS_OPTIONS,
        QC_STATUS_OPTIONS,
        QC_LINK_OPTIONS,
        FIELD_NAME_MAP,
        ERROR_CONTENT_OPTIONS,
        ERROR_LEVEL_OPTIONS
    } = SettingStore.getConfig('MARKER_OPTION_CONFIG');

    return [
        {
            title: '序号',
            dataIndex: 'index',
            key: 'index',
            isSorter: true,
            width: 50
        },
        {
            title: '作业查看状态',
            dataIndex: 'fixStatus',
            key: 'fixStatus',
            isFilter: true,
            isSorter: true,
            width: 120,
            describe: {
                data: FIX_STATUS_OPTIONS,
                label: 'label',
                value: 'value'
            },
            styleByValue: {
                fieldValue: 1,
                className: 'red-text'
            }
        },
        {
            title: '质检查看状态',
            dataIndex: 'qcStatus',
            key: 'qcStatus',
            isFilter: true,
            isSorter: true,
            width: 120,
            describe: {
                data: QC_STATUS_OPTIONS,
                label: 'label',
                value: 'value'
            },
            styleByValue: {
                fieldValue: 1,
                className: 'red-text'
            }
        },
        {
            title: '图层',
            dataIndex: 'fileName',
            key: 'fileName',
            isFilter: true,
            isSorter: true,
            width: 75,
            describe: {
                data: FILE_NAME_OPTIONS,
                label: 'label',
                value: 'value'
            }
        },
        {
            title: '要素ID',
            dataIndex: 'featId',
            key: 'featId',
            isSorter: true,
            width: 70
        },
        {
            title: '错误描述',
            dataIndex: 'errorDesc',
            key: 'errorDesc',
            isFilter: true,
            isSorter: true,
            width: 200,
            describe: {
                data: ERROR_DESC_MAP,
                secondKey: 'fileName',
                label: 'label',
                value: 'value'
            }
        },
        {
            title: '错误内容',
            dataIndex: 'errContent',
            key: 'errContent',
            isFilter: true,
            isSorter: true,
            describe: {
                data: ERROR_CONTENT_OPTIONS,
                label: 'label',
                value: 'value'
            },
            width: 100
        },
        {
            title: '错误类型',
            dataIndex: 'errorType',
            key: 'errorType',
            isFilter: true,
            isSorter: true,
            describe: {
                data: ERROR_TYPE_OPTIONS,
                label: 'label',
                value: 'value'
            },
            width: 100
        },
        {
            title: '字段名称',
            dataIndex: 'fieldName',
            key: 'fieldName',
            isFilter: true,
            isSorter: true,
            width: 100,
            describe: {
                data: FIELD_NAME_MAP,
                secondKey: 'fileName',
                label: 'label',
                value: 'value'
            }
        },
        {
            title: '错误等级',
            dataIndex: 'errLevel',
            key: 'errLevel',
            isFilter: true,
            isSorter: true,
            width: 100,
            describe: {
                data: ERROR_LEVEL_OPTIONS,
                label: 'label',
                value: 'value'
            }
        },
        {
            title: '作业说明',
            dataIndex: 'editDesc',
            key: 'editDesc',
            isSorter: true,
            width: 100
        },
        {
            title: '打标环节',
            dataIndex: 'qcLink',
            key: 'qcLink',
            isFilter: true,
            isSorter: true,
            width: 100,
            describe: {
                data: QC_LINK_OPTIONS,
                label: 'label',
                value: 'value'
            }
        }
    ];
};
