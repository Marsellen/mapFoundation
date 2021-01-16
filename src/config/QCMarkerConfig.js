import ChooseErrorFeature from 'src/pages/Index/components/ToolList/ChooseErrorFeature';
import ManageCtrl from 'src/utils/ManageCtrl';

const { getConfig } = ManageCtrl;

const ERROR_DESC_MAP = {
    AD_LaneDivider: [
        {
            value: '多做非“虚拟车道线”',
            label: '多做非“虚拟车道线”'
        },
        {
            value: '多做“虚拟车道线”',
            label: '多做“虚拟车道线”'
        },
        {
            value: '未齐打断或打断位置不正确',
            label: '未齐打断或打断位置不正确'
        },
        {
            value: '范围内漏做非“虚拟车道线”',
            label: '范围内漏做非“虚拟车道线”'
        },
        {
            value: '范围内漏做“虚拟车道线”',
            label: '范围内漏做“虚拟车道线”'
        },
        {
            value: '逻辑连接错误',
            label: '逻辑连接错误'
        },
        {
            value: '与点云横向相对精度>10cm',
            label: '与点云横向相对精度>10cm'
        },
        {
            value: '与点云横向相对精度<=10cm，但不平滑',
            label: '与点云横向相对精度<=10cm，但不平滑'
        },
        {
            value: '与点云纵向相对精度>30cm',
            label: '与点云纵向相对精度>30cm'
        },
        {
            value: '与点云纵向相对精度<=30cm，但不平滑',
            label: '与点云纵向相对精度<=30cm，但不平滑'
        },
        {
            value: '与点云高程相对精度>30cm',
            label: '与点云高程相对精度>30cm'
        },
        {
            value: '与点云高程相对精度<=30cm，但不平滑',
            label: '与点云高程相对精度<=30cm，但不平滑'
        },
        {
            value: '类型错误',
            label: '类型错误'
        },
        {
            value: '多做参考线标识',
            label: '多做参考线标识'
        },
        {
            value: '漏做参考线标识',
            label: '漏做参考线标识'
        },
        {
            value: '多做共用车道线标识',
            label: '多做共用车道线标识'
        },
        {
            value: '漏做共用车道线标识',
            label: '漏做共用车道线标识'
        },
        {
            value: '多做道路边界标识',
            label: '多做道路边界标识'
        },
        {
            value: '漏做道路边界标识',
            label: '漏做道路边界标识'
        },
        {
            value: '车道编号错误',
            label: '车道编号错误'
        },
        {
            value: '车道类型错误',
            label: '车道类型错误'
        },
        {
            value: '车道颜色错误',
            label: '车道颜色错误'
        },
        {
            value: '车道线宽度错误',
            label: '车道线宽度错误'
        },
        {
            value: '非道路左边线及纯道路边界通行方向错误',
            label: '非道路左边线及纯道路边界通行方向错误'
        },
        {
            value: '非道路左边线及纯道路边界车道通行状态错误',
            label: '非道路左边线及纯道路边界车道通行状态错误'
        },
        {
            value: '其它',
            label: '其它'
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
            value: '与点云横向相对精度>10cm',
            label: '与点云横向相对精度>10cm'
        },
        {
            value: '与点云横向相对精度<=10cm，但不规则',
            label: '与点云横向相对精度<=10cm，但不规则'
        },
        {
            value: '与点云纵向相对精度>30cm',
            label: '与点云纵向相对精度>30cm'
        },
        {
            value: '与点云纵向相对精度<=30cm，但不规则',
            label: '与点云纵向相对精度<=30cm，但不规则'
        },
        {
            value: '与点云高程相对精度>30cm',
            label: '与点云高程相对精度>30cm'
        },
        {
            value: '与点云高程相对精度<=30cm，但不规则',
            label: '与点云高程相对精度<=30cm，但不规则'
        },
        {
            value: '类型错误',
            label: '类型错误'
        },
        {
            value: '其它',
            label: '其它'
        }
    ],
    AD_Lane: [
        {
            value: '遗漏制作',
            label: '遗漏制作'
        },
        {
            value: '多余制作',
            label: '多余制作'
        },
        {
            value: '挂接/连接错误',
            label: '挂接/连接错误'
        },
        {
            value: '未在车道中间，距中心位置偏差>1m',
            label: '未在车道中间，距中心位置偏差>1m'
        },
        {
            value: '存在折角不平滑等几何错误',
            label: '存在折角不平滑等几何错误'
        },
        {
            value: '未齐打断或打断位置不正确',
            label: '未齐打断或打断位置不正确'
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
            value: '通行方向错误',
            label: '通行方向错误'
        },
        {
            value: '车道通行状态错误',
            label: '车道通行状态错误'
        },
        {
            value: '连通关联多做',
            label: '连通关联多做'
        },
        {
            value: '连通关联漏做',
            label: '连通关联漏做'
        },
        {
            value: '车道限制类型多做',
            label: '车道限制类型多做'
        },
        {
            value: '车道限制类型漏做',
            label: '车道限制类型漏做'
        },
        {
            value: '车道限制类型错误',
            label: '车道限制类型错误'
        },
        {
            value: '车道限制取值多做',
            label: '车道限制取值多做'
        },
        {
            value: '车道限制取值漏做',
            label: '车道限制取值漏做'
        },
        {
            value: '车道限制取值错误',
            label: '车道限制取值错误'
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
            value: '连接关系限制类型多做',
            label: '连接关系限制类型多做'
        },
        {
            value: '连接关系限制类型漏做',
            label: '连接关系限制类型漏做'
        },
        {
            value: '连接关系限制类型错误',
            label: '连接关系限制类型错误'
        },
        {
            value: '连接关系限制时间描述多做',
            label: '连接关系限制时间描述多做'
        },
        {
            value: '连接关系限制时间描述漏做',
            label: '连接关系限制时间描述漏做'
        },
        {
            value: '连接关系限制时间描述错误',
            label: '连接关系限制时间描述错误'
        },
        {
            value: '其它',
            label: '其它'
        }
    ],
    AD_LaneAttrPoint: [
        {
            value: '多余制作',
            label: '多余制作'
        },
        {
            value: '遗漏制作物理变化属性点',
            label: '遗漏制作物理变化属性点'
        },
        {
            value: '遗漏制作过程问题变化属性点',
            label: '遗漏制作过程问题变化属性点'
        },
        {
            value: '与实际位置偏差>1m',
            label: '与实际位置偏差>1m'
        },
        {
            value: '记录道路的物理形态变化的属性点类型错误',
            label: '记录道路的物理形态变化的属性点类型错误'
        },
        {
            value: '记录数据制作过程问题的属性点类型错误',
            label: '记录数据制作过程问题的属性点类型错误'
        },
        {
            value: '与道路参考线关联错误',
            label: '与道路参考线关联错误'
        },
        {
            value: '其它',
            label: '其它'
        }
    ],
    AD_Arrow: [
        {
            value: '多余制作',
            label: '多余制作'
        },
        {
            value: '遗漏制作',
            label: '遗漏制作'
        },
        {
            value: '与点云纵向相对精度>30cm',
            label: '与点云纵向相对精度>30cm'
        },
        {
            value: '未定与点云纵向相对精度<=30cm，但不规则义',
            label: '未定与点云纵向相对精度<=30cm，但不规则义'
        },
        {
            value: '与点云横向相对精度>20cm',
            label: '与点云横向相对精度>20cm'
        },
        {
            value: '与点云横向相对精度<=20cm，但不规则',
            label: '与点云横向相对精度<=20cm，但不规则'
        },
        {
            value: '与点云高程相对精度>30cm',
            label: '与点云高程相对精度>30cm'
        },
        {
            value: '与点云高程相对精度<=30cm，但不规则',
            label: '与点云高程相对精度<=30cm，但不规则'
        },
        {
            value: '方向错误',
            label: '方向错误'
        },
        {
            value: '其它',
            label: '其它'
        }
    ],
    AD_StopLocation: [
        {
            value: '多余制作',
            label: '多余制作'
        },
        {
            value: '遗漏制作',
            label: '遗漏制作'
        },
        {
            value: '与点云横向相对精度>20cm ',
            label: '与点云横向相对精度>20cm '
        },
        {
            value: '与点云横向相对精度<=20cm，但不平滑',
            label: '与点云横向相对精度<=20cm，但不平滑'
        },
        {
            value: '与点云纵向相对精度>20cm',
            label: '与点云纵向相对精度>20cm'
        },
        {
            value: '与点云纵向相对精度<=20cm，但不平滑',
            label: '与点云纵向相对精度<=20cm，但不平滑'
        },
        {
            value: '与点云高程相对精度>30cm',
            label: '与点云高程相对精度>30cm'
        },
        {
            value: '与点云高程相对精度<=30cm，但不平滑',
            label: '与点云高程相对精度<=30cm，但不平滑'
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
        },
        {
            value: '其它',
            label: '其它'
        }
    ],
    AD_StopLocation_Geo: [
        {
            value: '多余制作',
            label: '多余制作'
        },
        {
            value: '遗漏制作',
            label: '遗漏制作'
        },
        {
            value: '与点云横向相对精度>20cm',
            label: '与点云横向相对精度>20cm'
        },
        {
            value: '与点云横向相对精度<=20cm，但不平滑',
            label: '与点云横向相对精度<=20cm，但不平滑'
        },
        {
            value: '与点云纵向相对精度>20cm',
            label: '与点云纵向相对精度>20cm'
        },
        {
            value: '与点云纵向相对精度<=20cm，但不平滑',
            label: '与点云纵向相对精度<=20cm，但不平滑'
        },
        {
            value: '与点云高程相对精度>30cm',
            label: '与点云高程相对精度>30cm'
        },
        {
            value: '与点云高程相对精度<=30cm，但不规则',
            label: '与点云高程相对精度<=30cm，但不规则'
        },
        {
            value: '类型错误',
            label: '类型错误'
        },
        {
            value: '其它',
            label: '其它'
        }
    ],
    AD_LaneMark_Geo: [
        {
            value: '多余制作',
            label: '多余制作'
        },
        {
            value: '遗漏制作',
            label: '遗漏制作'
        },
        {
            value:
                '面状标识物与点云纵向相对精度>30cm，或纵向相对精度<=30cm，但与其他不应相交的要素存在几何',
            label:
                '面状标识物与点云纵向相对精度>30cm，或纵向相对精度<=30cm，但与其他不应相交的要素存在几何'
        },
        {
            value: '面状标识物与点云纵向相对精度<=30cm，但不规则',
            label: '面状标识物与点云纵向相对精度<=30cm，但不规则'
        },
        {
            value:
                '人行横道与点云纵向相对精度>20cm，或纵向相对精度<=20cm，但与其他不应相交的要素存在几何交叉',
            label:
                '人行横道与点云纵向相对精度>20cm，或纵向相对精度<=20cm，但与其他不应相交的要素存在几何交叉'
        },
        {
            value: '人行横道与点云纵向相对精度<=20cm，但不规则',
            label: '人行横道与点云纵向相对精度<=20cm，但不规则'
        },
        {
            value:
                '与点云横向相对精度>20cm，或横向相对精度<=20cm，但与其他不应相交的要素存在几何交叉',
            label:
                '与点云横向相对精度>20cm，或横向相对精度<=20cm，但与其他不应相交的要素存在几何交叉'
        },
        {
            value: '与点云横向相对精度<=20cm，但不规则',
            label: '与点云横向相对精度<=20cm，但不规则'
        },
        {
            value:
                '与点云高程相对精度>30cm，或横向相对精度<=30cm，但与其他不应相交的要素存在几何交叉',
            label:
                '与点云高程相对精度>30cm，或横向相对精度<=30cm，但与其他不应相交的要素存在几何交叉'
        },
        {
            value: '与点云高程相对精度<=30cm，但不规则',
            label: '与点云高程相对精度<=30cm，但不规则'
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
        },
        {
            value: '其它',
            label: '其它'
        }
    ],
    AD_Text: [
        {
            value: '多余制作',
            label: '多余制作'
        },
        {
            value: '遗漏制作',
            label: '遗漏制作'
        },
        {
            value: '与点云纵向相对精度>30cm',
            label: '与点云纵向相对精度>30cm'
        },
        {
            value: '与点云纵向相对精度<=30cm，但不规则',
            label: '与点云纵向相对精度<=30cm，但不规则'
        },
        {
            value: '与点云横向相对精度>20cm',
            label: '与点云横向相对精度>20cm'
        },
        {
            value: '与点云横向相对精度<=20cm，但不规则',
            label: '与点云横向相对精度<=20cm，但不规则'
        },
        {
            value: '与点云高程相对精度>30cm',
            label: '与点云高程相对精度>30cm'
        },
        {
            value: '与点云高程相对精度<=30cm，但不规则',
            label: '与点云高程相对精度<=30cm，但不规则'
        },
        {
            value: '类型错误',
            label: '类型错误'
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
            value: '其它',
            label: '其它'
        }
    ],
    AD_Road: [
        {
            value: '多余制作',
            label: '多余制作'
        },
        {
            value: '挂接/连接错误',
            label: '挂接/连接错误'
        },
        {
            value: '遗漏制作',
            label: '遗漏制作'
        },
        {
            value: '几何偏差>1m',
            label: '几何偏差>1m'
        },
        {
            value: '几何偏差<=1m，但与最左车道右边线不重合或几何不平滑',
            label: '几何偏差<=1m，但与最左车道右边线不重合或几何不平滑'
        },
        {
            value: '参考线类型错误',
            label: '参考线类型错误'
        },
        {
            value: '道路等级错误',
            label: '道路等级错误'
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
            value: '道路连接关系限制类型多余制作',
            label: '道路连接关系限制类型多余制作'
        },
        {
            value: '道路连接关系限制类型遗漏制作',
            label: '道路连接关系限制类型遗漏制作'
        },
        {
            value: '道路连接关系限制时间描述多余制作',
            label: '道路连接关系限制时间描述多余制作'
        },
        {
            value: '道路连接关系限制时间描述遗漏制作',
            label: '道路连接关系限制时间描述遗漏制作'
        },
        {
            value: '道路连接关系限制时间描述制作错误',
            label: '道路连接关系限制时间描述制作错误'
        },
        {
            value: '其它',
            label: '其它'
        }
    ],
    AD_TrafficSign: [
        {
            value: '多余制作',
            label: '多余制作'
        },
        {
            value: '遗漏制作',
            label: '遗漏制作'
        },
        {
            value: '与点云纵向相对精度>30cm',
            label: '与点云纵向相对精度>30cm'
        },
        {
            value: '与点云纵向相对精度<=30cm，但不规则',
            label: '与点云纵向相对精度<=30cm，但不规则'
        },
        {
            value: '与点云横向相对精度>20cm',
            label: '与点云横向相对精度>20cm'
        },
        {
            value: '与点云横向相对精度<=20cm，但不规则',
            label: '与点云横向相对精度<=20cm，但不规则'
        },
        {
            value: '与点云高程相对精度>30cm',
            label: '与点云高程相对精度>30cm'
        },
        {
            value: '与点云高程相对精度<=30cm，但不规则',
            label: '与点云高程相对精度<=30cm，但不规则'
        },
        {
            value: '时间描述错误',
            label: '时间描述错误'
        },
        {
            value: '样式错误',
            label: '样式错误'
        },
        {
            value: '类型错误',
            label: '类型错误'
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
            value: '与车道中心线关联多做',
            label: '与车道中心线关联多做'
        },
        {
            value: '与车道中心线关联漏做',
            label: '与车道中心线关联漏做'
        },
        {
            value: '其它',
            label: '其它'
        }
    ],
    AD_TrafficLight: [
        {
            value: '多余制作',
            label: '多余制作'
        },
        {
            value: '遗漏制作',
            label: '遗漏制作'
        },
        {
            value: '与点云纵向相对精度>30cm',
            label: '与点云纵向相对精度>30cm'
        },
        {
            value: '与点云纵向相对精度<=30cm，但不规则',
            label: '与点云纵向相对精度<=30cm，但不规则'
        },
        {
            value: '与点云横向相对精度>20cm',
            label: '与点云横向相对精度>20cm'
        },
        {
            value: '与点云横向相对精度<=20cm，但不规则',
            label: '与点云横向相对精度<=20cm，但不规则'
        },
        {
            value: '与点云高程相对精度>30cm',
            label: '与点云高程相对精度>30cm'
        },
        {
            value: '与点云高程相对精度<=30cm，但不规则',
            label: '与点云高程相对精度<=30cm，但不规则'
        },
        {
            value: '与车道中心线关联多做',
            label: '与车道中心线关联多做'
        },
        {
            value: '与车道中心线关联漏做',
            label: '与车道中心线关联漏做'
        },
        {
            value: '其它',
            label: '其它'
        }
    ],
    AD_RS_Barrier: [
        {
            value: '多余制作',
            label: '多余制作'
        },
        {
            value: '遗漏制作',
            label: '遗漏制作'
        },
        {
            value: '与点云横向相对精度>20cm',
            label: '与点云横向相对精度>20cm'
        },
        {
            value: '与点云横向相对精度<=20cm，但不规则',
            label: '与点云横向相对精度<=20cm，但不规则'
        },
        {
            value: '与点云纵向相对精度>30cm',
            label: '与点云纵向相对精度>30cm'
        },
        {
            value: '与点云纵向相对精度<=30cm，但不规则',
            label: '与点云纵向相对精度<=30cm，但不规则'
        },
        {
            value: '与点云高程相对精度>30cm',
            label: '与点云高程相对精度>30cm'
        },
        {
            value: '与点云高程相对精度<=30cm，但不规则',
            label: '与点云高程相对精度<=30cm，但不规则'
        },
        {
            value: '类型错误',
            label: '类型错误'
        },
        {
            value: '材质错误',
            label: '材质错误'
        },
        {
            value: '其它',
            label: '其它'
        }
    ],
    AD_Pole_Geo: [
        {
            value: '多余制作',
            label: '多余制作'
        },
        {
            value: '遗漏制作',
            label: '遗漏制作'
        },
        {
            value: '与点云纵向相对精度>30cm',
            label: '与点云纵向相对精度>30cm'
        },
        {
            value: '与点云纵向相对精度<=30cm，但不规则',
            label: '与点云纵向相对精度<=30cm，但不规则'
        },
        {
            value: '与点云横向相对精度>20cm',
            label: '与点云横向相对精度>20cm'
        },
        {
            value: '与点云横向相对精度<=20cm，但不规则',
            label: '与点云横向相对精度<=20cm，但不规则'
        },
        {
            value: '与点云高程相对精度>30cm',
            label: '与点云高程相对精度>30cm'
        },
        {
            value: '与点云高程相对精度<=30cm，但不规则',
            label: '与点云高程相对精度<=30cm，但不规则'
        },
        {
            value: '其它',
            label: '其它'
        }
    ]
};

