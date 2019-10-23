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
        { value: 9, label: '车道虚拟线', icon: 'chedaoxunichedaoxian' },
        { value: 10, label: '路边缘虚拟线', icon: 'lubianyuanxunichedaoxian' },
        { value: 11, label: '防护栏', icon: 'lucefanghulan' },
        { value: 12, label: '隧道墙', icon: 'suidaoqiang' },
        { value: 13, label: '路缘石', icon: 'luyuanshi' },
        { value: 14, label: '自然边界', icon: 'ziranbianjie' },
        { value: 15, label: '施工边界', icon: 'shigongbianjie' },
        { value: 16, label: '路中隔离带', icon: 'gelidaichedao' },
        { value: 17, label: '路口内待行区', icon: 'lukouneidaixingqu' },
        {
            value: 18,
            label: '可变导向车道线',
            icon: 'kebiandaoxiangchedaoxian'
        },
        // {
        //     value: 18,
        //     label: '可变导向车道线',
        //     icon: 'kebiandaoxiangchedaoxian'
        // },
        // {
        //     value: 19,
        //     label: '路侧私有路口虚拟线'
        // }
        { value: 99, label: '其他', icon: 'qita' }
    ],
    AD_LANE_DIVIDER_DIRECTION: [
        { value: 0, label: '未定义' },
        { value: 1, label: '正向通行' },
        { value: 2, label: '逆向通行' },
        { value: 3, label: '双向通行' },
        { value: 4, label: '禁止通行' }
    ],
    AD_LANE_DIVIDER_RD_LINE: [
        { value: 0, label: '未定义' },
        { value: 1, label: '道路参考线' },
        { value: 2, label: '非道路参考线' }
    ],
    AD_LANE_DIVIDER_SHARE_LINE: [
        { value: 0, label: '未定义' },
        { value: 1, label: '非共用车道线' },
        { value: 2, label: '逆向交通流共用车道线' },
        { value: 3, label: '同向交通流共用车道线' }
    ],
    AD_LANE_DIVIDER_LANESTATUS: [
        { value: 0, label: '未定义' },
        { value: 1, label: '正常通行' },
        { value: 2, label: '建设中' },
        { value: 3, label: '禁止通行' },
        { value: 99, label: '其他' }
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
        {
            value: 17,
            label: '危险品专用车道',
            icon: 'weixianpinzhuanyongchedao'
        },
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
        { value: 30, label: '左侧减速车道', icon: 'zuocejiansuchedao' },
        { value: 31, label: '复合车道', icon: 'jiajiansufuhechedao' },
        { value: 99, label: '其他', icon: 'qita' }
    ],
    AD_LANE_DIVIDER_RD_FORM: [
        { value: 0, label: '未定义' },
        { value: 1, label: '普通道路' },
        { value: 2, label: '隧道道路' },
        { value: 3, label: '收费站道路' }
    ],
    AD_ROAD_TYPE: [
        { value: 0, label: '未定义', icon: 'weidingyi' },
        { value: 1, label: '实际道路参考线', icon: 'shijidaolucankaoxian' },
        { value: 2, label: '虚拟道路参考线', icon: 'xunidaolucankaoxian' }
    ],
    AD_ROAD_RD_STATUS: [
        { value: 0, label: '未定义' },
        { value: 1, label: '正常通行' },
        { value: 2, label: '建设中' },
        { value: 3, label: '禁止通行' },
        { value: 99, label: '其他' }
    ],
    AD_ROAD_RD_CLASS: [
        { value: 0, label: '未定义' },
        { value: 1, label: '高速公路' },
        { value: 2, label: '城市快速路' },
        { value: 3, label: '城市道路' },
        { value: 99, label: '其他' }
    ],
    AD_ROAD_RD_FORM: [
        //???
        { value: 0, label: '未定义' },
        { value: 1, label: '普通道路' },
        { value: 2, label: '隧道道路' },
        { value: 3, label: '收费站道路' }
    ],
    AD_ROAD_DIRECTION: [
        { value: 0, label: '未定义' },
        { value: 1, label: '正向通行' },
        { value: 2, label: '逆向通行' },
        { value: 3, label: '双向通行' },
        { value: 4, label: '禁止通行' }
    ],
    AD_ROAD_CROSSING: [
        { value: 0, label: '未定义' },
        { value: 1, label: '交叉路口内' },
        { value: 2, label: '非交叉路口内' }
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
        {
            value: 17,
            label: '危险品专用车道',
            icon: 'weixianpinzhuanyongchedao'
        },
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
        { value: 30, label: '左侧减速车道', icon: 'zuocejiansuchedao' },
        { value: 31, label: '复合车道', icon: 'jiajiansufuhechedao' },
        { value: 99, label: '其他', icon: 'qita' }
    ],
    AD_LANE_DIRECTION: [
        { value: 0, label: '未定义' },
        { value: 1, label: '正向通行' },
        { value: 2, label: '逆向通行' },
        { value: 3, label: '双向通行' },
        { value: 4, label: '禁止通行' }
    ],
    AD_LANE_MAX_SP_TYP: [
        { value: 0, label: '未定义' },
        { value: 1, label: '实地采集' },
        { value: 2, label: '逻辑推断' },
        { value: 3, label: '法定推荐' }
    ],
    AD_LANE_MIN_SP_TYP: [
        { value: 0, label: '未定义' },
        { value: 1, label: '实地采集' },
        { value: 2, label: '逻辑推断' },
        { value: 3, label: '法定推荐' }
    ],
    // AD_LANE_RESTRICT: [
    //     { value: 0, label: '未定义' },
    //     { value: 1, label: '速度限制' },
    //     { value: 2, label: '时间限制' }
    // ],
    AD_LANE_STATUS: [
        { value: 0, label: '未定义' },
        { value: 1, label: '正常通行' },
        { value: 2, label: '建设中' },
        { value: 3, label: '禁止通行' },
        { value: 99, label: '其他' }
    ],
    AD_LANE_ATTRPOINT_TYPE: [
        { value: 0, label: '未定义', icon: 'weidingyi' },
        { value: 1, label: '左侧出口', icon: 'daoluzuocechukou' },
        { value: 2, label: '右侧出口', icon: 'daoluyoucechukou' },
        { value: 3, label: '道路分离点', icon: 'daolufenlidian' },
        { value: 4, label: '道路合并点', icon: 'daoluhebingdian' },
        { value: 5, label: '车道合并点', icon: 'chedaohebingdian' },
        {
            value: 21,
            label: '服务区道路开始位置',
            icon: 'fuwuqudaolukaishiweizhi'
        },
        {
            value: 22,
            label: '服务区道路结束位置',
            icon: 'fuwuqudaolujieshuweizhi'
        },
        { value: 41, label: '点云不清晰起点', icon: 'dianyunbuqingxiqishi' },
        { value: 42, label: '点云不清晰结束点', icon: 'dianyunbuqingxijieshu' },
        { value: 43, label: '点云遮挡起点', icon: 'dianyunzhedangqishi' },
        { value: 44, label: '点云遮挡结束', icon: 'dianyunzhedangjieshu' },
        { value: 45, label: '精度误差起始', icon: 'jingduwuchaqishi' },
        { value: 46, label: '精度误差结束', icon: 'jingduwuchajieshu' },
        { value: 47, label: '道路施工起始', icon: 'daolushigongqishi' },
        { value: 48, label: '道路施工结束', icon: 'daolushigongjieshu' }
    ],
    AD_STOPLOCATION_TYPE: [
        { value: 0, label: '未定义', icon: 'weidingyi' },
        { value: 1, label: '停止线', icon: 'tingzhixian' },
        { value: 2, label: '停车让行线', icon: 'tingcherangxingxian' },
        { value: 3, label: '减速让行线', icon: 'jiansurangxingxian' }
    ],
    AD_LANEMARK_PLG_TYPE: [
        { value: 0, label: '未定义', icon: 'weidingyi' },
        { value: 1, label: '人行横道', icon: 'renxinghengdao' },
        { value: 2, label: '禁止停车线', icon: 'jinzhitingchexian' },
        { value: 3, label: '减速带', icon: 'jiansudai' },
        {
            value: 4,
            label: '减速警示震荡线',
            icon: 'jiansujingshizhendangxian'
        },
        {
            value: 5,
            label: '斜跨路口的人行横道 ',
            icon: 'xiekualukourenxinghengdao'
        }
    ],
    AD_TRAFFICSIGN_SIGN_STYLE: [
        { value: 0, label: '未定义' },
        { value: 1, label: '单个标志牌' },
        { value: 2, label: '组合标志牌' }
    ],
    AD_TS_CONTENT_SIGN_TYPE: [
        { value: 0, label: '未定义', icon: 'weidingyi' },
        { value: 101, label: '交叉路口', icon: 'jiaochalukou' },
        // { value: 102, label: '急弯路', icon: 'plus' },
        // { value: 103, label: '反向弯路', icon: 'plus' },
        // { value: 104, label: '连续弯路', icon: 'plus' },
        // { value: 105, label: '陡坡', icon: 'plus' },
        // { value: 106, label: '连续下坡', icon: 'plus' },
        { value: 107, label: '窄路', icon: 'zhailu' },
        // { value: 108, label: '窄桥', icon: 'plus' },
        // { value: 109, label: '易滑', icon: 'plus' },
        // { value: 110, label: '双向交通', icon: 'plus' },
        { value: 111, label: '注意行人', icon: 'zhuyixingren' },
        // { value: 112, label: '注意儿童', icon: 'plus' },
        // { value: 113, label: '注意牲畜', icon: 'plus' },
        // { value: 114, label: '渡口', icon: 'plus' },
        // { value: 115, label: '注意野生动物', icon: 'plus' },
        // { value: 116, label: '注意信号灯', icon: 'plus' },
        // { value: 117, label: '村庄', icon: 'plus' },
        // { value: 118, label: '注意落石', icon: 'plus' },
        // { value: 119, label: '注意横风', icon: 'plus' },
        // { value: 120, label: '傍山险路', icon: 'plus' },
        // { value: 121, label: '堤坝路', icon: 'plus' },
        // { value: 122, label: '隧道', icon: 'plus' },
        // { value: 123, label: '驼峰桥', icon: 'plus' },
        // { value: 124, label: '路面不平', icon: 'plus' },
        // { value: 125, label: '路面高突', icon: 'plus' },
        // { value: 126, label: '路面低洼', icon: 'plus' },
        // { value: 127, label: '过水路面（漫水桥）', icon: 'plus' },
        // { value: 128, label: '铁路道口', icon: 'plus' },
        // { value: 129, label: '人行横道', icon: 'plus' },
        { value: 129, label: '注意非机动车', icon: 'zhuyifeijidongche' },
        // { value: 131, label: '注意残疾人', icon: 'plus' },
        { value: 131, label: '事故易发路段', icon: 'shiguyifaluduan' },
        { value: 132, label: '慢行', icon: 'manxing' },
        // { value: 134, label: '注意障碍物绕行', icon: 'plus' },
        { value: 134, label: '注意危险', icon: 'zhuyiweixian' },
        { value: 135, label: '施工', icon: 'shigong' },
        // { value: 137, label: '建议速度', icon: 'plus' },
        // { value: 138, label: '注意潮汐车道', icon: 'plus' },
        // { value: 139, label: '避险车道', icon: 'plus' },
        { value: 140, label: '注意合流', icon: 'zhuyiheliu' },
        // { value: 141, label: '注意分离式道路', icon: 'plus' },
        // { value: 142, label: '注意保持车距', icon: 'plus' },
        // { value: 143, label: '注意前方车辆排队', icon: 'plus' },
        // { value: 144, label: '注意路面结冰、雨（雪）天气', icon: 'plus' },
        { value: 201, label: '停车让行', icon: 'tingcherangxing' },
        { value: 202, label: '减速让行', icon: 'jiansurangxing' },
        // { value: 203, label: '会车让行', icon: 'plus' },
        // { value: 204, label: '禁止通行', icon: 'plus' },
        { value: 205, label: '禁止驶入', icon: 'jinzhishiru' },
        { value: 206, label: '禁止机动车驶入', icon: 'jinzhijidongcheshiru' },
        { value: 207, label: '禁止向左转弯', icon: 'jinzhixiangzuozhuanwan' },
        { value: 208, label: '禁止向右转弯', icon: 'jinzhixiangyouzhuanwan' },
        { value: 209, label: '禁止直行', icon: 'jinzhizhixing' },
        {
            value: 210,
            label: '禁止向左向右转弯',
            icon: 'jinzhixiangzuoxiangyouzhuanwan'
        },
        // { value: 211, label: '禁止直行和向左转弯', icon: 'plus' },
        // { value: 212, label: '禁止直行和向右转弯', icon: 'plus' },
        // { value: 213, label: '禁止掉头', icon: 'plus' },
        { value: 214, label: '禁止超车', icon: 'jinzhichaoche' },
        // { value: 215, label: '解除禁止超车', icon: 'plus' },
        { value: 216, label: '禁止停车', icon: 'jinzhitingche' },
        // { value: 217, label: '禁止长时停车', icon: 'plus' },
        // { value: 218, label: '禁止鸣喇叭', icon: 'plus' },
        { value: 219, label: '限制速度', icon: 'xianzhisudu' },
        { value: 220, label: '解除限制速度', icon: 'jiechuxianzhisudu' },
        // { value: 221, label: '停车检查', icon: 'plus' },
        // { value: 222, label: '海关', icon: 'plus' },
        // { value: 223, label: '区域禁止', icon: 'plus' },
        // { value: 224, label: '区域禁止解除', icon: 'plus' },
        { value: 233, label: '其他禁止标志', icon: 'qitajinzhibiaozhi' },
        // { value: 301, label: '直行', icon: 'plus' },
        // { value: 302, label: '向左转弯', icon: 'plus' },
        // { value: 303, label: '向右转弯', icon: 'plus' },
        // { value: 304, label: '直行和向左转弯', icon: 'plus' },
        // { value: 305, label: '直行和向右行驶', icon: 'plus' },
        // { value: 306, label: '向左和向右行驶', icon: 'plus' },
        // { value: 307, label: '靠左侧道路行驶', icon: 'plus' },
        // { value: 308, label: '靠右侧道路行驶', icon: 'plus' },
        // { value: 309, label: '立体交叉行驶路线', icon: 'plus' },
        // { value: 310, label: '环岛行驶', icon: 'plus' },
        // { value: 311, label: '单行路', icon: 'plus' },
        { value: 312, label: '步行', icon: 'buxing' },
        // { value: 313, label: '鸣喇叭', icon: 'plus' },
        // { value: 314, label: '最低限速', icon: 'plus' },
        // { value: 315, label: '路口优先通行', icon: 'plus' },
        // { value: 316, label: '会车先行', icon: 'plus' },
        // { value: 317, label: '人行横道', icon: 'plus' },
        {
            value: 318,
            label: '车道行驶方向--直行',
            icon: 'chedaoxingshifangxiang'
        },
        { value: 319, label: '专用道路和车道', icon: 'zhuanyongdaoluhechedao' },
        { value: 320, label: '停车位', icon: 'tingchewei' },
        { value: 321, label: '允许掉头', icon: 'yunxudiaotou' },
        { value: 500, label: '其他标志', icon: 'qitabiaozhipai' },
        { value: 600, label: '动态标志牌', icon: 'dongtaibiaozhipai' }
    ],
    AD_TRAFFIC_LIGHT_TYPE: [
        { value: 0, label: '未定义', icon: 'weidingyi' },
        {
            value: 1,
            label: '普通机动车信号灯',
            icon: 'putongjidongchexinhaodeng'
        },
        {
            value: 2,
            label: '方向指示信号灯',
            icon: 'fangxiangzhishixinhaodeng'
        },
        {
            value: 3,
            label: '道路与铁路平面交叉道口信号灯',
            icon: 'daoluyutielupingmianjiaochadaokouxinhaodeng'
        },
        {
            value: 4,
            label: '人行横道信号灯',
            icon: 'renxinghengdaoxinhaodeng'
        },
        {
            value: 99,
            label: '其他',
            icon: 'qita'
        }
    ],
    AD_TRAFFIC_LIGHT_LAYOUT: [
        { value: 0, label: '未定义' },
        { value: 1, label: '灯头垂直布局' },
        { value: 2, label: '灯头水平布局' },
        { value: 3, label: '单个灯头' }
    ],
    AD_ARROW_ARR_DIRECT: [
        { value: '0', label: '未定义', icon: 'weidingyi' },
        { value: 'A', label: '直行', icon: 'zhixing' },
        { value: 'B', label: '左转', icon: 'zuozhuan' },
        { value: 'C', label: '右转', icon: 'youzhuan' },
        { value: 'D', label: '左掉头', icon: 'zuodiaotou' },
        { value: 'E', label: '右掉头', icon: 'youdiaotou' },
        {
            value: 'F',
            label: '左弯或需向左合流',
            icon: 'zuowanhuoxuxiangzuoheliu'
        },
        {
            value: 'G',
            label: '右弯或需向右合流',
            icon: 'youwanhuoxuxiangyouheliu'
        },
        {
            value: 'H',
            label: '左后方转弯',
            icon: 'zuohoufangzhuanwan'
        },
        {
            value: 'I',
            label: '右后方转弯',
            icon: 'youhoufangzhuanwan'
        },
        {
            value: 'J',
            label: '禁止左掉头',
            icon: 'jinzhizuodiaotou'
        },
        {
            value: 'K',
            label: '禁止右掉头',
            icon: 'jinzhiyoudiaotou'
        },
        {
            value: 'L',
            label: '禁止左转',
            icon: 'jinzhizuozhuan'
        },
        {
            value: 'M',
            label: '禁止右转',
            icon: 'jinzhiyouzhuan'
        }
    ],
    AD_MAP_QC_FILE_NAME: [
        { value: 'AD_Road', label: '道路参考线' },
        { value: 'AD_LaneDivider', label: '车道线' },
        { value: 'AD_Lane', label: '车道中心线' },
        { value: 'AD_LaneAttrPoint', label: '车道属性变化点' },
        { value: 'AD_Arrow', label: '地面引导箭头' },
        { value: 'AD_StopLocation', label: '停止位置' },
        { value: 'AD_LaneMark_Plg', label: '面状标识物' },
        { value: 'AD_Text', label: '地面文字符号' },
        { value: 'AD_TrafficSign', label: '交通标志牌' },
        { value: 'AD_TrafficLight', label: '交通信号灯' },
        { value: 'AD_Pole', label: '杆状物' },
        { value: 'AD_RS_Barrier', label: '隔离带、护栏' }
    ],
    AD_MAP_QC_ERROR_TYPE: [
        { value: 0, label: '未定义' },
        { value: 1, label: '几何形状错误' },
        { value: 2, label: '拓扑连接错误' },
        { value: 3, label: '属性错误' },
        { value: 4, label: '关联关系错误' },
        { value: 5, label: '打断位置错误' },
        { value: 6, label: '多做' },
        { value: 7, label: '制作遗漏' },
        { value: 8, label: '其他' }
    ],
    AD_MAP_QC_FIX_STATUS: [
        { value: 0, label: '未定义' },
        { value: 1, label: '待修正' },
        { value: 2, label: '无需修正' },
        { value: 3, label: '已修正' }
    ],
    AD_MAP_QC_QC_STATUS: [
        { value: 0, label: '未定义' },
        { value: 1, label: '已修正' },
        { value: 2, label: '未修正' }
    ],
    AD_SUB_LAMP_TYPE: [
        { value: '0', label: '未定义' },
        { value: 'A', label: '圆灯' },
        { value: 'B', label: '方向向左的箭头' },
        { value: 'C', label: '方向向右的箭头' },
        { value: 'D', label: '直行' },
        { value: 'E', label: '掉头' },
        { value: 'F', label: '车道指示箭头' },
        { value: 'G', label: '叉形' },
        { value: 'H', label: '行人' },
        { value: 'I', label: '非机动车' },
        { value: 'J', label: '读秒' }
    ],
    AD_TS_CONTENT_CONT_TYPE: [
        { value: 1, label: '禁止转向' },
        { value: 0, label: '未定义' },
        { value: 2, label: '限制转向' },
        { value: 3, label: '最大速度限制' },
        { value: 4, label: '最低速度限制' }
    ],
    AD_RS_BARRIER_TYPE: [
        { value: 0, label: '未定义', icon: 'weidingyi' },
        { value: 1, label: '隧道墙', icon: 'suidaoqiang' },
        { value: 2, label: '路侧防护栏', icon: 'lucefanghulan' },
        { value: 3, label: '路缘石', icon: 'luyuanshi' },
        { value: 4, label: '隔音墙', icon: 'geyinqiang' }
    ],
    AD_RS_BARRIER_MATERIAL: [
        { value: 0, label: '未定义' },
        { value: 1, label: '混凝土' },
        { value: 2, label: '金属' },
        { value: 3, label: '塑料' },
        { value: 4, label: '其他' }
    ],
    AD_TEXT_TYPE: [
        { value: 0, label: '未定义', icon: 'weidingyi' },
        { value: 1, label: '最高限速', icon: 'zuigaoxiansu' },
        { value: 2, label: '最低限速', icon: 'zuidixiansu' },
        {
            value: 3,
            label: '公交车道时间限制',
            icon: 'gongjiaochedaoshijianxianzhi'
        },
        { value: 99, label: '其他', icon: 'qita' }
    ],
    AD_LANE_RS_TYPE: [
        { value: 0, label: '未定义' },
        { value: 1, label: '禁止驶入' },
        { value: 2, label: '潮汐车道限制' },
        { value: 3, label: '禁止停车限制' }
    ],
    AD_LANE_RS_VALUE: [{ value: 0, label: '未定义' }],
    AD_LANE_RS_VALUE0: [{ value: 0, label: '未定义' }],
    AD_LANE_RS_VALUE1: [
        { value: 0, label: '未定义' },
        { value: 1, label: '公交车道禁止驶入' },
        { value: 2, label: '外埠车辆禁止驶入' },
        { value: 3, label: '禁止驶入' },
        { value: 4, label: 'HOV车道禁止驶入' }
    ],
    AD_LANE_RS_VALUE2: [
        { value: 0, label: '未定义' },
        { value: 1, label: '正向通行' },
        { value: 2, label: '逆向通行' },
        { value: 3, label: '禁止通行' }
    ],
    AD_LANE_RS_VALUE3: [
        { value: 0, label: '未定义' },
        { value: 1, label: '禁止停车' },
        { value: 2, label: '禁止长时间停车' },
        { value: 3, label: '禁止停车时间' }
    ],
    AD_LANE_CON_RS_TYPE: [
        { value: 0, label: '未定义' },
        { value: 1, label: '禁止转向限制' }
    ]
};

