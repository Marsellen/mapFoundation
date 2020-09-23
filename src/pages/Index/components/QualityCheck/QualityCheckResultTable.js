import React from 'react';
import { Button } from 'antd';
import { inject, observer } from 'mobx-react';
import { locateCheckItem } from 'src/utils/vectorUtils';
import { COLUMNS_CONFIG } from 'src/config/CheckTableConfig';
import { getQualityMisrepStatus } from 'src/utils/permissionCtrl';
import MultiFunctionalTable from 'src/components/MultiFunctionalTable';

@inject('TaskStore')
@inject('appStore')
@inject('DataLayerStore')
@inject('AttributeStore')
@inject('QualityCheckStore')
@observer
class QualityCheckResultTable extends React.Component {
    state = {
        loadings: {}
    };

    getColumns = () => {
        const currentColumns = COLUMNS_CONFIG.map((item, index) => {
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
                        case 'visitedText':
                            return (
                                <div style={{ userSelect: 'none' }}>
                                    {record.visited ? '√' : ''}
                                </div>
                            );
                        case 'misrepId':
                            return this.renderActions(record);
                        default:
                            return text;
                    }
                }
            };
            return item;
        });
        return currentColumns;
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

    //单击
    handleClick = record => {
        const { DataLayerStore } = this.props;
        if (DataLayerStore.editType != 'normal') return;
        let feature = locateCheckItem(record);
        feature && this.showAttributesModal(feature);
    };

    //双击
    handleDoudleClick = record => {
        const { QualityCheckStore, TaskStore, DataLayerStore } = this.props;
        const { visitedReport } = QualityCheckStore;
        const { activeTaskId } = TaskStore;
        if (DataLayerStore.editType != 'normal') return;
        DataLayerStore.exitEdit();
        visitedReport(record, activeTaskId);
        locateCheckItem(record, true);
    };

    //显示属性框
    showAttributesModal = async obj => {
        if (!obj) return;
        const { AttributeStore, DataLayerStore } = this.props;
        let editLayer = DataLayerStore.getEditLayer();
        let readonly = (editLayer && editLayer.layerName !== obj.layerName) || !editLayer;
        DataLayerStore.clearHighLightFeatures();
        DataLayerStore.clearPick();
        await AttributeStore.setModel(obj);
        DataLayerStore.setFeatureColor(obj, 'rgb(255,134,237)');
        DataLayerStore.setSelectFeature(obj.layerId, obj.uuid);
        AttributeStore.show(readonly);
    };

    render() {
        const {
            QualityCheckStore: { updateKey, reportList, filterOption, tableHeight, toResizeDom }
        } = this.props;
        const columns = this.getColumns();
        return (
            <MultiFunctionalTable
                key={updateKey}
                dataSource={reportList}
                tableHeight={tableHeight}
                toResizeDom={toResizeDom}
                columns={columns}
                filters={filterOption}
                addJumpToFirstPage={false}
                className="check-result-table"
                onClick={this.handleClick}
                onDoubleClick={this.handleDoudleClick}
                rowKey={record => `checkResult_${record.index}`}
            />
        );
    }
}

export default QualityCheckResultTable;
