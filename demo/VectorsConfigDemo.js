//符号样式完整示例

const biaojituceng = require('../assets/img/biaojituceng.png'); //通用符号配置

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
        showFields: ['TYPE'],
        pointFLFields: ['TYPE'],
        arrowFields: ['TYPE'],
        order: 14,
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
                    label: '单实线',
                    style: { color: 'rgb(255,255,255)', linewidth: 1 }
                },
                {
                    value: 2,
                    label: '单虚线',
                    style: { color: 'rgb(255,255,255)', linewidth: 1 }
                },
                {
                    value: 3,
                    label: '双实线',
                    style: { color: 'rgb(255,255,255)', linewidth: 1 }
                },
                {
                    value: 4,
                    label: '双虚线',
                    style: { color: 'rgb(255,255,255)', linewidth: 1 }
                },
                {
                    value: 5,
                    label: '左实右虚',
                    style: { color: 'rgb(255,255,255)', linewidth: 1 }
                },
                {
                    value: 6,
                    label: '左虚右实',
                    style: { color: 'rgb(255,255,255)', linewidth: 1 }
                },
                {
                    value: 7,
                    label: '短粗虚线',
                    style: { color: 'rgb(255,255,255)', linewidth: 1 }
                },
                {
                    value: 8,
                    label: '导流线',
                    style: { color: 'rgb(255,255,255)', linewidth: 1 }
                },
                {
                    value: 9,
                    label: '车道虚拟车道线',
                    style: { color: 'rgb(255,255,255)', linewidth: 1 }
                },
                {
                    value: 10,
                    label: '路边缘虚拟车道线',
                    style: { color: 'rgb(255,255,255)', linewidth: 1 }
                },
                {
                    value: 11,
                    label: '防护栏',
                    style: { color: 'rgb(255,255,255)', linewidth: 1 }
                },
                {
                    value: 12,
                    label: '隧道墙',
                    style: { color: 'rgb(255,255,255)', linewidth: 1 }
                },
                {
                    value: 13,
                    label: '路缘石',
                    style: { color: 'rgb(255,255,255)', linewidth: 1 }
                },
                {
                    value: 14,
                    label: '自然边界',
                    style: { color: 'rgb(255,255,255)', linewidth: 1 }
                },
                {
                    value: 15,
                    label: '施工边界',
                    style: { color: 'rgb(255,255,255)', linewidth: 1 }
                },
                {
                    value: 16,
                    label: '路中隔离带',
                    style: { color: 'rgb(255,255,255)', linewidth: 1 }
                },
                {
                    value: 17,
                    label: '待转待行区车道线',
                    style: { color: 'rgb(255,255,255)', linewidth: 1 }
                },
                {
                    value: 18,
                    label: '可变导向车道线',
                    style: { color: 'rgb(255,255,255)', linewidth: 1 }
                },
                {
                    value: 19,
                    label: '路口内虚拟车道线',
                    style: { color: 'rgb(255,255,255)', linewidth: 1 }
                },
                {
                    value: 20,
                    label: '其他虚拟车道线',
                    style: { color: 'rgb(255,255,255)', linewidth: 1 }
                },
                {
                    value: 99,
                    label: '其他',
                    style: { color: 'rgb(255,255,255)', linewidth: 1 }
                }
            ]
        },
        pointFLStyle: {
            TYPE: [
                {
                    value: 0,
                    label: '未定义',
                    style: { color: 'rgb(255,255,255)', linewidth: 1 }
                },
                {
                    value: 1,
                    label: '单实线',
                    style: { color: 'rgb(255,255,255)', linewidth: 1 }
                },
                {
                    value: 2,
                    label: '单虚线',
                    style: { color: 'rgb(255,255,255)', linewidth: 1 }
                },
                {
                    value: 3,
                    label: '双实线',
                    style: { color: 'rgb(255,255,255)', linewidth: 1 }
                },
                {
                    value: 4,
                    label: '双虚线',
                    style: { color: 'rgb(255,255,255)', linewidth: 1 }
                },
                {
                    value: 5,
                    label: '左实右虚',
                    style: { color: 'rgb(255,255,255)', linewidth: 1 }
                },
                {
                    value: 6,
                    label: '左虚右实',
                    style: { color: 'rgb(255,255,255)', linewidth: 1 }
                },
                {
                    value: 7,
                    label: '短粗虚线',
                    style: { color: 'rgb(255,255,255)', linewidth: 1 }
                },
                {
                    value: 8,
                    label: '导流线',
                    style: { color: 'rgb(255,255,255)', linewidth: 1 }
                },
                {
                    value: 9,
                    label: '车道虚拟车道线',
                    style: { color: 'rgb(255,255,255)', linewidth: 1 }
                },
                {
                    value: 10,
                    label: '路边缘虚拟车道线',
                    style: { color: 'rgb(255,255,255)', linewidth: 1 }
                },
                {
                    value: 11,
                    label: '防护栏',
                    style: { color: 'rgb(255,255,255)', linewidth: 1 }
                },
                {
                    value: 12,
                    label: '隧道墙',
                    style: { color: 'rgb(255,255,255)', linewidth: 1 }
                },
                {
                    value: 13,
                    label: '路缘石',
                    style: { color: 'rgb(255,255,255)', linewidth: 1 }
                },
                {
                    value: 14,
                    label: '自然边界',
                    style: { color: 'rgb(255,255,255)', linewidth: 1 }
                },
                {
                    value: 15,
                    label: '施工边界',
                    style: { color: 'rgb(255,255,255)', linewidth: 1 }
                },
                {
                    value: 16,
                    label: '路中隔离带',
                    style: { color: 'rgb(255,255,255)', linewidth: 1 }
                },
                {
                    value: 17,
                    label: '待转待行区车道线',
                    style: { color: 'rgb(255,255,255)', linewidth: 1 }
                },
                {
                    value: 18,
                    label: '可变导向车道线',
                    style: { color: 'rgb(255,255,255)', linewidth: 1 }
                },
                {
                    value: 19,
                    label: '路口内虚拟车道线',
                    style: { color: 'rgb(255,255,255)', linewidth: 1 }
                },
                {
                    value: 20,
                    label: '其他虚拟车道线',
                    style: { color: 'rgb(255,255,255)', linewidth: 1 }
                },
                {
                    value: 99,
                    label: '其他',
                    style: { color: 'rgb(255,255,255)', linewidth: 1 }
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
                    label: '单实线',
                    style: { color: 'rgb(255,255,255)', linewidth: 1 }
                },
                {
                    value: 2,
                    label: '单虚线',
                    style: { color: 'rgb(255,255,255)', linewidth: 1 }
                },
                {
                    value: 3,
                    label: '双实线',
                    style: { color: 'rgb(255,255,255)', linewidth: 1 }
                },
                {
                    value: 4,
                    label: '双虚线',
                    style: { color: 'rgb(255,255,255)', linewidth: 1 }
                },
                {
                    value: 5,
                    label: '左实右虚',
                    style: { color: 'rgb(255,255,255)', linewidth: 1 }
                },
                {
                    value: 6,
                    label: '左虚右实',
                    style: { color: 'rgb(255,255,255)', linewidth: 1 }
                },
                {
                    value: 7,
                    label: '短粗虚线',
                    style: { color: 'rgb(255,255,255)', linewidth: 1 }
                },
                {
                    value: 8,
                    label: '导流线',
                    style: { color: 'rgb(255,255,255)', linewidth: 1 }
                },
                {
                    value: 9,
                    label: '车道虚拟车道线',
                    style: { color: 'rgb(255,255,255)', linewidth: 1 }
                },
                {
                    value: 10,
                    label: '路边缘虚拟车道线',
                    style: { color: 'rgb(255,255,255)', linewidth: 1 }
                },
                {
                    value: 11,
                    label: '防护栏',
                    style: { color: 'rgb(255,255,255)', linewidth: 1 }
                },
                {
                    value: 12,
                    label: '隧道墙',
                    style: { color: 'rgb(255,255,255)', linewidth: 1 }
                },
                {
                    value: 13,
                    label: '路缘石',
                    style: { color: 'rgb(255,255,255)', linewidth: 1 }
                },
                {
                    value: 14,
                    label: '自然边界',
                    style: { color: 'rgb(255,255,255)', linewidth: 1 }
                },
                {
                    value: 15,
                    label: '施工边界',
                    style: { color: 'rgb(255,255,255)', linewidth: 1 }
                },
                {
                    value: 16,
                    label: '路中隔离带',
                    style: { color: 'rgb(255,255,255)', linewidth: 1 }
                },
                {
                    value: 17,
                    label: '待转待行区车道线',
                    style: { color: 'rgb(255,255,255)', linewidth: 1 }
                },
                {
                    value: 18,
                    label: '可变导向车道线',
                    style: { color: 'rgb(255,255,255)', linewidth: 1 }
                },
                {
                    value: 19,
                    label: '路口内虚拟车道线',
                    style: { color: 'rgb(255,255,255)', linewidth: 1 }
                },
                {
                    value: 20,
                    label: '其他虚拟车道线',
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
                    label: '右转专用道',
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
                    label: '左转专用道',
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
                    label: '加减速复合车道',
                    style: { color: 'rgb(255,237,37)', linewidth: 1 }
                },
                {
                    value: 32,
                    label: '公交港湾',
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
                    label: '右转专用道',
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
                    label: '左转专用道',
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
                    label: '加减速复合车道',
                    style: { color: 'rgb(255,237,37)' }
                },
                {
                    value: 32,
                    label: '公交港湾',
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
                    label: '右转专用道',
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
                    label: '左转专用道',
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
                    label: '加减速复合车道',
                    style: { color: 'rgb(255,237,37)', linewidth: 1 }
                },
                {
                    value: 32,
                    label: '公交港湾',
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
                    value: 'K',
                    label: '禁止标记',
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
        showStyles: ['vectorStyle', 'pointFLStyle'],
        vectorStyle: {
            TYPE: [
                {
                    value: 0,
                    label: '未定义',
                    style: { color: 'rgb(255,150,150)', linewidth: 1 }
                },
                {
                    value: 1,
                    label: '停止线',
                    style: { color: 'rgb(255,150,150)', linewidth: 1 }
                },
                {
                    value: 2,
                    label: '停车让行线',
                    style: { color: 'rgb(255,150,150)', linewidth: 1 }
                },
                {
                    value: 3,
                    label: '减速让行线',
                    style: { color: 'rgb(255,150,150)', linewidth: 1 }
                }
            ]
        },
        pointFLStyle: {
            TYPE: [
                {
                    value: 0,
                    label: '未定义',
                    style: { color: 'rgb(255,150,150)' }
                },
                {
                    value: 1,
                    label: '停止线',
                    style: { color: 'rgb(255,150,150)' }
                },
                {
                    value: 2,
                    label: '停车让行线',
                    style: { color: 'rgb(255,150,150)' }
                },
                {
                    value: 3,
                    label: '减速让行线',
                    style: { color: 'rgb(255,150,150)' }
                }
            ]
        },
        arrowStyle: {
            TYPE: [
                {
                    value: 0,
                    label: '未定义',
                    style: { color: 'rgb(255,150,150)', linewidth: 1 }
                },
                {
                    value: 1,
                    label: '停止线',
                    style: { color: 'rgb(255,150,150)', linewidth: 1 }
                },
                {
                    value: 2,
                    label: '停车让行线',
                    style: { color: 'rgb(255,150,150)', linewidth: 1 }
                },
                {
                    value: 3,
                    label: '减速让行线',
                    style: { color: 'rgb(255,150,150)', linewidth: 1 }
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
                    style: { color: 'rgb(255,234,149)', linewidth: 1 }
                },
                {
                    value: 1,
                    label: '最高速度限制',
                    style: { color: 'rgb(255,234,149)', linewidth: 1 }
                },
                {
                    value: 2,
                    label: '最低速度限制',
                    style: { color: 'rgb(255,234,149)', linewidth: 1 }
                },
                {
                    value: 3,
                    label: '潮汐车道时间限制',
                    style: { color: 'rgb(255,234,149)', linewidth: 1 }
                },
                {
                    value: 4,
                    label: '禁止停车时间限制',
                    style: { color: 'rgb(255,234,149)', linewidth: 1 }
                },
                {
                    value: 5,
                    label: 'HOV车道时间限制',
                    style: { color: 'rgb(255,234,149)', linewidth: 1 }
                },
                {
                    value: 6,
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
        showFields: ['NOKEY'],
        order: 6,
        showStyles: ['vectorStyle'],
        vectorStyle: {
            NOKEY: [
                {
                    color: 'rgb(70,109,255)',
                    linewidth: 1,
                    colorFill: 'rgb(250,250,250)'
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
                    style: { color: 'rgb(0,255,160)', linewidth: 1 }
                },
                {
                    value: 1002,
                    label: '单虚线',
                    style: { color: 'rgb(0,255,160)', linewidth: 1 }
                },
                {
                    value: 1004,
                    label: '双虚线',
                    style: { color: 'rgb(0,255,160)', linewidth: 1 }
                },
                {
                    value: 1005,
                    label: '左实右虚线',
                    style: { color: 'rgb(0,255,160)', linewidth: 1 }
                },
                {
                    value: 1006,
                    label: '左虚右实线',
                    style: { color: 'rgb(0,255,160)', linewidth: 1 }
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
                    style: { color: 'rgb(137,195,255)', linewidth: 1 }
                },
                {
                    value: 2001,
                    label: '停止线',
                    style: { color: 'rgb(137,195,255)', linewidth: 1 }
                },
                {
                    value: 2002,
                    label: '停车让行线',
                    style: { color: 'rgb(137,195,255)', linewidth: 1 }
                },
                {
                    value: 2003,
                    label: '减速让行线',
                    style: { color: 'rgb(137,195,255)', linewidth: 1 }
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
                    style: { color: 'rgb(147,112,219)', linewidth: 1 }
                },
                {
                    value: 4001,
                    label: '减速警示线',
                    style: { color: 'rgb(147,112,219)', linewidth: 1 }
                },
                {
                    value: 4002,
                    label: '减速带',
                    style: { color: 'rgb(147,112,219)', linewidth: 1 }
                },
                {
                    value: 9901,
                    label: '人行横道',
                    style: { color: 'rgb(147,112,219)', linewidth: 1 }
                },
                {
                    value: 9902,
                    label: '禁止停车区',
                    style: { color: 'rgb(147,112,219)', linewidth: 1 }
                },
                {
                    value: 9903,
                    label: '导流区',
                    style: { color: 'rgb(147,112,219)', linewidth: 1 }
                },
                {
                    value: 9904,
                    label: '路口内中心圈',
                    style: { color: 'rgb(147,112,219)', linewidth: 1 }
                },
                {
                    value: 9905,
                    label: '车距确认线',
                    style: { color: 'rgb(147,112,219)', linewidth: 1 }
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
    }
};
