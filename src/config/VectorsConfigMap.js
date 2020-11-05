//符号设置
import VectorsConfig from 'src/config/VectorsConfig';
import BoundaryVectorsConfig from 'src/config/BoundaryVectorsConfig';
import WhiteVectorsConfig from 'src/config/WhiteVectorsConfig';
import BoundaryWhiteVectorsConfig from 'src/config/BoundaryWhiteVectorsConfig';
import CheckVectorsConfig from 'src/config/CheckVectorsConfig';
import BoundaryCheckVectorsConfig from 'src/config/BoundaryCheckVectorsConfig';
import dianfuhao from 'src/assets/img/dianfuhao.png';
import dianfuhao1 from 'src/assets/img/dianfuhao1.png';
import dianfuhao2 from 'src/assets/img/dianfuhao2.png';
import dianfuhao3 from 'src/assets/img/dianfuhao3.png';
import dianfuhao4 from 'src/assets/img/dianfuhao4.png';
import dianfuhao5 from 'src/assets/img/dianfuhao5.png';
import dianfuhao6 from 'src/assets/img/dianfuhao6.png';
import dianfuhao7 from 'src/assets/img/dianfuhao7.png';
import dianfuhao8 from 'src/assets/img/dianfuhao8.png';

const DEFINE_VECTOR_CONFIG_MAP = {
    AD_Road: {
        key: 'AD_Road',
        label: '道路参考线',
        checked: false,
        isClassify: true,
        type: 'Line',
        commonStyle: {
            showFields: 'TYPE',
            lineStyle: 'solid',
            color: 'rgb(255,255,255)',
            opacity: 1,
            arrow: true,
            point: true,
            pointEnabledStatus: true,
            arrowEnabledStatus: true,
            pointSize: 0.1
        },
        typeStyle: [
            {
                value: 0,
                label: '未定义',
                showFields: 'TYPE',
                lineStyle: 'solid',
                color: 'rgb(255,255,255)',
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
                color: 'rgb(255,255,255)',
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
                color: 'rgb(255,255,255)',
                opacity: 1,
                arrow: true,
                point: true,
                pointEnabledStatus: true,
                arrowEnabledStatus: true,
                pointSize: 0.1
            }
        ],
        typeStyleMap: {},
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
        checked: false,
        isClassify: true,
        type: 'Line',
        commonStyle: {
            showFields: 'TYPE',
            lineStyle: 'solid',
            color: 'rgb(255,255,255)',
            opacity: 1,
            arrow: true,
            point: true,
            pointEnabledStatus: true,
            arrowEnabledStatus: true,
            pointSize: 0.1
        },
        typeStyle: [
            {
                value: 0,
                label: '未定义',
                showFields: 'TYPE',
                lineStyle: 'solid',
                color: 'rgb(255,255,255)',
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
                lineStyle: 'solid',
                color: 'rgb(255,255,255)',
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
                lineStyle: 'solid',
                color: 'rgb(255,255,255)',
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
                lineStyle: 'solid',
                color: 'rgb(255,255,255)',
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
                lineStyle: 'solid',
                color: 'rgb(255,255,255)',
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
                lineStyle: 'solid',
                color: 'rgb(255,255,255)',
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
                lineStyle: 'solid',
                color: 'rgb(255,255,255)',
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
                lineStyle: 'solid',
                color: 'rgb(255,255,255)',
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
                lineStyle: 'solid',
                color: 'rgb(255,255,255)',
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
                lineStyle: 'solid',
                color: 'rgb(255,255,255)',
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
                lineStyle: 'solid',
                color: 'rgb(255,255,255)',
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
                lineStyle: 'solid',
                color: 'rgb(255,255,255)',
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
                lineStyle: 'solid',
                color: 'rgb(255,255,255)',
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
                lineStyle: 'solid',
                color: 'rgb(255,255,255)',
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
                lineStyle: 'solid',
                color: 'rgb(255,255,255)',
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
                lineStyle: 'solid',
                color: 'rgb(255,255,255)',
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
                lineStyle: 'solid',
                color: 'rgb(255,255,255)',
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
                lineStyle: 'solid',
                color: 'rgb(255,255,255)',
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
                lineStyle: 'solid',
                color: 'rgb(255,255,255)',
                opacity: 1,
                arrow: true,
                point: true,
                pointEnabledStatus: true,
                arrowEnabledStatus: true,
                pointSize: 0.1
            },
            {
                value: 19,
                label: '路口内虚拟车道导线',
                showFields: 'TYPE',
                lineStyle: 'solid',
                color: 'rgb(255,255,255)',
                opacity: 1,
                arrow: true,
                point: true,
                pointEnabledStatus: true,
                arrowEnabledStatus: true,
                pointSize: 0.1
            },
            {
                value: 20,
                label: '其他虚拟车道导线',
                showFields: 'TYPE',
                lineStyle: 'solid',
                color: 'rgb(255,255,255)',
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
                color: 'rgb(255,255,255)',
                opacity: 1,
                arrow: true,
                point: true,
                pointEnabledStatus: true,
                arrowEnabledStatus: true,
                pointSize: 0.1
            }
        ],
        typeStyleMap: {},
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
                key: 'LANESTATUS',
                name: '车道通行状态',
                type: 'AD_LANE_DIVIDER_LANESTATUS',
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
        checked: false,
        isClassify: true,
        type: 'Line',
        commonStyle: {
            showFields: 'TYPE',
            lineStyle: 'solid',
            color: 'rgb(255,255,255)',
            opacity: 1,
            arrow: true,
            point: true,
            pointEnabledStatus: true,
            arrowEnabledStatus: true,
            pointSize: 0.1
        },
        typeStyle: [
            {
                value: 0,
                label: '未定义',
                showFields: 'TYPE',
                lineStyle: 'solid',
                color: 'rgb(255,255,255)',
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
                color: 'rgb(255,255,255)',
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
                lineStyle: 'solid',
                color: 'rgb(255,255,255)',
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
                color: 'rgb(255,255,255)',
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
                color: 'rgb(255,255,255)',
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
                color: 'rgb(255,255,255)',
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
                color: 'rgb(255,255,255)',
                opacity: 1,
                arrow: true,
                point: true,
                pointEnabledStatus: true,
                arrowEnabledStatus: true,
                pointSize: 0.1
            },
            {
                value: 7,
                label: '人行道',
                showFields: 'TYPE',
                lineStyle: 'solid',
                color: 'rgb(255,255,255)',
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
                color: 'rgb(255,255,255)',
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
                color: 'rgb(255,255,255)',
                opacity: 1,
                arrow: true,
                point: true,
                pointEnabledStatus: true,
                arrowEnabledStatus: true,
                pointSize: 0.1
            },
            {
                value: 10,
                label: '检查站车道',
                showFields: 'TYPE',
                lineStyle: 'solid',
                color: 'rgb(255,255,255)',
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
                color: 'rgb(255,255,255)',
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
                color: 'rgb(255,255,255)',
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
                color: 'rgb(255,255,255)',
                opacity: 1,
                arrow: true,
                point: true,
                pointEnabledStatus: true,
                arrowEnabledStatus: true,
                pointSize: 0.1
            },
            {
                value: 14,
                label: '隔离带车道',
                showFields: 'TYPE',
                lineStyle: 'solid',
                color: 'rgb(255,255,255)',
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
                color: 'rgb(255,255,255)',
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
                color: 'rgb(255,255,255)',
                opacity: 1,
                arrow: true,
                point: true,
                pointEnabledStatus: true,
                arrowEnabledStatus: true,
                pointSize: 0.1
            },
            {
                value: 17,
                label: '危险用品专用车道',
                showFields: 'TYPE',
                lineStyle: 'solid',
                color: 'rgb(255,255,255)',
                opacity: 1,
                arrow: true,
                point: true,
                pointEnabledStatus: true,
                arrowEnabledStatus: true,
                pointSize: 0.1
            },
            {
                value: 18,
                label: '爬坡车道',
                showFields: 'TYPE',
                lineStyle: 'solid',
                color: 'rgb(255,255,255)',
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
                color: 'rgb(255,255,255)',
                opacity: 1,
                arrow: true,
                point: true,
                pointEnabledStatus: true,
                arrowEnabledStatus: true,
                pointSize: 0.1
            },
            {
                value: 20,
                label: '海关监管车道',
                showFields: 'TYPE',
                lineStyle: 'solid',
                color: 'rgb(255,255,255)',
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
                color: 'rgb(255,255,255)',
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
                color: 'rgb(255,255,255)',
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
                color: 'rgb(255,255,255)',
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
                color: 'rgb(255,255,255)',
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
                color: 'rgb(255,255,255)',
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
                color: 'rgb(255,255,255)',
                opacity: 1,
                arrow: true,
                point: true,
                pointEnabledStatus: true,
                arrowEnabledStatus: true,
                pointSize: 0.1
            },
            {
                value: 27,
                label: '超车道',
                showFields: 'TYPE',
                lineStyle: 'solid',
                color: 'rgb(255,255,255)',
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
                color: 'rgb(255,255,255)',
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
                color: 'rgb(255,255,255)',
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
                color: 'rgb(255,255,255)',
                opacity: 1,
                arrow: true,
                point: true,
                pointEnabledStatus: true,
                arrowEnabledStatus: true,
                pointSize: 0.1
            },
            {
                value: 31,
                label: '复合车道',
                showFields: 'TYPE',
                lineStyle: 'solid',
                color: 'rgb(255,255,255)',
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
                color: 'rgb(255,255,255)',
                opacity: 1,
                arrow: true,
                point: true,
                pointEnabledStatus: true,
                arrowEnabledStatus: true,
                pointSize: 0.1
            }
        ],
        typeStyleMap: {},
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
            color: 'rgb(255,255,255)',
            opacity: 1,
            radius: 0.15,
            size: 80,
            pointStyle: 'dianyaosu'
        },
        typeStyle: [
            {
                value: 0,
                label: '未定义',
                showFields: 'TYPE',
                color: 'rgb(255,255,255)',
                opacity: 1,
                radius: 0.15,
                size: 80,
                pointStyle: 'dianyaosu'
            },
            {
                value: 1,
                label: '道路左侧出口',
                showFields: 'TYPE',
                color: 'rgb(255,255,255)',
                opacity: 1,
                radius: 0.15,
                size: 80,
                pointStyle: 'dianyaosu'
            },
            {
                value: 2,
                label: '道路右侧出口',
                showFields: 'TYPE',
                color: 'rgb(255,255,255)',
                opacity: 1,
                radius: 0.15,
                size: 80,
                pointStyle: 'dianyaosu'
            },
            {
                value: 3,
                label: '道路分离点',
                showFields: 'TYPE',
                color: 'rgb(255,255,255)',
                opacity: 1,
                radius: 0.15,
                size: 80,
                pointStyle: 'dianyaosu'
            },
            {
                value: 4,
                label: '道路合并点',
                showFields: 'TYPE',
                color: 'rgb(255,255,255)',
                opacity: 1,
                radius: 0.15,
                size: 80,
                pointStyle: 'dianyaosu'
            },
            {
                value: 5,
                label: '车道合并点',
                showFields: 'TYPE',
                color: 'rgb(255,255,255)',
                opacity: 1,
                radius: 0.15,
                size: 80,
                pointStyle: 'dianyaosu'
            },

            {
                value: 21,
                label: '服务区道路开始位置',
                showFields: 'TYPE',
                color: 'rgb(255,255,255)',
                opacity: 1,
                radius: 0.15,
                size: 80,
                pointStyle: 'dianyaosu'
            },
            {
                value: 22,
                label: '服务区道路结束位置',
                showFields: 'TYPE',
                color: 'rgb(255,255,255)',
                opacity: 1,
                radius: 0.15,
                size: 80,
                pointStyle: 'dianyaosu'
            },

            {
                value: 41,
                label: '点云不清晰起点',
                showFields: 'TYPE',
                color: 'rgb(255,255,255)',
                opacity: 1,
                radius: 0.15,
                size: 80,
                pointStyle: 'dianyaosu'
            },
            {
                value: 42,
                label: '点云不清晰结束点',
                showFields: 'TYPE',
                color: 'rgb(255,255,255)',
                opacity: 1,
                radius: 0.15,
                size: 80,
                pointStyle: 'dianyaosu'
            },
            {
                value: 43,
                label: '点云遮挡起点',
                showFields: 'TYPE',
                color: 'rgb(255,255,255)',
                opacity: 1,
                radius: 0.15,
                size: 80,
                pointStyle: 'dianyaosu'
            },
            {
                value: 44,
                label: '点云遮挡结束',
                showFields: 'TYPE',
                color: 'rgb(255,255,255)',
                opacity: 1,
                radius: 0.15,
                size: 80,
                pointStyle: 'dianyaosu'
            },
            {
                value: 45,
                label: '精度误差起始',
                showFields: 'TYPE',
                color: 'rgb(255,255,255)',
                opacity: 1,
                radius: 0.15,
                size: 80,
                pointStyle: 'dianyaosu'
            },
            {
                value: 46,
                label: '精度误差结束',
                showFields: 'TYPE',
                color: 'rgb(255,255,255)',
                opacity: 1,
                radius: 0.15,
                size: 80,
                pointStyle: 'dianyaosu'
            },
            {
                value: 47,
                label: '道路施工起始',
                showFields: 'TYPE',
                color: 'rgb(255,255,255)',
                opacity: 1,
                radius: 0.15,
                size: 80,
                pointStyle: 'dianyaosu'
            },
            {
                value: 48,
                label: '道路施工结束',
                showFields: 'TYPE',
                color: 'rgb(255,255,255)',
                opacity: 1,
                radius: 0.15,
                size: 80,
                pointStyle: 'dianyaosu'
            }
        ],
        typeStyleMap: {},
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
        typeStyle: [
            {
                value: '0',
                label: '未定义',
                showFields: 'ARR_DIRECT',
                polygonStyle: 'solid',
                color: 'rgb(255,255,255)',
                opacity: 1
            },
            {
                value: 'A',
                label: '直行',
                showFields: 'ARR_DIRECT',
                polygonStyle: 'solid',
                color: 'rgb(255,255,255)',
                opacity: 1
            },
            {
                value: 'B',
                label: '左转',
                showFields: 'ARR_DIRECT',
                polygonStyle: 'solid',
                color: 'rgb(255,255,255)',
                opacity: 1
            },
            {
                value: 'C',
                label: '右转',
                showFields: 'ARR_DIRECT',
                polygonStyle: 'solid',
                color: 'rgb(255,255,255)',
                opacity: 1
            },
            {
                value: 'D',
                label: '左掉头',
                showFields: 'ARR_DIRECT',
                polygonStyle: 'solid',
                color: 'rgb(255,255,255)',
                opacity: 1
            },
            {
                value: 'E',
                label: '右掉头',
                showFields: 'ARR_DIRECT',
                polygonStyle: 'solid',
                color: 'rgb(255,255,255)',
                opacity: 1
            },
            {
                value: 'F',
                label: '左弯或需向左合流',
                showFields: 'ARR_DIRECT',
                polygonStyle: 'solid',
                color: 'rgb(255,255,255)',
                opacity: 1
            },
            {
                value: 'G',
                label: '右弯或需向右合流',
                showFields: 'ARR_DIRECT',
                polygonStyle: 'solid',
                color: 'rgb(255,255,255)',
                opacity: 1
            },
            {
                value: 'H',
                label: '左后方转弯',
                showFields: 'ARR_DIRECT',
                polygonStyle: 'solid',
                color: 'rgb(255,255,255)',
                opacity: 1
            },
            {
                value: 'I',
                label: '右后方转弯',
                showFields: 'ARR_DIRECT',
                polygonStyle: 'solid',
                color: 'rgb(255,255,255)',
                opacity: 1
            },
            {
                value: 'J',
                label: '禁止左掉头',
                showFields: 'ARR_DIRECT',
                polygonStyle: 'solid',
                color: 'rgb(255,255,255)',
                opacity: 1
            },
            {
                value: 'K',
                label: '禁止右掉头',
                showFields: 'ARR_DIRECT',
                polygonStyle: 'solid',
                color: 'rgb(255,255,255)',
                opacity: 1
            },
            {
                value: 'L',
                label: '禁止左转',
                showFields: 'ARR_DIRECT',
                polygonStyle: 'solid',
                color: 'rgb(255,255,255)',
                opacity: 1
            },
            {
                value: 'M',
                label: '禁止右转',
                showFields: 'ARR_DIRECT',
                polygonStyle: 'solid',
                color: 'rgb(255,255,255)',
                opacity: 1
            },
            {
                value: 'X',
                label: '待确认',
                showFields: 'ARR_DIRECT',
                polygonStyle: 'solid',
                color: 'rgb(255,255,255)',
                opacity: 1
            }
        ],
        typeStyleMap: {},
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
            color: 'rgb(255,255,255)',
            opacity: 1,
            arrow: false,
            point: false,
            pointEnabledStatus: true,
            arrowEnabledStatus: true,
            pointSize: 0.1
        },
        typeStyle: [
            {
                value: 0,
                label: '未定义',
                showFields: 'TYPE',
                lineStyle: 'solid',
                color: 'rgb(255,255,255)',
                opacity: 1,
                arrow: false,
                point: false,
                pointEnabledStatus: true,
                arrowEnabledStatus: true,
                pointSize: 0.1
            },
            {
                value: 1,
                label: '停止线',
                showFields: 'TYPE',
                lineStyle: 'solid',
                color: 'rgb(255,255,255)',
                opacity: 1,
                arrow: false,
                point: false,
                pointEnabledStatus: true,
                arrowEnabledStatus: true,
                pointSize: 0.1
            },
            {
                value: 2,
                label: '停车让行线',
                showFields: 'TYPE',
                lineStyle: 'solid',
                color: 'rgb(255,255,255)',
                opacity: 1,
                arrow: false,
                point: false,
                pointEnabledStatus: true,
                arrowEnabledStatus: true,
                pointSize: 0.1
            },
            {
                value: 3,
                label: '减速让行线',
                showFields: 'TYPE',
                lineStyle: 'solid',
                color: 'rgb(255,255,255)',
                opacity: 1,
                arrow: false,
                point: false,
                pointEnabledStatus: true,
                arrowEnabledStatus: true,
                pointSize: 0.1
            }
        ],
        typeStyleMap: {},
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
    AD_LaneMark_Plg: {
        key: 'AD_LaneMark_Plg',
        label: '面状标识物',
        checked: false,
        isClassify: true,
        type: 'Polygon',
        commonStyle: {
            showFields: 'TYPE',
            polygonStyle: 'solid',
            color: 'rgb(255,255,255)',
            opacity: 1
        },
        typeStyle: [
            {
                value: 0,
                label: '未定义',
                showFields: 'TYPE',
                polygonStyle: 'solid',
                color: 'rgb(255,255,255)',
                opacity: 1
            },
            {
                value: 1,
                label: '人行横道',
                showFields: 'TYPE',
                polygonStyle: 'solid',
                color: 'rgb(255,255,255)',
                opacity: 1
            },
            {
                value: 2,
                label: '禁止停车区',
                showFields: 'TYPE',
                polygonStyle: 'solid',
                color: 'rgb(255,255,255)',
                opacity: 1
            },
            {
                value: 3,
                label: '减速带',
                showFields: 'TYPE',
                polygonStyle: 'solid',
                color: 'rgb(255,255,255)',
                opacity: 1
            },
            {
                value: 4,
                label: '减速警示震荡线',
                showFields: 'TYPE',
                polygonStyle: 'solid',
                color: 'rgb(255,255,255)',
                opacity: 1
            },
            {
                value: 5,
                label: '斜跨路口的人行横道',
                showFields: 'TYPE',
                polygonStyle: 'solid',
                color: 'rgb(255,255,255)',
                opacity: 1
            }
        ],
        typeStyleMap: {},
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
                key: 'TYPE',
                name: '面状标识物类型',
                type: 'AD_LANEMARK_PLG_TYPE',
                domType: 'RadioIconGroup'
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
            color: 'rgb(255,255,255)',
            opacity: 1
        },
        typeStyle: [
            {
                value: 0,
                label: '未定义',
                showFields: 'CONT_TYPE',
                polygonStyle: 'solid',
                color: 'rgb(255,255,255)',
                opacity: 1
            },
            {
                value: 1,
                label: '最高速度限制',
                showFields: 'CONT_TYPE',
                polygonStyle: 'solid',
                color: 'rgb(255,255,255)',
                opacity: 1
            },
            {
                value: 2,
                label: '最低速度限制',
                showFields: 'CONT_TYPE',
                polygonStyle: 'solid',
                color: 'rgb(255,255,255)',
                opacity: 1
            },
            {
                value: 3,
                label: '潮汐车道时间限制',
                showFields: 'CONT_TYPE',
                polygonStyle: 'solid',
                color: 'rgb(255,255,255)',
                opacity: 1
            },
            {
                value: 4,
                label: '禁止停车时间限制',
                showFields: 'CONT_TYPE',
                polygonStyle: 'solid',
                color: 'rgb(255,255,255)',
                opacity: 1
            },
            {
                value: 5,
                label: 'HOV车道时间限制',
                showFields: 'CONT_TYPE',
                polygonStyle: 'solid',
                color: 'rgb(255,255,255)',
                opacity: 1
            },
            {
                value: 6,
                label: '公交车道时间限制',
                showFields: 'CONT_TYPE',
                polygonStyle: 'solid',
                color: 'rgb(255,255,255)',
                opacity: 1
            },
            {
                value: 99,
                label: '其他',
                showFields: 'CONT_TYPE',
                polygonStyle: 'solid',
                color: 'rgb(255,255,255)',
                opacity: 1
            }
        ],
        typeStyleMap: {},
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
                key: 'TYPE',
                name: '文字符号类型',
                type: 'AD_TEXT_TYPE',
                domType: 'RadioIconGroup'
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
            color: 'rgb(255,255,255)',
            opacity: 1
        },
        typeStyle: [
            {
                value: 0,
                label: '未定义',
                showFields: 'SIGN_STYLE',
                polygonStyle: 'solid',
                color: 'rgb(255,255,255)',
                opacity: 1
            },
            {
                value: 1,
                label: '单个标志牌',
                showFields: 'SIGN_STYLE',
                polygonStyle: 'solid',
                color: 'rgb(255,255,255)',
                opacity: 1
            },
            {
                value: 2,
                label: '组合标志牌',
                showFields: 'SIGN_STYLE',
                polygonStyle: 'solid',
                color: 'rgb(255,255,255)',
                opacity: 1
            }
        ],
        typeStyleMap: {},
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
                type: 'AD_TRAFFICSIGN_SIGN_STYLE',
                domType: 'Select'
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
            color: 'rgb(255,255,255)',
            opacity: 1
        },
        typeStyle: [
            {
                showFields: 'NOKEY',
                lineStyle: 'solid',
                color: 'rgb(255,255,255)',
                opacity: 1,
                arrow: false,
                point: false,
                pointEnabledStatus: true,
                arrowEnabledStatus: true,
                pointSize: 0.1
            }
        ],
        typeStyleMap: {},
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
            color: 'rgb(255,255,255)',
            opacity: 1,
            arrow: false,
            point: true,
            pointEnabledStatus: true,
            arrowEnabledStatus: true,
            pointSize: 0.1
        },
        typeStyle: [
            {
                value: 0,
                label: '未定义',
                showFields: 'TYPE',
                lineStyle: 'solid',
                color: 'rgb(255,255,255)',
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
                color: 'rgb(255,255,255)',
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
                color: 'rgb(255,255,255)',
                opacity: 1,
                arrow: false,
                point: true,
                pointEnabledStatus: true,
                arrowEnabledStatus: true,
                pointSize: 0.1
            },
            {
                value: 3,
                label: '路缘石',
                showFields: 'TYPE',
                lineStyle: 'solid',
                color: 'rgb(255,255,255)',
                opacity: 1,
                arrow: false,
                point: true,
                pointEnabledStatus: true,
                arrowEnabledStatus: true,
                pointSize: 0.1
            },
            {
                value: 4,
                label: '隔音墙',
                showFields: 'TYPE',
                lineStyle: 'solid',
                color: 'rgb(255,255,255)',
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
                color: 'rgb(255,255,255)',
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
                color: 'rgb(255,255,255)',
                opacity: 1,
                arrow: false,
                point: true,
                pointEnabledStatus: true,
                arrowEnabledStatus: true,
                pointSize: 0.1
            }
        ],
        typeStyleMap: {},
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
    AD_LaneDivider_Pln: {
        key: 'AD_LaneDivider_Pln',
        label: '几何层：车道线线要素',
        checked: false,
        isClassify: true,
        type: 'Line',
        commonStyle: {
            showFields: 'FEAT_TYPE',
            lineStyle: 'solid',
            color: 'rgb(255,255,255)',
            opacity: 1,
            arrow: true,
            point: true,
            pointEnabledStatus: true,
            arrowEnabledStatus: true,
            pointSize: 0.1
        },
        typeStyle: [
            {
                value: 0,
                label: '未定义',
                showFields: 'FEAT_TYPE',
                lineStyle: 'solid',
                color: 'rgb(255,255,255)',
                opacity: 1,
                arrow: true,
                point: true,
                pointEnabledStatus: true,
                arrowEnabledStatus: true,
                pointSize: 0.1
            },
            {
                value: 1001,
                label: '单实线',
                showFields: 'FEAT_TYPE',
                lineStyle: 'solid',
                color: 'rgb(255,255,255)',
                opacity: 1,
                arrow: true,
                point: true,
                pointEnabledStatus: true,
                arrowEnabledStatus: true,
                pointSize: 0.1
            },
            {
                value: 1003,
                label: '双实线',
                showFields: 'FEAT_TYPE',
                lineStyle: 'solid',
                color: 'rgb(255,255,255)',
                opacity: 1,
                arrow: true,
                point: true,
                pointEnabledStatus: true,
                arrowEnabledStatus: true,
                pointSize: 0.1
            },
            {
                value: 1005,
                label: '左实右虚线',
                showFields: 'FEAT_TYPE',
                lineStyle: 'solid',
                color: 'rgb(255,255,255)',
                opacity: 1,
                arrow: true,
                point: true,
                pointEnabledStatus: true,
                arrowEnabledStatus: true,
                pointSize: 0.1
            },
            {
                value: 1006,
                label: '左虚右实线',
                showFields: 'FEAT_TYPE',
                lineStyle: 'solid',
                color: 'rgb(255,255,255)',
                opacity: 1,
                arrow: true,
                point: true,
                pointEnabledStatus: true,
                arrowEnabledStatus: true,
                pointSize: 0.1
            },
            {
                value: 1007,
                label: '可变导向车道线',
                showFields: 'FEAT_TYPE',
                lineStyle: 'solid',
                color: 'rgb(255,255,255)',
                opacity: 1,
                arrow: true,
                point: true,
                pointEnabledStatus: true,
                arrowEnabledStatus: true,
                pointSize: 0.1
            }
        ],
        typeStyleMap: {},
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
                key: 'FEAT_TYPE',
                name: '要素子类型',
                type: 'AD_LANE_DIVIDER_PLN_TYPE',
                domType: 'RadioIconGroup'
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
            color: 'rgb(255,255,255)',
            opacity: 1
        },
        typeStyle: [
            {
                value: 0,
                label: '未定义',
                showFields: 'FEAT_TYPE',
                polygonStyle: 'solid',
                color: 'rgb(255,255,255)',
                opacity: 1
            },
            {
                value: 1002,
                label: '单虚线',
                showFields: 'FEAT_TYPE',
                polygonStyle: 'solid',
                color: 'rgb(255,255,255)',
                opacity: 1
            },

            {
                value: 1004,
                label: '双虚线',
                showFields: 'FEAT_TYPE',
                polygonStyle: 'solid',
                color: 'rgb(255,255,255)',
                opacity: 1
            },
            {
                value: 1005,
                label: '左实右虚线',
                showFields: 'FEAT_TYPE',
                polygonStyle: 'solid',
                color: 'rgb(255,255,255)',
                opacity: 1
            },
            {
                value: 1006,
                label: '左虚右实线',
                showFields: 'FEAT_TYPE',
                polygonStyle: 'solid',
                color: 'rgb(255,255,255)',
                opacity: 1
            }
        ],
        typeStyleMap: {},
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
                type: 'AD_LANE_DIVIDER_PLG_TYPE',
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
            color: 'rgb(255,255,255)',
            opacity: 1
        },
        typeStyle: [
            {
                value: 0,
                label: '未定义',
                showFields: 'FEAT_TYPE',
                polygonStyle: 'solid',
                color: 'rgb(255,255,255)',
                opacity: 1
            },
            {
                value: 2001,
                label: '停止线',
                showFields: 'FEAT_TYPE',
                polygonStyle: 'solid',
                color: 'rgb(255,255,255)',
                opacity: 1
            },

            {
                value: 2002,
                label: '停车让行线',
                showFields: 'FEAT_TYPE',
                polygonStyle: 'solid',
                color: 'rgb(255,255,255)',
                opacity: 1
            },
            {
                value: 2003,
                label: '减速让行线',
                showFields: 'FEAT_TYPE',
                polygonStyle: 'solid',
                color: 'rgb(255,255,255)',
                opacity: 1
            }
        ],
        typeStyleMap: {},
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
                type: 'AD_STOPLOCTION_GEO_TYPE',
                domType: 'RadioIconGroup'
            }
        ]
    },
    AD_Arrow_Geo: {
        key: 'AD_Arrow_Geo',
        label: '几何层：箭头',
        checked: false,
        isClassify: true,
        type: 'Polygon',
        commonStyle: {
            showFields: 'FEAT_TYPE',
            polygonStyle: 'solid',
            color: 'rgb(255,255,255)',
            opacity: 1
        },
        typeStyle: [
            {
                value: 0,
                label: '未定义',
                showFields: 'FEAT_TYPE',
                polygonStyle: 'solid',
                color: 'rgb(255,255,255)',
                opacity: 1
            },
            {
                value: 3001,
                label: '直行箭头',
                showFields: 'FEAT_TYPE',
                polygonStyle: 'solid',
                color: 'rgb(255,255,255)',
                opacity: 1
            },

            {
                value: 3002,
                label: '左转箭头',
                showFields: 'FEAT_TYPE',
                polygonStyle: 'solid',
                color: 'rgb(255,255,255)',
                opacity: 1
            },
            {
                value: 3003,
                label: '右转箭头',
                showFields: 'FEAT_TYPE',
                polygonStyle: 'solid',
                color: 'rgb(255,255,255)',
                opacity: 1
            },
            {
                value: 3004,
                label: '直行左转箭头',
                showFields: 'FEAT_TYPE',
                polygonStyle: 'solid',
                color: 'rgb(255,255,255)',
                opacity: 1
            },
            {
                value: 3005,
                label: '直行右转箭头',
                showFields: 'FEAT_TYPE',
                polygonStyle: 'solid',
                color: 'rgb(255,255,255)',
                opacity: 1
            },
            {
                value: 3006,
                label: '左转右转箭头',
                showFields: 'FEAT_TYPE',
                polygonStyle: 'solid',
                color: 'rgb(255,255,255)',
                opacity: 1
            },
            {
                value: 3007,
                label: '直行左转右转箭头',
                showFields: 'FEAT_TYPE',
                polygonStyle: 'solid',
                color: 'rgb(255,255,255)',
                opacity: 1
            },
            {
                value: 3008,
                label: '掉头箭头',
                showFields: 'FEAT_TYPE',
                polygonStyle: 'solid',
                color: 'rgb(255,255,255)',
                opacity: 1
            },
            {
                value: 3009,
                label: '左转掉头箭头',
                showFields: 'FEAT_TYPE',
                polygonStyle: 'solid',
                color: 'rgb(255,255,255)',
                opacity: 1
            },
            {
                value: 3010,
                label: '右转掉头箭头',
                showFields: 'FEAT_TYPE',
                polygonStyle: 'solid',
                color: 'rgb(255,255,255)',
                opacity: 1
            },
            {
                value: 3011,
                label: '禁止标记箭头',
                showFields: 'FEAT_TYPE',
                polygonStyle: 'solid',
                color: 'rgb(255,255,255)',
                opacity: 1
            },
            {
                value: 3012,
                label: '向左合流箭头',
                showFields: 'FEAT_TYPE',
                polygonStyle: 'solid',
                color: 'rgb(255,255,255)',
                opacity: 1
            },
            {
                value: 3013,
                label: '向右合流箭头',
                showFields: 'FEAT_TYPE',
                polygonStyle: 'solid',
                color: 'rgb(255,255,255)',
                opacity: 1
            },
            {
                value: 3014,
                label: '直行和掉头箭头',
                showFields: 'FEAT_TYPE',
                polygonStyle: 'solid',
                color: 'rgb(255,255,255)',
                opacity: 1
            },
            {
                value: 3015,
                label: '直行左转掉头箭头',
                showFields: 'FEAT_TYPE',
                polygonStyle: 'solid',
                color: 'rgb(255,255,255)',
                opacity: 1
            },
            {
                value: 3016,
                label: '直行右转掉头箭头',
                showFields: 'FEAT_TYPE',
                polygonStyle: 'solid',
                color: 'rgb(255,255,255)',
                opacity: 1
            },
            {
                value: 3017,
                label: '直行左弯',
                showFields: 'FEAT_TYPE',
                polygonStyle: 'solid',
                color: 'rgb(255,255,255)',
                opacity: 1
            },
            {
                value: 3018,
                label: '直行右弯',
                showFields: 'FEAT_TYPE',
                polygonStyle: 'solid',
                color: 'rgb(255,255,255)',
                opacity: 1
            }
        ],
        typeStyleMap: {},
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
                type: 'AD_ARROW_GEO_TYPE',
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
            color: 'rgb(255,255,255)',
            opacity: 1
        },
        typeStyle: [
            {
                value: 0,
                label: '未定义',
                showFields: 'FEAT_TYPE',
                polygonStyle: 'solid',
                color: 'rgb(255,255,255)',
                opacity: 1
            },
            {
                value: 4001,
                label: '减速警示线',
                showFields: 'FEAT_TYPE',
                polygonStyle: 'solid',
                color: 'rgb(255,255,255)',
                opacity: 1
            },

            {
                value: 4002,
                label: '减速带',
                showFields: 'FEAT_TYPE',
                polygonStyle: 'solid',
                color: 'rgb(255,255,255)',
                opacity: 1
            },
            {
                value: 9901,
                label: '人行横道',
                showFields: 'FEAT_TYPE',
                polygonStyle: 'solid',
                color: 'rgb(255,255,255)',
                opacity: 1
            },
            {
                value: 9902,
                label: '禁止停车区',
                showFields: 'FEAT_TYPE',
                polygonStyle: 'solid',
                color: 'rgb(255,255,255)',
                opacity: 1
            },
            {
                value: 9903,
                label: '导流区',
                showFields: 'FEAT_TYPE',
                polygonStyle: 'solid',
                color: 'rgb(255,255,255)',
                opacity: 1
            },
            {
                value: 9904,
                label: '路口内中心圈',
                showFields: 'FEAT_TYPE',
                polygonStyle: 'solid',
                color: 'rgb(255,255,255)',
                opacity: 1
            },
            {
                value: 9905,
                label: '车距确认线',
                showFields: 'FEAT_TYPE',
                polygonStyle: 'solid',
                color: 'rgb(255,255,255)',
                opacity: 1
            },
            {
                value: 9906,
                label: '地面文字数字',
                showFields: 'FEAT_TYPE',
                polygonStyle: 'solid',
                color: 'rgb(255,255,255)',
                opacity: 1
            },
            {
                value: 9907,
                label: '地面符号',
                showFields: 'FEAT_TYPE',
                polygonStyle: 'solid',
                color: 'rgb(255,255,255)',
                opacity: 1
            }
        ],
        typeStyleMap: {},
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
                type: 'AD_LANE_MARK_GEO_TYPE',
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
            color: 'rgb(255,255,255)',
            opacity: 1,
            arrow: false,
            point: false,
            pointEnabledStatus: true,
            arrowEnabledStatus: true,
            pointSize: 0.1
        },
        typeStyle: [
            {
                showFields: 'NOKEY',
                lineStyle: 'solid',
                color: 'rgb(255,255,255)',
                opacity: 1,
                arrow: false,
                point: false,
                pointEnabledStatus: true,
                arrowEnabledStatus: true,
                pointSize: 0.1
            }
        ],
        typeStyleMap: {},
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
    },
    AD_TrafficSign_Geo: {
        key: 'AD_TrafficSign_Geo',
        label: ' 几何层：交通标志牌',
        checked: false,
        isClassify: true,
        type: 'Polygon',
        commonStyle: {
            showFields: 'FEAT_TYPE',
            polygonStyle: 'solid',
            color: 'rgb(255,255,255)',
            opacity: 1
        },
        typeStyle: [
            {
                value: 0,
                label: '其他警告标志',
                showFields: 'FEAT_TYPE',
                polygonStyle: 'solid',
                color: 'rgb(255,255,255)',
                opacity: 1
            },
            {
                value: 2100,
                label: '建议速度',
                showFields: 'FEAT_TYPE',
                polygonStyle: 'solid',
                color: 'rgb(255,255,255)',
                opacity: 1
            },

            {
                value: 2101,
                label: '其他禁令标志',
                showFields: 'FEAT_TYPE',
                polygonStyle: 'solid',
                color: 'rgb(255,255,255)',
                opacity: 1
            },
            {
                value: 2201,
                label: '停车让行',
                showFields: 'FEAT_TYPE',
                polygonStyle: 'solid',
                color: 'rgb(255,255,255)',
                opacity: 1
            },
            {
                value: 2202,
                label: '减速让行',
                showFields: 'FEAT_TYPE',
                polygonStyle: 'solid',
                color: 'rgb(255,255,255)',
                opacity: 1
            },
            {
                value: 2203,
                label: '会车让行',
                showFields: 'FEAT_TYPE',
                polygonStyle: 'solid',
                color: 'rgb(255,255,255)',
                opacity: 1
            },
            {
                value: 2204,
                label: '禁止通行',
                showFields: 'FEAT_TYPE',
                polygonStyle: 'solid',
                color: 'rgb(255,255,255)',
                opacity: 1
            },
            {
                value: 2205,
                label: '禁止驶入',
                showFields: 'FEAT_TYPE',
                polygonStyle: 'solid',
                color: 'rgb(255,255,255)',
                opacity: 1
            },
            {
                value: 2206,
                label: '禁止机动车驶入',
                showFields: 'FEAT_TYPE',
                polygonStyle: 'solid',
                color: 'rgb(255,255,255)',
                opacity: 1
            },
            {
                value: 2207,
                label: '禁止向左转弯',
                showFields: 'FEAT_TYPE',
                polygonStyle: 'solid',
                color: 'rgb(255,255,255)',
                opacity: 1
            },
            {
                value: 2208,
                label: '禁止向右转弯',
                showFields: 'FEAT_TYPE',
                polygonStyle: 'solid',
                color: 'rgb(255,255,255)',
                opacity: 1
            },
            {
                value: 2209,
                label: '禁止直行',
                showFields: 'FEAT_TYPE',
                polygonStyle: 'solid',
                color: 'rgb(255,255,255)',
                opacity: 1
            },
            {
                value: 2210,
                label: '禁止向左向右转弯',
                showFields: 'FEAT_TYPE',
                polygonStyle: 'solid',
                color: 'rgb(255,255,255)',
                opacity: 1
            },
            {
                value: 2211,
                label: '禁止直行和向左转弯',
                showFields: 'FEAT_TYPE',
                polygonStyle: 'solid',
                color: 'rgb(255,255,255)',
                opacity: 1
            },
            {
                value: 2212,
                label: '禁止直行和向右转弯',
                showFields: 'FEAT_TYPE',
                polygonStyle: 'solid',
                color: 'rgb(255,255,255)',
                opacity: 1
            },
            {
                value: 2213,
                label: '禁止掉头',
                showFields: 'FEAT_TYPE',
                polygonStyle: 'solid',
                color: 'rgb(255,255,255)',
                opacity: 1
            },
            {
                value: 2214,
                label: '禁止超车',
                showFields: 'FEAT_TYPE',
                polygonStyle: 'solid',
                color: 'rgb(255,255,255)',
                opacity: 1
            },
            {
                value: 2215,
                label: '解除禁止超车',
                showFields: 'FEAT_TYPE',
                polygonStyle: 'solid',
                color: 'rgb(255,255,255)',
                opacity: 1
            },
            {
                value: 2216,
                label: '禁止停车',
                showFields: 'FEAT_TYPE',
                polygonStyle: 'solid',
                color: 'rgb(255,255,255)',
                opacity: 1
            },
            {
                value: 2217,
                label: '禁止长时停车',
                showFields: 'FEAT_TYPE',
                polygonStyle: 'solid',
                color: 'rgb(255,255,255)',
                opacity: 1
            },
            {
                value: 2219,
                label: '限制速度',
                showFields: 'FEAT_TYPE',
                polygonStyle: 'solid',
                color: 'rgb(255,255,255)',
                opacity: 1
            },
            {
                value: 2220,
                label: '解除限制速度',
                showFields: 'FEAT_TYPE',
                polygonStyle: 'solid',
                color: 'rgb(255,255,255)',
                opacity: 1
            },
            {
                value: 2223,
                label: '区域禁止-禁止长时停车',
                showFields: 'FEAT_TYPE',
                polygonStyle: 'solid',
                color: 'rgb(255,255,255)',
                opacity: 1
            },
            {
                value: 2224,
                label: '区域禁止解除-解除禁止长时停车',
                showFields: 'FEAT_TYPE',
                polygonStyle: 'solid',
                color: 'rgb(255,255,255)',
                opacity: 1
            },
            {
                value: 2225,
                label: '区域禁止-禁止停车',
                showFields: 'FEAT_TYPE',
                polygonStyle: 'solid',
                color: 'rgb(255,255,255)',
                opacity: 1
            },
            {
                value: 2226,
                label: '区域禁止解除-解除禁止停车',
                showFields: 'FEAT_TYPE',
                polygonStyle: 'solid',
                color: 'rgb(255,255,255)',
                opacity: 1
            },
            {
                value: 2227,
                label: '区域禁止-速度限制',
                showFields: 'FEAT_TYPE',
                polygonStyle: 'solid',
                color: 'rgb(255,255,255)',
                opacity: 1
            },
            {
                value: 2228,
                label: '区域禁止解除-解除速度限制',
                showFields: 'FEAT_TYPE',
                polygonStyle: 'solid',
                color: 'rgb(255,255,255)',
                opacity: 1
            },
            {
                value: 2200,
                label: '其他指示类标志',
                showFields: 'FEAT_TYPE',
                polygonStyle: 'solid',
                color: 'rgb(255,255,255)',
                opacity: 1
            },
            {
                value: 2300,
                label: '最低限速',
                showFields: 'FEAT_TYPE',
                polygonStyle: 'solid',
                color: 'rgb(255,255,255)',
                opacity: 1
            },
            {
                value: 2314,
                label: '车道行驶方向-直行',
                showFields: 'FEAT_TYPE',
                polygonStyle: 'solid',
                color: 'rgb(255,255,255)',
                opacity: 1
            },
            {
                value: 2318,
                label: '允许掉头',
                showFields: 'FEAT_TYPE',
                polygonStyle: 'solid',
                color: 'rgb(255,255,255)',
                opacity: 1
            },
            {
                value: 2321,
                label: '车道行驶方向-左转',
                showFields: 'FEAT_TYPE',
                polygonStyle: 'solid',
                color: 'rgb(255,255,255)',
                opacity: 1
            },
            {
                value: 2322,
                label: '车道行驶方向-右转',
                showFields: 'FEAT_TYPE',
                polygonStyle: 'solid',
                color: 'rgb(255,255,255)',
                opacity: 1
            },
            {
                value: 2323,
                label: '车道行驶方向-直行和左转',
                showFields: 'FEAT_TYPE',
                polygonStyle: 'solid',
                color: 'rgb(255,255,255)',
                opacity: 1
            },
            {
                value: 2324,
                label: '车道行驶方向-直行和右转',
                showFields: 'FEAT_TYPE',
                polygonStyle: 'solid',
                color: 'rgb(255,255,255)',
                opacity: 1
            },
            {
                value: 2325,
                label: '车道行驶方向-左转和掉头',
                showFields: 'FEAT_TYPE',
                polygonStyle: 'solid',
                color: 'rgb(255,255,255)',
                opacity: 1
            },
            {
                value: 2326,
                label: '车道行驶方向-掉头',
                showFields: 'FEAT_TYPE',
                polygonStyle: 'solid',
                color: 'rgb(255,255,255)',
                opacity: 1
            },
            {
                value: 2327,
                label: '车道行驶方向-其他',
                showFields: 'FEAT_TYPE',
                polygonStyle: 'solid',
                color: 'rgb(255,255,255)',
                opacity: 1
            },
            {
                value: 2328,
                label: '区间测速起点',
                showFields: 'FEAT_TYPE',
                polygonStyle: 'solid',
                color: 'rgb(255,255,255)',
                opacity: 1
            },
            {
                value: 2401,
                label: '区间测速终点',
                showFields: 'FEAT_TYPE',
                polygonStyle: 'solid',
                color: 'rgb(255,255,255)',
                opacity: 1
            },
            {
                value: 2402,
                label: '区间测速起点和距离',
                showFields: 'FEAT_TYPE',
                polygonStyle: 'solid',
                color: 'rgb(255,255,255)',
                opacity: 1
            },
            {
                value: 2403,
                label: '表示时间标志',
                showFields: 'FEAT_TYPE',
                polygonStyle: 'solid',
                color: 'rgb(255,255,255)',
                opacity: 1
            },
            {
                value: 2404,
                label: '特殊天气辅助标志',
                showFields: 'FEAT_TYPE',
                polygonStyle: 'solid',
                color: 'rgb(255,255,255)',
                opacity: 1
            },
            {
                value: 2405,
                label: '特殊路段辅助标志',
                showFields: 'FEAT_TYPE',
                polygonStyle: 'solid',
                color: 'rgb(255,255,255)',
                opacity: 1
            },
            {
                value: 2406,
                label: '其他标志牌',
                showFields: 'FEAT_TYPE',
                polygonStyle: 'solid',
                color: 'rgb(255,255,255)',
                opacity: 1
            },
            {
                value: 2500,
                label: '动态限速标志',
                showFields: 'FEAT_TYPE',
                polygonStyle: 'solid',
                color: 'rgb(255,255,255)',
                opacity: 1
            },
            {
                value: 2600,
                label: '其他电子标志牌',
                showFields: 'FEAT_TYPE',
                polygonStyle: 'solid',
                color: 'rgb(255,255,255)',
                opacity: 1
            },
            {
                value: 2601,
                label: '未定义',
                showFields: 'FEAT_TYPE',
                polygonStyle: 'solid',
                color: 'rgb(255,255,255)',
                opacity: 1
            }
        ],
        typeStyleMap: {},
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
                type: 'AD_TRAFFIC_SIGN_GEO_TYPE',
                domType: 'RadioIconGroup'
            }
        ]
    },
    AD_TrafficLight_Geo: {
        key: 'AD_TrafficLight_Geo',
        label: '几何层：交通信号灯',
        checked: false,
        isClassify: true,
        type: 'Polygon',
        commonStyle: {
            showFields: 'FEAT_TYPE',
            polygonStyle: 'solid',
            color: 'rgb(255,255,255)',
            opacity: 1
        },
        typeStyle: [
            {
                value: 0,
                label: '未定义',
                showFields: 'FEAT_TYPE',
                polygonStyle: 'solid',
                color: 'rgb(255,255,255)',
                opacity: 1
            },
            {
                value: 3001,
                label: '普通交通信号灯',
                showFields: 'FEAT_TYPE',
                polygonStyle: 'solid',
                color: 'rgb(255,255,255)',
                opacity: 1
            },

            {
                value: 3002,
                label: '方向指示信号灯',
                showFields: 'FEAT_TYPE',
                polygonStyle: 'solid',
                color: 'rgb(255,255,255)',
                opacity: 1
            },
            {
                value: 3003,
                label: '铁路平交路口信号灯',
                showFields: 'FEAT_TYPE',
                polygonStyle: 'solid',
                color: 'rgb(255,255,255)',
                opacity: 1
            },
            {
                value: 3099,
                label: '其他',
                showFields: 'FEAT_TYPE',
                polygonStyle: 'solid',
                color: 'rgb(255,255,255)',
                opacity: 1
            }
        ],
        typeStyleMap: {},
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
                type: 'AD_TRAFFIC_LIGHT_GEO_TYPE',
                domType: 'RadioIconGroup'
            }
        ]
    }
};

