export const TYPE_SELECT_OPTION_MAP = {
    AD_LANE_DIVIDER_TYPE: [
        { value: 0, label: '未定义', icon: 'weidingyi' },
        { value: 1, label: '单实线', icon: 'danshixian' },
        { value: 2, label: '单虚线', icon: 'danxuxian' },
        { value: 3, label: '双实线', icon: 'shuangshixian' },
        { value: 4, label: '双虚线', icon: 'shuangxuxian' },
        { value: 5, label: '左实右虚', icon: 'zuoshiyouxu' },
        { value: 6, label: '左虚右实', icon: 'zuoxuyoushi' },
        { value: 7, label: '短粗虚线', icon: 'duancuxuxian' },
        { value: 8, label: '导流线', icon: 'daoliuxian' },
        { value: 11, label: '车道虚拟线', icon: 'chedaoxunixian' },
        { value: 12, label: '路边缘虚拟线', icon: 'lubianyuanxunixian' },
        { value: 13, label: '防护栏', icon: 'fanghulan' },
        { value: 14, label: '隧道墙', icon: 'suidaoqiang' },
        { value: 15, label: '路缘石', icon: 'luyuanshi' },
        { value: 16, label: '自然边界', icon: 'ziranbianjie' },
        { value: 17, label: '施工边界', icon: 'shigongbianjie' },
        { value: 18, label: '路口内待行区', icon: 'lukouneidaixingqu' }
    ],
    AD_LANE_DIVIDER_DIRECTION: [
        { value: 0, label: '未定义' },
        { value: 1, label: '双向' },
        { value: 2, label: '正向' },
        { value: 3, label: '逆向' }
    ],
    AD_LANE_DIVIDER_REF_LINE: [
        { value: 0, label: '非参考线' },
        { value: 1, label: '参考线' }
    ],
    AD_LANE_DIVIDER_SHARE_LINE: [
        { value: 0, label: '非共用车道线' },
        { value: 1, label: '共用车道线' }
    ],
    AD_LANE_DIVIDER_RD_STATUS: [
        { value: 0, label: '未定义' },
        { value: 1, label: '正常通行' },
        { value: 2, label: '建设中' },
        { value: 3, label: '禁止通行' }
    ],
    AD_LANE_DIVIDER_LANE_TYPE: [
        { value: 0, label: '未定义', icon: 'weidingyi' },
        { value: 1, label: '普通车道', icon: 'putongchedao' },
        { value: 2, label: '路口车道', icon: 'lukouchedao' },
        { value: 3, label: '应急车道', icon: 'yingjichedao' },
        { value: 4, label: '非机动车道', icon: 'feijidongchedao' },
        { value: 5, label: '机非混合车道', icon: 'jifeihunhechedao' },
        { value: 6, label: '公交车道', icon: 'gongjiaochedao' },
        { value: 7, label: '人行道', icon: 'renxingdao' },
        { value: 8, label: 'ETC车道', icon: 'etcchedao' },
        { value: 9, label: '收费站车道', icon: 'shoufeizhanchedao' },
        { value: 10, label: '检查站车道', icon: 'jianchazhanchedao' },
        { value: 11, label: '右侧加速车道', icon: 'youcejiasuchedao' },
        { value: 12, label: '右侧减速车道', icon: 'youcejiansuchedao' },
        { value: 13, label: '匝道', icon: 'zadao' },
        { value: 14, label: '隔离带车道', icon: 'gelidaichedao' },
        { value: 15, label: '紧急停车道', icon: 'jinjitingchedao' },
        { value: 16, label: 'HOV车道', icon: 'hovchedao' },
        { value: 17, label: '危险品专用车道', icon: 'weixianpinzhuanyongchedao' },
        { value: 18, label: '爬坡车道', icon: 'papochedao' },
        { value: 19, label: '可变导向车道', icon: 'kebiandaoxiangchedao' },
        { value: 20, label: '海关监管车道', icon: 'haiguanjianguanchedao' },
        { value: 21, label: '避险车道引道', icon: 'bixianchedaoyindao' },
        { value: 22, label: '停车道', icon: 'tingchedao' },
        { value: 23, label: '潮汐车道', icon: 'chaoxichedao' },
        { value: 24, label: '左转待转车道', icon: 'zuozhuandaizhuanchedao' },
        { value: 25, label: '直行待行车道', icon: 'zhixingdaixingchedao' },
        { value: 26, label: '掉头车道', icon: 'diaotouchedao' },
        { value: 27, label: '超车道', icon: 'chaochedao' },
        { value: 28, label: '服务区车道', icon: 'fuwuquchedao' },
        { value: 29, label: '左侧加速车道', icon: 'zuocejiasuchedao' },
        { value: 30, label: '左侧减速车道', icon: 'zuocejiansuchedao' }
    ],
    AD_REFERENCELINE_TYPE: [
        { value: 0, label: '未定义' },
        { value: 1, label: '非路口内参考线' },
        { value: 2, label: '路口内参考线' }
    ],
    AD_REFERENCELINE_RD_STATUS: [
        { value: 0, label: '未定义' },
        { value: 1, label: '正常通行' },
        { value: 2, label: '建设中' },
        { value: 3, label: '禁止通行' }
    ],
    AD_LANE_TYPE: [
        { value: 0, label: '未定义', icon: 'weidingyi' },
        { value: 1, label: '普通车道', icon: 'putongchedao' },
        { value: 2, label: '路口车道', icon: 'lukouchedao' },
        { value: 3, label: '应急车道', icon: 'yingjichedao' },
        { value: 4, label: '非机动车道', icon: 'feijidongchedao' },
        { value: 5, label: '机非混合车道', icon: 'jifeihunhechedao' },
        { value: 6, label: '公交车道', icon: 'gongjiaochedao' },
        { value: 7, label: '人行道', icon: 'renxingdao' },
        { value: 8, label: 'ETC车道', icon: 'etcchedao' },
        { value: 9, label: '收费站车道', icon: 'shoufeizhanchedao' },
        { value: 10, label: '检查站车道', icon: 'jianchazhanchedao' },
        { value: 11, label: '右侧加速车道', icon: 'youcejiasuchedao' },
        { value: 12, label: '右侧减速车道', icon: 'youcejiansuchedao' },
        { value: 13, label: '匝道', icon: 'zadao' },
        { value: 14, label: '隔离带车道', icon: 'gelidaichedao' },
        { value: 15, label: '紧急停车道', icon: 'jinjitingchedao' },
        { value: 16, label: 'HOV车道', icon: 'hovchedao' },
        { value: 17, label: '危险品专用车道', icon: 'weixianpinzhuanyongchedao' },
        { value: 18, label: '爬坡车道', icon: 'papochedao' },
        { value: 19, label: '可变导向车道', icon: 'kebiandaoxiangchedao' },
        { value: 20, label: '海关监管车道', icon: 'haiguanjianguanchedao' },
        { value: 21, label: '避险车道引道', icon: 'bixianchedaoyindao' },
        { value: 22, label: '停车道', icon: 'tingchedao' },
        { value: 23, label: '潮汐车道', icon: 'chaoxichedao' },
        { value: 24, label: '左转待转车道', icon: 'zuozhuandaizhuanchedao' },
        { value: 25, label: '直行待行车道', icon: 'zhixingdaixingchedao' },
        { value: 26, label: '掉头车道', icon: 'diaotouchedao' },
        { value: 27, label: '超车道', icon: 'chaochedao' },
        { value: 28, label: '服务区车道', icon: 'fuwuquchedao' },
        { value: 29, label: '左侧加速车道', icon: 'zuocejiasuchedao' },
        { value: 30, label: '左侧减速车道', icon: 'zuocejiansuchedao' }
    ],
    AD_LANE_DIRECTION: [
        { value: 0, label: '未定义' },
        { value: 1, label: '双向' },
        { value: 2, label: '正向' },
        { value: 3, label: '逆向' }
    ],
    AD_LANE_RESTRICT: [
        { value: 0, label: '未定义' },
        { value: 1, label: '速度限制' },
        { value: 2, label: '时间限制' }
    ],
    AD_LANE_STATUS: [
        { value: 0, label: '未定义' },
        { value: 1, label: '正常通行' },
        { value: 2, label: '建设中' },
        { value: 3, label: '禁止通行' }
    ],
    AD_LANEATTRPOINT_TYPE: [
        { value: 0, label: '未制作', icon: 'weizhizuo' },
        { value: 11, label: '右侧出口', icon: 'youcechukou' },
        { value: 12, label: '左侧出口', icon: 'zuocechukou' },
        { value: 15, label: '道路分离点', icon: 'daolufenlidian' },
        { value: 16, label: '道路合并点', icon: 'daoluhebingdian' },
        { value: 17, label: '车道合并点', icon: 'chedaohebingdian' },
        { value: 20, label: '点云不清晰起始', icon: 'dianyunbuqingxiqishi' },
        { value: 40, label: '点云遮挡起始', icon: 'dianyunzhedangqishi' },
        { value: 50, label: '精度误差起始', icon: 'jingduwuchaqishi' },
        { value: 60, label: '道路施工起始', icon: 'daolushigongqishi' },
        { value: 21, label: '点云不清晰结束', icon: 'dianyunbuqingxijieshu' },
        { value: 41, label: '点云遮挡结束', icon: 'dianyunzhedangjieshu' },
        { value: 51, label: '精度误差结束', icon: 'jingduwuchajieshu' },
        { value: 61, label: '道路施工结束', icon: 'daolushigongjieshu' }
    ],
    AD_STOPLOCATION_TYPE: [
        { value: 1, label: '停止线', icon: 'tingzhixian' },
        { value: 2, label: '停车让行线', icon: 'tingcherangxingxian' },
        { value: 3, label: '减速让行线', icon: 'jiansurangxingxian' }
    ],
    AD_POLYGON_TYPE: [
        { value: 1, label: '人行横道', icon: 'renxinghengdao' },
        { value: 2, label: '禁止停车线', icon: 'jinzhitingchexian' },
        { value: 3, label: '减速带', icon: 'jiansudai' },
        { value: 4, label: '减速警示震荡线', icon: 'jiansujingshizhendangxian' }
    ],
    AD_TRAFFICSIGN_TYPE: [
        { value: 101, label: '交叉路口', icon: 'plus' },
        { value: 102, label: '急弯路', icon: 'plus' },
        { value: 103, label: '反向弯路', icon: 'plus' },
        { value: 104, label: '连续弯路', icon: 'plus' },
        { value: 105, label: '陡坡', icon: 'plus' },
        { value: 106, label: '连续下坡', icon: 'plus' },
        { value: 107, label: '窄路', icon: 'plus' },
        { value: 108, label: '窄桥', icon: 'plus' },
        { value: 109, label: '易滑', icon: 'plus' },
        { value: 110, label: '双向交通', icon: 'plus' },
        { value: 111, label: '注意行人', icon: 'plus' },
        { value: 112, label: '注意儿童', icon: 'plus' },
        { value: 113, label: '注意牲畜', icon: 'plus' },
        { value: 114, label: '渡口', icon: 'plus' },
        { value: 115, label: '注意野生动物', icon: 'plus' },
        { value: 116, label: '注意信号灯', icon: 'plus' },
        { value: 117, label: '村庄', icon: 'plus' },
        { value: 118, label: '注意落石', icon: 'plus' },
        { value: 119, label: '注意横风', icon: 'plus' },
        { value: 120, label: '傍山险路', icon: 'plus' },
        { value: 121, label: '堤坝路', icon: 'plus' },
        { value: 122, label: '隧道', icon: 'plus' },
        { value: 123, label: '驼峰桥', icon: 'plus' },
        { value: 124, label: '路面不平', icon: 'plus' },
        { value: 125, label: '路面高突', icon: 'plus' },
        { value: 126, label: '路面低洼', icon: 'plus' },
        { value: 127, label: '过水路面（漫水桥）', icon: 'plus' },
        { value: 128, label: '铁路道口', icon: 'plus' },
        { value: 129, label: '人行横道', icon: 'plus' },
        { value: 130, label: '注意非机动车', icon: 'plus' },
        { value: 131, label: '注意残疾人', icon: 'plus' },
        { value: 132, label: '事故易发路段', icon: 'plus' },
        { value: 133, label: '慢行', icon: 'plus' },
        { value: 134, label: '注意障碍物绕行', icon: 'plus' },
        { value: 135, label: '注意危险', icon: 'plus' },
        { value: 136, label: '施工', icon: 'plus' },
        { value: 137, label: '建议速度', icon: 'plus' },
        { value: 138, label: '注意潮汐车道', icon: 'plus' },
        { value: 139, label: '避险车道', icon: 'plus' },
        { value: 140, label: '注意合流', icon: 'plus' },
        { value: 141, label: '注意分离式道路', icon: 'plus' },
        { value: 142, label: '注意保持车距', icon: 'plus' },
        { value: 143, label: '注意前方车辆排队', icon: 'plus' },
        { value: 144, label: '注意路面结冰、雨（雪）天气', icon: 'plus' },
        { value: 201, label: '停车让行', icon: 'plus' },
        { value: 202, label: '减速让行', icon: 'plus' },
        { value: 203, label: '会车让行', icon: 'plus' },
        { value: 204, label: '禁止通行', icon: 'plus' },
        { value: 205, label: '禁止驶入', icon: 'plus' },
        { value: 206, label: '禁止机动车驶入', icon: 'plus' },
        { value: 207, label: '禁止向左转弯', icon: 'plus' },
        { value: 208, label: '禁止向右转弯', icon: 'plus' },
        { value: 209, label: '禁止直行', icon: 'plus' },
        { value: 210, label: '禁止向左向右转弯', icon: 'plus' },
        { value: 211, label: '禁止直行和向左转弯', icon: 'plus' },
        { value: 212, label: '禁止直行和向右转弯', icon: 'plus' },
        { value: 213, label: '禁止掉头', icon: 'plus' },
        { value: 214, label: '禁止超车', icon: 'plus' },
        { value: 215, label: '解除禁止超车', icon: 'plus' },
        { value: 216, label: '禁止停车', icon: 'plus' },
        { value: 217, label: '禁止长时停车', icon: 'plus' },
        { value: 218, label: '禁止鸣喇叭', icon: 'plus' },
        { value: 219, label: '限制速度', icon: 'plus' },
        { value: 220, label: '解除限制速度', icon: 'plus' },
        { value: 221, label: '停车检查', icon: 'plus' },
        { value: 222, label: '海关', icon: 'plus' },
        { value: 223, label: '区域禁止', icon: 'plus' },
        { value: 224, label: '区域禁止解除', icon: 'plus' },
        { value: 225, label: '禁止标志', icon: 'plus' },
        { value: 301, label: '直行', icon: 'plus' },
        { value: 302, label: '向左转弯', icon: 'plus' },
        { value: 303, label: '向右转弯', icon: 'plus' },
        { value: 304, label: '直行和向左转弯', icon: 'plus' },
        { value: 305, label: '直行和向右行驶', icon: 'plus' },
        { value: 306, label: '向左和向右行驶', icon: 'plus' },
        { value: 307, label: '靠左侧道路行驶', icon: 'plus' },
        { value: 308, label: '靠右侧道路行驶', icon: 'plus' },
        { value: 309, label: '立体交叉行驶路线', icon: 'plus' },
        { value: 310, label: '环岛行驶', icon: 'plus' },
        { value: 311, label: '单行路', icon: 'plus' },
        { value: 312, label: '步行', icon: 'plus' },
        { value: 313, label: '鸣喇叭', icon: 'plus' },
        { value: 314, label: '最低限速', icon: 'plus' },
        { value: 315, label: '路口优先通行', icon: 'plus' },
        { value: 316, label: '会车先行', icon: 'plus' },
        { value: 317, label: '人行横道', icon: 'plus' },
        { value: 318, label: '车道行驶方向', icon: 'plus' },
        { value: 319, label: '专用道路和车道', icon: 'plus' },
        { value: 320, label: '停车位', icon: 'plus' },
        { value: 321, label: '允许掉头', icon: 'plus' },
        { value: 400, label: '其他', icon: 'plus' },
        { value: 500, label: '动态标志牌', icon: 'plus' }
    ],
    AD_TRAFFIC_LIGHT_TYPE: [
        { value: 0, label: '其他', icon: 'qita' },
        { value: 1, label: '普通机动车信号灯', icon: 'putongjidongchexinhaodeng' },
        { value: 2, label: '方向指示信号灯', icon: 'fangxiangzhishixinhaodeng' },
        { value: 3, label: '道路与铁路平面交叉道口信号灯', icon: 'daoluyutielupingmianjiaochadaokouxinhaodeng' }
    ],
    AD_ARROW_ARR_DIRECT: [
        { value: '00000000000000000001', label: '直行', icon: 'zhixing' },
        { value: '00000000000000000010', label: '左转', icon: 'zuozhuan' },
        { value: '00000000000000000100', label: '右转', icon: 'youzhuan' },
        { value: '00000000000000001000', label: '左掉头', icon: 'zuodiaotou' },
        { value: '00000000000000010000', label: '右掉头', icon: 'youdiaotou' },
        { value: '00000000000000100000', label: '左弯或需向左合流', icon: 'zuowanhuoxuxiangzuoheliu' },
        { value: '00000000000001000000', label: '右弯或需向右合流', icon: 'youwanhuoxuxiangyouheliu' },
        { value: '00000000000010000000', label: '左后方转弯', icon: 'zuohoufangzhuanwan' },
        { value: '00000000000100000000', label: '右后方转弯', icon: 'youhoufangzhuanwan' },
        { value: '00000000001000000000', label: '禁止左掉头', icon: 'jinzhizuodiaotou' },
        { value: '00000000010000000000', label: '禁止右掉头', icon: 'jinzhiyoudiaotou' },
        { value: '00000000100000000000', label: '禁止左转', icon: 'jinzhizuozhuan' },
        { value: '00000001000000000000', label: '禁止右转', icon: 'jinzhiyouzhuan' }
    ]
};

