
// 所有图层字段的类型   【字段类型】  
export const TYPE_SELECT_OPTION_LAYER = {

    //#region  【参考线】类型
    AD_ROAD_RD_FORM: [
        { value: 0, label: '未定义', abbreviation: '0' },
        { value: 1, label: '普通道路', abbreviation: '普' },
        { value: 2, label: '隧道道路', abbreviation: '隧' },
        { value: 3, label: '收费站道路', abbreviation: '收费' },
        { value: 4, label: '匝道', abbreviation: '匝' },
        { value: 5, label: '辅路', abbreviation: '辅' },
        { value: 6, label: '环岛', abbreviation: '环' },
        { value: 7, label: '服务区辅道', abbreviation: '服务' }
    ],
    //#endregion 

    //#region  【中心线】 类型定义
    // 车道转向方向
    AD_LANE_TURN_TYPE: [
        { value: 0, label: '未定义', abbreviation: '未定' },
        { value: 1, label: '左转', abbreviation: '左转' },
        { value: 2, label: '直行', abbreviation: '直行' },
        { value: 3, label: '右转', abbreviation: '右转' },
        { value: 4, label: '掉头', abbreviation: '掉头' },
        { value: 99, label: '其他', abbreviation: '其他' }
    ],
    //#endregion 

    // 【中心线属性点】
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
        // 新增
        { value: 1812, label: '交替通行合流点', icon: 'xiafangdaoluzhongdian', abbreviation: '交替' },
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
    ]
}

