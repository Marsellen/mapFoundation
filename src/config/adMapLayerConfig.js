
// 适配 库配置---图层对应的字段 【已有图层 新增字段】
export const LAYER_MAP_FIELD = {
    AD_Lane:
        [{
            // 基础配置
            key: 'TURN_TYPE',
            name: '车道转向方向',
            type: 'AD_LANE_TURN_TYPE',
            domType: 'Select',
            // 
            value: 'TURN_TYPE',
            label: '车道转向方向',
            // 表
            dataIndex: 'TRAVERSAL',
            title: '车道转向方向',
            width: 260,
            ellipsis: true,
            filterBy: 'typeFilter|AD_LANE_TURN_TYPE'
        }]
}

// *************【新增图层】配置 从无到有**********
// 1.适配图层字段【字段配置】，否则保存后无法显示字段
export const DEFAULT_PROPERTIES_LAYER = {
    // 【适配字段】
    AD_Lane_Overlap: {
        OVERLAP_ID: 0,
        LANE_ID: 0,
        PLG_ID: 0
    },
    AD_Lane: {
        TURN_TYPE:0
    }
}
// 2.适配表显示内容 【属性显示】
export const TABLE_DATA_LAYER = {
    // 新增图层配置     点击弹出【属性显示】的字段
    AD_Lane_Overlap: [
        {
            key: 'OVERLAP_ID',
            name: '用户编号',
            type: 'AD_LANE_OVERLAP_ID',
            domType: 'Text'
        },
        {
            key: 'UPD_STAT',
            name: '更新标识',
            filterBy: 'updStatFilter',
            domType: 'Text'
        }
    ]
}

// 3.增加标注  【标注文字展示】
export const LAYER_TYPE_LAYER = {
    AD_Lane_Overlap: [
        {
            key: 'OVERLAP_ID',
            name: '用户编号',
            type: 'AD_LANE_OVERLAP_ID'
        }
    ]
}
// 4.新增图层对应的工具【工具栏】
export const DATA_LAYER_LAYER = {
    AD_Lane_Overlap: {
        label: '中心线压盖',
        id: 'OVERLAP_ID',
        spec: 'AD_Lane_Overlap',
        tools: {
            recognition: ['DRAW_TOOL_BOX'],
            manbuild: ['DRAW_TOOL_BOX', 'ADD_REL', 'DEL_REL', 'ATTRIBUTE_BRUSH']
        },
        drawTools: {
            recognition: ['LINE', 'CURVED_LINE'],
            manbuild: ['LINE',
                'CURVED_LINE']
        },
        rightTools: ['delete', 'force_delete', 'change_points', 'group_move'],
        groupRightTools: ['delete'],
        editName: '中心线压盖'
    }
}
// 5.图层样式-- 初始化图层样式
export const DEFAULT_STYLE = {
    // 新增图层配置
    AD_Lane_Overlap: {
        type: 'Line',
        showFields: ['NOKEY'],
        order: 1,
        showStyles: ['vectorStyle'],
        vectorStyle: {
            NOKEY: [
                {
                    style: { color: 'rgb(255,110,100,1)', linewidth: 1 }
                }
            ]
        },
        level: 15
    }
}

// 6.表格展示字段【表中字段展示】
export const COLUMNS_CONFIG_LAYER = {
    AD_Lane_Overlap: [
        {
            dataIndex: 'index',
            title: '序号'
        },
        {
            dataIndex: 'OVERLAP_ID',
            title: '用户编号'
        },
        {
            dataIndex: 'UPD_STAT',
            title: '更新标识',
            filterBy: 'updStatFilter'
        }
    ]
}

