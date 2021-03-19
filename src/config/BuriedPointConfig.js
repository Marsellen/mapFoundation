export const EDIT_STATUS_MAP = {
    union_break: '联合打断'
};

export const UN_BURIED_POINT_EDIT_TYPES = ['choose_error_feature'];

export const BUSINESS_TYPE_MAP = {
    new_point: {
        label: '绘制点要素',
        isLoad: true,
        code: 1
    },
    new_line: {
        label: '绘制折线',
        isLoad: true,
        code: 4
    },
    new_curved_line: {
        label: '绘制曲线',
        isLoad: true,
        code: 5
    },
    new_polygon: {
        label: '绘制面要素',
        isLoad: true,
        code: 6
    },
    new_vertical_matrix: {
        label: '绘制任意外接矩形',
        isLoad: true,
        code: 8
    },
    new_ground_rectangle: {
        label: '绘制地面矩形',
        isLoad: true,
        code: 9
    },
    undo: {
        label: '撤销',
        isLoad: false,
        code: 10
    },
    auto_save: {
        label: '自动保存',
        isLoad: true,
        code: 11
    },
    save: {
        label: '手动保存',
        isLoad: true,
        code: 12
    },
    change_points: {
        label: '修改形状点',
        isLoad: true,
        code: 13
    },
    trim: {
        label: '修整线要素',
        isLoad: true,
        code: 14
    },
    group_move: {
        label: '批量平移',
        isLoad: true,
        code: 15
    },
    delete: {
        label: '删除（含批量）',
        isLoad: false,
        code: 16
    },
    copy_line: {
        label: '复制要素',
        isLoad: true,
        code: 17
    },
    break_line: {
        label: '打断线要素',
        isLoad: true,
        code: 18
    },
    same_break_line: {
        label: '齐打断线要素',
        isLoad: true,
        code: 19
    },
    break_line_by_line: {
        label: '拉线齐打断线要素',
        isLoad: true,
        code: 20
    },
    merge_line: {
        label: '合并线要素',
        isLoad: true,
        code: 21
    },
    batch_merge_line: {
        label: '批量合并线要素',
        isLoad: true,
        code: 22
    },
    new_Uturn_line: {
        label: '掉头中心线生成',
        isLoad: true,
        code: 23
    },
    batch_build: {
        label: '批量生成车道线',
        isLoad: true,
        code: 24
    },
    attr_edit_modal: {
        label: '属性编辑窗口',
        isLoad: true,
        code: 25
    },
    batch_attr_edit_modal: {
        label: '批量属性赋值',
        isLoad: true,
        code: 26
    },
    new_rel: {
        label: '新建关联关系（工具）',
        isLoad: true,
        code: 27
    },
    meature_distance: {
        label: '测距',
        isLoad: true,
        code: 28
    },
    select_road_plane: {
        label: '路面设置',
        isLoad: false,
        code: 29
    },
    attr_list: {
        label: '属性列表',
        isLoad: true,
        code: 30
    },
    boundary_load: {
        label: '任务数据加载（周边底图）',
        isLoad: true,
        code: 31
    },
    normal: {
        label: '设置可编辑图层',
        isLoad: true,
        code: 32
    },
    union_break: {
        label: '联合打断',
        isLoad: true,
        code: 33
    },
    qc_marker: {
        label: '新建质检标注',
        isLoad: true,
        code: 34
    },
    choose_error_feature: {
        label: '新建质检标注',
        isLoad: true,
        code: 34
    },
    window_status: {
        label: '编辑平台页面激活',
        isLoad: true,
        code: 35
    },
    redo: {
        label: '回退',
        isLoad: false,
        code: 36
    },
    force_delete: {
        label: '强制删除',
        isLoad: false,
        code: 37
    }
};