const ERROR_DESC_RESET_FIELD_MAP = {
    AD_LaneDivider: {
        ['多做非“虚拟车道线”']: {
            qcDesc: null,
            errContent: 1,
            errorType: 1,
            fieldName: null,
            errLevel: 1
        },
        ['多做“虚拟车道线”']: {
            qcDesc: null,
            errContent: 1,
            errorType: 1,
            fieldName: null,
            errLevel: 2
        },
        ['未齐打断或打断位置不正确']: {
            qcDesc: null,
            errContent: 1,
            errorType: 3,
            fieldName: null,
            errLevel: 2
        },
        ['范围内漏做非“虚拟车道线”']: {
            qcDesc: null,
            errContent: 1,
            errorType: 2,
            fieldName: null,
            errLevel: 1
        },
        ['范围内漏做“虚拟车道线”']: {
            qcDesc: null,
            errContent: 1,
            errorType: 2,
            fieldName: null,
            errLevel: 3
        },
        ['逻辑连接错误']: {
            qcDesc: null,
            errContent: 1,
            errorType: 3,
            fieldName: null,
            errLevel: 1
        },
        ['与点云横向相对精度>10cm']: {
            qcDesc: null,
            errContent: 1,
            errorType: 3,
            fieldName: null,
            errLevel: 1
        },
        ['与点云横向相对精度<=10cm，但不平滑']: {
            qcDesc: null,
            errContent: 1,
            errorType: 3,
            fieldName: null,
            errLevel: 3
        },
        ['与点云纵向相对精度>30cm']: {
            qcDesc: null,
            errContent: 1,
            errorType: 3,
            fieldName: null,
            errLevel: 1
        },
        ['与点云纵向相对精度<=30cm，但不平滑']: {
            qcDesc: null,
            errContent: 1,
            errorType: 3,
            fieldName: null,
            errLevel: 3
        },
        ['与点云高程相对精度>30cm']: {
            qcDesc: null,
            errContent: 1,
            errorType: 3,
            fieldName: null,
            errLevel: 1
        },
        ['与点云高程相对精度<=30cm，但不平滑']: {
            qcDesc: null,
            errContent: 1,
            errorType: 3,
            fieldName: null,
            errLevel: 3
        },
        ['类型错误']: {
            qcDesc: null,
            errContent: 2,
            errorType: 3,
            fieldName: 'TYPE',
            errLevel: 1
        },
        ['多做参考线标识']: {
            qcDesc: null,
            errContent: 2,
            errorType: 1,
            fieldName: 'RD_LINE',
            errLevel: 1
        },
        ['漏做参考线标识']: {
            qcDesc: null,
            errContent: 2,
            errorType: 2,
            fieldName: 'RD_LINE',
            errLevel: 1
        },
        ['多做共用车道线标识']: {
            qcDesc: null,
            errContent: 2,
            errorType: 1,
            fieldName: 'SHARE_LINE',
            errLevel: 2
        },
        ['漏做共用车道线标识']: {
            qcDesc: null,
            errContent: 2,
            errorType: 2,
            fieldName: 'SHARE_LINE',
            errLevel: 2
        },
        ['多做道路边界标识']: {
            qcDesc: null,
            errContent: 2,
            errorType: 1,
            fieldName: 'RD_EDGE',
            errLevel: 1
        },
        ['漏做道路边界标识']: {
            qcDesc: null,
            errContent: 2,
            errorType: 2,
            fieldName: 'RD_EDGE',
            errLevel: 2
        },
        ['车道编号错误']: {
            qcDesc: null,
            errContent: 2,
            errorType: 3,
            fieldName: 'LANE_NO',
            errLevel: 3
        },
        ['车道类型错误']: {
            qcDesc: null,
            errContent: 2,
            errorType: 3,
            fieldName: 'LANE_TYPE',
            errLevel: 3
        },
        ['车道颜色错误']: {
            qcDesc: null,
            errContent: 2,
            errorType: 3,
            fieldName: 'COLOR',
            errLevel: 3
        },
        ['车道线宽度错误']: {
            qcDesc: null,
            errContent: 2,
            errorType: 3,
            fieldName: 'WIDTH',
            errLevel: 3
        },
        ['非道路左边线及纯道路边界通行方向错误']: {
            qcDesc: null,
            errContent: 2,
            errorType: 3,
            fieldName: 'DIRECTION',
            errLevel: 3
        },
        ['非道路左边线及纯道路边界车道通行状态错误']: {
            qcDesc: null,
            errContent: 2,
            errorType: 3,
            fieldName: 'LANE_STATUS',
            errLevel: 3
        },
        ['其它']: {
            qcDesc: null,
            errContent: 1,
            errorType: 3,
            fieldName: null,
            errLevel: 4
        }
    },
    AD_LaneDivider_Plg: {
        ['多余制作']: {
            qcDesc: null,
            errContent: 1,
            errorType: 1,
            fieldName: null,
            errLevel: 1
        },
        ['遗漏制作']: {
            qcDesc: null,
            errContent: 1,
            errorType: 2,
            fieldName: null,
            errLevel: 3
        },
        ['与点云横向相对精度>10cm']: {
            qcDesc: null,
            errContent: 1,
            errorType: 3,
            fieldName: null,
            errLevel: 1
        },
        ['与点云横向相对精度<=10cm，但不规则']: {
            qcDesc: null,
            errContent: 1,
            errorType: 3,
            fieldName: null,
            errLevel: 3
        },
        ['与点云纵向相对精度>30cm']: {
            qcDesc: null,
            errContent: 1,
            errorType: 3,
            fieldName: null,
            errLevel: 1
        },
        ['与点云纵向相对精度<=30cm，但不规则']: {
            qcDesc: null,
            errContent: 1,
            errorType: 3,
            fieldName: null,
            errLevel: 3
        },
        ['与点云高程相对精度>30cm']: {
            qcDesc: null,
            errContent: 1,
            errorType: 3,
            fieldName: null,
            errLevel: 1
        },
        ['与点云高程相对精度<=30cm，但不规则']: {
            qcDesc: null,
            errContent: 1,
            errorType: 3,
            fieldName: null,
            errLevel: 3
        },
        ['类型错误']: {
            qcDesc: null,
            errContent: 2,
            errorType: 3,
            fieldName: 'FEAT_TYPE',
            errLevel: 1
        },
        ['其它']: {
            qcDesc: null,
            errContent: 1,
            errorType: 3,
            fieldName: null,
            errLevel: 4
        }
    },
    AD_Lane: {
        ['遗漏制作']: {
            qcDesc: null,
            errContent: 1,
            errorType: 2,
            fieldName: null,
            errLevel: 1
        },
        ['多余制作']: {
            qcDesc: null,
            errContent: 1,
            errorType: 1,
            fieldName: null,
            errLevel: 1
        },
        ['挂接/连接错误']: {
            qcDesc: null,
            errContent: 1,
            errorType: 3,
            fieldName: null,
            errLevel: 1
        },
        ['未在车道中间，距中心位置偏差>1m']: {
            qcDesc: null,
            errContent: 1,
            errorType: 3,
            fieldName: null,
            errLevel: 1
        },
        ['存在折角不平滑等几何错误']: {
            qcDesc: null,
            errContent: 1,
            errorType: 3,
            fieldName: null,
            errLevel: 1
        },
        ['未齐打断或打断位置不正确']: {
            qcDesc: null,
            errContent: 1,
            errorType: 3,
            fieldName: null,
            errLevel: 2
        },
        ['车道类型错误']: {
            qcDesc: null,
            errContent: 2,
            errorType: 3,
            fieldName: 'TYPE',
            errLevel: 1
        },
        ['车道编号错误']: {
            qcDesc: null,
            errContent: 2,
            errorType: 3,
            fieldName: 'LANE_NO',
            errLevel: 1
        },
        ['与参考线关联制作错误']: {
            qcDesc: null,
            errContent: 2,
            errorType: 3,
            fieldName: 'ROAD_ID',
            errLevel: 1
        },
        ['左车道线关联制作错误']: {
            qcDesc: null,
            errContent: 2,
            errorType: 3,
            fieldName: 'L_LDIV_ID',
            errLevel: 1
        },
        ['右车道线关联制作错误']: {
            qcDesc: null,
            errContent: 2,
            errorType: 3,
            fieldName: 'R_LDIV_ID',
            errLevel: 1
        },
        ['通行方向错误']: {
            qcDesc: null,
            errContent: 2,
            errorType: 3,
            fieldName: 'DIRECTION',
            errLevel: 1
        },
        ['车道通行状态错误']: {
            qcDesc: null,
            errContent: 2,
            errorType: 3,
            fieldName: 'STATUS',
            errLevel: 1
        },
        ['连通关联多做']: {
            qcDesc: null,
            errContent: 3,
            errorType: 1,
            fieldName: 'REL_ID',
            errLevel: 1
        },
        ['连通关联漏做']: {
            qcDesc: null,
            errContent: 3,
            errorType: 2,
            fieldName: 'REL_ID',
            errLevel: 1
        },
        ['车道限制类型多做']: {
            qcDesc: null,
            errContent: 3,
            errorType: 1,
            fieldName: 'RS_TYPE',
            errLevel: 1
        },
        ['车道限制类型漏做']: {
            qcDesc: null,
            errContent: 3,
            errorType: 2,
            fieldName: 'RS_TYPE',
            errLevel: 1
        },
        ['车道限制类型错误']: {
            qcDesc: null,
            errContent: 3,
            errorType: 3,
            fieldName: 'RS_TYPE',
            errLevel: 1
        },
        ['车道限制取值多做']: {
            qcDesc: null,
            errContent: 3,
            errorType: 1,
            fieldName: 'RS_VALUE',
            errLevel: 1
        },
        ['车道限制取值漏做']: {
            qcDesc: null,
            errContent: 3,
            errorType: 2,
            fieldName: 'RS_VALUE',
            errLevel: 1
        },
        ['车道限制取值错误']: {
            qcDesc: null,
            errContent: 3,
            errorType: 3,
            fieldName: 'RS_VALUE',
            errLevel: 1
        },
        ['限制时间描述多做']: {
            qcDesc: null,
            errContent: 3,
            errorType: 1,
            fieldName: 'TIMEDOM',
            errLevel: 1
        },
        ['限制时间描述漏做']: {
            qcDesc: null,
            errContent: 3,
            errorType: 2,
            fieldName: 'TIMEDOM',
            errLevel: 1
        },
        ['限制时间描述错误']: {
            qcDesc: null,
            errContent: 3,
            errorType: 3,
            fieldName: 'TIMEDOM',
            errLevel: 1
        },
        ['连接关系限制类型多做']: {
            qcDesc: null,
            errContent: 3,
            errorType: 1,
            fieldName: 'RS_TYPE',
            errLevel: 1
        },
        ['连接关系限制类型漏做']: {
            qcDesc: null,
            errContent: 3,
            errorType: 2,
            fieldName: 'RS_TYPE',
            errLevel: 1
        },
        ['连接关系限制类型错误']: {
            qcDesc: null,
            errContent: 3,
            errorType: 3,
            fieldName: 'RS_TYPE',
            errLevel: 1
        },
        ['连接关系限制时间描述多做']: {
            qcDesc: null,
            errContent: 3,
            errorType: 1,
            fieldName: 'TIMEDOM',
            errLevel: 1
        },
        ['连接关系限制时间描述漏做']: {
            qcDesc: null,
            errContent: 3,
            errorType: 2,
            fieldName: 'TIMEDOM',
            errLevel: 1
        },
        ['连接关系限制时间描述错误']: {
            qcDesc: null,
            errContent: 3,
            errorType: 3,
            fieldName: 'TIMEDOM',
            errLevel: 1
        },
        ['其它']: {
            qcDesc: null,
            errContent: 1,
            errorType: 3,
            fieldName: null,
            errLevel: 4
        }
    },
    AD_LaneAttrPoint: {
        ['多余制作']: {
            qcDesc: null,
            errContent: 1,
            errorType: 1,
            fieldName: null,
            errLevel: 2
        },
        ['遗漏制作物理变化属性点']: {
            qcDesc: null,
            errContent: 1,
            errorType: 2,
            fieldName: null,
            errLevel: 2
        },
        ['遗漏制作过程问题变化属性点']: {
            qcDesc: null,
            errContent: 1,
            errorType: 2,
            fieldName: null,
            errLevel: 3
        },
        ['与实际位置偏差>1m']: {
            qcDesc: null,
            errContent: 1,
            errorType: 3,
            fieldName: null,
            errLevel: 2
        },
        ['记录道路的物理形态变化的属性点类型错误']: {
            qcDesc: null,
            errContent: 2,
            errorType: 3,
            fieldName: 'TYPE',
            errLevel: 2
        },
        ['记录数据制作过程问题的属性点类型错误']: {
            qcDesc: null,
            errContent: 2,
            errorType: 3,
            fieldName: 'TYPE',
            errLevel: 3
        },
        ['与道路参考线关联错误']: {
            qcDesc: null,
            errContent: 2,
            errorType: 3,
            fieldName: 'ROAD_ID',
            errLevel: 2
        },
        ['其它']: {
            qcDesc: null,
            errContent: 1,
            errorType: 3,
            fieldName: null,
            errLevel: 4
        }
    },
    AD_Arrow: {
        ['多余制作']: {
            qcDesc: null,
            errContent: 1,
            errorType: 1,
            fieldName: null,
            errLevel: 2
        },
        ['遗漏制作']: {
            qcDesc: null,
            errContent: 1,
            errorType: 2,
            fieldName: null,
            errLevel: 2
        },
        ['与点云纵向相对精度>30cm']: {
            qcDesc: null,
            errContent: 1,
            errorType: 3,
            fieldName: null,
            errLevel: 2
        },
        ['未定与点云纵向相对精度<=30cm，但不规则义']: {
            qcDesc: null,
            errContent: 1,
            errorType: 3,
            fieldName: null,
            errLevel: 3
        },
        ['与点云横向相对精度>20cm']: {
            qcDesc: null,
            errContent: 1,
            errorType: 3,
            fieldName: null,
            errLevel: 2
        },
        ['与点云横向相对精度<=20cm，但不规则']: {
            qcDesc: null,
            errContent: 1,
            errorType: 3,
            fieldName: null,
            errLevel: 3
        },
        ['与点云高程相对精度>30cm']: {
            qcDesc: null,
            errContent: 1,
            errorType: 3,
            fieldName: null,
            errLevel: 2
        },
        ['与点云高程相对精度<=30cm，但不规则']: {
            qcDesc: null,
            errContent: 1,
            errorType: 3,
            fieldName: null,
            errLevel: 3
        },
        ['方向错误']: {
            qcDesc: null,
            errContent: 2,
            errorType: 3,
            fieldName: 'ARR_DIRECT',
            errLevel: 2
        },
        ['其它']: {
            qcDesc: null,
            errContent: 1,
            errorType: 3,
            fieldName: null,
            errLevel: 4
        }
    },
    AD_StopLocation: {
        ['多余制作']: {
            qcDesc: null,
            errContent: 1,
            errorType: 1,
            fieldName: null,
            errLevel: 1
        },
        ['遗漏制作']: {
            qcDesc: null,
            errContent: 1,
            errorType: 2,
            fieldName: null,
            errLevel: 1
        },
        ['与点云横向相对精度>20cm ']: {
            qcDesc: null,
            errContent: 1,
            errorType: 3,
            fieldName: null,
            errLevel: 2
        },
        ['与点云横向相对精度<=20cm，但不平滑']: {
            qcDesc: null,
            errContent: 1,
            errorType: 3,
            fieldName: null,
            errLevel: 3
        },
        ['与点云纵向相对精度>20cm']: {
            qcDesc: null,
            errContent: 1,
            errorType: 3,
            fieldName: null,
            errLevel: 2
        },
        ['与点云纵向相对精度<=20cm，但不平滑']: {
            qcDesc: null,
            errContent: 1,
            errorType: 3,
            fieldName: null,
            errLevel: 3
        },
        ['与点云高程相对精度>30cm']: {
            qcDesc: null,
            errContent: 1,
            errorType: 3,
            fieldName: null,
            errLevel: 2
        },
        ['与点云高程相对精度<=30cm，但不平滑']: {
            qcDesc: null,
            errContent: 1,
            errorType: 3,
            fieldName: null,
            errLevel: 3
        },
        ['类型错误']: {
            qcDesc: null,
            errContent: 2,
            errorType: 3,
            fieldName: 'TYPE',
            errLevel: 2
        },
        ['与中心线多余关联']: {
            qcDesc: null,
            errContent: 3,
            errorType: 1,
            fieldName: 'LANE_ID',
            errLevel: 1
        },
        ['与中心线遗漏关联']: {
            qcDesc: null,
            errContent: 3,
            errorType: 2,
            fieldName: 'LANE_ID',
            errLevel: 1
        },
        ['其它']: {
            qcDesc: null,
            errContent: 1,
            errorType: 3,
            fieldName: null,
            errLevel: 4
        }
    },
    AD_StopLocation_Geo: {
        ['多余制作']: {
            qcDesc: null,
            errContent: 1,
            errorType: 1,
            fieldName: null,
            errLevel: 1
        },
        ['遗漏制作']: {
            qcDesc: null,
            errContent: 1,
            errorType: 2,
            fieldName: null,
            errLevel: 2
        },
        ['与点云横向相对精度>20cm']: {
            qcDesc: null,
            errContent: 1,
            errorType: 3,
            fieldName: null,
            errLevel: 2
        },
        ['与点云横向相对精度<=20cm，但不平滑']: {
            qcDesc: null,
            errContent: 1,
            errorType: 3,
            fieldName: null,
            errLevel: 3
        },
        ['与点云纵向相对精度>20cm']: {
            qcDesc: null,
            errContent: 1,
            errorType: 3,
            fieldName: null,
            errLevel: 2
        },
        ['与点云纵向相对精度<=20cm，但不平滑']: {
            qcDesc: null,
            errContent: 1,
            errorType: 3,
            fieldName: null,
            errLevel: 3
        },
        ['与点云高程相对精度>30cm']: {
            qcDesc: null,
            errContent: 1,
            errorType: 3,
            fieldName: null,
            errLevel: 2
        },
        ['与点云高程相对精度<=30cm，但不规则']: {
            qcDesc: null,
            errContent: 1,
            errorType: 3,
            fieldName: null,
            errLevel: 3
        },
        ['类型错误']: {
            qcDesc: null,
            errContent: 2,
            errorType: 3,
            fieldName: 'FEAT_TYPE',
            errLevel: 2
        },
        ['其它']: {
            qcDesc: null,
            errContent: 1,
            errorType: 3,
            fieldName: null,
            errLevel: 4
        }
    },
    AD_LaneMark_Geo: {
        ['多余制作']: {
            qcDesc: null,
            errContent: 1,
            errorType: 1,
            fieldName: null,
            errLevel: 2
        },
        ['遗漏制作']: {
            qcDesc: null,
            errContent: 1,
            errorType: 2,
            fieldName: null,
            errLevel: 2
        },
        ['面状标识物与点云纵向相对精度>30cm，或纵向相对精度<=30cm，但与其他不应相交的要素存在几何']: {
            qcDesc: null,
            errContent: 1,
            errorType: 3,
            fieldName: null,
            errLevel: 2
        },
        ['面状标识物与点云纵向相对精度<=30cm，但不规则']: {
            qcDesc: null,
            errContent: 1,
            errorType: 3,
            fieldName: null,
            errLevel: 3
        },
        ['人行横道与点云纵向相对精度>20cm，或纵向相对精度<=20cm，但与其他不应相交的要素存在几何交叉']: {
            qcDesc: null,
            errContent: 1,
            errorType: 3,
            fieldName: null,
            errLevel: 2
        },
        ['人行横道与点云纵向相对精度<=20cm，但不规则']: {
            qcDesc: null,
            errContent: 1,
            errorType: 3,
            fieldName: null,
            errLevel: 3
        },
        ['与点云横向相对精度>20cm，或横向相对精度<=20cm，但与其他不应相交的要素存在几何交叉']: {
            qcDesc: null,
            errContent: 1,
            errorType: 3,
            fieldName: null,
            errLevel: 2
        },
        ['与点云横向相对精度<=20cm，但不规则']: {
            qcDesc: null,
            errContent: 1,
            errorType: 3,
            fieldName: null,
            errLevel: 3
        },
        ['与点云高程相对精度>30cm，或横向相对精度<=30cm，但与其他不应相交的要素存在几何交叉']: {
            qcDesc: null,
            errContent: 1,
            errorType: 3,
            fieldName: null,
            errLevel: 2
        },
        ['与点云高程相对精度<=30cm，但不规则']: {
            qcDesc: null,
            errContent: 1,
            errorType: 3,
            fieldName: null,
            errLevel: 3
        },
        ['类型错误']: {
            qcDesc: null,
            errContent: 2,
            errorType: 3,
            fieldName: 'FEAT_TYPE',
            errLevel: 2
        },
        ['与中心线多余关联']: {
            qcDesc: null,
            errContent: 3,
            errorType: 1,
            fieldName: 'LANE_ID',
            errLevel: 1
        },
        ['与中心线遗漏关联']: {
            qcDesc: null,
            errContent: 3,
            errorType: 2,
            fieldName: 'LANE_ID',
            errLevel: 1
        },
        ['其它']: {
            qcDesc: null,
            errContent: 1,
            errorType: 3,
            fieldName: null,
            errLevel: 4
        }
    },
    AD_Text: {
        ['多余制作']: {
            qcDesc: null,
            errContent: 1,
            errorType: 1,
            fieldName: null,
            errLevel: 2
        },
        ['遗漏制作']: {
            qcDesc: null,
            errContent: 1,
            errorType: 2,
            fieldName: null,
            errLevel: 2
        },
        ['与点云纵向相对精度>30cm']: {
            qcDesc: null,
            errContent: 1,
            errorType: 3,
            fieldName: null,
            errLevel: 2
        },
        ['与点云纵向相对精度<=30cm，但不规则']: {
            qcDesc: null,
            errContent: 1,
            errorType: 3,
            fieldName: null,
            errLevel: 3
        },
        ['与点云横向相对精度>20cm']: {
            qcDesc: null,
            errContent: 1,
            errorType: 3,
            fieldName: null,
            errLevel: 2
        },
        ['与点云横向相对精度<=20cm，但不规则']: {
            qcDesc: null,
            errContent: 1,
            errorType: 3,
            fieldName: null,
            errLevel: 3
        },
        ['与点云高程相对精度>30cm']: {
            qcDesc: null,
            errContent: 1,
            errorType: 3,
            fieldName: null,
            errLevel: 2
        },
        ['与点云高程相对精度<=30cm，但不规则']: {
            qcDesc: null,
            errContent: 1,
            errorType: 3,
            fieldName: null,
            errLevel: 3
        },
        ['类型错误']: {
            qcDesc: null,
            errContent: 2,
            errorType: 3,
            fieldName: 'CONT_TYPE',
            errLevel: 2
        },
        ['限速值多做']: {
            qcDesc: null,
            errContent: 2,
            errorType: 1,
            fieldName: 'SPEED',
            errLevel: 2
        },
        ['限速值漏做']: {
            qcDesc: null,
            errContent: 2,
            errorType: 2,
            fieldName: 'SPEED',
            errLevel: 2
        },
        ['限速值错误']: {
            qcDesc: null,
            errContent: 2,
            errorType: 3,
            fieldName: 'SPEED',
            errLevel: 2
        },
        ['时间限制描述多做']: {
            qcDesc: null,
            errContent: 2,
            errorType: 1,
            fieldName: 'TIMEDOM',
            errLevel: 2
        },
        ['时间限制描述漏做']: {
            qcDesc: null,
            errContent: 2,
            errorType: 2,
            fieldName: 'TIMEDOM',
            errLevel: 2
        },
        ['时间限制描述错误']: {
            qcDesc: null,
            errContent: 2,
            errorType: 3,
            fieldName: 'TIMEDOM',
            errLevel: 2
        },
        ['车辆限制描述多做']: {
            qcDesc: null,
            errContent: 2,
            errorType: 1,
            fieldName: 'VEH_LMT',
            errLevel: 2
        },
        ['车辆限制描述漏做']: {
            qcDesc: null,
            errContent: 2,
            errorType: 2,
            fieldName: 'VEH_LMT',
            errLevel: 2
        },
        ['车辆限制描述错误']: {
            qcDesc: null,
            errContent: 2,
            errorType: 3,
            fieldName: 'VEH_LMT',
            errLevel: 2
        },
        ['其他文本描述多做']: {
            qcDesc: null,
            errContent: 2,
            errorType: 1,
            fieldName: 'TEXT',
            errLevel: 2
        },
        ['其他文本描述漏做']: {
            qcDesc: null,
            errContent: 2,
            errorType: 2,
            fieldName: 'TEXT',
            errLevel: 2
        },
        ['其他文本描述错误']: {
            qcDesc: null,
            errContent: 2,
            errorType: 3,
            fieldName: 'TEXT',
            errLevel: 2
        },
        ['其它']: {
            qcDesc: null,
            errContent: 1,
            errorType: 3,
            fieldName: null,
            errLevel: 4
        }
    },
    AD_Road: {
        ['多余制作']: {
            qcDesc: null,
            errContent: 1,
            errorType: 1,
            fieldName: null,
            errLevel: 1
        },
        ['挂接/连接错误']: {
            qcDesc: null,
            errContent: 1,
            errorType: 3,
            fieldName: null,
            errLevel: 1
        },
        ['遗漏制作']: {
            qcDesc: null,
            errContent: 1,
            errorType: 2,
            fieldName: null,
            errLevel: 1
        },
        ['几何偏差>1m']: {
            qcDesc: null,
            errContent: 1,
            errorType: 3,
            fieldName: null,
            errLevel: 2
        },
        ['几何偏差<=1m，但与最左车道右边线不重合或几何不平滑']: {
            qcDesc: null,
            errContent: 1,
            errorType: 3,
            fieldName: null,
            errLevel: 3
        },
        ['参考线类型错误']: {
            qcDesc: null,
            errContent: 2,
            errorType: 3,
            fieldName: 'TYPE',
            errLevel: 2
        },
        ['道路等级错误']: {
            qcDesc: null,
            errContent: 2,
            errorType: 3,
            fieldName: 'RD_CLASS',
            errLevel: 2
        },
        ['交叉路口标识错误']: {
            qcDesc: null,
            errContent: 2,
            errorType: 3,
            fieldName: 'CROSSING',
            errLevel: 1
        },
        ['道路形态错误']: {
            qcDesc: null,
            errContent: 2,
            errorType: 3,
            fieldName: 'RD_FORM',
            errLevel: 1
        },
        ['道路通行状态错误']: {
            qcDesc: null,
            errContent: 2,
            errorType: 3,
            fieldName: 'RD_STATUS',
            errLevel: 1
        },
        ['道路通行方向错误']: {
            qcDesc: null,
            errContent: 2,
            errorType: 3,
            fieldName: 'DIRECTION',
            errLevel: 1
        },
        ['连通关系多做']: {
            qcDesc: null,
            errContent: 3,
            errorType: 1,
            fieldName: 'REL_ID',
            errLevel: 1
        },
        ['连通关系漏做']: {
            qcDesc: null,
            errContent: 3,
            errorType: 2,
            fieldName: 'REL_ID',
            errLevel: 1
        },
        ['道路连接关系限制类型多余制作']: {
            qcDesc: null,
            errContent: 3,
            errorType: 1,
            fieldName: 'RS_TYPE',
            errLevel: 1
        },
        ['道路连接关系限制类型遗漏制作']: {
            qcDesc: null,
            errContent: 3,
            errorType: 2,
            fieldName: 'RS_TYPE',
            errLevel: 1
        },
        ['道路连接关系限制时间描述多余制作']: {
            qcDesc: null,
            errContent: 3,
            errorType: 1,
            fieldName: 'TIMEDOM',
            errLevel: 1
        },
        ['道路连接关系限制时间描述遗漏制作']: {
            qcDesc: null,
            errContent: 3,
            errorType: 2,
            fieldName: 'TIMEDOM',
            errLevel: 1
        },
        ['道路连接关系限制时间描述制作错误']: {
            qcDesc: null,
            errContent: 3,
            errorType: 3,
            fieldName: 'TIMEDOM',
            errLevel: 1
        },
        ['其它']: {
            qcDesc: null,
            errContent: 1,
            errorType: 3,
            fieldName: null,
            errLevel: 4
        }
    },
    AD_TrafficSign: {
        ['多余制作']: {
            qcDesc: null,
            errContent: 1,
            errorType: 1,
            fieldName: null,
            errLevel: 1
        },
        ['遗漏制作']: {
            qcDesc: null,
            errContent: 1,
            errorType: 2,
            fieldName: null,
            errLevel: 1
        },
        ['与点云纵向相对精度>30cm']: {
            qcDesc: null,
            errContent: 1,
            errorType: 3,
            fieldName: null,
            errLevel: 2
        },
        ['与点云纵向相对精度<=30cm，但不规则']: {
            qcDesc: null,
            errContent: 1,
            errorType: 3,
            fieldName: null,
            errLevel: 3
        },
        ['与点云横向相对精度>20cm']: {
            qcDesc: null,
            errContent: 1,
            errorType: 3,
            fieldName: null,
            errLevel: 1
        },
        ['与点云横向相对精度<=20cm，但不规则']: {
            qcDesc: null,
            errContent: 1,
            errorType: 3,
            fieldName: null,
            errLevel: 3
        },
        ['与点云高程相对精度>30cm']: {
            qcDesc: null,
            errContent: 1,
            errorType: 3,
            fieldName: null,
            errLevel: 2
        },
        ['与点云高程相对精度<=30cm，但不规则']: {
            qcDesc: null,
            errContent: 1,
            errorType: 3,
            fieldName: null,
            errLevel: 3
        },
        ['时间描述错误']: {
            qcDesc: null,
            errContent: 2,
            errorType: 3,
            fieldName: 'TIMEDOM',
            errLevel: 2
        },
        ['样式错误']: {
            qcDesc: null,
            errContent: 2,
            errorType: 3,
            fieldName: 'SIGN_STYLE',
            errLevel: 2
        },
        ['类型错误']: {
            qcDesc: null,
            errContent: 2,
            errorType: 3,
            fieldName: 'SIGN_TYPE',
            errLevel: 2
        },
        ['语义类型错误']: {
            qcDesc: null,
            errContent: 2,
            errorType: 3,
            fieldName: 'CONT_TYPE',
            errLevel: 2
        },
        ['语义内容错误']: {
            qcDesc: null,
            errContent: 2,
            errorType: 3,
            fieldName: 'CONT_VALUE',
            errLevel: 1
        },
        ['与车道中心线关联多做']: {
            qcDesc: null,
            errContent: 3,
            errorType: 1,
            fieldName: 'LANE_ID',
            errLevel: 2
        },
        ['与车道中心线关联漏做']: {
            qcDesc: null,
            errContent: 3,
            errorType: 2,
            fieldName: 'LANE_ID',
            errLevel: 2
        },
        ['其它']: {
            qcDesc: null,
            errContent: 1,
            errorType: 3,
            fieldName: null,
            errLevel: 4
        }
    },
    AD_TrafficLight: {
        ['多余制作']: {
            qcDesc: null,
            errContent: 1,
            errorType: 1,
            fieldName: null,
            errLevel: 1
        },
        ['遗漏制作']: {
            qcDesc: null,
            errContent: 1,
            errorType: 2,
            fieldName: null,
            errLevel: 1
        },
        ['与点云纵向相对精度>30cm']: {
            qcDesc: null,
            errContent: 1,
            errorType: 3,
            fieldName: null,
            errLevel: 2
        },
        ['与点云纵向相对精度<=30cm，但不规则']: {
            qcDesc: null,
            errContent: 1,
            errorType: 3,
            fieldName: null,
            errLevel: 3
        },
        ['与点云横向相对精度>20cm']: {
            qcDesc: null,
            errContent: 1,
            errorType: 3,
            fieldName: null,
            errLevel: 1
        },
        ['与点云横向相对精度<=20cm，但不规则']: {
            qcDesc: null,
            errContent: 1,
            errorType: 3,
            fieldName: null,
            errLevel: 3
        },
        ['与点云高程相对精度>30cm']: {
            qcDesc: null,
            errContent: 1,
            errorType: 3,
            fieldName: null,
            errLevel: 2
        },
        ['与点云高程相对精度<=30cm，但不规则']: {
            qcDesc: null,
            errContent: 1,
            errorType: 3,
            fieldName: null,
            errLevel: 3
        },
        ['与车道中心线关联多做']: {
            qcDesc: null,
            errContent: 3,
            errorType: 1,
            fieldName: 'LANE_ID',
            errLevel: 1
        },
        ['与车道中心线关联漏做']: {
            qcDesc: null,
            errContent: 3,
            errorType: 2,
            fieldName: 'LANE_ID',
            errLevel: 1
        },
        ['其它']: {
            qcDesc: null,
            errContent: 1,
            errorType: 3,
            fieldName: null,
            errLevel: 4
        }
    },
    AD_RS_Barrier: {
        ['多余制作']: {
            qcDesc: null,
            errContent: 1,
            errorType: 1,
            fieldName: null,
            errLevel: 1
        },
        ['遗漏制作']: {
            qcDesc: null,
            errContent: 1,
            errorType: 2,
            fieldName: null,
            errLevel: 2
        },
        ['与点云横向相对精度>20cm']: {
            qcDesc: null,
            errContent: 1,
            errorType: 3,
            fieldName: null,
            errLevel: 2
        },
        ['与点云横向相对精度<=20cm，但不规则']: {
            qcDesc: null,
            errContent: 1,
            errorType: 3,
            fieldName: null,
            errLevel: 3
        },
        ['与点云纵向相对精度>30cm']: {
            qcDesc: null,
            errContent: 1,
            errorType: 3,
            fieldName: null,
            errLevel: 2
        },
        ['与点云纵向相对精度<=30cm，但不规则']: {
            qcDesc: null,
            errContent: 1,
            errorType: 3,
            fieldName: null,
            errLevel: 3
        },
        ['与点云高程相对精度>30cm']: {
            qcDesc: null,
            errContent: 1,
            errorType: 3,
            fieldName: null,
            errLevel: 2
        },
        ['与点云高程相对精度<=30cm，但不规则']: {
            qcDesc: null,
            errContent: 1,
            errorType: 3,
            fieldName: null,
            errLevel: 3
        },
        ['类型错误']: {
            qcDesc: null,
            errContent: 2,
            errorType: 3,
            fieldName: 'TYPE',
            errLevel: 2
        },
        ['材质错误']: {
            qcDesc: null,
            errContent: 2,
            errorType: 3,
            fieldName: 'MATERIAL',
            errLevel: 2
        },
        ['其它']: {
            qcDesc: null,
            errContent: 1,
            errorType: 3,
            fieldName: null,
            errLevel: 4
        }
    },
    AD_Pole_Geo: {
        ['多余制作']: {
            qcDesc: null,
            errContent: 1,
            errorType: 1,
            fieldName: null,
            errLevel: 1
        },
        ['遗漏制作']: {
            qcDesc: null,
            errContent: 1,
            errorType: 2,
            fieldName: null,
            errLevel: 1
        },
        ['与点云纵向相对精度>30cm']: {
            qcDesc: null,
            errContent: 1,
            errorType: 3,
            fieldName: null,
            errLevel: 2
        },
        ['与点云纵向相对精度<=30cm，但不规则']: {
            qcDesc: null,
            errContent: 1,
            errorType: 3,
            fieldName: null,
            errLevel: 3
        },
        ['与点云横向相对精度>20cm']: {
            qcDesc: null,
            errContent: 1,
            errorType: 3,
            fieldName: null,
            errLevel: 1
        },
        ['与点云横向相对精度<=20cm，但不规则']: {
            qcDesc: null,
            errContent: 1,
            errorType: 3,
            fieldName: null,
            errLevel: 3
        },
        ['与点云高程相对精度>30cm']: {
            qcDesc: null,
            errContent: 1,
            errorType: 3,
            fieldName: null,
            errLevel: 2
        },
        ['与点云高程相对精度<=30cm，但不规则']: {
            qcDesc: null,
            errContent: 1,
            errorType: 3,
            fieldName: null,
            errLevel: 3
        },
        ['其它']: {
            qcDesc: null,
            errContent: 1,
            errorType: 3,
            fieldName: null,
            errLevel: 4
        }
    }
};

