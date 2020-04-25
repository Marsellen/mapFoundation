//文字注记默认配置
export default {
    AD_Road: {
        type: 'Line',
        //文字注记配置按什么类别展示，当前支持一个
        textField: 'TYPE',
        order: 15,
        //要展示的样式，['vectorStyle','textStyle','pointFLStyle','arrowStyle']
        showStyles: ['textStyle'],
        //符号样式配置
        textStyle: {
            TYPE: [
                {
                    value: 0,
                    label: '未定义',
                    style: {
                        interval: 10,
                        showMode: 'line-repeat',
                        fontSize: 32,
                        strokeColor: { r: 0, g: 0, b: 0, a: 1.0 },
                        backgroundColor: { r: 0, g: 0, b: 0, a: 0.7 },
                        textColor: { r: 255, g: 255, b: 255, a: 1.0 }
                    }
                },
                {
                    value: 1,
                    label: '实际道路参考线',
                    style: {
                        interval: 10,
                        showMode: 'line-repeat',
                        fontSize: 32,
                        strokeColor: { r: 0, g: 0, b: 0, a: 1.0 },
                        backgroundColor: { r: 0, g: 0, b: 0, a: 0.7 },
                        textColor: { r: 255, g: 255, b: 255, a: 1.0 }
                    }
                },
                {
                    value: 2,
                    label: '虚拟道路参考线',
                    style: {
                        interval: 10,
                        showMode: 'line-repeat',
                        fontSize: 32,
                        strokeColor: { r: 0, g: 0, b: 0, a: 1.0 },
                        backgroundColor: { r: 0, g: 0, b: 0, a: 0.7 },
                        textColor: { r: 255, g: 255, b: 255, a: 1.0 }
                    }
                }
            ]
        }
    },
    AD_LaneDivider: {
        type: 'Line',
        textField: 'TYPE',
        order: 14,
        showStyles: ['textStyle'],
        textStyle: {
            TYPE: [
                {
                    value: 0,
                    label: '未定义',
                    style: {
                        textField: 'TYPE',
                        interval: 10,
                        showMode: 'line-repeat',
                        fontSize: 32,
                        strokeColor: { r: 0, g: 0, b: 0, a: 1.0 },
                        backgroundColor: { r: 0, g: 0, b: 0, a: 0.7 },
                        textColor: { r: 255, g: 255, b: 255, a: 1.0 }
                    }
                },
                {
                    value: 1,
                    label: '单实线',
                    style: {
                        textField: 'TYPE',
                        interval: 10,
                        showMode: 'line-repeat',
                        fontSize: 32,
                        strokeColor: { r: 0, g: 0, b: 0, a: 1.0 },
                        backgroundColor: { r: 0, g: 0, b: 0, a: 0.7 },
                        textColor: { r: 255, g: 255, b: 255, a: 1.0 }
                    }
                },
                {
                    value: 2,
                    label: '单虚线',
                    style: {
                        textField: 'TYPE',
                        interval: 10,
                        showMode: 'line-repeat',
                        fontSize: 32,
                        strokeColor: { r: 0, g: 0, b: 0, a: 1.0 },
                        backgroundColor: { r: 0, g: 0, b: 0, a: 0.7 },
                        textColor: { r: 255, g: 255, b: 255, a: 1.0 }
                    }
                },
                {
                    value: 3,
                    label: '双实线',
                    style: {
                        textField: 'TYPE',
                        interval: 10,
                        showMode: 'line-repeat',
                        fontSize: 32,
                        strokeColor: { r: 0, g: 0, b: 0, a: 1.0 },
                        backgroundColor: { r: 0, g: 0, b: 0, a: 0.7 },
                        textColor: { r: 255, g: 255, b: 255, a: 1.0 }
                    }
                },
                {
                    value: 4,
                    label: '双虚线',
                    style: {
                        textField: 'TYPE',
                        interval: 10,
                        showMode: 'line-repeat',
                        fontSize: 32,
                        strokeColor: { r: 0, g: 0, b: 0, a: 1.0 },
                        backgroundColor: { r: 0, g: 0, b: 0, a: 0.7 },
                        textColor: { r: 255, g: 255, b: 255, a: 1.0 }
                    }
                },
                {
                    value: 5,
                    label: '左实右虚',
                    style: {
                        textField: 'TYPE',
                        interval: 10,
                        showMode: 'line-repeat',
                        fontSize: 32,
                        strokeColor: { r: 0, g: 0, b: 0, a: 1.0 },
                        backgroundColor: { r: 0, g: 0, b: 0, a: 0.7 },
                        textColor: { r: 255, g: 255, b: 255, a: 1.0 }
                    }
                },
                {
                    value: 6,
                    label: '左虚右实',
                    style: {
                        textField: 'TYPE',
                        interval: 10,
                        showMode: 'line-repeat',
                        fontSize: 32,
                        strokeColor: { r: 0, g: 0, b: 0, a: 1.0 },
                        backgroundColor: { r: 0, g: 0, b: 0, a: 0.7 },
                        textColor: { r: 255, g: 255, b: 255, a: 1.0 }
                    }
                },
                {
                    value: 7,
                    label: '短粗虚线',
                    style: {
                        textField: 'TYPE',
                        interval: 10,
                        showMode: 'line-repeat',
                        fontSize: 32,
                        strokeColor: { r: 0, g: 0, b: 0, a: 1.0 },
                        backgroundColor: { r: 0, g: 0, b: 0, a: 0.7 },
                        textColor: { r: 255, g: 255, b: 255, a: 1.0 }
                    }
                },
                {
                    value: 8,
                    label: '导流线',
                    style: {
                        textField: 'TYPE',
                        interval: 10,
                        showMode: 'line-repeat',
                        fontSize: 32,
                        strokeColor: { r: 0, g: 0, b: 0, a: 1.0 },
                        backgroundColor: { r: 0, g: 0, b: 0, a: 0.7 },
                        textColor: { r: 255, g: 255, b: 255, a: 1.0 }
                    }
                },
                {
                    value: 9,
                    label: '车道虚拟车道线',
                    style: {
                        textField: 'TYPE',
                        interval: 10,
                        showMode: 'line-repeat',
                        fontSize: 32,
                        strokeColor: { r: 0, g: 0, b: 0, a: 1.0 },
                        backgroundColor: { r: 0, g: 0, b: 0, a: 0.7 },
                        textColor: { r: 255, g: 255, b: 255, a: 1.0 }
                    }
                },
                {
                    value: 10,
                    label: '路边缘虚拟车道线',
                    style: {
                        textField: 'TYPE',
                        interval: 10,
                        showMode: 'line-repeat',
                        fontSize: 32,
                        strokeColor: { r: 0, g: 0, b: 0, a: 1.0 },
                        backgroundColor: { r: 0, g: 0, b: 0, a: 0.7 },
                        textColor: { r: 255, g: 255, b: 255, a: 1.0 }
                    }
                },
                {
                    value: 11,
                    label: '防护栏',
                    style: {
                        textField: 'TYPE',
                        interval: 10,
                        showMode: 'line-repeat',
                        fontSize: 32,
                        strokeColor: { r: 0, g: 0, b: 0, a: 1.0 },
                        backgroundColor: { r: 0, g: 0, b: 0, a: 0.7 },
                        textColor: { r: 255, g: 255, b: 255, a: 1.0 }
                    }
                },
                {
                    value: 12,
                    label: '隧道墙',
                    style: {
                        textField: 'TYPE',
                        interval: 10,
                        showMode: 'line-repeat',
                        fontSize: 32,
                        strokeColor: { r: 0, g: 0, b: 0, a: 1.0 },
                        backgroundColor: { r: 0, g: 0, b: 0, a: 0.7 },
                        textColor: { r: 255, g: 255, b: 255, a: 1.0 }
                    }
                },
                {
                    value: 13,
                    label: '路缘石',
                    style: {
                        textField: 'TYPE',
                        interval: 10,
                        showMode: 'line-repeat',
                        fontSize: 32,
                        strokeColor: { r: 0, g: 0, b: 0, a: 1.0 },
                        backgroundColor: { r: 0, g: 0, b: 0, a: 0.7 },
                        textColor: { r: 255, g: 255, b: 255, a: 1.0 }
                    }
                },
                {
                    value: 14,
                    label: '自然边界',
                    style: {
                        textField: 'TYPE',
                        interval: 10,
                        showMode: 'line-repeat',
                        fontSize: 32,
                        strokeColor: { r: 0, g: 0, b: 0, a: 1.0 },
                        backgroundColor: { r: 0, g: 0, b: 0, a: 0.7 },
                        textColor: { r: 255, g: 255, b: 255, a: 1.0 }
                    }
                },
                {
                    value: 15,
                    label: '施工边界',
                    style: {
                        textField: 'TYPE',
                        interval: 10,
                        showMode: 'line-repeat',
                        fontSize: 32,
                        strokeColor: { r: 0, g: 0, b: 0, a: 1.0 },
                        backgroundColor: { r: 0, g: 0, b: 0, a: 0.7 },
                        textColor: { r: 255, g: 255, b: 255, a: 1.0 }
                    }
                },
                {
                    value: 16,
                    label: '路中隔离带',
                    style: {
                        textField: 'TYPE',
                        interval: 10,
                        showMode: 'line-repeat',
                        fontSize: 32,
                        strokeColor: { r: 0, g: 0, b: 0, a: 1.0 },
                        backgroundColor: { r: 0, g: 0, b: 0, a: 0.7 },
                        textColor: { r: 255, g: 255, b: 255, a: 1.0 }
                    }
                },
                {
                    value: 17,
                    label: '待转待行区车道线',
                    style: {
                        textField: 'TYPE',
                        interval: 10,
                        showMode: 'line-repeat',
                        fontSize: 32,
                        strokeColor: { r: 0, g: 0, b: 0, a: 1.0 },
                        backgroundColor: { r: 0, g: 0, b: 0, a: 0.7 },
                        textColor: { r: 255, g: 255, b: 255, a: 1.0 }
                    }
                },
                {
                    value: 18,
                    label: '可变导向车道线',
                    style: {
                        textField: 'TYPE',
                        interval: 10,
                        showMode: 'line-repeat',
                        fontSize: 32,
                        strokeColor: { r: 0, g: 0, b: 0, a: 1.0 },
                        backgroundColor: { r: 0, g: 0, b: 0, a: 0.7 },
                        textColor: { r: 255, g: 255, b: 255, a: 1.0 }
                    }
                },
                {
                    value: 99,
                    label: '其他',
                    style: {
                        textField: 'TYPE',
                        interval: 10,
                        showMode: 'line-repeat',
                        fontSize: 32,
                        strokeColor: { r: 0, g: 0, b: 0, a: 1.0 },
                        backgroundColor: { r: 0, g: 0, b: 0, a: 0.7 },
                        textColor: { r: 255, g: 255, b: 255, a: 1.0 }
                    }
                }
            ]
        }
    },
    AD_Lane: {
        type: 'Line',
        textField: 'TYPE',
        order: 13,
        showStyles: ['textStyle'],
        textStyle: {
            TYPE: [
                {
                    value: 0,
                    label: '未定义',
                    style: {
                        interval: 10,
                        showMode: 'line-repeat',
                        fontSize: 32,
                        strokeColor: { r: 0, g: 0, b: 0, a: 1.0 },
                        backgroundColor: { r: 0, g: 0, b: 0, a: 0.7 },
                        textColor: { r: 255, g: 255, b: 255, a: 1.0 }
                    }
                },
                {
                    value: 1,
                    label: '普通车道',
                    style: {
                        interval: 10,
                        showMode: 'line-repeat',
                        fontSize: 32,
                        strokeColor: { r: 0, g: 0, b: 0, a: 1.0 },
                        backgroundColor: { r: 0, g: 0, b: 0, a: 0.7 },
                        textColor: { r: 255, g: 255, b: 255, a: 1.0 }
                    }
                },
                {
                    value: 2,
                    label: '路口车道',
                    style: {
                        interval: 10,
                        showMode: 'line-repeat',
                        fontSize: 32,
                        strokeColor: { r: 0, g: 0, b: 0, a: 1.0 },
                        backgroundColor: { r: 0, g: 0, b: 0, a: 0.7 },
                        textColor: { r: 255, g: 255, b: 255, a: 1.0 }
                    }
                },
                {
                    value: 3,
                    label: '应急车道',
                    style: {
                        interval: 10,
                        showMode: 'line-repeat',
                        fontSize: 32,
                        strokeColor: { r: 0, g: 0, b: 0, a: 1.0 },
                        backgroundColor: { r: 0, g: 0, b: 0, a: 0.7 },
                        textColor: { r: 255, g: 255, b: 255, a: 1.0 }
                    }
                },
                {
                    value: 4,
                    label: '非机动车道',
                    style: {
                        interval: 10,
                        showMode: 'line-repeat',
                        fontSize: 32,
                        strokeColor: { r: 0, g: 0, b: 0, a: 1.0 },
                        backgroundColor: { r: 0, g: 0, b: 0, a: 0.7 },
                        textColor: { r: 255, g: 255, b: 255, a: 1.0 }
                    }
                },
                {
                    value: 5,
                    label: '机非混合车道',
                    style: {
                        interval: 10,
                        showMode: 'line-repeat',
                        fontSize: 32,
                        strokeColor: { r: 0, g: 0, b: 0, a: 1.0 },
                        backgroundColor: { r: 0, g: 0, b: 0, a: 0.7 },
                        textColor: { r: 255, g: 255, b: 255, a: 1.0 }
                    }
                },
                {
                    value: 6,
                    label: '公交车道',
                    style: {
                        interval: 10,
                        showMode: 'line-repeat',
                        fontSize: 32,
                        strokeColor: { r: 0, g: 0, b: 0, a: 1.0 },
                        backgroundColor: { r: 0, g: 0, b: 0, a: 0.7 },
                        textColor: { r: 255, g: 255, b: 255, a: 1.0 }
                    }
                },
                {
                    value: 7,
                    label: '人行道',
                    style: {
                        interval: 10,
                        showMode: 'line-repeat',
                        fontSize: 32,
                        strokeColor: { r: 0, g: 0, b: 0, a: 1.0 },
                        backgroundColor: { r: 0, g: 0, b: 0, a: 0.7 },
                        textColor: { r: 255, g: 255, b: 255, a: 1.0 }
                    }
                },
                {
                    value: 8,
                    label: 'ETC车道',
                    style: {
                        interval: 10,
                        showMode: 'line-repeat',
                        fontSize: 32,
                        strokeColor: { r: 0, g: 0, b: 0, a: 1.0 },
                        backgroundColor: { r: 0, g: 0, b: 0, a: 0.7 },
                        textColor: { r: 255, g: 255, b: 255, a: 1.0 }
                    }
                },
                {
                    value: 9,
                    label: '收费站车道',
                    style: {
                        interval: 10,
                        showMode: 'line-repeat',
                        fontSize: 32,
                        strokeColor: { r: 0, g: 0, b: 0, a: 1.0 },
                        backgroundColor: { r: 0, g: 0, b: 0, a: 0.7 },
                        textColor: { r: 255, g: 255, b: 255, a: 1.0 }
                    }
                },
                {
                    value: 10,
                    label: '检查站车道',
                    style: {
                        interval: 10,
                        showMode: 'line-repeat',
                        fontSize: 32,
                        strokeColor: { r: 0, g: 0, b: 0, a: 1.0 },
                        backgroundColor: { r: 0, g: 0, b: 0, a: 0.7 },
                        textColor: { r: 255, g: 255, b: 255, a: 1.0 }
                    }
                },
                {
                    value: 11,
                    label: '右侧加速车道',
                    style: {
                        interval: 10,
                        showMode: 'line-repeat',
                        fontSize: 32,
                        strokeColor: { r: 0, g: 0, b: 0, a: 1.0 },
                        backgroundColor: { r: 0, g: 0, b: 0, a: 0.7 },
                        textColor: { r: 255, g: 255, b: 255, a: 1.0 }
                    }
                },
                {
                    value: 12,
                    label: '右侧减速车道',
                    style: {
                        interval: 10,
                        showMode: 'line-repeat',
                        fontSize: 32,
                        strokeColor: { r: 0, g: 0, b: 0, a: 1.0 },
                        backgroundColor: { r: 0, g: 0, b: 0, a: 0.7 },
                        textColor: { r: 255, g: 255, b: 255, a: 1.0 }
                    }
                },
                {
                    value: 13,
                    label: '匝道',
                    style: {
                        interval: 10,
                        showMode: 'line-repeat',
                        fontSize: 32,
                        strokeColor: { r: 0, g: 0, b: 0, a: 1.0 },
                        backgroundColor: { r: 0, g: 0, b: 0, a: 0.7 },
                        textColor: { r: 255, g: 255, b: 255, a: 1.0 }
                    }
                },
                {
                    value: 14,
                    label: '隔离带车道',
                    style: {
                        interval: 10,
                        showMode: 'line-repeat',
                        fontSize: 32,
                        strokeColor: { r: 0, g: 0, b: 0, a: 1.0 },
                        backgroundColor: { r: 0, g: 0, b: 0, a: 0.7 },
                        textColor: { r: 255, g: 255, b: 255, a: 1.0 }
                    }
                },
                {
                    value: 15,
                    label: '紧急停车道',
                    style: {
                        interval: 10,
                        showMode: 'line-repeat',
                        fontSize: 32,
                        strokeColor: { r: 0, g: 0, b: 0, a: 1.0 },
                        backgroundColor: { r: 0, g: 0, b: 0, a: 0.7 },
                        textColor: { r: 255, g: 255, b: 255, a: 1.0 }
                    }
                },
                {
                    value: 16,
                    label: 'HOV车道',
                    style: {
                        interval: 10,
                        showMode: 'line-repeat',
                        fontSize: 32,
                        strokeColor: { r: 0, g: 0, b: 0, a: 1.0 },
                        backgroundColor: { r: 0, g: 0, b: 0, a: 0.7 },
                        textColor: { r: 255, g: 255, b: 255, a: 1.0 }
                    }
                },
                {
                    value: 17,
                    label: '危险用品专用车道',
                    style: {
                        interval: 10,
                        showMode: 'line-repeat',
                        fontSize: 32,
                        strokeColor: { r: 0, g: 0, b: 0, a: 1.0 },
                        backgroundColor: { r: 0, g: 0, b: 0, a: 0.7 },
                        textColor: { r: 255, g: 255, b: 255, a: 1.0 }
                    }
                },
                {
                    value: 18,
                    label: '爬坡车道',
                    style: {
                        interval: 10,
                        showMode: 'line-repeat',
                        fontSize: 32,
                        strokeColor: { r: 0, g: 0, b: 0, a: 1.0 },
                        backgroundColor: { r: 0, g: 0, b: 0, a: 0.7 },
                        textColor: { r: 255, g: 255, b: 255, a: 1.0 }
                    }
                },
                {
                    value: 19,
                    label: '可变导向车道',
                    style: {
                        interval: 10,
                        showMode: 'line-repeat',
                        fontSize: 32,
                        strokeColor: { r: 0, g: 0, b: 0, a: 1.0 },
                        backgroundColor: { r: 0, g: 0, b: 0, a: 0.7 },
                        textColor: { r: 255, g: 255, b: 255, a: 1.0 }
                    }
                },
                {
                    value: 20,
                    label: '海关监管车道',
                    style: {
                        interval: 10,
                        showMode: 'line-repeat',
                        fontSize: 32,
                        strokeColor: { r: 0, g: 0, b: 0, a: 1.0 },
                        backgroundColor: { r: 0, g: 0, b: 0, a: 0.7 },
                        textColor: { r: 255, g: 255, b: 255, a: 1.0 }
                    }
                },
                {
                    value: 21,
                    label: '避险车道引道',
                    style: {
                        interval: 10,
                        showMode: 'line-repeat',
                        fontSize: 32,
                        strokeColor: { r: 0, g: 0, b: 0, a: 1.0 },
                        backgroundColor: { r: 0, g: 0, b: 0, a: 0.7 },
                        textColor: { r: 255, g: 255, b: 255, a: 1.0 }
                    }
                },
                {
                    value: 22,
                    label: '停车道',
                    style: {
                        interval: 10,
                        showMode: 'line-repeat',
                        fontSize: 32,
                        strokeColor: { r: 0, g: 0, b: 0, a: 1.0 },
                        backgroundColor: { r: 0, g: 0, b: 0, a: 0.7 },
                        textColor: { r: 255, g: 255, b: 255, a: 1.0 }
                    }
                },
                {
                    value: 23,
                    label: '潮汐车道',
                    style: {
                        interval: 10,
                        showMode: 'line-repeat',
                        fontSize: 32,
                        strokeColor: { r: 0, g: 0, b: 0, a: 1.0 },
                        backgroundColor: { r: 0, g: 0, b: 0, a: 0.7 },
                        textColor: { r: 255, g: 255, b: 255, a: 1.0 }
                    }
                },
                {
                    value: 24,
                    label: '左转待转车道',
                    style: {
                        interval: 10,
                        showMode: 'line-repeat',
                        fontSize: 32,
                        strokeColor: { r: 0, g: 0, b: 0, a: 1.0 },
                        backgroundColor: { r: 0, g: 0, b: 0, a: 0.7 },
                        textColor: { r: 255, g: 255, b: 255, a: 1.0 }
                    }
                },
                {
                    value: 25,
                    label: '直行待行车道',
                    style: {
                        interval: 10,
                        showMode: 'line-repeat',
                        fontSize: 32,
                        strokeColor: { r: 0, g: 0, b: 0, a: 1.0 },
                        backgroundColor: { r: 0, g: 0, b: 0, a: 0.7 },
                        textColor: { r: 255, g: 255, b: 255, a: 1.0 }
                    }
                },
                {
                    value: 26,
                    label: '掉头车道',
                    style: {
                        interval: 10,
                        showMode: 'line-repeat',
                        fontSize: 32,
                        strokeColor: { r: 0, g: 0, b: 0, a: 1.0 },
                        backgroundColor: { r: 0, g: 0, b: 0, a: 0.7 },
                        textColor: { r: 255, g: 255, b: 255, a: 1.0 }
                    }
                },
                {
                    value: 27,
                    label: '超车道',
                    style: {
                        interval: 10,
                        showMode: 'line-repeat',
                        fontSize: 32,
                        strokeColor: { r: 0, g: 0, b: 0, a: 1.0 },
                        backgroundColor: { r: 0, g: 0, b: 0, a: 0.7 },
                        textColor: { r: 255, g: 255, b: 255, a: 1.0 }
                    }
                },
                {
                    value: 28,
                    label: '服务区车道',
                    style: {
                        interval: 10,
                        showMode: 'line-repeat',
                        fontSize: 32,
                        strokeColor: { r: 0, g: 0, b: 0, a: 1.0 },
                        backgroundColor: { r: 0, g: 0, b: 0, a: 0.7 },
                        textColor: { r: 255, g: 255, b: 255, a: 1.0 }
                    }
                },
                {
                    value: 29,
                    label: '左侧加速车道',
                    style: {
                        interval: 10,
                        showMode: 'line-repeat',
                        fontSize: 32,
                        strokeColor: { r: 0, g: 0, b: 0, a: 1.0 },
                        backgroundColor: { r: 0, g: 0, b: 0, a: 0.7 },
                        textColor: { r: 255, g: 255, b: 255, a: 1.0 }
                    }
                },
                {
                    value: 30,
                    label: '左侧减速车道',
                    style: {
                        interval: 10,
                        showMode: 'line-repeat',
                        fontSize: 32,
                        strokeColor: { r: 0, g: 0, b: 0, a: 1.0 },
                        backgroundColor: { r: 0, g: 0, b: 0, a: 0.7 },
                        textColor: { r: 255, g: 255, b: 255, a: 1.0 }
                    }
                },
                {
                    value: 31,
                    label: '加减速复合车道',
                    style: {
                        interval: 10,
                        showMode: 'line-repeat',
                        fontSize: 32,
                        strokeColor: { r: 0, g: 0, b: 0, a: 1.0 },
                        backgroundColor: { r: 0, g: 0, b: 0, a: 0.7 },
                        textColor: { r: 255, g: 255, b: 255, a: 1.0 }
                    }
                },
                {
                    value: 99,
                    label: '其他',
                    style: {
                        interval: 10,
                        showMode: 'line-repeat',
                        fontSize: 32,
                        strokeColor: { r: 0, g: 0, b: 0, a: 1.0 },
                        backgroundColor: { r: 0, g: 0, b: 0, a: 0.7 },
                        textColor: { r: 255, g: 255, b: 255, a: 1.0 }
                    }
                }
            ]
        }
    },
    AD_LaneAttrPoint: {
        type: 'Point',
        textField: 'TYPE',
        order: 11,
        showStyles: ['textStyle'],
        textStyle: {
            TYPE: [
                {
                    value: 0,
                    label: '未定义',
                    style: {
                        offset: 10,
                        showMode: 'top',
                        fontSize: 32,
                        strokeColor: { r: 0, g: 0, b: 0, a: 1.0 },
                        backgroundColor: { r: 0, g: 0, b: 0, a: 0.7 },
                        textColor: { r: 255, g: 255, b: 255, a: 1.0 }
                    }
                },
                {
                    value: 1,
                    label: '道路左侧出口',
                    style: {
                        offset: 10,
                        showMode: 'top',
                        fontSize: 32,
                        strokeColor: { r: 0, g: 0, b: 0, a: 1.0 },
                        backgroundColor: { r: 0, g: 0, b: 0, a: 0.7 },
                        textColor: { r: 255, g: 255, b: 255, a: 1.0 }
                    }
                },
                {
                    value: 2,
                    label: '道路右侧出口',
                    style: {
                        offset: 10,
                        showMode: 'top',
                        fontSize: 32,
                        strokeColor: { r: 0, g: 0, b: 0, a: 1.0 },
                        backgroundColor: { r: 0, g: 0, b: 0, a: 0.7 },
                        textColor: { r: 255, g: 255, b: 255, a: 1.0 }
                    }
                },
                {
                    value: 3,
                    label: '道路分离点',
                    style: {
                        offset: 10,
                        showMode: 'top',
                        fontSize: 32,
                        strokeColor: { r: 0, g: 0, b: 0, a: 1.0 },
                        backgroundColor: { r: 0, g: 0, b: 0, a: 0.7 },
                        textColor: { r: 255, g: 255, b: 255, a: 1.0 }
                    }
                },
                {
                    value: 4,
                    label: '道路合并点',
                    style: {
                        offset: 10,
                        showMode: 'top',
                        fontSize: 32,
                        strokeColor: { r: 0, g: 0, b: 0, a: 1.0 },
                        backgroundColor: { r: 0, g: 0, b: 0, a: 0.7 },
                        textColor: { r: 255, g: 255, b: 255, a: 1.0 }
                    }
                },
                {
                    value: 5,
                    label: '车道合并点',
                    style: {
                        offset: 10,
                        showMode: 'top',
                        fontSize: 32,
                        strokeColor: { r: 0, g: 0, b: 0, a: 1.0 },
                        backgroundColor: { r: 0, g: 0, b: 0, a: 0.7 },
                        textColor: { r: 255, g: 255, b: 255, a: 1.0 }
                    }
                },

                {
                    value: 21,
                    label: '服务区道路开始位置',
                    style: {
                        offset: 10,
                        showMode: 'top',
                        fontSize: 32,
                        strokeColor: { r: 0, g: 0, b: 0, a: 1.0 },
                        backgroundColor: { r: 0, g: 0, b: 0, a: 0.7 },
                        textColor: { r: 255, g: 255, b: 255, a: 1.0 }
                    }
                },
                {
                    value: 22,
                    label: '服务区道路结束位置',
                    style: {
                        offset: 10,
                        showMode: 'top',
                        fontSize: 32,
                        strokeColor: { r: 0, g: 0, b: 0, a: 1.0 },
                        backgroundColor: { r: 0, g: 0, b: 0, a: 0.7 },
                        textColor: { r: 255, g: 255, b: 255, a: 1.0 }
                    }
                },

                {
                    value: 41,
                    label: '点云不清晰起点',
                    style: {
                        offset: 10,
                        showMode: 'top',
                        fontSize: 32,
                        strokeColor: { r: 0, g: 0, b: 0, a: 1.0 },
                        backgroundColor: { r: 0, g: 0, b: 0, a: 0.7 },
                        textColor: { r: 255, g: 255, b: 255, a: 1.0 }
                    }
                },
                {
                    value: 42,
                    label: '点云不清晰结束点',
                    style: {
                        offset: 10,
                        showMode: 'top',
                        fontSize: 32,
                        strokeColor: { r: 0, g: 0, b: 0, a: 1.0 },
                        backgroundColor: { r: 0, g: 0, b: 0, a: 0.7 },
                        textColor: { r: 255, g: 255, b: 255, a: 1.0 }
                    }
                },
                {
                    value: 43,
                    label: '点云遮挡起点',
                    style: {
                        offset: 10,
                        showMode: 'top',
                        fontSize: 32,
                        strokeColor: { r: 0, g: 0, b: 0, a: 1.0 },
                        backgroundColor: { r: 0, g: 0, b: 0, a: 0.7 },
                        textColor: { r: 255, g: 255, b: 255, a: 1.0 }
                    }
                },
                {
                    value: 44,
                    label: '点云遮挡结束点',
                    style: {
                        offset: 10,
                        showMode: 'top',
                        fontSize: 32,
                        strokeColor: { r: 0, g: 0, b: 0, a: 1.0 },
                        backgroundColor: { r: 0, g: 0, b: 0, a: 0.7 },
                        textColor: { r: 255, g: 255, b: 255, a: 1.0 }
                    }
                },
                {
                    value: 45,
                    label: '精度误差起点',
                    style: {
                        offset: 10,
                        showMode: 'top',
                        fontSize: 32,
                        strokeColor: { r: 0, g: 0, b: 0, a: 1.0 },
                        backgroundColor: { r: 0, g: 0, b: 0, a: 0.7 },
                        textColor: { r: 255, g: 255, b: 255, a: 1.0 }
                    }
                },
                {
                    value: 46,
                    label: '精度误差结束点',
                    style: {
                        offset: 10,
                        showMode: 'top',
                        fontSize: 32,
                        strokeColor: { r: 0, g: 0, b: 0, a: 1.0 },
                        backgroundColor: { r: 0, g: 0, b: 0, a: 0.7 },
                        textColor: { r: 255, g: 255, b: 255, a: 1.0 }
                    }
                },
                {
                    value: 47,
                    label: '道路施工起点',
                    style: {
                        offset: 10,
                        showMode: 'top',
                        fontSize: 32,
                        strokeColor: { r: 0, g: 0, b: 0, a: 1.0 },
                        backgroundColor: { r: 0, g: 0, b: 0, a: 0.7 },
                        textColor: { r: 255, g: 255, b: 255, a: 1.0 }
                    }
                },
                {
                    value: 48,
                    label: '道路施工结束点',
                    style: {
                        offset: 10,
                        showMode: 'top',
                        fontSize: 32,
                        strokeColor: { r: 0, g: 0, b: 0, a: 1.0 },
                        backgroundColor: { r: 0, g: 0, b: 0, a: 0.7 },
                        textColor: { r: 255, g: 255, b: 255, a: 1.0 }
                    }
                }
            ]
        }
    },
    AD_Arrow: {
        type: 'Polygon',
        textField: 'ARR_DIRECT',
        order: 10,
        showStyles: ['textStyle'],
        textStyle: {
            ARR_DIRECT: [
                {
                    value: 0,
                    label: '箭头',
                    style: {
                        interval: 10,
                        showMode: 'longest-center',
                        fontSize: 32,
                        strokeColor: { r: 0, g: 0, b: 0, a: 1.0 },
                        backgroundColor: { r: 0, g: 0, b: 0, a: 0.7 },
                        textColor: { r: 255, g: 255, b: 255, a: 1.0 }
                    }
                }
            ]
        }
    },
    AD_StopLocation: {
        type: 'Line',
        textField: 'TYPE',
        order: 9,
        showStyles: ['textStyle'],
        textStyle: {
            TYPE: [
                {
                    value: 0,
                    label: '未定义',
                    style: {
                        interval: 10,
                        showMode: 'line-center',
                        fontSize: 32,
                        strokeColor: { r: 0, g: 0, b: 0, a: 1.0 },
                        backgroundColor: { r: 0, g: 0, b: 0, a: 0.7 },
                        textColor: { r: 255, g: 255, b: 255, a: 1.0 }
                    }
                },
                {
                    value: 1,
                    label: '停止线',
                    style: {
                        interval: 10,
                        showMode: 'line-center',
                        fontSize: 32,
                        strokeColor: { r: 0, g: 0, b: 0, a: 1.0 },
                        backgroundColor: { r: 0, g: 0, b: 0, a: 0.7 },
                        textColor: { r: 255, g: 255, b: 255, a: 1.0 }
                    }
                },
                {
                    value: 2,
                    label: '停车让行线',
                    style: {
                        interval: 10,
                        showMode: 'line-center',
                        fontSize: 32,
                        strokeColor: { r: 0, g: 0, b: 0, a: 1.0 },
                        backgroundColor: { r: 0, g: 0, b: 0, a: 0.7 },
                        textColor: { r: 255, g: 255, b: 255, a: 1.0 }
                    }
                },
                {
                    value: 3,
                    label: '减速让行线',
                    style: {
                        interval: 10,
                        showMode: 'line-center',
                        fontSize: 32,
                        strokeColor: { r: 0, g: 0, b: 0, a: 1.0 },
                        backgroundColor: { r: 0, g: 0, b: 0, a: 0.7 },
                        textColor: { r: 255, g: 255, b: 255, a: 1.0 }
                    }
                }
            ]
        }
    },
    AD_LaneMark_Plg: {
        type: 'Polygon',
        textField: 'TYPE',
        order: 8,
        showStyles: ['textStyle'],
        textStyle: {
            TYPE: [
                {
                    value: 0,
                    label: '未定义',
                    style: {
                        interval: 10,
                        showMode: 'polygon-center',
                        fontSize: 32,
                        strokeColor: { r: 0, g: 0, b: 0, a: 1.0 },
                        backgroundColor: { r: 0, g: 0, b: 0, a: 0.7 },
                        textColor: { r: 255, g: 255, b: 255, a: 1.0 }
                    }
                },
                {
                    value: 1,
                    label: '人行横道',
                    style: {
                        interval: 10,
                        showMode: 'polygon-center',
                        fontSize: 32,
                        strokeColor: { r: 0, g: 0, b: 0, a: 1.0 },
                        backgroundColor: { r: 0, g: 0, b: 0, a: 0.7 },
                        textColor: { r: 255, g: 255, b: 255, a: 1.0 }
                    }
                },
                {
                    value: 2,
                    label: '禁止停车区',
                    style: {
                        interval: 10,
                        showMode: 'polygon-center',
                        fontSize: 32,
                        strokeColor: { r: 0, g: 0, b: 0, a: 1.0 },
                        backgroundColor: { r: 0, g: 0, b: 0, a: 0.7 },
                        textColor: { r: 255, g: 255, b: 255, a: 1.0 }
                    }
                },
                {
                    value: 3,
                    label: '减速带',
                    style: {
                        interval: 10,
                        showMode: 'polygon-center',
                        fontSize: 32,
                        strokeColor: { r: 0, g: 0, b: 0, a: 1.0 },
                        backgroundColor: { r: 0, g: 0, b: 0, a: 0.7 },
                        textColor: { r: 255, g: 255, b: 255, a: 1.0 }
                    }
                },
                {
                    value: 4,
                    label: '减速警示震荡线',
                    style: {
                        interval: 10,
                        showMode: 'polygon-center',
                        fontSize: 32,
                        strokeColor: { r: 0, g: 0, b: 0, a: 1.0 },
                        backgroundColor: { r: 0, g: 0, b: 0, a: 0.7 },
                        textColor: { r: 255, g: 255, b: 255, a: 1.0 }
                    }
                },
                {
                    value: 5,
                    label: '斜跨路口的人行横道',
                    style: {
                        interval: 10,
                        showMode: 'polygon-center',
                        fontSize: 32,
                        strokeColor: { r: 0, g: 0, b: 0, a: 1.0 },
                        backgroundColor: { r: 0, g: 0, b: 0, a: 0.7 },
                        textColor: { r: 255, g: 255, b: 255, a: 1.0 }
                    }
                }
            ]
        }
    },
    AD_Text: {
        type: 'Polygon',
        textField: 'TYPE',
        order: 7,
        showStyles: ['textStyle'],
        textStyle: {
            TYPE: [
                {
                    value: 0,
                    label: '未定义',
                    style: {
                        interval: 10,
                        showMode: 'longest-center',
                        fontSize: 32,
                        strokeColor: { r: 0, g: 0, b: 0, a: 1.0 },
                        backgroundColor: { r: 0, g: 0, b: 0, a: 0.7 },
                        textColor: { r: 255, g: 255, b: 255, a: 1.0 }
                    }
                },
                {
                    value: 1,
                    label: '最高限速',
                    style: {
                        interval: 10,
                        showMode: 'longest-center',
                        fontSize: 32,
                        strokeColor: { r: 0, g: 0, b: 0, a: 1.0 },
                        backgroundColor: { r: 0, g: 0, b: 0, a: 0.7 },
                        textColor: { r: 255, g: 255, b: 255, a: 1.0 }
                    }
                },
                {
                    value: 2,
                    label: '最低限速',
                    style: {
                        interval: 10,
                        showMode: 'longest-center',
                        fontSize: 32,
                        strokeColor: { r: 0, g: 0, b: 0, a: 1.0 },
                        backgroundColor: { r: 0, g: 0, b: 0, a: 0.7 },
                        textColor: { r: 255, g: 255, b: 255, a: 1.0 }
                    }
                },
                {
                    value: 3,
                    label: '公交车道时间限制',
                    style: {
                        interval: 10,
                        showMode: 'longest-center',
                        fontSize: 32,
                        strokeColor: { r: 0, g: 0, b: 0, a: 1.0 },
                        backgroundColor: { r: 0, g: 0, b: 0, a: 0.7 },
                        textColor: { r: 255, g: 255, b: 255, a: 1.0 }
                    }
                },
                {
                    value: 99,
                    label: '其他',
                    style: {
                        interval: 10,
                        showMode: 'longest-center',
                        fontSize: 32,
                        strokeColor: { r: 0, g: 0, b: 0, a: 1.0 },
                        backgroundColor: { r: 0, g: 0, b: 0, a: 0.7 },
                        textColor: { r: 255, g: 255, b: 255, a: 1.0 }
                    }
                }
            ]
        }
    },
    AD_TrafficSign: {
        type: 'Polygon',
        textField: 'SIGN_STYPE',
        order: 6,
        showStyles: ['textStyle'],
        textStyle: {
            SIGN_STYPE: [
                {
                    value: 0,
                    label: '未定义',
                    style: {
                        interval: 10,
                        showMode: 'polygon-center',
                        fontSize: 32,
                        strokeColor: { r: 0, g: 0, b: 0, a: 1.0 },
                        backgroundColor: { r: 0, g: 0, b: 0, a: 0.7 },
                        textColor: { r: 255, g: 255, b: 255, a: 1.0 }
                    }
                },
                {
                    value: 1,
                    label: '单个标志牌',
                    style: {
                        interval: 10,
                        showMode: 'polygon-center',
                        fontSize: 32,
                        strokeColor: { r: 0, g: 0, b: 0, a: 1.0 },
                        backgroundColor: { r: 0, g: 0, b: 0, a: 0.7 },
                        textColor: { r: 255, g: 255, b: 255, a: 1.0 }
                    }
                },
                {
                    value: 2,
                    label: '组合标志牌',
                    style: {
                        interval: 10,
                        showMode: 'polygon-center',
                        fontSize: 32,
                        strokeColor: { r: 0, g: 0, b: 0, a: 1.0 },
                        backgroundColor: { r: 0, g: 0, b: 0, a: 0.7 },
                        textColor: { r: 255, g: 255, b: 255, a: 1.0 }
                    }
                }
            ]
        }
    },
    AD_TrafficLight: {
        type: 'Polygon',
        textField: 'TYPE',
        order: 5,
        showStyles: ['textStyle'],
        textStyle: {
            TYPE: [
                {
                    value: 0,
                    label: '未定义',
                    style: {
                        interval: 10,
                        showMode: 'polygon-center',
                        fontSize: 32,
                        strokeColor: { r: 0, g: 0, b: 0, a: 1.0 },
                        backgroundColor: { r: 0, g: 0, b: 0, a: 0.7 },
                        textColor: { r: 255, g: 255, b: 255, a: 1.0 }
                    }
                },
                {
                    value: 1,
                    label: '普通机动车信号灯',
                    style: {
                        interval: 10,
                        showMode: 'polygon-center',
                        fontSize: 32,
                        strokeColor: { r: 0, g: 0, b: 0, a: 1.0 },
                        backgroundColor: { r: 0, g: 0, b: 0, a: 0.7 },
                        textColor: { r: 255, g: 255, b: 255, a: 1.0 }
                    }
                },
                {
                    value: 2,
                    label: '方向指示灯',
                    style: {
                        interval: 10,
                        showMode: 'polygon-center',
                        fontSize: 32,
                        strokeColor: { r: 0, g: 0, b: 0, a: 1.0 },
                        backgroundColor: { r: 0, g: 0, b: 0, a: 0.7 },
                        textColor: { r: 255, g: 255, b: 255, a: 1.0 }
                    }
                },
                {
                    value: 3,
                    label: '铁路交叉路口信号灯',
                    style: {
                        interval: 10,
                        showMode: 'polygon-center',
                        fontSize: 32,
                        strokeColor: { r: 0, g: 0, b: 0, a: 1.0 },
                        backgroundColor: { r: 0, g: 0, b: 0, a: 0.7 },
                        textColor: { r: 255, g: 255, b: 255, a: 1.0 }
                    }
                },
                {
                    value: 4,
                    label: '人行横道信号灯',
                    style: {
                        interval: 10,
                        showMode: 'polygon-center',
                        fontSize: 32,
                        strokeColor: { r: 0, g: 0, b: 0, a: 1.0 },
                        backgroundColor: { r: 0, g: 0, b: 0, a: 0.7 },
                        textColor: { r: 255, g: 255, b: 255, a: 1.0 }
                    }
                },
                {
                    value: 99,
                    label: '其他',
                    style: {
                        interval: 10,
                        showMode: 'polygon-center',
                        fontSize: 32,
                        strokeColor: { r: 0, g: 0, b: 0, a: 1.0 },
                        backgroundColor: { r: 0, g: 0, b: 0, a: 0.7 },
                        textColor: { r: 255, g: 255, b: 255, a: 1.0 }
                    }
                }
            ]
        }
    },
    AD_Pole: {
        type: 'Line',
        textField: 'TYPE',
        order: 4,
        showStyles: ['textStyle'],
        textStyle: {
            TYPE: [
                {
                    value: 0,
                    label: '',
                    style: {
                        interval: 10,
                        showMode: 'line-center',
                        fontSize: 32,
                        strokeColor: { r: 0, g: 0, b: 0, a: 1.0 },
                        backgroundColor: { r: 0, g: 0, b: 0, a: 0.7 },
                        textColor: { r: 255, g: 255, b: 255, a: 1.0 }
                    }
                }
            ]
        }
    },
    AD_RS_Barrier: {
        type: 'Line',
        textField: 'TYPE',
        order: 3,
        showStyles: ['textStyle'],
        textStyle: {
            TYPE: [
                {
                    value: 0,
                    label: '未定义',
                    style: {
                        interval: 10,
                        showMode: 'line-repeat',
                        fontSize: 32,
                        strokeColor: { r: 0, g: 0, b: 0, a: 1.0 },
                        backgroundColor: { r: 0, g: 0, b: 0, a: 0.7 },
                        textColor: { r: 255, g: 255, b: 255, a: 1.0 }
                    }
                },
                {
                    value: 1,
                    label: '隧道墙',
                    style: {
                        interval: 10,
                        showMode: 'line-repeat',
                        fontSize: 32,
                        strokeColor: { r: 0, g: 0, b: 0, a: 1.0 },
                        backgroundColor: { r: 0, g: 0, b: 0, a: 0.7 },
                        textColor: { r: 255, g: 255, b: 255, a: 1.0 }
                    }
                },
                {
                    value: 2,
                    label: '路侧防护栏',
                    style: {
                        interval: 10,
                        showMode: 'line-repeat',
                        fontSize: 32,
                        strokeColor: { r: 0, g: 0, b: 0, a: 1.0 },
                        backgroundColor: { r: 0, g: 0, b: 0, a: 0.7 },
                        textColor: { r: 255, g: 255, b: 255, a: 1.0 }
                    }
                },
                {
                    value: 3,
                    label: '路缘石',
                    style: {
                        interval: 10,
                        showMode: 'line-repeat',
                        fontSize: 32,
                        strokeColor: { r: 0, g: 0, b: 0, a: 1.0 },
                        backgroundColor: { r: 0, g: 0, b: 0, a: 0.7 },
                        textColor: { r: 255, g: 255, b: 255, a: 1.0 }
                    }
                },
                {
                    value: 4,
                    label: '隔音墙',
                    style: {
                        interval: 10,
                        showMode: 'line-repeat',
                        fontSize: 32,
                        strokeColor: { r: 0, g: 0, b: 0, a: 1.0 },
                        backgroundColor: { r: 0, g: 0, b: 0, a: 0.7 },
                        textColor: { r: 255, g: 255, b: 255, a: 1.0 }
                    }
                }
            ]
        }
    }
};
