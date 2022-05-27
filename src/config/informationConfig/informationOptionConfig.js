const FILE_NAME_OPTIONS = [
    {
        value: 'AD_Road',
        label: '道路参考线'
    },
    {
        value: 'AD_LaneDivider',
        label: '车道线'
    },
    {
        value: 'AD_Lane',
        label: '车道中心线'
    },
    {
        value: 'AD_Arrow',
        label: '地面导向箭头'
    },
    {
        value: 'AD_StopLocation',
        label: '停止位置'
    },
    {
        value: 'AD_Text',
        label: '地面文字符号'
    },
    {
        value: 'AD_TrafficSign',
        label: '交通标志牌'
    },
    {
        value: 'AD_TrafficLight',
        label: '交通信号灯'
    },
    {
        value: 'AD_LaneDivider_Plg',
        label: '几何层：车道线面要素'
    },
    {
        value: 'AD_StopLocation_Geo',
        label: '几何层：停止位置'
    },
    {
        value: 'AD_LaneMark_Geo',
        label: '几何层：路面车道标记'
    },
    {
        value: 'AD_Pole_Geo',
        label: '几何层：杆状物'
    }
];

const ERROR_TYPE_OPTIONS = [
    {
        value: 0,
        label: '未定义'
    },
    {
        value: 101,
        label: '矢量数据遗漏'
    },
    {
        value: 102,
        label: '矢量数据错误'
    },
    {
        value: 103,
        label: '矢量数据多余'
    },
    {
        value: 203,
        label: '点云资料异常需补采'
    }
];

const ERROR_LEVEL_OPTIONS = [
    {
        value: 0,
        label: '一般'
    },
    {
        value: 1,
        label: '严重'
    }
];

export const INFOMATION_OPTION_CONFIG = {
    FILE_NAME_OPTIONS,
    ERROR_TYPE_OPTIONS,
    ERROR_LEVEL_OPTIONS
};
