const ERROR_DESC_MAP = {
    AD_LaneDivider: [
        {
            value: '车道线多余',
            label: '车道线多余'
        },
        {
            value: '车道线遗漏',
            label: '车道线遗漏'
        },
        {
            value: '车道线逆序',
            label: '车道线逆序'
        },
        {
            value: '遗漏打断',
            label: '遗漏打断'
        },
        {
            value: '打断不齐',
            label: '打断不齐'
        },
        {
            value: '逻辑连接错误',
            label: '逻辑连接错误'
        },
        {
            value: '道路边界矢量与点云横向偏差≥20cm',
            label: '道路边界矢量与点云横向偏差≥20cm'
        },
        {
            value: '非道路边界矢量与点云横向偏差≥10cm',
            label: '非道路边界矢量与点云横向偏差≥10cm'
        },
        {
            value: '道路边界矢量与点云纵向偏差≥10cm',
            label: '道路边界矢量与点云纵向偏差≥10cm'
        },
        {
            value: '非道路边界矢量与点云纵向偏差≥50cm',
            label: '非道路边界矢量与点云纵向偏差≥50cm'
        },
        {
            value: '矢量与点云高程精度偏差≥30cm',
            label: '矢量与点云高程精度偏差≥30cm'
        },
        {
            value: '几何符合精度要求，但不平滑',
            label: '几何符合精度要求，但不平滑'
        },
        {
            value: '类型错误',
            label: '类型错误'
        },
        {
            value: '共用车道线标识错误',
            label: '共用车道线标识错误'
        },
        {
            value: '道路边界标识错误',
            label: '道路边界标识错误'
        },
        {
            value: '道路边界与参考线关联关系错误',
            label: '道路边界与参考线关联关系错误'
        }
    ],
    AD_LaneDivider_Plg: [
        {
            value: '多余制作',
            label: '多余制作'
        },
        {
            value: '遗漏制作',
            label: '遗漏制作'
        },
        {
            value: '矢量与点云横向偏差≥10cm',
            label: '矢量与点云横向偏差>10cm'
        },
        {
            value: '矢量与点云纵向偏差≥50cm',
            label: '矢量与点云纵向偏差≥50cm'
        },
        {
            value: '矢量与点云高程偏差≥30cm',
            label: '矢量与点云高程偏差≥30cm'
        },
        {
            value: '要素子类型错误',
            label: '要素子类型错误'
        },
        {
            value: '与车道线关联关系错误',
            label: '与车道线关联关系错误'
        }
    ],
    AD_Lane: [
        {
            value: '车道中心线多余',
            label: '车道中心线多余'
        },
        {
            value: '车道中心线遗漏',
            label: '车道中心线遗漏'
        },
        {
            value: '遗漏打断',
            label: '遗漏打断'
        },
        {
            value: '打断不齐',
            label: '打断不齐'
        },
        {
            value: '挂接/连接错误',
            label: '挂接/连接错误'
        },
        {
            value: '未在车道中间，距中心位置偏差>0.1m',
            label: '未在车道中间，距中心位置偏差>0.1m'
        },
        {
            value: '车道中心线基于车道线面上浮或下沉≥30cm',
            label: '车道中心线基于车道线面上浮或下沉≥30cm'
        },
        {
            value: '存在折角不平滑',
            label: '存在折角不平滑'
        },
        {
            value: '车道类型错误',
            label: '车道类型错误'
        },
        {
            value: '车道编号错误',
            label: '车道编号错误'
        },
        {
            value: '与参考线关联制作错误',
            label: '与参考线关联制作错误'
        },
        {
            value: '左车道线关联制作错误',
            label: '左车道线关联制作错误'
        },
        {
            value: '右车道线关联制作错误',
            label: '右车道线关联制作错误'
        },
        {
            value: '距左车道边界距离不足1.5m',
            label: '距左车道边界距离不足1.5m'
        },
        {
            value: '距右车道边界距离不足1.5m',
            label: '距右车道边界距离不足1.5m'
        },
        {
            value: '车道通行方向错误',
            label: '车道通行方向错误'
        },
        {
            value: '车道通行状态错误',
            label: '车道通行状态错误'
        },
        {
            value: '车道连通关系多做',
            label: '车道连通关系多做'
        },
        {
            value: '车道连通关系漏做',
            label: '车道连通关系漏做'
        },
        {
            value: '车道限制错误',
            label: '车道限制错误'
        },
        {
            value: '车道限制多余',
            label: '车道限制多余'
        },
        {
            value: '车道限制遗漏',
            label: '车道限制遗漏'
        },
        {
            value: '限制时间描述多做',
            label: '限制时间描述多做'
        },
        {
            value: '限制时间描述漏做',
            label: '限制时间描述漏做'
        },
        {
            value: '限制时间描述错误',
            label: '限制时间描述错误'
        },
        {
            value: '车道连接限制类型多做',
            label: '车道连接限制类型多做'
        },
        {
            value: '车道连接限制类型漏做',
            label: '车道连接限制类型漏做'
        },
        {
            value: '车道连接限制类型错误',
            label: '车道连接限制类型错误'
        },
        {
            value: '车道连接限制时间描述多做',
            label: '车道连接限制时间描述多做'
        },
        {
            value: '车道连接限制时间描述漏做',
            label: '车道连接限制时间描述漏做'
        },
        {
            value: '车道连接限制时间描述错误',
            label: '车道连接限制时间描述错误'
        }
    ],
    AD_Arrow: [
        {
            value: '地面导向箭头多余',
            label: '地面导向箭头多余'
        },
        {
            value: '地面导向箭头遗漏',
            label: '地面导向箭头遗漏'
        },
        {
            value: '矢量与点云纵向偏差≥10cm',
            label: '矢量与点云纵向偏差≥10cm'
        },
        {
            value: '矢量与点云横向偏差≥10cm',
            label: '矢量与点云横向偏差≥10cm'
        },
        {
            value: '矢量与点云高程偏差≥30cm',
            label: '矢量与点云高程偏差≥30cm'
        },
        {
            value: '几何符合精度要求，但不平滑',
            label: '几何符合精度要求，但不平滑'
        },
        {
            value: '箭头方向错误',
            label: '箭头方向错误'
        },
        {
            value: '地面导向箭头关联关系错误',
            label: '地面导向箭头关联关系错误'
        }
    ],
    AD_StopLocation: [
        {
            value: '停止线、停车让行线、减速让行线、虚拟停止线多余',
            label: '停止线、停车让行线、减速让行线、虚拟停止线多余'
        },
        {
            value: '停止线、停车让行线、减速让行线、虚拟停止线遗漏',
            label: '停止线、停车让行线、减速让行线、虚拟停止线遗漏'
        },
        {
            value: '矢量超出几何范围框线',
            label: '矢量超出几何范围框线'
        },
        {
            value: '几何符合精度要求，但不平滑',
            label: '几何符合精度要求，但不平滑'
        },
        {
            value: '类型错误',
            label: '类型错误'
        },
        {
            value: '与中心线多余关联',
            label: '与中心线多余关联'
        },
        {
            value: '与中心线遗漏关联',
            label: '与中心线遗漏关联'
        }
    ],
    AD_StopLocation_Geo: [
        {
            value: '停止线、停车让行线、减速让行线多余',
            label: '停止线、停车让行线、减速让行线多余'
        },
        {
            value: '停止线、停车让行线、减速让行线遗漏',
            label: '停止线、停车让行线、减速让行线遗漏'
        },
        {
            value: '矢量与点云横向偏差≥30cm',
            label: '矢量与点云横向偏差≥30cm'
        },
        {
            value: '矢量与点云纵向偏差≥10cm',
            label: '矢量与点云纵向偏差≥10cm'
        },
        {
            value: '矢量与点云高程偏差≥30cm',
            label: '矢量与点云高程偏差≥30cm'
        },
        {
            value: '几何符合精度要求，但不平滑',
            label: '几何符合精度要求，但不平滑'
        },
        {
            value: '类型错误',
            label: '类型错误'
        },
        {
            value: '与逻辑层停止位置关联关系错误',
            label: '与逻辑层停止位置关联关系错误'
        }
    ],
    AD_LaneMark_Geo: [
        {
            value: '路面车道标记多余',
            label: '路面车道标记多余'
        },
        {
            value: '路面车道标记遗漏',
            label: '路面车道标记遗漏'
        },
        {
            value: '导流区与车道线不重合',
            label: '导流区与车道线不重合'
        },
        {
            value: '矢量与点云横向偏差≥20cm',
            label: '矢量与点云横向偏差≥20cm'
        },
        {
            value: '矢量与点云纵向偏差≥10cm',
            label: '矢量与点云纵向偏差≥10cm'
        },
        {
            value: '矢量与点云高程偏差≥30cm',
            label: '矢量与点云高程偏差≥30cm'
        },
        {
            value: '几何符合精度要求，但不平滑',
            label: '几何符合精度要求，但不平滑'
        },
        {
            value: '要素子类型错误',
            label: '要素子类型错误'
        },
        {
            value: '与中心线多余关联',
            label: '与中心线多余关联'
        },
        {
            value: '与中心线遗漏关联',
            label: '与中心线遗漏关联'
        }
    ],
    AD_Text: [
        {
            value: '限速类的地面文字符号多余',
            label: '限速类的地面文字符号多余'
        },
        {
            value: '非限速类的地面文字符号多余',
            label: '非限速类的地面文字符号多余'
        },
        {
            value: '限速类的地面文字符号遗漏',
            label: '限速类的地面文字符号遗漏'
        },
        {
            value: '非限速类的地面文字符号遗漏',
            label: '非限速类的地面文字符号遗漏'
        },
        {
            value: '矢量与点云横向偏差≥20cm',
            label: '矢量与点云横向偏差≥20cm'
        },
        {
            value: '矢量与点云纵向偏差≥10cm',
            label: '矢量与点云纵向偏差≥10cm'
        },
        {
            value: '矢量与点云高程偏差≥30cm',
            label: '矢量与点云高程偏差≥30cm'
        },
        {
            value: '几何符合精度要求，但不平滑',
            label: '几何符合精度要求，但不平滑'
        },
        {
            value: '语义类型错误',
            label: '语义类型错误'
        },
        {
            value: '限速值多做',
            label: '限速值多做'
        },
        {
            value: '限速值漏做',
            label: '限速值漏做'
        },
        {
            value: '限速值错误',
            label: '限速值错误'
        },
        {
            value: '时间限制描述多做',
            label: '时间限制描述多做'
        },
        {
            value: '时间限制描述漏做',
            label: '时间限制描述漏做'
        },
        {
            value: '时间限制描述错误',
            label: '时间限制描述错误'
        },
        {
            value: '车辆限制描述多做',
            label: '车辆限制描述多做'
        },
        {
            value: '车辆限制描述漏做',
            label: '车辆限制描述漏做'
        },
        {
            value: '车辆限制描述错误',
            label: '车辆限制描述错误'
        },
        {
            value: '其他文本描述多做',
            label: '其他文本描述多做'
        },
        {
            value: '其他文本描述漏做',
            label: '其他文本描述漏做'
        },
        {
            value: '其他文本描述错误',
            label: '其他文本描述错误'
        },
        {
            value: '关联车道中心线错误',
            label: '关联车道中心线错误'
        }
    ],
    AD_Road: [
        {
            value: '参考线多余',
            label: '参考线多余'
        },
        {
            value: '参考线遗漏',
            label: '参考线遗漏'
        },
        {
            value: '挂接/连接错误',
            label: '挂接/连接错误'
        },
        {
            value: '遗漏打断',
            label: '遗漏打断'
        },
        {
            value: '打断不齐',
            label: '打断不齐'
        },
        {
            value: '参考线基于车道线上浮或下沉≥30cm',
            label: '参考线基于车道线上浮或下沉≥30cm'
        },
        {
            value: '几何位置不正确或者不平滑',
            label: '几何位置不正确或者不平滑'
        },
        {
            value: '参考线类型错误',
            label: '参考线类型错误'
        },
        {
            value: '交叉路口标识错误',
            label: '交叉路口标识错误'
        },
        {
            value: '道路形态错误',
            label: '道路形态错误'
        },
        {
            value: '道路通行状态错误',
            label: '道路通行状态错误'
        },
        {
            value: '道路通行方向错误',
            label: '道路通行方向错误'
        },
        {
            value: '连通关系多做',
            label: '连通关系多做'
        },
        {
            value: '连通关系漏做',
            label: '连通关系漏做'
        },
        {
            value: '道路连接限制类型错误',
            label: '道路连接限制类型错误'
        },
        {
            value: '道路连接限制时间描述多余',
            label: '道路连接限制时间描述多余'
        },
        {
            value: '道路连接限制时间描述遗漏',
            label: '道路连接限制时间描述遗漏'
        },
        {
            value: '道路连接限制时间描述错误',
            label: '道路连接限制时间描述错误'
        }
    ],
    AD_TrafficSign: [
        {
            value: 'P0、P1、P2级标志牌多余',
            label: 'P0、P1、P2级标志牌多余'
        },
        {
            value: 'P3级标志牌多余',
            label: 'P3级标志牌多余'
        },
        {
            value: 'P0、P1、P2级标志牌遗漏',
            label: 'P0、P1、P2级标志牌遗漏'
        },
        {
            value: 'P3级标志牌遗漏',
            label: 'P3级标志牌遗漏'
        },
        {
            value: '矢量与点云横向偏差≥50cm',
            label: '矢量与点云横向偏差≥50cm'
        },
        {
            value: '矢量与点云纵向偏差≥50cm',
            label: '矢量与点云纵向偏差≥50cm'
        },
        {
            value: '矢量与点云高程偏差≥50cm',
            label: '矢量与点云高程偏差≥50cm'
        },
        {
            value: '交通标牌类型错误',
            label: '交通标牌类型错误'
        },
        {
            value: '语义类型错误',
            label: '语义类型错误'
        },
        {
            value: '语义内容错误',
            label: '语义内容错误'
        },
        {
            value: '时间描述错误',
            label: '时间描述错误'
        },
        {
            value: '时间描述多余',
            label: '时间描述多余'
        },
        {
            value: '时间描述遗漏',
            label: '时间描述遗漏'
        },
        {
            value: '与车道中心线关联多做',
            label: '与车道中心线关联多做'
        },
        {
            value: '与车道中心线关联漏做',
            label: '与车道中心线关联漏做'
        }
    ],
    AD_TrafficLight: [
        {
            value: '交通信号灯多余',
            label: '交通信号灯多余'
        },
        {
            value: '交通信号灯遗漏',
            label: '交通信号灯遗漏'
        },
        {
            value: '矢量与点云横向偏差≥50cm',
            label: '矢量与点云横向偏差≥50cm'
        },
        {
            value: '矢量与点云纵向偏差≥50cm',
            label: '矢量与点云纵向偏差≥50cm'
        },
        {
            value: '矢量与点云高程偏差≥50cm',
            label: '矢量与点云高程偏差≥50cm'
        },
        {
            value: '与车道中心线关联多做',
            label: '与车道中心线关联多做'
        },
        {
            value: '与车道中心线关联漏做',
            label: '与车道中心线关联漏做'
        }
    ],
    AD_Pole_Geo: [
        {
            value: '杆状物多余',
            label: '杆状物多余'
        },
        {
            value: '杆状物遗漏',
            label: '杆状物遗漏'
        },
        {
            value: '矢量与点云纵向偏差≥50cm',
            label: '矢量与点云纵向偏差≥50cm'
        },
        {
            value: '矢量与点云横向偏差≥50cm',
            label: '矢量与点云横向偏差≥50cm'
        },
        {
            value: '几何符合精度要求，但不平滑',
            label: '几何符合精度要求，但不平滑'
        }
    ]
};

