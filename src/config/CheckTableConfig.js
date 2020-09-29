import { DATA_LAYER_MAP } from 'src/config/DataLayerConfig';

const LAYER_NAME_DESC = Object.values(DATA_LAYER_MAP);

const VISITED_STATUS_DESC = [
    { value: true, label: '已查看' },
    { value: false, label: '未查看' }
];

const MIS_REP_ID_DESC = [
    { value: true, label: '无需修改' },
    { value: false, label: '需修改' }
];

const MIS_REP_STATUS_DESC = [
    { value: 1, label: '未处理' },
    { value: 2, label: '无需修改' },
    { value: 4, label: '需修改' }
];

const REPAIR_STATUS_DESC = [
    { value: 0, label: '未自动修正' },
    { value: 1, label: '自动修正' }
];

const FIX_REPORT_COLUMNS = [
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
        width: 100
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
        dataIndex: 'layerName',
        key: 'layerName',
        isFilter: true,
        describe: {
            data: LAYER_NAME_DESC,
            label: 'label',
            value: 'spec'
        },
        width: 80
    },
    {
        title: '错误描述',
        dataIndex: 'errorDesc',
        key: 'errorDesc',
        width: 158
    },
    {
        title: '是否查看',
        dataIndex: 'visited',
        key: 'visited',
        isFilter: true,
        describe: {
            data: VISITED_STATUS_DESC,
            label: 'label',
            value: 'value'
        },
        width: 90
    },
    {
        title: '无需修改',
        dataIndex: 'misrepStatus',
        key: 'misrepStatus',
        isFilter: true,
        describe: {
            data: MIS_REP_ID_DESC,
            label: 'label',
            value: 'value'
        },
        width: 90
    },
    {
        title: '修改方法',
        dataIndex: 'suggest',
        key: 'suggest',
        width: 100
    },
    {
        title: '自动修正',
        dataIndex: 'repairStatus',
        key: 'repairStatus',
        isFilter: true,
        describe: {
            data: REPAIR_STATUS_DESC,
            label: 'label',
            value: 'value'
        },
        width: 90
    }
];

const QC_REPORT_COLUMNS = [
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
        width: 100
    },
    {
        title: '要素id',
        dataIndex: 'featureId',
        key: 'featureId',
        width: 75
    },
    {
        title: '图层',
        dataIndex: 'layerName',
        key: 'layerName',
        isFilter: true,
        describe: {
            data: LAYER_NAME_DESC,
            label: 'label',
            value: 'spec'
        },
        width: 110
    },
    {
        title: '错误描述',
        dataIndex: 'errorDesc',
        key: 'errorDesc',
        width: 270
    },
    {
        title: '是否查看',
        dataIndex: 'visited',
        key: 'visited',
        isFilter: true,
        describe: {
            data: VISITED_STATUS_DESC,
            label: 'label',
            value: 'value'
        },
        width: 100
    },
    {
        title: '无需修改',
        dataIndex: 'status',
        key: 'status',
        isFilter: true,
        describe: {
            data: MIS_REP_STATUS_DESC,
            label: 'label',
            value: 'value'
        },
        width: 100
    }
];

//过程库查询底图数据时，不同任务环节和参数字段映射
export const REPORT_COLUMNS = {
    imp_recognition: FIX_REPORT_COLUMNS,
    imp_check_after_recognition: QC_REPORT_COLUMNS,
    imp_manbuild: FIX_REPORT_COLUMNS,
    imp_check_after_manbuild: QC_REPORT_COLUMNS
};