const FILE_NAME_OPTIONS = [
    { value: 'AD_Road', label: '道路参考线' },
    { value: 'AD_LaneDivider', label: '车道线' },
    { value: 'AD_Lane', label: '车道中心线' },
    { value: 'AD_LaneAttrPoint', label: '车道属性变化点' },
    { value: 'AD_Arrow', label: '地面导向箭头' },
    { value: 'AD_StopLocation', label: '停止位置' },
    { value: 'AD_Text', label: '地面文字符号' },
    { value: 'AD_TrafficSign', label: '交通标志牌' },
    { value: 'AD_TrafficLight', label: '交通信号灯' },
    { value: 'AD_RS_Barrier', label: '隔离带、护栏' },
    { value: 'AD_LaneDivider_Plg', label: '几何层：车道线面要素' },
    { value: 'AD_StopLocation_Geo', label: '几何层：停止位置' },
    { value: 'AD_LaneMark_Geo', label: '几何层：路面车道标记' },
    { value: 'AD_Pole_Geo', label: '几何层：杆状物' }
];

const ERROR_TYPE_OPTIONS = [
    { value: 1, label: '多做' },
    { value: 2, label: '漏做' },
    { value: 3, label: '做错' }, //默认
    { value: 4, label: '其他' }
];

const FIX_STATUS_OPTIONS = [
    { value: 1, label: '待修正' }, //默认
    { value: 2, label: '无需修正' },
    { value: 3, label: '已修正' }
];