const ERROR_DESC_RESET_FIELD_MAP = {
    AD_LaneDivider: {
        车道线多余: {
            qcDesc: null,
            errContent: 1,
            errorType: 1,
            fieldName: null,
            errLevel: 1
        },
        车道线遗漏: {
            qcDesc: null,
            errContent: 1,
            errorType: 2,
            fieldName: null,
            errLevel: 1
        },
        车道线逆序: {
            qcDesc: null,
            errContent: 1,
            errorType: 3,
            fieldName: null,
            errLevel: 1
        },
        遗漏打断: {
            qcDesc: null,
            errContent: 1,
            errorType: 3,
            fieldName: null,
            errLevel: 1
        },
        打断不齐: {
            qcDesc: null,
            errContent: 1,
            errorType: 3,
            fieldName: null,
            errLevel: 2
        },
        逻辑连接错误: {
            qcDesc: null,
            errContent: 1,
            errorType: 3,
            fieldName: null,
            errLevel: 1
        },
        '道路边界矢量与点云横向偏差≥20cm': {
            qcDesc: null,
            errContent: 1,
            errorType: 3,
            fieldName: null,
            errLevel: 1
        },
        '非道路边界矢量与点云横向偏差≥10cm': {
            qcDesc: null,
            errContent: 1,
            errorType: 3,
            fieldName: null,
            errLevel: 1
        },
        '道路边界矢量与点云纵向偏差≥10cm': {
            qcDesc: null,
            errContent: 1,
            errorType: 3,
            fieldName: null,
            errLevel: 1
        },
        '非道路边界矢量与点云纵向偏差≥50cm': {
            qcDesc: null,
            errContent: 1,
            errorType: 3,
            fieldName: null,
            errLevel: 1
        },
        '矢量与点云高程精度偏差≥30cm': {
            qcDesc: null,
            errContent: 1,
            errorType: 3,
            fieldName: null,
            errLevel: 1
        },
        '几何符合精度要求，但不平滑': {
            qcDesc: null,
            errContent: 1,
            errorType: 3,
            fieldName: null,
            errLevel: 3
        },
        类型错误: {
            qcDesc: null,
            errContent: 2,
            errorType: 3,
            fieldName: 'TYPE',
            errLevel: 1
        },
        共用车道线标识错误: {
            qcDesc: null,
            errContent: 2,
            errorType: 3,
            fieldName: 'SHARE_LINE',
            errLevel: 2
        },
        道路边界标识错误: {
            qcDesc: null,
            errContent: 2,
            errorType: 3,
            fieldName: 'RD_EDGE',
            errLevel: 1
        },
        道路边界与参考线关联关系错误: {
            qcDesc: null,
            errContent: 3,
            errorType: 3,
            fieldName: 'REL_ID',
            errLevel: 1
        }
    },
    AD_LaneDivider_Plg: {
        多余制作: {
            qcDesc: null,
            errContent: 1,
            errorType: 1,
            fieldName: null,
            errLevel: 1
        },
        遗漏制作: {
            qcDesc: null,
            errContent: 1,
            errorType: 2,
            fieldName: null,
            errLevel: 1
        },
        '矢量与点云横向偏差≥10cm': {
            qcDesc: null,
            errContent: 1,
            errorType: 3,
            fieldName: null,
            errLevel: 1
        },
        '矢量与点云纵向偏差≥50cm': {
            qcDesc: null,
            errContent: 1,
            errorType: 3,
            fieldName: null,
            errLevel: 1
        },
        '矢量与点云高程偏差≥30cm': {
            qcDesc: null,
            errContent: 1,
            errorType: 3,
            fieldName: null,
            errLevel: 1
        },
        要素子类型错误: {
            qcDesc: null,
            errContent: 2,
            errorType: 3,
            fieldName: 'FEAT_TYPE',
            errLevel: 2
        },
        与车道线关联关系错误: {
            qcDesc: null,
            errContent: 3,
            errorType: 3,
            fieldName: 'LDIV_ID',
            errLevel: 3
        }
    },
    AD_Lane: {
        车道中心线多余: {
            qcDesc: null,
            errContent: 1,
            errorType: 1,
            fieldName: null,
            errLevel: 1
        },
        车道中心线遗漏: {
            qcDesc: null,
            errContent: 1,
            errorType: 2,
            fieldName: null,
            errLevel: 1
        },
        遗漏打断: {
            qcDesc: null,
            errContent: 1,
            errorType: 3,
            fieldName: null,
            errLevel: 1
        },
        打断不齐: {
            qcDesc: null,
            errContent: 1,
            errorType: 3,
            fieldName: null,
            errLevel: 2
        },
        '挂接/连接错误': {
            qcDesc: null,
            errContent: 1,
            errorType: 3,
            fieldName: null,
            errLevel: 1
        },
        '未在车道中间，距中心位置偏差>0.1m': {
            qcDesc: null,
            errContent: 1,
            errorType: 3,
            fieldName: null,
            errLevel: 1
        },
        '车道中心线基于车道线面上浮或下沉≥30cm': {
            qcDesc: null,
            errContent: 1,
            errorType: 3,
            fieldName: null,
            errLevel: 1
        },
        存在折角不平滑: {
            qcDesc: null,
            errContent: 1,
            errorType: 3,
            fieldName: null,
            errLevel: 1
        },
        车道类型错误: {
            qcDesc: null,
            errContent: 2,
            errorType: 3,
            fieldName: 'TYPE',
            errLevel: 1
        },
        车道编号错误: {
            qcDesc: null,
            errContent: 2,
            errorType: 3,
            fieldName: 'LANE_NO',
            errLevel: 1
        },
        与参考线关联制作错误: {
            qcDesc: null,
            errContent: 3,
            errorType: 3,
            fieldName: 'ROAD_ID',
            errLevel: 1
        },
        左车道线关联制作错误: {
            qcDesc: null,
            errContent: 3,
            errorType: 3,
            fieldName: 'L_LDIV_ID',
            errLevel: 1
        },
        右车道线关联制作错误: {
            qcDesc: null,
            errContent: 3,
            errorType: 3,
            fieldName: 'R_LDIV_ID',
            errLevel: 1
        },
        '距左车道边界距离不足1.5m': {
            qcDesc: null,
            errContent: 1,
            errorType: 3,
            fieldName: null,
            errLevel: 1
        },
        '距右车道边界距离不足1.5m': {
            qcDesc: null,
            errContent: 1,
            errorType: 3,
            fieldName: null,
            errLevel: 1
        },
        通行方向错误: {
            qcDesc: null,
            errContent: 2,
            errorType: 3,
            fieldName: 'DIRECTION',
            errLevel: 1
        },
        车道通行状态错误: {
            qcDesc: null,
            errContent: 2,
            errorType: 3,
            fieldName: 'STATUS',
            errLevel: 1
        },
        车道连通关系多做: {
            qcDesc: null,
            errContent: 3,
            errorType: 1,
            fieldName: 'REL_ID',
            errLevel: 1
        },
        车道连通关系漏做: {
            qcDesc: null,
            errContent: 3,
            errorType: 2,
            fieldName: 'REL_ID',
            errLevel: 1
        },
        车道限制错误: {
            qcDesc: null,
            errContent: 2,
            errorType: 3,
            fieldName: 'RS_TYPE',
            errLevel: 1
        },
        车道限制多余: {
            qcDesc: null,
            errContent: 2,
            errorType: 1,
            fieldName: 'RS_TYPE',
            errLevel: 1
        },
        车道限制遗漏: {
            qcDesc: null,
            errContent: 2,
            errorType: 2,
            fieldName: 'RS_TYPE',
            errLevel: 1
        },
        限制时间描述多做: {
            qcDesc: null,
            errContent: 3,
            errorType: 1,
            fieldName: 'TIMEDOM',
            errLevel: 1
        },
        限制时间描述漏做: {
            qcDesc: null,
            errContent: 3,
            errorType: 2,
            fieldName: 'TIMEDOM',
            errLevel: 1
        },
        限制时间描述错误: {
            qcDesc: null,
            errContent: 3,
            errorType: 3,
            fieldName: 'TIMEDOM',
            errLevel: 1
        },
        车道连接限制类型多做: {
            qcDesc: null,
            errContent: 3,
            errorType: 1,
            fieldName: 'RS_TYPE',
            errLevel: 1
        },
        车道连接限制类型漏做: {
            qcDesc: null,
            errContent: 3,
            errorType: 2,
            fieldName: 'RS_TYPE',
            errLevel: 1
        },
        车道连接限制类型错误: {
            qcDesc: null,
            errContent: 3,
            errorType: 3,
            fieldName: 'RS_TYPE',
            errLevel: 1
        },
        车道连接限制时间描述多做: {
            qcDesc: null,
            errContent: 3,
            errorType: 1,
            fieldName: 'TIMEDOM',
            errLevel: 1
        },
        车道连接限制时间描述漏做: {
            qcDesc: null,
            errContent: 3,
            errorType: 2,
            fieldName: 'TIMEDOM',
            errLevel: 1
        },
        车道连接限制时间描述错误: {
            qcDesc: null,
            errContent: 3,
            errorType: 3,
            fieldName: 'TIMEDOM',
            errLevel: 1
        }
    },
    AD_Arrow: {
        地面导向箭头多余: {
            qcDesc: null,
            errContent: 1,
            errorType: 1,
            fieldName: null,
            errLevel: 1
        },
        地面导向箭头遗漏: {
            qcDesc: null,
            errContent: 1,
            errorType: 2,
            fieldName: null,
            errLevel: 1
        },
        '矢量与点云纵向偏差≥10cm': {
            qcDesc: null,
            errContent: 1,
            errorType: 3,
            fieldName: null,
            errLevel: 1
        },
        '矢量与点云横向偏差≥10cm': {
            qcDesc: null,
            errContent: 1,
            errorType: 3,
            fieldName: null,
            errLevel: 1
        },
        '矢量与点云高程偏差≥30cm': {
            qcDesc: null,
            errContent: 1,
            errorType: 3,
            fieldName: null,
            errLevel: 1
        },
        '几何符合精度要求，但不平滑': {
            qcDesc: null,
            errContent: 1,
            errorType: 3,
            fieldName: null,
            errLevel: 3
        },
        箭头方向错误: {
            qcDesc: null,
            errContent: 2,
            errorType: 3,
            fieldName: 'ARR_DIRECT',
            errLevel: 2
        },
        地面导向箭头关联关系错误: {
            qcDesc: null,
            errContent: 3,
            errorType: 3,
            fieldName: 'LANE_ID',
            errLevel: 3
        }
    },
    AD_StopLocation: {
        '停止线、停车让行线、减速让行线、虚拟停止线多余': {
            qcDesc: null,
            errContent: 1,
            errorType: 1,
            fieldName: null,
            errLevel: 1
        },
        '停止线、停车让行线、减速让行线、虚拟停止线遗漏': {
            qcDesc: null,
            errContent: 1,
            errorType: 2,
            fieldName: null,
            errLevel: 1
        },
        矢量超出几何范围框线: {
            qcDesc: null,
            errContent: 1,
            errorType: 3,
            fieldName: null,
            errLevel: 2
        },
        '几何符合精度要求，但不平滑': {
            qcDesc: null,
            errContent: 1,
            errorType: 3,
            fieldName: null,
            errLevel: 3
        },
        类型错误: {
            qcDesc: null,
            errContent: 2,
            errorType: 3,
            fieldName: 'TYPE',
            errLevel: 2
        },
        与中心线多余关联: {
            qcDesc: null,
            errContent: 3,
            errorType: 1,
            fieldName: 'LANE_ID',
            errLevel: 1
        },
        与中心线遗漏关联: {
            qcDesc: null,
            errContent: 3,
            errorType: 2,
            fieldName: 'LANE_ID',
            errLevel: 1
        }
    },
    AD_StopLocation_Geo: {
        '停止线、停车让行线、减速让行线多余': {
            qcDesc: null,
            errContent: 1,
            errorType: 1,
            fieldName: null,
            errLevel: 1
        },
        '停止线、停车让行线、减速让行线遗漏': {
            qcDesc: null,
            errContent: 1,
            errorType: 2,
            fieldName: null,
            errLevel: 1
        },
        '矢量与点云横向偏差≥30cm': {
            qcDesc: null,
            errContent: 1,
            errorType: 3,
            fieldName: null,
            errLevel: 1
        },
        '矢量与点云纵向偏差≥10cm': {
            qcDesc: null,
            errContent: 1,
            errorType: 3,
            fieldName: null,
            errLevel: 1
        },
        '矢量与点云高程偏差≥30cm': {
            qcDesc: null,
            errContent: 1,
            errorType: 3,
            fieldName: null,
            errLevel: 1
        },
        '几何符合精度要求，但不平滑': {
            qcDesc: null,
            errContent: 1,
            errorType: 3,
            fieldName: null,
            errLevel: 3
        },
        类型错误: {
            qcDesc: null,
            errContent: 2,
            errorType: 3,
            fieldName: 'FEAT_TYPE',
            errLevel: 2
        },
        与逻辑层停止位置关联关系错误: {
            qcDesc: null,
            errContent: 3,
            errorType: 3,
            fieldName: 'STOPL_ID',
            errLevel: 3
        }
    },
    AD_LaneMark_Geo: {
        路面车道标记多余: {
            qcDesc: null,
            errContent: 1,
            errorType: 1,
            fieldName: null,
            errLevel: 2
        },
        路面车道标记遗漏: {
            qcDesc: null,
            errContent: 1,
            errorType: 2,
            fieldName: null,
            errLevel: 2
        },
        导流区与车道线不重合: {
            qcDesc: null,
            errContent: 1,
            errorType: 3,
            fieldName: null,
            errLevel: 2
        },
        '矢量与点云横向偏差≥20cm': {
            qcDesc: null,
            errContent: 1,
            errorType: 3,
            fieldName: null,
            errLevel: 2
        },
        '矢量与点云纵向偏差≥10cm': {
            qcDesc: null,
            errContent: 1,
            errorType: 3,
            fieldName: null,
            errLevel: 2
        },
        '矢量与点云高程偏差≥30cm': {
            qcDesc: null,
            errContent: 1,
            errorType: 3,
            fieldName: null,
            errLevel: 2
        },
        '几何符合精度要求，但不平滑': {
            qcDesc: null,
            errContent: 1,
            errorType: 3,
            fieldName: null,
            errLevel: 3
        },
        要素子类型错误: {
            qcDesc: null,
            errContent: 2,
            errorType: 3,
            fieldName: 'FEAT_TYPE',
            errLevel: 2
        },
        与中心线多余关联: {
            qcDesc: null,
            errContent: 3,
            errorType: 1,
            fieldName: 'LANE_ID',
            errLevel: 3
        },
        与中心线遗漏关联: {
            qcDesc: null,
            errContent: 3,
            errorType: 2,
            fieldName: 'LANE_ID',
            errLevel: 2
        }
    },
    AD_Text: {
        限速类的地面文字符号多余: {
            qcDesc: null,
            errContent: 1,
            errorType: 1,
            fieldName: null,
            errLevel: 1
        },
        非限速类的地面文字符号多余: {
            qcDesc: null,
            errContent: 1,
            errorType: 1,
            fieldName: null,
            errLevel: 3
        },
        限速类的地面文字符号遗漏: {
            qcDesc: null,
            errContent: 1,
            errorType: 2,
            fieldName: null,
            errLevel: 1
        },
        非限速类的地面文字符号遗漏: {
            qcDesc: null,
            errContent: 1,
            errorType: 2,
            fieldName: null,
            errLevel: 3
        },
        '矢量与点云横向偏差≥20cm': {
            qcDesc: null,
            errContent: 1,
            errorType: 3,
            fieldName: null,
            errLevel: 2
        },
        '矢量与点云纵向偏差≥10cm': {
            qcDesc: null,
            errContent: 1,
            errorType: 3,
            fieldName: null,
            errLevel: 2
        },
        '矢量与点云高程偏差≥30cm': {
            qcDesc: null,
            errContent: 1,
            errorType: 3,
            fieldName: null,
            errLevel: 2
        },
        '几何符合精度要求，但不平滑': {
            qcDesc: null,
            errContent: 1,
            errorType: 3,
            fieldName: null,
            errLevel: 3
        },
        语义类型错误: {
            qcDesc: null,
            errContent: 2,
            errorType: 3,
            fieldName: 'CONT_TYPE',
            errLevel: 2
        },
        限速值多做: {
            qcDesc: null,
            errContent: 2,
            errorType: 1,
            fieldName: 'SPEED',
            errLevel: 1
        },
        限速值漏做: {
            qcDesc: null,
            errContent: 2,
            errorType: 2,
            fieldName: 'SPEED',
            errLevel: 1
        },
        限速值错误: {
            qcDesc: null,
            errContent: 2,
            errorType: 3,
            fieldName: 'SPEED',
            errLevel: 1
        },
        时间限制描述多做: {
            qcDesc: null,
            errContent: 2,
            errorType: 1,
            fieldName: 'TIMEDOM',
            errLevel: 2
        },
        时间限制描述漏做: {
            qcDesc: null,
            errContent: 2,
            errorType: 2,
            fieldName: 'TIMEDOM',
            errLevel: 2
        },
        时间限制描述错误: {
            qcDesc: null,
            errContent: 2,
            errorType: 3,
            fieldName: 'TIMEDOM',
            errLevel: 2
        },
        车辆限制描述多做: {
            qcDesc: null,
            errContent: 2,
            errorType: 1,
            fieldName: 'VEH_LMT',
            errLevel: 2
        },
        车辆限制描述漏做: {
            qcDesc: null,
            errContent: 2,
            errorType: 2,
            fieldName: 'VEH_LMT',
            errLevel: 2
        },
        车辆限制描述错误: {
            qcDesc: null,
            errContent: 2,
            errorType: 3,
            fieldName: 'VEH_LMT',
            errLevel: 2
        },
        其他文本描述多做: {
            qcDesc: null,
            errContent: 2,
            errorType: 1,
            fieldName: 'TEXT',
            errLevel: 3
        },
        其他文本描述漏做: {
            qcDesc: null,
            errContent: 2,
            errorType: 2,
            fieldName: 'TEXT',
            errLevel: 3
        },
        其他文本描述错误: {
            qcDesc: null,
            errContent: 2,
            errorType: 3,
            fieldName: 'TEXT',
            errLevel: 3
        },
        关联车道中心线错误: {
            qcDesc: null,
            errContent: 3,
            errorType: 3,
            fieldName: 'LANE_ID',
            errLevel: 3
        }
    },
    AD_Road: {
        参考线多余: {
            qcDesc: null,
            errContent: 1,
            errorType: 1,
            fieldName: null,
            errLevel: 1
        },
        '挂接/连接错误': {
            qcDesc: null,
            errContent: 1,
            errorType: 3,
            fieldName: null,
            errLevel: 1
        },
        参考线遗漏: {
            qcDesc: null,
            errContent: 1,
            errorType: 2,
            fieldName: null,
            errLevel: 1
        },
        遗漏打断: {
            qcDesc: null,
            errContent: 1,
            errorType: 3,
            fieldName: null,
            errLevel: 1
        },
        打断不齐: {
            qcDesc: null,
            errContent: 1,
            errorType: 3,
            fieldName: null,
            errLevel: 2
        },
        '参考线基于车道线上浮或下沉≥30cm': {
            qcDesc: null,
            errContent: 1,
            errorType: 3,
            fieldName: null,
            errLevel: 3
        },
        几何位置不正确或者不平滑: {
            qcDesc: null,
            errContent: 1,
            errorType: 3,
            fieldName: null,
            errLevel: 3
        },
        参考线类型错误: {
            qcDesc: null,
            errContent: 2,
            errorType: 3,
            fieldName: 'TYPE',
            errLevel: 3
        },
        交叉路口标识错误: {
            qcDesc: null,
            errContent: 2,
            errorType: 3,
            fieldName: 'CROSSING',
            errLevel: 1
        },
        道路形态错误: {
            qcDesc: null,
            errContent: 2,
            errorType: 3,
            fieldName: 'RD_FORM',
            errLevel: 1
        },
        道路通行状态错误: {
            qcDesc: null,
            errContent: 2,
            errorType: 3,
            fieldName: 'RD_STATUS',
            errLevel: 1
        },
        道路通行方向错误: {
            qcDesc: null,
            errContent: 2,
            errorType: 3,
            fieldName: 'DIRECTION',
            errLevel: 1
        },
        连通关系多做: {
            qcDesc: null,
            errContent: 3,
            errorType: 1,
            fieldName: 'REL_ID',
            errLevel: 1
        },
        连通关系漏做: {
            qcDesc: null,
            errContent: 3,
            errorType: 2,
            fieldName: 'REL_ID',
            errLevel: 1
        },
        道路连接限制类型错误: {
            qcDesc: null,
            errContent: 3,
            errorType: 3,
            fieldName: 'RS_TYPE',
            errLevel: 1
        },
        道路连接限制时间描述多余: {
            qcDesc: null,
            errContent: 3,
            errorType: 1,
            fieldName: 'TIMEDOM',
            errLevel: 1
        },
        道路连接限制时间描述遗漏: {
            qcDesc: null,
            errContent: 3,
            errorType: 2,
            fieldName: 'TIMEDOM',
            errLevel: 1
        },
        道路连接限制时间描述错误: {
            qcDesc: null,
            errContent: 3,
            errorType: 3,
            fieldName: 'TIMEDOM',
            errLevel: 1
        }
    },
    AD_TrafficSign: {
        'P0、P1、P2级标志牌多余': {
            qcDesc: null,
            errContent: 1,
            errorType: 1,
            fieldName: null,
            errLevel: 1
        },
        'P0、P1、P2级标志牌遗漏': {
            qcDesc: null,
            errContent: 1,
            errorType: 2,
            fieldName: null,
            errLevel: 1
        },
        P3级标志牌多余: {
            qcDesc: null,
            errContent: 1,
            errorType: 1,
            fieldName: null,
            errLevel: 2
        },
        P3级标志牌遗漏: {
            qcDesc: null,
            errContent: 1,
            errorType: 2,
            fieldName: null,
            errLevel: 2
        },
        '矢量与点云纵向偏差≥50cm': {
            qcDesc: null,
            errContent: 1,
            errorType: 3,
            fieldName: null,
            errLevel: 2
        },
        '矢量与点云横向偏差≥50cm': {
            qcDesc: null,
            errContent: 1,
            errorType: 3,
            fieldName: null,
            errLevel: 2
        },
        '矢量与点云高程偏差≥50cm': {
            qcDesc: null,
            errContent: 1,
            errorType: 3,
            fieldName: null,
            errLevel: 2
        },
        时间描述多余: {
            qcDesc: null,
            errContent: 2,
            errorType: 1,
            fieldName: 'TIMEDOM',
            errLevel: 2
        },
        时间描述遗漏: {
            qcDesc: null,
            errContent: 2,
            errorType: 2,
            fieldName: 'TIMEDOM',
            errLevel: 2
        },
        时间描述错误: {
            qcDesc: null,
            errContent: 2,
            errorType: 3,
            fieldName: 'TIMEDOM',
            errLevel: 2
        },
        样式错误: {
            qcDesc: null,
            errContent: 2,
            errorType: 3,
            fieldName: 'SIGN_STYLE',
            errLevel: 2
        },
        交通标牌类型错误: {
            qcDesc: null,
            errContent: 2,
            errorType: 3,
            fieldName: 'SIGN_TYPE',
            errLevel: 2
        },
        语义类型错误: {
            qcDesc: null,
            errContent: 2,
            errorType: 3,
            fieldName: 'CONT_TYPE',
            errLevel: 2
        },
        语义内容错误: {
            qcDesc: null,
            errContent: 2,
            errorType: 3,
            fieldName: 'CONT_VALUE',
            errLevel: 2
        },
        与车道中心线关联多做: {
            qcDesc: null,
            errContent: 3,
            errorType: 1,
            fieldName: 'LANE_ID',
            errLevel: 2
        },
        与车道中心线关联漏做: {
            qcDesc: null,
            errContent: 3,
            errorType: 2,
            fieldName: 'LANE_ID',
            errLevel: 2
        }
    },
    AD_TrafficLight: {
        交通信号灯多余: {
            qcDesc: null,
            errContent: 1,
            errorType: 1,
            fieldName: null,
            errLevel: 2
        },
        交通信号灯遗漏: {
            qcDesc: null,
            errContent: 1,
            errorType: 2,
            fieldName: null,
            errLevel: 2
        },
        '矢量与点云纵向偏差≥50cm': {
            qcDesc: null,
            errContent: 1,
            errorType: 3,
            fieldName: null,
            errLevel: 2
        },
        '矢量与点云横向偏差≥50cm': {
            qcDesc: null,
            errContent: 1,
            errorType: 3,
            fieldName: null,
            errLevel: 2
        },
        '矢量与点云高程偏差≥50cm': {
            qcDesc: null,
            errContent: 1,
            errorType: 3,
            fieldName: null,
            errLevel: 2
        },
        与车道中心线关联多做: {
            qcDesc: null,
            errContent: 3,
            errorType: 1,
            fieldName: 'LANE_ID',
            errLevel: 1
        },
        与车道中心线关联漏做: {
            qcDesc: null,
            errContent: 3,
            errorType: 2,
            fieldName: 'LANE_ID',
            errLevel: 1
        }
    },
    AD_Pole_Geo: {
        杆状物多余: {
            qcDesc: null,
            errContent: 1,
            errorType: 1,
            fieldName: null,
            errLevel: 3
        },
        杆状物遗漏: {
            qcDesc: null,
            errContent: 1,
            errorType: 2,
            fieldName: null,
            errLevel: 3
        },
        '矢量与点云纵向偏差≥50cm': {
            qcDesc: null,
            errContent: 1,
            errorType: 3,
            fieldName: null,
            errLevel: 3
        },
        '矢量与点云横向偏差≥50cm': {
            qcDesc: null,
            errContent: 1,
            errorType: 3,
            fieldName: null,
            errLevel: 3
        },
        '几何符合精度要求，但不平滑': {
            qcDesc: null,
            errContent: 1,
            errorType: 3,
            fieldName: null,
            errLevel: 3
        }
    }
};

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
        value: 1,
        label: '多做'
    },
    {
        value: 2,
        label: '漏做'
    },
    {
        value: 3,
        label: '做错'
    },
    {
        value: 4,
        label: '其他'
    }
];

