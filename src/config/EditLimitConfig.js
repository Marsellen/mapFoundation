/*配置说明
* xxxx是当前操作的editType
xxxx:{ 
    * 输入数据限制
    inputLimit:{ 
        * position 输入数据与任务范围的空间关系
        * position:'inside' 输入数据在任务范围内
        * position:'outside' 输入数据在任务范围外
        position: 'inside',
        * taskData 输入数据来源
        * taskData:'every' 输入数据必须全是当前任务数据
        * taskData:'some' 输入数据可以是当前任务数据，也可以是周边底图数据
        * taskData:'atLastOne' 输入数据至少有一个是当前任务数据
        taskData:'', 
    },
    * 输出数据限制
    outputLimit:{ 
        * position 输出数据与任务范围的空间关系
        * position:'inside' 输出数据在任务范围内
        * position:'outside' 输出数据在任务范围外
        position: 'inside', 
    }
}
*/

//本地任务各操作输入、输出限制
export const LOCAL_TASK_EDIT_LIMIT = {
    // 修改形状点
    change_points: {
        inputLimit: {
            taskData: 'every'
        }
    },
    // 修整线要素
    trim: {
        inputLimit: {
            taskData: 'every'
        }
    },
    // 平移点要素
    move_point_feature: {
        inputLimit: {
            taskData: 'every'
        }
    },
    // 线要素逆序
    reverse_order_line: {
        inputLimit: {
            taskData: 'every'
        }
    },
    // 删除几何要素
    delete: {
        inputLimit: {
            taskData: 'every'
        }
    },
    // 强制删除要素
    force_delete: {
        inputLimit: {
            taskData: 'every'
        }
    },
    // 复制线要素
    copy_line: {
        inputLimit: {
            taskData: 'every'
        }
    },
    // 打断线要素、齐打断线要素
    break_line: {
        inputLimit: {
            taskData: 'every'
        }
    },
    // 拉线齐打断线要素
    break_line_by_line: {
        inputLimit: {
            taskData: 'every'
        }
    },
    // 合并线要素
    merge_line: {
        inputLimit: {
            taskData: 'every'
        }
    },
    // 批量合并线要素
    batch_merge_line: {
        inputLimit: {
            taskData: 'every'
        }
    },
    // 左右车道线生成中心线
    new_around_line: {
        inputLimit: {
            taskData: 'atLastOne'
        }
    },
    // 路口内直行中心线生成
    new_straight_line: {
        inputLimit: {
            taskData: 'atLastOne'
        }
    },
    // 路口内转弯中心线生成
    new_turn_line: {
        inputLimit: {
            taskData: 'atLastOne'
        }
    },
    // 掉头中心线生成
    new_Uturn_line: {
        inputLimit: {
            taskData: 'atLastOne'
        }
    },
    //批量属性赋值
    batch_assign: {
        inputLimit: {
            taskData: 'every'
        }
    },
    // 批量赋车道编号
    assign_line_batch: {
        inputLimit: {
            taskData: 'every'
        }
    },
    // 线要素对齐到停止线，参考数据没有限制，被处理数据才有限制
    line_snap_stop: {
        inputLimit: {
            taskData: 'every'
        }
    },
    // 属性刷，参考数据没有限制，被处理数据才有限制
    attribute_brush: {
        inputLimit: {
            taskData: 'every'
        }
    },
    // 新建关联关系
    new_rel: {
        inputLimit: {
            taskData: 'atLastOne'
        }
    }
};

//底图新增任务各操作输入、输出限制
export const ADD_TASK_EDIT_LIMIT = LOCAL_TASK_EDIT_LIMIT;

