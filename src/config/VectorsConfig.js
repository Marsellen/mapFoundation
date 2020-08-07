const biaojituceng = require('../assets/img/biaojituceng.png');

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
                    style: { color: 'rgb(30,170,106)', linewidth: 1 }
                },
                {
                    value: 1,
                    label: '实际道路参考线',
                    style: { color: 'rgb(30,170,106)', linewidth: 1 }
                },
                {
                    value: 2,
                    label: '虚拟道路参考线',
                    style: { color: 'rgb(30,170,106)', linewidth: 1 }
                }
            ]
        },
        pointFLStyle: {
            TYPE: [
                {
                    value: 0,
                    label: '未定义',
                    style: { color: 'rgb(30,170,106)' }
                },
                {
                    value: 1,
                    label: '实际道路参考线',
                    style: { color: 'rgb(30,170,106)' }
                },
                {
                    value: 2,
                    label: '虚拟道路参考线',
                    style: { color: 'rgb(30,170,106)' }
                }
            ]
        },
        arrowStyle: {
            TYPE: [
                {
                    value: 0,
                    label: '未定义',
                    style: { color: 'rgb(30,170,106)', linewidth: 1 }
                },
                {
                    value: 1,
                    label: '实际道路参考线',
                    style: { color: 'rgb(30,170,106)', linewidth: 1 }
                },
                {
                    value: 2,
                    label: '虚拟道路参考线',
                    style: { color: 'rgb(30,170,106)', linewidth: 1 }
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
                    style: { color: 'rgb(255,255,255)', linewidth: 1 }
                },
                {
                    value: 1,
                    label: '道路参考线',
                    style: { color: 'rgb(186,38,255)', linewidth: 1 }
                },
                {
                    value: 2,
                    label: '非道路参考线',
                    style: { color: 'rgb(255,255,255)', linewidth: 1 }
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
                    style: { color: 'rgb(186,38,255)' }
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
                    style: { color: 'rgb(255,255,255)', linewidth: 1 }
                },
                {
                    value: 1,
                    label: '道路参考线',
                    style: { color: 'rgb(186,38,255)', linewidth: 1 }
                },
                {
                    value: 2,
                    label: '非道路参考线',
                    style: { color: 'rgb(255,255,255)', linewidth: 1 }
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
                    style: { color: 'rgb(255,237,37)', linewidth: 1 }
                },
                {
                    value: 1,
                    label: '普通车道',
                    style: { color: 'rgb(255,237,37)', linewidth: 1 }
                },
                {
                    value: 2,
                    label: '路口车道',
                    style: { color: 'rgb(255,237,37)', linewidth: 1 }
                },
                {
                    value: 3,
                    label: '应急车道',
                    style: { color: 'rgb(255,237,37)', linewidth: 1 }
                },
                {
                    value: 4,
                    label: '非机动车道',
                    style: { color: 'rgb(255,237,37)', linewidth: 1 }
                },
                {
                    value: 5,
                    label: '机非混合车道',
                    style: { color: 'rgb(255,237,37)', linewidth: 1 }
                },
                {
                    value: 6,
                    label: '公交车道',
                    style: { color: 'rgb(255,237,37)', linewidth: 1 }
                },
                {
                    value: 7,
                    label: '人行道',
                    style: { color: 'rgb(255,237,37)', linewidth: 1 }
                },
                {
                    value: 8,
                    label: 'ETC车道',
                    style: { color: 'rgb(255,237,37)', linewidth: 1 }
                },
                {
                    value: 9,
                    label: '收费站车道',
                    style: { color: 'rgb(255,237,37)', linewidth: 1 }
                },
                {
                    value: 10,
                    label: '检查站车道',
                    style: { color: 'rgb(255,237,37)', linewidth: 1 }
                },
                {
                    value: 11,
                    label: '右侧加速车道',
                    style: { color: 'rgb(255,237,37)', linewidth: 1 }
                },
                {
                    value: 12,
                    label: '右侧减速车道',
                    style: { color: 'rgb(255,237,37)', linewidth: 1 }
                },
                {
                    value: 13,
                    label: '匝道',
                    style: { color: 'rgb(255,237,37)', linewidth: 1 }
                },
                {
                    value: 14,
                    label: '隔离带车道',
                    style: { color: 'rgb(255,237,37)', linewidth: 1 }
                },
                {
                    value: 15,
                    label: '紧急停车道',
                    style: { color: 'rgb(255,237,37)', linewidth: 1 }
                },
                {
                    value: 16,
                    label: 'HOV车道',
                    style: { color: 'rgb(255,237,37)', linewidth: 1 }
                },
                {
                    value: 17,
                    label: '危险用品专用车道',
                    style: { color: 'rgb(255,237,37)', linewidth: 1 }
                },
                {
                    value: 18,
                    label: '爬坡车道',
                    style: { color: 'rgb(255,237,37)', linewidth: 1 }
                },
                {
                    value: 19,
                    label: '可变导向车道',
                    style: { color: 'rgb(255,237,37)', linewidth: 1 }
                },
                {
                    value: 20,
                    label: '海关监管车道',
                    style: { color: 'rgb(255,237,37)', linewidth: 1 }
                },
                {
                    value: 21,
                    label: '避险车道引道',
                    style: { color: 'rgb(255,237,37)', linewidth: 1 }
                },
                {
                    value: 22,
                    label: '停车道',
                    style: { color: 'rgb(255,237,37)', linewidth: 1 }
                },
                {
                    value: 23,
                    label: '潮汐车道',
                    style: { color: 'rgb(255,237,37)', linewidth: 1 }
                },
                {
                    value: 24,
                    label: '左转待转车道',
                    style: { color: 'rgb(255,237,37)', linewidth: 1 }
                },
                {
                    value: 25,
                    label: '直行待行车道',
                    style: { color: 'rgb(255,237,37)', linewidth: 1 }
                },
                {
                    value: 26,
                    label: '掉头车道',
                    style: { color: 'rgb(255,237,37)', linewidth: 1 }
                },
                {
                    value: 27,
                    label: '超车道',
                    style: { color: 'rgb(255,237,37)', linewidth: 1 }
                },
                {
                    value: 28,
                    label: '服务区车道',
                    style: { color: 'rgb(255,237,37)', linewidth: 1 }
                },
                {
                    value: 29,
                    label: '左侧加速车道',
                    style: { color: 'rgb(255,237,37)', linewidth: 1 }
                },
                {
                    value: 30,
                    label: '左侧减速车道',
                    style: { color: 'rgb(255,237,37)', linewidth: 1 }
                },
                {
                    value: 31,
                    label: '复合车道',
                    style: { color: 'rgb(255,237,37)', linewidth: 1 }
                },
                {
                    value: 99,
                    label: '其他',
                    style: { color: 'rgb(255,237,37)', linewidth: 1 }
                }
            ]
        },
        pointFLStyle: {
            TYPE: [
                {
                    value: 0,
                    label: '未定义',
                    style: { color: 'rgb(255,237,37)' }
                },
                {
                    value: 1,
                    label: '普通车道',
                    style: { color: 'rgb(255,237,37)' }
                },
                {
                    value: 2,
                    label: '路口车道',
                    style: { color: 'rgb(255,237,37)' }
                },
                {
                    value: 3,
                    label: '应急车道',
                    style: { color: 'rgb(255,237,37)' }
                },
                {
                    value: 4,
                    label: '非机动车道',
                    style: { color: 'rgb(255,237,37)' }
                },
                {
                    value: 5,
                    label: '机非混合车道',
                    style: { color: 'rgb(255,237,37)' }
                },
                {
                    value: 6,
                    label: '公交车道',
                    style: { color: 'rgb(255,237,37)' }
                },
                {
                    value: 7,
                    label: '人行道',
                    style: { color: 'rgb(255,237,37)' }
                },
                {
                    value: 8,
                    label: 'ETC车道',
                    style: { color: 'rgb(255,237,37)' }
                },
                {
                    value: 9,
                    label: '收费站车道',
                    style: { color: 'rgb(255,237,37)' }
                },
                {
                    value: 10,
                    label: '检查站车道',
                    style: { color: 'rgb(255,237,37)' }
                },
                {
                    value: 11,
                    label: '右侧加速车道',
                    style: { color: 'rgb(255,237,37)' }
                },
                {
                    value: 12,
                    label: '右侧减速车道',
                    style: { color: 'rgb(255,237,37)' }
                },
                {
                    value: 13,
                    label: '匝道',
                    style: { color: 'rgb(255,237,37)' }
                },
                {
                    value: 14,
                    label: '隔离带车道',
                    style: { color: 'rgb(255,237,37)' }
                },
                {
                    value: 15,
                    label: '紧急停车道',
                    style: { color: 'rgb(255,237,37)' }
                },
                {
                    value: 16,
                    label: 'HOV车道',
                    style: { color: 'rgb(255,237,37)' }
                },
                {
                    value: 17,
                    label: '危险用品专用车道',
                    style: { color: 'rgb(255,237,37)' }
                },
                {
                    value: 18,
                    label: '爬坡车道',
                    style: { color: 'rgb(255,237,37)' }
                },
                {
                    value: 19,
                    label: '可变导向车道',
                    style: { color: 'rgb(255,237,37)' }
                },
                {
                    value: 20,
                    label: '海关监管车道',
                    style: { color: 'rgb(255,237,37)' }
                },
                {
                    value: 21,
                    label: '避险车道引道',
                    style: { color: 'rgb(255,237,37)' }
                },
                {
                    value: 22,
                    label: '停车道',
                    style: { color: 'rgb(255,237,37)' }
                },
                {
                    value: 23,
                    label: '潮汐车道',
                    style: { color: 'rgb(255,237,37)' }
                },
                {
                    value: 24,
                    label: '左转待转车道',
                    style: { color: 'rgb(255,237,37)' }
                },
                {
                    value: 25,
                    label: '直行待行车道',
                    style: { color: 'rgb(255,237,37)' }
                },
                {
                    value: 26,
                    label: '掉头车道',
                    style: { color: 'rgb(255,237,37)' }
                },
                {
                    value: 27,
                    label: '超车道',
                    style: { color: 'rgb(255,237,37)' }
                },
                {
                    value: 28,
                    label: '服务区车道',
                    style: { color: 'rgb(255,237,37)' }
                },
                {
                    value: 29,
                    label: '左侧加速车道',
                    style: { color: 'rgb(255,237,37)' }
                },
                {
                    value: 30,
                    label: '左侧减速车道',
                    style: { color: 'rgb(255,237,37)' }
                },
                {
                    value: 31,
                    label: '复合车道',
                    style: { color: 'rgb(255,237,37)' }
                },
                {
                    value: 99,
                    label: '其他',
                    style: { color: 'rgb(255,237,37)' }
                }
            ]
        },
        arrowStyle: {
            TYPE: [
                {
                    value: 0,
                    label: '未定义',
                    style: { color: 'rgb(255,237,37)', linewidth: 1 }
                },
                {
                    value: 1,
                    label: '普通车道',
                    style: { color: 'rgb(255,237,37)', linewidth: 1 }
                },
                {
                    value: 2,
                    label: '路口车道',
                    style: { color: 'rgb(255,237,37)', linewidth: 1 }
                },
                {
                    value: 3,
                    label: '应急车道',
                    style: { color: 'rgb(255,237,37)', linewidth: 1 }
                },
                {
                    value: 4,
                    label: '非机动车道',
                    style: { color: 'rgb(255,237,37)', linewidth: 1 }
                },
                {
                    value: 5,
                    label: '机非混合车道',
                    style: { color: 'rgb(255,237,37)', linewidth: 1 }
                },
                {
                    value: 6,
                    label: '公交车道',
                    style: { color: 'rgb(255,237,37)', linewidth: 1 }
                },
                {
                    value: 7,
                    label: '人行道',
                    style: { color: 'rgb(255,237,37)', linewidth: 1 }
                },
                {
                    value: 8,
                    label: 'ETC车道',
                    style: { color: 'rgb(255,237,37)', linewidth: 1 }
                },
                {
                    value: 9,
                    label: '收费站车道',
                    style: { color: 'rgb(255,237,37)', linewidth: 1 }
                },
                {
                    value: 10,
                    label: '检查站车道',
                    style: { color: 'rgb(255,237,37)', linewidth: 1 }
                },
                {
                    value: 11,
                    label: '右侧加速车道',
                    style: { color: 'rgb(255,237,37)', linewidth: 1 }
                },
                {
                    value: 12,
                    label: '右侧减速车道',
                    style: { color: 'rgb(255,237,37)', linewidth: 1 }
                },
                {
                    value: 13,
                    label: '匝道',
                    style: { color: 'rgb(255,237,37)', linewidth: 1 }
                },
                {
                    value: 14,
                    label: '隔离带车道',
                    style: { color: 'rgb(255,237,37)', linewidth: 1 }
                },
                {
                    value: 15,
                    label: '紧急停车道',
                    style: { color: 'rgb(255,237,37)', linewidth: 1 }
                },
                {
                    value: 16,
                    label: 'HOV车道',
                    style: { color: 'rgb(255,237,37)', linewidth: 1 }
                },
                {
                    value: 17,
                    label: '危险用品专用车道',
                    style: { color: 'rgb(255,237,37)', linewidth: 1 }
                },
                {
                    value: 18,
                    label: '爬坡车道',
                    style: { color: 'rgb(255,237,37)', linewidth: 1 }
                },
                {
                    value: 19,
                    label: '可变导向车道',
                    style: { color: 'rgb(255,237,37)', linewidth: 1 }
                },
                {
                    value: 20,
                    label: '海关监管车道',
                    style: { color: 'rgb(255,237,37)', linewidth: 1 }
                },
                {
                    value: 21,
                    label: '避险车道引道',
                    style: { color: 'rgb(255,237,37)', linewidth: 1 }
                },
                {
                    value: 22,
                    label: '停车道',
                    style: { color: 'rgb(255,237,37)', linewidth: 1 }
                },
                {
                    value: 23,
                    label: '潮汐车道',
                    style: { color: 'rgb(255,237,37)', linewidth: 1 }
                },
                {
                    value: 24,
                    label: '左转待转车道',
                    style: { color: 'rgb(255,237,37)', linewidth: 1 }
                },
                {
                    value: 25,
                    label: '直行待行车道',
                    style: { color: 'rgb(255,237,37)', linewidth: 1 }
                },
                {
                    value: 26,
                    label: '掉头车道',
                    style: { color: 'rgb(255,237,37)', linewidth: 1 }
                },
                {
                    value: 27,
                    label: '超车道',
                    style: { color: 'rgb(255,237,37)', linewidth: 1 }
                },
                {
                    value: 28,
                    label: '服务区车道',
                    style: { color: 'rgb(255,237,37)', linewidth: 1 }
                },
                {
                    value: 29,
                    label: '左侧加速车道',
                    style: { color: 'rgb(255,237,37)', linewidth: 1 }
                },
                {
                    value: 30,
                    label: '左侧减速车道',
                    style: { color: 'rgb(255,237,37)', linewidth: 1 }
                },
                {
                    value: 31,
                    label: '复合车道',
                    style: { color: 'rgb(255,237,37)', linewidth: 1 }
                },
                {
                    value: 99,
                    label: '其他',
                    style: { color: 'rgb(255,237,37)', linewidth: 1 }
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
                        color: 'rgb(102,255,102)',
                        radius: 0.15,
                        opacity: 0.6,
                        size: 80
                    }
                },
                {
                    value: 1,
                    label: '道路左侧出口',
                    style: {
                        color: 'rgb(102,255,102)',
                        radius: 0.15,
                        opacity: 0.6,
                        size: 80
                    }
                },
                {
                    value: 2,
                    label: '道路右侧出口',
                    style: {
                        color: 'rgb(102,255,102)',
                        radius: 0.15,
                        opacity: 0.6,
                        size: 80
                    }
                },
                {
                    value: 3,
                    label: '道路分离点',
                    style: {
                        color: 'rgb(102,255,102)',
                        radius: 0.15,
                        opacity: 0.6,
                        size: 80
                    }
                },
                {
                    value: 4,
                    label: '道路合并点',
                    style: {
                        color: 'rgb(102,255,102)',
                        radius: 0.15,
                        opacity: 0.6,
                        size: 80
                    }
                },
                {
                    value: 5,
                    label: '车道合并点',
                    style: {
                        color: 'rgb(102,255,102)',
                        radius: 0.15,
                        opacity: 0.6,
                        size: 80
                    }
                },

                {
                    value: 21,
                    label: '服务区道路开始位置',
                    style: {
                        color: 'rgb(102,255,102)',
                        radius: 0.15,
                        opacity: 0.6,
                        size: 80
                    }
                },
                {
                    value: 22,
                    label: '服务区道路结束位置',
                    style: {
                        color: 'rgb(102,255,102)',
                        radius: 0.15,
                        opacity: 0.6,
                        size: 80
                    }
                },

                {
                    value: 41,
                    label: '点云不清晰起点',
                    style: {
                        color: 'rgb(102,255,102)',
                        radius: 0.15,
                        opacity: 0.6,
                        size: 80
                    }
                },
                {
                    value: 42,
                    label: '点云不清晰结束点',
                    style: {
                        color: 'rgb(102,255,102)',
                        radius: 0.15,
                        opacity: 0.6,
                        size: 80
                    }
                },
                {
                    value: 43,
                    label: '点云遮挡起点',
                    style: {
                        color: 'rgb(102,255,102)',
                        radius: 0.15,
                        opacity: 0.6,
                        size: 80
                    }
                },
                {
                    value: 44,
                    label: '点云遮挡结束',
                    style: {
                        color: 'rgb(102,255,102)',
                        radius: 0.15,
                        opacity: 0.6,
                        size: 80
                    }
                },
                {
                    value: 45,
                    label: '精度误差起始',
                    style: {
                        color: 'rgb(102,255,102)',
                        radius: 0.15,
                        opacity: 0.6,
                        size: 80
                    }
                },
                {
                    value: 46,
                    label: '精度误差结束',
                    style: {
                        color: 'rgb(102,255,102)',
                        radius: 0.15,
                        opacity: 0.6,
                        size: 80
                    }
                },
                {
                    value: 47,
                    label: '道路施工起始',
                    style: {
                        color: 'rgb(102,255,102)',
                        radius: 0.15,
                        opacity: 0.6,
                        size: 80
                    }
                },
                {
                    value: 48,
                    label: '道路施工结束',
                    style: {
                        color: 'rgb(102,255,102)',
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
                    style: { color: 'rgb(137,195,255)', linewidth: 1 }
                },
                {
                    value: 1,
                    label: '停止线',
                    style: { color: 'rgb(137,195,255)', linewidth: 1 }
                },
                {
                    value: 2,
                    label: '停车让行线',
                    style: { color: 'rgb(137,195,255)', linewidth: 1 }
                },
                {
                    value: 3,
                    label: '减速让行线',
                    style: { color: 'rgb(137,195,255)', linewidth: 1 }
                }
            ]
        },
        pointFLStyle: {
            TYPE: [
                {
                    value: 0,
                    label: '未定义',
                    style: { color: 'rgb(137,195,255)' }
                },
                {
                    value: 1,
                    label: '停止线',
                    style: { color: 'rgb(137,195,255)' }
                },
                {
                    value: 2,
                    label: '停车让行线',
                    style: { color: 'rgb(137,195,255)' }
                },
                {
                    value: 3,
                    label: '减速让行线',
                    style: { color: 'rgb(137,195,255)' }
                }
            ]
        },
        arrowStyle: {
            TYPE: [
                {
                    value: 0,
                    label: '未定义',
                    style: { color: 'rgb(137,195,255)', linewidth: 1 }
                },
                {
                    value: 1,
                    label: '停止线',
                    style: { color: 'rgb(137,195,255)', linewidth: 1 }
                },
                {
                    value: 2,
                    label: '停车让行线',
                    style: { color: 'rgb(137,195,255)', linewidth: 1 }
                },
                {
                    value: 3,
                    label: '减速让行线',
                    style: { color: 'rgb(137,195,255)', linewidth: 1 }
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
            ]
        }
    },
    AD_Text: {
        type: 'Polygon',
        showFields: ['TYPE'],
        order: 7,
        showStyles: ['vectorStyle'],
        vectorStyle: {
            TYPE: [
                {
                    value: 0,
                    label: '未定义',
                    style: { color: 'rgb(255,234,149)', linewidth: 1 }
                },
                {
                    value: 1,
                    label: '最高限速',
                    style: { color: 'rgb(255,234,149)', linewidth: 1 }
                },
                {
                    value: 2,
                    label: '最低限速',
                    style: { color: 'rgb(255,234,149)', linewidth: 1 }
                },
                {
                    value: 3,
                    label: '公交车道时间限制',
                    style: { color: 'rgb(255,234,149)', linewidth: 1 }
                },
                {
                    value: 99,
                    label: '其他',
                    style: { color: 'rgb(255,234,149)', linewidth: 1 }
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
                        color: 'rgb(70,109,255)',
                        linewidth: 1,
                        colorFill: 'rgb(250,250,250)'
                    }
                },
                {
                    value: 1,
                    label: '单个标志牌',
                    style: {
                        color: 'rgb(70,109,255)',
                        linewidth: 1,
                        colorFill: 'rgb(250,250,250)'
                    }
                },
                {
                    value: 2,
                    label: '组合标志牌',
                    style: {
                        color: 'rgb(70,109,255)',
                        linewidth: 1,
                        colorFill: 'rgb(250,250,250)'
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
                        color: 'rgb(231,120,0)',
                        linewidth: 1,
                        colorFill: 'rgb(243,5,5)'
                    }
                },
                {
                    value: 1,
                    label: '普通机动车信号灯',
                    style: {
                        color: 'rgb(231,120,0)',
                        linewidth: 1,
                        colorFill: 'rgb(243,5,5)'
                    }
                },
                {
                    value: 2,
                    label: '方向指示信号灯',
                    style: {
                        color: 'rgb(231,120,0)',
                        linewidth: 1,
                        colorFill: 'rgb(243,5,5)'
                    }
                },
                {
                    value: 3,
                    label: '铁路交叉路口信号灯',
                    style: {
                        color: 'rgb(231,120,0)',
                        linewidth: 1,
                        colorFill: 'rgb(243,5,5)'
                    }
                },
                {
                    value: 4,
                    label: '人行横道信号灯',
                    style: {
                        color: 'rgb(231,120,0)',
                        linewidth: 1,
                        colorFill: 'rgb(243,5,5)'
                    }
                },
                {
                    value: 99,
                    label: '其他',
                    style: {
                        color: 'rgb(231,120,0)',
                        linewidth: 1,
                        colorFill: 'rgb(243,5,5)'
                    }
                }
            ]
        }
    },
    AD_Pole: {
        type: 'Line',
        showFields: ['NOKEY'],
        pointFLFields: ['NOKEY'],
        arrowFields: ['NOKEY'],
        order: 4,
        showStyles: ['vectorStyle'],
        vectorStyle: {
            NOKEY: [
                {
                    style: { color: 'rgb(32,52,240)', linewidth: 1 }
                }
            ]
        },
        pointFLStyle: {
            NOKEY: [
                {
                    style: { color: 'rgb(32,52,240)' }
                }
            ]
        },
        arrowStyle: {
            NOKEY: [
                {
                    style: { color: 'rgb(32,52,240)', linewidth: 1 }
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
                        color: 'rgb(70,109,255)',
                        linewidth: 1
                    }
                },
                {
                    value: 1,
                    label: '隧道墙',
                    style: {
                        color: 'rgb(70,109,255)',
                        linewidth: 1
                    }
                },
                {
                    value: 2,
                    label: '路侧防护栏',
                    style: {
                        color: 'rgb(70,109,255)',
                        linewidth: 1
                    }
                },
                {
                    value: 3,
                    label: '路缘石',
                    style: {
                        color: 'rgb(70,109,255)',
                        linewidth: 1
                    }
                },
                {
                    value: 4,
                    label: '隔音墙',
                    style: {
                        color: 'rgb(70,109,255)',
                        linewidth: 1
                    }
                },
                {
                    value: 5,
                    label: '其他墙体',
                    style: {
                        color: 'rgb(70,109,255)',
                        linewidth: 1
                    }
                },
                {
                    value: 6,
                    label: '道路轮廓标',
                    style: {
                        color: 'rgb(70,109,255)',
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
                        color: 'rgb(70,109,255)'
                    }
                },
                {
                    value: 1,
                    label: '隧道墙',
                    style: {
                        color: 'rgb(70,109,255)'
                    }
                },
                {
                    value: 2,
                    label: '路侧防护栏',
                    style: {
                        color: 'rgb(70,109,255)'
                    }
                },
                {
                    value: 3,
                    label: '路缘石',
                    style: {
                        color: 'rgb(70,109,255)'
                    }
                },
                {
                    value: 4,
                    label: '隔音墙',
                    style: {
                        color: 'rgb(70,109,255)'
                    }
                },
                {
                    value: 5,
                    label: '其他墙体',
                    style: {
                        color: 'rgb(70,109,255)'
                    }
                },
                {
                    value: 6,
                    label: '道路轮廓标',
                    style: {
                        color: 'rgb(70,109,255)'
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
                        color: 'rgb(70,109,255)',
                        linewidth: 1
                    }
                },
                {
                    value: 1,
                    label: '隧道墙',
                    style: {
                        color: 'rgb(70,109,255)',
                        linewidth: 1
                    }
                },
                {
                    value: 2,
                    label: '路侧防护栏',
                    style: {
                        color: 'rgb(70,109,255)',
                        linewidth: 1
                    }
                },
                {
                    value: 3,
                    label: '路缘石',
                    style: {
                        color: 'rgb(70,109,255)',
                        linewidth: 1
                    }
                },
                {
                    value: 4,
                    label: '隔音墙',
                    style: {
                        color: 'rgb(70,109,255)',
                        linewidth: 1
                    }
                },
                {
                    value: 5,
                    label: '其他墙体',
                    style: {
                        color: 'rgb(70,109,255)',
                        linewidth: 1
                    }
                },
                {
                    value: 6,
                    label: '道路轮廓标',
                    style: {
                        color: 'rgb(70,109,255)',
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
                        color: 'rgb(235,45,19)',
                        radius: 0.3,
                        url: biaojituceng,
                        size: 80
                    }
                },
                {
                    value: 1,
                    label: '已修正',
                    style: {
                        color: 'rgb(235,45,19)',
                        radius: 0.3,
                        url: biaojituceng,
                        size: 80
                    }
                },
                {
                    value: 2,
                    label: '未修正',
                    style: {
                        color: 'rgb(235,45,19)',
                        radius: 0.3,
                        url: biaojituceng,
                        size: 80
                    }
                }
            ]
        }
    }
};