const QC_STATUS_OPTIONS = [
    { value: 1, label: '待修正' }, //默认
    { value: 2, label: '无需修正' },
    { value: 3, label: '已修正' }
];

const MS_QC_LINK_OPTIONS = [
    { value: 1, label: '人工识别质检' } //默认
];

const MB_QC_LINK_OPTIONS = [
    { value: 2, label: '人工构建质检' }, //默认
    { value: 3, label: '验收' }
];

const QC_LINK_OPTIONS = [
    { value: 1, label: '人工识别质检' },
    { value: 2, label: '人工构建质检' },
    { value: 3, label: '验收' }
];

const FIELD_NAME_MAP = {
    AD_Road: [
        { value: 'TYPE', label: '道路参考线类型' },
        { value: 'RD_CLASS', label: '道路等级' },
        { value: 'CROSSING', label: '交叉口标识' },
        { value: 'RD_STATUS', label: '道路通行状态' },
        { value: 'RD_FORM', label: '道路形态' },
        { value: 'DIRECTION', label: '道路通行方向' },
        { value: 'REL_ID', label: '道路参考线连通关系' },
        { value: 'RS_TYPE', label: '参考线连接关系限制类型' },
        { value: 'TIMEDOM', label: '参考线连接关系限制时间描述' }
    ],
    AD_LaneDivider: [
        { value: 'TYPE', label: '车道线类型' },
        { value: 'RD_LINE', label: '道路参考线标识' },
        { value: 'SHARE_LINE', label: '共用车道线标识' },
        { value: 'RD_EDGE', label: '道路边界标识' },
        { value: 'DIRECTION', label: '车道通行方向' },
        { value: 'LANE_STATUS', label: '车道通行状态' },
        { value: 'LANE_TYPE', label: '车道类型' },
        { value: 'LANE_NO', label: '车道编号' },
        { value: 'WIDTH', label: '车道线宽度' },
        { value: 'COLOR', label: '车道线颜色' },
        { value: 'RD_FORM', label: '道路形态' }
    ],
    AD_Lane: [
        { value: 'ROAD_ID', label: '关联道路参考线' },
        { value: 'L_LDIV_ID', label: '左侧车道线' },
        { value: 'R_LDIV_ID', label: '右侧车道线' },
        { value: 'TYPE', label: '车道类型' },
        { value: 'LANE_NO', label: '车道编号' },
        { value: 'DIRECTION', label: '车道通行方向' },
        { value: 'STATUS', label: '车道通行状态' },
        { value: 'REL_ID', label: '车道中心线连接关系' },
        { value: 'RS_TYPE', label: '车道中心线限制类型' },
        { value: 'RS_VALUE', label: '车道中心线限制取值' },
        { value: 'TIMEDOM', label: '车道中心线限制时间描述' },
        { value: 'RS_TYPE', label: '车道中心线连接关系限制类型' },
        { value: 'TIMEDOM', label: '车道中心线连接关系限制时间描述' }
    ],
    AD_LaneAttrPoint: [
        { value: 'TYPE', label: '属性变化点类型' },
        { value: 'ROAD_ID', label: '属性变化点关联参考线' }
    ],
    AD_Arrow: [{ value: 'ARR_DIRECT', label: '箭头方向' }],
    AD_StopLocation: [
        { value: 'TYPE', label: '停止位置类型' },
        { value: 'LANE_ID', label: '停止位置关联中心线' }
    ],
    AD_Text: [
        { value: 'CONT_TYPE', label: '地面文字符号语义类型' },
        { value: 'SPEED', label: '限速值' },
        { value: 'TIMEDOM', label: '时间限制描述' },
        { value: 'VEH_LMT', label: '车辆限制描述' },
        { value: 'TEXT ', label: '其他文本描述' }
    ],
    AD_TrafficSign: [
        { value: 'SIGN_STYLE', label: '交通牌样式' },
        { value: 'SIGN_TYPE', label: '交通牌类型' },
        { value: 'CONT_TYPE', label: '交通牌语义类型' },
        { value: 'CONT_VALUE', label: '交通牌语义内容' },
        { value: 'TIMEDOM', label: '交通牌限制时间' },
        { value: 'LANE_ID', label: '交通牌关联中心线' }
    ],
    AD_TrafficLight: [
        { value: 'LIGHT_ID', label: '交通灯用户编号' },
        { value: 'LANE_ID', label: '交通灯关联中心线' }
    ],
    AD_RS_Barrier: [
        { value: 'TYPE', label: '隔离带护栏类型' },
        { value: 'MATERIAL', label: '隔离带护栏材质' }
    ],
    AD_LaneDivider_Plg: [{ value: 'FEAT_TYPE', label: '虚线框类型' }],
    AD_StopLocation_Geo: [{ value: 'FEAT_TYPE', label: '停止位置类型' }],
    AD_LaneMark_Geo: [
        { value: 'FEAT_TYPE', label: '面状标识物类型' },
        { value: 'LANE_ID', label: '面状标识物关联中心线' }
    ],
    AD_Pole_Geo: [{ value: 'OBJ_ID', label: '杆状物用户编号' }]
};

