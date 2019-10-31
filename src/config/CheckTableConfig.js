export const COLUMNS_CONFIG = [
    {
        title: '序号',
        dataIndex: 'index',
        key: 'index',
        width: '60px'
    },
    {
        title: '任务号',
        dataIndex: 'taskId',
        key: 'taskId',
        width: '60px'
    },
    {
        title: '检查项编号',
        dataIndex: 'checkId',
        key: 'checkId',
        isFilter: true,
        width: '120px'
    },
    {
        title: '检查名称',
        dataIndex: 'checkName',
        key: 'checkName',
        width: '10%'
    },
    {
        title: '要素id',
        dataIndex: 'featureId',
        key: 'featureId',
        width: '60px'
    },
    {
        title: '图层',
        dataIndex: 'layerName',
        key: 'layerName',
        isFilter: true,
        width: '160px'
    },
    {
        title: '错误描述',
        dataIndex: 'errorDesc',
        key: 'errorDesc'
    }
];
