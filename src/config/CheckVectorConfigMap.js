export const CHECK_VECTOR_CONFIG_MAP = {
    AD_Road: {
        key: 'AD_Road',
        label: '道路参考线',
        checked: true,
        isClassify: true,
        type: 'Line',
        commonStyle: {
            showFields: 'TYPE',
            lineStyle: 'solid',
            color: 'rgb(30,170,106)',
            opacity: 1,
            arrow: true,
            point: true,
            pointEnabledStatus: true,
            arrowEnabledStatus: true,
            pointSize: 0.1
        },
        typeStyleMap: {
            TYPE: [
                {
                    value: 0,
                    label: '未定义',
                    showFields: 'TYPE',
                    lineStyle: 'solid',
                    color: 'rgb(30,170,106)',
                    opacity: 1,
                    arrow: true,
                    point: true,
                    pointEnabledStatus: true,
                    arrowEnabledStatus: true,
                    pointSize: 0.1
                },
                {
                    value: 1,
                    label: '实际道路参考线',
                    showFields: 'TYPE',
                    lineStyle: 'solid',
                    color: 'rgb(133,252,4)',
                    opacity: 1,
                    arrow: true,
                    point: true,
                    pointEnabledStatus: true,
                    arrowEnabledStatus: true,
                    pointSize: 0.1
                },
                {
                    value: 2,
                    label: '虚拟道路参考线',
                    showFields: 'TYPE',
                    lineStyle: 'solid',
                    color: 'rgb(255,0,0)',
                    opacity: 1,
                    arrow: true,
                    point: true,
                    pointEnabledStatus: true,
                    arrowEnabledStatus: true,
                    pointSize: 0.1
                }
            ],
            CROSSING: [
                {
                    value: 0,
                    label: '未定义',
                    showFields: 'CROSSING',
                    lineStyle: 'solid',
                    color: 'rgb(30,170,106)',
                    opacity: 1,
                    arrow: true,
                    point: true,
                    pointEnabledStatus: true,
                    arrowEnabledStatus: true,
                    pointSize: 0.1
                },
                {
                    value: 1,
                    label: '交叉路口内',
                    showFields: 'CROSSING',
                    lineStyle: 'solid',
                    color: 'rgb(198,0,176)',
                    opacity: 1,
                    arrow: true,
                    point: true,
                    pointEnabledStatus: true,
                    arrowEnabledStatus: true,
                    pointSize: 0.1
                },
                {
                    value: 2,
                    label: '非交叉路口内',
                    showFields: 'CROSSING',
                    lineStyle: 'solid',
                    color: 'rgb(133,252,4)',
                    opacity: 1,
                    arrow: true,
                    point: true,
                    pointEnabledStatus: true,
                    arrowEnabledStatus: true,
                    pointSize: 0.1
                }
            ]
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
        ],
        typeArr: [
            {
                key: 'TYPE',
                name: '参考线类型',
                type: 'AD_ROAD_TYPE',
                domType: 'RadioIconGroup'
            },
            {
                key: 'RD_CLASS',
                name: '道路等级',
                type: 'AD_ROAD_RD_CLASS',
                domType: 'Select'
            },
            {
                key: 'CROSSING',
                name: '交叉路口标识',
                type: 'AD_ROAD_CROSSING',
                domType: 'Select'
            },
            {
                key: 'RD_STATUS',
                name: '道路通行状态',
                type: 'AD_ROAD_RD_STATUS',
                domType: 'Select'
            },
            {
                key: 'RD_FORM',
                name: '道路形态',
                type: 'AD_ROAD_RD_FORM',
                domType: 'Select'
            },
            {
                key: 'DIRECTION',
                name: '道路通行方向',
                type: 'AD_ROAD_DIRECTION',
                domType: 'Select'
            }
        ]
    },
    AD_LaneDivider: {
        key: 'AD_LaneDivider',
        label: '车道线',
        checked: true,
        isClassify: true,
        type: 'Line',
        commonStyle: {
            showFields: 'RD_LINE',
            lineStyle: 'solid',
            color: 'rgb(255,255,255)',
            opacity: 1,
            arrow: true,
            point: true,
            pointEnabledStatus: true,
            arrowEnabledStatus: true,
            pointSize: 0.1
        },
        typeStyleMap: {
            RD_LINE: [
                {
                    value: 0,
                    label: '未定义',
                    showFields: 'RD_LINE',
                    color: 'rgb(255,255,255)',
                    lineStyle: 'solid',
                    opacity: 1,
                    arrow: true,
                    point: true,
                    pointEnabledStatus: true,
                    arrowEnabledStatus: true,
                    pointSize: 0.1
                },
                {
                    value: 1,
                    label: '道路参考线',
                    showFields: 'RD_LINE',
                    color: 'rgb(186,38,255)',
                    lineStyle: 'solid',
                    opacity: 1,
                    arrow: true,
                    point: true,
                    pointEnabledStatus: true,
                    arrowEnabledStatus: true,
                    pointSize: 0.1
                },
                {
                    value: 2,
                    label: '非道路参考线',
                    showFields: 'RD_LINE',
                    color: 'rgb(255,255,255)',
                    lineStyle: 'solid',
                    opacity: 1,
                    arrow: true,
                    point: true,
                    pointEnabledStatus: true,
                    arrowEnabledStatus: true,
                    pointSize: 0.1
                }
            ],
            SHARE_LINE: [
                {
                    value: 0,
                    label: '未定义',
                    showFields: 'SHARE_LINE',
                    color: 'rgb(255,255,255)',
                    lineStyle: 'solid',
                    opacity: 1,
                    arrow: true,
                    point: true,
                    pointEnabledStatus: true,
                    arrowEnabledStatus: true,
                    pointSize: 0.1
                },
                {
                    value: 1,
                    label: '非共用车道线',
                    showFields: 'SHARE_LINE',
                    color: 'rgb(255,255,255)',
                    lineStyle: 'solid',
                    opacity: 1,
                    arrow: true,
                    point: true,
                    pointEnabledStatus: true,
                    arrowEnabledStatus: true,
                    pointSize: 0.1
                },
                {
                    value: 2,
                    label: '逆向交通流共用车道线',
                    showFields: 'SHARE_LINE',
                    color: 'rgb(231,120,0)',
                    lineStyle: 'solid',
                    opacity: 1,
                    arrow: true,
                    point: true,
                    pointEnabledStatus: true,
                    arrowEnabledStatus: true,
                    pointSize: 0.1
                },
                {
                    value: 3,
                    label: '同向交通流共用车道线',
                    showFields: 'SHARE_LINE',
                    color: 'rgb(231,120,0)',
                    lineStyle: 'solid',
                    opacity: 1,
                    arrow: true,
                    point: true,
                    pointEnabledStatus: true,
                    arrowEnabledStatus: true,
                    pointSize: 0.1
                }
            ],
            RD_EDGE: [
                {
                    value: 0,
                    label: '未定义',
                    showFields: 'RD_EDGE',
                    color: 'rgb(255,255,255)',
                    lineStyle: 'solid',
                    opacity: 1,
                    arrow: true,
                    point: true,
                    pointEnabledStatus: true,
                    arrowEnabledStatus: true,
                    pointSize: 0.1
                },
                {
                    value: 1,
                    label: '道路边界',
                    showFields: 'RD_EDGE',
                    color: 'rgb(231,120,0)',
                    lineStyle: 'solid',
                    opacity: 1,
                    arrow: true,
                    point: true,
                    pointEnabledStatus: true,
                    arrowEnabledStatus: true,
                    pointSize: 0.1
                },
                {
                    value: 2,
                    label: '非道路边界',
                    showFields: 'RD_EDGE',
                    color: 'rgb(255,255,255)',
                    lineStyle: 'solid',
                    opacity: 1,
                    arrow: true,
                    point: true,
                    pointEnabledStatus: true,
                    arrowEnabledStatus: true,
                    pointSize: 0.1
                }
            ],
            TYPE: [
                {
                    value: 0,
                    label: '未定义',
                    showFields: 'TYPE',
                    color: 'rgb(125,219,30)',
                    lineStyle: 'solid',
                    opacity: 1,
                    arrow: true,
                    point: true,
                    pointEnabledStatus: true,
                    arrowEnabledStatus: true,
                    pointSize: 0.1
                },
                {
                    value: 1,
                    label: '单实线',
                    showFields: 'TYPE',
                    color: 'rgb(125,219,30)',
                    lineStyle: 'solid',
                    opacity: 1,
                    arrow: true,
                    point: true,
                    pointEnabledStatus: true,
                    arrowEnabledStatus: true,
                    pointSize: 0.1
                },
                {
                    value: 2,
                    label: '单虚线',
                    showFields: 'TYPE',
                    color: 'rgb(125,219,30)',
                    lineStyle: 'dashed',
                    dashSize: 0.5,
                    gapSize: 0.5,
                    opacity: 1,
                    arrow: true,
                    point: true,
                    pointEnabledStatus: true,
                    arrowEnabledStatus: true,
                    pointSize: 0.1
                },
                {
                    value: 3,
                    label: '双实线',
                    showFields: 'TYPE',
                    color: 'rgb(125,219,30)',
                    lineStyle: 'solid',
                    opacity: 1,
                    arrow: true,
                    point: true,
                    pointEnabledStatus: true,
                    arrowEnabledStatus: true,
                    pointSize: 0.1
                },
                {
                    value: 4,
                    label: '双虚线',
                    showFields: 'TYPE',
                    color: 'rgb(125,219,30)',
                    lineStyle: 'solid',
                    opacity: 1,
                    arrow: true,
                    point: true,
                    pointEnabledStatus: true,
                    arrowEnabledStatus: true,
                    pointSize: 0.1
                },
                {
                    value: 5,
                    label: '左实右虚',
                    showFields: 'TYPE',
                    color: 'rgb(80,225,195)',
                    lineStyle: 'solid',
                    opacity: 1,
                    arrow: true,
                    point: true,
                    pointEnabledStatus: true,
                    arrowEnabledStatus: true,
                    pointSize: 0.1
                },
                {
                    value: 6,
                    label: '左虚右实',
                    showFields: 'TYPE',
                    color: 'rgb(15,55,245)',
                    lineStyle: 'solid',
                    opacity: 1,
                    arrow: true,
                    point: true,
                    pointEnabledStatus: true,
                    arrowEnabledStatus: true,
                    pointSize: 0.1
                },
                {
                    value: 7,
                    label: '短粗虚线',
                    showFields: 'TYPE',
                    color: 'rgb(250,230,30)',
                    lineStyle: 'solid',
                    opacity: 1,
                    arrow: true,
                    point: true,
                    pointEnabledStatus: true,
                    arrowEnabledStatus: true,
                    pointSize: 0.1
                },
                {
                    value: 8,
                    label: '导流线',
                    showFields: 'TYPE',
                    color: 'rgb(245,165,35)',
                    lineStyle: 'solid',
                    opacity: 1,
                    arrow: true,
                    point: true,
                    pointEnabledStatus: true,
                    arrowEnabledStatus: true,
                    pointSize: 0.1
                },
                {
                    value: 9,
                    label: '车道虚拟车道线',
                    showFields: 'TYPE',
                    color: 'rgb(255,255,255)',
                    lineStyle: 'solid',
                    opacity: 1,
                    arrow: true,
                    point: true,
                    pointEnabledStatus: true,
                    arrowEnabledStatus: true,
                    pointSize: 0.1
                },
                {
                    value: 10,
                    label: '路边缘虚拟车道线',
                    showFields: 'TYPE',
                    color: 'rgb(125,219,30)',
                    lineStyle: 'solid',
                    opacity: 1,
                    arrow: true,
                    point: true,
                    pointEnabledStatus: true,
                    arrowEnabledStatus: true,
                    pointSize: 0.1
                },
                {
                    value: 11,
                    label: '防护栏',
                    showFields: 'TYPE',
                    color: 'rgb(210,0,30)',
                    lineStyle: 'solid',
                    opacity: 1,
                    arrow: true,
                    point: true,
                    pointEnabledStatus: true,
                    arrowEnabledStatus: true,
                    pointSize: 0.1
                },
                {
                    value: 12,
                    label: '隧道墙',
                    showFields: 'TYPE',
                    color: 'rgb(125,219,30)',
                    lineStyle: 'solid',
                    opacity: 1,
                    arrow: true,
                    point: true,
                    pointEnabledStatus: true,
                    arrowEnabledStatus: true,
                    pointSize: 0.1
                },
                {
                    value: 13,
                    label: '路缘石',
                    showFields: 'TYPE',
                    color: 'rgb(145,20,255)',
                    lineStyle: 'solid',
                    opacity: 1,
                    arrow: true,
                    point: true,
                    pointEnabledStatus: true,
                    arrowEnabledStatus: true,
                    pointSize: 0.1
                },
                {
                    value: 14,
                    label: '自然边界',
                    showFields: 'TYPE',
                    color: 'rgb(125,219,30)',
                    lineStyle: 'solid',
                    opacity: 1,
                    arrow: true,
                    point: true,
                    pointEnabledStatus: true,
                    arrowEnabledStatus: true,
                    pointSize: 0.1
                },
                {
                    value: 15,
                    label: '施工边界',
                    showFields: 'TYPE',
                    color: 'rgb(125,219,30)',
                    lineStyle: 'solid',
                    opacity: 1,
                    arrow: true,
                    point: true,
                    pointEnabledStatus: true,
                    arrowEnabledStatus: true,
                    pointSize: 0.1
                },
                {
                    value: 16,
                    label: '路中隔离带',
                    showFields: 'TYPE',
                    color: 'rgb(125,219,30)',
                    lineStyle: 'solid',
                    opacity: 1,
                    arrow: true,
                    point: true,
                    pointEnabledStatus: true,
                    arrowEnabledStatus: true,
                    pointSize: 0.1
                },
                {
                    value: 17,
                    label: '待转待行区车道线',
                    showFields: 'TYPE',
                    color: 'rgb(125,219,30)',
                    lineStyle: 'solid',
                    opacity: 1,
                    arrow: true,
                    point: true,
                    pointEnabledStatus: true,
                    arrowEnabledStatus: true,
                    pointSize: 0.1
                },
                {
                    value: 18,
                    label: '可变导向车道线',
                    showFields: 'TYPE',
                    color: 'rgb(125,219,30)',
                    lineStyle: 'solid',
                    opacity: 1,
                    arrow: true,
                    point: true,
                    pointEnabledStatus: true,
                    arrowEnabledStatus: true,
                    pointSize: 0.1
                },
                {
                    value: 19,
                    label: '路口内虚拟车道线',
                    showFields: 'TYPE',
                    color: 'rgb(125,219,30)',
                    lineStyle: 'solid',
                    opacity: 1,
                    arrow: true,
                    point: true,
                    pointEnabledStatus: true,
                    arrowEnabledStatus: true,
                    pointSize: 0.1
                },
                {
                    value: 20,
                    label: '其他虚拟车道线',
                    showFields: 'TYPE',
                    color: 'rgb(125,219,30)',
                    lineStyle: 'solid',
                    opacity: 1,
                    arrow: true,
                    point: true,
                    pointEnabledStatus: true,
                    arrowEnabledStatus: true,
                    pointSize: 0.1
                },
                {
                    value: 99,
                    label: '其他',
                    showFields: 'TYPE',
                    color: 'rgb(125,219,30)',
                    lineStyle: 'solid',
                    opacity: 1,
                    arrow: true,
                    point: true,
                    pointEnabledStatus: true,
                    arrowEnabledStatus: true,
                    pointSize: 0.1
                }
            ]
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
        ],
        typeArr: [
            {
                key: 'TYPE',
                name: '车道线类型',
                type: 'AD_LANE_DIVIDER_TYPE',
                domType: 'RadioIconGroup'
            },
            {
                key: 'RD_LINE',
                name: '道路参考线标识',
                type: 'AD_LANE_DIVIDER_RD_LINE',
                domType: 'Select'
            },
            {
                key: 'SHARE_LINE',
                name: '共用车道线标识',
                type: 'AD_LANE_DIVIDER_SHARE_LINE',
                domType: 'Select'
            },
            {
                key: 'RD_EDGE',
                name: '道路边界标识',
                type: 'AD_LANE_DIVIDER_RD_EDGE',
                domType: 'Select'
            },
            {
                key: 'DIRECTION',
                name: '车道通行方向',
                type: 'AD_LANE_DIVIDER_DIRECTION',
                domType: 'Select'
            },
            {
                key: 'LANE_STATUS',
                name: '车道通行状态',
                type: 'AD_LANE_DIVIDER_LANE_STATUS',
                domType: 'Select'
            },
            {
                key: 'LANE_TYPE',
                name: '车道类型',
                type: 'AD_LANE_DIVIDER_LANE_TYPE',
                domType: 'RadioIconGroup'
            },
            {
                key: 'RD_FORM',
                name: '道路形态',
                type: 'AD_LANE_DIVIDER_RD_FORM',
                domType: 'Select'
            }
        ]
    },
    AD_Lane: {
        key: 'AD_Lane',
        label: '车道中心线',
        checked: true,
        isClassify: true,
        type: 'Line',
        commonStyle: {
            showFields: 'TYPE',
            lineStyle: 'solid',
            color: 'rgb(255,237,37)',
            opacity: 1,
            arrow: true,
            point: true,
            pointEnabledStatus: true,
            arrowEnabledStatus: true,
            pointSize: 0.1
        },
        typeStyleMap: {
            TYPE: [
                {
                    value: 0,
                    label: '未定义',
                    showFields: 'TYPE',
                    lineStyle: 'solid',
                    color: 'rgb(255,237,37)',
                    opacity: 1,
                    arrow: true,
                    point: true,
                    pointEnabledStatus: true,
                    arrowEnabledStatus: true,
                    pointSize: 0.1
                },
                {
                    value: 1,
                    label: '普通车道',
                    showFields: 'TYPE',
                    lineStyle: 'solid',
                    color: 'rgb(255,237,37)',
                    opacity: 1,
                    arrow: true,
                    point: true,
                    pointEnabledStatus: true,
                    arrowEnabledStatus: true,
                    pointSize: 0.1
                },
                {
                    value: 2,
                    label: '路口车道',
                    showFields: 'TYPE',
                    lineStyle: 'dashed',
                    dashSize: 0.5,
                    gapSize: 0.5,
                    color: 'rgb(255,237,37)',
                    opacity: 1,
                    arrow: true,
                    point: true,
                    pointEnabledStatus: true,
                    arrowEnabledStatus: true,
                    pointSize: 0.1
                },
                {
                    value: 3,
                    label: '应急车道',
                    showFields: 'TYPE',
                    lineStyle: 'solid',
                    color: 'rgb(255,237,37)',
                    opacity: 1,
                    arrow: true,
                    point: true,
                    pointEnabledStatus: true,
                    arrowEnabledStatus: true,
                    pointSize: 0.1
                },
                {
                    value: 4,
                    label: '非机动车道',
                    showFields: 'TYPE',
                    lineStyle: 'solid',
                    color: 'rgb(255,237,37)',
                    opacity: 1,
                    arrow: true,
                    point: true,
                    pointEnabledStatus: true,
                    arrowEnabledStatus: true,
                    pointSize: 0.1
                },
                {
                    value: 5,
                    label: '机非混合车道',
                    showFields: 'TYPE',
                    lineStyle: 'solid',
                    color: 'rgb(255,237,37)',
                    opacity: 1,
                    arrow: true,
                    point: true,
                    pointEnabledStatus: true,
                    arrowEnabledStatus: true,
                    pointSize: 0.1
                },
                {
                    value: 6,
                    label: '公交车道',
                    showFields: 'TYPE',
                    lineStyle: 'solid',
                    color: 'rgb(255,237,37)',
                    opacity: 1,
                    arrow: true,
                    point: true,
                    pointEnabledStatus: true,
                    arrowEnabledStatus: true,
                    pointSize: 0.1
                },
                {
                    value: 7,
                    label: '右转专用道',
                    showFields: 'TYPE',
                    lineStyle: 'solid',
                    color: 'rgb(255,237,37)',
                    opacity: 1,
                    arrow: true,
                    point: true,
                    pointEnabledStatus: true,
                    arrowEnabledStatus: true,
                    pointSize: 0.1
                },
                {
                    value: 8,
                    label: 'ETC车道',
                    showFields: 'TYPE',
                    lineStyle: 'solid',
                    color: 'rgb(255,237,37)',
                    opacity: 1,
                    arrow: true,
                    point: true,
                    pointEnabledStatus: true,
                    arrowEnabledStatus: true,
                    pointSize: 0.1
                },
                {
                    value: 9,
                    label: '收费站车道',
                    showFields: 'TYPE',
                    lineStyle: 'solid',
                    color: 'rgb(255,237,37)',
                    opacity: 1,
                    arrow: true,
                    point: true,
                    pointEnabledStatus: true,
                    arrowEnabledStatus: true,
                    pointSize: 0.1
                },
                {
                    value: 10,
                    label: '左转专用道',
                    showFields: 'TYPE',
                    lineStyle: 'solid',
                    color: 'rgb(255,237,37)',
                    opacity: 1,
                    arrow: true,
                    point: true,
                    pointEnabledStatus: true,
                    arrowEnabledStatus: true,
                    pointSize: 0.1
                },
                {
                    value: 11,
                    label: '右侧加速车道',
                    showFields: 'TYPE',
                    lineStyle: 'solid',
                    color: 'rgb(255,237,37)',
                    opacity: 1,
                    arrow: true,
                    point: true,
                    pointEnabledStatus: true,
                    arrowEnabledStatus: true,
                    pointSize: 0.1
                },
                {
                    value: 12,
                    label: '右侧减速车道',
                    showFields: 'TYPE',
                    lineStyle: 'solid',
                    color: 'rgb(255,237,37)',
                    opacity: 1,
                    arrow: true,
                    point: true,
                    pointEnabledStatus: true,
                    arrowEnabledStatus: true,
                    pointSize: 0.1
                },
                {
                    value: 13,
                    label: '匝道',
                    showFields: 'TYPE',
                    lineStyle: 'solid',
                    color: 'rgb(255,237,37)',
                    opacity: 1,
                    arrow: true,
                    point: true,
                    pointEnabledStatus: true,
                    arrowEnabledStatus: true,
                    pointSize: 0.1
                },
                {
                    value: 15,
                    label: '紧急停车道',
                    showFields: 'TYPE',
                    lineStyle: 'solid',
                    color: 'rgb(255,237,37)',
                    opacity: 1,
                    arrow: true,
                    point: true,
                    pointEnabledStatus: true,
                    arrowEnabledStatus: true,
                    pointSize: 0.1
                },
                {
                    value: 16,
                    label: 'HOV车道',
                    showFields: 'TYPE',
                    lineStyle: 'solid',
                    color: 'rgb(255,237,37)',
                    opacity: 1,
                    arrow: true,
                    point: true,
                    pointEnabledStatus: true,
                    arrowEnabledStatus: true,
                    pointSize: 0.1
                },
                {
                    value: 19,
                    label: '可变导向车道',
                    showFields: 'TYPE',
                    lineStyle: 'solid',
                    color: 'rgb(255,237,37)',
                    opacity: 1,
                    arrow: true,
                    point: true,
                    pointEnabledStatus: true,
                    arrowEnabledStatus: true,
                    pointSize: 0.1
                },
                {
                    value: 21,
                    label: '避险车道引道',
                    showFields: 'TYPE',
                    lineStyle: 'solid',
                    color: 'rgb(255,237,37)',
                    opacity: 1,
                    arrow: true,
                    point: true,
                    pointEnabledStatus: true,
                    arrowEnabledStatus: true,
                    pointSize: 0.1
                },
                {
                    value: 22,
                    label: '停车道',
                    showFields: 'TYPE',
                    lineStyle: 'solid',
                    color: 'rgb(255,237,37)',
                    opacity: 1,
                    arrow: true,
                    point: true,
                    pointEnabledStatus: true,
                    arrowEnabledStatus: true,
                    pointSize: 0.1
                },
                {
                    value: 23,
                    label: '潮汐车道',
                    showFields: 'TYPE',
                    lineStyle: 'solid',
                    color: 'rgb(255,237,37)',
                    opacity: 1,
                    arrow: true,
                    point: true,
                    pointEnabledStatus: true,
                    arrowEnabledStatus: true,
                    pointSize: 0.1
                },
                {
                    value: 24,
                    label: '左转待转车道',
                    showFields: 'TYPE',
                    lineStyle: 'solid',
                    color: 'rgb(255,237,37)',
                    opacity: 1,
                    arrow: true,
                    point: true,
                    pointEnabledStatus: true,
                    arrowEnabledStatus: true,
                    pointSize: 0.1
                },
                {
                    value: 25,
                    label: '直行待行车道',
                    showFields: 'TYPE',
                    lineStyle: 'solid',
                    color: 'rgb(255,237,37)',
                    opacity: 1,
                    arrow: true,
                    point: true,
                    pointEnabledStatus: true,
                    arrowEnabledStatus: true,
                    pointSize: 0.1
                },
                {
                    value: 26,
                    label: '掉头车道',
                    showFields: 'TYPE',
                    lineStyle: 'solid',
                    color: 'rgb(255,237,37)',
                    opacity: 1,
                    arrow: true,
                    point: true,
                    pointEnabledStatus: true,
                    arrowEnabledStatus: true,
                    pointSize: 0.1
                },
                {
                    value: 28,
                    label: '服务区车道',
                    showFields: 'TYPE',
                    lineStyle: 'solid',
                    color: 'rgb(255,237,37)',
                    opacity: 1,
                    arrow: true,
                    point: true,
                    pointEnabledStatus: true,
                    arrowEnabledStatus: true,
                    pointSize: 0.1
                },
                {
                    value: 29,
                    label: '左侧加速车道',
                    showFields: 'TYPE',
                    lineStyle: 'solid',
                    color: 'rgb(255,237,37)',
                    opacity: 1,
                    arrow: true,
                    point: true,
                    pointEnabledStatus: true,
                    arrowEnabledStatus: true,
                    pointSize: 0.1
                },
                {
                    value: 30,
                    label: '左侧减速车道',
                    showFields: 'TYPE',
                    lineStyle: 'solid',
                    color: 'rgb(255,237,37)',
                    opacity: 1,
                    arrow: true,
                    point: true,
                    pointEnabledStatus: true,
                    arrowEnabledStatus: true,
                    pointSize: 0.1
                },
                {
                    value: 31,
                    label: '加减速复合车道',
                    showFields: 'TYPE',
                    lineStyle: 'solid',
                    color: 'rgb(255,237,37)',
                    opacity: 1,
                    arrow: true,
                    point: true,
                    pointEnabledStatus: true,
                    arrowEnabledStatus: true,
                    pointSize: 0.1
                },
                {
                    value: 99,
                    label: '其他',
                    showFields: 'TYPE',
                    lineStyle: 'solid',
                    color: 'rgb(255,237,37)',
                    opacity: 1,
                    arrow: true,
                    point: true,
                    pointEnabledStatus: true,
                    arrowEnabledStatus: true,
                    pointSize: 0.1
                }
            ]
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
        ],
        typeArr: [
            {
                key: 'TYPE',
                name: '车道类型',
                type: 'AD_LANE_TYPE',
                domType: 'RadioIconGroup'
            },
            {
                key: 'DIRECTION',
                name: '车道通行方向',
                type: 'AD_LANE_DIRECTION',
                domType: 'Select'
            },
            {
                key: 'STATUS',
                name: '车道通行状态',
                type: 'AD_LANE_STATUS',
                domType: 'Select'
            },
            {
                key: 'MAX_SP_TYP',
                name: '最高速度来源',
                type: 'AD_LANE_MAX_SP_TYP',
                domType: 'Select'
            },
            {
                key: 'MIN_SP_TYP',
                name: '最低速度来源',
                type: 'AD_LANE_MIN_SP_TYP',
                domType: 'Select'
            }
        ]
    },
    AD_LaneAttrPoint: {
        key: 'AD_LaneAttrPoint',
        label: '车道属性变化点',
        checked: false,
        isClassify: true,
        type: 'Point',
        commonStyle: {
            showFields: 'TYPE',
            color: 'rgb(102,255,102)',
            opacity: 1,
            radius: 0.15,
            size: 80,
            pointStyle: 'dianyaosu'
        },
        fieldStyle: {
            colorFieldSize: 28,
            colorFieldIcon: 'dianyaosu',
            styleFieldSize: 18
        },
        pointIconOptionArr: [
            { key: 'dianyaosu', icon: 'dianyaosu' },
            { key: 'dianfuhao', icon: 'dianfuhao' },
            { key: 'dianfuhao1', icon: 'dianfuhao1' },
            { key: 'dianfuhao2', icon: 'dianfuhao2' },
            { key: 'dianfuhao3', icon: 'dianfuhao3' },
            { key: 'dianfuhao4', icon: 'dianfuhao4' },
            { key: 'dianfuhao5', icon: 'dianfuhao5' },
            { key: 'dianfuhao6', icon: 'dianfuhao6' },
            { key: 'dianfuhao7', icon: 'dianfuhao7' },
            { key: 'dianfuhao8', icon: 'dianfuhao8' }
        ],
        typeArr: [
            {
                key: 'TYPE',
                name: '属性变化点类型',
                type: 'AD_LANE_ATTRPOINT_TYPE',
                domType: 'RadioIconGroup'
            }
        ]
    },
    AD_Arrow: {
        key: 'AD_Arrow',
        label: '地面导向箭头',
        checked: false,
        isClassify: true,
        type: 'Polygon',
        commonStyle: {
            showFields: 'ARR_DIRECT',
            polygonStyle: 'solid',
            color: 'rgb(255,255,255)',
            opacity: 1
        },
        fieldStyle: {
            colorFieldSize: 26,
            colorFieldIcon: 'mianyaosu'
        },
        styleOptionArr: [
            { key: 'solid', icon: 'zhixiankuang' },
            { key: 'dashed', icon: 'xuxiankuang' },
            { key: 'dashed1', icon: 'xuxiankuang1' },
            { key: 'dashed2', icon: 'xuxiankuang2' },
            { key: 'dashed3', icon: 'xuxiankuang3' }
        ],
        typeArr: [
            {
                key: 'ARR_DIRECT',
                name: '箭头方向',
                type: 'AD_ARROW_ARR_DIRECT',
                domType: 'CheckBoxIconGroup'
            }
        ]
    },
    AD_StopLocation: {
        key: 'AD_StopLocation',
        label: '停止位置',
        checked: false,
        isClassify: true,
        type: 'Line',
        commonStyle: {
            showFields: 'TYPE',
            lineStyle: 'solid',
            color: 'rgb(255,150,150)',
            opacity: 1,
            arrow: false,
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
        ],
        typeArr: [
            {
                key: 'TYPE',
                name: '停车线类型',
                type: 'AD_STOPLOCATION_TYPE',
                domType: 'RadioIconGroup'
            }
        ]
    },
    AD_TrafficLight: {
        key: 'AD_TrafficLight',
        label: '交通信号灯',
        checked: false,
        isClassify: false,
        type: 'Polygon',
        commonStyle: {
            showFields: 'NOKEY',
            polygonStyle: 'solid',
            color: 'rgb(231,120,0)',
            opacity: 1
        },
        fieldStyle: {
            colorFieldSize: 26,
            colorFieldIcon: 'mianyaosu'
        },
        styleOptionArr: [
            { key: 'solid', icon: 'zhixiankuang' },
            { key: 'dashed', icon: 'xuxiankuang' },
            { key: 'dashed1', icon: 'xuxiankuang1' },
            { key: 'dashed2', icon: 'xuxiankuang2' },
            { key: 'dashed3', icon: 'xuxiankuang3' }
        ]
    },
    AD_RS_Barrier: {
        key: 'AD_RS_Barrier',
        label: '隔离带、护栏',
        checked: false,
        isClassify: true,
        type: 'Line',
        commonStyle: {
            showFields: 'TYPE',
            lineStyle: 'solid',
            color: 'rgb(70,109,255)',
            opacity: 1,
            arrow: false,
            point: true,
            pointEnabledStatus: true,
            arrowEnabledStatus: true,
            pointSize: 0.1
        },
        typeStyleMap: {
            TYPE: [
                {
                    value: 0,
                    label: '未定义',
                    showFields: 'TYPE',
                    lineStyle: 'solid',
                    color: 'rgb(70,109,255)',
                    opacity: 1,
                    arrow: false,
                    point: true,
                    pointEnabledStatus: true,
                    arrowEnabledStatus: true,
                    pointSize: 0.1
                },
                {
                    value: 1,
                    label: '隧道墙',
                    showFields: 'TYPE',
                    lineStyle: 'solid',
                    color: 'rgb(70,109,255)',
                    opacity: 1,
                    arrow: false,
                    point: true,
                    pointEnabledStatus: true,
                    arrowEnabledStatus: true,
                    pointSize: 0.1
                },
                {
                    value: 2,
                    label: '路侧防护栏',
                    showFields: 'TYPE',
                    lineStyle: 'solid',
                    color: 'rgb(11,180,169)',
                    opacity: 1,
                    arrow: false,
                    point: true,
                    pointEnabledStatus: true,
                    arrowEnabledStatus: true,
                    pointSize: 0.3
                },
                {
                    value: 3,
                    label: '路缘石',
                    showFields: 'TYPE',
                    lineStyle: 'solid',
                    color: 'rgb(39,238,4)',
                    opacity: 1,
                    arrow: false,
                    point: true,
                    pointEnabledStatus: true,
                    arrowEnabledStatus: true,
                    pointSize: 0.3
                },
                {
                    value: 4,
                    label: '隔音墙',
                    showFields: 'TYPE',
                    lineStyle: 'solid',
                    color: 'rgb(70,109,169)',
                    opacity: 1,
                    arrow: false,
                    point: true,
                    pointEnabledStatus: true,
                    arrowEnabledStatus: true,
                    pointSize: 0.1
                },
                {
                    value: 5,
                    label: '其他墙体',
                    showFields: 'TYPE',
                    lineStyle: 'solid',
                    color: 'rgb(70,109,255)',
                    opacity: 1,
                    arrow: false,
                    point: true,
                    pointEnabledStatus: true,
                    arrowEnabledStatus: true,
                    pointSize: 0.1
                },
                {
                    value: 6,
                    label: '道路轮廓标',
                    showFields: 'TYPE',
                    lineStyle: 'solid',
                    color: 'rgb(211,207,24)',
                    opacity: 1,
                    arrow: false,
                    point: true,
                    pointEnabledStatus: true,
                    arrowEnabledStatus: true,
                    pointSize: 0.1
                }
            ]
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
        ],
        typeArr: [
            {
                key: 'TYPE',
                name: '护栏类型',
                type: 'AD_RS_BARRIER_TYPE',
                domType: 'RadioIconGroup'
            },
            {
                key: 'MATERIAL',
                name: '护栏材质',
                type: 'AD_RS_BARRIER_MATERIAL',
                domType: 'Select'
            }
        ]
    },
    AD_Text: {
        key: 'AD_Text',
        label: '地面文字符号',
        checked: false,
        isClassify: true,
        type: 'Polygon',
        commonStyle: {
            showFields: 'CONT_TYPE',
            polygonStyle: 'solid',
            color: 'rgb(255,234,149)',
            opacity: 1
        },
        fieldStyle: {
            colorFieldSize: 26,
            colorFieldIcon: 'mianyaosu'
        },
        styleOptionArr: [
            { key: 'solid', icon: 'zhixiankuang' },
            { key: 'dashed', icon: 'xuxiankuang' },
            { key: 'dashed1', icon: 'xuxiankuang1' },
            { key: 'dashed2', icon: 'xuxiankuang2' },
            { key: 'dashed3', icon: 'xuxiankuang3' }
        ],
        typeArr: [
            {
                key: 'CONT_TYPE',
                name: '文本语义类型',
                type: 'AD_TEXT_CONT_TYPE'
            },
            {
                key: 'VEH_LMT',
                name: '车辆限制描述',
                type: 'AD_TEXT_VEH_LMT'
            }
        ]
    },
    AD_TrafficSign: {
        key: 'AD_TrafficSign',
        label: '交通标志牌',
        checked: false,
        isClassify: true,
        type: 'Polygon',
        commonStyle: {
            showFields: 'SIGN_STYLE',
            polygonStyle: 'solid',
            color: 'rgb(70,109,255)',
            opacity: 1
        },
        fieldStyle: {
            colorFieldSize: 26,
            colorFieldIcon: 'mianyaosu'
        },
        styleOptionArr: [
            { key: 'solid', icon: 'zhixiankuang' },
            { key: 'dashed', icon: 'xuxiankuang' },
            { key: 'dashed1', icon: 'xuxiankuang1' },
            { key: 'dashed2', icon: 'xuxiankuang2' },
            { key: 'dashed3', icon: 'xuxiankuang3' }
        ],
        typeArr: [
            {
                key: 'SIGN_STYLE',
                name: '交通标志牌样式',
                type: 'AD_TRAFFIC_SIGN_STYLE',
                domType: 'Select'
            }
        ]
    },
    AD_LaneDivider_Plg: {
        key: 'AD_LaneDivider_Plg',
        label: '几何层：车道线面要素',
        checked: false,
        isClassify: true,
        type: 'Polygon',
        commonStyle: {
            showFields: 'FEAT_TYPE',
            polygonStyle: 'solid',
            color: 'rgb(0,255,160)',
            opacity: 1
        },
        fieldStyle: {
            colorFieldSize: 26,
            colorFieldIcon: 'mianyaosu'
        },
        styleOptionArr: [
            { key: 'solid', icon: 'zhixiankuang' },
            { key: 'dashed', icon: 'xuxiankuang' },
            { key: 'dashed1', icon: 'xuxiankuang1' },
            { key: 'dashed2', icon: 'xuxiankuang2' },
            { key: 'dashed3', icon: 'xuxiankuang3' }
        ],
        typeArr: [
            {
                key: 'FEAT_TYPE',
                name: '要素子类型',
                type: 'AD_LANE_DIVIDER_PLG_FEAT_TYPE',
                domType: 'RadioIconGroup'
            }
        ]
    },
    AD_StopLocation_Geo: {
        key: 'AD_StopLocation_Geo',
        label: '几何层：停止位置',
        checked: false,
        isClassify: true,
        type: 'Polygon',
        commonStyle: {
            showFields: 'FEAT_TYPE',
            polygonStyle: 'solid',
            color: 'rgb(137,195,255)',
            opacity: 1
        },
        fieldStyle: {
            colorFieldSize: 26,
            colorFieldIcon: 'mianyaosu'
        },
        styleOptionArr: [
            { key: 'solid', icon: 'zhixiankuang' },
            { key: 'dashed', icon: 'xuxiankuang' },
            { key: 'dashed1', icon: 'xuxiankuang1' },
            { key: 'dashed2', icon: 'xuxiankuang2' },
            { key: 'dashed3', icon: 'xuxiankuang3' }
        ],
        typeArr: [
            {
                key: 'FEAT_TYPE',
                name: '要素子类型',
                type: 'AD_STOPLOCATION_GEO_FEAT_TYPE',
                domType: 'RadioIconGroup'
            }
        ]
    },
    AD_LaneMark_Geo: {
        key: 'AD_LaneMark_Geo',
        label: '几何层：路面车道标记',
        checked: false,
        isClassify: true,
        type: 'Polygon',
        commonStyle: {
            showFields: 'FEAT_TYPE',
            polygonStyle: 'solid',
            color: 'rgb(147,112,219)',
            opacity: 1
        },
        fieldStyle: {
            colorFieldSize: 26,
            colorFieldIcon: 'mianyaosu'
        },
        styleOptionArr: [
            { key: 'solid', icon: 'zhixiankuang' },
            { key: 'dashed', icon: 'xuxiankuang' },
            { key: 'dashed1', icon: 'xuxiankuang1' },
            { key: 'dashed2', icon: 'xuxiankuang2' },
            { key: 'dashed3', icon: 'xuxiankuang3' }
        ],
        typeArr: [
            {
                key: 'FEAT_TYPE',
                name: '要素子类型',
                type: 'AD_LANEMARK_GEO_FEAT_TYPE',
                domType: 'RadioIconGroup'
            }
        ]
    },
    AD_Pole_Geo: {
        key: 'AD_Pole_Geo',
        label: '几何层：杆状物',
        checked: false,
        isClassify: false,
        type: 'Line',
        commonStyle: {
            showFields: 'NOKEY',
            polygonStyle: 'solid',
            color: 'rgb(238,209,11)',
            opacity: 1,
            arrow: false,
            point: false,
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
};
