export const TYPE_SELECT_OPTION_MAP = {
    AD_LANE_DIVIDER_TYPE: [
        { value: 0, label: '未定义', icon: 'weidingyi', abbreviation: '0' },
        { value: 1, label: '单实线', icon: 'danshixian', abbreviation: '单实' },
        { value: 2, label: '单虚线', icon: 'danxuxian', abbreviation: '单虚' },
        { value: 3, label: '双实线', icon: 'shuangshixian', abbreviation: '双实' },
        { value: 4, label: '双虚线', icon: 'shuangxuxian', abbreviation: '双虚' },
        { value: 5, label: '左实右虚', icon: 'zuoshiyouxu', abbreviation: '实虚' },
        { value: 6, label: '左虚右实', icon: 'zuoxuyoushi', abbreviation: '虚实' },
        { value: 7, label: '短粗虚线', icon: 'duancuxuxian', abbreviation: '短' },
        { value: 8, label: '导流线', icon: 'daoliuxian', abbreviation: '导' },
        { value: 9, label: '虚拟线车道线', icon: 'chedaoxunichedaoxian', abbreviation: '车虚' },
        {
            value: 10,
            label: '路边缘虚拟车道线',
            icon: 'lubianyuanxunichedaoxian',
            abbreviation: '路虚'
        },
        { value: 11, label: '防护栏', icon: 'lucefanghulan', abbreviation: '防护' },
        { value: 12, label: '隧道墙', icon: 'suidaoqiang', abbreviation: '隧道' },
        { value: 13, label: '路缘石', icon: 'luyuanshi', abbreviation: '牙' },
        { value: 14, label: '自然边界', icon: 'ziranbianjie', abbreviation: '自然' },
        { value: 15, label: '施工边界', icon: 'shigongbianjie', abbreviation: '施工' },
        { value: 16, label: '路中隔离带', icon: 'gelidaichedao', abbreviation: '中隔' },
        {
            value: 17,
            label: '路口内待行区（车道线）',
            icon: 'lukouneidaixingqu',
            abbreviation: '待行'
        },
        {
            value: 18,
            label: '可变导向车道线',
            icon: 'kebiandaoxiangchedaoxian',
            abbreviation: '可变'
        },
        {
            value: 19,
            label: '路口内虚拟车道线',
            icon: 'lukouneixunichedaoxian',
            abbreviation: '口虚'
        },
        {
            value: 20,
            label: '其他虚拟车道线',
            icon: 'qitaxunichedaoxian',
            abbreviation: '其虚'
        },
        {
            value: 21,
            label: '纵向菱形减速车道线',
            icon: 'qitaxunichedaoxian',
            abbreviation: '菱'
        },
        {
            value: 22,
            label: '隔音墙',
            icon: 'qitaxunichedaoxian',
            abbreviation: '隔'
        },
        { value: 99, label: '其他', icon: 'qita', abbreviation: '99' }
    ],
    AD_LANE_DIVIDER_DIRECTION: [
        { value: 0, label: '未定义', abbreviation: '0' },
        { value: 1, label: '正向通行', abbreviation: '正' },
        { value: 2, label: '逆向通行', abbreviation: '逆' },
        { value: 3, label: '双向通行', abbreviation: '双' },
        { value: 4, label: '禁止通行', abbreviation: '禁止' }
    ],
    AD_LANE_DIVIDER_RD_LINE: [
        { value: 0, label: '未定义', abbreviation: '0' },
        { value: 1, label: '道路参考线', abbreviation: '参' },
        { value: 2, label: '非道路参考线', abbreviation: '非参' }
    ],
    AD_LANE_DIVIDER_SHARE_LINE: [
        { value: 0, label: '未定义', abbreviation: '0' },
        { value: 1, label: '非共用车道线', abbreviation: '非共' },
        { value: 2, label: '逆向交通流共用车道线', abbreviation: '逆' },
        { value: 3, label: '同向交通流共用车道线', abbreviation: '同' }
    ],
    AD_LANE_DIVIDER_RD_EDGE: [
        { value: 0, label: '未定义', abbreviation: '0' },
        { value: 1, label: '道路边界', abbreviation: '边' },
        { value: 2, label: '非道路边界', abbreviation: '非边' }
    ],
    AD_LANE_DIVIDER_LANE_STATUS: [
        { value: 0, label: '未定义', abbreviation: '0' },
        { value: 1, label: '正常通行', abbreviation: '正常' },
        { value: 2, label: '建设中', abbreviation: '建设' },
        { value: 3, label: '禁止通行', abbreviation: '禁止' },
        { value: 99, label: '其他', abbreviation: '99' }
    ],
    AD_LANE_DIVIDER_LANE_TYPE: [
        { value: 0, label: '未定义', icon: 'weidingyi', abbreviation: '0' },
        { value: 1, label: '普通车道', icon: 'putongchedao', abbreviation: '普' },
        { value: 2, label: '路口车道', icon: 'lukouchedao', abbreviation: '路口' },
        { value: 3, label: '应急车道', icon: 'yingjichedao', abbreviation: '应急' },
        { value: 4, label: '非机动车道', icon: 'feijidongchedao', abbreviation: '非' },
        { value: 5, label: '机非混合车道', icon: 'jifeihunhechedao', abbreviation: '机非' },
        { value: 6, label: '公交车道', icon: 'gongjiaochedao', abbreviation: '公' },
        { value: 7, label: '右转专用道', icon: 'youzhuanzhuanyongdao', abbreviation: '右专' },
        { value: 8, label: 'ETC车道', icon: 'etcchedao', abbreviation: 'ETC' },
        { value: 9, label: '收费站车道', icon: 'shoufeizhanchedao', abbreviation: '费' },
        { value: 10, label: '左转专用道', icon: 'zuozhuanzhuanyongdao', abbreviation: '左专' },
        { value: 11, label: '右侧加速车道', icon: 'youcejiasuchedao', abbreviation: '右加' },
        { value: 12, label: '右侧减速车道', icon: 'youcejiansuchedao', abbreviation: '右减' },
        { value: 13, label: '匝道', icon: 'zadao', abbreviation: '匝' },
        // { value: 14, label: '隔离带车道', icon: 'gelidaichedao', abbreviation: '隔离' },
        { value: 15, label: '紧急停车道', icon: 'jinjitingchedao', abbreviation: '紧停' },
        { value: 16, label: 'HOV车道', icon: 'hovchedao', abbreviation: 'HOV' },
        // {
        //     value: 17,
        //     label: '危险品专用车道',
        //     icon: 'weixianpinzhuanyongchedao1',
        //     abbreviation: '危'
        // },
        // { value: 18, label: '爬坡车道', icon: 'papochedao', abbreviation: '坡' },
        { value: 19, label: '可变导向车道', icon: 'kebiandaoxiangchedao', abbreviation: '可变' },
        // { value: 20, label: '海关监管车道', icon: 'haiguanjianguanchedao', abbreviation: '海' },
        { value: 21, label: '避险车道引道', icon: 'bixianchedaoyindao', abbreviation: '避' },
        { value: 22, label: '停车道', icon: 'tingchedao', abbreviation: '停' },
        { value: 23, label: '潮汐车道', icon: 'chaoxichedao', abbreviation: '潮' },
        { value: 24, label: '左转待转车道', icon: 'zuozhuandaizhuanchedao', abbreviation: '左待' },
        { value: 25, label: '直行待行车道', icon: 'zhixingdaixingchedao', abbreviation: '直待' },
        { value: 26, label: '掉头车道', icon: 'diaotouchedao', abbreviation: '掉头' },
        // { value: 27, label: '超车道', icon: 'chaochedao', abbreviation: '超' },
        { value: 28, label: '服务区车道', icon: 'fuwuquchedao', abbreviation: '服' },
        { value: 29, label: '左侧加速车道', icon: 'zuocejiasuchedao', abbreviation: '左加' },
        { value: 30, label: '左侧减速车道', icon: 'zuocejiansuchedao', abbreviation: '左减' },
        { value: 31, label: '加减速复合车道', icon: 'jiajiansufuhechedao', abbreviation: '加减' },
        { value: 32, label: '公交港湾', icon: 'gongjiaogangwan', abbreviation: '公港' },
        { value: 33, label: '右转待转车道', icon: 'gongjiaogangwan', abbreviation: '右待' },
        { value: 34, label: '掉头待转车道', icon: 'gongjiaogangwan', abbreviation: '掉待' },
        { value: 99, label: '其他', icon: 'qita', abbreviation: '99' }
    ],
    AD_LANE_DIVIDER_RD_FORM: [
        { value: 0, label: '未定义', abbreviation: '0' },
        { value: 1, label: '普通道路', abbreviation: '普' },
        { value: 2, label: '隧道道路', abbreviation: '隧' },
        { value: 3, label: '收费站道路', abbreviation: '收费' }
    ],
    AD_ROAD_TYPE: [
        { value: 0, label: '未定义', icon: 'weidingyi', abbreviation: '0' },
        { value: 1, label: '实际道路参考线', icon: 'shijidaolucankaoxian', abbreviation: '实' },
        { value: 2, label: '虚拟道路参考线', icon: 'xunidaolucankaoxian', abbreviation: '虚' }
    ],
    AD_ROAD_RD_STATUS: [
        { value: 0, label: '未定义', abbreviation: '0' },
        { value: 1, label: '正常通行', abbreviation: '正常' },
        { value: 2, label: '建设中', abbreviation: '建设' },
        { value: 3, label: '禁止通行', abbreviation: '禁止' },
        { value: 99, label: '其他', abbreviation: '99' }
    ],
    AD_ROAD_RD_FORM: [
        { value: 0, label: '未定义', abbreviation: '0' },
        { value: 1, label: '普通道路', abbreviation: '普' },
        { value: 2, label: '隧道道路', abbreviation: '隧' },
        { value: 3, label: '收费站道路', abbreviation: '收费' },
        { value: 4, label: '匝道', abbreviation: '匝' },
        { value: 5, label: '辅路', abbreviation: '辅' },
        { value: 6, label: '环岛', abbreviation: '环' }
    ],
    AD_ROAD_DIRECTION: [
        { value: 0, label: '未定义', abbreviation: '0' },
        { value: 1, label: '正向通行', abbreviation: '正' },
        { value: 2, label: '逆向通行', abbreviation: '逆' },
        { value: 3, label: '双向通行', abbreviation: '双' },
        { value: 4, label: '禁止通行', abbreviation: '禁止' }
    ],
    AD_ROAD_CROSSING: [
        { value: 0, label: '未定义', abbreviation: '0' },
        { value: 1, label: '交叉路口内', abbreviation: '路口' },
        { value: 2, label: '非交叉路口内', abbreviation: '非路' }
    ],
    AD_LANE_TYPE: [
        { value: 0, label: '未定义', icon: 'weidingyi', abbreviation: '0' },
        { value: 1, label: '普通车道', icon: 'putongchedao', abbreviation: '普' },
        { value: 2, label: '路口车道', icon: 'lukouchedao', abbreviation: '路口' },
        { value: 3, label: '应急车道', icon: 'yingjichedao', abbreviation: '应急' },
        { value: 4, label: '非机动车道', icon: 'feijidongchedao', abbreviation: '非' },
        { value: 5, label: '机非混合车道', icon: 'jifeihunhechedao', abbreviation: '机非' },
        { value: 6, label: '公交车道', icon: 'gongjiaochedao', abbreviation: '公' },
        { value: 7, label: '右转专用道', icon: 'youzhuanzhuanyongdao', abbreviation: '右专' },
        { value: 8, label: 'ETC车道', icon: 'etcchedao', abbreviation: 'ETC' },
        { value: 9, label: '收费站车道', icon: 'shoufeizhanchedao', abbreviation: '费' },
        { value: 10, label: '左转专用道', icon: 'zuozhuanzhuanyongdao', abbreviation: '左专' },
        { value: 11, label: '右侧加速车道', icon: 'youcejiasuchedao', abbreviation: '右加' },
        { value: 12, label: '右侧减速车道', icon: 'youcejiansuchedao', abbreviation: '右减' },
        { value: 13, label: '匝道', icon: 'zadao', abbreviation: '匝' },
        // { value: 14, label: '隔离带车道', icon: 'gelidaichedao', abbreviation: '隔离' },
        { value: 15, label: '紧急停车道', icon: 'jinjitingchedao', abbreviation: '紧停' },
        { value: 16, label: 'HOV车道', icon: 'hovchedao', abbreviation: 'HOV' },
        // {
        //     value: 17,
        //     label: '危险品专用车道',
        //     icon: 'weixianpinzhuanyongchedao1',
        //     abbreviation: '危'
        // },
        // { value: 18, label: '爬坡车道', icon: 'papochedao', abbreviation: '坡' },
        { value: 19, label: '可变导向车道', icon: 'kebiandaoxiangchedao', abbreviation: '可变' },
        // { value: 20, label: '海关监管车道', icon: 'haiguanjianguanchedao', abbreviation: '海' },
        { value: 21, label: '避险车道引道', icon: 'bixianchedaoyindao', abbreviation: '避' },
        { value: 22, label: '停车道', icon: 'tingchedao', abbreviation: '停' },
        { value: 23, label: '潮汐车道', icon: 'chaoxichedao', abbreviation: '潮' },
        { value: 24, label: '左转待转车道', icon: 'zuozhuandaizhuanchedao', abbreviation: '左待' },
        { value: 25, label: '直行待行车道', icon: 'zhixingdaixingchedao', abbreviation: '直待' },
        { value: 26, label: '掉头车道', icon: 'diaotouchedao', abbreviation: '掉头' },
        // { value: 27, label: '超车道', icon: 'chaochedao', abbreviation: '超' },
        { value: 28, label: '服务区车道', icon: 'fuwuquchedao', abbreviation: '服' },
        { value: 29, label: '左侧加速车道', icon: 'zuocejiasuchedao', abbreviation: '左加' },
        { value: 30, label: '左侧减速车道', icon: 'zuocejiansuchedao', abbreviation: '左减' },
        { value: 31, label: '加减速复合车道', icon: 'jiajiansufuhechedao', abbreviation: '加减' },
        { value: 32, label: '公交港湾', icon: 'gongjiaogangwan', abbreviation: '公港' },
        { value: 33, label: '右转待转车道', icon: 'gongjiaogangwan', abbreviation: '右待' },
        { value: 34, label: '掉头待转车道', icon: 'gongjiaogangwan', abbreviation: '掉待' },
        { value: 99, label: '其他', icon: 'qita', abbreviation: '99' }
    ],
    AD_LANE_DIRECTION: [
        { value: 0, label: '未定义', abbreviation: '0' },
        { value: 1, label: '正向通行', abbreviation: '正' },
        { value: 2, label: '逆向通行', abbreviation: '逆' },
        { value: 3, label: '双向通行', abbreviation: '双' },
        { value: 4, label: '禁止通行', abbreviation: '禁止' }
    ],
    AD_LANE_MAX_SP_TYP: [
        { value: 0, label: '未定义', abbreviation: '0' },
        { value: 1, label: '实地采集', abbreviation: '实地' },
        { value: 2, label: '逻辑推断', abbreviation: '逻辑' },
        { value: 3, label: '法定推荐', abbreviation: '法定' }
    ],
    AD_LANE_MIN_SP_TYP: [
        { value: 0, label: '未定义', abbreviation: '0' },
        { value: 1, label: '实地采集', abbreviation: '实地' },
        { value: 2, label: '逻辑推断', abbreviation: '逻辑' },
        { value: 3, label: '法定推荐', abbreviation: '法定' }
    ],
    AD_LANE_STATUS: [
        { value: 0, label: '未定义', abbreviation: '0' },
        { value: 1, label: '正常通行', abbreviation: '正常' },
        { value: 2, label: '建设中', abbreviation: '建设' },
        { value: 3, label: '禁止通行', abbreviation: '禁止' },
        { value: 99, label: '其他', abbreviation: '99' }
    ],
    AD_LANE_ATTRPOINT_TYPE: [
        { value: 0, label: '未定义', icon: 'weidingyi', abbreviation: '0' },
        { value: 1801, label: '道路左侧出口', icon: 'daoluzuocechukou', abbreviation: '左出' },
        { value: 1802, label: '道路右侧出口', icon: 'daoluyoucechukou', abbreviation: '右出' },
        { value: 1803, label: '道路分离点', icon: 'daolufenlidian', abbreviation: '路分' },
        { value: 1804, label: '道路合并点', icon: 'daoluhebingdian', abbreviation: '路合' },
        { value: 1805, label: '车道合并点', icon: 'chedaohebingdian', abbreviation: '道合' },
        { value: 1806, label: '收费杆位置', icon: 'shoufeiganweizhi', abbreviation: '收费杆' },
        {
            value: 1807,
            label: '收费站入口最近点',
            icon: 'shoufeizhanrukouzuijindian',
            abbreviation: '入口'
        },
        { value: 1808, label: '上方道路起点', icon: 'shangfangdaoluqidian', abbreviation: '上起' },
        {
            value: 1809,
            label: '上方道路终点',
            icon: 'shangfangdaoluzhongdian',
            abbreviation: '上终'
        },
        { value: 1810, label: '下方道路起点', icon: 'xiafangdaoluqidian', abbreviation: '下起' },
        { value: 1811, label: '下方道路终点', icon: 'xiafangdaoluzhongdian', abbreviation: '下终' },
        {
            value: 1821,
            label: '服务区道路开始位置',
            icon: 'fuwuqudaolukaishiweizhi',
            abbreviation: '服开'
        },
        {
            value: 1822,
            label: '服务区道路结束位置',
            icon: 'fuwuqudaolujieshuweizhi',
            abbreviation: '服结'
        },
        {
            value: 1841,
            label: '点云不清晰起点',
            icon: 'dianyunbuqingxiqishi',
            abbreviation: '不清起'
        },
        {
            value: 1842,
            label: '点云不清晰结束点',
            icon: 'dianyunbuqingxijieshu',
            abbreviation: '不清结'
        },
        { value: 1843, label: '点云遮挡起点', icon: 'dianyunzhedangqishi', abbreviation: '遮起' },
        {
            value: 1844,
            label: '点云遮挡结束点',
            icon: 'dianyunzhedangjieshu',
            abbreviation: '遮结'
        },
        { value: 1845, label: '精度误差起点', icon: 'jingduwuchaqishi', abbreviation: '差起' },
        { value: 1846, label: '精度误差结束点', icon: 'jingduwuchajieshu', abbreviation: '差结' },
        { value: 1847, label: '道路施工起点', icon: 'daolushigongqishi', abbreviation: '施工起' },
        { value: 1848, label: '道路施工结束点', icon: 'daolushigongjieshu', abbreviation: '施工结' }
    ],
    AD_STOPLOCATION_TYPE: [
        { value: 0, label: '未定义', icon: 'weidingyi', abbreviation: '0' },
        { value: 1, label: '停止线', icon: 'tingzhixian', abbreviation: '停' },
        { value: 2, label: '停车让行线', icon: 'tingcherangxingxian', abbreviation: '停让' },
        { value: 3, label: '减速让行线', icon: 'jiansurangxingxian', abbreviation: '减让' },
        { value: 11, label: '虚拟停止线', icon: 'xunitingzhixian', abbreviation: '虚停' }
    ],
    AD_LANEMARK_PLG_TYPE: [
        { value: 0, label: '未定义', icon: 'weidingyi', abbreviation: '0' },
        { value: 1, label: '人行横道', icon: 'renxinghengdao', abbreviation: '人' },
        { value: 2, label: '禁止停车区', icon: 'jinzhitingchexian', abbreviation: '禁' },
        { value: 3, label: '减速带', icon: 'jiansudai', abbreviation: '减带' }
        // {
        //     value: 4,
        //     label: '减速警示震荡线',
        //     icon: 'jiansujingshizhendangxian',
        //     abbreviation: '减震'
        // },
        // {
        //     value: 5,
        //     label: '斜跨路口的人行横道 ',
        //     icon: 'xiekualukourenxinghengdao',
        //     abbreviation: '斜人'
        // }
    ],
    AD_TRAFFIC_SIGN_STYLE: [
        { value: 0, label: '未定义', abbreviation: '0' },
        { value: 1, label: '单个标志牌', abbreviation: '单' },
        { value: 2, label: '组合标志牌', abbreviation: '组合' }
    ],
    AD_TRAFFIC_LIGHT_TYPE: [
        { value: 0, label: '未定义', icon: 'weidingyi', abbreviation: '0' },
        {
            value: 1,
            label: '普通机动车信号灯',
            icon: 'putongjidongchexinhaodeng',
            abbreviation: '普'
        },
        {
            value: 2,
            label: '方向指示信号灯',
            icon: 'fangxiangzhishixinhaodeng',
            abbreviation: '方向'
        },
        {
            value: 3,
            label: '铁路交叉路口信号灯',
            icon: 'daoluyutielupingmianjiaochadaokouxinhaodeng',
            abbreviation: '铁路'
        },
        { value: 4, label: '人行横道信号灯', icon: 'renxinghengdaoxinhaodeng', abbreviation: '人' },
        { value: 99, label: '其他', icon: 'qita', abbreviation: '99' }
    ],
    AD_TRAFFIC_LIGHT_LAYOUT: [
        { value: 0, label: '未定义', abbreviation: '0' },
        { value: 1, label: '灯头垂直布局', abbreviation: '垂' },
        { value: 2, label: '灯头水平布局', abbreviation: '平' },
        { value: 3, label: '单个灯头', abbreviation: '单个' }
    ],
    AD_ARROW_ARR_DIRECT: [
        { value: '0', label: '未定义', icon: 'weidingyi', abbreviation: '0' },
        { value: 'A', label: '直行', icon: 'zhixing', abbreviation: '直行' },
        { value: 'B', label: '左转', icon: 'zuozhuan', abbreviation: '左转' },
        { value: 'C', label: '右转', icon: 'youzhuan', abbreviation: '右转' },
        { value: 'D', label: '左掉头', icon: 'zuodiaotou', abbreviation: '左掉' },
        { value: 'E', label: '右掉头', icon: 'youdiaotou', abbreviation: '右掉' },
        {
            value: 'F',
            label: '左弯或需向左合流',
            icon: 'zuowanhuoxuxiangzuoheliu',
            abbreviation: '左弯合流'
        },
        {
            value: 'G',
            label: '右弯或需向右合流',
            icon: 'youwanhuoxuxiangyouheliu',
            abbreviation: '右弯合流'
        },
        { value: 'H', label: '左后方转弯', icon: 'zuohoufangzhuanwan', abbreviation: '左后转' },
        { value: 'I', label: '右后方转弯', icon: 'youhoufangzhuanwan', abbreviation: '右后转' },
        { value: 'K', label: '禁止标记', icon: 'jinzhibiaojijt', abbreviation: '禁标' },
        { value: 'X', label: '待确认', icon: 'daiqueren', abbreviation: 'X' }
    ],
    AD_RS_BARRIER_TYPE: [
        { value: 0, label: '未定义', icon: 'weidingyi', abbreviation: '0' },
        { value: 3101, label: '隧道墙', icon: 'suidaoqiang', abbreviation: '隧' },
        { value: 3102, label: '路侧防护栏', icon: 'lucefanghulan', abbreviation: '路侧' },
        { value: 3103, label: '路缘石', icon: 'luyuanshi', abbreviation: '石' },
        { value: 3104, label: '隔音墙', icon: 'geyinqiang', abbreviation: '音' },
        { value: 3105, label: '其他墙体', icon: 'qitaqiangti', abbreviation: '他' },
        { value: 3106, label: '道路轮廓标', icon: 'daolulunkuobiao', abbreviation: '廓' },
        { value: 3121, label: '新泽西护栏', icon: 'daolulunkuobiao', abbreviation: '泽' },
        { value: 3199, label: '其他', icon: 'daolulunkuobiao', abbreviation: '其他' }
    ],
    AD_RS_BARRIER_TILT: [
        { value: 0, label: '未定义', abbreviation: '0' },
        { value: 1, label: '不倾斜', abbreviation: '不' },
        { value: 2, label: '倾斜', abbreviation: '斜' }
    ],
    AD_TEXT_CONT_TYPE: [
        { value: 0, label: '未定义', icon: 'weidingyi', abbreviation: '0' },
        { value: 1, label: '最高速度限制', icon: 'zuigaoxiansufh', abbreviation: '高限' },
        { value: 2, label: '最低速度限制', icon: 'zuidixiansufh', abbreviation: '低限' },
        {
            value: 3,
            label: '潮汐车道时间限制',
            icon: 'chaoxichedaoxianzhifh',
            abbreviation: '潮限'
        },
        { value: 4, label: '禁止停车时间限制', icon: 'jinzhitingchefh', abbreviation: '禁停' },
        { value: 5, label: 'HOV车道时间限制', icon: 'hovchedaoxianzhifh', abbreviation: 'HOV限' },
        {
            value: 6,
            label: '公交车道时间限制',
            icon: 'gongjiaochedaoshijianxianzhi',
            abbreviation: '公交限'
        },
        { value: 99, label: '其他', icon: 'qitafh', abbreviation: '99' }
    ],
    AD_TEXT_VEH_LMT: [
        { value: 0, label: '未定义', abbreviation: '0' },
        { value: 1, label: '小客车', abbreviation: '客' },
        { value: 2, label: '公交车', abbreviation: '公' },
        { value: 99, label: '其他', abbreviation: '99' }
    ],
    AD_LANE_RS_TYPE: [
        { value: 0, label: '未定义' },
        { value: 1, label: '禁止驶入' },
        { value: 2, label: '潮汐车道限制' },
        { value: 3, label: '禁止停车限制' }
    ],
    AD_LANE_SPD_TYPE: [
        { value: 0, label: '未定义' },
        { value: 1, label: '最高限速' },
        { value: 2, label: '最低限速' }
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
    AD_LANE_SPD_SOURCE: [
        { value: 0, label: '未定义' },
        { value: 1, label: '实地采集' },
        { value: 2, label: '逻辑推断' },
        { value: 3, label: '法定限速' }
    ],
    AD_LANE_CON_RS_TYPE: [
        { value: 0, label: '未定义' },
        { value: 1, label: '禁止转向限制' }
    ],
    AD_ROAD_CON_RS_TYPE: [
        { value: 0, label: '未定义' },
        { value: 1, label: '禁止转向' }
    ],
    AD_LANE_DIVIDER_PLN_FEAT_TYPE: [
        { value: 0, label: '未定义', icon: 'weidingyi', abbreviation: '0' },
        { value: 1001, label: '单实线', icon: 'danshixian', abbreviation: '单实' },
        { value: 1003, label: '双实线', icon: 'shuangshixian', abbreviation: '双实' },
        { value: 1005, label: '左实右虚线', icon: 'zuoshiyouxu', abbreviation: '实虚' },
        { value: 1006, label: '左虚右实线', icon: 'zuoxuyoushi', abbreviation: '虚实' },
        { value: 1007, label: '可变导向车道线', icon: 'kebiandaoxiangchedao', abbreviation: '可变' }
    ],
    AD_LANE_DIVIDER_PLG_FEAT_TYPE: [
        { value: 0, label: '未定义', icon: 'weidingyi', abbreviation: '0' },
        { value: 1002, label: '单虚线', icon: 'danxuxian', abbreviation: '单虚' },
        { value: 1004, label: '双虚线', icon: 'shuangxuxian', abbreviation: '双虚' },
        { value: 1005, label: '左实右虚线', icon: 'zuoshiyouxu', abbreviation: '实虚' },
        { value: 1006, label: '左虚右实线', icon: 'zuoxuyoushi', abbreviation: '虚实' }
    ],
    AD_STOPLOCTION_GEO_FEAT_TYPE: [
        { value: 0, label: '未定义', icon: 'weidingyi', abbreviation: '0' },
        { value: 2001, label: '停止线', icon: 'tingzhixian', abbreviation: '停' },
        { value: 2002, label: '停车让行线', icon: 'tingcherangxingxian', abbreviation: '停让' },
        { value: 2003, label: '减速让行线', icon: 'jiansurangxingxian', abbreviation: '减让' }
    ],
    AD_ARROW_GEO_FEAT_TYPE: [
        { value: '0', label: '未定义', icon: 'weidingyi', abbreviation: '0' },
        { value: 'A', label: '直行', icon: 'zhixing', abbreviation: '直行' },
        { value: 'B', label: '左转', icon: 'zuozhuan', abbreviation: '左转' },
        { value: 'C', label: '右转', icon: 'youzhuan', abbreviation: '右转' },
        { value: 'D', label: '左掉头', icon: 'zuodiaotou', abbreviation: '左掉' },
        { value: 'E', label: '右掉头', icon: 'youdiaotou', abbreviation: '右掉' },
        {
            value: 'F',
            label: '左弯或需向左合流',
            icon: 'zuowanhuoxuxiangzuoheliu',
            abbreviation: '左弯合流'
        },
        {
            value: 'G',
            label: '右弯或需向右合流',
            icon: 'youwanhuoxuxiangyouheliu',
            abbreviation: '右弯合流'
        },
        { value: 'H', label: '左后方转弯', icon: 'zuohoufangzhuanwan', abbreviation: '左后转' },
        { value: 'I', label: '右后方转弯', icon: 'youhoufangzhuanwan', abbreviation: '右后转' },
        { value: 'K', label: '禁止标记', icon: 'jinzhibiaojijt', abbreviation: '禁标' },
        { value: 'X', label: '待确认', icon: 'daiqueren', abbreviation: 'X' }
    ],
    AD_LANE_MARK_GEO_FEAT_TYPE: [
        { value: 0, label: '未定义', icon: 'weidingyi', abbreviation: '0' },
        { value: 4001, label: '减速警示线', icon: 'jiansujingshixian', abbreviation: '减警' },
        { value: 4002, label: '减速带', icon: 'jiansudai', abbreviation: '减带' },
        { value: 9901, label: '人行横道', icon: 'renxinghengdao', abbreviation: '人' },
        { value: 9902, label: '禁止停车区', icon: 'jinzhitingchexian', abbreviation: '禁停' },
        { value: 9903, label: '导流区', icon: 'daoliuqu', abbreviation: '导流' },
        { value: 9904, label: '路口内中心圈', icon: 'lukouneizhongxinquan', abbreviation: '圈' },
        { value: 9905, label: '车距确认线', icon: 'chejuquerenxian', abbreviation: '车距' }
    ],
    AD_TRAFFIC_SIGN_GEO_FEAT_TYPE: [
        [
            {
                value: 2100,
                label: '其他警告标志',
                icon: 'jinggaolei',
                abbreviation: '其他警告标志'
            },
            { value: 2101, label: '建议速度', icon: 'jianyisudu', abbreviation: '建议速度' },
            {
                value: 2200,
                label: '其他禁令标志',
                icon: 'jinlinglei',
                abbreviation: '其他禁令标志'
            },
            { value: 2201, label: '停车让行', icon: 'tingcherangxing', abbreviation: '停车让行' },
            { value: 2202, label: '减速让行', icon: 'jiansurangxing', abbreviation: '减速让行' },
            { value: 2203, label: '会车让行', icon: 'huicherangxing', abbreviation: '会车让行' },
            { value: 2204, label: '禁止通行', icon: 'jinzhitongxing', abbreviation: '禁止通行' },
            { value: 2205, label: '禁止驶入', icon: 'jinzhishiru', abbreviation: '禁止驶入' },
            {
                value: 2206,
                label: '禁止机动车驶入',
                icon: 'jinzhijidongchetongxing',
                abbreviation: '禁止机动车驶入'
            },
            {
                value: 2207,
                label: '禁止向左转弯',
                icon: 'jinzhizuozhuanwan',
                abbreviation: '禁止向左转弯'
            },
            {
                value: 2208,
                label: '禁止向右转弯',
                icon: 'jinzhiyouzhuanwan',
                abbreviation: '禁止向右转弯'
            },
            { value: 2209, label: '禁止直行', icon: 'jinzhizhixing', abbreviation: '禁止直行' },
            {
                value: 2210,
                label: '禁止向左向右转弯',
                icon: 'jinzhizuoyouzhuanwan',
                abbreviation: '禁止向左向右转弯'
            },
            {
                value: 2211,
                label: '禁止直行和向左转弯',
                icon: 'jinzhizhixinghezuozhuanwan',
                abbreviation: '禁止直行和向左转弯'
            },
            {
                value: 2212,
                label: '禁止直行和向右转弯',
                icon: 'jinzhizhixingheyouzhuanwan',
                abbreviation: '禁止直行和向右转弯'
            },
            { value: 2213, label: '禁止掉头', icon: 'jinzhidiaotou', abbreviation: '禁止掉头' },
            { value: 2214, label: '禁止超车', icon: 'jinzhichaoche', abbreviation: '禁止超车' },
            {
                value: 2215,
                label: '解除禁止超车',
                icon: 'jiechujinzhichaoche',
                abbreviation: '解除禁止超车'
            },
            { value: 2216, label: '禁止停车', icon: 'jinzhitingche', abbreviation: '禁止停车' },
            {
                value: 2217,
                label: '禁止长时间停车',
                icon: 'jinzhichangshitingche',
                abbreviation: '禁止长时间停车'
            },
            { value: 2219, label: '限制速度', icon: 'xianzhisudu', abbreviation: '限制速度' },
            {
                value: 2220,
                label: '解除限制速度',
                icon: 'jiechuxianzhisudu',
                abbreviation: '解除限制速度'
            },
            {
                value: 2223,
                label: '区域禁止-禁止长时间停车',
                icon: 'quyujinzhichangshitingche',
                abbreviation: '区域禁止-禁止长时间停车'
            },
            {
                value: 2224,
                label: '区域禁止解除-解除禁止长时间停车',
                icon: 'quyujiechujinzhichangshitingche',
                abbreviation: '区域禁止解除-解除禁止长时间停车'
            },
            {
                value: 2225,
                label: '区域禁止-禁止停车',
                icon: 'quyujinzhitingche',
                abbreviation: '区域禁止-禁止停车'
            },
            {
                value: 2226,
                label: '区域禁止解除-解除禁止停车',
                icon: 'quyujiechujinzhitingche',
                abbreviation: '区域禁止解除-解除禁止停车'
            },
            {
                value: 2227,
                label: '区域禁止-速度限制',
                icon: 'quyusuduxianzhi',
                abbreviation: '区域禁止-速度限制'
            },
            {
                value: 2228,
                label: '区域禁止解除-解除速度限制',
                icon: 'quyujiechusuduxianzhi',
                abbreviation: '区域禁止解除-解除速度限制'
            },
            {
                value: 2300,
                label: '其他指示类标志',
                icon: 'zhishilei',
                abbreviation: '其他指示类标志'
            },
            { value: 2314, label: '最低限速', icon: 'zuidixiansu', abbreviation: '最低限速' },
            {
                value: 2318,
                label: '车道行驶方向-直行',
                icon: 'chedaoxingshizhixing',
                abbreviation: '车道行驶方向-直行'
            },
            { value: 2321, label: '允许掉头', icon: 'yunxudiaotou', abbreviation: '允许掉头' },
            {
                value: 2322,
                label: '车道行驶方向-左转',
                icon: 'chedaoxingshizuozhuan',
                abbreviation: '车道行驶方向-左转'
            },
            {
                value: 2323,
                label: '车道行驶方向-右转',
                icon: 'chedaoxingshiyouzhuan',
                abbreviation: '车道行驶方向-右转'
            },
            {
                value: 2324,
                label: '车道行驶方向-直行和左转',
                icon: 'chedaoxingshi-zhixinghezuozhuan',
                abbreviation: '车道行驶方向-直行和左转'
            },
            {
                value: 2325,
                label: '车道行驶方向-直行和右转',
                icon: 'chedaoxingshi-zhixingheyouzhuan',
                abbreviation: '车道行驶方向-直行和右转'
            },
            {
                value: 2326,
                label: '车道行驶方向-左转和掉头',
                icon: 'chedaoxingshi-diaotouhezuozhuan',
                abbreviation: '车道行驶方向-左转和掉头'
            },
            {
                value: 2327,
                label: '车道行驶方向-掉头',
                icon: 'chedaoxingshi-diaotou',
                abbreviation: '车道行驶方向-掉头'
            },
            {
                value: 2328,
                label: '车道行驶方向-其他',
                icon: 'chedaoxingshi-qitafangxiang',
                abbreviation: '车道行驶方向-其他'
            },
            {
                value: 2401,
                label: '区间测速起点',
                icon: 'qujiancesuqidian',
                abbreviation: '区间测速起点'
            },
            {
                value: 2402,
                label: '区间测速终点',
                icon: 'qujiancesuzhongdian',
                abbreviation: '区间测速终点'
            },
            {
                value: 2403,
                label: '区间测速起点和距离',
                icon: 'qujiancesuchangdu',
                abbreviation: '区间测速起点和距离'
            },
            {
                value: 2404,
                label: '表示时间标志',
                icon: 'biaoshishijian',
                abbreviation: '表示时间标志'
            },
            {
                value: 2405,
                label: '特殊天气辅助标志',
                icon: 'zhuyiteshutianqi',
                abbreviation: '特殊天气辅助标志'
            },
            {
                value: 2406,
                label: '特殊路段辅助标志',
                icon: 'teshuluduanfuzhubiaozhi',
                abbreviation: '特殊路段辅助标志'
            },
            { value: 2500, label: '其他标志牌', icon: 'qitabiaozhi', abbreviation: '其他标志牌' },
            {
                value: 2600,
                label: '动态限速标志',
                icon: 'dongtaixiansu',
                abbreviation: '动态限速标志'
            },
            {
                value: 2601,
                label: '其他电子标志牌',
                icon: 'qitadianzibiaozhipai',
                abbreviation: '其他电子标志牌'
            },
            { value: 0, label: '未定义', icon: 'weidingyi', abbreviation: '0' }
        ]
    ],
    AD_TRAFFIC_LIGHT_GEO_FEAT_TYPE: [
        { value: 0, label: '未定义', icon: 'weidingyi', abbreviation: '0' },
        {
            value: 3001,
            label: '普通交通信号灯',
            icon: 'putongjiaotongxinhaodeng',
            abbreviation: '普通'
        },
        {
            value: 3002,
            label: '方向指示信号灯',
            icon: 'fangxiangzhishixinhaodeng',
            abbreviation: '方向'
        },
        {
            value: 3003,
            label: '铁路平交路口信号灯',
            icon: 'tielupingjiaolukouxinhaodeng',
            abbreviation: '铁路'
        },
        { value: 3099, label: '其他', icon: 'qita', abbreviation: '99' }
    ],
    AD_TS_CONTENT_CONT_TYPE: [
        { value: 0, label: '未定义' },
        { value: 1, label: '禁止转向' },
        { value: 2, label: '限制转向' },
        { value: 3, label: '最大速度限制' },
        { value: 4, label: '最低速度限制' }
    ],
    AD_TS_CONTENT_SIGN_TYPE: [
        [
            { value: 2100, label: '其他警告标志', icon: 'jinggaolei' },
            { value: 2101, label: '建议速度', icon: 'jianyisudu' },
            { value: 2200, label: '其他禁令标志', icon: 'jinlinglei' },
            { value: 2201, label: '停车让行', icon: 'tingcherangxing' },
            { value: 2202, label: '减速让行', icon: 'jiansurangxing' },
            { value: 2203, label: '会车让行', icon: 'huicherangxing' },
            { value: 2204, label: '禁止通行', icon: 'jinzhitongxing' },
            { value: 2205, label: '禁止驶入', icon: 'jinzhishiru' },
            { value: 2206, label: '禁止机动车驶入', icon: 'jinzhijidongchetongxing' },
            { value: 2207, label: '禁止向左转弯', icon: 'jinzhizuozhuanwan' },
            { value: 2208, label: '禁止向右转弯', icon: 'jinzhiyouzhuanwan' },
            { value: 2209, label: '禁止直行', icon: 'jinzhizhixing' },
            { value: 2210, label: '禁止向左向右转弯', icon: 'jinzhizuoyouzhuanwan' },
            { value: 2211, label: '禁止直行和向左转弯', icon: 'jinzhizhixinghezuozhuanwan' },
            { value: 2212, label: '禁止直行和向右转弯', icon: 'jinzhizhixingheyouzhuanwan' },
            { value: 2213, label: '禁止掉头', icon: 'jinzhidiaotou' },
            { value: 2214, label: '禁止超车', icon: 'jinzhichaoche' },
            { value: 2215, label: '解除禁止超车', icon: 'jiechujinzhichaoche' },
            { value: 2216, label: '禁止停车', icon: 'jinzhitingche' },
            { value: 2217, label: '禁止长时间停车', icon: 'jinzhichangshitingche' },
            { value: 2219, label: '限制速度', icon: 'xianzhisudu' },
            { value: 2220, label: '解除限制速度', icon: 'jiechuxianzhisudu' },
            { value: 2223, label: '区域禁止-禁止长时间停车', icon: 'quyujinzhichangshitingche' },
            {
                value: 2224,
                label: '区域禁止解除-解除禁止长时间停车',
                icon: 'quyujiechujinzhichangshitingche'
            },
            { value: 2225, label: '区域禁止-禁止停车', icon: 'quyujinzhitingche' },
            { value: 2226, label: '区域禁止解除-解除禁止停车', icon: 'quyujiechujinzhitingche' },
            { value: 2227, label: '区域禁止-速度限制', icon: 'quyusuduxianzhi' },
            { value: 2228, label: '区域禁止解除-解除速度限制', icon: 'quyujiechusuduxianzhi' },
            { value: 2300, label: '其他指示类标志', icon: 'zhishilei' },

            { value: 2301, label: '直行', icon: 'zhixing2' },
            { value: 2302, label: '向左转弯', icon: 'zuozhuanwan' },
            { value: 2303, label: '向右转弯', icon: 'youzhuanwan' },
            { value: 2304, label: '直行和向左转弯', icon: 'zhixinghezuozhuanwan' },
            { value: 2305, label: '直行和向右转弯', icon: 'zhixingheyouzhuanwan' },
            { value: 2306, label: '向左和向右转弯', icon: 'zuoyouzhuanwan' },
            { value: 2307, label: '靠左侧道路行驶', icon: 'kaozuocedaoluxingshi' },
            { value: 2308, label: '靠右侧道路行驶', icon: 'kaoyoucedaoluxingshi' },
            { value: 2309, label: '立体交叉行驶路线', icon: 'litijiaochaxingshiluxian' },
            { value: 2310, label: '环岛行驶', icon: 'huandaoxingshi' },
            { value: 2311, label: '单行路', icon: 'danhanglu' },
            { value: 2312, label: '步行', icon: 'buxing' },
            { value: 2313, label: '鸣喇叭', icon: 'minglaba' },
            { value: 2315, label: '路口优先通行', icon: 'lukouyouxiantongxing' },
            { value: 2316, label: '会车先行', icon: 'huichexianxing' },
            { value: 2317, label: '人行横道', icon: 'renxinghengdao1' },
            {
                value: 2319,
                label: '公交车专用道路和车道',
                icon: 'gongjiaochezhuanyongdaoluhechedao'
            },
            {
                value: 2320,
                label: '小汽车专用道路和车道',
                icon: 'xiaoqichezhuanyongdaoluhechedao2'
            },
            { value: 2329, label: '其他专用车道和车道', icon: 'zhuanyongchedao' },
            { value: 2330, label: '停车位', icon: 'tingchewei' },

            { value: 2314, label: '最低限速', icon: 'zuidixiansu' },
            { value: 2318, label: '车道行驶方向-直行', icon: 'chedaoxingshizhixing' },
            { value: 2321, label: '允许掉头', icon: 'yunxudiaotou' },
            { value: 2322, label: '车道行驶方向-左转', icon: 'chedaoxingshizuozhuan' },
            { value: 2323, label: '车道行驶方向-右转', icon: 'chedaoxingshiyouzhuan' },
            {
                value: 2324,
                label: '车道行驶方向-直行和左转',
                icon: 'chedaoxingshi-zhixinghezuozhuan'
            },
            {
                value: 2325,
                label: '车道行驶方向-直行和右转',
                icon: 'chedaoxingshi-zhixingheyouzhuan'
            },
            {
                value: 2326,
                label: '车道行驶方向-左转和掉头',
                icon: 'chedaoxingshi-diaotouhezuozhuan'
            },
            { value: 2327, label: '车道行驶方向-掉头', icon: 'chedaoxingshi-diaotou' },
            { value: 2328, label: '车道行驶方向-其他', icon: 'chedaoxingshi-qitafangxiang' },
            { value: 2401, label: '区间测速起点', icon: 'qujiancesuqidian' },
            { value: 2402, label: '区间测速终点', icon: 'qujiancesuzhongdian' },
            { value: 2403, label: '区间测速起点和距离', icon: 'qujiancesuchangdu' },
            { value: 2404, label: '表示时间标志', icon: 'biaoshishijian' },
            { value: 2405, label: '特殊天气辅助标志', icon: 'zhuyiteshutianqi' },
            { value: 2406, label: '特殊路段辅助标志', icon: 'teshuluduanfuzhubiaozhi' },
            { value: 2500, label: '其他标志牌', icon: 'qitabiaozhi' },
            { value: 2600, label: '动态限速标志', icon: 'dongtaixiansu' },
            { value: 2601, label: '其他电子标志牌', icon: 'qitadianzibiaozhipai' },
            { value: 0, label: '未定义', icon: 'weidingyi' }
        ]
    ],
    AD_SUB_LAMP_TYPE: [
        { value: '0', label: '未定义', icon: 'weidingyi3' },
        { value: 'A', label: '圆灯', icon: 'yuanxing' },
        { value: 'B', label: '方向向左的箭头', icon: 'fangxiangxiangzuo' },
        { value: 'C', label: '方向向右的箭头', icon: 'fangxiangxiangyou' },
        { value: 'D', label: '直行', icon: 'zhixing3' },
        { value: 'E', label: '掉头', icon: 'diaotou1' },
        { value: 'F', label: '车道指示箭头', icon: 'chedaozhishijiantou' },
        { value: 'G', label: '叉形', icon: 'chaxing' },
        { value: 'H', label: '行人', icon: 'xingren' },
        { value: 'I', label: '非机动车', icon: 'feijidongche' },
        { value: 'J', label: '读秒', icon: 'dumiao' },
        { value: 'Z', label: '灯头未启用', icon: 'dengtouweiqiyong' }
        // { value: 'BD', label: '方向向左的箭头+直行' },
        // { value: 'CD', label: '方向向右的箭头+直行' },
        // { value: 'BE', label: '方向向左的箭头+掉头' }
    ]
};

export const DEFAULT_PROPERTIES_MAP = {
    AD_Arrow: {
        ARR_DIRECT: 'A',
        LANE_ID: 0
    },
    AD_Junction: {
        JUNC_ID: 0
    },
    AD_LaneMark_Plg: {
        TYPE: 1
    },
    AD_Text: {
        CONT_TYPE: 99,
        SPEED: 0,
        TIMEDOM: '',
        VEH_LMT: 0,
        TEXT: '',
        LANE_ID: 0
    },
    AD_TrafficLight: {},
    AD_TrafficSign: {
        OBJ_FUNC: '[{"SIGN_TYPE":0,"CONT_TYPE":0,"CONT_VALUE":0,"TIMEDOM":""}]'
    },
    AD_LaneDivider: {
        TYPE: 1,
        SHARE_LINE: 1,
        TYPE_PLUS: '',
        RD_EDGE: 2
    },
    AD_Road: {
        TYPE: 1,
        CROSSING: 2,
        RD_STATUS: 1,
        RD_FORM: 1,
        DIRECTION: 1,
        LENGTH: 0
    },
    AD_Lane: {
        TYPE: 1,
        DIRECTION: 1,
        LANE_NO: 0,
        STATUS: 1,
        L_LDIV_ID: 0,
        R_LDIV_ID: 0,
        ROAD_ID: 0
    },
    AD_Lane_RS: {
        RS_TYPE: 0,
        RS_VALUE: '',
        TIMEDOM: ''
    },
    AD_Lane_Con_RS: {
        RS_TYPE: 1,
        TIMEDOM: ''
    },
    AD_Road_Con_RS: {
        RS_TYPE: 1,
        TIMEDOM: ''
    },
    AD_Lane_Speed: {
        SPD_TYPE: 0,
        SPEED: 0,
        SPD_SOURCE: 0,
        OFFSETMin: 0,
        OFFSETMax: 0,
        OFFSET: ''
    },
    AD_LaneAttrPoint: {
        TYPE: 1806,
        ROAD_ID: 0,
        NUMBER: 0,
        LANE_ID: 0
    },
    AD_StopLocation: {
        TYPE: 1
    },
    AD_RS_Barrier: {
        TYPE: 3102,
        TILT: 1
    },
    AD_LaneDivider_Pln: {
        FEAT_TYPE: 1001,
        CFD_GEO: 1,
        CFD_FEAT: 1
    },
    AD_LaneDivider_Plg: {
        FEAT_TYPE: 1002,
        CFD_GEO: 1,
        CFD_FEAT: 1,
        LDIV_ID: 0
    },
    AD_StopLocation_Geo: {
        FEAT_TYPE: 2001,
        CFD_GEO: 1,
        CFD_FEAT: 1,
        STOPL_ID: 0
    },
    AD_Arrow_Geo: {
        FEAT_TYPE: 'A',
        CFD_GEO: 1,
        CFD_FEAT: 1
    },
    AD_LaneMark_Geo: {
        FEAT_TYPE: 0,
        CFD_GEO: 1,
        CFD_FEAT: 1
    },
    AD_Pole_Geo: {
        CFD_GEO: 1,
        CFD_FEAT: 1
    },
    AD_TrafficSign_Geo: {
        FEAT_TYPE: 0,
        CFD_GEO: 1,
        CFD_FEAT: 1
    },
    AD_TrafficLight_Geo: {
        FEAT_TYPE: 3001,
        CFD_GEO: 1,
        CFD_FEAT: 1
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
            domType: 'RadioIconGroup',
            link: {
                default: {
                    RD_EDGE: 2
                },
                11: {
                    RD_EDGE: 1
                },
                13: {
                    RD_EDGE: 1
                },
                14: {
                    RD_EDGE: 1
                },
                15: {
                    RD_EDGE: 1
                },
                16: {
                    RD_EDGE: 1
                },
                99: {
                    RD_EDGE: 1
                }
            }
        },
        {
            key: 'TYPE_PLUS',
            name: '车道线类型(附加)',
            type: 'AD_LANE_DIVIDER_TYPE',
            domType: 'CheckBoxIconGroup'
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
            key: 'UPD_STAT',
            name: '更新标识',
            filterBy: 'updStatFilter',
            domType: 'Text'
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
            key: 'CONT_TYPE',
            name: '文本语义类型',
            type: 'AD_TEXT_CONT_TYPE',
            domType: 'RadioIconGroup',
            link: {
                0: { SPEED: 0, TIMEDOM: '', VEH_LMT: 0 },
                1: { SPEED: 120, TIMEDOM: '', VEH_LMT: 1 },
                2: { SPEED: 60, TIMEDOM: '', VEH_LMT: 1 },
                3: { SPEED: 0 },
                4: { SPEED: 0 },
                5: { SPEED: 0 },
                6: { SPEED: 0 },
                99: { SPEED: 0, TIMEDOM: '', VEH_LMT: 0 }
            },
            linkDisabled: {
                0: ['SPEED', 'TIMEDOM', 'VEH_LMT'],
                1: ['TIMEDOM'],
                2: ['TIMEDOM'],
                3: ['SPEED'],
                4: ['SPEED'],
                5: ['SPEED'],
                6: ['SPEED'],
                99: ['SPEED', 'TIMEDOM', 'VEH_LMT']
            }
        },
        {
            key: 'SPEED',
            name: '限速值',
            domType: 'InputNumber',
            validates: 'Numeric|range|0|150'
        },
        {
            key: 'TIMEDOM',
            name: '时间限制描述',
            domType: 'AdDateInput',
            validates: 'Char|250'
        },
        {
            key: 'VEH_LMT',
            name: '车辆限制描述',
            type: 'AD_TEXT_VEH_LMT',
            domType: 'Select'
        },
        {
            key: 'TEXT',
            name: '其他文本描述',
            domType: 'Input'
        },
        {
            key: 'LANE_ID',
            name: '关联对应车道中心线ID',
            domType: 'Input'
        },
        {
            key: 'UPD_STAT',
            name: '更新标识',
            filterBy: 'updStatFilter',
            domType: 'Text'
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
            required: true,
            validates: 'Decimal|10|2',
            domType: 'InputNumber'
        },
        {
            key: 'UPD_STAT',
            name: '更新标识',
            filterBy: 'updStatFilter',
            domType: 'Text'
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
        {
            key: 'LANE_NO',
            name: '车道编号',
            type: 'AD_LANE_LANE_NO',
            required: true,
            domType: 'InputNumber',
            validates: 'Numeric|range|-99|99'
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
            key: 'UPD_STAT',
            name: '更新标识',
            filterBy: 'updStatFilter',
            domType: 'Text'
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
            name: '停车线类型',
            type: 'AD_STOPLOCATION_TYPE',
            domType: 'RadioIconGroup'
        },
        {
            key: 'UPD_STAT',
            name: '更新标识',
            filterBy: 'updStatFilter',
            domType: 'Text'
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
            name: '面状标识物类型',
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
        },
        {
            key: 'UPD_STAT',
            name: '更新标识',
            filterBy: 'updStatFilter',
            domType: 'Text'
        }
    ],
    AD_Junction: [
        {
            key: 'JUNC_ID',
            name: '用户编号',
            type: 'AD_JUNCTION_ID',
            domType: 'Text'
        },
        {
            key: 'UPD_STAT',
            name: '更新标识',
            filterBy: 'updStatFilter',
            domType: 'Text'
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
            domType: 'RadioIconGroup',
            link: {
                default: {
                    NUMBER: 0
                }
            },
            linkDisabled: {
                0: ['NUMBER'],
                1801: ['NUMBER'],
                1802: ['NUMBER'],
                1803: ['NUMBER'],
                1804: ['NUMBER'],
                1805: ['NUMBER'],
                1806: ['NUMBER'],
                1808: ['NUMBER'],
                1809: ['NUMBER'],
                1810: ['NUMBER'],
                1811: ['NUMBER'],
                1821: ['NUMBER'],
                1841: ['NUMBER'],
                1842: ['NUMBER'],
                1843: ['NUMBER'],
                1844: ['NUMBER'],
                1845: ['NUMBER'],
                1846: ['NUMBER'],
                1847: ['NUMBER'],
                1848: ['NUMBER']
            }
        },
        {
            key: 'NUMBER',
            name: '收费站通道数',
            type: 'AD_LANE_ATTRPOINT_NUMBER',
            domType: 'InputNumber'
        },
        {
            key: 'UPD_STAT',
            name: '更新标识',
            filterBy: 'updStatFilter',
            domType: 'Text'
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
            key: 'UPD_STAT',
            name: '更新标识',
            filterBy: 'updStatFilter',
            domType: 'Text'
        }
        // {
        //     key: 'TYPE',
        //     name: '交通灯类型',
        //     type: 'AD_TRAFFIC_LIGHT_TYPE',
        //     domType: 'RadioIconGroup'
        // },
        // {
        //     key: 'LAYOUT',
        //     name: '信号灯灯头布局',
        //     type: 'AD_TRAFFIC_LIGHT_LAYOUT',
        //     domType: 'Select'
        // },
        // {
        //     key: 'LAMP_COUNT',
        //     name: '信号灯灯头数量',
        //     type: 'AD_TRAFFIC_LIGHT_LAMP_COUNT',
        //     required: true,
        //     validates: 'Numeric|range|0|99',
        //     domType: 'InputNumber'
        // }
    ],
    AD_TrafficSign: [
        {
            key: 'SIGN_ID',
            name: '用户编号',
            domType: 'Text'
        },
        {
            key: 'UPD_STAT',
            name: '更新标识',
            filterBy: 'updStatFilter',
            domType: 'Text'
        },
        {
            key: 'OBJ_FUNC',
            name: '存储标牌对象',
            domType: 'AdTrafficSignContent'
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
            key: 'TILT',
            name: '是否倾斜',
            type: 'AD_RS_BARRIER_TILT',
            domType: 'Select'
        },
        {
            key: 'UPD_STAT',
            name: '更新标识',
            filterBy: 'updStatFilter',
            domType: 'Text'
        }
    ],
    AD_LaneDivider_Pln: [
        {
            key: 'OBJ_ID',
            name: '用户编号',
            domType: 'Text'
        },
        {
            key: 'FEAT_TYPE',
            name: '要素子类型',
            type: 'AD_LANE_DIVIDER_PLN_FEAT_TYPE',
            domType: 'RadioIconGroup'
        },
        {
            key: 'CFD_GEO',
            name: '几何形状置信度',
            domType: 'Text'
        },
        {
            key: 'CFD_FEAT',
            name: '要素类型置信度',
            domType: 'Text'
        }
    ],
    AD_LaneDivider_Plg: [
        {
            key: 'OBJ_ID',
            name: '用户编号',
            domType: 'Text'
        },
        {
            key: 'FEAT_TYPE',
            name: '要素子类型',
            type: 'AD_LANE_DIVIDER_PLG_FEAT_TYPE',
            domType: 'RadioIconGroup'
        },
        {
            key: 'CFD_GEO',
            name: '几何形状置信度',
            domType: 'Text'
        },
        {
            key: 'CFD_FEAT',
            name: '要素类型置信度',
            domType: 'Text'
        },
        {
            key: 'LDIV_ID',
            name: '关联对应的车道线ID',
            domType: 'Text'
        },
        {
            key: 'UPD_STAT',
            name: '更新标识',
            filterBy: 'updStatFilter',
            domType: 'Text'
        }
    ],
    AD_StopLocation_Geo: [
        {
            key: 'OBJ_ID',
            name: '用户编号',
            domType: 'Text'
        },
        {
            key: 'FEAT_TYPE',
            name: '要素子类型',
            type: 'AD_STOPLOCTION_GEO_FEAT_TYPE',
            domType: 'RadioIconGroup'
        },
        {
            key: 'CFD_GEO',
            name: '几何形状置信度',
            domType: 'Text'
        },
        {
            key: 'CFD_FEAT',
            name: '要素类型置信度',
            domType: 'Text'
        },
        {
            key: 'STOPL_ID',
            name: '关联的逻辑层停止位置',
            domType: 'Text'
        },
        {
            key: 'UPD_STAT',
            name: '更新标识',
            filterBy: 'updStatFilter',
            domType: 'Text'
        }
    ],
    AD_Arrow_Geo: [
        {
            key: 'OBJ_ID',
            name: '用户编号',
            domType: 'Text'
        },
        {
            key: 'FEAT_TYPE',
            name: '要素子类型',
            type: 'AD_ARROW_GEO_FEAT_TYPE',
            domType: 'CheckBoxIconGroup'
        },
        {
            key: 'CFD_GEO',
            name: '几何形状置信度',
            domType: 'Text'
        },
        {
            key: 'CFD_FEAT',
            name: '要素类型置信度',
            domType: 'Text'
        }
    ],
    AD_LaneMark_Geo: [
        {
            key: 'OBJ_ID',
            name: '用户编号',
            domType: 'Text'
        },
        {
            key: 'FEAT_TYPE',
            name: '要素子类型',
            type: 'AD_LANE_MARK_GEO_FEAT_TYPE',
            domType: 'RadioIconGroup'
        },
        {
            key: 'CFD_GEO',
            name: '几何形状置信度',
            domType: 'Text'
        },
        {
            key: 'CFD_FEAT',
            name: '要素类型置信度',
            domType: 'Text'
        },
        {
            key: 'UPD_STAT',
            name: '更新标识',
            filterBy: 'updStatFilter',
            domType: 'Text'
        }
    ],
    AD_Pole_Geo: [
        {
            key: 'OBJ_ID',
            name: '用户编号',
            domType: 'Text'
        },
        {
            key: 'CFD_GEO',
            name: '几何形状置信度',
            domType: 'Text'
        },
        {
            key: 'CFD_FEAT',
            name: '要素类型置信度',
            domType: 'Text'
        },
        {
            key: 'UPD_STAT',
            name: '更新标识',
            filterBy: 'updStatFilter',
            domType: 'Text'
        }
    ],
    AD_TrafficSign_Geo: [
        {
            key: 'OBJ_ID',
            name: '用户编号',
            domType: 'Text'
        },
        {
            key: 'FEAT_TYPE',
            name: '要素子类型',
            type: 'AD_TRAFFIC_SIGN_GEO_FEAT_TYPE',
            domType: 'SearchIconGroup'
        },
        {
            key: 'CFD_GEO',
            name: '几何形状置信度',
            domType: 'Text'
        },
        {
            key: 'CFD_FEAT',
            name: '要素类型置信度',
            domType: 'Text'
        }
    ],
    AD_TrafficLight_Geo: [
        {
            key: 'OBJ_ID',
            name: '用户编号',
            domType: 'Text'
        },
        {
            key: 'FEAT_TYPE',
            name: '要素子类型',
            type: 'AD_TRAFFIC_LIGHT_GEO_FEAT_TYPE',
            domType: 'RadioIconGroup'
        },
        {
            key: 'CFD_GEO',
            name: '几何形状置信度',
            domType: 'Text'
        },
        {
            key: 'CFD_FEAT',
            name: '要素类型置信度',
            domType: 'Text'
        }
    ]
};

export const DEFAULT_CONFIDENCE_MAP = {
    AD_Road: '{"TYPE":{},"CROSSING":{},"RD_STATUS":{},"RD_FORM":{},"DIRECTION":{},"GEOMETRY":{}}',
    AD_Road_Con: '{"FROM_ROAD":{},"TO_ROAD":{}}',
    AD_Road_Con_RS: '{"REL_ID":{},"RS_TYPE":{},"TIMEDOM":{}}',
    AD_LaneDivider: '{"TYPE":{},"TYPE_PLUS":{},"SHARE_LINE":{},"RD_EDGE":{},"GEOMETRY":{}}',
    AD_Lane:
        '{"ROAD_ID":{},"L_LDIV_ID":{},"R_LDIV_ID":{},"TYPE":{},"LANE_NO":{},"DIRECTION":{},"STATUS":{},"GEOMETRY":{}}',
    AD_Lane_Con: '{"FROM_LANE":{},"TO_LANE":{}}',
    AD_LaneShape: '{"LANE_ID":{}}',
    AD_Lane_RS: '{"LANE_ID":{},"RS_TYPE":{},"RS_VALUE":{},"TIMEDOM":{}}',
    AD_Lane_Con_RS: '{"REL_ID":{},"RS_TYPE":{},"TIMEDOM":{}}',
    AD_Lane_Speed: '{"LANE_ID":{},"SPD_TYPE":{},"SPEED":{}},"SPD_SOURCE":{}},"OFFSET":{}}',
    AD_LaneAttrPoint: '{"TYPE":{},"ROAD_ID":{},"NUMBER":{},"LANE_ID":{},"GEOMETRY":{}}',
    AD_Arrow: '{"ARR_DIRECT":{},"LANE_ID":{},"GEOMETRY":{}}',
    AD_StopLocation: '{"TYPE":{},"GEOMETRY":{}}',
    AD_StopL_Lane_Rel: '{"STOPL_ID":{},"LANE_ID":{}}',
    AD_LaneMark_Plg: '{"TYPE":{},"GEOMETRY":{}}',
    AD_Plg_Lane_Rel: '{"PLG_ID":{},"LANE_ID":{}}',
    AD_Text:
        '{"CONT_TYPE":{},"SPEED":{},"TIMEDOM":{},"VEH_LMT":{},"TEXT":{},"LANE_ID":{},"GEOMETRY":{},"LANE_ID":{}}',
    AD_TrafficSign: '{"GEOMETRY":{}}',
    AD_Sign_Lane_Rel: '{"SIGN_ID":{},"LANE_ID":{}}',
    AD_TrafficLight: '{"TYPE":{},"LAYOUT":{},"LAMP_COUNT":{},"GEOMETRY":{}}',
    AD_Light_Lane_Rel: '{"LIGHT_ID":{},"LANE_ID":{}}',
    AD_Road_Boundary_Rel: '{"ROAD_ID":{},"LDIV_ID":{}}',
    AD_Boundary_Rel: '{"F_LDIV_ID":{},"S_LDIV_ID":{}}',
    AD_RS_Barrier: '{"TYPE":{},"TILT":{},"HEIGHT":{},"GEOMETRY":{}}',
    AD_RS_Barrier_Rel: '{"REL_ID":{},"BARR_ID":{},"LDIV_ID":{}}'
};

export const LAYER_TYPE_MAP = {
    AD_LaneDivider: [
        {
            key: 'LDIV_ID',
            name: '用户编号',
            type: 'AD_LANE_DIVIDER_LDIV_ID'
        },
        {
            key: 'TYPE',
            name: '车道线类型',
            type: 'AD_LANE_DIVIDER_TYPE'
        },
        {
            key: 'TYPE_PLUS',
            name: '车道线类型(附加)',
            type: 'AD_LANE_DIVIDER_TYPE'
        },
        {
            key: 'SHARE_LINE',
            name: '共用车道线标识',
            type: 'AD_LANE_DIVIDER_SHARE_LINE'
        },
        {
            key: 'RD_EDGE',
            name: '道路边界标识',
            type: 'AD_LANE_DIVIDER_RD_EDGE'
        }
    ],
    AD_Text: [
        {
            key: 'TEXT_ID',
            name: '用户编号',
            type: 'AD_TEXT_ID'
        },
        {
            key: 'CONT_TYPE',
            name: '文本语义类型',
            type: 'AD_TEXT_CONT_TYPE'
        },
        {
            key: 'SPEED',
            name: '限速值'
        },
        {
            key: 'TIMEDOM',
            name: '时间限制描述'
        },
        {
            key: 'VEH_LMT',
            name: '车辆限制描述',
            type: 'AD_TEXT_VEH_LMT'
        },
        {
            key: 'TEXT',
            name: '其他文本描述'
        }
    ],
    AD_Road: [
        {
            key: 'ROAD_ID',
            name: '用户编号',
            type: 'AD_ROAD_ID'
        },
        {
            key: 'TYPE',
            name: '参考线类型',
            type: 'AD_ROAD_TYPE'
        },
        {
            key: 'RD_STATUS',
            name: '道路通行状态',
            type: 'AD_ROAD_RD_STATUS'
        },
        {
            key: 'CROSSING',
            name: '交叉路口标识',
            type: 'AD_ROAD_CROSSING'
        },
        {
            key: 'RD_FORM',
            name: '道路形态',
            type: 'AD_ROAD_RD_FORM'
        },
        {
            key: 'DIRECTION',
            name: '道路通行方向',
            type: 'AD_ROAD_DIRECTION'
        },
        {
            key: 'LENGTH',
            name: '道路长度',
            type: 'AD_ROAD_LENGTH'
        }
    ],
    AD_Lane: [
        {
            key: 'LANE_ID',
            name: '用户编号',
            type: 'AD_LANE_LANE_ID'
        },
        {
            key: 'TYPE',
            name: '车道类型',
            type: 'AD_LANE_TYPE'
        },
        {
            key: 'LANE_NO',
            name: '车道编号',
            type: 'AD_LANE_LANE_NO'
        },
        {
            key: 'DIRECTION',
            name: '车道通行方向',
            type: 'AD_LANE_DIRECTION'
        },
        {
            key: 'STATUS',
            name: '车道通行状态',
            type: 'AD_LANE_STATUS'
        },
        {
            key: 'ROAD_ID',
            name: '关联道路参考线ID',
            type: 'AD_LANE_ROAD_ID'
        },
        {
            key: 'L_LDIV_ID',
            name: '关联左侧车道线ID',
            type: 'AD_LANE_L_LDIV_ID'
        },
        {
            key: 'R_LDIV_ID',
            name: '关联右侧车道线ID',
            type: 'AD_LANE_R_LDIV_ID'
        }
    ],
    AD_StopLocation: [
        {
            key: 'STOPL_ID',
            name: '用户编号',
            type: 'AD_STOPLOCATION_STOPL_ID'
        },
        {
            key: 'TYPE',
            name: '停车线类型',
            type: 'AD_STOPLOCATION_TYPE'
        }
    ],
    AD_LaneMark_Plg: [
        {
            key: 'PLG_ID',
            name: '用户编号',
            type: 'AD_LANEMARK_PLG_ID'
        },
        {
            key: 'TYPE',
            name: '面状标识物类型',
            type: 'AD_LANEMARK_PLG_TYPE'
        }
    ],
    AD_Arrow: [
        {
            key: 'ARR_ID',
            name: '用户编号',
            type: 'AD_ARROW_ID'
        },
        {
            key: 'ARR_DIRECT',
            name: '箭头方向',
            type: 'AD_ARROW_ARR_DIRECT'
        },
        {
            key: 'LANE_ID',
            name: '关联车道中心线ID',
            type: 'AD_ARROW_LANE_ID'
        }
    ],
    AD_Junction: [
        {
            key: 'JUNC_ID',
            name: '用户编号',
            type: 'AD_JUNCTION_ID'
        }
    ],
    AD_LaneAttrPoint: [
        {
            key: 'LAP_ID',
            name: '用户编号',
            type: 'AD_LANE_ATTRPOINT_ID'
        },
        {
            key: 'TYPE',
            name: '属性变化点类型',
            type: 'AD_LANE_ATTRPOINT_TYPE'
        },
        {
            key: 'ROAD_ID',
            name: '关联道路参考线ID',
            type: 'AD_LANE_ATTRPOINT_ROAD_ID'
        },
        {
            key: 'LANE_ID',
            name: '关联车道中心线ID',
            type: 'AD_LANE_ATTRPOINT_LANE_ID'
        },
        {
            key: 'NUMBER',
            name: '收费站通道数',
            type: 'AD_LANE_ATTRPOINT_NUMBER'
        }
    ],
    AD_TrafficSign: [
        {
            key: 'SIGN_ID',
            name: '用户编号'
        }
    ],
    AD_TrafficLight: [
        {
            key: 'LIGHT_ID',
            name: '用户编号',
            type: 'AD_TRAFFIC_LIGHT_ID'
        }
    ],
    AD_RS_Barrier: [
        {
            key: 'BARR_ID',
            name: '用户编号',
            type: 'AD_RS_BARRIER_BARR_ID'
        },
        {
            key: 'TYPE',
            name: '护栏类型',
            type: 'AD_RS_BARRIER_TYPE'
        },
        {
            key: 'TILT',
            name: '是否倾斜',
            type: 'AD_RS_BARRIER_TILT'
        }
    ],
    AD_LaneDivider_Pln: [
        {
            key: 'OBJ_ID',
            name: '用户编号'
        },
        {
            key: 'FEAT_TYPE',
            name: '要素子类型',
            type: 'AD_LANE_DIVIDER_PLN_FEAT_TYPE'
        },
        {
            key: 'CFD_GEO',
            name: '几何形状置信度',
            type: 'AD_LANE_DIVIDER_PLN_CFD_GEO'
        },
        {
            key: 'CFD_FEAT',
            name: '要素类型置信度',
            type: 'AD_LANE_DIVIDER_PLN_CFD_FEAT'
        }
    ],
    AD_LaneDivider_Plg: [
        {
            key: 'OBJ_ID',
            name: '用户编号'
        },
        {
            key: 'FEAT_TYPE',
            name: '要素子类型',
            type: 'AD_LANE_DIVIDER_PLG_FEAT_TYPE'
        },
        {
            key: 'CFD_GEO',
            name: '几何形状置信度',
            type: 'AD_LANE_DIVIDER_PLG_CFD_GEO'
        },
        {
            key: 'CFD_FEAT',
            name: '要素类型置信度',
            type: 'AD_LANE_DIVIDER_PLG_CFD_FEAT'
        }
    ],
    AD_StopLocation_Geo: [
        {
            key: 'OBJ_ID',
            name: '用户编号'
        },
        {
            key: 'FEAT_TYPE',
            name: '要素子类型',
            type: 'AD_STOPLOCTION_GEO_FEAT_TYPE'
        },
        {
            key: 'CFD_GEO',
            name: '几何形状置信度',
            type: 'AD_STOPLOCTION_GEO_CFD_GEO'
        },
        {
            key: 'CFD_FEAT',
            name: '要素类型置信度',
            type: 'AD_STOPLOCTION_GEO_CFD_FEAT'
        }
    ],
    AD_Arrow_Geo: [
        {
            key: 'OBJ_ID',
            name: '用户编号'
        },
        {
            key: 'FEAT_TYPE',
            name: '要素子类型',
            type: 'AD_ARROW_GEO_FEAT_TYPE'
        },
        {
            key: 'CFD_GEO',
            name: '几何形状置信度',
            type: 'AD_ARROW_GEO_CFD_GEO'
        },
        {
            key: 'CFD_FEAT',
            name: '要素类型置信度',
            type: 'AD_ARROW_GEO_CFD_FEAT'
        }
    ],
    AD_LaneMark_Geo: [
        {
            key: 'OBJ_ID',
            name: '用户编号'
        },
        {
            key: 'FEAT_TYPE',
            name: '要素子类型',
            type: 'AD_LANE_MARK_GEO_FEAT_TYPE'
        },
        {
            key: 'CFD_GEO',
            name: '几何形状置信度',
            type: 'AD_LANE_MARK_GEO_CFD_GEO'
        },
        {
            key: 'CFD_FEAT',
            name: '要素类型置信度',
            type: 'AD_LANE_MARK_GEO_CFD_FEAT'
        }
    ],
    AD_TrafficSign_Geo: [
        {
            key: 'OBJ_ID',
            name: '用户编号'
        },
        {
            key: 'FEAT_TYPE',
            name: '要素子类型',
            type: 'AD_TRAFFIC_SIGN_GEO_FEAT_TYPE'
        },
        {
            key: 'CFD_GEO',
            name: '几何形状置信度',
            type: 'AD_TRAFFIC_SIGN_GEO_CFD_GEO'
        },
        {
            key: 'CFD_FEAT',
            name: '要素类型置信度',
            type: 'AD_TRAFFIC_SIGN_GEO_CFD_FEAT'
        }
    ],
    AD_TrafficLight_Geo: [
        {
            key: 'OBJ_ID',
            name: '用户编号'
        },
        {
            key: 'FEAT_TYPE',
            name: '要素子类型',
            type: 'AD_TRAFFIC_LIGHT_GEO_FEAT_TYPE'
        },
        {
            key: 'CFD_GEO',
            name: '几何形状置信度',
            type: 'AD_TRAFFIC_LIGHT_GEO_CFD_GEO'
        },
        {
            key: 'CFD_FEAT',
            name: '要素类型置信度',
            type: 'AD_TRAFFIC_LIGHT_GEO_CFD_FEAT'
        }
    ],
    AD_Pole_Geo: [
        {
            key: 'OBJ_ID',
            name: '用户编号',
            type: 'AD_POLE_GEO_OBJ_ID'
        },
        {
            key: 'CFD_GEO',
            name: '几何形状置信度',
            type: 'AD_POLE_GEO_CFD_GEO'
        },
        {
            key: 'CFD_FEAT',
            name: '要素类型置信度',
            type: 'AD_POLE_GEO_CFD_FEAT'
        }
    ]
};

export const EXTRA_TEXT_CONFIG = {
    AD_LANEMARK_PLG_TYPE: [
        { value: 11, label: '虚拟人行横道', abbreviation: '虚人' },
        { value: 12, label: '虚拟禁止停车区', abbreviation: '虚禁' }
    ],
    AD_ARROW_ARR_DIRECT: [
        { value: 'AB', abbreviation: '直左' },
        { value: 'AC', abbreviation: '直右' },
        { value: 'ABC', abbreviation: '左直右' },
        { value: 'AD', abbreviation: '直左掉' },
        { value: 'AE', abbreviation: '直右掉' },
        { value: 'BC', abbreviation: '左右转' },
        { value: 'BD', abbreviation: '左转掉' },
        { value: 'BE', abbreviation: '左转右掉' },
        { value: 'CE', abbreviation: '右转掉' }
    ],
    AD_ARROW_GEO_FEAT_TYPE: [
        { value: 'AB', abbreviation: '直左' },
        { value: 'AC', abbreviation: '直右' },
        { value: 'ABC', abbreviation: '左直右' },
        { value: 'AD', abbreviation: '直左掉' },
        { value: 'AE', abbreviation: '直右掉' },
        { value: 'BC', abbreviation: '左右转' },
        { value: 'BD', abbreviation: '左转掉' },
        { value: 'BE', abbreviation: '左转右掉' },
        { value: 'CE', abbreviation: '右转掉' }
    ]
};
