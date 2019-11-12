import React from 'react';
import { ConfigProvider, Checkbox } from 'antd';
import { inject, observer } from 'mobx-react';
import { getLayerIDKey, getLayerByName } from 'src/utils/vectorUtils';
import { COLUMNS_CONFIG } from 'src/config/CheckTableConfig';
import { shortcut } from 'src/utils/shortcuts';
import AdTable from 'src/components/AdTable';
import zh_CN from 'antd/es/locale/zh_CN';

const CheckboxGroup = Checkbox.Group;
const showTotal = total => `共${total}条`;

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
        currentIndex: -1,
        columns: [],
        currentPage: 1,
        pageSize: 10
    };

    render() {
        const { columns, currentPage } = this.state;
        const { QualityCheckStore } = this.props;
        const { reportList, reportListL } = QualityCheckStore;
        return (
            <div
                onKeyUp={e => this.handleKeyUp(e)}
                onKeyDown={e => this.handleKeyDown(e)}>
                <ConfigProvider locale={zh_CN}>
                    <AdTable
                        dataSource={reportList.slice()}
                        columns={columns}
                        onRow={record => {
                            return {
                                onClick: this.tableOnClick(record),
                                onDoubleClick: this.tableOnDoubleClick(record)
                            };
                        }}
                        rowClassName={record =>
                            `check-table-row check-table-row-${record.index}`
                        }
                        pagination={{
                            current: currentPage,
                            size: 'small',
                            total: reportListL,
                            showTotal: showTotal,
                            showSizeChanger: true,
                            onChange: this.handlePagination,
                            onShowSizeChange: this.handlePagination
                        }}
                        className="check-result-table"
                        onChange={this.handleTableChange}
                        rowKey={record => `checkResult_${record.index}`}
                        scroll={{ y: 170 }}
                        isHandleBody={true}
                    />
                </ConfigProvider>
            </div>
        );
    }

    componentDidMount() {
        this.checkReportTable = document.querySelector(
            '.check-result-table .ant-table-body'
        );
    }

    componentWillReceiveProps() {
        this.qualityCheckTabelColumns();
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
                    const { currentIndex, currentPage, pageSize } = this.state;
                    const minPage = currentPage * pageSize - pageSize + 1;
                    if (currentIndex < minPage) return;
                    const prevIndex = currentIndex - 1;
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
                    const { currentIndex, currentPage, pageSize } = this.state;
                    const { QualityCheckStore } = this.props;
                    const { reportListL } = QualityCheckStore;
                    const maxPageSize = Math.ceil(reportListL / pageSize);
                    const maxPage =
                        currentPage === maxPageSize
                            ? reportListL
                            : currentPage * pageSize;
                    const nextIndex = currentIndex + 1;
                    if (nextIndex >= maxPage) return;
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
                    let { currentPage } = this.state;
                    if (currentPage <= 1) return;
                    this.setState(
                        {
                            currentPage: --currentPage
                        },
                        this.qualityCheckTabelColumns
                    );
                },
                describe: '←'
            },
            {
                ctrl: false,
                alt: false,
                shift: false,
                keyCode: 39,
                callback: () => {
                    let { currentPage, pageSize } = this.state;
                    const { QualityCheckStore } = this.props;
                    const { reportListL } = QualityCheckStore;
                    const maxPageSize = Math.ceil(reportListL / pageSize);
                    if (currentPage >= maxPageSize) return;
                    this.setState({
                        currentPage: ++currentPage
                    });
                },
                describe: '→'
            }
        ]);
    };

    handlePagination = (current, size) => {
        this.setState({
            currentPage: current,
            pageSize: size
        });
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
        return {
            filterDropdown: filterFuntion => {
                const { indeterminate, checkAll } = this.state;
                const checkedList = this.state[dataIndex] || [];
                return (
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
                );
            },
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

    handleResize = index => (e, { size }) => {
        this.setState(({ columns }) => {
            const nextColumns = [...columns];
            nextColumns[index] = {
                ...nextColumns[index],
                width: size.width
            };
            return { columns: nextColumns };
        });
    };

    qualityCheckTabelColumns = () => {
        const _ = this;
        const { QualityCheckStore } = this.props;
        const { reportListL } = QualityCheckStore;
        if (reportListL <= 0) return;

        const currentColumns = COLUMNS_CONFIG.map((item, index) => {
            const { key, isFilter, dataIndex } = item;
            item = {
                ...item,
                align: 'center',
                onHeaderCell: column => ({
                    width: column.width,
                    onResize: this.handleResize(index)
                }),
                onCell: record => ({
                    className: record.visited && 'visited'
                }),
                render: (text, record, index) => {
                    switch (key) {
                        case 'index':
                            return text + 1;
                        case 'errorDesc':
                            return (
                                <div
                                    onClick={() =>
                                        this.openRowStyle(record.index)
                                    }>
                                    {text}
                                </div>
                            );
                        default:
                            return text;
                    }
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

        currentColumns.push({
            title: '是否无需修改',
            dataIndex: 'misrepId',
            key: 'misrepId',
            align: 'center',
            render(text, record) {
                const { index, checked } = record;
                return (
                    <Checkbox
                        checked={checked}
                        onChange={e => {
                            _.handleChange(e, record, index);
                        }}
                    />
                );
            }
        });

        const { columns } = this.state;
        this.setState({
            columns: columns.length > 0 ? [...columns] : [...currentColumns]
        });
    };

    //展开哪一行
    openRowStyle = index => {
        const currentRow = document.querySelector(`.check-table-row-${index}`);
        const activeRow = document.querySelector('.open');

        if (currentRow != activeRow) {
            activeRow && activeRow.classList.remove('open');
        }
        currentRow && currentRow.classList.toggle('open');
        this.setState({
            currentIndex: index
        });
    };

    //选中哪一行
    activeRowStyle = index => {
        const currentRow = document.querySelector(`.check-table-row-${index}`);
        const activeRow = document.querySelector('.active');
        activeRow && activeRow.classList.remove('active');
        currentRow && currentRow.classList.add('active');
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
