export const EDIT_STATUS_MAP = {
    union_break: '联合打断'
};

export const BUSINESS_TYPE_MAP = {
    new_point: {
        label: '绘制点要素',
        code: 1
    },
    new_line: {
        label: '绘制折线',
        code: 4
    },
    new_curved_line: {
        label: '绘制曲线',
        code: 5
    },
    new_polygon: {
        label: '绘制面要素',
        code: 6
    },
    new_vertical_matrix: {
        label: '绘制任意外接矩形',
        code: 8
    },
    new_ground_rectangle: {
        label: '绘制地面矩形',
        code: 9
    },
    undo: {
        label: '撤销',
        code: 10
    },
    auto_save: {
        label: '自动保存',
        code: 11
    },
    save: {
        label: '手动保存',
        code: 12
    },
    change_points: {
        label: '修改形状点',
        code: 13
    },
    trim: {
        label: '修整线要素',
        code: 14
    },
    group_move: {
        label: '批量平移',
        code: 15
    },
    delete: {
        label: '删除',
        code: 16
    },
    copy_line: {
        label: '复制要素',
        code: 17
    },
    break_line: {
        label: '打断线要素',
        code: 18
    },
    break_line_by_point: {
        label: '齐打断线要素',
        code: 19
    },
    break_line_by_line: {
        label: '拉线齐打断线要素',
        code: 20
    },
    merge_line: {
        label: '合并线要素',
        code: 21
    },
    batch_merge_line: {
        label: '批量合并线要素',
        code: 22
    },
    new_Uturn_line: {
        AD_Lane: {
            label: '掉头中心线生成',
            code: 23
        },
        AD_Road: {
            label: '掉头参考线生成',
            code: 46
        }
    },
    batch_build: {
        label: '批量生成车道线',
        code: 24
    },
    attr_edit_modal: {
        label: '属性编辑窗口',
        code: 25
    },
    batch_assign: {
        label: '批量属性赋值',
        code: 26
    },
    new_rel: {
        label: '新建关联关系',
        code: 27
    },
    meature_distance: {
        label: '测距',
        code: 28
    },
    select_road_plane: {
        label: '路面设置',
        code: 29
    },
    attr_list: {
        label: '属性列表',
        code: 30
    },
    boundary_load: {
        label: '任务数据加载（周边底图）',
        code: 31
    },
    normal: {
        label: '设置可编辑图层',
        code: 32
    },
    union_break: {
        label: '联合打断',
        code: 33
    },
    new_qc_marker: {
        label: '新建质检标注',
        code: 34
    },
    choose_error_feature: {
        label: '新建质检标注',
        code: 34
    },
    window_status: {
        label: '编辑平台页面激活',
        code: 35
    },
    redo: {
        label: '回退',
        code: 36
    },
    force_delete: {
        label: '强制删除',
        code: 37
    },
    new_template_arrow: {
        label: '绘制模板箭头',
        code: 39
    },
    batch_break: {
        label: '批量线要素打断赋值',
        code: 40
    },
    new_facade_rectangle: {
        label: '绘制两点立面矩形',
        code: 41
    },
    new_circle: {
        label: '绘制三点圆',
        code: 42
    },
    move_point_feature: {
        label: '平移点要素',
        code: 43
    },
    reverse_order_line: {
        label: '线要素逆序',
        code: 44
    },
    posture_adjust: {
        label: '面要素位姿调整',
        code: 45
    },
    new_around_line: {
        AD_Lane: {
            label: '左右车道线生成中心线',
            code: 47
        },
        AD_Road: {
            label: '路段中参考线生成',
            code: 48
        }
    },
    new_straight_line: {
        AD_Lane: {
            label: '路口内直行中心线生成',
            code: 49
        },
        AD_Road: {
            label: '路口内直行参考线生成',
            code: 50
        }
    },
    new_turn_line: {
        AD_Lane: {
            label: '路口内转弯中心线生成',
            code: 51
        },
        AD_Road: {
            label: '路口内转弯参考线生成',
            code: 52
        }
    },
    dashed_polygon_create: {
        label: '虚线面构建',
        code: 53
    },
    assign_line_batch: {
        label: '批量赋车道分组编号',
        code: 54
    },
    line_snap_stop: {
        label: '线要素对齐到停止线',
        code: 55
    },
    attribute_brush: {
        label: '属性刷',
        code: 56
    },
    del_rel: {
        label: '删除关联关系',
        code: 57
    },
    modify_qc_marker: {
        label: '修改质检标注',
        code: 58
    },
    buffer: {
        label: 'buffer渲染',
        code: 61
    },
    buffer_render_window: {
        label: 'buffer渲染窗口：窗口开关',
        code: 62
    },
    buffer_layers_toggle: {
        label: 'buffer渲染窗口：图层开关',
        code: 63
    },
    buffer_switch: {
        label: 'buffer渲染窗口：显隐开关',
        code: 64
    },
    municipal_barrier_down: {
        label: '市政护栏下压',
        code: 65
    },
    new_information_mark: {
        label: '资料问题录入',
        code: 66
    },
    choose_inform_feature: {
        label: '资料问题录入',
        code: 66
    },
    change_inform_feature: {
        label: '修改形状',
        code: 66
    }
};
