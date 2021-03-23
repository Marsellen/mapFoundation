export const EDIT_STATUS_MAP = {
    union_break: '联合打断'
};

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
    break_line_by_point: {
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
        AD_Lane: {
            label: '掉头中心线生成',
            isLoad: true,
            code: 23
        },
        AD_Road: {
            label: '掉头参考线生成',
            isLoad: true,
            code: 46
        }
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
    batch_assign: {
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
    new_qc_marker: {
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
    },
    buffer_render: {
        label: '要素轮廓buffer',
        isLoad: false,
        code: 38
    },
    new_template_arrow: {
        label: '绘制模板箭头',
        isLoad: true,
        code: 39
    },
    batch_break: {
        label: '批量线要素打断赋值',
        isLoad: true,
        code: 40
    },
    new_facade_rectangle: {
        label: '绘制两点立面矩形',
        isLoad: true,
        code: 41
    },
    new_circle: {
        label: '绘制三点圆',
        isLoad: true,
        code: 42
    },
    move_point_feature: {
        label: '平移点要素',
        isLoad: true,
        code: 43
    },
    reverse_order_line: {
        label: '线要素逆序',
        isLoad: true,
        code: 44
    },
    posture_adjust: {
        label: '面要素位姿调整',
        isLoad: true,
        code: 45
    },
    new_around_line: {
        AD_Lane: {
            label: '左右车道线生成中心线',
            isLoad: true,
            code: 47
        },
        AD_Road: {
            label: '路段中参考线生成',
            isLoad: true,
            code: 48
        }
    },
    new_straight_line: {
        AD_Lane: {
            label: '路口内直行中心线生成',
            isLoad: true,
            code: 49
        },
        AD_Road: {
            label: '路口内直行参考线生成',
            isLoad: true,
            code: 50
        }
    },
    new_turn_line: {
        AD_Lane: {
            label: '路口内转弯中心线生成',
            isLoad: true,
            code: 51
        },
        AD_Road: {
            label: '路口内转弯参考线生成',
            isLoad: true,
            code: 52
        }
    },
    dashed_polygon_create: {
        label: '虚线面构建',
        isLoad: true,
        code: 53
    },
    assign_line_batch: {
        label: '批量赋车道分组编号',
        isLoad: true,
        code: 54
    },
    line_snap_stop: {
        label: '线要素对齐到停止线',
        isLoad: true,
        code: 55
    },
    attribute_brush: {
        label: '属性刷',
        isLoad: true,
        code: 56
    },
    del_rel: {
        label: '删除关联关系',
        isLoad: true,
        code: 57
    },
    modify_qc_marker: {
        label: '修改质检标注',
        isLoad: true,
        code: 58
    }
};