const ERROR_CONTENT_OPTIONS = [
    { value: 1, label: '几何' }, //默认
    { value: 2, label: '属性' },
    { value: 3, label: '关系' },
    { value: 4, label: '其他' }
];

const ERROR_LEVEL_OPTIONS = [
    { value: 1, label: 'S' }, //默认
    { value: 2, label: 'A' },
    { value: 3, label: 'B' },
    { value: 4, label: '其他' }
];

// 更新配置方法：将生成json字符串，复制到json文档里（单引号转成双引号），即可用于设置
export const QC_MARKER_CONFIG = {
    ERROR_DESC_MAP,
    ERROR_DESC_RESET_FIELD_MAP,
    FILE_NAME_OPTIONS,
    ERROR_TYPE_OPTIONS,
    FIX_STATUS_OPTIONS,
    QC_STATUS_OPTIONS,
    MS_QC_LINK_OPTIONS,
    MB_QC_LINK_OPTIONS,
    QC_LINK_OPTIONS,
    FIELD_NAME_MAP,
    ERROR_CONTENT_OPTIONS,
    ERROR_LEVEL_OPTIONS
};
// console.log('QC_MARKER_CONFIG', JSON.stringify(QC_MARKER_CONFIG));

export const ATTR_FORM_FIELD_MAP = () => {
    return {
        fixStatus: {
            label: '作业查看状态',
            name: 'fixStatus',
            type: 'Select',
            initialValue: null,
            editable: false,
            rules: {
                required: {
                    value: true,
                    message: '作业查看状态必填'
                }
            },
            option: {
                data: getConfig('FIX_STATUS_OPTIONS') || FIX_STATUS_OPTIONS,
                label: 'label',
                value: 'value'
            }
        },
        qcStatus: {
            label: '质检查看状态',
            name: 'qcStatus',
            type: 'Select',
            initialValue: null,
            editable: true,
            rules: {
                required: {
                    value: true,
                    message: '质检查看状态必填'
                }
            },
            option: {
                data: getConfig('QC_STATUS_OPTIONS') || QC_STATUS_OPTIONS,
                label: 'label',
                value: 'value'
            }
        },
        qcLink: {
            label: '打标环节',
            name: 'qcLink',
            type: 'Select',
            initialValue: null,
            editable: true,
            className: 'bottom-border',
            rules: {
                required: {
                    value: true,
                    message: '打标环节必填'
                }
            }
        },
        fileName: {
            label: '图层',
            name: 'fileName',
            type: 'Select',
            initialValue: null,
            editable: false,
            tool: ChooseErrorFeature,
            rules: {
                required: {
                    value: true,
                    message: '质检查看状态必填'
                }
            },
            option: {
                data: getConfig('FILE_NAME_OPTIONS') || FILE_NAME_OPTIONS,
                label: 'label',
                value: 'value'
            },
            resetField: {
                default: {
                    featId: null,
                    errorDesc: null,
                    errContent: null,
                    errorType: null,
                    fieldName: null,
                    errLevel: null,
                    editDesc: null
                }
            },
            layout: {
                labelCol: {
                    xs: { span: 8 },
                    sm: { span: 8 }
                },
                wrapperCol: {
                    xs: { span: 13 },
                    sm: { span: 13 }
                }
            }
        },
        featId: {
            label: '要素ID',
            name: 'featId',
            type: 'InputNumber',
            initialValue: null,
            editable: false,
            rules: {
                required: {
                    fieldName: 'errorType',
                    fieldValue: [1, 3],
                    message: '要素ID必填'
                }
            }
        },
        errorDesc: {
            label: '错误描述',
            name: 'errorDesc',
            type: 'Select',
            initialValue: null,
            editable: false,
            className: 'select-show-full-content',
            option: {
                data: getConfig('ERROR_DESC_MAP') || ERROR_DESC_MAP,
                secondKey: 'fileName',
                label: 'label',
                value: 'value'
            },
            rules: {
                required: {
                    value: true,
                    message: '错误描述必填'
                }
            },
            resetFieldByField: {
                data: getConfig('ERROR_DESC_RESET_FIELD_MAP') || ERROR_DESC_RESET_FIELD_MAP,
                dependFieldNames: ['fileName', 'errorDesc']
            }
        },
        errContent: {
            label: '错误内容',
            name: 'errContent',
            type: 'Select',
            initialValue: null,
            editable: false,
            editableByField: {
                fieldName: 'errorDesc',
                fieldValue: '其它'
            },
            option: {
                data: getConfig('ERROR_CONTENT_OPTIONS') || ERROR_CONTENT_OPTIONS,
                label: 'label',
                value: 'value'
            },
            resetField: {
                default:{
                    fieldName: null
                }
            }
        },
        errorType: {
            label: '错误类型',
            name: 'errorType',
            type: 'Select',
            initialValue: null,
            editable: false,
            editableByField: {
                fieldName: 'errorDesc',
                fieldValue: '其它'
            },
            option: {
                data: getConfig('ERROR_TYPE_OPTIONS') || ERROR_TYPE_OPTIONS,
                label: 'label',
                value: 'value'
            }
        },
        fieldName: {
            label: '字段名称',
            name: 'fieldName',
            type: 'Select',
            editable: false,
            editableByField: [
                {
                    fieldName: 'errorDesc',
                    fieldValue: '其它'
                },
                {
                    fieldName: 'errContent',
                    fieldValue: [2, 3]
                }
            ],
            rules: {
                required: {
                    fieldName: 'errContent',
                    fieldValue: [2, 3],
                    message: '字段名称必填'
                }
            },
            option: {
                data: getConfig('FIELD_NAME_MAP') || FIELD_NAME_MAP,
                secondKey: 'fileName',
                label: 'label',
                value: 'value'
            }
        },
        errLevel: {
            label: '错误等级',
            name: 'errLevel',
            type: 'Select',
            initialValue: null,
            editable: false,
            editableByField: {
                fieldName: 'errorDesc',
                fieldValue: '其它'
            },
            option: {
                data: getConfig('ERROR_LEVEL_OPTIONS') || ERROR_LEVEL_OPTIONS,
                label: 'label',
                value: 'value'
            }
        },
        qcDesc: {
            label: '质检说明',
            name: 'qcDesc',
            type: 'TextArea',
            initialValue: null,
            editable: false,
            rules: {
                required: {
                    fieldName: 'errorDesc',
                    fieldValue: '其它',
                    message: '质检说明必填'
                }
            }
        },
        editDesc: {
            label: '作业说明',
            name: 'editDesc',
            type: 'TextArea',
            initialValue: null,
            editable: false
        }
    };
};