export const DEFAULT_PROPERTIES_MAP = {
    AD_Arrow: {
        ARR_DIRECT: 'A',
        LANE_ID: 0
    },
    AD_LaneMark_Plg: {
        TYPE: 1
    },
    AD_Text: {
        TYPE: 99,
        LANE_ID: 0,
        VALUE: ''
    },
    AD_TrafficSign: {
        // TYPE: 101,
        SIGN_STYLE: 1
    },
    AD_TrafficLight: {
        TYPE: 1,
        LAYOUT: 1,
        LAMP_COUNT: 0
    },
    AD_LaneDivider: {
        TYPE: 1,
        DIRECTION: 1,
        RD_LINE: 2,
        SHARE_LINE: 1,
        LANESTATUS: 1,
        LANE_TYPE: 1,
        LANE_NO: 0,
        RD_FORM: 1
    },
    AD_Road: {
        TYPE: 1,
        RD_CLASS: 0,
        CROSSING: 0,
        RD_STATUS: 0,
        RD_FORM: 0,
        DIRECTION: 0,
        LENGTH: 0,
        MAX_SPEED: 0
    },
    AD_Lane: {
        TYPE: 1,
        DIRECTION: 1,
        LANE_NO: 0,
        STATUS: 1,
        MAX_SPEED: 0,
        MIN_SPEED: 0,
        MAX_SP_TYP: 0,
        MIN_SP_TYP: 0,
        L_LDIV_ID: 0,
        R_LDIV_ID: 0,
        ROAD_ID: 0
    },
    AD_Lane_RS: {
        RS_TYPE: 0,
        RS_VALUE: 0,
        TIMEDOM: ''
    },
    AD_Lane_Con_RS: {
        RS_TYPE: 1,
        TIMEDOM: ''
    },
    AD_LaneAttrPoint: {
        TYPE: 0,
        ROAD_ID: 0
    },
    AD_StopLocation: {
        TYPE: 1
    },
    AD_Pole: {
        RADIUS_UP: 0,
        RADIUS_DN: 0
    },
    AD_Map_QC: {
        FILE_NAME: '',
        FEAT_ID: 0,
        ERROR_TYPE: 0,
        ERROR_DESC: '',
        FIX_STATUS: 0,
        QC_STATUS: 0,
        FIX_PERSON: '',
        QC_PERSON: ''
    },
    AD_RS_Barrier: {
        TYPE: 2,
        MATERIAL: 2
    },
    AD_TS_Content: {
        SIGN_TYPE: 0,
        CONT_TYPE: 0,
        TIMEDOM: '',
        CONT_VALUE: 0,
        SIGN_NO: 0
    },
    AD_Sub_Lamp: {
        LAMP_TYPE: 'A',
        LAMP_NO: 0
    }
};

