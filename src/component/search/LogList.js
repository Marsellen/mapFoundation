import React, { useContext } from 'react';
import { ConfigProvider, Table, Divider, Icon } from 'antd';
import moment from 'moment';
import zh_CN from 'antd/es/locale/zh_CN';
import { TASK_PROCESS_NAME } from 'src/config/taskConfig';
import { LogStore, getLogList, getLogDetail } from 'src/store/search/logStore';
import LogModal from 'src/component/search/logModal';

function LogList() {
    const { state = {}, dispatch, form } = useContext(LogStore);

    const handleTableChange = pagination => {
        const { current, pageSize } = pagination;
        form.validateFields(async (err, value) => {
            if (err) return;
            const startTime = moment(value.startTime).format('YYYY-MM-DD HH-mm-ss.SSS') || null;
            const endTime = moment(value.endTime).format('YYYY-MM-DD HH-mm-ss.SSS') || null;
            const logListData = await getLogList({
                userName: value.userName,
                taskId: value.taskId,
                startTime: startTime,
                endTime: endTime,
                pageSize: pageSize,
                pageNumber: current,
                layerName: value.layerName || '',
                layerField: value.layerField || '',
                layerId: value.layerId || ''
            });
            dispatch({ type: 'setLogList', logListData });
        });
    };

    const handleDetailData = async (record, label, type) => {
        const logDetailData = await getLogDetail({
            userName: record.userName,
            taskId: record.taskId,
            saveTime: record.saveTime,
            dataType: type
        });
        downloadFileByBlob(record, logDetailData, label);
    };

    const downloadFileByBlob = (record, logDetailData, label) => {
        const detailJsonIndex = `${record.userName}:${record.taskId}:${record.saveTime}`;
        const totalData = JSON.stringify(logDetailData?.[detailJsonIndex], null, 4);
        const blobContent = new Blob([totalData], { type: 'application/json' });
        const blobUrl = window.URL.createObjectURL(blobContent);
        const eleLink = document.createElement('a');
        eleLink.download = `${label}.json`;
        eleLink.style.display = 'none';
        eleLink.href = blobUrl;
        document.body.appendChild(eleLink);
        eleLink.click();
        document.body.removeChild(eleLink);
    };

    const columns = [
        {
            title: '任务节点类型',
            dataIndex: 'processName',
            render: taskType => {
                let span = '';
                TASK_PROCESS_NAME.forEach(item => {
                    if (item.value === taskType) {
                        span = <span>{item.label}</span>;
                    }
                });
                return span;
            }
        },
        {
            title: '任务数据地址',
            dataIndex: 'inputImpDataPath'
        },
        {
            title: '保存时间',
            dataIndex: 'saveTime',
            render: time => {
                return (
                    <span>{moment(time, 'YYYY-MM-DD HH:mm:ss').format('YYYY-MM-DD HH:mm:ss')}</span>
                );
            }
        },
        {
            title: '操作',
            dataIndex: '',
            render: record => {
                return (
                    <div>
                        <LogModal type="incrementData" label="操作记录" record={record} />
                        {_renderDownload(record, '操作记录', 'incrementData')}
                        <Divider type="vertical" />
                        <LogModal type="totalData" label="数据快照" record={record} />
                        {_renderDownload(record, '数据快照', 'totalData')}
                        <Divider type="vertical" />
                        <LogModal type="all" label="所有数据" record={record} />
                        {_renderDownload(record, '所有数据', 'all')}
                    </div>
                );
            }
        }
    ];

    const _renderDownload = (record, label, type) => {
        return (
            <a onClick={() => handleDetailData(record, label, type)}>
                <Icon type="download" />
            </a>
        );
    };

    return (
        <div className="log-list">
            <ConfigProvider locale={zh_CN}>
                <Table
                    dataSource={state?.logListData?.list || []}
                    columns={columns}
                    rowKey={item => item.saveTime}
                    onChange={handleTableChange}
                    pagination={{
                        total: state?.logListData?.totalNumber || 0,
                        pageSizeOptions: ['10', '30', '50'],
                        showQuickJumper: true,
                        showSizeChanger: true
                    }}
                />
            </ConfigProvider>
        </div>
    );
}

export default LogList;