export const QC_MARKER_FORM_CONFIG = () => {
    return {
        //质检员创建标注的表单配置-人工识别后质检
        MS_QC_CREATE_CONFIG: [
            {
                name: 'qcLink',
                initialValue: 1,
                editable: false,
                option: {
                    data: getConfig('MS_QC_LINK_OPTIONS') || MS_QC_LINK_OPTIONS,
                    label: 'label',
                    value: 'value'
                }
            },
            { name: 'fileName', editable: true },
            { name: 'featId', editable: true },
            { name: 'errorDesc', editable: true },
            { name: 'errContent', editable: true },
            { name: 'errorType', editable: true },
            { name: 'fieldName', editable: true },
            { name: 'errLevel', editable: false },
            { name: 'qcDesc', editable: true }
        ],
        //质检员创建标注的表单配置-人工构建后质检
        MB_QC_CREATE_CONFIG: [
            {
                name: 'qcLink',
                initialValue: 2,
                editable: true,
                option: {
                    data: getConfig('MB_QC_LINK_OPTIONS') || MB_QC_LINK_OPTIONS,
                    label: 'label',
                    value: 'value'
                }
            },
            { name: 'fileName', editable: true },
            { name: 'featId', editable: true },
            { name: 'errorDesc', editable: true },
            { name: 'errContent', editable: true },
            { name: 'errorType', editable: true },
            { name: 'fieldName', editable: true },
            { name: 'errLevel', editable: false },
            { name: 'qcDesc', editable: true }
        ],
        //质检员首次查看的表单配置-人工识别后质检
        MS_QC_FIRST_VISITE_CONFIG: [
            { name: 'fixStatus', editable: false },
            { name: 'qcStatus', editable: false },
            {
                name: 'qcLink',
                editable: false,
                option: {
                    data: getConfig('MS_QC_LINK_OPTIONS') || MS_QC_LINK_OPTIONS,
                    label: 'label',
                    value: 'value'
                }
            },
            { name: 'fileName', editable: false },
            { name: 'featId', editable: false },
            { name: 'errorDesc', editable: false },
            { name: 'errContent', editable: false },
            { name: 'errorType', editable: false },
            { name: 'fieldName', editable: false },
            { name: 'errLevel', editable: false },
            { name: 'qcDesc', editable: false },
            { name: 'editDesc', editable: false }
        ],
        //质检员首次查看的表单配置-人工构建后质检
        MB_QC_FIRST_VISITE_CONFIG: [
            { name: 'fixStatus', editable: false },
            { name: 'qcStatus', editable: false },
            {
                name: 'qcLink',
                editable: true,
                option: {
                    data: getConfig('MB_QC_LINK_OPTIONS') || MB_QC_LINK_OPTIONS,
                    label: 'label',
                    value: 'value'
                }
            },
            { name: 'fileName', editable: false },
            { name: 'featId', editable: false },
            { name: 'errorDesc', editable: false },
            { name: 'errContent', editable: false },
            { name: 'errorType', editable: false },
            { name: 'fieldName', editable: false },
            { name: 'errLevel', editable: false },
            { name: 'qcDesc', editable: false },
            { name: 'editDesc', editable: false }
        ],
        //质检员首次修改标注的表单配置-人工识别后质检
        MS_QC_FIRST_MOD_CONFIG: [
            { name: 'fixStatus', editable: false },
            { name: 'qcStatus', editable: false },
            {
                name: 'qcLink',
                editable: false,
                option: {
                    data: getConfig('MS_QC_LINK_OPTIONS') || MS_QC_LINK_OPTIONS,
                    label: 'label',
                    value: 'value'
                }
            },
            { name: 'fileName', editable: true },
            { name: 'featId', editable: true },
            { name: 'errorDesc', editable: true },
            { name: 'errContent', editable: true },
            { name: 'errorType', editable: true },
            { name: 'fieldName', editable: true },
            { name: 'errLevel', editable: false },
            { name: 'qcDesc', editable: true },
            { name: 'editDesc', editable: false }
        ],
        //质检员首次修改标注的表单配置-人工构建后质检
        MB_QC_FIRST_MOD_CONFIG: [
            { name: 'fixStatus', editable: false },
            { name: 'qcStatus', editable: false },
            {
                name: 'qcLink',
                editable: true,
                option: {
                    data: getConfig('MB_QC_LINK_OPTIONS') || MB_QC_LINK_OPTIONS,
                    label: 'label',
                    value: 'value'
                }
            },
            { name: 'fileName', editable: true },
            { name: 'featId', editable: true },
            { name: 'errorDesc', editable: true },
            { name: 'errContent', editable: true },
            { name: 'errorType', editable: true },
            { name: 'fieldName', editable: true },
            { name: 'errLevel', editable: false },
            { name: 'qcDesc', editable: true },
            { name: 'editDesc', editable: false }
        ],
        //质检员非首次查看的表单配置-人工识别后质检
        MS_QC_NOT_FIRST_VISITE_CONFIG: [
            { name: 'fixStatus', editable: false },
            {
                name: 'qcStatus',
                editable: true,
                option: {
                    data_2: [
                        { value: 1, label: '待修正' },
                        { value: 2, label: '无需修正' }
                    ], //data_[fixStatus value]
                    data_3: [
                        { value: 1, label: '待修正' },
                        { value: 3, label: '已修正' }
                    ], //data_[fixStatus value]
                    fieldName: 'fixStatus',
                    label: 'label',
                    value: 'value'
                }
            },
            {
                name: 'qcLink',
                editable: false,
                option: {
                    data: getConfig('MS_QC_LINK_OPTIONS') || MS_QC_LINK_OPTIONS,
                    label: 'label',
                    value: 'value'
                }
            },
            { name: 'fileName', editable: false },
            { name: 'featId', editable: false },
            { name: 'errorDesc', editable: false },
            { name: 'errContent', editable: false },
            { name: 'errorType', editable: false },
            { name: 'fieldName', editable: false },
            { name: 'errLevel', editable: false },
            { name: 'qcDesc', editable: false },
            { name: 'editDesc', editable: false }
        ],
        //质检员非首次查看的表单配置-人工构建后质检
        MB_QC_NOT_FIRST_VISITE_CONFIG: [
            { name: 'fixStatus', editable: false },
            {
                name: 'qcStatus',
                editable: true,
                option: {
                    data_2: [
                        { value: 1, label: '待修正' },
                        { value: 2, label: '无需修正' }
                    ], //data_[fixStatus value]
                    data_3: [
                        { value: 1, label: '待修正' },
                        { value: 3, label: '已修正' }
                    ], //data_[fixStatus value]
                    fieldName: 'fixStatus',
                    label: 'label',
                    value: 'value'
                }
            },
            {
                name: 'qcLink',
                editable: true,
                option: {
                    data: getConfig('MB_QC_LINK_OPTIONS') || MB_QC_LINK_OPTIONS,
                    label: 'label',
                    value: 'value'
                }
            },
            { name: 'fileName', editable: false },
            { name: 'featId', editable: false },
            { name: 'errorDesc', editable: false },
            { name: 'errContent', editable: false },
            { name: 'errorType', editable: false },
            { name: 'fieldName', editable: false },
            { name: 'errLevel', editable: false },
            { name: 'qcDesc', editable: false },
            { name: 'editDesc', editable: false }
        ],
        //作业员查看标注的表单配置
        FIX_VISITE_CONFIG: [
            {
                name: 'fixStatus',
                editable: true,
                editableByField: {
                    fieldName: 'qcStatus',
                    fieldValue: 1
                }
            },
            { name: 'qcStatus', editable: false, className: 'bottom-border' },
            { name: 'fileName', editable: false },
            { name: 'featId', editable: false },
            { name: 'errorDesc', editable: false },
            { name: 'errContent', editable: false },
            { name: 'errorType', editable: false },
            { name: 'fieldName', editable: false },
            { name: 'errLevel', editable: false },
            { name: 'qcDesc', editable: false },
            { name: 'editDesc', editable: false }
        ],
        //作业员修改标注的表单配置
        FIX_MOD_CONFIG: [
            {
                name: 'fixStatus',
                editable: true,
                editableByField: {
                    fieldName: 'qcStatus',
                    fieldValue: 1
                }
            },
            { name: 'qcStatus', editable: false, className: 'bottom-border' },
            { name: 'fileName', editable: false },
            { name: 'featId', editable: false },
            { name: 'errorDesc', editable: false },
            { name: 'errContent', editable: false },
            { name: 'errorType', editable: false },
            { name: 'fieldName', editable: false },
            { name: 'errLevel', editable: false },
            { name: 'qcDesc', editable: false },
            { name: 'editDesc', editable: true }
        ],
        //默认配置，只能查看，不能修改
        QC_READ_ONLEY_CONFIG: [
            { name: 'fixStatus', editable: false },
            { name: 'qcStatus', editable: false },
            { name: 'qcLink', editable: false },
            { name: 'fileName', editable: false },
            { name: 'featId', editable: false },
            { name: 'errorDesc', editable: false },
            { name: 'errContent', editable: false },
            { name: 'errorType', editable: false },
            { name: 'fieldName', editable: false },
            { name: 'errLevel', editable: false },
            { name: 'qcDesc', editable: false },
            { name: 'editDesc', editable: false }
        ]
    };
};