const COMMON_VECTOR_CONFIG_MAP = {
    AD_Road: {
        key: 'AD_Road',
        label: '道路参考线',
        checked: false,
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
        typeStyle: [
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
                color: 'rgb(30,170,106)',
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
                color: 'rgb(30,170,106)',
                opacity: 1,
                arrow: true,
                point: true,
                pointEnabledStatus: true,
                arrowEnabledStatus: true,
                pointSize: 0.1
            }
        ],
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
        typeStyle: [
            {
                value: 0,
                label: '未定义',
                color: 'rgb(255,255,255)',
                showFields: 'RD_LINE',
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
                color: 'rgb(186,38,255)',
                showFields: 'RD_LINE',
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
                color: 'rgb(255,255,255)',
                showFields: 'RD_LINE',
                lineStyle: 'solid',
                opacity: 1,
                arrow: true,
                point: true,
                pointEnabledStatus: true,
                arrowEnabledStatus: true,
                pointSize: 0.1
            }
        ],
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
                    label: '单实线',
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
                    value: 2,
                    label: '单虚线',
                    showFields: 'TYPE',
                    color: 'rgb(255,255,255)',
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
                    value: 4,
                    label: '双虚线',
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
                    value: 5,
                    label: '左实右虚',
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
                    value: 6,
                    label: '左虚右实',
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
                    value: 7,
                    label: '短粗虚线',
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
                    value: 8,
                    label: '导流线',
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
                    value: 11,
                    label: '防护栏',
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
                    value: 12,
                    label: '隧道墙',
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
                    value: 13,
                    label: '路缘石',
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
                    value: 14,
                    label: '自然边界',
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
                    value: 15,
                    label: '施工边界',
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
                    value: 16,
                    label: '路中隔离带',
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
                    value: 17,
                    label: '待转待行区车道线',
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
                    value: 18,
                    label: '可变导向车道线',
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
                    value: 19,
                    label: '路口内虚拟车道线',
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
                    value: 20,
                    label: '其他虚拟车道线',
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
                    value: 99,
                    label: '其他',
                    showFields: 'TYPE',
                    color: 'rgb(255,255,255)',
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
                key: 'LANESTATUS',
                name: '车道通行状态',
                type: 'AD_LANE_DIVIDER_LANESTATUS',
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
        checked: false,
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
        typeStyle: [
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
                label: '人行道',
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
                label: '检查站车道',
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
                value: 14,
                label: '隔离带车道',
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
                value: 17,
                label: '危险用品专用车道',
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
                value: 18,
                label: '爬坡车道',
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
                value: 20,
                label: '海关监管车道',
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
                value: 27,
                label: '超车道',
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
                label: '复合车道',
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
        ],
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
                    label: '人行道',
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
                    label: '检查站车道',
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
                    value: 14,
                    label: '隔离带车道',
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
                    value: 17,
                    label: '危险用品专用车道',
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
                    value: 18,
                    label: '爬坡车道',
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
                    value: 20,
                    label: '海关监管车道',
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
                    value: 27,
                    label: '超车道',
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
                    label: '复合车道',
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
        typeStyle: [
            {
                value: 0,
                label: '未定义',
                color: 'rgb(102,255,102)',
                opacity: 1,
                size: 80,
                showFields: 'TYPE',
                radius: 0.15,
                pointStyle: 'dianyaosu'
            },
            {
                value: 1,
                label: '道路左侧出口',
                color: 'rgb(102,255,102)',
                opacity: 1,
                size: 80,
                showFields: 'TYPE',
                radius: 0.15,
                pointStyle: 'dianyaosu'
            },
            {
                value: 2,
                label: '道路右侧出口',
                color: 'rgb(102,255,102)',
                opacity: 1,
                size: 80,
                showFields: 'TYPE',
                radius: 0.15,
                pointStyle: 'dianyaosu'
            },
            {
                value: 3,
                label: '道路分离点',
                color: 'rgb(102,255,102)',
                opacity: 1,
                size: 80,
                showFields: 'TYPE',
                radius: 0.15,
                pointStyle: 'dianyaosu'
            },
            {
                value: 4,
                label: '道路合并点',
                color: 'rgb(102,255,102)',
                opacity: 1,
                size: 80,
                showFields: 'TYPE',
                radius: 0.15,
                pointStyle: 'dianyaosu'
            },
            {
                value: 5,
                label: '车道合并点',
                color: 'rgb(102,255,102)',
                opacity: 1,
                size: 80,
                showFields: 'TYPE',
                radius: 0.15,
                pointStyle: 'dianyaosu'
            },

            {
                value: 21,
                label: '服务区道路开始位置',
                color: 'rgb(102,255,102)',
                opacity: 1,
                size: 80,
                showFields: 'TYPE',
                radius: 0.15,
                pointStyle: 'dianyaosu'
            },
            {
                value: 22,
                label: '服务区道路结束位置',
                color: 'rgb(102,255,102)',
                opacity: 1,
                size: 80,
                showFields: 'TYPE',
                radius: 0.15,
                pointStyle: 'dianyaosu'
            },

            {
                value: 41,
                label: '点云不清晰起点',
                color: 'rgb(102,255,102)',
                opacity: 1,
                size: 80,
                showFields: 'TYPE',
                radius: 0.15,
                pointStyle: 'dianyaosu'
            },
            {
                value: 42,
                label: '点云不清晰结束点',
                color: 'rgb(102,255,102)',
                opacity: 1,
                size: 80,
                showFields: 'TYPE',
                radius: 0.15,
                pointStyle: 'dianyaosu'
            },
            {
                value: 43,
                label: '点云遮挡起点',
                color: 'rgb(102,255,102)',
                opacity: 1,
                size: 80,
                showFields: 'TYPE',
                radius: 0.15,
                pointStyle: 'dianyaosu'
            },
            {
                value: 44,
                label: '点云遮挡结束',
                color: 'rgb(102,255,102)',
                opacity: 1,
                size: 80,
                showFields: 'TYPE',
                radius: 0.15,
                pointStyle: 'dianyaosu'
            },
            {
                value: 45,
                label: '精度误差起始',
                color: 'rgb(102,255,102)',
                opacity: 1,
                size: 80,
                showFields: 'TYPE',
                radius: 0.15,
                pointStyle: 'dianyaosu'
            },
            {
                value: 46,
                label: '精度误差结束',
                color: 'rgb(102,255,102)',
                opacity: 1,
                size: 80,
                showFields: 'TYPE',
                radius: 0.15,
                pointStyle: 'dianyaosu'
            },
            {
                value: 47,
                label: '道路施工起始',
                color: 'rgb(102,255,102)',
                opacity: 1,
                size: 80,
                showFields: 'TYPE',
                radius: 0.15,
                pointStyle: 'dianyaosu'
            },
            {
                value: 48,
                label: '道路施工结束',
                color: 'rgb(102,255,102)',
                opacity: 1,
                size: 80,
                showFields: 'TYPE',
                radius: 0.15,
                pointStyle: 'dianyaosu'
            }
        ],
        typeStyleMap: {},
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
        typeStyle: [
            {
                value: '0',
                label: '未定义',
                showFields: 'ARR_DIRECT',
                polygonStyle: 'solid',
                color: 'rgb(255,255,255)',
                opacity: 1
            },
            {
                value: 'A',
                label: '直行',
                showFields: 'ARR_DIRECT',
                polygonStyle: 'solid',
                color: 'rgb(255,255,255)',
                opacity: 1
            },
            {
                value: 'B',
                label: '左转',
                showFields: 'ARR_DIRECT',
                polygonStyle: 'solid',
                color: 'rgb(255,255,255)',
                opacity: 1
            },
            {
                value: 'C',
                label: '右转',
                showFields: 'ARR_DIRECT',
                polygonStyle: 'solid',
                color: 'rgb(255,255,255)',
                opacity: 1
            },
            {
                value: 'D',
                label: '左掉头',
                showFields: 'ARR_DIRECT',
                polygonStyle: 'solid',
                color: 'rgb(255,255,255)',
                opacity: 1
            },
            {
                value: 'E',
                label: '右掉头',
                showFields: 'ARR_DIRECT',
                polygonStyle: 'solid',
                color: 'rgb(255,255,255)',
                opacity: 1
            },
            {
                value: 'F',
                label: '左弯或需向左合流',
                showFields: 'ARR_DIRECT',
                polygonStyle: 'solid',
                color: 'rgb(255,255,255)',
                opacity: 1
            },
            {
                value: 'G',
                label: '右弯或需向右合流',
                showFields: 'ARR_DIRECT',
                polygonStyle: 'solid',
                color: 'rgb(255,255,255)',
                opacity: 1
            },
            {
                value: 'H',
                label: '左后方转弯',
                showFields: 'ARR_DIRECT',
                polygonStyle: 'solid',
                color: 'rgb(255,255,255)',
                opacity: 1
            },
            {
                value: 'I',
                label: '右后方转弯',
                showFields: 'ARR_DIRECT',
                polygonStyle: 'solid',
                color: 'rgb(255,255,255)',
                opacity: 1
            },
            {
                value: 'J',
                label: '禁止左掉头',
                showFields: 'ARR_DIRECT',
                polygonStyle: 'solid',
                color: 'rgb(255,255,255)',
                opacity: 1
            },
            {
                value: 'K',
                label: '禁止右掉头',
                showFields: 'ARR_DIRECT',
                polygonStyle: 'solid',
                color: 'rgb(255,255,255)',
                opacity: 1
            },
            {
                value: 'L',
                label: '禁止左转',
                showFields: 'ARR_DIRECT',
                polygonStyle: 'solid',
                color: 'rgb(255,255,255)',
                opacity: 1
            },
            {
                value: 'M',
                label: '禁止右转',
                showFields: 'ARR_DIRECT',
                polygonStyle: 'solid',
                color: 'rgb(255,255,255)',
                opacity: 1
            },
            {
                value: 'X',
                label: '待确认',
                showFields: 'ARR_DIRECT',
                polygonStyle: 'solid',
                color: 'rgb(255,255,255)',
                opacity: 1
            }
        ],
        typeStyleMap: {},
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
            color: 'rgb(137,195,255)',
            opacity: 1,
            arrow: false,
            point: false,
            pointEnabledStatus: true,
            arrowEnabledStatus: true,
            pointSize: 0.1
        },
        typeStyle: [
            {
                value: 0,
                label: '未定义',
                showFields: 'TYPE',
                lineStyle: 'solid',
                color: 'rgb(137,195,255)',
                opacity: 1,
                arrow: false,
                point: false,
                pointEnabledStatus: true,
                arrowEnabledStatus: true,
                pointSize: 0.1
            },
            {
                value: 1,
                label: '停止线',
                showFields: 'TYPE',
                lineStyle: 'solid',
                color: 'rgb(137,195,255)',
                opacity: 1,
                arrow: false,
                point: false,
                pointEnabledStatus: true,
                arrowEnabledStatus: true,
                pointSize: 0.1
            },
            {
                value: 2,
                label: '停车让行线',
                showFields: 'TYPE',
                lineStyle: 'solid',
                color: 'rgb(137,195,255)',
                opacity: 1,
                arrow: false,
                point: false,
                pointEnabledStatus: true,
                arrowEnabledStatus: true,
                pointSize: 0.1
            },
            {
                value: 3,
                label: '减速让行线',
                showFields: 'TYPE',
                lineStyle: 'solid',
                color: 'rgb(137,195,255)',
                opacity: 1,
                arrow: false,
                point: false,
                pointEnabledStatus: true,
                arrowEnabledStatus: true,
                pointSize: 0.1
            }
        ],
        typeStyleMap: {},
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
    AD_LaneMark_Plg: {
        key: 'AD_LaneMark_Plg',
        label: '面状标识物',
        checked: false,
        isClassify: true,
        type: 'Polygon',
        commonStyle: {
            showFields: 'TYPE',
            polygonStyle: 'solid',
            color: 'rgb(147,112,219)',
            opacity: 1
        },
        typeStyle: [
            {
                value: 0,
                label: '未定义',
                showFields: 'TYPE',
                polygonStyle: 'solid',
                color: 'rgb(147,112,219)',
                opacity: 1
            },
            {
                value: 1,
                label: '人行横道',
                showFields: 'TYPE',
                polygonStyle: 'solid',
                color: 'rgb(147,112,219)',
                opacity: 1
            },
            {
                value: 2,
                label: '禁止停车区',
                showFields: 'TYPE',
                polygonStyle: 'solid',
                color: 'rgb(147,112,219)',
                opacity: 1
            },
            {
                value: 3,
                label: '减速带',
                showFields: 'TYPE',
                polygonStyle: 'solid',
                color: 'rgb(147,112,219)',
                opacity: 1
            },
            {
                value: 4,
                label: '减速警示震荡线',
                showFields: 'TYPE',
                polygonStyle: 'solid',
                color: 'rgb(147,112,219)',
                opacity: 1
            },
            {
                value: 5,
                label: '斜跨路口的人行横道',
                showFields: 'TYPE',
                polygonStyle: 'solid',
                color: 'rgb(147,112,219)',
                opacity: 1
            }
        ],
        typeStyleMap: {},
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
                key: 'TYPE',
                name: '面状标识物类型',
                type: 'AD_LANEMARK_PLG_TYPE',
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
        typeStyle: [
            {
                showFields: 'NOKEY',
                lineStyle: 'solid',
                color: 'rgb(32,52,240)',
                opacity: 1,
                arrow: false,
                point: false,
                pointEnabledStatus: true,
                arrowEnabledStatus: true,
                pointSize: 0.1
            }
        ],
        typeStyleMap: {},
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
        typeStyle: [
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
                color: 'rgb(70,109,255)',
                opacity: 1,
                arrow: false,
                point: true,
                pointEnabledStatus: true,
                arrowEnabledStatus: true,
                pointSize: 0.1
            },
            {
                value: 3,
                label: '路缘石',
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
                value: 4,
                label: '隔音墙',
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
                color: 'rgb(70,109,255)',
                opacity: 1,
                arrow: false,
                point: true,
                pointEnabledStatus: true,
                arrowEnabledStatus: true,
                pointSize: 0.1
            }
        ],
        typeStyleMap: {},
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
        typeStyle: [
            {
                value: 0,
                label: '未定义',
                showFields: 'CONT_TYPE',
                polygonStyle: 'solid',
                color: 'rgb(255,234,149)',
                opacity: 1
            },
            {
                value: 1,
                label: '最高速度限制',
                showFields: 'CONT_TYPE',
                polygonStyle: 'solid',
                color: 'rgb(255,234,149)',
                opacity: 1
            },
            {
                value: 2,
                label: '最低速度限制',
                showFields: 'CONT_TYPE',
                polygonStyle: 'solid',
                color: 'rgb(255,234,149)',
                opacity: 1
            },
            {
                value: 3,
                label: '潮汐车道时间限制',
                showFields: 'CONT_TYPE',
                polygonStyle: 'solid',
                color: 'rgb(255,234,149)',
                opacity: 1
            },
            {
                value: 4,
                label: '禁止停车时间限制',
                showFields: 'CONT_TYPE',
                polygonStyle: 'solid',
                color: 'rgb(255,234,149)',
                opacity: 1
            },
            {
                value: 5,
                label: 'HOV车道时间限制',
                showFields: 'CONT_TYPE',
                polygonStyle: 'solid',
                color: 'rgb(255,234,149)',
                opacity: 1
            },
            {
                value: 6,
                label: '公交车道时间限制',
                showFields: 'CONT_TYPE',
                polygonStyle: 'solid',
                color: 'rgb(255,234,149)',
                opacity: 1
            },
            {
                value: 99,
                label: '其他',
                showFields: 'CONT_TYPE',
                polygonStyle: 'solid',
                color: 'rgb(255,234,149)',
                opacity: 1
            }
        ],
        typeStyleMap: {},
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
                key: 'TYPE',
                name: '文字符号类型',
                type: 'AD_TEXT_TYPE',
                domType: 'RadioIconGroup'
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
        typeStyle: [
            {
                value: 0,
                label: '未定义',
                showFields: 'SIGN_STYLE',
                polygonStyle: 'solid',
                color: 'rgb(70,109,255)',
                opacity: 1
            },
            {
                value: 1,
                label: '单个标志牌',
                showFields: 'SIGN_STYLE',
                polygonStyle: 'solid',
                color: 'rgb(70,109,255)',
                opacity: 1
            },
            {
                value: 2,
                label: '组合标志牌',
                showFields: 'SIGN_STYLE',
                polygonStyle: 'solid',
                color: 'rgb(70,109,255)',
                opacity: 1
            }
        ],
        typeStyleMap: {},
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
                type: 'AD_TRAFFICSIGN_SIGN_STYLE',
                domType: 'Select'
            }
        ]
    },
    AD_LaneDivider_Pln: {
        key: 'AD_LaneDivider_Pln',
        label: '几何层：车道线线要素',
        checked: false,
        isClassify: true,
        type: 'Line',
        commonStyle: {
            showFields: 'FEAT_TYPE',
            lineStyle: 'solid',
            color: 'rgb(255,255,255)',
            opacity: 1,
            arrow: true,
            point: true,
            pointEnabledStatus: true,
            arrowEnabledStatus: true,
            pointSize: 0.1
        },
        typeStyle: [
            {
                value: 0,
                label: '未定义',
                showFields: 'FEAT_TYPE',
                lineStyle: 'solid',
                color: 'rgb(255,255,255)',
                opacity: 1,
                arrow: true,
                point: true,
                pointEnabledStatus: true,
                arrowEnabledStatus: true,
                pointSize: 0.1
            },
            {
                value: 1001,
                label: '单实线',
                showFields: 'FEAT_TYPE',
                lineStyle: 'solid',
                color: 'rgb(255,255,255)',
                opacity: 1,
                arrow: true,
                point: true,
                pointEnabledStatus: true,
                arrowEnabledStatus: true,
                pointSize: 0.1
            },
            {
                value: 1003,
                label: '双实线',
                showFields: 'FEAT_TYPE',
                lineStyle: 'solid',
                color: 'rgb(255,255,255)',
                opacity: 1,
                arrow: true,
                point: true,
                pointEnabledStatus: true,
                arrowEnabledStatus: true,
                pointSize: 0.1
            },
            {
                value: 1005,
                label: '左实右虚线',
                showFields: 'FEAT_TYPE',
                lineStyle: 'solid',
                color: 'rgb(255,255,255)',
                opacity: 1,
                arrow: true,
                point: true,
                pointEnabledStatus: true,
                arrowEnabledStatus: true,
                pointSize: 0.1
            },
            {
                value: 1006,
                label: '左虚右实线',
                showFields: 'FEAT_TYPE',
                lineStyle: 'solid',
                color: 'rgb(255,255,255)',
                opacity: 1,
                arrow: true,
                point: true,
                pointEnabledStatus: true,
                arrowEnabledStatus: true,
                pointSize: 0.1
            },
            {
                value: 1007,
                label: '可变导向车道线',
                showFields: 'FEAT_TYPE',
                lineStyle: 'solid',
                color: 'rgb(255,255,255)',
                opacity: 1,
                arrow: true,
                point: true,
                pointEnabledStatus: true,
                arrowEnabledStatus: true,
                pointSize: 0.1
            }
        ],
        typeStyleMap: {},
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
                key: 'FEAT_TYPE',
                name: '要素子类型',
                type: 'AD_LANE_DIVIDER_PLN_FEAT_TYPE',
                domType: 'RadioIconGroup'
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
        typeStyle: [
            {
                value: 0,
                label: '未定义',
                showFields: 'FEAT_TYPE',
                polygonStyle: 'solid',
                color: 'rgb(0,255,160)',
                opacity: 1
            },
            {
                value: 1002,
                label: '单虚线',
                showFields: 'FEAT_TYPE',
                polygonStyle: 'solid',
                color: 'rgb(0,255,160)',
                opacity: 1
            },

            {
                value: 1004,
                label: '双虚线',
                showFields: 'FEAT_TYPE',
                polygonStyle: 'solid',
                color: 'rgb(0,255,160)',
                opacity: 1
            },
            {
                value: 1005,
                label: '左实右虚线',
                showFields: 'FEAT_TYPE',
                polygonStyle: 'solid',
                color: 'rgb(0,255,160)',
                opacity: 1
            },
            {
                value: 1006,
                label: '左虚右实线',
                showFields: 'FEAT_TYPE',
                polygonStyle: 'solid',
                color: 'rgb(0,255,160)',
                opacity: 1
            }
        ],
        typeStyleMap: {},
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
        typeStyle: [
            {
                value: 0,
                label: '未定义',
                showFields: 'FEAT_TYPE',
                polygonStyle: 'solid',
                color: 'rgb(137,195,255)',
                opacity: 1
            },
            {
                value: 2001,
                label: '停止线',
                showFields: 'FEAT_TYPE',
                polygonStyle: 'solid',
                color: 'rgb(137,195,255)',
                opacity: 1
            },

            {
                value: 2002,
                label: '停车让行线',
                showFields: 'FEAT_TYPE',
                polygonStyle: 'solid',
                color: 'rgb(137,195,255)',
                opacity: 1
            },
            {
                value: 2003,
                label: '减速让行线',
                showFields: 'FEAT_TYPE',
                polygonStyle: 'solid',
                color: 'rgb(137,195,255)',
                opacity: 1
            }
        ],
        typeStyleMap: {},
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
    AD_Arrow_Geo: {
        key: 'AD_Arrow_Geo',
        label: '几何层：箭头',
        checked: false,
        isClassify: true,
        type: 'Polygon',
        commonStyle: {
            showFields: 'FEAT_TYPE',
            polygonStyle: 'solid',
            color: 'rgb(250,220,70)',
            opacity: 1
        },
        typeStyle: [
            {
                value: 0,
                label: '未定义',
                showFields: 'FEAT_TYPE',
                polygonStyle: 'solid',
                color: 'rgb(250,220,70)',
                opacity: 1
            },
            {
                value: 3001,
                label: '直行箭头',
                showFields: 'FEAT_TYPE',
                polygonStyle: 'solid',
                color: 'rgb(250,220,70)',
                opacity: 1
            },

            {
                value: 3002,
                label: '左转箭头',
                showFields: 'FEAT_TYPE',
                polygonStyle: 'solid',
                color: 'rgb(250,220,70)',
                opacity: 1
            },
            {
                value: 3003,
                label: '右转箭头',
                showFields: 'FEAT_TYPE',
                polygonStyle: 'solid',
                color: 'rgb(250,220,70)',
                opacity: 1
            },
            {
                value: 3004,
                label: '直行左转箭头',
                showFields: 'FEAT_TYPE',
                polygonStyle: 'solid',
                color: 'rgb(250,220,70)',
                opacity: 1
            },
            {
                value: 3005,
                label: '直行右转箭头',
                showFields: 'FEAT_TYPE',
                polygonStyle: 'solid',
                color: 'rgb(250,220,70)',
                opacity: 1
            },
            {
                value: 3006,
                label: '左转右转箭头',
                showFields: 'FEAT_TYPE',
                polygonStyle: 'solid',
                color: 'rgb(250,220,70)',
                opacity: 1
            },
            {
                value: 3007,
                label: '直行左转右转箭头',
                showFields: 'FEAT_TYPE',
                polygonStyle: 'solid',
                color: 'rgb(250,220,70)',
                opacity: 1
            },
            {
                value: 3008,
                label: '掉头箭头',
                showFields: 'FEAT_TYPE',
                polygonStyle: 'solid',
                color: 'rgb(250,220,70)',
                opacity: 1
            },
            {
                value: 3009,
                label: '左转掉头箭头',
                showFields: 'FEAT_TYPE',
                polygonStyle: 'solid',
                color: 'rgb(250,220,70)',
                opacity: 1
            },
            {
                value: 3010,
                label: '右转掉头箭头',
                showFields: 'FEAT_TYPE',
                polygonStyle: 'solid',
                color: 'rgb(250,220,70)',
                opacity: 1
            },
            {
                value: 3011,
                label: '禁止标记箭头',
                showFields: 'FEAT_TYPE',
                polygonStyle: 'solid',
                color: 'rgb(250,220,70)',
                opacity: 1
            },
            {
                value: 3012,
                label: '向左合流箭头',
                showFields: 'FEAT_TYPE',
                polygonStyle: 'solid',
                color: 'rgb(250,220,70)',
                opacity: 1
            },
            {
                value: 3013,
                label: '向右合流箭头',
                showFields: 'FEAT_TYPE',
                polygonStyle: 'solid',
                color: 'rgb(250,220,70)',
                opacity: 1
            },
            {
                value: 3014,
                label: '直行和掉头箭头',
                showFields: 'FEAT_TYPE',
                polygonStyle: 'solid',
                color: 'rgb(250,220,70)',
                opacity: 1
            },
            {
                value: 3015,
                label: '直行左转掉头箭头',
                showFields: 'FEAT_TYPE',
                polygonStyle: 'solid',
                color: 'rgb(250,220,70)',
                opacity: 1
            },
            {
                value: 3016,
                label: '直行右转掉头箭头',
                showFields: 'FEAT_TYPE',
                polygonStyle: 'solid',
                color: 'rgb(250,220,70)',
                opacity: 1
            },
            {
                value: 3017,
                label: '直行左弯',
                showFields: 'FEAT_TYPE',
                polygonStyle: 'solid',
                color: 'rgb(250,220,70)',
                opacity: 1
            },
            {
                value: 3018,
                label: '直行右弯',
                showFields: 'FEAT_TYPE',
                polygonStyle: 'solid',
                color: 'rgb(250,220,70)',
                opacity: 1
            }
        ],
        typeStyleMap: {},
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
                type: 'AD_ARROW_GEO_FEAT_TYPE',
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
        typeStyle: [
            {
                value: 0,
                label: '未定义',
                showFields: 'FEAT_TYPE',
                polygonStyle: 'solid',
                color: 'rgb(147,112,219)',
                opacity: 1
            },
            {
                value: 4001,
                label: '减速警示线',
                showFields: 'FEAT_TYPE',
                polygonStyle: 'solid',
                color: 'rgb(147,112,219)',
                opacity: 1
            },

            {
                value: 4002,
                label: '减速带',
                showFields: 'FEAT_TYPE',
                polygonStyle: 'solid',
                color: 'rgb(147,112,219)',
                opacity: 1
            },
            {
                value: 9901,
                label: '人行横道',
                showFields: 'FEAT_TYPE',
                polygonStyle: 'solid',
                color: 'rgb(147,112,219)',
                opacity: 1
            },
            {
                value: 9902,
                label: '禁止停车区',
                showFields: 'FEAT_TYPE',
                polygonStyle: 'solid',
                color: 'rgb(147,112,219)',
                opacity: 1
            },
            {
                value: 9903,
                label: '导流区',
                showFields: 'FEAT_TYPE',
                polygonStyle: 'solid',
                color: 'rgb(147,112,219)',
                opacity: 1
            },
            {
                value: 9904,
                label: '路口内中心圈',
                showFields: 'FEAT_TYPE',
                polygonStyle: 'solid',
                color: 'rgb(147,112,219)',
                opacity: 1
            },
            {
                value: 9905,
                label: '车距确认线',
                showFields: 'FEAT_TYPE',
                polygonStyle: 'solid',
                color: 'rgb(147,112,219)',
                opacity: 1
            },
            {
                value: 9906,
                label: '地面文字数字',
                showFields: 'FEAT_TYPE',
                polygonStyle: 'solid',
                color: 'rgb(147,112,219)',
                opacity: 1
            },
            {
                value: 9907,
                label: '地面符号',
                showFields: 'FEAT_TYPE',
                polygonStyle: 'solid',
                color: 'rgb(147,112,219)',
                opacity: 1
            }
        ],
        typeStyleMap: {},
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
            color: 'rgb(32,52,240)',
            opacity: 1,
            arrow: false,
            point: false,
            pointEnabledStatus: true,
            arrowEnabledStatus: true,
            pointSize: 0.1
        },
        typeStyle: [
            {
                showFields: 'NOKEY',
                lineStyle: 'solid',
                color: 'rgb(32,52,240)',
                opacity: 1,
                arrow: false,
                point: false,
                pointEnabledStatus: true,
                arrowEnabledStatus: true,
                pointSize: 0.1
            }
        ],
        typeStyleMap: {},
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
    },
    AD_TrafficSign_Geo: {
        key: 'AD_TrafficSign_Geo',
        label: ' 几何层：交通标志牌',
        checked: false,
        isClassify: true,
        type: 'Polygon',
        commonStyle: {
            showFields: 'FEAT_TYPE',
            polygonStyle: 'solid',
            color: 'rgb(255,255,255)',
            opacity: 1
        },
        typeStyle: [
            {
                value: 0,
                label: '其他警告标志',
                showFields: 'FEAT_TYPE',
                polygonStyle: 'solid',
                color: 'rgb(70,109,255)',
                opacity: 1
            },
            {
                value: 2100,
                label: '建议速度',
                showFields: 'FEAT_TYPE',
                polygonStyle: 'solid',
                color: 'rgb(70,109,255)',
                opacity: 1
            },

            {
                value: 2101,
                label: '其他禁令标志',
                showFields: 'FEAT_TYPE',
                polygonStyle: 'solid',
                color: 'rgb(70,109,255)',
                opacity: 1
            },
            {
                value: 2201,
                label: '停车让行',
                showFields: 'FEAT_TYPE',
                polygonStyle: 'solid',
                color: 'rgb(70,109,255)',
                opacity: 1
            },
            {
                value: 2202,
                label: '减速让行',
                showFields: 'FEAT_TYPE',
                polygonStyle: 'solid',
                color: 'rgb(70,109,255)',
                opacity: 1
            },
            {
                value: 2203,
                label: '会车让行',
                showFields: 'FEAT_TYPE',
                polygonStyle: 'solid',
                color: 'rgb(70,109,255)',
                opacity: 1
            },
            {
                value: 2204,
                label: '禁止通行',
                showFields: 'FEAT_TYPE',
                polygonStyle: 'solid',
                color: 'rgb(70,109,255)',
                opacity: 1
            },
            {
                value: 2205,
                label: '禁止驶入',
                showFields: 'FEAT_TYPE',
                polygonStyle: 'solid',
                color: 'rgb(70,109,255)',
                opacity: 1
            },
            {
                value: 2206,
                label: '禁止机动车驶入',
                showFields: 'FEAT_TYPE',
                polygonStyle: 'solid',
                color: 'rgb(70,109,255)',
                opacity: 1
            },
            {
                value: 2207,
                label: '禁止向左转弯',
                showFields: 'FEAT_TYPE',
                polygonStyle: 'solid',
                color: 'rgb(70,109,255)',
                opacity: 1
            },
            {
                value: 2208,
                label: '禁止向右转弯',
                showFields: 'FEAT_TYPE',
                polygonStyle: 'solid',
                color: 'rgb(70,109,255)',
                opacity: 1
            },
            {
                value: 2209,
                label: '禁止直行',
                showFields: 'FEAT_TYPE',
                polygonStyle: 'solid',
                color: 'rgb(70,109,255)',
                opacity: 1
            },
            {
                value: 2210,
                label: '禁止向左向右转弯',
                showFields: 'FEAT_TYPE',
                polygonStyle: 'solid',
                color: 'rgb(70,109,255)',
                opacity: 1
            },
            {
                value: 2211,
                label: '禁止直行和向左转弯',
                showFields: 'FEAT_TYPE',
                polygonStyle: 'solid',
                color: 'rgb(70,109,255)',
                opacity: 1
            },
            {
                value: 2212,
                label: '禁止直行和向右转弯',
                showFields: 'FEAT_TYPE',
                polygonStyle: 'solid',
                color: 'rgb(70,109,255)',
                opacity: 1
            },
            {
                value: 2213,
                label: '禁止掉头',
                showFields: 'FEAT_TYPE',
                polygonStyle: 'solid',
                color: 'rgb(70,109,255)',
                opacity: 1
            },
            {
                value: 2214,
                label: '禁止超车',
                showFields: 'FEAT_TYPE',
                polygonStyle: 'solid',
                color: 'rgb(70,109,255)',
                opacity: 1
            },
            {
                value: 2215,
                label: '解除禁止超车',
                showFields: 'FEAT_TYPE',
                polygonStyle: 'solid',
                color: 'rgb(70,109,255)',
                opacity: 1
            },
            {
                value: 2216,
                label: '禁止停车',
                showFields: 'FEAT_TYPE',
                polygonStyle: 'solid',
                color: 'rgb(70,109,255)',
                opacity: 1
            },
            {
                value: 2217,
                label: '禁止长时停车',
                showFields: 'FEAT_TYPE',
                polygonStyle: 'solid',
                color: 'rgb(70,109,255)',
                opacity: 1
            },
            {
                value: 2219,
                label: '限制速度',
                showFields: 'FEAT_TYPE',
                polygonStyle: 'solid',
                color: 'rgb(70,109,255)',
                opacity: 1
            },
            {
                value: 2220,
                label: '解除限制速度',
                showFields: 'FEAT_TYPE',
                polygonStyle: 'solid',
                color: 'rgb(70,109,255)',
                opacity: 1
            },
            {
                value: 2223,
                label: '区域禁止-禁止长时停车',
                showFields: 'FEAT_TYPE',
                polygonStyle: 'solid',
                color: 'rgb(70,109,255)',
                opacity: 1
            },
            {
                value: 2224,
                label: '区域禁止解除-解除禁止长时停车',
                showFields: 'FEAT_TYPE',
                polygonStyle: 'solid',
                color: 'rgb(70,109,255)',
                opacity: 1
            },
            {
                value: 2225,
                label: '区域禁止-禁止停车',
                showFields: 'FEAT_TYPE',
                polygonStyle: 'solid',
                color: 'rgb(70,109,255)',
                opacity: 1
            },
            {
                value: 2226,
                label: '区域禁止解除-解除禁止停车',
                showFields: 'FEAT_TYPE',
                polygonStyle: 'solid',
                color: 'rgb(70,109,255)',
                opacity: 1
            },
            {
                value: 2227,
                label: '区域禁止-速度限制',
                showFields: 'FEAT_TYPE',
                polygonStyle: 'solid',
                color: 'rgb(70,109,255)',
                opacity: 1
            },
            {
                value: 2228,
                label: '区域禁止解除-解除速度限制',
                showFields: 'FEAT_TYPE',
                polygonStyle: 'solid',
                color: 'rgb(70,109,255)',
                opacity: 1
            },
            {
                value: 2200,
                label: '其他指示类标志',
                showFields: 'FEAT_TYPE',
                polygonStyle: 'solid',
                color: 'rgb(70,109,255)',
                opacity: 1
            },
            {
                value: 2300,
                label: '最低限速',
                showFields: 'FEAT_TYPE',
                polygonStyle: 'solid',
                color: 'rgb(70,109,255)',
                opacity: 1
            },
            {
                value: 2314,
                label: '车道行驶方向-直行',
                showFields: 'FEAT_TYPE',
                polygonStyle: 'solid',
                color: 'rgb(70,109,255)',
                opacity: 1
            },
            {
                value: 2318,
                label: '允许掉头',
                showFields: 'FEAT_TYPE',
                polygonStyle: 'solid',
                color: 'rgb(70,109,255)',
                opacity: 1
            },
            {
                value: 2321,
                label: '车道行驶方向-左转',
                showFields: 'FEAT_TYPE',
                polygonStyle: 'solid',
                color: 'rgb(70,109,255)',
                opacity: 1
            },
            {
                value: 2322,
                label: '车道行驶方向-右转',
                showFields: 'FEAT_TYPE',
                polygonStyle: 'solid',
                color: 'rgb(70,109,255)',
                opacity: 1
            },
            {
                value: 2323,
                label: '车道行驶方向-直行和左转',
                showFields: 'FEAT_TYPE',
                polygonStyle: 'solid',
                color: 'rgb(70,109,255)',
                opacity: 1
            },
            {
                value: 2324,
                label: '车道行驶方向-直行和右转',
                showFields: 'FEAT_TYPE',
                polygonStyle: 'solid',
                color: 'rgb(70,109,255)',
                opacity: 1
            },
            {
                value: 2325,
                label: '车道行驶方向-左转和掉头',
                showFields: 'FEAT_TYPE',
                polygonStyle: 'solid',
                color: 'rgb(70,109,255)',
                opacity: 1
            },
            {
                value: 2326,
                label: '车道行驶方向-掉头',
                showFields: 'FEAT_TYPE',
                polygonStyle: 'solid',
                color: 'rgb(70,109,255)',
                opacity: 1
            },
            {
                value: 2327,
                label: '车道行驶方向-其他',
                showFields: 'FEAT_TYPE',
                polygonStyle: 'solid',
                color: 'rgb(70,109,255)',
                opacity: 1
            },
            {
                value: 2328,
                label: '区间测速起点',
                showFields: 'FEAT_TYPE',
                polygonStyle: 'solid',
                color: 'rgb(70,109,255)',
                opacity: 1
            },
            {
                value: 2401,
                label: '区间测速终点',
                showFields: 'FEAT_TYPE',
                polygonStyle: 'solid',
                color: 'rgb(70,109,255)',
                opacity: 1
            },
            {
                value: 2402,
                label: '区间测速起点和距离',
                showFields: 'FEAT_TYPE',
                polygonStyle: 'solid',
                color: 'rgb(70,109,255)',
                opacity: 1
            },
            {
                value: 2403,
                label: '表示时间标志',
                showFields: 'FEAT_TYPE',
                polygonStyle: 'solid',
                color: 'rgb(70,109,255)',
                opacity: 1
            },
            {
                value: 2404,
                label: '特殊天气辅助标志',
                showFields: 'FEAT_TYPE',
                polygonStyle: 'solid',
                color: 'rgb(70,109,255)',
                opacity: 1
            },
            {
                value: 2405,
                label: '特殊路段辅助标志',
                showFields: 'FEAT_TYPE',
                polygonStyle: 'solid',
                color: 'rgb(70,109,255)',
                opacity: 1
            },
            {
                value: 2406,
                label: '其他标志牌',
                showFields: 'FEAT_TYPE',
                polygonStyle: 'solid',
                color: 'rgb(70,109,255)',
                opacity: 1
            },
            {
                value: 2500,
                label: '动态限速标志',
                showFields: 'FEAT_TYPE',
                polygonStyle: 'solid',
                color: 'rgb(70,109,255)',
                opacity: 1
            },
            {
                value: 2600,
                label: '其他电子标志牌',
                showFields: 'FEAT_TYPE',
                polygonStyle: 'solid',
                color: 'rgb(70,109,255)',
                opacity: 1
            },
            {
                value: 2601,
                label: '未定义',
                showFields: 'FEAT_TYPE',
                polygonStyle: 'solid',
                color: 'rgb(70,109,255)',
                opacity: 1
            }
        ],
        typeStyleMap: {},
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
                type: 'AD_TRAFFICSIGN_GEO_FEAT_TYPE',
                domType: 'RadioIconGroup'
            }
        ]
    },
    AD_TrafficLight_Geo: {
        key: 'AD_TrafficLight_Geo',
        label: '几何层：交通信号灯',
        checked: false,
        isClassify: true,
        type: 'Polygon',
        commonStyle: {
            showFields: 'FEAT_TYPE',
            polygonStyle: 'solid',
            color: 'rgb(231,120,0)',
            opacity: 1
        },
        typeStyle: [
            {
                value: 0,
                label: '未定义',
                showFields: 'FEAT_TYPE',
                polygonStyle: 'solid',
                color: 'rgb(231,120,0)',
                opacity: 1
            },
            {
                value: 3001,
                label: '普通交通信号灯',
                showFields: 'FEAT_TYPE',
                polygonStyle: 'solid',
                color: 'rgb(231,120,0)',
                opacity: 1
            },

            {
                value: 3002,
                label: '方向指示信号灯',
                showFields: 'FEAT_TYPE',
                polygonStyle: 'solid',
                color: 'rgb(231,120,0)',
                opacity: 1
            },
            {
                value: 3003,
                label: '铁路平交路口信号灯',
                showFields: 'FEAT_TYPE',
                polygonStyle: 'solid',
                color: 'rgb(231,120,0)',
                opacity: 1
            },
            {
                value: 3099,
                label: '其他',
                showFields: 'FEAT_TYPE',
                polygonStyle: 'solid',
                color: 'rgb(231,120,0)',
                opacity: 1
            }
        ],
        typeStyleMap: {},
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
                type: 'AD_TRAFFICLIGHT_GEO_FEAT_TYPE',
                domType: 'RadioIconGroup'
            }
        ]
    }
};

