export const COLUMNS_CONFIG = [
    {
        title: '序号',
        dataIndex: 'index',
        key: 'index',
        width: 50
    },
    {
        title: '任务号',
        dataIndex: 'taskId',
        key: 'taskId',
        width: 65
    },
    {
        title: '检查项编号',
        dataIndex: 'checkId',
        key: 'checkId',
        isFilter: true,
        width: 110
    },
    {
        title: '检查名称',
        dataIndex: 'checkName',
        key: 'checkName',
        width: 90
    },
    {
        title: '要素id',
        dataIndex: 'featureId',
        key: 'featureId',
        width: 75
    },
    {
        title: '图层',
        dataIndex: 'layerNameText',
        key: 'layerNameText',
        isFilter: true,
        width: 110
    },
    {
        title: '错误描述',
        dataIndex: 'errorDesc',
        key: 'errorDesc',
        width: 250
    },
    {
        title: '是否查看',
        dataIndex: 'visitedText',
        key: 'visitedText',
        width: 100,
        isFilter: true
    }
];