//底图更新任务各操作输入、输出限制
export const UPDATE_TASK_EDIT_LIMIT = {
    // 绘制点要素
    new_point: {
        outputLimit: {
            position: 'inside'
        }
    },
    // 绘制折线
    new_line: {
        outputLimit: {
            position: 'inside'
        }
    },
    // 绘制曲线
    new_curved_line: {
        outputLimit: {
            position: 'inside'
        }
    },
    // 绘制面要素
    new_polygon: {
        outputLimit: {
            position: 'inside'
        }
    },
    // 绘制两点立面矩形
    new_facade_rectangle: {
        outputLimit: {
            position: 'inside'
        }
    },
    // 绘制三点立面圆形
    new_circle: {
        outputLimit: {
            position: 'inside'
        }
    },
    // 绘制任意外接立面矩形
    new_vertical_matrix: {
        outputLimit: {
            position: 'inside'
        }
    },
    // 绘制地面矩形
    new_ground_rectangle: {
        outputLimit: {
            position: 'inside'
        }
    },
    // 修改形状点
    change_points: {
        inputLimit: {
            position: 'inside',
            taskData: 'every'
        }
    },
    // 修整线要素
    trim: {
        inputLimit: {
            position: 'inside',
            taskData: 'every'
        }
    },
    // 平移点要素
    move_point_feature: {
        inputLimit: {
            position: 'inside',
            taskData: 'every'
        }
    },
    // 线要素逆序
    reverse_order_line: {
        inputLimit: {
            position: 'inside',
            taskData: 'every'
        }
    },
    // 删除几何要素
    delete: {
        inputLimit: {
            taskData: 'every'
        }
    },
    // 强制删除要素
    force_delete: {
        inputLimit: {
            taskData: 'every'
        }
    },
    // 复制线要素
    copy_line: {
        inputLimit: {
            taskData: 'every'
        },
        outputLimit: {
            position: 'inside'
        }
    },
    // 打断线要素、齐打断线要素
    break_line: {
        inputLimit: {
            position: 'inside',
            taskData: 'every'
        }
    },
    // 拉线齐打断线要素
    break_line_by_line: {
        inputLimit: {
            position: 'inside',
            taskData: 'every'
        }
    },
    // 合并线要素
    merge_line: {
        inputLimit: {
            position: 'inside',
            taskData: 'every'
        }
    },
    // 批量合并线要素
    batch_merge_line: {
        inputLimit: {
            position: 'inside',
            taskData: 'every'
        }
    },
    // 左右车道线生成中心线
    new_around_line: {
        inputLimit: {
            taskData: 'atLastOne'
        },
        outputLimit: {
            position: 'inside'
        }
    },
    // 路口内直行中心线生成
    new_straight_line: {
        inputLimit: {
            taskData: 'atLastOne'
        },
        outputLimit: {
            position: 'inside'
        }
    },
    // 路口内转弯中心线生成
    new_turn_line: {
        inputLimit: {
            taskData: 'atLastOne'
        },
        outputLimit: {
            position: 'inside'
        }
    },
    // 掉头中心线生成
    new_Uturn_line: {
        inputLimit: {
            taskData: 'atLastOne'
        },
        outputLimit: {
            position: 'inside'
        }
    },
    //批量属性赋值
    batch_assign: {
        inputLimit: {
            taskData: 'every'
        }
    },
    // 批量赋车道编号
    assign_line_batch: {
        inputLimit: {
            taskData: 'every'
        }
    },
    // 线要素对齐到停止线，参考数据没有限制，被处理数据才有限制
    line_snap_stop: {
        inputLimit: {
            taskData: 'every',
            position: 'inside'
        },
        outputLimit: {
            position: 'inside'
        }
    },
    // 属性刷
    attribute_brush: {
        inputLimit: {
            taskData: 'every'
        }
    },
    // 新建关联关系
    new_rel: {
        inputLimit: {
            taskData: 'atLastOne'
        }
    }
};
//单点问题修正任务各操作输入、输出限制
export const MODIFY_TASK_EDIT_LIMIT = UPDATE_TASK_EDIT_LIMIT;

export const EDIT_LIMIT_MESSAGE = {
    input: {
        position: {
            inside: '输入数据必须完全位于任务范围内',
            outside: null
        },
        taskData: {
            every: '输入数据只能为任务数据',
            some: null,
            atLastOne: '输入数据至少一个为任务数据'
        }
    },
    output: {
        position: {
            inside: null,
            outside: null
        }
    }
};
