import React from 'react';
import { Button } from 'antd';
import { inject, observer } from 'mobx-react';
import { markCheckItem, locateCheckItem, selectFeature } from 'src/tool/vectorUtils';
import { getQualityMisrepStatus } from 'src/tool/permissionCtrl';
import MultiFunctionalTable from 'src/component/common/multiFunctionTable';

@inject('LoadingStore')
@inject('TaskStore')
@inject('appStore')
@inject('DataLayerStore')
@inject('AttributeStore')
@inject('QualityCheckStore')
@inject('QCMarkerStore')
@observer
class QualityCheckResultTable extends React.Component {
    state = {
        loadings: {}
    };

    getColumns = () => {
        const cloumns = this.props.QualityCheckStore.reportColumns || [];
        const newColumns = cloumns.map((item, index) => {
            const { describe, styleByValue: { fieldValue, className } = {} } = item;
            item = {
                ...item,
                align: 'center',
                onCell: record => ({
                    className: record.visited ? 'visited' : ''
                }),
                render: (text, record, index) => {
                    switch (item.key) {
                        case 'index':
                            return text + 1;
                        case 'visited':
                            return (
                                <div style={{ userSelect: 'none' }}>
                                    {record.visited ? '√' : ''}
                                </div>
                            );
                        case 'status':
                        case 'misrepStatus':
                            return this.renderActions(record);
                        case 'repairStatus':
                            return this.renderCancelRepair(record);
                        default:
                            if (!text && text !== 0) return '--';
                            const cellClassName = fieldValue === text ? className : '';
                            if (describe) {
                                const { data, secondKey, label, value } = describe;
                                const secondKeyStr = record[secondKey];
                                const descArr = secondKey ? data[secondKeyStr] : data;
                                const describeObj = descArr.find(item => item[value] == text);
                                text = describeObj ? describeObj[label] : text;
                            }
                            return <span className={cellClassName}>{text}</span>;
                    }
                }
            };
            return item;
        });
        return newColumns;
    };

    renderActions = record => {
        const { index } = record;
        let { loadings } = this.state;
        let { addDisabled, delDisabled } = getQualityMisrepStatus(record);
        return (
            <div className="button-list">
                <Button
                    type="link"
                    disabled={addDisabled || loadings[index]}
                    onClick={e => {
                        this.enterLoading(index, this.handleChange.bind(this, true, record, e));
                    }}
                >
                    加入
                </Button>
                <Button
                    type="link"
                    disabled={delDisabled || loadings[index]}
                    onClick={e => {
                        this.enterLoading(index, this.handleChange.bind(this, false, record, e));
                    }}
                >
                    撤销
                </Button>
            </div>
        );
    };

    enterLoading = (index, fn) => {
        let loadings = this.state.loadings;
        loadings[index] = true;
        this.setState({
            loadings: loadings
        });
        fn().finally(() => {
            let newLoadings = this.state.loadings;
            newLoadings[index] = false;
            this.setState({ loadings: newLoadings });
        });
    };

    //处理勾选
    handleChange = async (checked, record, e) => {
        e.stopPropagation();
        const { QualityCheckStore, appStore } = this.props;
        const {
            producerInsertMisreport,
            producerDeleteMisreport,
            qualityUpdateMisreport
        } = QualityCheckStore;
        const { loginUser } = appStore;
        const { roleCode } = loginUser;
        const { misrepId, index } = record;

        switch (roleCode) {
            case 'producer':
                checked
                    ? await producerInsertMisreport(record, index)
                    : await producerDeleteMisreport({ misrepId }, index);
                break;
            case 'quality':
                const status = checked ? 2 : 4;
                await qualityUpdateMisreport({ misrepId, status }, index);
                break;
            default:
                break;
        }
    };

    renderCancelRepair = record => {
        return (
            <div className="button-list">
                <Button
                    type="link"
                    disabled={!record.repairStatus}
                    onClick={e => this.handleCancelRepair(e, record)}
                >
                    撤销
                </Button>
            </div>
        );
    };

    handleCancelRepair = async (e, record) => {
        e.stopPropagation();
        const { repId, taskId, index } = record;
        const {
            TaskStore: { taskProcessName },
            QualityCheckStore: { cancelRepairMisreport },
            LoadingStore: { setGlobalLoading }
        } = this.props;
        const option = {
            repId,
            task_id: taskId,
            process_name: taskProcessName
        };
        setGlobalLoading(true);
        await cancelRepairMisreport(option, index);
        setGlobalLoading(false);
    };

    //单击
    handleClick = record => {
        const { DataLayerStore, QCMarkerStore } = this.props;
        if (QCMarkerStore.isCreateMarker()) return;
        DataLayerStore.exitEdit();
        markCheckItem(record);
        let feature = locateCheckItem(record);
        selectFeature(feature);
    };

    //双击
    handleDoudleClick = record => {
        const {
            QualityCheckStore: { visitedReport },
            TaskStore: { activeTaskId }
        } = this.props;
        visitedReport(record, activeTaskId);
        locateCheckItem(record, true);
    };

    render() {
        const {
            QualityCheckStore: { reportList, filters, tableHeight }
        } = this.props;
        const columns = this.getColumns();
        return (
            <MultiFunctionalTable
                dataSource={reportList}
                tableHeight={tableHeight}
                columns={columns}
                filters={filters}
                addJumpToFirstPage={false}
                className="check-result-table"
                onClick={this.handleClick}
                onDoubleClick={this.handleDoudleClick}
                rowKey={record => `check_result_${record.index}`}
            />
        );
    }
}

export default QualityCheckResultTable;