const CHECK_VECTOR_CONFIG_MAP = {
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
        typeStyle: [
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
        typeStyle: [
            {
                value: 0,
                label: '未定义',
                color: 'rgb(255,255,255)',
                showFields: 'RD_LINE',
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
                color: 'rgb(186,38,255)',
                showFields: 'RD_LINE',
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
                color: 'rgb(255,255,255)',
                showFields: 'RD_LINE',
                lineStyle: 'solid',
                opacity: 1,
                arrow: true,
                point: true,
                pointEnabledStatus: true,
                arrowEnabledStatus: true,
                pointSize: 0.1
            }
        ],
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
                    label: '单实线',
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
                    value: 2,
                    label: '单虚线',
                    showFields: 'TYPE',
                    color: 'rgb(255,255,255)',
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
                    value: 4,
                    label: '双虚线',
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
                    value: 5,
                    label: '左实右虚',
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
                    value: 6,
                    label: '左虚右实',
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
                    value: 7,
                    label: '短粗虚线',
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
                    value: 8,
                    label: '导流线',
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
                    value: 11,
                    label: '防护栏',
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
                    value: 12,
                    label: '隧道墙',
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
                    value: 13,
                    label: '路缘石',
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
                    value: 14,
                    label: '自然边界',
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
                    value: 15,
                    label: '施工边界',
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
                    value: 16,
                    label: '路中隔离带',
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
                    value: 17,
                    label: '待转待行区车道线',
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
                    value: 18,
                    label: '可变导向车道线',
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
                    value: 19,
                    label: '路口内虚拟车道线',
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
                    value: 20,
                    label: '其他虚拟车道线',
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
                    value: 99,
                    label: '其他',
                    showFields: 'TYPE',
                    color: 'rgb(255,255,255)',
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
                key: 'LANESTATUS',
                name: '车道通行状态',
                type: 'AD_LANE_DIVIDER_LANESTATUS',
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
        typeStyle: [
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
                label: '人行道',
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
                label: '检查站车道',
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
                value: 14,
                label: '隔离带车道',
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
                value: 17,
                label: '危险用品专用车道',
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
                value: 18,
                label: '爬坡车道',
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
                value: 20,
                label: '海关监管车道',
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
                value: 27,
                label: '超车道',
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
                label: '复合车道',
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
        ],
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
                    label: '人行道',
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
                    label: '检查站车道',
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
                    value: 14,
                    label: '隔离带车道',
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
                    value: 17,
                    label: '危险用品专用车道',
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
                    value: 18,
                    label: '爬坡车道',
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
                    value: 20,
                    label: '海关监管车道',
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
                    value: 27,
                    label: '超车道',
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
                    label: '复合车道',
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
        typeStyle: [
            {
                value: 0,
                label: '未定义',
                color: 'rgb(102,255,102)',
                opacity: 1,
                size: 80,
                showFields: 'TYPE',
                radius: 0.15,
                pointStyle: 'dianyaosu'
            },
            {
                value: 1,
                label: '道路左侧出口',
                color: 'rgb(102,255,102)',
                opacity: 1,
                size: 80,
                showFields: 'TYPE',
                radius: 0.15,
                pointStyle: 'dianyaosu'
            },
            {
                value: 2,
                label: '道路右侧出口',
                color: 'rgb(102,255,102)',
                opacity: 1,
                size: 80,
                showFields: 'TYPE',
                radius: 0.15,
                pointStyle: 'dianyaosu'
            },
            {
                value: 3,
                label: '道路分离点',
                color: 'rgb(102,255,102)',
                opacity: 1,
                size: 80,
                showFields: 'TYPE',
                radius: 0.15,
                pointStyle: 'dianyaosu'
            },
            {
                value: 4,
                label: '道路合并点',
                color: 'rgb(102,255,102)',
                opacity: 1,
                size: 80,
                showFields: 'TYPE',
                radius: 0.15,
                pointStyle: 'dianyaosu'
            },
            {
                value: 5,
                label: '车道合并点',
                color: 'rgb(102,255,102)',
                opacity: 1,
                size: 80,
                showFields: 'TYPE',
                radius: 0.15,
                pointStyle: 'dianyaosu'
            },

            {
                value: 21,
                label: '服务区道路开始位置',
                color: 'rgb(102,255,102)',
                opacity: 1,
                size: 80,
                showFields: 'TYPE',
                radius: 0.15,
                pointStyle: 'dianyaosu'
            },
            {
                value: 22,
                label: '服务区道路结束位置',
                color: 'rgb(102,255,102)',
                opacity: 1,
                size: 80,
                showFields: 'TYPE',
                radius: 0.15,
                pointStyle: 'dianyaosu'
            },

            {
                value: 41,
                label: '点云不清晰起点',
                color: 'rgb(102,255,102)',
                opacity: 1,
                size: 80,
                showFields: 'TYPE',
                radius: 0.15,
                pointStyle: 'dianyaosu'
            },
            {
                value: 42,
                label: '点云不清晰结束点',
                color: 'rgb(102,255,102)',
                opacity: 1,
                size: 80,
                showFields: 'TYPE',
                radius: 0.15,
                pointStyle: 'dianyaosu'
            },
            {
                value: 43,
                label: '点云遮挡起点',
                color: 'rgb(102,255,102)',
                opacity: 1,
                size: 80,
                showFields: 'TYPE',
                radius: 0.15,
                pointStyle: 'dianyaosu'
            },
            {
                value: 44,
                label: '点云遮挡结束',
                color: 'rgb(102,255,102)',
                opacity: 1,
                size: 80,
                showFields: 'TYPE',
                radius: 0.15,
                pointStyle: 'dianyaosu'
            },
            {
                value: 45,
                label: '精度误差起始',
                color: 'rgb(102,255,102)',
                opacity: 1,
                size: 80,
                showFields: 'TYPE',
                radius: 0.15,
                pointStyle: 'dianyaosu'
            },
            {
                value: 46,
                label: '精度误差结束',
                color: 'rgb(102,255,102)',
                opacity: 1,
                size: 80,
                showFields: 'TYPE',
                radius: 0.15,
                pointStyle: 'dianyaosu'
            },
            {
                value: 47,
                label: '道路施工起始',
                color: 'rgb(102,255,102)',
                opacity: 1,
                size: 80,
                showFields: 'TYPE',
                radius: 0.15,
                pointStyle: 'dianyaosu'
            },
            {
                value: 48,
                label: '道路施工结束',
                color: 'rgb(102,255,102)',
                opacity: 1,
                size: 80,
                showFields: 'TYPE',
                radius: 0.15,
                pointStyle: 'dianyaosu'
            }
        ],
        typeStyleMap: {},
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
        typeStyle: [
            {
                value: '0',
                label: '未定义',
                showFields: 'ARR_DIRECT',
                polygonStyle: 'solid',
                color: 'rgb(255,255,255)',
                opacity: 1
            },
            {
                value: 'A',
                label: '直行',
                showFields: 'ARR_DIRECT',
                polygonStyle: 'solid',
                color: 'rgb(255,255,255)',
                opacity: 1
            },
            {
                value: 'B',
                label: '左转',
                showFields: 'ARR_DIRECT',
                polygonStyle: 'solid',
                color: 'rgb(255,255,255)',
                opacity: 1
            },
            {
                value: 'C',
                label: '右转',
                showFields: 'ARR_DIRECT',
                polygonStyle: 'solid',
                color: 'rgb(255,255,255)',
                opacity: 1
            },
            {
                value: 'D',
                label: '左掉头',
                showFields: 'ARR_DIRECT',
                polygonStyle: 'solid',
                color: 'rgb(255,255,255)',
                opacity: 1
            },
            {
                value: 'E',
                label: '右掉头',
                showFields: 'ARR_DIRECT',
                polygonStyle: 'solid',
                color: 'rgb(255,255,255)',
                opacity: 1
            },
            {
                value: 'F',
                label: '左弯或需向左合流',
                showFields: 'ARR_DIRECT',
                polygonStyle: 'solid',
                color: 'rgb(255,255,255)',
                opacity: 1
            },
            {
                value: 'G',
                label: '右弯或需向右合流',
                showFields: 'ARR_DIRECT',
                polygonStyle: 'solid',
                color: 'rgb(255,255,255)',
                opacity: 1
            },
            {
                value: 'H',
                label: '左后方转弯',
                showFields: 'ARR_DIRECT',
                polygonStyle: 'solid',
                color: 'rgb(255,255,255)',
                opacity: 1
            },
            {
                value: 'I',
                label: '右后方转弯',
                showFields: 'ARR_DIRECT',
                polygonStyle: 'solid',
                color: 'rgb(255,255,255)',
                opacity: 1
            },
            {
                value: 'J',
                label: '禁止左掉头',
                showFields: 'ARR_DIRECT',
                polygonStyle: 'solid',
                color: 'rgb(255,255,255)',
                opacity: 1
            },
            {
                value: 'K',
                label: '禁止右掉头',
                showFields: 'ARR_DIRECT',
                polygonStyle: 'solid',
                color: 'rgb(255,255,255)',
                opacity: 1
            },
            {
                value: 'L',
                label: '禁止左转',
                showFields: 'ARR_DIRECT',
                polygonStyle: 'solid',
                color: 'rgb(255,255,255)',
                opacity: 1
            },
            {
                value: 'M',
                label: '禁止右转',
                showFields: 'ARR_DIRECT',
                polygonStyle: 'solid',
                color: 'rgb(255,255,255)',
                opacity: 1
            },
            {
                value: 'X',
                label: '待确认',
                showFields: 'ARR_DIRECT',
                polygonStyle: 'solid',
                color: 'rgb(255,255,255)',
                opacity: 1
            }
        ],
        typeStyleMap: {},
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
            color: 'rgb(137,195,255)',
            opacity: 1,
            arrow: false,
            point: false,
            pointEnabledStatus: true,
            arrowEnabledStatus: true,
            pointSize: 0.1
        },
        typeStyle: [
            {
                value: 0,
                label: '未定义',
                showFields: 'TYPE',
                lineStyle: 'solid',
                color: 'rgb(137,195,255)',
                opacity: 1,
                arrow: false,
                point: false,
                pointEnabledStatus: true,
                arrowEnabledStatus: true,
                pointSize: 0.1
            },
            {
                value: 1,
                label: '停止线',
                showFields: 'TYPE',
                lineStyle: 'solid',
                color: 'rgb(137,195,255)',
                opacity: 1,
                arrow: false,
                point: false,
                pointEnabledStatus: true,
                arrowEnabledStatus: true,
                pointSize: 0.1
            },
            {
                value: 2,
                label: '停车让行线',
                showFields: 'TYPE',
                lineStyle: 'solid',
                color: 'rgb(137,195,255)',
                opacity: 1,
                arrow: false,
                point: false,
                pointEnabledStatus: true,
                arrowEnabledStatus: true,
                pointSize: 0.1
            },
            {
                value: 3,
                label: '减速让行线',
                showFields: 'TYPE',
                lineStyle: 'solid',
                color: 'rgb(137,195,255)',
                opacity: 1,
                arrow: false,
                point: false,
                pointEnabledStatus: true,
                arrowEnabledStatus: true,
                pointSize: 0.1
            }
        ],
        typeStyleMap: {},
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
    AD_LaneMark_Plg: {
        key: 'AD_LaneMark_Plg',
        label: '面状标识物',
        checked: false,
        isClassify: true,
        type: 'Polygon',
        commonStyle: {
            showFields: 'TYPE',
            polygonStyle: 'solid',
            color: 'rgb(147,112,219)',
            opacity: 1
        },
        typeStyle: [
            {
                value: 0,
                label: '未定义',
                showFields: 'TYPE',
                polygonStyle: 'solid',
                color: 'rgb(147,112,219)',
                opacity: 1
            },
            {
                value: 1,
                label: '人行横道',
                showFields: 'TYPE',
                polygonStyle: 'solid',
                color: 'rgb(147,112,219)',
                opacity: 1
            },
            {
                value: 2,
                label: '禁止停车区',
                showFields: 'TYPE',
                polygonStyle: 'solid',
                color: 'rgb(147,112,219)',
                opacity: 1
            },
            {
                value: 3,
                label: '减速带',
                showFields: 'TYPE',
                polygonStyle: 'solid',
                color: 'rgb(147,112,219)',
                opacity: 1
            },
            {
                value: 4,
                label: '减速警示震荡线',
                showFields: 'TYPE',
                polygonStyle: 'solid',
                color: 'rgb(147,112,219)',
                opacity: 1
            },
            {
                value: 5,
                label: '斜跨路口的人行横道',
                showFields: 'TYPE',
                polygonStyle: 'solid',
                color: 'rgb(147,112,219)',
                opacity: 1
            }
        ],
        typeStyleMap: {},
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
                key: 'TYPE',
                name: '面状标识物类型',
                type: 'AD_LANEMARK_PLG_TYPE',
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
        typeStyle: [
            {
                showFields: 'NOKEY',
                lineStyle: 'solid',
                color: 'rgb(32,52,240)',
                opacity: 1,
                arrow: false,
                point: false,
                pointEnabledStatus: true,
                arrowEnabledStatus: true,
                pointSize: 0.1
            }
        ],
        typeStyleMap: {},
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
        typeStyle: [
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
                color: 'rgb(70,109,255)',
                opacity: 1,
                arrow: false,
                point: true,
                pointEnabledStatus: true,
                arrowEnabledStatus: true,
                pointSize: 0.1
            },
            {
                value: 3,
                label: '路缘石',
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
                value: 4,
                label: '隔音墙',
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
                color: 'rgb(70,109,255)',
                opacity: 1,
                arrow: false,
                point: true,
                pointEnabledStatus: true,
                arrowEnabledStatus: true,
                pointSize: 0.1
            }
        ],
        typeStyleMap: {},
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
        typeStyle: [
            {
                value: 0,
                label: '未定义',
                showFields: 'CONT_TYPE',
                polygonStyle: 'solid',
                color: 'rgb(255,234,149)',
                opacity: 1
            },
            {
                value: 1,
                label: '最高速度限制',
                showFields: 'CONT_TYPE',
                polygonStyle: 'solid',
                color: 'rgb(255,234,149)',
                opacity: 1
            },
            {
                value: 2,
                label: '最低速度限制',
                showFields: 'CONT_TYPE',
                polygonStyle: 'solid',
                color: 'rgb(255,234,149)',
                opacity: 1
            },
            {
                value: 3,
                label: '潮汐车道时间限制',
                showFields: 'CONT_TYPE',
                polygonStyle: 'solid',
                color: 'rgb(255,234,149)',
                opacity: 1
            },
            {
                value: 4,
                label: '禁止停车时间限制',
                showFields: 'CONT_TYPE',
                polygonStyle: 'solid',
                color: 'rgb(255,234,149)',
                opacity: 1
            },
            {
                value: 5,
                label: 'HOV车道时间限制',
                showFields: 'CONT_TYPE',
                polygonStyle: 'solid',
                color: 'rgb(255,234,149)',
                opacity: 1
            },
            {
                value: 6,
                label: '公交车道时间限制',
                showFields: 'CONT_TYPE',
                polygonStyle: 'solid',
                color: 'rgb(255,234,149)',
                opacity: 1
            },
            {
                value: 99,
                label: '其他',
                showFields: 'CONT_TYPE',
                polygonStyle: 'solid',
                color: 'rgb(255,234,149)',
                opacity: 1
            }
        ],
        typeStyleMap: {},
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
        typeStyle: [
            {
                value: 0,
                label: '未定义',
                showFields: 'SIGN_STYLE',
                polygonStyle: 'solid',
                color: 'rgb(70,109,255)',
                opacity: 1
            },
            {
                value: 1,
                label: '单个标志牌',
                showFields: 'SIGN_STYLE',
                polygonStyle: 'solid',
                color: 'rgb(70,109,255)',
                opacity: 1
            },
            {
                value: 2,
                label: '组合标志牌',
                showFields: 'SIGN_STYLE',
                polygonStyle: 'solid',
                color: 'rgb(70,109,255)',
                opacity: 1
            }
        ],
        typeStyleMap: {},
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
                type: 'AD_TRAFFICSIGN_SIGN_STYLE',
                domType: 'Select'
            }
        ]
    },
    AD_LaneDivider_Pln: {
        key: 'AD_LaneDivider_Pln',
        label: '几何层：车道线线要素',
        checked: false,
        isClassify: true,
        type: 'Line',
        commonStyle: {
            showFields: 'FEAT_TYPE',
            lineStyle: 'solid',
            color: 'rgb(255,255,255)',
            opacity: 1,
            arrow: true,
            point: true,
            pointEnabledStatus: true,
            arrowEnabledStatus: true,
            pointSize: 0.1
        },
        typeStyle: [
            {
                value: 0,
                label: '未定义',
                showFields: 'FEAT_TYPE',
                lineStyle: 'solid',
                color: 'rgb(255,255,255)',
                opacity: 1,
                arrow: true,
                point: true,
                pointEnabledStatus: true,
                arrowEnabledStatus: true,
                pointSize: 0.1
            },
            {
                value: 1001,
                label: '单实线',
                showFields: 'FEAT_TYPE',
                lineStyle: 'solid',
                color: 'rgb(255,255,255)',
                opacity: 1,
                arrow: true,
                point: true,
                pointEnabledStatus: true,
                arrowEnabledStatus: true,
                pointSize: 0.1
            },
            {
                value: 1003,
                label: '双实线',
                showFields: 'FEAT_TYPE',
                lineStyle: 'solid',
                color: 'rgb(255,255,255)',
                opacity: 1,
                arrow: true,
                point: true,
                pointEnabledStatus: true,
                arrowEnabledStatus: true,
                pointSize: 0.1
            },
            {
                value: 1005,
                label: '左实右虚线',
                showFields: 'FEAT_TYPE',
                lineStyle: 'solid',
                color: 'rgb(255,255,255)',
                opacity: 1,
                arrow: true,
                point: true,
                pointEnabledStatus: true,
                arrowEnabledStatus: true,
                pointSize: 0.1
            },
            {
                value: 1006,
                label: '左虚右实线',
                showFields: 'FEAT_TYPE',
                lineStyle: 'solid',
                color: 'rgb(255,255,255)',
                opacity: 1,
                arrow: true,
                point: true,
                pointEnabledStatus: true,
                arrowEnabledStatus: true,
                pointSize: 0.1
            },
            {
                value: 1007,
                label: '可变导向车道线',
                showFields: 'FEAT_TYPE',
                lineStyle: 'solid',
                color: 'rgb(255,255,255)',
                opacity: 1,
                arrow: true,
                point: true,
                pointEnabledStatus: true,
                arrowEnabledStatus: true,
                pointSize: 0.1
            }
        ],
        typeStyleMap: {},
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
                key: 'FEAT_TYPE',
                name: '要素子类型',
                type: 'AD_LANE_DIVIDER_PLN_FEAT_TYPE',
                domType: 'RadioIconGroup'
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
        typeStyle: [
            {
                value: 0,
                label: '未定义',
                showFields: 'FEAT_TYPE',
                polygonStyle: 'solid',
                color: 'rgb(0,255,160)',
                opacity: 1
            },
            {
                value: 1002,
                label: '单虚线',
                showFields: 'FEAT_TYPE',
                polygonStyle: 'solid',
                color: 'rgb(0,255,160)',
                opacity: 1
            },

            {
                value: 1004,
                label: '双虚线',
                showFields: 'FEAT_TYPE',
                polygonStyle: 'solid',
                color: 'rgb(0,255,160)',
                opacity: 1
            },
            {
                value: 1005,
                label: '左实右虚线',
                showFields: 'FEAT_TYPE',
                polygonStyle: 'solid',
                color: 'rgb(0,255,160)',
                opacity: 1
            },
            {
                value: 1006,
                label: '左虚右实线',
                showFields: 'FEAT_TYPE',
                polygonStyle: 'solid',
                color: 'rgb(0,255,160)',
                opacity: 1
            }
        ],
        typeStyleMap: {},
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
        typeStyle: [
            {
                value: 0,
                label: '未定义',
                showFields: 'FEAT_TYPE',
                polygonStyle: 'solid',
                color: 'rgb(137,195,255)',
                opacity: 1
            },
            {
                value: 2001,
                label: '停止线',
                showFields: 'FEAT_TYPE',
                polygonStyle: 'solid',
                color: 'rgb(137,195,255)',
                opacity: 1
            },

            {
                value: 2002,
                label: '停车让行线',
                showFields: 'FEAT_TYPE',
                polygonStyle: 'solid',
                color: 'rgb(137,195,255)',
                opacity: 1
            },
            {
                value: 2003,
                label: '减速让行线',
                showFields: 'FEAT_TYPE',
                polygonStyle: 'solid',
                color: 'rgb(137,195,255)',
                opacity: 1
            }
        ],
        typeStyleMap: {},
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
    AD_Arrow_Geo: {
        key: 'AD_Arrow_Geo',
        label: '几何层：箭头',
        checked: false,
        isClassify: true,
        type: 'Polygon',
        commonStyle: {
            showFields: 'FEAT_TYPE',
            polygonStyle: 'solid',
            color: 'rgb(250,220,70)',
            opacity: 1
        },
        typeStyle: [
            {
                value: 0,
                label: '未定义',
                showFields: 'FEAT_TYPE',
                polygonStyle: 'solid',
                color: 'rgb(250,220,70)',
                opacity: 1
            },
            {
                value: 3001,
                label: '直行箭头',
                showFields: 'FEAT_TYPE',
                polygonStyle: 'solid',
                color: 'rgb(250,220,70)',
                opacity: 1
            },
            {
                value: 3002,
                label: '左转箭头',
                showFields: 'FEAT_TYPE',
                polygonStyle: 'solid',
                color: 'rgb(250,220,70)',
                opacity: 1
            },
            {
                value: 3003,
                label: '右转箭头',
                showFields: 'FEAT_TYPE',
                polygonStyle: 'solid',
                color: 'rgb(250,220,70)',
                opacity: 1
            },
            {
                value: 3004,
                label: '直行左转箭头',
                showFields: 'FEAT_TYPE',
                polygonStyle: 'solid',
                color: 'rgb(250,220,70)',
                opacity: 1
            },
            {
                value: 3005,
                label: '直行右转箭头',
                showFields: 'FEAT_TYPE',
                polygonStyle: 'solid',
                color: 'rgb(250,220,70)',
                opacity: 1
            },
            {
                value: 3006,
                label: '左转右转箭头',
                showFields: 'FEAT_TYPE',
                polygonStyle: 'solid',
                color: 'rgb(250,220,70)',
                opacity: 1
            },
            {
                value: 3007,
                label: '直行左转右转箭头',
                showFields: 'FEAT_TYPE',
                polygonStyle: 'solid',
                color: 'rgb(250,220,70)',
                opacity: 1
            },
            {
                value: 3008,
                label: '掉头箭头',
                showFields: 'FEAT_TYPE',
                polygonStyle: 'solid',
                color: 'rgb(250,220,70)',
                opacity: 1
            },
            {
                value: 3009,
                label: '左转掉头箭头',
                showFields: 'FEAT_TYPE',
                polygonStyle: 'solid',
                color: 'rgb(250,220,70)',
                opacity: 1
            },
            {
                value: 3010,
                label: '右转掉头箭头',
                showFields: 'FEAT_TYPE',
                polygonStyle: 'solid',
                color: 'rgb(250,220,70)',
                opacity: 1
            },
            {
                value: 3011,
                label: '禁止标记箭头',
                showFields: 'FEAT_TYPE',
                polygonStyle: 'solid',
                color: 'rgb(250,220,70)',
                opacity: 1
            },
            {
                value: 3012,
                label: '向左合流箭头',
                showFields: 'FEAT_TYPE',
                polygonStyle: 'solid',
                color: 'rgb(250,220,70)',
                opacity: 1
            },
            {
                value: 3013,
                label: '向右合流箭头',
                showFields: 'FEAT_TYPE',
                polygonStyle: 'solid',
                color: 'rgb(250,220,70)',
                opacity: 1
            },
            {
                value: 3014,
                label: '直行和掉头箭头',
                showFields: 'FEAT_TYPE',
                polygonStyle: 'solid',
                color: 'rgb(250,220,70)',
                opacity: 1
            },
            {
                value: 3015,
                label: '直行左转掉头箭头',
                showFields: 'FEAT_TYPE',
                polygonStyle: 'solid',
                color: 'rgb(250,220,70)',
                opacity: 1
            },
            {
                value: 3016,
                label: '直行右转掉头箭头',
                showFields: 'FEAT_TYPE',
                polygonStyle: 'solid',
                color: 'rgb(250,220,70)',
                opacity: 1
            },
            {
                value: 3017,
                label: '直行左弯',
                showFields: 'FEAT_TYPE',
                polygonStyle: 'solid',
                color: 'rgb(250,220,70)',
                opacity: 1
            },
            {
                value: 3018,
                label: '直行右弯',
                showFields: 'FEAT_TYPE',
                polygonStyle: 'solid',
                color: 'rgb(250,220,70)',
                opacity: 1
            }
        ],
        typeStyleMap: {},
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
                type: 'AD_ARROW_GEO_FEAT_TYPE',
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
        typeStyle: [
            {
                value: 0,
                label: '未定义',
                showFields: 'FEAT_TYPE',
                polygonStyle: 'solid',
                color: 'rgb(147,112,219)',
                opacity: 1
            },
            {
                value: 4001,
                label: '减速警示线',
                showFields: 'FEAT_TYPE',
                polygonStyle: 'solid',
                color: 'rgb(147,112,219)',
                opacity: 1
            },
            {
                value: 4002,
                label: '减速带',
                showFields: 'FEAT_TYPE',
                polygonStyle: 'solid',
                color: 'rgb(147,112,219)',
                opacity: 1
            },

            {
                value: 9901,
                label: '人行横道',
                showFields: 'FEAT_TYPE',
                polygonStyle: 'solid',
                color: 'rgb(147,112,219)',
                opacity: 1
            },
            {
                value: 9902,
                label: '禁止停车区',
                showFields: 'FEAT_TYPE',
                polygonStyle: 'solid',
                color: 'rgb(147,112,219)',
                opacity: 1
            },
            {
                value: 9903,
                label: '导流区',
                showFields: 'FEAT_TYPE',
                polygonStyle: 'solid',
                color: 'rgb(147,112,219)',
                opacity: 1
            },
            {
                value: 9904,
                label: '路口内中心圈',
                showFields: 'FEAT_TYPE',
                polygonStyle: 'solid',
                color: 'rgb(147,112,219)',
                opacity: 1
            },
            {
                value: 9905,
                label: '车距确认线',
                showFields: 'FEAT_TYPE',
                polygonStyle: 'solid',
                color: 'rgb(147,112,219)',
                opacity: 1
            },
            {
                value: 9906,
                label: '地面文字数字',
                showFields: 'FEAT_TYPE',
                polygonStyle: 'solid',
                color: 'rgb(147,112,219)',
                opacity: 1
            },
            {
                value: 9907,
                label: '地面符号',
                showFields: 'FEAT_TYPE',
                polygonStyle: 'solid',
                color: 'rgb(147,112,219)',
                opacity: 1
            }
        ],
        typeStyleMap: {},
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
            color: 'rgb(32,52,240)',
            opacity: 1,
            arrow: false,
            point: false,
            pointEnabledStatus: true,
            arrowEnabledStatus: true,
            pointSize: 0.1
        },
        typeStyle: [
            {
                showFields: 'NOKEY',
                lineStyle: 'solid',
                color: 'rgb(32,52,240)',
                opacity: 1,
                arrow: false,
                point: false,
                pointEnabledStatus: true,
                arrowEnabledStatus: true,
                pointSize: 0.1
            }
        ],
        typeStyleMap: {},
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
    },
    AD_TrafficSign_Geo: {
        key: 'AD_TrafficSign_Geo',
        label: ' 几何层：交通标志牌',
        checked: false,
        isClassify: true,
        type: 'Polygon',
        commonStyle: {
            showFields: 'FEAT_TYPE',
            polygonStyle: 'solid',
            color: 'rgb(70,109,255)',
            opacity: 1
        },
        typeStyle: [
            {
                value: 0,
                label: '其他警告标志',
                showFields: 'FEAT_TYPE',
                polygonStyle: 'solid',
                color: 'rgb(70,109,255)',
                opacity: 1
            },
            {
                value: 2100,
                label: '建议速度',
                showFields: 'FEAT_TYPE',
                polygonStyle: 'solid',
                color: 'rgb(70,109,255)',
                opacity: 1
            },

            {
                value: 2101,
                label: '其他禁令标志',
                showFields: 'FEAT_TYPE',
                polygonStyle: 'solid',
                color: 'rgb(70,109,255)',
                opacity: 1
            },
            {
                value: 2201,
                label: '停车让行',
                showFields: 'FEAT_TYPE',
                polygonStyle: 'solid',
                color: 'rgb(70,109,255)',
                opacity: 1
            },
            {
                value: 2202,
                label: '减速让行',
                showFields: 'FEAT_TYPE',
                polygonStyle: 'solid',
                color: 'rgb(70,109,255)',
                opacity: 1
            },
            {
                value: 2203,
                label: '会车让行',
                showFields: 'FEAT_TYPE',
                polygonStyle: 'solid',
                color: 'rgb(70,109,255)',
                opacity: 1
            },
            {
                value: 2204,
                label: '禁止通行',
                showFields: 'FEAT_TYPE',
                polygonStyle: 'solid',
                color: 'rgb(70,109,255)',
                opacity: 1
            },
            {
                value: 2205,
                label: '禁止驶入',
                showFields: 'FEAT_TYPE',
                polygonStyle: 'solid',
                color: 'rgb(70,109,255)',
                opacity: 1
            },
            {
                value: 2206,
                label: '禁止机动车驶入',
                showFields: 'FEAT_TYPE',
                polygonStyle: 'solid',
                color: 'rgb(70,109,255)',
                opacity: 1
            },
            {
                value: 2207,
                label: '禁止向左转弯',
                showFields: 'FEAT_TYPE',
                polygonStyle: 'solid',
                color: 'rgb(70,109,255)',
                opacity: 1
            },
            {
                value: 2208,
                label: '禁止向右转弯',
                showFields: 'FEAT_TYPE',
                polygonStyle: 'solid',
                color: 'rgb(70,109,255)',
                opacity: 1
            },
            {
                value: 2209,
                label: '禁止直行',
                showFields: 'FEAT_TYPE',
                polygonStyle: 'solid',
                color: 'rgb(70,109,255)',
                opacity: 1
            },
            {
                value: 2210,
                label: '禁止向左向右转弯',
                showFields: 'FEAT_TYPE',
                polygonStyle: 'solid',
                color: 'rgb(70,109,255)',
                opacity: 1
            },
            {
                value: 2211,
                label: '禁止直行和向左转弯',
                showFields: 'FEAT_TYPE',
                polygonStyle: 'solid',
                color: 'rgb(70,109,255)',
                opacity: 1
            },
            {
                value: 2212,
                label: '禁止直行和向右转弯',
                showFields: 'FEAT_TYPE',
                polygonStyle: 'solid',
                color: 'rgb(70,109,255)',
                opacity: 1
            },
            {
                value: 2213,
                label: '禁止掉头',
                showFields: 'FEAT_TYPE',
                polygonStyle: 'solid',
                color: 'rgb(70,109,255)',
                opacity: 1
            },
            {
                value: 2214,
                label: '禁止超车',
                showFields: 'FEAT_TYPE',
                polygonStyle: 'solid',
                color: 'rgb(70,109,255)',
                opacity: 1
            },
            {
                value: 2215,
                label: '解除禁止超车',
                showFields: 'FEAT_TYPE',
                polygonStyle: 'solid',
                color: 'rgb(70,109,255)',
                opacity: 1
            },
            {
                value: 2216,
                label: '禁止停车',
                showFields: 'FEAT_TYPE',
                polygonStyle: 'solid',
                color: 'rgb(70,109,255)',
                opacity: 1
            },
            {
                value: 2217,
                label: '禁止长时停车',
                showFields: 'FEAT_TYPE',
                polygonStyle: 'solid',
                color: 'rgb(70,109,255)',
                opacity: 1
            },
            {
                value: 2219,
                label: '限制速度',
                showFields: 'FEAT_TYPE',
                polygonStyle: 'solid',
                color: 'rgb(70,109,255)',
                opacity: 1
            },
            {
                value: 2220,
                label: '解除限制速度',
                showFields: 'FEAT_TYPE',
                polygonStyle: 'solid',
                color: 'rgb(70,109,255)',
                opacity: 1
            },
            {
                value: 2223,
                label: '区域禁止-禁止长时停车',
                showFields: 'FEAT_TYPE',
                polygonStyle: 'solid',
                color: 'rgb(70,109,255)',
                opacity: 1
            },
            {
                value: 2224,
                label: '区域禁止解除-解除禁止长时停车',
                showFields: 'FEAT_TYPE',
                polygonStyle: 'solid',
                color: 'rgb(70,109,255)',
                opacity: 1
            },
            {
                value: 2225,
                label: '区域禁止-禁止停车',
                showFields: 'FEAT_TYPE',
                polygonStyle: 'solid',
                color: 'rgb(70,109,255)',
                opacity: 1
            },
            {
                value: 2226,
                label: '区域禁止解除-解除禁止停车',
                showFields: 'FEAT_TYPE',
                polygonStyle: 'solid',
                color: 'rgb(70,109,255)',
                opacity: 1
            },
            {
                value: 2227,
                label: '区域禁止-速度限制',
                showFields: 'FEAT_TYPE',
                polygonStyle: 'solid',
                color: 'rgb(70,109,255)',
                opacity: 1
            },
            {
                value: 2228,
                label: '区域禁止解除-解除速度限制',
                showFields: 'FEAT_TYPE',
                polygonStyle: 'solid',
                color: 'rgb(70,109,255)',
                opacity: 1
            },
            {
                value: 2200,
                label: '其他指示类标志',
                showFields: 'FEAT_TYPE',
                polygonStyle: 'solid',
                color: 'rgb(70,109,255)',
                opacity: 1
            },
            {
                value: 2300,
                label: '最低限速',
                showFields: 'FEAT_TYPE',
                polygonStyle: 'solid',
                color: 'rgb(70,109,255)',
                opacity: 1
            },
            {
                value: 2314,
                label: '车道行驶方向-直行',
                showFields: 'FEAT_TYPE',
                polygonStyle: 'solid',
                color: 'rgb(70,109,255)',
                opacity: 1
            },
            {
                value: 2318,
                label: '允许掉头',
                showFields: 'FEAT_TYPE',
                polygonStyle: 'solid',
                color: 'rgb(70,109,255)',
                opacity: 1
            },
            {
                value: 2321,
                label: '车道行驶方向-左转',
                showFields: 'FEAT_TYPE',
                polygonStyle: 'solid',
                color: 'rgb(70,109,255)',
                opacity: 1
            },
            {
                value: 2322,
                label: '车道行驶方向-右转',
                showFields: 'FEAT_TYPE',
                polygonStyle: 'solid',
                color: 'rgb(70,109,255)',
                opacity: 1
            },
            {
                value: 2323,
                label: '车道行驶方向-直行和左转',
                showFields: 'FEAT_TYPE',
                polygonStyle: 'solid',
                color: 'rgb(70,109,255)',
                opacity: 1
            },
            {
                value: 2324,
                label: '车道行驶方向-直行和右转',
                showFields: 'FEAT_TYPE',
                polygonStyle: 'solid',
                color: 'rgb(70,109,255)',
                opacity: 1
            },
            {
                value: 2325,
                label: '车道行驶方向-左转和掉头',
                showFields: 'FEAT_TYPE',
                polygonStyle: 'solid',
                color: 'rgb(70,109,255)',
                opacity: 1
            },
            {
                value: 2326,
                label: '车道行驶方向-掉头',
                showFields: 'FEAT_TYPE',
                polygonStyle: 'solid',
                color: 'rgb(70,109,255)',
                opacity: 1
            },
            {
                value: 2327,
                label: '车道行驶方向-其他',
                showFields: 'FEAT_TYPE',
                polygonStyle: 'solid',
                color: 'rgb(70,109,255)',
                opacity: 1
            },
            {
                value: 2328,
                label: '区间测速起点',
                showFields: 'FEAT_TYPE',
                polygonStyle: 'solid',
                color: 'rgb(70,109,255)',
                opacity: 1
            },
            {
                value: 2401,
                label: '区间测速终点',
                showFields: 'FEAT_TYPE',
                polygonStyle: 'solid',
                color: 'rgb(70,109,255)',
                opacity: 1
            },
            {
                value: 2402,
                label: '区间测速起点和距离',
                showFields: 'FEAT_TYPE',
                polygonStyle: 'solid',
                color: 'rgb(70,109,255)',
                opacity: 1
            },
            {
                value: 2403,
                label: '表示时间标志',
                showFields: 'FEAT_TYPE',
                polygonStyle: 'solid',
                color: 'rgb(70,109,255)',
                opacity: 1
            },
            {
                value: 2404,
                label: '特殊天气辅助标志',
                showFields: 'FEAT_TYPE',
                polygonStyle: 'solid',
                color: 'rgb(70,109,255)',
                opacity: 1
            },
            {
                value: 2405,
                label: '特殊路段辅助标志',
                showFields: 'FEAT_TYPE',
                polygonStyle: 'solid',
                color: 'rgb(70,109,255)',
                opacity: 1
            },
            {
                value: 2406,
                label: '其他标志牌',
                showFields: 'FEAT_TYPE',
                polygonStyle: 'solid',
                color: 'rgb(70,109,255)',
                opacity: 1
            },
            {
                value: 2500,
                label: '动态限速标志',
                showFields: 'FEAT_TYPE',
                polygonStyle: 'solid',
                color: 'rgb(70,109,255)',
                opacity: 1
            },
            {
                value: 2600,
                label: '其他电子标志牌',
                showFields: 'FEAT_TYPE',
                polygonStyle: 'solid',
                color: 'rgb(70,109,255)',
                opacity: 1
            },
            {
                value: 2601,
                label: '未定义',
                showFields: 'FEAT_TYPE',
                polygonStyle: 'solid',
                color: 'rgb(70,109,255)',
                opacity: 1
            }
        ],
        typeStyleMap: {},
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
                type: 'AD_TRAFFICSIGN_GEO_FEAT_TYPE',
                domType: 'RadioIconGroup'
            }
        ]
    },
    AD_TrafficLight_Geo: {
        key: 'AD_TrafficLight_Geo',
        label: '几何层：交通信号灯',
        checked: false,
        isClassify: true,
        type: 'Polygon',
        commonStyle: {
            showFields: 'FEAT_TYPE',
            polygonStyle: 'solid',
            color: 'rgb(231,120,0)',
            opacity: 1
        },
        typeStyle: [
            {
                value: 0,
                label: '未定义',
                showFields: 'FEAT_TYPE',
                polygonStyle: 'solid',
                color: 'rgb(231,120,0)',
                opacity: 1
            },
            {
                value: 3001,
                label: '普通交通信号灯',
                showFields: 'FEAT_TYPE',
                polygonStyle: 'solid',
                color: 'rgb(231,120,0)',
                opacity: 1
            },

            {
                value: 3002,
                label: '方向指示信号灯',
                showFields: 'FEAT_TYPE',
                polygonStyle: 'solid',
                color: 'rgb(231,120,0)',
                opacity: 1
            },
            {
                value: 3003,
                label: '铁路平交路口信号灯',
                showFields: 'FEAT_TYPE',
                polygonStyle: 'solid',
                color: 'rgb(231,120,0)',
                opacity: 1
            },
            {
                value: 3099,
                label: '其他',
                showFields: 'FEAT_TYPE',
                polygonStyle: 'solid',
                color: 'rgb(231,120,0)',
                opacity: 1
            }
        ],
        typeStyleMap: {},
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
                type: 'AD_TRAFFICLIGHT_GEO_FEAT_TYPE',
                domType: 'RadioIconGroup'
            }
        ]
    }
};