export const TABLE_DATA_MAP = {
    AD_LaneDivider: [
        {
            key: 'LDIV_ID',
            name: '用户编号',
            type: 'AD_LANE_DIVIDER_LDIV_ID',
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
            key: 'RD_LINE',
            name: '参考线标识',
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
            key: 'LANE_NO',
            name: '车道编号',
            type: 'AD_LANE_DIVIDER_LANE_NO',
            domType: 'Input',
            validates: 'Char|5'
        },
        {
            key: 'RD_FORM',
            name: '道路形态',
            type: 'AD_LANE_DIVIDER_RD_FORM',
            domType: 'Select'
        }
    ],
    AD_Text: [
        {
            key: 'TEXT_ID',
            name: '用户编号',
            type: 'AD_TEXT_ID',
            domType: 'Text'
        },
        {
            key: 'TYPE',
            name: '文字符号类型',
            type: 'AD_TEXT_TYPE',
            domType: 'RadioIconGroup'
        },
        {
            key: 'VALUE',
            name: '地面文字内容',
            type: 'AD_TEXT_VALUE',
            domType: 'Input'
        }
    ],
    AD_Road: [
        {
            key: 'ROAD_ID',
            name: '用户编号',
            type: 'AD_ROAD_ID',
            domType: 'Text'
        },
        {
            key: 'TYPE',
            name: '参考线类型',
            type: 'AD_ROAD_TYPE',
            domType: 'RadioIconGroup'
        },
        {
            key: 'RD_STATUS',
            name: '道路通行状态',
            type: 'AD_ROAD_RD_STATUS',
            domType: 'Select'
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
        },
        {
            key: 'LENGTH',
            name: '道路长度',
            type: 'AD_ROAD_LENGTH',
            validates: [
                {
                    message: '必须为数字 单位为M',
                    type: 'number',
                    transform(value) {
                        if (value) {
                            return Number(value);
                        }
                    }
                }
            ],
            getValueFromEvent: e => {
                let value = Number(e.target.value);
                return !value ? e.target.value : value;
            },
            domType: 'Input'
        },
        {
            key: 'MAX_SPEED',
            name: '道路最高行驶速度',
            type: 'AD_ROAD_MAX_SPEED',
            domType: 'Input',
            validates: 'Numeric|range|0|120'
            // [
            //     {
            //         range: [0, 120],
            //         message: '[0,120]的整数',
            //         type: 'integer',
            //         transform(value) {
            //             if (value) {
            //                 return Number(value);
            //             }
            //         }
            //     }
            // ]
        }
    ],
    AD_Lane: [
        {
            key: 'LANE_ID',
            name: '用户编号',
            type: 'AD_LANE_LANE_ID',
            domType: 'Text'
        },
        {
            key: 'TYPE',
            name: '车道类型',
            type: 'AD_LANE_TYPE',
            domType: 'RadioIconGroup'
        },
        // {
        //     key: 'ROAD_ID',
        //     name: '关联参考线ID',
        //     type: 'AD_LANE_REFLINE_ID',
        //     domType: 'Text'
        // },
        // {
        //     key: 'L_LDIV_ID',
        //     name: '左侧车道线ID',
        //     type: 'AD_LANE_L_LDIV_ID',
        //     domType: 'Text'
        // },
        // {
        //     key: 'R_LDIV_ID',
        //     name: '右侧车道线ID',
        //     type: 'AD_LANE_R_LDIV_ID',
        //     domType: 'Text'
        // },
        {
            key: 'LANE_NO',
            name: '车道编号',
            type: 'AD_LANE_LANE_NO',
            domType: 'Input'
        },
        {
            key: 'DIRECTION',
            name: '车道通行方向',
            type: 'AD_LANE_DIRECTION',
            domType: 'Select'
        },
        // {
        //     key: 'RESTRICT',
        //     name: '限制类型',
        //     type: 'AD_LANE_RESTRICT',
        //     domType: 'Select'
        // },
        {
            key: 'MAX_SPEED',
            name: '最高行驶速度',
            type: 'AD_LANE_MAX_SPEED',
            domType: 'Input',
            validates: [
                {
                    range: [0, 120],
                    message: '[0,120]的整数',
                    type: 'integer',
                    transform(value) {
                        if (value) {
                            return Number(value);
                        }
                    }
                }
            ]
        },
        {
            key: 'MAX_SP_TYP',
            name: '最高速度来源',
            type: 'AD_LANE_MAX_SP_TYP',
            domType: 'Select'
        },
        {
            key: 'MIN_SPEED',
            name: '最低行驶速度',
            type: 'AD_LANE_MIN_SPEED',
            domType: 'Input',
            validates: [
                {
                    range: [0, 110],
                    message: '[0,110]的整数',
                    type: 'integer',
                    transform(value) {
                        if (value) {
                            return Number(value);
                        }
                    }
                }
            ]
        },
        {
            key: 'MIN_SP_TYP',
            name: '最低速度来源',
            type: 'AD_LANE_MIN_SP_TYP',
            domType: 'Select'
        },
        {
            key: 'STATUS',
            name: '车道通行状态',
            type: 'AD_LANE_STATUS',
            domType: 'Select'
        }
    ],
    AD_StopLocation: [
        {
            key: 'STOPL_ID',
            name: '用户编号',
            type: 'AD_STOPLOCATION_STOPL_ID',
            domType: 'Text'
        },
        {
            key: 'TYPE',
            name: '类型',
            type: 'AD_STOPLOCATION_TYPE',
            domType: 'RadioIconGroup'
        }
    ],
    AD_LaneMark_Plg: [
        {
            key: 'PLG_ID',
            name: '用户编号',
            type: 'AD_LANEMARK_PLG_ID',
            domType: 'Text'
        },
        {
            key: 'TYPE',
            name: '面要素类型',
            type: 'AD_LANEMARK_PLG_TYPE',
            domType: 'RadioIconGroup'
        }
    ],
    AD_Arrow: [
        {
            key: 'ARR_ID',
            name: '用户编号',
            type: 'AD_ARROW_ID',
            domType: 'Text'
        },
        {
            key: 'ARR_DIRECT',
            name: '箭头方向',
            type: 'AD_ARROW_ARR_DIRECT',
            domType: 'CheckBoxIconGroup'
        }
    ],
    AD_LaneAttrPoint: [
        {
            key: 'LAP_ID',
            name: '用户编号',
            type: 'AD_LANE_ATTRPOINT_ID',
            domType: 'Text'
        },
        {
            key: 'TYPE',
            name: '属性变化点类型',
            type: 'AD_LANE_ATTRPOINT_TYPE',
            domType: 'RadioIconGroup'
        }
    ],
    AD_TrafficSign: [
        {
            key: 'SIGN_ID',
            name: '用户编号',
            type: 'AD_TRAFFICSIGN_ID',
            domType: 'Text'
        },
        {
            key: 'SIGN_STYLE',
            name: '标志牌类型',
            type: 'AD_TRAFFICSIGN_SIGN_STYLE',
            domType: 'Select'
        }
    ],
    AD_TrafficLight: [
        {
            key: 'LIGHT_ID',
            name: '用户编号',
            type: 'AD_TRAFFIC_LIGHT_ID',
            domType: 'Text'
        },
        {
            key: 'TYPE',
            name: '交通灯类型',
            type: 'AD_TRAFFIC_LIGHT_TYPE',
            domType: 'RadioIconGroup'
        },
        {
            key: 'LAYOUT',
            name: '信号灯灯头布局',
            type: 'AD_TRAFFIC_LIGHT_LAYOUT',
            domType: 'Select'
        },
        {
            key: 'LAMP_COUNT',
            name: '信号灯灯头数量',
            type: 'AD_TRAFFIC_LIGHT_LAMP_COUNT',
            validates: [
                {
                    message: '必须为数字',
                    type: 'number',
                    transform(value) {
                        if (value) {
                            return Number(value);
                        }
                    }
                }
            ],
            getValueFromEvent: e => {
                let value = Number(e.target.value);
                return !value ? e.target.value : value;
            },
            domType: 'Input'
        }
    ],
    AD_Map_QC: [
        {
            key: 'ID',
            name: '用户编号',
            type: 'AD_MAP_QC_ID',
            domType: 'Text'
        },
        {
            key: 'FILE_NAME',
            name: '错误图层名称',
            type: 'AD_MAP_QC_FILE_NAME',
            required: true,
            domType: 'Select'
        },
        {
            key: 'FEAT_ID',
            name: '错误数据ID',
            type: 'AD_MAP_QC_FEAT_ID',
            validates: [
                {
                    max: 15,
                    message: '必须为15位以内数字',
                    type: 'number',
                    transform(value) {
                        if (value) {
                            return Number(value);
                        }
                    }
                }
            ],
            getValueFromEvent: e => {
                let value = Number(e.target.value);
                return !value ? e.target.value : value;
            },
            domType: 'Input'
        },
        {
            key: 'ERROR_TYPE',
            name: '错误类型',
            type: 'AD_MAP_QC_ERROR_TYPE',
            domType: 'Select'
        },
        {
            key: 'ERROR_DESC',
            name: '错误描述',
            type: 'AD_MAP_QC_ERROR_DESC',
            domType: 'Input',
            validates: [
                {
                    max: 250,
                    message: '长度不能超过250字'
                }
            ]
        },
        {
            key: 'FIX_STATUS',
            name: '修正状态',
            type: 'AD_MAP_QC_FIX_STATUS',
            domType: 'Select'
        },
        {
            key: 'QC_STATUS',
            name: '检查结果',
            type: 'AD_MAP_QC_QC_STATUS',
            domType: 'Select'
        },
        {
            key: 'FIX_PERSON',
            name: '返工修改人员',
            type: 'AD_MAP_QC_FIX_PERSON',
            domType: 'Input',
            validates: [
                {
                    max: 20,
                    message: '长度不能超过20字'
                }
            ]
        },
        {
            key: 'QC_PERSON',
            name: '质检人员',
            type: 'AD_MAP_QC_QC_PERSON',
            domType: 'Input',
            validates: [
                {
                    max: 20,
                    message: '长度不能超过20字'
                }
            ]
        }
    ],
    AD_RS_Barrier: [
        {
            key: 'BARR_ID',
            name: '用户编号',
            type: 'AD_RS_BARRIER_BARR_ID',
            domType: 'Text'
        },
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
    ],
    AD_Pole: [
        {
            key: 'POLE_ID',
            name: '用户编号',
            type: 'AD_POLE_ID',
            domType: 'Text'
        },
        {
            key: 'RADIUS_UP',
            name: '杆状物立柱顶部半径',
            type: 'AD_POLE_RADIUS_UP',
            domType: 'Input',
            validates: [
                {
                    max: 10,
                    message: '最大长度10'
                }
            ]
        },
        {
            key: 'RADIUS_DN',
            name: '杆状物立柱底部半径',
            type: 'AD_POLE_RADIUS_DN',
            domType: 'Input',
            validates: [
                {
                    max: 10,
                    message: '最大长度10'
                }
            ]
        }
    ]
};