const FIX_STATUS_OPTIONS = [
    {
        value: 1,
        label: '待修正'
    },
    {
        value: 2,
        label: '无需修正'
    },
    {
        value: 3,
        label: '已修正'
    }
];

const QC_STATUS_OPTIONS = [
    {
        value: 1,
        label: '待修正'
    },
    {
        value: 2,
        label: '无需修正'
    },
    {
        value: 3,
        label: '已修正'
    }
];

const MS_QC_LINK_OPTIONS = [
    {
        value: 1,
        label: '人工识别质检'
    },
    {
        value: 2,
        label: '人工构建质检'
    },
    {
        value: 3,
        label: '二次质检'
    }
];

const MB_QC_LINK_OPTIONS = [
    {
        value: 1,
        label: '人工识别质检'
    },
    {
        value: 2,
        label: '人工构建质检'
    },
    {
        value: 3,
        label: '二次质检'
    }
];

const SECOND_QC_LINK_OPTIONS = [
    {
        value: 1,
        label: '人工识别质检'
    },
    {
        value: 2,
        label: '人工构建质检'
    },
    {
        value: 3,
        label: '二次质检'
    }
];

const QC_LINK_OPTIONS = [
    {
        value: 1,
        label: '人工识别质检'
    },
    {
        value: 2,
        label: '人工构建质检'
    },
    {
        value: 3,
        label: '二次质检'
    }
];

