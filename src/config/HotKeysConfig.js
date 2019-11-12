export const HOT_KEYS_CONFIG = {
    GENERAL_KEY: [
        //通用功能
        { value: 'Ctrl+S', label: '保存', hotkey: true, features: true },
        { value: 'Ctrl+Z', label: '撤销', hotkey: false, features: true },
        { value: 'Ctrl+Y', label: '恢复', hotkey: false, features: true },
        {
            value: '俯视图视角下，ctrl+鼠标左键拉框',
            label: '框选',
            hotkey: false,
            features: false
        },
        { value: 'Ctrl+F', label: '查询', hotkey: false, features: false },
        { value: 'Ctrl+P', label: '坐标拾取', hotkey: false, features: false }
    ],
    VIEW_ADJUST_KEY: [
        //视角调整
        { value: 'Ctrl+W', label: '缩放至全图', hotkey: false, features: true },
        { value: 'X', label: '俯视图模式', hotkey: false, features: true },
        {
            value: '鼠标滚轮上/下滚；W  S',
            label: '放大/缩小',
            hotkey: true,
            features: true
        },
        {
            value: '鼠标右键平移；A D Q E ',
            label: '视角平移',
            hotkey: true,
            features: true
        },
        {
            value: '鼠标左键视角旋转；方向键',
            label: '视角旋转',
            hotkey: true,
            features: true
        }
    ],
    SWITCH_KEY: [
        //开关图层
        { value: '1', label: '开关点云图层', hotkey: false, features: true },
        { value: '2', label: '开关高精地图图层', hotkey: false, features: true }
    ],
    EDITING_KEY: [
        //编辑功能
        {
            value: 'Alt+1',
            label: '添加点、线、面要素',
            hotkey: false,
            features: true
        },
        {
            value: 'Alt+2',
            label: '添加立面两点矩形',
            hotkey: false,
            features: true
        },
        {
            value: 'Alt+3',
            label: '添加立面多边形外接矩形',
            hotkey: false,
            features: true
        },
        {
            value: 'Alt+4',
            label: '添加立面三点圆 ',
            hotkey: false,
            features: true
        },
        {
            value: 'Alt+5',
            label: '添加地面矩形',
            hotkey: false,
            features: false
        },
        {
            value: '选中要素+ Delete',
            label: '删除要素',
            hotkey: false,
            features: false
        },
        { value: 'R', label: '新建关联关系', hotkey: false, features: true },
        {
            value: '选中要素+Alt+R',
            label: '删除关联关系',
            hotkey: false,
            features: true
        },
        {
            value: '选择 1 个要素+B+打断位置',
            label: '打断线要素',
            hotkey: false,
            features: true
        },
        {
            value: 'Ctrl 多选要素+B+ 打断位置',
            label: '齐打断线要素',
            hotkey: false,
            features: true
        },
        {
            value: 'Ctrl 多选要素+ A',
            label: '合并线要素',
            hotkey: false,
            features: true
        },
        {
            value: '选中要素+V',
            label: '修改形状点',
            hotkey: false,
            features: true
        },
        {
            value: '选中要素+F',
            label: '新增形状点',
            hotkey: false,
            features: true
        },
        {
            value: '选中要素+Alt+F',
            label: '删除形状点',
            hotkey: false,
            features: true
        },
        {
            value: '线、面绘制过程中+Z',
            label: '节点撤回',
            hotkey: false,
            features: false
        },
        { value: 'Esc', label: '退出编辑状态', hotkey: true, features: true },
        {
            value: '选择1个要素+I',
            label: '线要素逆序',
            hotkey: true,
            features: true
        }
    ],
    WINDOW_KEY: [
        //窗口开关
        { value: '3', label: '开关照片窗口', hotkey: false, features: false },
        { value: '4', label: '开关属性列表', hotkey: false, features: true },
        { value: '5', label: '开关检查列表', hotkey: false, features: true }
    ]
    // OTHER_KEY: [//其他交互
    //     { value: '窗口内对应按钮鼠标点击切换', label: '照片窗口-切换上一张/下一张照片', hotkey: true, features: true },
    //     { value: '窗口内鼠标滚轮上下滚 ', label: '照片窗口-图片缩放', hotkey: true, features: true }
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
