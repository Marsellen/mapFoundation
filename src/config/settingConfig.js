//修改配置白名单：超级管理员 admin、生产管理员 producer_manager、质检管理员 quality_manager
export const ROLE_WHITE_LIST = ['admin', 'producer_manager', 'quality_manager'];

export const SETTING_MENUS = [
    {
        key: 'MARKER_OPTION_CONFIG',
        title: '质检标注配置',
        type: 'Item'
    },
    {
        key: 'VECTOR_CONFIG',
        title: '符号配置',
        type: 'SubMenu',
        children: [
            {
                key: 'COMMON_VECTOR_CONFIG',
                title: '通用符号模式',
                type: 'SubMenu',
                children: [
                    {
                        key: 'MS_TASK_VECTOR_CONFIG_MAP',
                        title: '人工识别任务样式',
                        type: 'Item'
                    },
                    {
                        key: 'MB_TASK_VECTOR_CONFIG_MAP',
                        title: '人工构建任务样式',
                        type: 'Item'
                    },
                    {
                        key: 'QC_MS_TASK_VECTOR_CONFIG_MAP',
                        title: '人工识别质检任务样式',
                        type: 'Item'
                    },
                    {
                        key: 'QC_MB_TASK_VECTOR_CONFIG_MAP',
                        title: '人工构建质检任务样式',
                        type: 'Item'
                    }
                ]
            },
            {
                key: 'SELF_CHECK_VECTOR_CONFIG_MAP',
                title: '自查符号模式',
                type: 'Item'
            },
            {
                key: 'RELATION_VECTOR_CONFIG_MAP',
                title: '关联关系查看模式',
                type: 'Item'
            },
            {
                key: 'DEFINE_VECTOR_CONFIG_MAP',
                title: '自定义符号模式',
                type: 'Item'
            }
        ]
    },
    {
        key: 'TEXT_CONFIG',
        title: '注记配置',
        type: 'SubMenu',
        children: [
            {
                key: 'COMMON_TEXT_CONFIG',
                title: '通用符号模式',
                type: 'SubMenu',
                children: [
                    {
                        key: 'MS_TASK_TEXT_CONFIG_MAP',
                        title: '人工识别任务样式',
                        type: 'Item'
                    },
                    {
                        key: 'MB_TASK_TEXT_CONFIG_MAP',
                        title: '人工构建任务样式',
                        type: 'Item'
                    },
                    {
                        key: 'QC_MS_TASK_TEXT_CONFIG_MAP',
                        title: '人工识别质检任务样式',
                        type: 'Item'
                    },
                    {
                        key: 'QC_MB_TASK_TEXT_CONFIG_MAP',
                        title: '人工构建质检任务样式',
                        type: 'Item'
                    }
                ]
            },
            {
                key: 'SELF_CHECK_TEXT_CONFIG_MAP',
                title: '自查符号模式',
                type: 'Item'
            },
            {
                key: 'RELATION_TEXT_CONFIG_MAP',
                title: '关联关系查看模式',
                type: 'Item'
            },
            {
                key: 'DEFINE_TEXT_CONFIG_MAP',
                title: '自定义符号模式',
                type: 'Item'
            }
        ]
    },
    {
        key: 'ARROW_TEMPLATE_CONFIG',
        title: '箭头模板配置',
        type: 'Item'
    },
    {
        key: 'TABLE_DATA_MAP',
        title: '属性自维护配置',
        type: 'Item'
    },
    {
        key: 'OTHER_CONFIG',
        title: '其它配置',
        type: 'Item'
    }
];