//当前任务不同渲染模式对应不同配置
export const MODE_VECTOR_CONFIG_MAP = {
    common: COMMON_VECTOR_CONFIG_MAP,
    check: CHECK_VECTOR_CONFIG_MAP,
    define: DEFINE_VECTOR_CONFIG_MAP
};

//当前任务：不同渲染模式对应不同配置
export const MODE_VECTOR_CONFIG = {
    common: VectorsConfig,
    check: CheckVectorsConfig,
    define: WhiteVectorsConfig
};

//周边底图：不同渲染模式对应不同配置
export const MODE_BOUNDARY_VECTOR_CONFIG = {
    common: BoundaryVectorsConfig,
    check: BoundaryCheckVectorsConfig,
    define: BoundaryWhiteVectorsConfig
};

//点符号图标名与base64映射
export const POINT_ICON_MAP = {
    dianfuhao: dianfuhao,
    dianfuhao1: dianfuhao1,
    dianfuhao2: dianfuhao2,
    dianfuhao3: dianfuhao3,
    dianfuhao4: dianfuhao4,
    dianfuhao5: dianfuhao5,
    dianfuhao6: dianfuhao6,
    dianfuhao7: dianfuhao7,
    dianfuhao8: dianfuhao8
};

export const CONFIGURABLE_LAYERS = [
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
    'AD_RS_Barrier',
    'AD_LaneDivider_Pln',
    'AD_LaneDivider_Plg',
    'AD_StopLocation_Geo',
    'AD_Arrow_Geo',
    'AD_LaneMark_Geo',
    'AD_Pole_Geo',
    'AD_TrafficSign_Geo',
    'AD_TrafficLight_Geo'
];
