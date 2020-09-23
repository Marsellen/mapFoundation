export const COLUMNS_CONFIG = [
    {
        title: '序号',
        dataIndex: 'index',
        key: 'index',
        width: 40
    },
    {
        title: '任务号',
        dataIndex: 'taskId',
        key: 'taskId',
        width: 60
    },
    {
        title: '检查项编号',
        dataIndex: 'checkId',
        key: 'checkId',
        isFilter: true,
        width: 90
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
        width: 70
    },
    {
        title: '图层',
        dataIndex: 'layerNameText',
        key: 'layerNameText',
        isFilter: true,
        width: 90
    },
    {
        title: '错误描述',
        dataIndex: 'errorDesc',
        key: 'errorDesc',
        width: 200
    },
    {
        title: '是否查看',
        dataIndex: 'visitedText',
        key: 'visitedText',
        width: 60,
        isFilter: true
    },
    {
        title: '修改方法',
        dataIndex: 'suggest',
        key: 'suggest',
        width: 200
    },
    {
        title: '自动修正',
        dataIndex: 'repairStatus',
        key: 'repairStatus',
        width: 70
    }
];
