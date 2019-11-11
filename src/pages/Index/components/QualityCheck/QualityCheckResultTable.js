import React from 'react';
import { Table, Checkbox } from 'antd';
import { inject, observer } from 'mobx-react';
import { getLayerIDKey, getLayerByName } from 'src/utils/vectorUtils';
import { COLUMNS_CONFIG } from 'src/config/CheckTableConfig';
import { shortcut } from 'src/utils/shortcuts';

const CheckboxGroup = Checkbox.Group;

@inject('TaskStore')
@inject('appStore')
@inject('DataLayerStore')
@inject('AttributeStore')
@inject('QualityCheckStore')
@observer
class QualityCheckResultTable extends React.Component {
    checkReportTable = null;
    checkReportTableRow = null;
    checkReportTableRowH = null;
    state = {
        indeterminate: false,
        checkAll: true,
        currentIndex: -1
    };

    render() {
        const { QualityCheckStore } = this.props;
        const { reportList } = QualityCheckStore;
        return (
            <div
                onKeyUp={e => this.handleKeyUp(e)}
                onKeyDown={e => this.handleKeyDown(e)}>
                <Table
                    dataSource={reportList.slice()}
                    columns={this.qualityCheckTabelColumns()}
                    onRow={record => {
                        return {
                            onClick: this.tableOnClick(record),
                            onDoubleClick: this.tableOnDoubleClick(record)
                        };
                    }}
                    rowClassName={record =>
                        `check-table-row check-table-row-${record.index}`
                    }
                    pagination={false}
                    className="check-result-table"
                    onChange={this.handleTableChange}
                    rowKey={record => `checkResult_${record.index}`}
                    scroll={{ y: 240 }}
                />
            </div>
        );
    }

    componentDidMount() {
        this.checkReportTable = document.querySelector(
            '.check-result-table .ant-table-body'
        );
    }

    handleKeyDown = event => {
        event.preventDefault();
        event.stopPropagation();
    };

    //方向快捷键
    handleKeyUp = event => {
        shortcut.add(event, [
            {
                ctrl: false,
                alt: false,
                shift: false,
                keyCode: 38,
                callback: () => {
                    const { currentIndex } = this.state;
                    const prevIndex = currentIndex - 1;
                    if (prevIndex < 0) return;
                    this.activeRowStyle(prevIndex);
                    this.setState({ currentIndex: prevIndex });
                    this.checkReportTable.scrollTop -= this.checkReportTableRowH;
                },
                describe: '↑'
            },
            {
                ctrl: false,
                alt: false,
                shift: false,
                keyCode: 40,
                callback: () => {
                    const { QualityCheckStore } = this.props;
                    const { currentIndex } = this.state;
                    const { reportListL } = QualityCheckStore;
                    const nextIndex = currentIndex + 1;
                    if (nextIndex >= reportListL) return;
                    this.activeRowStyle(nextIndex);
                    this.setState({ currentIndex: nextIndex });
                    this.checkReportTable.scrollTop += this.checkReportTableRowH;
                },
                describe: '↓'
            },
            {
                ctrl: false,
                alt: false,
                shift: false,
                keyCode: 37,
                callback: () => {
                    console.log('快捷键：左方向键');
                },
                describe: '←'
            },
            {
                ctrl: false,
                alt: false,
                shift: false,
                keyCode: 39,
                callback: () => {
                    console.log('快捷键：右方向键');
                },
                describe: '→'
            }
        ]);
    };

    getCurrentCheckedList = dataIndex => {
        const { QualityCheckStore } = this.props;
        const { reportList } = QualityCheckStore;
        const currentCheckList = {};
        reportList.forEach(item => {
            const value = item[dataIndex];
            currentCheckList[value] = value;
        });
        return Object.values(currentCheckList);
    };

    handleCheckChange = (checkedList, dataIndex, filterKeys) => {
        const { QualityCheckStore } = this.props;
        const { checkFilter } = QualityCheckStore;

        checkFilter(dataIndex, checkedList);

        this.setState({
            [dataIndex]: checkedList,
            indeterminate:
                !!checkedList.length && checkedList.length < filterKeys.length,
            checkAll: checkedList.length === filterKeys.length
        });
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
        const checkedList = this.state[dataIndex] || [];

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
                if (visible) {
                    const { QualityCheckStore } = this.props;
                    const checkedList = this.state[dataIndex] || [];
                    const checkListInit = QualityCheckStore[`${dataIndex}Arr`];
                    const currentCheckList = this.getCurrentCheckedList(
                        dataIndex
                    );
                    this.setState({
                        [dataIndex]: checkedList
                            ? currentCheckList
                            : filterKeys,
                        indeterminate:
                            !!currentCheckList.length &&
                            currentCheckList.length < checkListInit.length,
                        checkAll:
                            currentCheckList.length === checkListInit.length
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

    //选中哪一行
    activeRowStyle = index => {
        const currentRow = document.querySelector(`.check-table-row-${index}`);
        const activeRow = document.querySelector('.check-table-row-active');
        activeRow && activeRow.classList.remove('check-table-row-active');
        currentRow && currentRow.classList.add('check-table-row-active');
        this.setState({
            currentIndex: index
        });
    };

    //单击
    tableOnClick = record => {
        return e => {
            this.checkReportTableRow = document.querySelector(
                '.check-table-row'
            );
            this.checkReportTableRowH = this.checkReportTableRow.offsetHeight;
            this.activeRowStyle(record.index);
        };
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
            this.showAttributesModal(feature);
        };
    };

    showAttributesModal = obj => {
        const { AttributeStore, DataLayerStore } = this.props;
        let editLayer = DataLayerStore.getEditLayer();
        let readonly =
            !editLayer || (editLayer && editLayer.layerName !== obj.layerName);
        AttributeStore.setModel(obj);
        DataLayerStore.clearHighLightFeatures();
        DataLayerStore.setFeatureColor(obj, 0xcc00ff);
        AttributeStore.show(readonly);
        AttributeStore.setAfterSave(this.getData);
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
                const status = checked ? 2 : 4;
                qualityUpdateMisreport({ misrepId, status }, index, checked);
                break;
            default:
                break;
        }
    };
}

export default QualityCheckResultTable;
