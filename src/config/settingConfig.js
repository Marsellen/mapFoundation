/*
 * 各项配置的角色白名单
 * admin 超级管理员
 * producer_manager 生产管理员
 * quality_manager 质检管理员
 */
export const ROLE_WHITE_MAP = {
    MARKER_OPTION_CONFIG: ['admin'],
    MS_TASK_VECTOR_CONFIG_MAP: ['admin', 'producer_manager', 'quality_manager'],
    MB_TASK_VECTOR_CONFIG_MAP: ['admin', 'producer_manager', 'quality_manager'],
    QC_MS_TASK_VECTOR_CONFIG_MAP: ['admin', 'producer_manager', 'quality_manager'],
    QC_MB_TASK_VECTOR_CONFIG_MAP: ['admin', 'producer_manager', 'quality_manager'],
    SELF_CHECK_VECTOR_CONFIG_MAP: ['admin', 'producer_manager', 'quality_manager'],
    RELATION_VECTOR_CONFIG_MAP: ['admin', 'producer_manager', 'quality_manager'],
    UPDATE_VECTOR_CONFIG_MAP: ['admin', 'producer_manager', 'quality_manager'],
    DEFINE_VECTOR_CONFIG_MAP: ['admin', 'producer_manager', 'quality_manager'],
    MS_TASK_TEXT_CONFIG_MAP: ['admin', 'producer_manager', 'quality_manager'],
    MB_TASK_TEXT_CONFIG_MAP: ['admin', 'producer_manager', 'quality_manager'],
    QC_MS_TASK_TEXT_CONFIG_MAP: ['admin', 'producer_manager', 'quality_manager'],
    QC_MB_TASK_TEXT_CONFIG_MAP: ['admin', 'producer_manager', 'quality_manager'],
    QR_TASK_TEXT_CONFIG_MAP: ['admin', 'producer_manager', 'quality_manager'],
    SELF_CHECK_TEXT_CONFIG_MAP: ['admin', 'producer_manager', 'quality_manager'],
    RELATION_TEXT_CONFIG_MAP: ['admin', 'producer_manager', 'quality_manager'],
    DEFINE_TEXT_CONFIG_MAP: ['admin', 'producer_manager', 'quality_manager'],
    UPDATE_TEXT_CONFIG_MAP: ['admin', 'producer_manager', 'quality_manager'],
    ARROW_TEMPLATE_CONFIG: ['admin', 'producer_manager', 'quality_manager'],
    TABLE_DATA_MAP: ['admin', 'producer_manager', 'quality_manager'],
    OTHER_CONFIG: ['admin', 'producer_manager', 'quality_manager']
};

//配置
export const SAVE_MENUS = [
    'MARKER_OPTION_CONFIG', //质检标注配置
    'MS_TASK_VECTOR_CONFIG_MAP', //符号配置-通用符号模式-人工识别任务样式
    'MB_TASK_VECTOR_CONFIG_MAP', //符号配置-通用符号模式-人工构建任务样式
    'QC_MS_TASK_VECTOR_CONFIG_MAP', //符号配置-通用符号模式-人工识别质检任务样式
    'QC_MB_TASK_VECTOR_CONFIG_MAP', //符号配置-通用符号模式-人工构建质检任务样式
    'SELF_CHECK_VECTOR_CONFIG_MAP', //符号配置-自查符号模式
    'UPDATE_VECTOR_CONFIG_MAP', //符号配置-更新标识查看模式
    'DEFINE_VECTOR_CONFIG_MAP', //符号配置-自定义符号模式
    'MS_TASK_TEXT_CONFIG_MAP', //注记配置-通用符号模式-人工识别任务样式
    'MB_TASK_TEXT_CONFIG_MAP', //注记配置-通用符号模式-人工构建任务样式
    'QC_MS_TASK_TEXT_CONFIG_MAP', //注记配置-通用符号模式-人工识别质检任务样式
    'QC_MB_TASK_TEXT_CONFIG_MAP', //注记配置-通用符号模式-人工构建质检任务样式
    'QR_TASK_TEXT_CONFIG_MAP', //注记配置-通用符号模式-人工检修任务样式
    'SELF_CHECK_TEXT_CONFIG_MAP', //注记配置-自查符号模式
    'RELATION_TEXT_CONFIG_MAP', //注记配置-关联关系查看模式
    'DEFINE_TEXT_CONFIG_MAP', //注记配置-自定义符号模式
    'UPDATE_TEXT_CONFIG_MAP', //注记配置-更新标识查看模式
    'ARROW_TEMPLATE_CONFIG', //箭头模板配置
    'TABLE_DATA_MAP', //属性自维护配置
    'OTHER_CONFIG' //其它配置
];

//配置中心菜单
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
            // {
            //     key: 'RELATION_VECTOR_CONFIG_MAP',
            //     title: '关联关系查看模式',
            //     type: 'Item'
            // },
            {
                key: 'UPDATE_VECTOR_CONFIG_MAP',
                title: '更新标识查看模式',
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
                    },
                    {
                        key: 'QR_TASK_TEXT_CONFIG_MAP',
                        title: '人工检修任务样式',
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
                key: 'UPDATE_TEXT_CONFIG_MAP',
                title: '更新标识查看模式',
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
