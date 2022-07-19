
// 适配 库配置---图层对应的字段
export const LAYER_MAP_FIELD = {
    AD_Lane:
        [{
            // 基础配置
            key: 'TURN_TYPE',
            name: '车道转向方向',
            type: 'AD_LANE_TURN_TYPE',
            domType: 'Select',
            // 
            value: 'TURN_TYPE',
            label: '车道转向方向',
            // 表
            dataIndex: 'TRAVERSAL',
            title: '车道转向方向',
            width: 260,
            ellipsis: true,
            filterBy: 'typeFilter|AD_LANE_TURN_TYPE'
        }]
}