const FIELD_NAME_MAP = {
    AD_Road: [
        {
            value: 'TYPE',
            label: '道路参考线类型'
        },
        {
            value: 'CROSSING',
            label: '交叉口标识'
        },
        {
            value: 'RD_STATUS',
            label: '道路通行状态'
        },
        {
            value: 'RD_FORM',
            label: '道路形态'
        },
        {
            value: 'DIRECTION',
            label: '道路通行方向'
        },
        {
            value: 'REL_ID',
            label: '道路参考线连通关系'
        },
        {
            value: 'RS_TYPE',
            label: '参考线连接关系限制类型'
        },
        {
            value: 'TIMEDOM',
            label: '参考线连接关系限制时间描述'
        }
    ],
    AD_LaneDivider: [
        {
            value: 'TYPE',
            label: '车道线类型'
        },
        {
            value: 'SHARE_LINE',
            label: '共用车道线标识'
        },
        {
            value: 'RD_EDGE',
            label: '道路边界标识'
        },
        {
            value: 'WIDTH',
            label: '车道线宽度'
        },
        {
            value: 'COLOR',
            label: '车道线颜色'
        }
    ],
    AD_Lane: [
        {
            value: 'ROAD_ID',
            label: '关联道路参考线'
        },
        {
            value: 'L_LDIV_ID',
            label: '左侧车道线'
        },
        {
            value: 'R_LDIV_ID',
            label: '右侧车道线'
        },
        {
            value: 'TYPE',
            label: '车道类型'
        },
        {
            value: 'LANE_NO',
            label: '车道编号'
        },
        {
            value: 'DIRECTION',
            label: '车道通行方向'
        },
        {
            value: 'STATUS',
            label: '车道通行状态'
        },
        {
            value: 'REL_ID',
            label: '车道中心线连接关系'
        },
        {
            value: 'RS_TYPE',
            label: '车道中心线限制类型'
        },
        {
            value: 'RS_VALUE',
            label: '车道中心线限制取值'
        },
        {
            value: 'TIMEDOM',
            label: '车道中心线限制时间描述'
        },
        {
            value: 'RS_TYPE',
            label: '车道中心线连接关系限制类型'
        },
        {
            value: 'TIMEDOM',
            label: '车道中心线连接关系限制时间描述'
        }
    ],
    AD_Arrow: [
        {
            value: 'ARR_DIRECT',
            label: '箭头方向'
        },
        {
            value: 'LANE_ID',
            label: '箭头关联关系'
        }
    ],
    AD_StopLocation: [
        {
            value: 'TYPE',
            label: '停车线类型'
        },
        {
            value: 'LANE_ID',
            label: '停止位置关联中心线'
        }
    ],
    AD_Text: [
        {
            value: 'CONT_TYPE',
            label: '地面文字符号语义类型'
        },
        {
            value: 'SPEED',
            label: '限速值'
        },
        {
            value: 'TIMEDOM',
            label: '时间限制描述'
        },
        {
            value: 'VEH_LMT',
            label: '车辆限制描述'
        },
        {
            value: 'TEXT ',
            label: '其他文本描述'
        }
    ],
    AD_TrafficSign: [
        {
            value: 'SIGN_TYPE',
            label: '交通牌类型'
        },
        {
            value: 'CONT_TYPE',
            label: '交通牌语义类型'
        },
        {
            value: 'CONT_VALUE',
            label: '交通牌语义内容'
        },
        {
            value: 'TIMEDOM',
            label: '交通牌限制时间'
        },
        {
            value: 'LANE_ID',
            label: '交通牌关联中心线'
        }
    ],
    AD_TrafficLight: [
        {
            value: 'LIGHT_ID',
            label: '交通灯用户编号'
        },
        {
            value: 'LANE_ID',
            label: '交通灯关联中心线'
        }
    ],
    AD_LaneDivider_Plg: [
        {
            value: 'FEAT_TYPE',
            label: '虚线框类型'
        }
    ],
    AD_StopLocation_Geo: [
        {
            value: 'FEAT_TYPE',
            label: '停止位置类型'
        }
    ],
    AD_LaneMark_Geo: [
        {
            value: 'FEAT_TYPE',
            label: '面状标识物类型'
        },
        {
            value: 'LANE_ID',
            label: '面状标识物关联中心线'
        }
    ],
    AD_Pole_Geo: [
        {
            value: 'OBJ_ID',
            label: '杆状物用户编号'
        }
    ]
};

const ERROR_CONTENT_OPTIONS = [
    {
        value: 1,
        label: '几何'
    },
    {
        value: 2,
        label: '属性'
    },
    {
        value: 3,
        label: '关系'
    },
    {
        value: 4,
        label: '其他'
    }
];

const ERROR_LEVEL_OPTIONS = [
    {
        value: 1,
        label: 'S'
    },
    {
        value: 2,
        label: 'A'
    },
    {
        value: 3,
        label: 'B'
    },
    {
        value: 4,
        label: '其他'
    }
];

export const MARKER_OPTION_CONFIG = {
    ERROR_DESC_MAP,
    ERROR_DESC_RESET_FIELD_MAP,
    FILE_NAME_OPTIONS,
    ERROR_TYPE_OPTIONS,
    FIX_STATUS_OPTIONS,
    QC_STATUS_OPTIONS,
    MS_QC_LINK_OPTIONS,
    MB_QC_LINK_OPTIONS,
    SECOND_QC_LINK_OPTIONS,
    QC_LINK_OPTIONS,
    FIELD_NAME_MAP,
    ERROR_CONTENT_OPTIONS,
    ERROR_LEVEL_OPTIONS
};