export const MARKER_TABLE_COLUMNS = () => {
    return [
        {
            title: '序号',
            dataIndex: 'index',
            key: 'index',
            isSorter: true,
            width: 50
        },
        {
            title: '作业查看状态',
            dataIndex: 'fixStatus',
            key: 'fixStatus',
            isFilter: true,
            isSorter: true,
            width: 120,
            describe: {
                data: getConfig('FIX_STATUS_OPTIONS') || FIX_STATUS_OPTIONS,
                label: 'label',
                value: 'value'
            },
            styleByValue: {
                fieldValue: 1,
                className: 'red-text'
            }
        },
        {
            title: '质检查看状态',
            dataIndex: 'qcStatus',
            key: 'qcStatus',
            isFilter: true,
            isSorter: true,
            width: 120,
            describe: {
                data: getConfig('QC_STATUS_OPTIONS') || QC_STATUS_OPTIONS,
                label: 'label',
                value: 'value'
            },
            styleByValue: {
                fieldValue: 1,
                className: 'red-text'
            }
        },
        {
            title: '图层',
            dataIndex: 'fileName',
            key: 'fileName',
            isFilter: true,
            isSorter: true,
            width: 75,
            describe: {
                data: getConfig('FILE_NAME_OPTIONS') || FILE_NAME_OPTIONS,
                label: 'label',
                value: 'value'
            }
        },
        {
            title: '要素ID',
            dataIndex: 'featId',
            key: 'featId',
            isSorter: true,
            width: 70
        },
        {
            title: '错误描述',
            dataIndex: 'errorDesc',
            key: 'errorDesc',
            isFilter: true,
            isSorter: true,
            width: 200,
            describe: {
                data: getConfig('ERROR_DESC_MAP') || ERROR_DESC_MAP,
                secondKey: 'fileName',
                label: 'label',
                value: 'value'
            }
        },
        {
            title: '错误内容',
            dataIndex: 'errContent',
            key: 'errContent',
            isFilter: true,
            isSorter: true,
            describe: {
                data: getConfig('ERROR_CONTENT_OPTIONS') || ERROR_CONTENT_OPTIONS,
                label: 'label',
                value: 'value'
            },
            width: 100
        },
        {
            title: '错误类型',
            dataIndex: 'errorType',
            key: 'errorType',
            isFilter: true,
            isSorter: true,
            describe: {
                data: getConfig('ERROR_TYPE_OPTIONS') || ERROR_TYPE_OPTIONS,
                label: 'label',
                value: 'value'
            },
            width: 100
        },
        {
            title: '字段名称',
            dataIndex: 'fieldName',
            key: 'fieldName',
            isFilter: true,
            isSorter: true,
            width: 100,
            describe: {
                data: getConfig('FIELD_NAME_MAP') || FIELD_NAME_MAP,
                secondKey: 'fileName',
                label: 'label',
                value: 'value'
            }
        },
        {
            title: '错误等级',
            dataIndex: 'errLevel',
            key: 'errLevel',
            isFilter: true,
            isSorter: true,
            width: 100,
            describe: {
                data: getConfig('ERROR_LEVEL_OPTIONS') || ERROR_LEVEL_OPTIONS,
                label: 'label',
                value: 'value'
            }
        },
        {
            title: '作业说明',
            dataIndex: 'editDesc',
            key: 'editDesc',
            isSorter: true,
            width: 100
        },
        {
            title: '打标环节',
            dataIndex: 'qcLink',
            key: 'qcLink',
            isFilter: true,
            isSorter: true,
            width: 100,
            describe: {
                data: getConfig('QC_LINK_OPTIONS') || QC_LINK_OPTIONS,
                label: 'label',
                value: 'value'
            }
        }
    ];
};