export const DEFAULT_PROPERTIES_MAP = {
    Arrow: {
        ARR_DIRECT: '00000000000000000001',
        ALANE_ID: 0
    },
    Polygon: {
        TYPE: 1
    },
    TrafficSign: {
        TYPE: 101,
        VALUE: 0
    },
    TrafficLight: {
        TYPE: 1
    },
    LaneDivider: {
        TYPE: 2,
        DIRECTION: 2,
        REF_LINE: 0,
        SHARE_LINE: 0,
        RD_STATUS: 1,
        LANE_TYPE: 1,
        LANE_NO: 1
    },
    RefLine: {
        TYPE: 1,
        RD_STATUS: 0
    },
    Lane: {
        TYPE: 2,
        DIRECTION: 2,
        LANE_NO: 0,
        RESTRICT: 0
    },
    LaneAttrPoint: {
        TYPE: 0,
        REF_LINE: 0
    }
};

export const TABLE_DATA_MAP = {
    LaneDivider: [
        {
            key: 'ALDIV_ID',
            name: '用户编号',
            type: 'AD_LANE_DIVIDER_ID',
            domType: 'Text'
        },
        {
            key: 'TYPE',
            name: '车道线类型',
            type: 'AD_LANE_DIVIDER_TYPE',
            domType: 'RadioIconGroup'
        },
        {
            key: 'LANE_TYPE',
            name: '车道类型',
            type: 'AD_LANE_DIVIDER_LANE_TYPE',
            domType: 'RadioIconGroup'
        },
        {
            key: 'REF_LINE',
            name: '参考线标识',
            type: 'AD_LANE_DIVIDER_REF_LINE',
            domType: 'Select'
        },
        {
            key: 'SHARE_LINE',
            name: '共用车道线标识',
            type: 'AD_LANE_DIVIDER_SHARE_LINE',
            domType: 'Select'
        },
        {
            key: 'DIRECTION',
            name: '交通流方向',
            type: 'AD_LANE_DIVIDER_DIRECTION',
            domType: 'Select'
        },
        {
            key: 'RD_STATUS',
            name: '通行状态',
            type: 'AD_LANE_DIVIDER_RD_STATUS',
            domType: 'Select'
        },
        {
            key: 'LANE_NO',
            name: '车道编号',
            type: 'AD_LANE_DIVIDER_LANE_NO',
            domType: 'Text'
        }
    ],
    ReferenceLine: [
        {
            key: 'REFLINE_ID',
            name: '用户编号',
            type: 'AD_REFERENCELINE_REFLINE_ID',
            domType: 'Text'
        },
        {
            key: 'TYPE',
            name: '参考线类型',
            type: 'AD_REFERENCELINE_TYPE',
            domType: 'Select'
        },
        {
            key: 'RD_STATUS',
            name: '通行状态',
            type: 'AD_REFERENCELINE_RD_STATUS',
            domType: 'Select'
        }
    ],
    Lane: [
        {
            key: 'TYPE',
            name: '车道类型',
            type: 'AD_LANE_TYPE',
            domType: 'RadioIconGroup'
        },
        {
            key: 'ALANE_ID',
            name: '用户编号',
            type: 'AD_LANE_ALANE_ID',
            domType: 'Text'
        },
        {
            key: 'REFLINE_ID',
            name: '关联参考线ID',
            type: 'AD_LANE_REFLINE_ID',
            domType: 'Text'
        },
        {
            key: 'L_DIV_ID',
            name: '左侧车道线ID',
            type: 'AD_LANE_L_DIV_ID',
            domType: 'Text'
        },
        {
            key: 'R_DIV_ID',
            name: '右侧车道线ID',
            type: 'AD_LANE_R_DIV_ID',
            domType: 'Text'
        },
        {
            key: 'LANE_NO',
            name: '车道编号',
            type: 'AD_LANE_LANE_NO',
            domType: 'Text'
        },
        {
            key: 'DIRECTION',
            name: '交通流方向',
            type: 'AD_LANE_DIRECTION',
            domType: 'Select'
        },
        {
            key: 'RESTRICT',
            name: '限制类型',
            type: 'AD_LANE_RESTRICT',
            domType: 'Select'
        },
        {
            key: 'VALUE',
            name: '限制取值',
            type: 'AD_LANE_VALUE',
            domType: 'Input'
        },
        {
            key: 'STATUS',
            name: '通行状态',
            type: 'AD_LANE_STATUS',
            domType: 'Select'
        },
        {
            key: 'OBJECT_ID',
            name: '关联停止位置ID',
            type: 'AD_LANE_OBJECT_ID',
            domType: 'Text'
        }
    ],
    StopLocation: [
        {
            key: 'OBJECT_ID',
            name: '用户编号',
            type: 'AD_STOPLOCATION_OBJECT_ID',
            domType: 'Text'
        },
        {
            key: 'TYPE',
            name: '类型',
            type: 'AD_STOPLOCATION_TYPE',
            domType: 'RadioIconGroup'
        }
    ],
    Polygon: [
        {
            key: 'OBJECT_ID',
            name: '用户编号',
            type: 'AD_POLYGON_OBJECT_ID',
            domType: 'Text'
        },
        {
            key: 'TYPE',
            name: '面要素类型',
            type: 'AD_POLYGON_TYPE',
            domType: 'RadioIconGroup'
        }
    ],
    Arrow: [
        {
            key: 'OBJECT_ID',
            name: '用户编号',
            type: 'AD_ARROW_OBJECT_ID',
            domType: 'Text'
        },
        {
            key: 'ARR_DIRECT',
            name: '箭头方向',
            type: 'AD_ARROW_ARR_DIRECT',
            domType: 'RadioIconGroup'
        },
        {
            key: 'ALANE_ID',
            name: '关联车道号',
            type: 'AD_ARROW_ALANE_ID',
            domType: 'Text'
        }
    ],
    LaneAttrPoint: [
        {
            key: 'ALAP_ID',
            name: '用户编号',
            type: 'AD_LANEATTRPOINT_ALAP_ID',
            domType: 'Text'
        },
        {
            key: 'TYPE',
            name: '属性变化点类型',
            type: 'AD_LANEATTRPOINT_TYPE',
            domType: 'RadioIconGroup'
        },
        {
            key: 'REF_LINE',
            name: '关联参考线ID',
            type: 'AD_LANEATTRPOINT_REF_LINE',
            domType: 'Text'
        }
    ],
    TrafficSign: [
        {
            key: 'OBJECT_ID',
            name: '用户编号',
            type: 'AD_TRAFFICSIGN_OBJECT_ID',
            domType: 'Text'
        },
        {
            key: 'TYPE',
            name: '标志牌类型',
            type: 'AD_TRAFFICSIGN_TYPE',
            domType: 'RadioIconGroup'
        },
        {
            key: 'VALUE',
            name: '类型取值',
            type: 'AD_TRAFFICSIGN_VALUE',
            domType: 'Input'
        }
    ],
    TrafficLight: [
        {
            key: 'OBJECT_ID',
            name: '用户编号',
            type: 'AD_TRAFFIC_LIGHT_OBJECT_ID',
            domType: 'Text'
        },
        {
            key: 'TYPE',
            name: '交通灯类型',
            type: 'AD_TRAFFIC_LIGHT_TYPE',
            domType: 'RadioIconGroup'
        },
        {
            key: 'REFLINE_ID',
            name: '用户编号',
            type: 'AD_TRAFFIC_LIGHT_REFLINE_ID',
            domType: 'Input'
        }
    ]
};
