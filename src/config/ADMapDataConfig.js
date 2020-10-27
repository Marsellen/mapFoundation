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
    AD_LANE_DIVIDER_LANESTATUS: [
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
        // { value: 21, label: '避险车道引道', icon: 'bixianchedaoyindao', abbreviation: '避' },
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
    AD_ROAD_RD_CLASS: [
        { value: 0, label: '未定义', abbreviation: '0' },
        { value: 1, label: '高速公路', abbreviation: '高速' },
        { value: 2, label: '城市快速路', abbreviation: '城快' },
        { value: 3, label: '城市道路', abbreviation: '城普' },
        { value: 99, label: '其他', abbreviation: '99' }
    ],
    AD_ROAD_RD_FORM: [
        { value: 0, label: '未定义', abbreviation: '0' },
        { value: 1, label: '普通道路', abbreviation: '普' },
        { value: 2, label: '隧道道路', abbreviation: '隧' },
        { value: 3, label: '收费站道路', abbreviation: '收费' }
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
        // { value: 21, label: '避险车道引道', icon: 'bixianchedaoyindao', abbreviation: '避' },
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
        { value: 1, label: '道路左侧出口', icon: 'daoluzuocechukou', abbreviation: '左出' },
        { value: 2, label: '道路右侧出口', icon: 'daoluyoucechukou', abbreviation: '右出' },
        { value: 3, label: '道路分离点', icon: 'daolufenlidian', abbreviation: '路分' },
        { value: 4, label: '道路合并点', icon: 'daoluhebingdian', abbreviation: '路合' },
        { value: 5, label: '车道合并点', icon: 'chedaohebingdian', abbreviation: '道合' },
        {
            value: 21,
            label: '服务区道路开始位置',
            icon: 'fuwuqudaolukaishiweizhi',
            abbreviation: '服开'
        },
        {
            value: 22,
            label: '服务区道路结束位置',
            icon: 'fuwuqudaolujieshuweizhi',
            abbreviation: '服结'
        },
        {
            value: 41,
            label: '点云不清晰起点',
            icon: 'dianyunbuqingxiqishi',
            abbreviation: '不清起'
        },
        {
            value: 42,
            label: '点云不清晰结束点',
            icon: 'dianyunbuqingxijieshu',
            abbreviation: '不清结'
        },
        { value: 43, label: '点云遮挡起点', icon: 'dianyunzhedangqishi', abbreviation: '遮起' },
        { value: 44, label: '点云遮挡结束', icon: 'dianyunzhedangjieshu', abbreviation: '遮结' },
        { value: 45, label: '精度误差起始', icon: 'jingduwuchaqishi', abbreviation: '差起' },
        { value: 46, label: '精度误差结束', icon: 'jingduwuchajieshu', abbreviation: '差结' },
        { value: 47, label: '道路施工起始', icon: 'daolushigongqishi', abbreviation: '施工起' },
        { value: 48, label: '道路施工结束', icon: 'daolushigongjieshu', abbreviation: '施工结' }
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
        { value: 'J', label: '禁止左掉头', icon: 'jinzhizuodiaotou', abbreviation: '禁左掉' },
        { value: 'K', label: '禁止右掉头', icon: 'jinzhiyoudiaotou', abbreviation: '禁右掉' },
        { value: 'L', label: '禁止左转', icon: 'jinzhizuozhuan', abbreviation: '禁左转' },
        { value: 'M', label: '禁止右转', icon: 'jinzhiyouzhuan', abbreviation: '禁右转' },
        { value: 'X', label: '待确认', icon: 'daiqueren', abbreviation: 'X' }
    ],
    AD_MAP_QC_FILE_NAME: [
        { value: 'AD_Road', label: '道路参考线' },
        { value: 'AD_LaneDivider', label: '车道线' },
        { value: 'AD_Lane', label: '车道中心线' },
        { value: 'AD_LaneAttrPoint', label: '车道属性变化点' },
        { value: 'AD_Arrow', label: '地面导向箭头' },
        { value: 'AD_StopLocation', label: '停止位置' },
        { value: 'AD_LaneMark_Plg', label: '面状标识物' },
        { value: 'AD_TrafficLight', label: '交通信号灯' },
        { value: 'AD_RS_Barrier', label: '隔离带、护栏' },
        { value: 'AD_LaneDivider_Pln', label: '几何层：车道线线要素' },
        { value: 'AD_LaneDivider_Plg', label: '几何层：车道线面要素' },
        { value: 'AD_StopLocation_Geo', label: '几何层：停止位置' },
        { value: 'AD_Arrow_Geo', label: '几何层：箭头' },
        { value: 'AD_LaneMark_Geo', label: '几何层：路面车道标记' },
        { value: 'AD_TrafficSign_Geo', label: '几何层：交通标志牌' },
        { value: 'AD_TrafficLight_Geo', label: '几何层：交通信号灯' },
        { value: 'AD_Pole_Geo', label: '几何层：杆状物' }
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
    AD_RS_BARRIER_TYPE: [
        { value: 0, label: '未定义', icon: 'weidingyi', abbreviation: '0' },
        { value: 1, label: '隧道墙', icon: 'suidaoqiang', abbreviation: '隧' },
        { value: 2, label: '路侧防护栏', icon: 'lucefanghulan', abbreviation: '路侧' },
        { value: 3, label: '路缘石', icon: 'luyuanshi', abbreviation: '石' },
        { value: 4, label: '隔音墙', icon: 'geyinqiang', abbreviation: '音' },
        { value: 5, label: '其他墙体', icon: 'qitaqiangti', abbreviation: '他' },
        { value: 6, label: '道路轮廓标', icon: 'daolulunkuobiao', abbreviation: '廓' }
    ],
    AD_RS_BARRIER_MATERIAL: [
        { value: 0, label: '未定义', abbreviation: '0' },
        { value: 1, label: '混凝土', abbreviation: '混' },
        { value: 2, label: '金属', abbreviation: '金' },
        { value: 3, label: '塑料', abbreviation: '塑' },
        { value: 4, label: '其他', abbreviation: '他' }
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
    ],
    AD_Road_Con_RS_TYPE: [
        { value: 0, label: '未定义' },
        { value: 1, label: '禁止转向' }
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
    AD_TrafficLight: {
        TYPE: 1,
        LAYOUT: 1,
        LAMP_COUNT: 3
    },
    AD_LaneDivider: {
        TYPE: 1,
        DIRECTION: 0,
        RD_LINE: 2,
        SHARE_LINE: 1,
        RD_EDGE: 2,
        LANESTATUS: 0,
        LANE_TYPE: 1,
        LANE_NO: 0,
        RD_FORM: 0
    },
    AD_Road: {
        TYPE: 1,
        RD_CLASS: 0,
        CROSSING: 2,
        RD_STATUS: 1,
        RD_FORM: 1,
        DIRECTION: 1,
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
    AD_LaneAttrPoint: {
        TYPE: 0,
        ROAD_ID: 0
    },
    AD_StopLocation: {
        TYPE: 1
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
        TYPE: 3,
        MATERIAL: 1
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
            domType: 'Select',
            link: {
                1: {
                    DIRECTION: 0,
                    LANESTATUS: 0,
                    LANE_TYPE: 0,
                    LANE_NO: 0,
                    RD_FORM: 0
                }
            }
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
            domType: 'InputNumber',
            required: true,
            validates: 'Numeric|range|-99|99',
            link: {
                default: {
                    DIRECTION: 1,
                    LANESTATUS: 1
                },
                0: {
                    DIRECTION: 0,
                    LANESTATUS: 0
                }
            }
        },
        {
            key: 'RD_FORM',
            name: '道路形态',
            type: 'AD_LANE_DIVIDER_RD_FORM',
            domType: 'Select'
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
            required: true,
            validates: 'Decimal|10|2',
            domType: 'InputNumber'
        },
        {
            key: 'MAX_SPEED',
            name: '道路最高行驶速度',
            type: 'AD_ROAD_MAX_SPEED',
            domType: 'InputNumber',
            required: true,
            validates: 'Numeric|range|0|120'
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
            key: 'MAX_SPEED',
            name: '最高行驶速度',
            type: 'AD_LANE_MAX_SPEED',
            domType: 'InputNumber',
            required: true,
            validates: 'Numeric|range|0|120'
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
            domType: 'InputNumber',
            required: true,
            validates: 'Numeric|range|0|110'
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
            name: '停车线类型',
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
    AD_TrafficLight: [
        {
            key: 'LIGHT_ID',
            name: '用户编号',
            type: 'AD_TRAFFIC_LIGHT_ID',
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
            domType: 'ChooseErrorLayer'
        },
        {
            key: 'FEAT_ID',
            name: '错误数据ID',
            type: 'AD_MAP_QC_FEAT_ID',
            validates: 'Numeric|maxLength|15',
            domType: 'InputNumber'
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
            validates: 'Char|250'
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
            validates: 'Char|20'
        },
        {
            key: 'QC_PERSON',
            name: '质检人员',
            type: 'AD_MAP_QC_QC_PERSON',
            domType: 'Input',
            required: true,
            validates: 'Char|20'
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
    ]
};

export const DEFAULT_CONFIDENCE_MAP = {
    AD_Road:
        '{"TYPE":{},"RD_CLASS":{},"CROSSING":{},"RD_STATUS":{},"RD_FORM":{},"DIRECTION":{},"MAX_SPEED":{},"GEOMETRY":{}}',
    AD_Road_Con: '{"FROM_ROAD":{},"TO_ROAD":{}}',
    AD_Road_Con_RS: '{"REL_ID":{},"RS_TYPE":{},"TIMEDOM":{}}',
    AD_LaneDivider:
        '{"TYPE":{},"RD_LINE":{},"SHARE_LINE":{},"RD_EDGE":{},"DIRECTION":{},"LANESTATUS":{},"LANE_TYPE":{},"LANE_NO":{},"RD_FORM":{},"GEOMETRY":{}}',
    AD_Lane:
        '{"ROAD_ID":{},"L_LDIV_ID":{},"R_LDIV_ID":{},"TYPE":{},"LANE_NO":{},"DIRECTION":{},"STATUS":{},"MAX_SPEED":{},"MAX_SP_TYP":{},"MIN_SPEED":{},"MIN_SP_TYP":{},"GEOMETRY":{}}',
    AD_Lane_Con: '{"FROM_LANE":{},"TO_LANE":{}}',
    AD_LaneShape: '{"LANE_ID":{}}',
    AD_Lane_RS: '{"LANE_ID":{},"RS_TYPE":{},"RS_VALUE":{},"TIMEDOM":{}}',
    AD_Lane_Con_RS: '{"REL_ID":{},"RS_TYPE":{},"TIMEDOM":{}}',
    AD_LaneAttrPoint: '{"TYPE":{},"ROAD_ID":{},"GEOMETRY":{}}',
    AD_Arrow: '{"ARR_DIRECT":{},"LANE_ID":{},"GEOMETRY":{}}',
    AD_StopLocation: '{"TYPE":{},"GEOMETRY":{}}',
    AD_StopL_Lane_Rel: '{"STOPL_ID":{},"LANE_ID":{}}',
    AD_LaneMark_Plg: '{"TYPE":{},"GEOMETRY":{}}',
    AD_Plg_Lane_Rel: '{"PLG_ID":{},"LANE_ID":{}}',
    AD_TrafficLight: '{"TYPE":{},"LAYOUT":{},"LAMP_COUNT":{},"GEOMETRY":{}}',
    AD_Light_Lane_Rel: '{"LIGHT_ID":{},"LANE_ID":{}}',
    AD_RS_Barrier: '{"TYPE":{},"MATERIAL":{},"GEOMETRY":{}}'
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
            key: 'LANE_TYPE',
            name: '车道类型',
            type: 'AD_LANE_DIVIDER_LANE_TYPE'
        },
        {
            key: 'RD_LINE',
            name: '道路参考线标识',
            type: 'AD_LANE_DIVIDER_RD_LINE'
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
        },
        {
            key: 'DIRECTION',
            name: '车道通行方向',
            type: 'AD_LANE_DIVIDER_DIRECTION'
        },
        {
            key: 'LANESTATUS',
            name: '车道通行状态',
            type: 'AD_LANE_DIVIDER_LANESTATUS'
        },
        {
            key: 'LANE_NO',
            name: '车道编号',
            type: 'AD_LANE_DIVIDER_LANE_NO'
        },
        {
            key: 'RD_FORM',
            name: '道路形态',
            type: 'AD_LANE_DIVIDER_RD_FORM'
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
            key: 'RD_CLASS',
            name: '道路等级',
            type: 'AD_ROAD_RD_CLASS'
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
        },
        {
            key: 'MAX_SPEED',
            name: '道路最高行驶速度',
            type: 'AD_ROAD_MAX_SPEED'
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
            key: 'MAX_SPEED',
            name: '最高行驶速度',
            type: 'AD_LANE_MAX_SPEED'
        },
        {
            key: 'MAX_SP_TYP',
            name: '最高速度来源',
            type: 'AD_LANE_MAX_SP_TYP'
        },
        {
            key: 'MIN_SPEED',
            name: '最低行驶速度',
            type: 'AD_LANE_MIN_SPEED'
        },
        {
            key: 'MIN_SP_TYP',
            name: '最低速度来源',
            type: 'AD_LANE_MIN_SP_TYP'
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
        }
    ],
    AD_TrafficLight: [
        {
            key: 'LIGHT_ID',
            name: '用户编号',
            type: 'AD_TRAFFIC_LIGHT_ID'
        },
        {
            key: 'TYPE',
            name: '交通灯类型',
            type: 'AD_TRAFFIC_LIGHT_TYPE'
        },
        {
            key: 'LAYOUT',
            name: '信号灯灯头布局',
            type: 'AD_TRAFFIC_LIGHT_LAYOUT'
        },
        {
            key: 'LAMP_COUNT',
            name: '信号灯灯头数量',
            type: 'AD_TRAFFIC_LIGHT_LAMP_COUNT'
        }
    ],
    AD_Map_QC: [
        {
            key: 'ID',
            name: '用户编号',
            type: 'AD_MAP_QC_ID'
        },
        {
            key: 'FILE_NAME',
            name: '错误图层名称',
            type: 'AD_MAP_QC_FILE_NAME'
        },
        {
            key: 'FEAT_ID',
            name: '错误数据ID',
            type: 'AD_MAP_QC_FEAT_ID'
        },
        {
            key: 'ERROR_TYPE',
            name: '错误类型',
            type: 'AD_MAP_QC_ERROR_TYPE'
        },
        {
            key: 'ERROR_DESC',
            name: '错误描述',
            type: 'AD_MAP_QC_ERROR_DESC'
        },
        {
            key: 'FIX_STATUS',
            name: '修正状态',
            type: 'AD_MAP_QC_FIX_STATUS'
        },
        {
            key: 'QC_STATUS',
            name: '检查结果',
            type: 'AD_MAP_QC_QC_STATUS'
        },
        {
            key: 'FIX_PERSON',
            name: '返工修改人员',
            type: 'AD_MAP_QC_FIX_PERSON'
        },
        {
            key: 'QC_PERSON',
            name: '质检人员',
            type: 'AD_MAP_QC_QC_PERSON'
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
            key: 'MATERIAL',
            name: '护栏材质',
            type: 'AD_RS_BARRIER_MATERIAL'
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
    ]
};
