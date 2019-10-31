import React from 'react';
import { Table, Checkbox } from 'antd';
import { inject, observer } from 'mobx-react';
import { getLayerIDKey, getLayerByName } from 'src/utils/vectorUtils';
import { COLUMNS_CONFIG } from 'src/config/CheckTableConfig';
import { DATA_LAYER_MAP } from 'src/config/DataLayerConfig';

const CheckboxGroup = Checkbox.Group;

@inject('TaskStore')
@inject('appStore')
@inject('QualityCheckStore')
@observer
class QualityCheckResultTable extends React.Component {
    state = {
        indeterminate: false,
        checkAll: true
    };

    render() {
        const { QualityCheckStore } = this.props;
        const { reportList } = QualityCheckStore;
        return (
            <Table
                dataSource={reportList.slice()}
                columns={this.qualityCheckTabelColumns()}
                onRow={record => {
                    return {
                        onDoubleClick: this.tableOnDoubleClick(record)
                    };
                }}
                pagination={false}
                className="check-result-table"
                onChange={this.handleTableChange}
                rowKey={record => `checkResult_${record.index}`}
                scroll={{ y: 170 }}
            />
        );
    }

    handleCheckChange = (checkedList, dataIndex, filterKeys) => {
        const { QualityCheckStore } = this.props;
        const { checkFilter } = QualityCheckStore;

        this.setState({
            [dataIndex]: checkedList,
            indeterminate:
                !!checkedList.length && checkedList.length < filterKeys.length,
            checkAll: checkedList.length === filterKeys.length
        });

        checkFilter(dataIndex, checkedList);
    };

    handleCheckAllChange = (e, dataIndex, filterKeys) => {
        const { checked } = e.target;
        const { QualityCheckStore } = this.props;
        const { checkAllFilter } = QualityCheckStore;

        this.setState({
            [dataIndex]: checked ? filterKeys : [],
            indeterminate: false,
            checkAll: checked
        });

        checkAllFilter(checked);
    };

    getColumnSearchProps = (dataIndex, filterKeys) => {
        const { indeterminate, checkAll } = this.state;
        const checkedList = this.state[dataIndex];

        return {
            filterDropdown: filterFuntion => (
                <div style={{ padding: 8 }}>
                    <p>
                        <Checkbox
                            indeterminate={indeterminate}
                            onChange={e =>
                                this.handleCheckAllChange(
                                    e,
                                    dataIndex,
                                    filterKeys
                                )
                            }
                            checked={checkAll}>
                            全选
                        </Checkbox>
                    </p>
                    <CheckboxGroup
                        className="ad-checkbox-group"
                        options={filterKeys.slice()}
                        value={checkedList}
                        onChange={e =>
                            this.handleCheckChange(e, dataIndex, filterKeys)
                        }
                    />
                </div>
            ),
            onFilterDropdownVisibleChange: visible => {
                // 初始化全选
                if (visible && !this.state[dataIndex]) {
                    this.setState({
                        [dataIndex]: filterKeys
                    });
                }
            }
        };
    };

    qualityCheckTabelColumns = () => {
        const _ = this;
        const { QualityCheckStore } = this.props;

        const columns = COLUMNS_CONFIG.map(item => {
            const { key, isFilter, dataIndex } = item;
            item = {
                ...item,
                align: 'center',
                render: (text, record, index) => {
                    return (
                        <div className={record.visited && 'visited'}>
                            {(() => {
                                switch (key) {
                                    case 'index':
                                        return index + 1;
                                    case 'layerName':
                                        if (!DATA_LAYER_MAP[text]) return text;
                                        return DATA_LAYER_MAP[text].label;
                                    default:
                                        return text;
                                }
                            })()}
                        </div>
                    );
                }
            };
            if (isFilter) {
                item = {
                    ...item,
                    ...this.getColumnSearchProps(
                        dataIndex,
                        QualityCheckStore[`${dataIndex}Arr`]
                    )
                };
            }
            return item;
        });

        columns.push({
            title: '是否无需修改',
            dataIndex: 'misrepId',
            key: 'misrepId',
            width: '12%',
            align: 'center',
            render(text, record, index) {
                return (
                    <Checkbox
                        checked={record.checked}
                        onChange={e => {
                            _.handleChange(e, record, index);
                        }}
                    />
                );
            }
        });

        return columns;
    };

    //双击
    tableOnDoubleClick = record => {
        return e => {
            //已访问
            const { QualityCheckStore, TaskStore } = this.props;
            const { visitedReport } = QualityCheckStore;
            const { activeTaskId } = TaskStore;
            let { layerName, featureId, index } = record;
            visitedReport(index, activeTaskId);
            //定位
            let IDKey = getLayerIDKey(layerName);
            let option = {
                key: IDKey,
                value: Number(featureId)
            };
            let layer = getLayerByName(layerName);
            let feature = layer.getFeatureByOption(option).properties;
            let extent = map.getExtent(feature.data.geometry);
            map.setView('U');
            map.setExtent(extent);
        };
    };

    handleChange = (e, record, index) => {
        const { QualityCheckStore, appStore } = this.props;
        const {
            producerInsertMisreport,
            producerDeleteMisreport,
            qualityUpdateMisreport
        } = QualityCheckStore;
        const { loginUser } = appStore;
        const { roleCode } = loginUser;
        const { checked } = e.target;
        const { misrepId } = record;

        switch (roleCode) {
            case 'producer':
                checked
                    ? producerInsertMisreport(record, index, checked)
                    : producerDeleteMisreport({ misrepId }, index, checked);
                break;
            case 'quality':
                const status = checked ? 2 : 1;
                qualityUpdateMisreport({ misrepId, status }, index, checked);
                break;
            default:
                break;
        }
    };
}

export default QualityCheckResultTable;
