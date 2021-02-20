export const HOT_KEYS_CONFIG = {
    GENERAL_KEY: [
        //通用功能
        { value: 'Ctrl+S', label: '保存' },
        { value: 'Ctrl+Z', label: '撤销' },
        { value: 'Ctrl+Y', label: '恢复' },
        {
            value: '俯视图视角下，Ctrl+鼠标左键拉框',
            label: '框选'
        },
        // { value: 'Ctrl+F', label: '查询' },
        // { value: 'Ctrl+P', label: '坐标拾取' },
        { value: 'L', label: '测距' }
    ],
    VIEW_ADJUST_KEY: [
        //视角调整
        { value: 'Ctrl+G', label: '缩放至全图' },
        { value: 'X', label: '俯视图模式' },
        {
            value: 'W（放大）、S（缩小）',
            label: '放大/缩小'
        },
        {
            value: '-（减小）、+（增大）',
            label: '增大/降低步幅'
        },

        {
            value: 'A（左移）、D（右移）、Q（下移）、E（上移）',
            label: '视角平移'
        },
        {
            value: '←（左旋）、→（右旋）、↑（向上翻转）、↓（向下翻转）',
            label: '视角旋转'
        }
    ],
    SWITCH_KEY: [
        //开关图层
        { value: '1', label: '开关点云图层' },
        { value: '2', label: '开关高精地图图层' },
        { value: 'Ctrl+2', label: '开关周边底图图层' },
        { value: '3', label: '开关轨迹图层' },
        { value: '8', label: '开关置信度分区图层' },
        { value: '9', label: '开关质检标注图层' },
        { value: '0', label: '开关检查结果图层' }
    ],
    EDITING_KEY: [
        //编辑功能
        {
            value: '选择1个要素+ F',
            label: '设置为可编辑图层'
        },
        {
            value: 'H',
            label: '联合打断'
        },
        {
            value: 'Alt+1',
            label: '绘制点、折线、面要素'
        },
        {
            value: 'Alt+2',
            label: '绘制两点立面矩形、曲线'
        },
        {
            value: 'Alt+3',
            label: '绘制任意外接立面矩形'
        },
        {
            value: 'Alt+4',
            label: '绘制地面矩形'
        },
        {
            value: 'Alt+5',
            label: '绘制三点圆形'
        },
        {
            value: '选择1个要素+Delete',
            label: '删除要素'
        },
        {
            value: '选择1个要素+Ctrl+Delete',
            label: '强制删除要素'
        },
        { value: 'R', label: '新建关联关系' },
        {
            value: '选择1个要素+Alt+R',
            label: '删除关联关系'
        },
        {
            value: '选择1个要素+C',
            label: '复制线要素'
        },
        {
            value: '选择1个要素+T',
            label: '平移点要素'
        },
        {
            value: '选择 1 个要素+B+打断位置',
            label: '打断线要素'
        },
        {
            value: 'Ctrl 多选要素+B+打断位置',
            label: '齐打断线要素'
        },
        {
            value: 'Ctrl多选要素+N+打断位置',
            label: '拉线齐打断线要素'
        },
        {
            value: 'Ctrl选择2个要素+M',
            label: '合并线要素'
        },
        {
            value: 'Ctrl 多选要素+M',
            label: '批量合并线要素'
        },
        {
            value: '选择1个要素+I',
            label: '线要素逆序'
        },
        {
            value: '选择1个要素+J',
            label: '修整线要素'
        },
        {
            value: '修整线要素进行中+Space',
            label: '吸附到线要素'
        },
        {
            value: '修整线要素未开始绘制时+Alt+J',
            label: '切换曲线修复或折线修复'
        },
        {
            value: '选择1个要素+V',
            label: '修改形状点'
        },
        {
            value: '选择1个或多个车道线+O',
            label: '批量生成车道线'
        },
        {
            value: '选择1个要素+U',
            label: '位姿调整'
        },
        {
            value: '线、面绘制过程中+Z',
            label: '节点撤回'
        },
        {
            value: '选择1个要素+Y',
            label: '属性刷'
        },
        {
            value: '选择多个要素+K',
            label: '批量赋值'
        },
        { value: 'Esc', label: '退出编辑状态' }
    ],
    WINDOW_KEY: [
        //窗口开关
        { value: '4', label: '开关照片窗口' },
        { value: '5', label: '开关属性列表' },
        { value: '6', label: '开关检查结果列表' },
        { value: '7', label: '开关质检标注列表' }
    ]
    // OTHER_KEY: [//其他交互
    //     { value: '窗口内对应按钮鼠标点击切换', label: '照片窗口-切换上一张/下一张照片' },
    //     { value: '窗口内鼠标滚轮上下滚 ', label: '照片窗口-图片缩放' }
    // ],
};

export const HOT_KEYS_TITLE = [
    {
        title: '通用功能',
        dataIndex: 'GENERAL_KEY'
    },
    {
        title: '视角调整',
        dataIndex: 'VIEW_ADJUST_KEY'
    },
    {
        title: '开关图层',
        dataIndex: 'SWITCH_KEY'
    },
    {
        title: '编辑功能',
        dataIndex: 'EDITING_KEY'
    },
    {
        title: '窗口开关',
        dataIndex: 'WINDOW_KEY'
    }
    // , {
    //     title: '其他交互',
    //     dataIndex: 'OTHER_KEY'
    // }
];