// 7.符号配置-定点检修模式 [配置]
export const CHECK_VECTOR_CONFIG_LAYER = {
    AD_Lane_Overlap: {
        key: 'AD_Lane_Overlap',
        label: '中心线压盖',
        checked: false,
        isClassify: true,
        type: 'Line',
        commonStyle: {
            showFields: 'TYPE',
            lineStyle: 'solid',
            color: 'rgb(255,255,255)',
            opacity: 1,
            arrow: true,
            point: true,
            pointEnabledStatus: true,
            arrowEnabledStatus: true,
            pointSize: 0.1
        },
        fieldStyle: {
            colorFieldSize: 28,
            colorFieldIcon: 'xianyaosu'
        },
        styleOptionArr: [
            { key: 'solid', icon: 'zhixian' },
            { key: 'dashed', icon: 'xuxian' },
            { key: 'dashed1', icon: 'xuxian1' },
            { key: 'dashed2', icon: 'xuxian2' },
            { key: 'dashed3', icon: 'xuxian3' }
        ]
    }
}

//8.更新图层标识
export const UPD_STAT_VECTOR_CONFIG_LAYER = {
    AD_Lane_Overlap: {
        type: 'Line',
        iconFields: ['UPD_STAT'],
        showStyles: ['iconStyle'],
        key: 'AD_Lane_Overlap',
        order: 1,
        iconStyle: {}
    }
}

// 9.人工识别设置 【编辑图层列表】配置【人工识别】
export const MS_EDIT_LAYER_LAYER = {
    LOGIC: [
        'AD_Lane_Overlap'
    ]
}
// 10.人工识别设置【编辑图层列表】配置【人工构建】

export const MB_EDIT_LAYER_MAP_LAYER = {
    LOGIC: [
        'AD_Lane_Overlap'
    ]
}
// 11.图层控制修改
export const SELECT_OPTIONS_LAYER = {
    items: [
        'AD_Lane_Overlap'
    ]
}
// 12. 检查当前编辑图层和要操作条目是否匹配
export const OPTION_LAYER = {
    AD_Lane_Overlap: ['AD_Lane_Overlap']
}
// 13.验证是否包含，如果不包含此图层，不会渲染
export const VECTOR_FILES_LAYER =
    ['AD_Lane_Overlap.geojson']

// 14.-----------关联关系配置------
export const REL_FILES_LAYER =
    ['AD_Lane_Overlap.geojson']
// 关联关系主键配置
export const SPEC_REL_KEY_SET_LAYER = [
    { spec: 'AD_Lane_Overlap', relKey: 'LANE_OVERLAP', relType: 'REL_OBJ_TYPE_KEYS' }
]
export const LAYER_NAME_MAP_LAYER = {
    LANE_OVERLAP: { layerName: 'AD_Lane_Overlap', key: 'OVERLAP_ID' }
}
// 关联关系配置
export const REL_SPEC_CONFIG_LAYER = [
    //  中心线压盖-车道线
    {
        source: 'AD_Lane_Overlap',
        objKeyName: 'LANE_ID',
        relObjKeyName: 'OVERLAP_ID',
        objSpec: 'AD_Lane',
        relObjSpec: 'AD_Lane_Overlap',
        objType: 'LANE',
        relObjType: 'LANE_OVERLAP'
    },
    // 中心线压盖-道路车道标记
    {
        source: 'AD_Lane_Overlap',
        objKeyName: 'PLG_ID',
        relObjKeyName: 'OVERLAP_ID',
        objSpec: 'AD_LaneMark_Geo',
        relObjSpec: 'AD_Lane_Overlap',
        objType: 'PLG',
        relObjType: 'LANE_OVERLAP'
    }
]

// 属性关联关系图层  关联配置  配置是否对图层做关联操作
export const ATTR_REL_DATA_SET_LAYER = ['AD_Lane_Overlap'];

//  判断是否一对多
export const SPEC_LAYER = [
    'AD_Arrow', 'AD_Pole_Geo', 'AD_LaneDivider_Plg', 'AD_Text', 'AD_StopLocation_Geo', 'AD_StopLocation', 'AD_Lane_Overlap'
]
// *****************END 新增图层******************
