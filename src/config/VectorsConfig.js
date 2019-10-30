export default {
    title: 'Data Specification',
    version: 'v2.0.0',

    textureLayers: {
        0: 'AD_LANEDIVIDER',
        1: 'AD_LANE',
        2: 'AD_TRAFFICSIGN',
        3: 'AD_LANEMARK_PLG',
        4: 'AD_STOPLOCATION',
        5: 'AD_TRAFFICLIGHT'
    },

    // 严格按照数据规格默认图层
    LayerSpecification: [
        'AD_Road',

        'AD_LaneDivider',
        'AD_Lane',
        'AD_LaneAttrPoint',
        'AD_Arrow',
        'AD_StopLocation',
        'AD_LaneMark_Plg',
        'AD_Text',

        'AD_TrafficSign',
        'AD_TrafficLight',
        'AD_Pole',
        'AD_RS_Barrier',

        'AD_Map_QC'
    ],

    layers: {
        AD_ROAD: {
            type: 'Line',
            filter: ['TYPE'],
            order: 15,
            showFirstLastPoint: true
        },
        AD_LANEDIVIDER: {
            type: 'Line',
            filter: ['TYPE', 'SHARE_LINE'],
            order: 14,
            showFirstLastPoint: true
        },
        AD_LANE: {
            type: 'Line',
            filter: ['TYPE'],
            order: 13,
            showFirstLastPoint: true
        },
        AD_LANE_SHAPE: { type: 'Line', filter: [], order: 12 },
        AD_LANEATTRPOINT: { type: 'Point', filter: ['TYPE'], order: 11 },
        AD_ARROW: { type: 'Polygon', filter: ['ARR_DIRECT'], order: 10 },
        AD_STOPLOCATION: { type: 'Line', filter: ['TYPE'], order: 9 },
        AD_LANEMARK_PLG: { type: 'Polygon', filter: ['TYPE'], order: 8 },
        AD_TEXT: { type: 'Polygon', filter: ['TYPE'], order: 7 },

        AD_TRAFFICSIGN: { type: 'Polygon', filter: ['SIGN_STYPE'], order: 6 },
        AD_TRAFFICLIGHT: { type: 'Polygon', filter: ['TYPE'], order: 5 },
        AD_POLE: { type: 'Line', filter: ['TYPE'], order: 4 },
        AD_RS_BARRIER: {
            type: 'Line',
            filter: ['TYPE'],
            order: 3,
            showFirstLastPoint: true
        },

        AD_MAP_QC: { type: 'Point', filter: ['TYPE'], order: 2 }
    },

    styles: {
        AD_ROAD_TYPE: [
            {
                value: 0,
                label: '未定义',
                style: { color: 'rgb(144,238,144)', linewidth: 1 }
            },
            { value: 1, label: '实际道路参考线' },
            { value: 2, label: '虚拟道路参考线' }
        ],

        AD_LANEDIVIDER_TYPE: [
            {
                value: 0,
                label: '未定义',
                style: { color: 'rgb(255,250,250)', linewidth: 1 }
            },
            {
                value: 1,
                label: '单实线',
                style: { color: 'rgb(255,250,250)', linewidth: 1 }
            },
            {
                value: 2,
                label: '单虚线',
                style: { color: 'rgb(255,250,250)', dashSize: 1, gapSize: 1 }
            },
            {
                value: 3,
                label: '双实线',
                style: { color: 'rgb(255,250,250)', linewidth: 1 }
            },
            {
                value: 4,
                label: '双虚线',
                style: { color: 'rgb(255,250,250)', linewidth: 1 }
            },
            {
                value: 5,
                label: '左实右虚',
                style: { color: 'rgb(255,250,250)', linewidth: 1 }
            },
            {
                value: 6,
                label: '左虚右实',
                style: { color: 'rgb(255,250,250)', linewidth: 1 }
            },
            {
                value: 7,
                label: '短粗虚线',
                style: { color: 'rgb(255,250,250)', linewidth: 1 }
            },
            {
                value: 8,
                label: '导流线',
                style: { color: 'rgb(255,250,250)', linewidth: 1 }
            },
            {
                value: 9,
                label: '车道虚拟车道线',
                style: { color: 'rgb(255,250,250)', linewidth: 1 }
            },
            {
                value: 10,
                label: '路边缘虚拟车道线',
                style: { color: 'rgb(255,250,250)', linewidth: 1 }
            },
            {
                value: 11,
                label: '路测防护栏',
                style: { color: 'rgb(255,250,250)', linewidth: 1 }
            },
            {
                value: 12,
                label: '隧道墙',
                style: { color: 'rgb(255,250,250)', linewidth: 1 }
            },
            {
                value: 13,
                label: '路石、路缘石',
                style: { color: 'rgb(255,250,250)', linewidth: 1 }
            },
            {
                value: 14,
                label: '自然边界',
                style: { color: 'rgb(255,250,250)', linewidth: 1 }
            },
            {
                value: 15,
                label: '施工边界',
                style: { color: 'rgb(255,250,250)', linewidth: 1 }
            },
            {
                value: 16,
                label: '路中隔离带',
                style: { color: 'rgb(255,250,250)', linewidth: 1 }
            },
            {
                value: 17,
                label: '待转待行区车道线',
                style: { color: 'rgb(255,250,250)', linewidth: 1 }
            },
            {
                value: 18,
                label: '可变导向车道线',
                style: { color: 'rgb(255,250,250)', linewidth: 1 }
            },
            {
                value: 99,
                label: '其他',
                style: { color: 'rgb(255,250,250)', linewidth: 1 }
            }
        ],
        AD_LANEDIVIDER_SHARE_LINE: [
            { value: 0, label: '未定义', style: { color: 'rgb(255,250,250)' } },
            {
                value: 1,
                label: '非共用车道线',
                style: { color: 'rgb(255,250,250)' }
            },
            {
                value: 2,
                label: '逆向交通流共用车道线',
                style: { color: 'rgb(255,250,250)' }
            },
            {
                value: 3,
                label: '同向交通流共用车道线',
                style: { color: 'rgb(255,250,250)' }
            }
        ],

        AD_LANE_TYPE: [
            {
                value: 0,
                label: '未定义',
                style: { color: 'rgb(255,255,0)', linewidth: 1 }
            },
            {
                value: 1,
                label: '普通车道',
                style: { color: 'rgb(255,255,0)', linewidth: 1 }
            },
            {
                value: 2,
                label: '路口车道',
                style: { color: 'rgb(255,255,0)', dashSize: 1, gapSize: 1 }
            },
            {
                value: 3,
                label: '应急车道',
                style: { color: 'rgb(255,255,0)', linewidth: 1 }
            },
            {
                value: 4,
                label: '非机动车道',
                style: { color: 'rgb(255,255,0)', linewidth: 1 }
            },
            {
                value: 5,
                label: '机非混合车道',
                style: { color: 'rgb(255,255,0)', linewidth: 1 }
            },
            {
                value: 6,
                label: '公交车道',
                style: { color: 'rgb(255,255,0)', linewidth: 1 }
            },
            {
                value: 7,
                label: '人行道',
                style: { color: 'rgb(255,255,0)', linewidth: 1 }
            },
            {
                value: 8,
                label: 'ETC车道',
                style: { color: 'rgb(255,255,0)', linewidth: 1 }
            },
            {
                value: 9,
                label: '收费站车道',
                style: { color: 'rgb(255,255,0)', linewidth: 1 }
            },
            {
                value: 10,
                label: '检查站车道',
                style: { color: 'rgb(255,255,0)', linewidth: 1 }
            },
            {
                value: 11,
                label: '右侧加速车道',
                style: { color: 'rgb(255,255,0)', linewidth: 1 }
            },
            {
                value: 12,
                label: '右侧减速车道',
                style: { color: 'rgb(255,255,0)', linewidth: 1 }
            },
            {
                value: 13,
                label: '匝道',
                style: { color: 'rgb(255,255,0)', linewidth: 1 }
            },
            {
                value: 14,
                label: '隔离带车道',
                style: { color: 'rgb(255,255,0)', linewidth: 1 }
            },
            {
                value: 15,
                label: '紧急停车道',
                style: { color: 'rgb(255,255,0)', linewidth: 1 }
            },
            {
                value: 16,
                label: 'HOV车道',
                style: { color: 'rgb(255,255,0)', linewidth: 1 }
            },
            {
                value: 17,
                label: '危险用品专用车道',
                style: { color: 'rgb(255,255,0)', linewidth: 1 }
            },
            {
                value: 18,
                label: '爬坡车道',
                style: { color: 'rgb(255,255,0)', linewidth: 1 }
            },
            {
                value: 19,
                label: '可变导向车道',
                style: { color: 'rgb(255,255,0)', linewidth: 1 }
            },
            {
                value: 20,
                label: '海关监管车道',
                style: { color: 'rgb(255,255,0)', linewidth: 1 }
            },
            {
                value: 21,
                label: '避险车道引道',
                style: { color: 'rgb(255,255,0)', linewidth: 1 }
            },
            {
                value: 22,
                label: '停车道',
                style: { color: 'rgb(255,255,0)', linewidth: 1 }
            },
            {
                value: 23,
                label: '潮汐车道',
                style: { color: 'rgb(255,255,0)', linewidth: 1 }
            },
            {
                value: 24,
                label: '左转待转车道',
                style: { color: 'rgb(255,255,0)', linewidth: 1 }
            },
            {
                value: 25,
                label: '直行待行车道',
                style: { color: 'rgb(255,255,0)', linewidth: 1 }
            },
            {
                value: 26,
                label: '掉头车道',
                style: { color: 'rgb(255,255,0)', linewidth: 1 }
            },
            {
                value: 27,
                label: '超车道',
                style: { color: 'rgb(255,255,0)', linewidth: 1 }
            },
            {
                value: 28,
                label: '服务区车道',
                style: { color: 'rgb(255,255,0)', linewidth: 1 }
            },
            {
                value: 29,
                label: '左侧加速车道',
                style: { color: 'rgb(255,255,0)', linewidth: 1 }
            },
            {
                value: 30,
                label: '左侧减速车道',
                style: { color: 'rgb(255,255,0)', linewidth: 1 }
            },
            {
                value: 31,
                label: '加减速复合车道',
                style: { color: 'rgb(255,255,0)', linewidth: 1 }
            },
            {
                value: 99,
                label: '其他',
                style: { color: 'rgb(255,255,0 )', linewidth: 1 }
            }
        ],

        AD_LANEATTRPOINT_TYPE: [
            {
                value: 0,
                label: '未定义',
                style: { color: 'rgb(255,192,203)', radius: 0.01 }
            },
            {
                value: 1,
                label: '道路左侧出口',
                style: { color: 'rgb(255,192,203)', radius: 0.01 }
            },
            {
                value: 2,
                label: '道路右侧出口',
                style: { color: 'rgb(255,192,203)', radius: 0.01 }
            },
            {
                value: 3,
                label: '道路分离点',
                style: { color: 'rgb(255,192,203)', radius: 0.01 }
            },
            {
                value: 4,
                label: '道路合并点',
                style: { color: 'rgb(255,192,203)', radius: 0.01 }
            },
            {
                value: 5,
                label: '车道合并点',
                style: { color: 'rgb(255,192,203)', radius: 0.01 }
            },

            {
                value: 21,
                label: '服务区道路开始位置',
                style: { color: 'rgb(255,192,203)', radius: 0.01 }
            },
            {
                value: 22,
                label: '服务区道路结束位置',
                style: { color: 'rgb(255,192,203)', radius: 0.01 }
            },

            {
                value: 41,
                label: '点云不清晰起点',
                style: { color: 'rgb(255,192,203)', radius: 0.01 }
            },
            {
                value: 42,
                label: '点云不清晰结束点',
                style: { color: 'rgb(255,192,203)', radius: 0.01 }
            },
            {
                value: 43,
                label: '点云遮挡起点',
                style: { color: 'rgb(255,192,203)', radius: 0.01 }
            },
            {
                value: 44,
                label: '点云遮挡结束点',
                style: { color: 'rgb(255,192,203)', radius: 0.01 }
            },
            {
                value: 45,
                label: '精度误差起点',
                style: { color: 'rgb(255,192,203)', radius: 0.01 }
            },
            {
                value: 46,
                label: '精度误差结束点',
                style: { color: 'rgb(255,192,203)', radius: 0.01 }
            },
            {
                value: 47,
                label: '道路施工起点',
                style: { color: 'rgb(255,192,203)', radius: 0.01 }
            },
            {
                value: 48,
                label: '道路施工结束点',
                style: { color: 'rgb(255,192,203)', radius: 0.01 }
            }
        ],

        AD_ARROW_ARR_DIRECT: [
            {
                value: 0,
                label: '箭头',
                style: { color: 'rgb(255,250,250)', linewidth: 1 }
            }
        ],

        AD_STOPLOCATION_TYPE: [
            {
                value: 0,
                label: '未定义',
                style: { color: 'rgb(255,250,250)', linewidth: 1 }
            },
            {
                value: 1,
                label: '停止线',
                style: { color: 'rgb(255,250,250)', linewidth: 1 }
            },
            {
                value: 2,
                label: '停车让行线',
                style: { color: 'rgb(255,250,250)', linewidth: 1 }
            },
            {
                value: 3,
                label: '减速让行线',
                style: { color: 'rgb(255,250,250)', linewidth: 1 }
            }
        ],

        AD_LANEMARK_PLG_TYPE: [
            {
                value: 0,
                label: '未定义',
                style: { color: 'rgb(147,112,219)', linewidth: 1 }
            },
            {
                value: 1,
                label: '人行横道',
                style: { color: 'rgb(147,112,219)', linewidth: 1 }
            },
            {
                value: 2,
                label: '禁止停车区',
                style: { color: 'rgb(147,112,219)', linewidth: 1 }
            },
            {
                value: 3,
                label: '减速带',
                style: { color: 'rgb(147,112,219)', linewidth: 1 }
            },
            {
                value: 4,
                label: '减速警示震荡线',
                style: { color: 'rgb(147,112,219)', linewidth: 1 }
            },
            {
                value: 5,
                label: '斜跨路口的人行横道',
                style: { color: 'rgb(147,112,219)', linewidth: 1 }
            }
        ],

        AD_TEXT_TYPE: [
            {
                value: 0,
                label: '未定义',
                style: { color: 'rgb(147,255,219)', linewidth: 1 }
            },
            {
                value: 1,
                label: '最高限速',
                style: { color: 'rgb(147,255,219)', linewidth: 1 }
            },
            {
                value: 2,
                label: '最低限速',
                style: { color: 'rgb(147,255,219)', linewidth: 1 }
            },
            {
                value: 3,
                label: '公交车道时间限制',
                style: { color: 'rgb(147,255,219)', linewidth: 1 }
            },
            {
                value: 99,
                label: '其他',
                style: { color: 'rgb(147,255,219)', linewidth: 1 }
            }
        ],

        AD_TRAFFICSIGN_SIGN_STYPE: [
            {
                value: 0,
                label: '未定义',
                style: {
                    color: 'rgb(65,105,255)',
                    linewidth: 1,
                    colorFill: 'rgb(250,250,250)'
                }
            },
            {
                value: 1,
                label: '单个标志牌',
                style: {
                    color: 'rgb(65,105,255)',
                    linewidth: 1,
                    colorFill: 'rgb(250,250,250)'
                }
            },
            {
                value: 2,
                label: '组合标志牌',
                style: {
                    color: 'rgb(65,105,255)',
                    linewidth: 1,
                    colorFill: 'rgb(250,250,250)'
                }
            }
        ],

        AD_TRAFFICLIGHT_TYPE: [
            {
                value: 0,
                label: '未定义',
                style: {
                    color: 'rgb(65,105,225)',
                    linewidth: 1,
                    colorFill: 'rgb(243,5,5)'
                }
            },
            {
                value: 1,
                label: '普通机动车信号灯',
                style: {
                    color: 'rgb(65,105,225)',
                    linewidth: 1,
                    colorFill: 'rgb(243,5,5)'
                }
            },
            {
                value: 2,
                label: '方向指示灯',
                style: {
                    color: 'rgb(65,105,225)',
                    linewidth: 1,
                    colorFill: 'rgb(243,5,5)'
                }
            },
            {
                value: 3,
                label: '铁路交叉路口信号灯',
                style: {
                    color: 'rgb(65,105,225)',
                    linewidth: 1,
                    colorFill: 'rgb(243,5,5)'
                }
            },
            {
                value: 4,
                label: '人行横道信号灯',
                style: {
                    color: 'rgb(65,105,225)',
                    linewidth: 1,
                    colorFill: 'rgb(243,5,5)'
                }
            },
            {
                value: 99,
                label: '其他',
                style: {
                    color: 'rgb(65,105,225)',
                    linewidth: 1,
                    colorFill: 'rgb(243,5,5)'
                }
            }
        ],
        AD_RS_BARRIER_TYPE: [
            {
                value: 0,
                label: '未定义',
                style: {
                    color: 'rgb(65,105,225)',
                    linewidth: 1
                }
            },
            {
                value: 1,
                label: '隧道墙',
                style: {
                    color: 'rgb(65,105,225)',
                    linewidth: 1
                }
            },
            {
                value: 2,
                label: '路侧防护栏',
                style: {
                    color: 'rgb(65,105,225)',
                    linewidth: 1
                }
            },
            {
                value: 3,
                label: '路缘石',
                style: {
                    color: 'rgb(65,105,225)',
                    linewidth: 1
                }
            },
            {
                value: 4,
                label: '隔音墙',
                style: {
                    color: 'rgb(65,105,225)',
                    linewidth: 1
                }
            }
        ],

        AD_MAP_QC_TYPE: [
            {
                value: 0,
                label: '未定义',
                style: { color: 'rgb(220,20,60)', radius: 0.1 }
            }
        ],
        AD_POLE_TYPE: [
            {
                value: 0,
                label: '',
                style: { color: 'rgb(65,105,225)', radius: 0.1 }
            }
        ]
    }
};
