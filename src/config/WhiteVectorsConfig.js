const biaojituceng = require('../assets/img/biaojituceng.png'); // 关联关系  自定义 白

export default {
    AD_Road: {
        type: 'Line',
        //符号配置按什么类别展示，当前支持一个
        showFields: ['TYPE'],
        pointFLFields: ['TYPE'],
        arrowFields: ['TYPE'],
        order: 15,
        //要展示的样式，['vectorStyle','textStyle','pointFLStyle','arrowStyle']
        showStyles: ['vectorStyle', 'pointFLStyle', 'arrowStyle'],
        //符号样式配置
        vectorStyle: {
            TYPE: [
                {
                    value: 0,
                    label: '未定义',
                    style: { color: 'rgb(255,255,255)', linewidth: 1 }
                },
                {
                    value: 1,
                    label: '实际道路参考线',
                    style: { color: 'rgb(255,255,255)', linewidth: 1 }
                },
                {
                    value: 2,
                    label: '虚拟道路参考线',
                    style: { color: 'rgb(255,255,255)', linewidth: 1 }
                }
            ]
        },
        pointFLStyle: {
            TYPE: [
                {
                    value: 0,
                    label: '未定义',
                    style: { color: 'rgb(255,255,255)' }
                },
                {
                    value: 1,
                    label: '实际道路参考线',
                    style: { color: 'rgb(255,255,255)' }
                },
                {
                    value: 2,
                    label: '虚拟道路参考线',
                    style: { color: 'rgb(255,255,255)' }
                }
            ]
        },
        arrowStyle: {
            TYPE: [
                {
                    value: 0,
                    label: '未定义',
                    style: { color: 'rgb(255,255,255)', linewidth: 1 }
                },
                {
                    value: 1,
                    label: '实际道路参考线',
                    style: { color: 'rgb(255,255,255)', linewidth: 1 }
                },
                {
                    value: 2,
                    label: '虚拟道路参考线',
                    style: { color: 'rgb(255,255,255)', linewidth: 1 }
                }
            ]
        }
    },
    AD_LaneDivider: {
        type: 'Line',
        showFields: ['RD_LINE'],
        pointFLFields: ['RD_LINE'],
        arrowFields: ['RD_LINE'],
        order: 14,
        showStyles: ['vectorStyle', 'pointFLStyle', 'arrowStyle'],
        vectorStyle: {
            RD_LINE: [
                {
                    value: 0,
                    label: '未定义',
                    style: { color: 'rgb(255,255,255)' }
                },
                {
                    value: 1,
                    label: '道路参考线',
                    style: { color: 'rgb(255,255,255)' }
                },
                {
                    value: 2,
                    label: '非道路参考线',
                    style: { color: 'rgb(255,255,255)' }
                }
            ]
        },
        pointFLStyle: {
            RD_LINE: [
                {
                    value: 0,
                    label: '未定义',
                    style: { color: 'rgb(255,255,255)' }
                },
                {
                    value: 1,
                    label: '道路参考线',
                    style: { color: 'rgb(255,255,255)' }
                },
                {
                    value: 2,
                    label: '非道路参考线',
                    style: { color: 'rgb(255,255,255)' }
                }
            ]
        },
        arrowStyle: {
            RD_LINE: [
                {
                    value: 0,
                    label: '未定义',
                    style: { color: 'rgb(255,255,255)' }
                },
                {
                    value: 1,
                    label: '道路参考线',
                    style: { color: 'rgb(255,255,255)' }
                },
                {
                    value: 2,
                    label: '非道路参考线',
                    style: { color: 'rgb(255,255,255)' }
                }
            ]
        }
    },
    AD_Lane: {
        type: 'Line',
        showFields: ['TYPE'],
        pointFLFields: ['TYPE'],
        arrowFields: ['TYPE'],
        order: 13,
        showStyles: ['vectorStyle', 'pointFLStyle', 'arrowStyle'],
        vectorStyle: {
            TYPE: [
                {
                    value: 0,
                    label: '未定义',
                    style: { color: 'rgb(255,255,255)', linewidth: 1 }
                },
                {
                    value: 1,
                    label: '普通车道',
                    style: { color: 'rgb(255,255,255)', linewidth: 1 }
                },
                {
                    value: 2,
                    label: '路口车道',
                    style: { color: 'rgb(255,255,255)', linewidth: 1 }
                },
                {
                    value: 3,
                    label: '应急车道',
                    style: { color: 'rgb(255,255,255)', linewidth: 1 }
                },
                {
                    value: 4,
                    label: '非机动车道',
                    style: { color: 'rgb(255,255,255)', linewidth: 1 }
                },
                {
                    value: 5,
                    label: '机非混合车道',
                    style: { color: 'rgb(255,255,255)', linewidth: 1 }
                },
                {
                    value: 6,
                    label: '公交车道',
                    style: { color: 'rgb(255,255,255)', linewidth: 1 }
                },
                {
                    value: 7,
                    label: '人行道',
                    style: { color: 'rgb(255,255,255)', linewidth: 1 }
                },
                {
                    value: 8,
                    label: 'ETC车道',
                    style: { color: 'rgb(255,255,255)', linewidth: 1 }
                },
                {
                    value: 9,
                    label: '收费站车道',
                    style: { color: 'rgb(255,255,255)', linewidth: 1 }
                },
                {
                    value: 10,
                    label: '检查站车道',
                    style: { color: 'rgb(255,255,255)', linewidth: 1 }
                },
                {
                    value: 11,
                    label: '右侧加速车道',
                    style: { color: 'rgb(255,255,255)', linewidth: 1 }
                },
                {
                    value: 12,
                    label: '右侧减速车道',
                    style: { color: 'rgb(255,255,255)', linewidth: 1 }
                },
                {
                    value: 13,
                    label: '匝道',
                    style: { color: 'rgb(255,255,255)', linewidth: 1 }
                },
                {
                    value: 14,
                    label: '隔离带车道',
                    style: { color: 'rgb(255,255,255)', linewidth: 1 }
                },
                {
                    value: 15,
                    label: '紧急停车道',
                    style: { color: 'rgb(255,255,255)', linewidth: 1 }
                },
                {
                    value: 16,
                    label: 'HOV车道',
                    style: { color: 'rgb(255,255,255)', linewidth: 1 }
                },
                {
                    value: 17,
                    label: '危险用品专用车道',
                    style: { color: 'rgb(255,255,255)', linewidth: 1 }
                },
                {
                    value: 18,
                    label: '爬坡车道',
                    style: { color: 'rgb(255,255,255)', linewidth: 1 }
                },
                {
                    value: 19,
                    label: '可变导向车道',
                    style: { color: 'rgb(255,255,255)', linewidth: 1 }
                },
                {
                    value: 20,
                    label: '海关监管车道',
                    style: { color: 'rgb(255,255,255)', linewidth: 1 }
                },
                {
                    value: 21,
                    label: '避险车道引道',
                    style: { color: 'rgb(255,255,255)', linewidth: 1 }
                },
                {
                    value: 22,
                    label: '停车道',
                    style: { color: 'rgb(255,255,255)', linewidth: 1 }
                },
                {
                    value: 23,
                    label: '潮汐车道',
                    style: { color: 'rgb(255,255,255)', linewidth: 1 }
                },
                {
                    value: 24,
                    label: '左转待转车道',
                    style: { color: 'rgb(255,255,255)', linewidth: 1 }
                },
                {
                    value: 25,
                    label: '直行待行车道',
                    style: { color: 'rgb(255,255,255)', linewidth: 1 }
                },
                {
                    value: 26,
                    label: '掉头车道',
                    style: { color: 'rgb(255,255,255)', linewidth: 1 }
                },
                {
                    value: 27,
                    label: '超车道',
                    style: { color: 'rgb(255,255,255)', linewidth: 1 }
                },
                {
                    value: 28,
                    label: '服务区车道',
                    style: { color: 'rgb(255,255,255)', linewidth: 1 }
                },
                {
                    value: 29,
                    label: '左侧加速车道',
                    style: { color: 'rgb(255,255,255)', linewidth: 1 }
                },
                {
                    value: 30,
                    label: '左侧减速车道',
                    style: { color: 'rgb(255,255,255)', linewidth: 1 }
                },
                {
                    value: 31,
                    label: '复合车道',
                    style: { color: 'rgb(255,255,255)', linewidth: 1 }
                },
                {
                    value: 99,
                    label: '其他',
                    style: { color: 'rgb(255,255,255 )', linewidth: 1 }
                }
            ]
        },
        pointFLStyle: {
            TYPE: [
                {
                    value: 0,
                    label: '未定义',
                    style: { color: 'rgb(255,255,255)' }
                },
                {
                    value: 1,
                    label: '普通车道',
                    style: { color: 'rgb(255,255,255)' }
                },
                {
                    value: 2,
                    label: '路口车道',
                    style: { color: 'rgb(255,255,255)' }
                },
                {
                    value: 3,
                    label: '应急车道',
                    style: { color: 'rgb(255,255,255)' }
                },
                {
                    value: 4,
                    label: '非机动车道',
                    style: { color: 'rgb(255,255,255)' }
                },
                {
                    value: 5,
                    label: '机非混合车道',
                    style: { color: 'rgb(255,255,255)' }
                },
                {
                    value: 6,
                    label: '公交车道',
                    style: { color: 'rgb(255,255,255)' }
                },
                {
                    value: 7,
                    label: '人行道',
                    style: { color: 'rgb(255,255,255)' }
                },
                {
                    value: 8,
                    label: 'ETC车道',
                    style: { color: 'rgb(255,255,255)' }
                },
                {
                    value: 9,
                    label: '收费站车道',
                    style: { color: 'rgb(255,255,255)' }
                },
                {
                    value: 10,
                    label: '检查站车道',
                    style: { color: 'rgb(255,255,255)' }
                },
                {
                    value: 11,
                    label: '右侧加速车道',
                    style: { color: 'rgb(255,255,255)' }
                },
                {
                    value: 12,
                    label: '右侧减速车道',
                    style: { color: 'rgb(255,255,255)' }
                },
                {
                    value: 13,
                    label: '匝道',
                    style: { color: 'rgb(255,255,255)' }
                },
                {
                    value: 14,
                    label: '隔离带车道',
                    style: { color: 'rgb(255,255,255)' }
                },
                {
                    value: 15,
                    label: '紧急停车道',
                    style: { color: 'rgb(255,255,255)' }
                },
                {
                    value: 16,
                    label: 'HOV车道',
                    style: { color: 'rgb(255,255,255)' }
                },
                {
                    value: 17,
                    label: '危险用品专用车道',
                    style: { color: 'rgb(255,255,255)' }
                },
                {
                    value: 18,
                    label: '爬坡车道',
                    style: { color: 'rgb(255,255,255)' }
                },
                {
                    value: 19,
                    label: '可变导向车道',
                    style: { color: 'rgb(255,255,255)' }
                },
                {
                    value: 20,
                    label: '海关监管车道',
                    style: { color: 'rgb(255,255,255)' }
                },
                {
                    value: 21,
                    label: '避险车道引道',
                    style: { color: 'rgb(255,255,255)' }
                },
                {
                    value: 22,
                    label: '停车道',
                    style: { color: 'rgb(255,255,255)' }
                },
                {
                    value: 23,
                    label: '潮汐车道',
                    style: { color: 'rgb(255,255,255)' }
                },
                {
                    value: 24,
                    label: '左转待转车道',
                    style: { color: 'rgb(255,255,255)' }
                },
                {
                    value: 25,
                    label: '直行待行车道',
                    style: { color: 'rgb(255,255,255)' }
                },
                {
                    value: 26,
                    label: '掉头车道',
                    style: { color: 'rgb(255,255,255)' }
                },
                {
                    value: 27,
                    label: '超车道',
                    style: { color: 'rgb(255,255,255)' }
                },
                {
                    value: 28,
                    label: '服务区车道',
                    style: { color: 'rgb(255,255,255)' }
                },
                {
                    value: 29,
                    label: '左侧加速车道',
                    style: { color: 'rgb(255,255,255)' }
                },
                {
                    value: 30,
                    label: '左侧减速车道',
                    style: { color: 'rgb(255,255,255)' }
                },
                {
                    value: 31,
                    label: '复合车道',
                    style: { color: 'rgb(255,255,255)' }
                },
                {
                    value: 99,
                    label: '其他',
                    style: { color: 'rgb(255,255,255 )' }
                }
            ]
        },
        arrowStyle: {
            TYPE: [
                {
                    value: 0,
                    label: '未定义',
                    style: { color: 'rgb(255,255,255)', linewidth: 1 }
                },
                {
                    value: 1,
                    label: '普通车道',
                    style: { color: 'rgb(255,255,255)', linewidth: 1 }
                },
                {
                    value: 2,
                    label: '路口车道',
                    style: { color: 'rgb(255,255,255)', linewidth: 1 }
                },
                {
                    value: 3,
                    label: '应急车道',
                    style: { color: 'rgb(255,255,255)', linewidth: 1 }
                },
                {
                    value: 4,
                    label: '非机动车道',
                    style: { color: 'rgb(255,255,255)', linewidth: 1 }
                },
                {
                    value: 5,
                    label: '机非混合车道',
                    style: { color: 'rgb(255,255,255)', linewidth: 1 }
                },
                {
                    value: 6,
                    label: '公交车道',
                    style: { color: 'rgb(255,255,255)', linewidth: 1 }
                },
                {
                    value: 7,
                    label: '人行道',
                    style: { color: 'rgb(255,255,255)', linewidth: 1 }
                },
                {
                    value: 8,
                    label: 'ETC车道',
                    style: { color: 'rgb(255,255,255)', linewidth: 1 }
                },
                {
                    value: 9,
                    label: '收费站车道',
                    style: { color: 'rgb(255,255,255)', linewidth: 1 }
                },
                {
                    value: 10,
                    label: '检查站车道',
                    style: { color: 'rgb(255,255,255)', linewidth: 1 }
                },
                {
                    value: 11,
                    label: '右侧加速车道',
                    style: { color: 'rgb(255,255,255)', linewidth: 1 }
                },
                {
                    value: 12,
                    label: '右侧减速车道',
                    style: { color: 'rgb(255,255,255)', linewidth: 1 }
                },
                {
                    value: 13,
                    label: '匝道',
                    style: { color: 'rgb(255,255,255)', linewidth: 1 }
                },
                {
                    value: 14,
                    label: '隔离带车道',
                    style: { color: 'rgb(255,255,255)', linewidth: 1 }
                },
                {
                    value: 15,
                    label: '紧急停车道',
                    style: { color: 'rgb(255,255,255)', linewidth: 1 }
                },
                {
                    value: 16,
                    label: 'HOV车道',
                    style: { color: 'rgb(255,255,255)', linewidth: 1 }
                },
                {
                    value: 17,
                    label: '危险用品专用车道',
                    style: { color: 'rgb(255,255,255)', linewidth: 1 }
                },
                {
                    value: 18,
                    label: '爬坡车道',
                    style: { color: 'rgb(255,255,255)', linewidth: 1 }
                },
                {
                    value: 19,
                    label: '可变导向车道',
                    style: { color: 'rgb(255,255,255)', linewidth: 1 }
                },
                {
                    value: 20,
                    label: '海关监管车道',
                    style: { color: 'rgb(255,255,255)', linewidth: 1 }
                },
                {
                    value: 21,
                    label: '避险车道引道',
                    style: { color: 'rgb(255,255,255)', linewidth: 1 }
                },
                {
                    value: 22,
                    label: '停车道',
                    style: { color: 'rgb(255,255,255)', linewidth: 1 }
                },
                {
                    value: 23,
                    label: '潮汐车道',
                    style: { color: 'rgb(255,255,255)', linewidth: 1 }
                },
                {
                    value: 24,
                    label: '左转待转车道',
                    style: { color: 'rgb(255,255,255)', linewidth: 1 }
                },
                {
                    value: 25,
                    label: '直行待行车道',
                    style: { color: 'rgb(255,255,255)', linewidth: 1 }
                },
                {
                    value: 26,
                    label: '掉头车道',
                    style: { color: 'rgb(255,255,255)', linewidth: 1 }
                },
                {
                    value: 27,
                    label: '超车道',
                    style: { color: 'rgb(255,255,255)', linewidth: 1 }
                },
                {
                    value: 28,
                    label: '服务区车道',
                    style: { color: 'rgb(255,255,255)', linewidth: 1 }
                },
                {
                    value: 29,
                    label: '左侧加速车道',
                    style: { color: 'rgb(255,255,255)', linewidth: 1 }
                },
                {
                    value: 30,
                    label: '左侧减速车道',
                    style: { color: 'rgb(255,255,255)', linewidth: 1 }
                },
                {
                    value: 31,
                    label: '复合车道',
                    style: { color: 'rgb(255,255,255)', linewidth: 1 }
                },
                {
                    value: 99,
                    label: '其他',
                    style: { color: 'rgb(255,255,255 )', linewidth: 1 }
                }
            ]
        }
    },
    AD_LaneAttrPoint: {
        type: 'Point',
        showFields: ['TYPE'],
        order: 11,
        showStyles: ['vectorStyle'],
        vectorStyle: {
            TYPE: [
                {
                    value: 0,
                    label: '未定义',
                    style: {
                        color: 'rgb(255,255,255)',
                        radius: 0.15,
                        opacity: 0.6,
                        size: 80
                    }
                },
                {
                    value: 1,
                    label: '道路左侧出口',
                    style: {
                        color: 'rgb(255,255,255)',
                        radius: 0.15,
                        opacity: 0.6,
                        size: 80
                    }
                },
                {
                    value: 2,
                    label: '道路右侧出口',
                    style: {
                        color: 'rgb(255,255,255)',
                        radius: 0.15,
                        opacity: 0.6,
                        size: 80
                    }
                },
                {
                    value: 3,
                    label: '道路分离点',
                    style: {
                        color: 'rgb(255,255,255)',
                        radius: 0.15,
                        opacity: 0.6,
                        size: 80
                    }
                },
                {
                    value: 4,
                    label: '道路合并点',
                    style: {
                        color: 'rgb(255,255,255)',
                        radius: 0.15,
                        opacity: 0.6,
                        size: 80
                    }
                },
                {
                    value: 5,
                    label: '车道合并点',
                    style: {
                        color: 'rgb(255,255,255)',
                        radius: 0.15,
                        opacity: 0.6,
                        size: 80
                    }
                },

                {
                    value: 21,
                    label: '服务区道路开始位置',
                    style: {
                        color: 'rgb(255,255,255)',
                        radius: 0.15,
                        opacity: 0.6,
                        size: 80
                    }
                },
                {
                    value: 22,
                    label: '服务区道路结束位置',
                    style: {
                        color: 'rgb(255,255,255)',
                        radius: 0.15,
                        opacity: 0.6,
                        size: 80
                    }
                },

                {
                    value: 41,
                    label: '点云不清晰起点',
                    style: {
                        color: 'rgb(255,255,255)',
                        radius: 0.15,
                        opacity: 0.6,
                        size: 80
                    }
                },
                {
                    value: 42,
                    label: '点云不清晰结束点',
                    style: {
                        color: 'rgb(255,255,255)',
                        radius: 0.15,
                        opacity: 0.6,
                        size: 80
                    }
                },
                {
                    value: 43,
                    label: '点云遮挡起点',
                    style: {
                        color: 'rgb(255,255,255)',
                        radius: 0.15,
                        opacity: 0.6,
                        size: 80
                    }
                },
                {
                    value: 44,
                    label: '点云遮挡结束',
                    style: {
                        color: 'rgb(255,255,255)',
                        radius: 0.15,
                        opacity: 0.6,
                        size: 80
                    }
                },
                {
                    value: 45,
                    label: '精度误差起始',
                    style: {
                        color: 'rgb(255,255,255)',
                        radius: 0.15,
                        opacity: 0.6,
                        size: 80
                    }
                },
                {
                    value: 46,
                    label: '精度误差结束',
                    style: {
                        color: 'rgb(255,255,255)',
                        radius: 0.15,
                        opacity: 0.6,
                        size: 80
                    }
                },
                {
                    value: 47,
                    label: '道路施工起始',
                    style: {
                        color: 'rgb(255,255,255)',
                        radius: 0.15,
                        opacity: 0.6,
                        size: 80
                    }
                },
                {
                    value: 48,
                    label: '道路施工结束',
                    style: {
                        color: 'rgb(255,255,255)',
                        radius: 0.15,
                        opacity: 0.6,
                        size: 80
                    }
                }
            ]
        }
    },
    AD_Arrow: {
        type: 'Polygon',
        showFields: ['ARR_DIRECT'],
        order: 10,
        showStyles: ['vectorStyle'],
        vectorStyle: {
            ARR_DIRECT: [
                {
                    value: '0',
                    label: '未定义',
                    style: { color: 'rgb(255,255,255)', linewidth: 1 }
                },
                {
                    value: 'A',
                    label: '直行',
                    style: { color: 'rgb(255,255,255)', linewidth: 1 }
                },
                {
                    value: 'B',
                    label: '左转',
                    style: { color: 'rgb(255,255,255)', linewidth: 1 }
                },
                {
                    value: 'C',
                    label: '右转',
                    style: { color: 'rgb(255,255,255)', linewidth: 1 }
                },
                {
                    value: 'D',
                    label: '左掉头',
                    style: { color: 'rgb(255,255,255)', linewidth: 1 }
                },
                {
                    value: 'E',
                    label: '右掉头',
                    style: { color: 'rgb(255,255,255)', linewidth: 1 }
                },
                {
                    value: 'F',
                    label: '左弯或需向左合流',
                    style: { color: 'rgb(255,255,255)', linewidth: 1 }
                },
                {
                    value: 'G',
                    label: '右弯或需向右合流',
                    style: { color: 'rgb(255,255,255)', linewidth: 1 }
                },
                {
                    value: 'H',
                    label: '左后方转弯',
                    style: { color: 'rgb(255,255,255)', linewidth: 1 }
                },
                {
                    value: 'I',
                    label: '右后方转弯',
                    style: { color: 'rgb(255,255,255)', linewidth: 1 }
                },
                {
                    value: 'J',
                    label: '禁止左掉头',
                    style: { color: 'rgb(255,255,255)', linewidth: 1 }
                },
                {
                    value: 'K',
                    label: '禁止右掉头',
                    style: { color: 'rgb(255,255,255)', linewidth: 1 }
                },
                {
                    value: 'L',
                    label: '禁止左转',
                    style: { color: 'rgb(255,255,255)', linewidth: 1 }
                },
                {
                    value: 'M',
                    label: '禁止右转',
                    style: { color: 'rgb(255,255,255)', linewidth: 1 }
                },
                {
                    value: 'X',
                    label: '待确认',
                    style: { color: 'rgb(255,255,255)', linewidth: 1 }
                }
            ]
        }
    },
    AD_StopLocation: {
        type: 'Line',
        showFields: ['TYPE'],
        pointFLFields: ['TYPE'],
        arrowFields: ['TYPE'],
        order: 9,
        showStyles: ['vectorStyle'],
        vectorStyle: {
            TYPE: [
                {
                    value: 0,
                    label: '未定义',
                    style: { color: 'rgb(255,255,255)', linewidth: 1 }
                },
                {
                    value: 1,
                    label: '停止线',
                    style: { color: 'rgb(255,255,255)', linewidth: 1 }
                },
                {
                    value: 2,
                    label: '停车让行线',
                    style: { color: 'rgb(255,255,255)', linewidth: 1 }
                },
                {
                    value: 3,
                    label: '减速让行线',
                    style: { color: 'rgb(255,255,255)', linewidth: 1 }
                }
            ]
        },
        pointFLStyle: {
            TYPE: [
                {
                    value: 0,
                    label: '未定义',
                    style: { color: 'rgb(255,255,255)' }
                },
                {
                    value: 1,
                    label: '停止线',
                    style: { color: 'rgb(255,255,255)' }
                },
                {
                    value: 2,
                    label: '停车让行线',
                    style: { color: 'rgb(255,255,255)' }
                },
                {
                    value: 3,
                    label: '减速让行线',
                    style: { color: 'rgb(255,255,255)' }
                }
            ]
        },
        arrowStyle: {
            TYPE: [
                {
                    value: 0,
                    label: '未定义',
                    style: { color: 'rgb(255,255,255)', linewidth: 1 }
                },
                {
                    value: 1,
                    label: '停止线',
                    style: { color: 'rgb(255,255,255)', linewidth: 1 }
                },
                {
                    value: 2,
                    label: '停车让行线',
                    style: { color: 'rgb(255,255,255)', linewidth: 1 }
                },
                {
                    value: 3,
                    label: '减速让行线',
                    style: { color: 'rgb(255,255,255)', linewidth: 1 }
                }
            ]
        }
    },
    AD_LaneMark_Plg: {
        type: 'Polygon',
        showFields: ['TYPE'],
        order: 8,
        showStyles: ['vectorStyle'],
        vectorStyle: {
            TYPE: [
                {
                    value: 0,
                    label: '未定义',
                    style: { color: 'rgb(255,255,255)', linewidth: 1 }
                },
                {
                    value: 1,
                    label: '人行横道',
                    style: { color: 'rgb(255,255,255)', linewidth: 1 }
                },
                {
                    value: 2,
                    label: '禁止停车区',
                    style: { color: 'rgb(255,255,255)', linewidth: 1 }
                },
                {
                    value: 3,
                    label: '减速带',
                    style: { color: 'rgb(255,255,255)', linewidth: 1 }
                },
                {
                    value: 4,
                    label: '减速警示震荡线',
                    style: { color: 'rgb(255,255,255)', linewidth: 1 }
                },
                {
                    value: 5,
                    label: '斜跨路口的人行横道',
                    style: { color: 'rgb(255,255,255)', linewidth: 1 }
                }
            ]
        }
    },
    AD_Text: {
        type: 'Polygon',
        showFields: ['CONT_TYPE'],
        order: 7,
        showStyles: ['vectorStyle'],
        vectorStyle: {
            CONT_TYPE: [
                {
                    value: 0,
                    label: '未定义',
                    style: { color: 'rgb(255,255,255)', linewidth: 1 }
                },
                {
                    value: 1,
                    label: '最高速度限制',
                    style: { color: 'rgb(255,255,255)', linewidth: 1 }
                },
                {
                    value: 2,
                    label: '最低速度限制',
                    style: { color: 'rgb(255,255,255)', linewidth: 1 }
                },
                {
                    value: 3,
                    label: '潮汐车道时间限制',
                    style: { color: 'rgb(255,255,255)', linewidth: 1 }
                },
                {
                    value: 4,
                    label: '禁止停车时间限制',
                    style: { color: 'rgb(255,255,255)', linewidth: 1 }
                },
                {
                    value: 5,
                    label: 'HOV车道时间限制',
                    style: { color: 'rgb(255,255,255)', linewidth: 1 }
                },
                {
                    value: 6,
                    label: '公交车道时间限制',
                    style: { color: 'rgb(255,255,255)', linewidth: 1 }
                },
                {
                    value: 99,
                    label: '其他',
                    style: { color: 'rgb(255,255,255)', linewidth: 1 }
                }
            ]
        }
    },
    AD_TrafficSign: {
        type: 'Polygon',
        showFields: ['SIGN_STYLE'],
        order: 6,
        showStyles: ['vectorStyle'],
        vectorStyle: {
            SIGN_STYLE: [
                {
                    value: 0,
                    label: '未定义',
                    style: {
                        color: 'rgb(255,255,255)',
                        linewidth: 1,
                        colorFill: 'rgb(255,255,255)'
                    }
                },
                {
                    value: 1,
                    label: '单个标志牌',
                    style: {
                        color: 'rgb(255,255,255)',
                        linewidth: 1,
                        colorFill: 'rgb(255,255,255)'
                    }
                },
                {
                    value: 2,
                    label: '组合标志牌',
                    style: {
                        color: 'rgb(255,255,255)',
                        linewidth: 1,
                        colorFill: 'rgb(255,255,255)'
                    }
                }
            ]
        }
    },
    AD_TrafficLight: {
        type: 'Polygon',
        showFields: ['TYPE'],
        order: 5,
        showStyles: ['vectorStyle'],
        vectorStyle: {
            TYPE: [
                {
                    value: 0,
                    label: '未定义',
                    style: {
                        color: 'rgb(255,255,255)',
                        linewidth: 1,
                        colorFill: 'rgb(255,255,255)'
                    }
                },
                {
                    value: 1,
                    label: '普通机动车信号灯',
                    style: {
                        color: 'rgb(255,255,255)',
                        linewidth: 1,
                        colorFill: 'rgb(255,255,255)'
                    }
                },
                {
                    value: 2,
                    label: '方向指示信号灯',
                    style: {
                        color: 'rgb(255,255,255)',
                        linewidth: 1,
                        colorFill: 'rgb(255,255,255)'
                    }
                },
                {
                    value: 3,
                    label: '铁路交叉路口信号灯',
                    style: {
                        color: 'rgb(255,255,255)',
                        linewidth: 1,
                        colorFill: 'rgb(255,255,255)'
                    }
                },
                {
                    value: 4,
                    label: '人行横道信号灯',
                    style: {
                        color: 'rgb(255,255,255)',
                        linewidth: 1,
                        colorFill: 'rgb(255,255,255)'
                    }
                },
                {
                    value: 99,
                    label: '其他',
                    style: {
                        color: 'rgb(255,255,255)',
                        linewidth: 1,
                        colorFill: 'rgb(255,255,255)'
                    }
                }
            ]
        }
    },
    AD_RS_Barrier: {
        type: 'Line',
        showFields: ['TYPE'],
        pointFLFields: ['TYPE'],
        arrowFields: ['TYPE'],
        order: 3,
        showStyles: ['vectorStyle', 'pointFLStyle'],
        vectorStyle: {
            TYPE: [
                {
                    value: 0,
                    label: '未定义',
                    style: {
                        color: 'rgb(255,255,255)',
                        linewidth: 1
                    }
                },
                {
                    value: 1,
                    label: '隧道墙',
                    style: {
                        color: 'rgb(255,255,255)',
                        linewidth: 1
                    }
                },
                {
                    value: 2,
                    label: '路侧防护栏',
                    style: {
                        color: 'rgb(255,255,255)',
                        linewidth: 1
                    }
                },
                {
                    value: 3,
                    label: '路缘石',
                    style: {
                        color: 'rgb(255,255,255)',
                        linewidth: 1
                    }
                },
                {
                    value: 4,
                    label: '隔音墙',
                    style: {
                        color: 'rgb(255,255,255)',
                        linewidth: 1
                    }
                },
                {
                    value: 5,
                    label: '其他墙体',
                    style: {
                        color: 'rgb(255,255,255)',
                        linewidth: 1
                    }
                },
                {
                    value: 6,
                    label: '道路轮廓标',
                    style: {
                        color: 'rgb(255,255,255)',
                        linewidth: 1
                    }
                }
            ]
        },
        pointFLStyle: {
            TYPE: [
                {
                    value: 0,
                    label: '未定义',
                    style: {
                        color: 'rgb(255,255,255)'
                    }
                },
                {
                    value: 1,
                    label: '隧道墙',
                    style: {
                        color: 'rgb(255,255,255)'
                    }
                },
                {
                    value: 2,
                    label: '路侧防护栏',
                    style: {
                        color: 'rgb(255,255,255)'
                    }
                },
                {
                    value: 3,
                    label: '路缘石',
                    style: {
                        color: 'rgb(255,255,255)'
                    }
                },
                {
                    value: 4,
                    label: '隔音墙',
                    style: {
                        color: 'rgb(255,255,255)'
                    }
                },
                {
                    value: 5,
                    label: '其他墙体',
                    style: {
                        color: 'rgb(255,255,255)'
                    }
                },
                {
                    value: 6,
                    label: '道路轮廓标',
                    style: {
                        color: 'rgb(255,255,255)'
                    }
                }
            ]
        },
        arrowStyle: {
            TYPE: [
                {
                    value: 0,
                    label: '未定义',
                    style: {
                        color: 'rgb(255,255,255)',
                        linewidth: 1
                    }
                },
                {
                    value: 1,
                    label: '隧道墙',
                    style: {
                        color: 'rgb(255,255,255)',
                        linewidth: 1
                    }
                },
                {
                    value: 2,
                    label: '路侧防护栏',
                    style: {
                        color: 'rgb(255,255,255)',
                        linewidth: 1
                    }
                },
                {
                    value: 3,
                    label: '路缘石',
                    style: {
                        color: 'rgb(255,255,255)',
                        linewidth: 1
                    }
                },
                {
                    value: 4,
                    label: '隔音墙',
                    style: {
                        color: 'rgb(255,255,255)',
                        linewidth: 1
                    }
                },
                {
                    value: 5,
                    label: '其他墙体',
                    style: {
                        color: 'rgb(255,255,255)',
                        linewidth: 1
                    }
                },
                {
                    value: 6,
                    label: '道路轮廓标',
                    style: {
                        color: 'rgb(255,255,255)',
                        linewidth: 1
                    }
                }
            ]
        }
    },
    AD_Map_QC: {
        type: 'Point',
        showFields: ['QC_STATUS'],
        order: 2,
        showStyles: ['vectorStyle'],
        vectorStyle: {
            QC_STATUS: [
                {
                    value: 0,
                    label: '未定义',
                    style: {
                        color: 'rgb(255,255,255)',
                        radius: 0.3,
                        url: biaojituceng,
                        size: 80
                    }
                },
                {
                    value: 1,
                    label: '已修正',
                    style: {
                        color: 'rgb(255,255,255)',
                        radius: 0.3,
                        url: biaojituceng,
                        size: 80
                    }
                },
                {
                    value: 2,
                    label: '未修正',
                    style: {
                        color: 'rgb(255,255,255)',
                        radius: 0.3,
                        url: biaojituceng,
                        size: 80
                    }
                }
            ]
        }
    },
    AD_LaneDivider_Pln: {
        type: 'Line',
        showFields: ['FEAT_TYPE'],
        pointFLFields: ['FEAT_TYPE'],
        arrowFields: ['FEAT_TYPE'],
        order: 16,
        showStyles: ['vectorStyle', 'pointFLStyle', 'arrowStyle'],
        vectorStyle: {
            FEAT_TYPE: [
                {
                    value: 0,
                    label: '未定义',
                    style: { color: 'rgb(255,255,255)', linewidth: 1 }
                },
                {
                    value: 1001,
                    label: '单实线',
                    style: { color: 'rgb(255,255,255)', linewidth: 1 }
                },
                {
                    value: 1003,
                    label: '双实线',
                    style: { color: 'rgb(255,255,255)', linewidth: 1 }
                },
                {
                    value: 1005,
                    label: '左实右虚线',
                    style: { color: 'rgb(255,255,255)', linewidth: 1 }
                },
                {
                    value: 1006,
                    label: '左虚右实线',
                    style: { color: 'rgb(255,255,255)', linewidth: 1 }
                },
                {
                    value: 1007,
                    label: '可变导向车道线',
                    style: { color: 'rgb(255,255,255)', linewidth: 1 }
                }
            ]
        },
        pointFLStyle: {
            FEAT_TYPE: [
                {
                    value: 0,
                    label: '未定义',
                    style: { color: 'rgb(255,255,255)', linewidth: 1 }
                },
                {
                    value: 1001,
                    label: '单实线',
                    style: { color: 'rgb(255,255,255)', linewidth: 1 }
                },
                {
                    value: 1003,
                    label: '双实线',
                    style: { color: 'rgb(255,255,255)', linewidth: 1 }
                },
                {
                    value: 1005,
                    label: '左实右虚线',
                    style: { color: 'rgb(255,255,255)', linewidth: 1 }
                },
                {
                    value: 1006,
                    label: '左虚右实线',
                    style: { color: 'rgb(255,255,255)', linewidth: 1 }
                },
                {
                    value: 1007,
                    label: '可变导向车道线',
                    style: { color: 'rgb(255,255,255)', linewidth: 1 }
                }
            ]
        },
        arrowStyle: {
            FEAT_TYPE: [
                {
                    value: 0,
                    label: '未定义',
                    style: { color: 'rgb(255,255,255)', linewidth: 1 }
                },
                {
                    value: 1001,
                    label: '单实线',
                    style: { color: 'rgb(255,255,255)', linewidth: 1 }
                },
                {
                    value: 1003,
                    label: '双实线',
                    style: { color: 'rgb(255,255,255)', linewidth: 1 }
                },
                {
                    value: 1005,
                    label: '左实右虚线',
                    style: { color: 'rgb(255,255,255)', linewidth: 1 }
                },
                {
                    value: 1006,
                    label: '左虚右实线',
                    style: { color: 'rgb(255,255,255)', linewidth: 1 }
                },
                {
                    value: 1007,
                    label: '可变导向车道线',
                    style: { color: 'rgb(255,255,255)', linewidth: 1 }
                }
            ]
        }
    },
    AD_LaneDivider_Plg: {
        type: 'Polygon',
        showFields: ['FEAT_TYPE'],
        order: 17,
        showStyles: ['vectorStyle'],
        vectorStyle: {
            FEAT_TYPE: [
                {
                    value: 0,
                    label: '未定义',
                    style: { color: 'rgb(255,255,255)', linewidth: 1 }
                },
                {
                    value: 1002,
                    label: '单虚线',
                    style: { color: 'rgb(255,255,255)', linewidth: 1 }
                },
                {
                    value: 1004,
                    label: '双虚线',
                    style: { color: 'rgb(255,255,255)', linewidth: 1 }
                },
                {
                    value: 1005,
                    label: '左实右虚线',
                    style: { color: 'rgb(255,255,255)', linewidth: 1 }
                },
                {
                    value: 1006,
                    label: '左虚右实线',
                    style: { color: 'rgb(255,255,255)', linewidth: 1 }
                }
            ]
        }
    },
    AD_StopLocation_Geo: {
        type: 'Polygon',
        showFields: ['FEAT_TYPE'],
        order: 18,
        showStyles: ['vectorStyle'],
        vectorStyle: {
            FEAT_TYPE: [
                {
                    value: 0,
                    label: '未定义',
                    style: { color: 'rgb(255,255,255)', linewidth: 1 }
                },
                {
                    value: 2001,
                    label: '停止线',
                    style: { color: 'rgb(255,255,255)', linewidth: 1 }
                },
                {
                    value: 2002,
                    label: '停车让行线',
                    style: { color: 'rgb(255,255,255)', linewidth: 1 }
                },
                {
                    value: 2003,
                    label: '减速让行线',
                    style: { color: 'rgb(255,255,255)', linewidth: 1 }
                }
            ]
        }
    },
    AD_Arrow_Geo: {
        type: 'Polygon',
        showFields: ['FEAT_TYPE'],
        order: 19,
        showStyles: ['vectorStyle'],
        vectorStyle: {
            FEAT_TYPE: [
                {
                    value: 0,
                    label: '未定义',
                    style: { color: 'rgb(255,255,255)', linewidth: 1 }
                },
                {
                    value: 3001,
                    label: '直行箭头',
                    style: { color: 'rgb(255,255,255)', linewidth: 1 }
                },
                {
                    value: 3002,
                    label: '左转箭头',
                    style: { color: 'rgb(255,255,255)', linewidth: 1 }
                },
                {
                    value: 3003,
                    label: '右转箭头',
                    style: { color: 'rgb(255,255,255)', linewidth: 1 }
                },
                {
                    value: 3004,
                    label: '直行左转箭头',
                    style: { color: 'rgb(255,255,255)', linewidth: 1 }
                },
                {
                    value: 3005,
                    label: '直行右转箭头',
                    style: { color: 'rgb(255,255,255)', linewidth: 1 }
                },
                {
                    value: 3006,
                    label: '左转右转箭头',
                    style: { color: 'rgb(255,255,255)', linewidth: 1 }
                },
                {
                    value: 3007,
                    label: '直行左转右转箭头',
                    style: { color: 'rgb(255,255,255)', linewidth: 1 }
                },
                {
                    value: 3008,
                    label: '掉头箭头',
                    style: { color: 'rgb(255,255,255)', linewidth: 1 }
                },
                {
                    value: 3009,
                    label: '左转掉头箭头',
                    style: { color: 'rgb(255,255,255)', linewidth: 1 }
                },
                {
                    value: 3010,
                    label: '右转掉头箭头',
                    style: { color: 'rgb(255,255,255)', linewidth: 1 }
                },
                {
                    value: 3011,
                    label: '禁止标记箭头',
                    style: { color: 'rgb(255,255,255)', linewidth: 1 }
                },
                {
                    value: 3012,
                    label: '向左合流箭头',
                    style: { color: 'rgb(255,255,255)', linewidth: 1 }
                },
                {
                    value: 3013,
                    label: '向右合流箭头',
                    style: { color: 'rgb(255,255,255)', linewidth: 1 }
                },
                {
                    value: 3014,
                    label: '直行和掉头箭头',
                    style: { color: 'rgb(255,255,255)', linewidth: 1 }
                },
                {
                    value: 3015,
                    label: '直行左转掉头箭头',
                    style: { color: 'rgb(255,255,255)', linewidth: 1 }
                },
                {
                    value: 3016,
                    label: '直行右转掉头箭头',
                    style: { color: 'rgb(255,255,255)', linewidth: 1 }
                },
                {
                    value: 3017,
                    label: '直行左弯',
                    style: { color: 'rgb(255,255,255)', linewidth: 1 }
                },
                {
                    value: 3018,
                    label: '直行右弯',
                    style: { color: 'rgb(255,255,255)', linewidth: 1 }
                }
            ]
        }
    },
    AD_LaneMark_Geo: {
        type: 'Polygon',
        showFields: ['FEAT_TYPE'],
        order: 20,
        showStyles: ['vectorStyle'],
        vectorStyle: {
            FEAT_TYPE: [
                {
                    value: 0,
                    label: '未定义',
                    style: { color: 'rgb(255,255,255)', linewidth: 1 }
                },
                {
                    value: 4001,
                    label: '减速警示线',
                    style: { color: 'rgb(255,255,255)', linewidth: 1 }
                },
                {
                    value: 4002,
                    label: '减速带',
                    style: { color: 'rgb(255,255,255)', linewidth: 1 }
                },
                {
                    value: 9901,
                    label: '人行横道',
                    style: { color: 'rgb(255,255,255)', linewidth: 1 }
                },
                {
                    value: 9902,
                    label: '禁止停车区',
                    style: { color: 'rgb(255,255,255)', linewidth: 1 }
                },
                {
                    value: 9903,
                    label: '导流区',
                    style: { color: 'rgb(255,255,255)', linewidth: 1 }
                },
                {
                    value: 9904,
                    label: '路口内中心圈',
                    style: { color: 'rgb(255,255,255)', linewidth: 1 }
                },
                {
                    value: 9905,
                    label: '车距确认线',
                    style: { color: 'rgb(255,255,255)', linewidth: 1 }
                },
                {
                    value: 9906,
                    label: '地面文字数字',
                    style: { color: 'rgb(255,255,255)', linewidth: 1 }
                },
                {
                    value: 9907,
                    label: '地面符号',
                    style: { color: 'rgb(255,255,255)', linewidth: 1 }
                }
            ]
        }
    },
    AD_TrafficSign_Geo: {
        type: 'Polygon',
        showFields: ['FEAT_TYPE'],
        order: 21,
        showStyles: ['vectorStyle'],
        vectorStyle: {
            FEAT_TYPE: [
                {
                    value: 0,
                    label: '其他警告标志',
                    style: { color: 'rgb(255,255,255)', linewidth: 1 }
                },
                {
                    value: 2100,
                    label: '建议速度',
                    style: { color: 'rgb(255,255,255)', linewidth: 1 }
                },
                {
                    value: 2101,
                    label: '其他禁令标志',
                    style: { color: 'rgb(255,255,255)', linewidth: 1 }
                },
                {
                    value: 2201,
                    label: '停车让行',
                    style: { color: 'rgb(255,255,255)', linewidth: 1 }
                },
                {
                    value: 2202,
                    label: '减速让行',
                    style: { color: 'rgb(255,255,255)', linewidth: 1 }
                },
                {
                    value: 2203,
                    label: '会车让行',
                    style: { color: 'rgb(255,255,255)', linewidth: 1 }
                },
                {
                    value: 2204,
                    label: '禁止通行',
                    style: { color: 'rgb(255,255,255)', linewidth: 1 }
                },
                {
                    value: 2205,
                    label: '禁止驶入',
                    style: { color: 'rgb(255,255,255)', linewidth: 1 }
                },
                {
                    value: 2206,
                    label: '禁止机动车驶入',
                    style: { color: 'rgb(255,255,255)', linewidth: 1 }
                },
                {
                    value: 2207,
                    label: '禁止向左转弯',
                    style: { color: 'rgb(255,255,255)', linewidth: 1 }
                },
                {
                    value: 2208,
                    label: '禁止向右转弯',
                    style: { color: 'rgb(255,255,255)', linewidth: 1 }
                },
                {
                    value: 2209,
                    label: '禁止直行',
                    style: { color: 'rgb(255,255,255)', linewidth: 1 }
                },
                {
                    value: 2210,
                    label: '禁止向左向右转弯',
                    style: { color: 'rgb(255,255,255)', linewidth: 1 }
                },
                {
                    value: 2211,
                    label: '禁止直行和向左转弯',
                    style: { color: 'rgb(255,255,255)', linewidth: 1 }
                },
                {
                    value: 2212,
                    label: '禁止直行和向右转弯',
                    style: { color: 'rgb(255,255,255)', linewidth: 1 }
                },
                {
                    value: 2213,
                    label: '禁止掉头',
                    style: { color: 'rgb(255,255,255)', linewidth: 1 }
                },
                {
                    value: 2214,
                    label: '禁止超车',
                    style: { color: 'rgb(255,255,255)', linewidth: 1 }
                },
                {
                    value: 2215,
                    label: '解除禁止超车',
                    style: { color: 'rgb(255,255,255)', linewidth: 1 }
                },
                {
                    value: 2216,
                    label: '禁止停车',
                    style: { color: 'rgb(255,255,255)', linewidth: 1 }
                },
                {
                    value: 2217,
                    label: '禁止长时停车',
                    style: { color: 'rgb(255,255,255)', linewidth: 1 }
                },
                {
                    value: 2219,
                    label: '限制速度',
                    style: { color: 'rgb(255,255,255)', linewidth: 1 }
                },
                {
                    value: 2220,
                    label: '解除限制速度',
                    style: { color: 'rgb(255,255,255)', linewidth: 1 }
                },
                {
                    value: 2223,
                    label: '区域禁止-禁止长时停车',
                    style: { color: 'rgb(255,255,255)', linewidth: 1 }
                },
                {
                    value: 2224,
                    label: '区域禁止解除-解除禁止长时停车',
                    style: { color: 'rgb(255,255,255)', linewidth: 1 }
                },
                {
                    value: 2225,
                    label: '区域禁止-禁止停车',
                    style: { color: 'rgb(255,255,255)', linewidth: 1 }
                },
                {
                    value: 2226,
                    label: '区域禁止解除-解除禁止停车',
                    style: { color: 'rgb(255,255,255)', linewidth: 1 }
                },
                {
                    value: 2227,
                    label: '区域禁止-速度限制',
                    style: { color: 'rgb(255,255,255)', linewidth: 1 }
                },
                {
                    value: 2228,
                    label: '区域禁止解除-解除速度限制',
                    style: { color: 'rgb(255,255,255)', linewidth: 1 }
                },
                {
                    value: 2220,
                    label: '其他指示类标志',
                    style: { color: 'rgb(255,255,255)', linewidth: 1 }
                },
                {
                    value: 2300,
                    label: '最低限速',
                    style: { color: 'rgb(255,255,255)', linewidth: 1 }
                },
                {
                    value: 2314,
                    label: '车道行驶方向-直行',
                    style: { color: 'rgb(255,255,255)', linewidth: 1 }
                },
                {
                    value: 2318,
                    label: '允许掉头',
                    style: { color: 'rgb(255,255,255)', linewidth: 1 }
                },
                {
                    value: 2321,
                    label: '车道行驶方向-左转',
                    style: { color: 'rgb(255,255,255)', linewidth: 1 }
                },
                {
                    value: 2322,
                    label: '车道行驶方向-右转',
                    style: { color: 'rgb(255,255,255)', linewidth: 1 }
                },
                {
                    value: 2323,
                    label: '车道行驶方向-直行和左转',
                    style: { color: 'rgb(255,255,255)', linewidth: 1 }
                },
                {
                    value: 2324,
                    label: '车道行驶方向-直行和右转',
                    style: { color: 'rgb(255,255,255)', linewidth: 1 }
                },
                {
                    value: 2325,
                    label: '车道行驶方向-左转和掉头',
                    style: { color: 'rgb(255,255,255)', linewidth: 1 }
                },
                {
                    value: 2326,
                    label: '车道行驶方向-掉头',
                    style: { color: 'rgb(255,255,255)', linewidth: 1 }
                },
                {
                    value: 2327,
                    label: '车道行驶方向-其他',
                    style: { color: 'rgb(255,255,255)', linewidth: 1 }
                },
                {
                    value: 2328,
                    label: '区间测速起点',
                    style: { color: 'rgb(255,255,255)', linewidth: 1 }
                },
                {
                    value: 2401,
                    label: '区间测速终点',
                    style: { color: 'rgb(255,255,255)', linewidth: 1 }
                },
                {
                    value: 2402,
                    label: '区间测速起点和距离',
                    style: { color: 'rgb(255,255,255)', linewidth: 1 }
                },
                {
                    value: 2403,
                    label: '表示时间标志',
                    style: { color: 'rgb(255,255,255)', linewidth: 1 }
                },
                {
                    value: 2404,
                    label: '特殊天气辅助标志',
                    style: { color: 'rgb(255,255,255)', linewidth: 1 }
                },
                {
                    value: 2405,
                    label: '特殊路段辅助标志',
                    style: { color: 'rgb(255,255,255)', linewidth: 1 }
                },
                {
                    value: 2406,
                    label: '其他标志牌',
                    style: { color: 'rgb(255,255,255)', linewidth: 1 }
                },
                {
                    value: 2500,
                    label: '动态限速标志',
                    style: { color: 'rgb(255,255,255)', linewidth: 1 }
                },
                {
                    value: 2600,
                    label: '其他电子标志牌',
                    style: { color: 'rgb(255,255,255)', linewidth: 1 }
                },
                {
                    value: 2601,
                    label: '未定义',
                    style: { color: 'rgb(255,255,255)', linewidth: 1 }
                }
            ]
        }
    },
    AD_TrafficLight_Geo: {
        type: 'Polygon',
        showFields: ['FEAT_TYPE'],
        order: 22,
        showStyles: ['vectorStyle'],
        vectorStyle: {
            FEAT_TYPE: [
                {
                    value: 0,
                    label: '未定义',
                    style: { color: 'rgb(255,255,255)', linewidth: 1 }
                },
                {
                    value: 3001,
                    label: '普通交通信号灯',
                    style: { color: 'rgb(255,255,255)', linewidth: 1 }
                },
                {
                    value: 3002,
                    label: '方向指示信号灯',
                    style: { color: 'rgb(255,255,255)', linewidth: 1 }
                },
                {
                    value: 3003,
                    label: '铁路平交路口信号灯',
                    style: { color: 'rgb(255,255,255)', linewidth: 1 }
                },
                {
                    value: 3099,
                    label: '其他',
                    style: { color: 'rgb(255,255,255)', linewidth: 1 }
                }
            ]
        }
    },
    AD_Pole_Geo: {
        type: 'Line',
        showFields: ['NOKEY'],
        pointFLFields: ['NOKEY'],
        arrowFields: ['NOKEY'],
        order: 23,
        showStyles: ['vectorStyle'],
        vectorStyle: {
            NOKEY: [
                {
                    style: { color: 'rgb(255,255,255)', linewidth: 1 }
                }
            ]
        },
        pointFLStyle: {
            NOKEY: [
                {
                    style: { color: 'rgb(255,255,255)' }
                }
            ]
        },
        arrowStyle: {
            NOKEY: [
                {
                    style: { color: 'rgb(255,255,255)', linewidth: 1 }
                }
            ]
        }
    }
};
