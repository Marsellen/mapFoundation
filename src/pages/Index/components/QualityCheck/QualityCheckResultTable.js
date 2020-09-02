import React from 'react';
import { ConfigProvider, Button } from 'antd';
import { inject, observer } from 'mobx-react';
import { locateCheckItem } from 'src/utils/vectorUtils';
import { COLUMNS_CONFIG } from 'src/config/CheckTableConfig';
import { shortcut } from 'src/utils/shortcuts';
import AdTable from 'src/components/AdTable';
import zh_CN from 'antd/es/locale/zh_CN';
import { getQualityMisrepStatus } from 'src/utils/permissionCtrl';

const showTotal = total => `共${total}条`;

@inject('TaskStore')
@inject('appStore')
@inject('DataLayerStore')
@inject('AttributeStore')
@inject('QualityCheckStore')
@inject('VectorsStore')
@observer
class QualityCheckResultTable extends React.Component {
    checkReportTable = null;
    checkReportTableRow = null;
    checkReportTableRowH = null;
    scrollTop = 0;

    state = {
        currentIndex: -1,
        columns: [],
        currentPage: 1,
        pageSize: 10,
        filteredInfo: null,
        loadings: {}
    };

    render() {
        const { columns, currentPage, total } = this.state;
        const { QualityCheckStore } = this.props;
        const { reportList, reportListL, tableHeight } = QualityCheckStore;
        const newTotal = total || total === 0 ? total : reportListL;
        const tableH = tableHeight != 0;
        const haveReportListL = reportListL > 0;
        return (
            <div
                style={{ height: '100%' }}
                onKeyUp={e => this.handleKeyUp(e)}
                onKeyDown={e => this.handleKeyDown(e)}
            >
                <ConfigProvider locale={zh_CN}>
                    <AdTable
                        dataSource={reportList}
                        columns={columns}
                        onRow={(record, index) => {
                            return {
                                onClick: this.tableOnClick(record, index),
                                onDoubleClick: this.tableOnDoubleClick(record, index)
                            };
                        }}
                        rowClassName={(record, index) => `check-table-row check-table-row-${index}`}
                        pagination={{
                            current: currentPage,
                            size: 'small',
                            total: newTotal,
                            showTotal: showTotal,
                            showSizeChanger: true,
                            onChange: this.handlePagination,
                            onShowSizeChange: this.handlePagination,
                            pageSizeOptions: ['10', '20', '30', '40', '50'],
                            className: tableH
                                ? 'check-table-pagination'
                                : 'check-table-pagination-init'
                        }}
                        className={
                            tableH
                                ? 'check-result-table'
                                : 'check-result-table check-result-table-init'
                        }
                        onChange={this.handleTableChange}
                        rowKey={record => `checkResult_${record.index}`}
                        scroll={{ y: tableHeight || 170, x: 'max-content' }}
                        height={haveReportListL ? (tableH ? '100%' : 'max-content') : 0}
                        isHandleBody={true}
                    />
                    {haveReportListL && (
                        <div className="check-table-footer">
                            <Button className="reset-button" onClick={this.clearFilters}>
                                筛选重置
                            </Button>
                        </div>
                    )}
                </ConfigProvider>
            </div>
        );
    }

    componentDidMount() {
        const { QualityCheckStore } = this.props;
        if (!QualityCheckStore) return;

        this.qualityCheckTabelColumns();
        QualityCheckStore.toResizeDom();
        this.checkReportTable = document.querySelector('.check-result-table .ant-table-body');
    }

    UNSAFE_componentWillReceiveProps() {
        const { QualityCheckStore } = this.props;
        if (!QualityCheckStore) return;

        this.qualityCheckTabelColumns();
        QualityCheckStore.toResizeDom();
    }

    handlePagination = (current, size) => {
        this.setState(
            {
                currentPage: current || 1,
                pageSize: size || 10
            },
            this.qualityCheckTabelColumns
        );
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

    clearFilters = () => {
        const { QualityCheckStore } = this.props;
        const { reportListL } = QualityCheckStore;
        this.setState(
            {
                filteredInfo: null,
                total: reportListL
            },
            this.qualityCheckTabelColumns
        );
    };

    handleTableColumns = filterOption => {
        const { columns } = this.state;
        let { filteredInfo } = this.state;
        filteredInfo = filteredInfo || {};

        const currentColumns = COLUMNS_CONFIG.map((item, index) => {
            const { key, isFilter, dataIndex } = item;
            item = {
                ...item,
                ...columns[index],
                align: 'center',
                onHeaderCell: column => ({
                    width: column.width,
                    onResize: this.handleResize(index)
                }),
                onCell: record => ({
                    className: record.visited ? 'visited' : ''
                }),
                render: (text, record, index) => {
                    switch (key) {
                        case 'index':
                            return text + 1;
                        case 'visitedText':
                            return (
                                <div style={{ userSelect: 'none' }}>
                                    {record.visited ? '√' : ''}
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
                    filters: filterOption[`${dataIndex}Arr`],
                    filteredValue: filteredInfo[dataIndex] || null,
                    onFilter: (value, record) => record[dataIndex] == value
                };
            }

            return item;
        });

        currentColumns.push({
            title: '无需修改',
            dataIndex: 'misrepId',
            key: 'misrepId',
            align: 'center',
            width: 100,
            render: (text, record) => {
                return this.renderActions(record);
            }
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

    qualityCheckTabelColumns = () => {
        const { QualityCheckStore } = this.props;
        const { filterOption, toResizeDom } = QualityCheckStore;
        const { isUpdate } = filterOption;

        if (isUpdate) {
            this.setState(
                {
                    columns: this.handleTableColumns(filterOption)
                },
                toResizeDom
            );
        } else {
            //首次加载
            this.setState(
                {
                    columns: this.handleTableColumns(filterOption),
                    currentIndex: -1,
                    currentPage: 1,
                    pageSize: 10,
                    filteredInfo: null,
                    total: null
                },
                toResizeDom
            );
        }
    };

    //展开哪一行
    openRowStyle = index => {
        const currentRow = document.querySelector(`.check-table-row-${index}`);
        const activeRow = document.querySelector('.un-ellipsis');

        if (currentRow != activeRow) {
            activeRow && activeRow.classList.remove('un-ellipsis');
        }
        currentRow && currentRow.classList.toggle('un-ellipsis');
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
    tableOnClick = (record, index) => {
        return e => {
            const { DataLayerStore } = this.props;
            if (DataLayerStore.editType != 'normal') return;
            this.checkReportTableRow = document.querySelector('.check-table-row');
            this.checkReportTableRowH = this.checkReportTableRow.offsetHeight;
            //变色
            this.activeRowStyle(index);
            //展开
            this.openRowStyle(index);
            this.scrollTop = this.checkReportTable.scrollTop;
            let feature = locateCheckItem(record);
            feature && this.showAttributesModal(feature);
        };
    };

    //双击
    tableOnDoubleClick = (record, index) => {
        return e => {
            const { QualityCheckStore, TaskStore, DataLayerStore } = this.props;
            const { visitedReport } = QualityCheckStore;
            const { activeTaskId } = TaskStore;
            if (DataLayerStore.editType != 'normal') return;
            DataLayerStore.exitEdit();
            //已访问
            visitedReport(record, activeTaskId);
            //过滤条件是未查看时，双击一条，实时减少总条数
            this.updateTablePageTotal();
            locateCheckItem(record, true);
            //展开
            this.openRowStyle(index);
        };
    };

    //过滤条件是未查看时，双击一条，实时减少总条数
    updateTablePageTotal = () => {
        const { filteredInfo, total } = this.state;
        if (!filteredInfo) return;
        const { visitedText } = filteredInfo;
        if (!visitedText) return;
        if (visitedText.length === 1 && visitedText[0] === '未查看') {
            this.setState({ total: total - 1 });
        }
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
        this.handleKeyDown(e);
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

    //处理表格变化
    handleTableChange = (pagination, filters, sorter, extra) => {
        this.setState(
            {
                filteredInfo: filters,
                total: extra.currentDataSource && extra.currentDataSource.length
            },
            this.qualityCheckTabelColumns
        );
    };

    //阻止keyDown默认事件
    handleKeyDown = event => {
        event.stopPropagation();
    };

    //移除“展开样式”
    removeOpenStyle = () => {
        const currentOpenRow = document.querySelector('.un-ellipsis');
        currentOpenRow && currentOpenRow.classList.remove('un-ellipsis');
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
                    const minPage = 1;
                    if (currentIndex < minPage) return;
                    const prevIndex = currentIndex - 1;
                    this.activeRowStyle(prevIndex);
                    this.setState({ currentIndex: prevIndex });
                    const currentScrollTop = this.scrollTop - this.checkReportTableRowH;
                    this.checkReportTable.scrollTop = currentScrollTop;
                    this.scrollTop = currentScrollTop;
                    this.removeOpenStyle();
                },
                describe: '↑'
            },
            {
                ctrl: false,
                alt: false,
                shift: false,
                keyCode: 40,
                callback: () => {
                    const { currentIndex, currentPage, pageSize, total } = this.state;
                    const maxPageSize = Math.ceil(total / pageSize); //获取最大页数
                    const isLastPage = currentPage === maxPageSize; //判断当前是否是最后一页
                    const lastPageNum = total % pageSize; //获取最后一页的条目数
                    const maxPage = isLastPage ? lastPageNum : pageSize;
                    const nextIndex = currentIndex + 1;
                    if (nextIndex >= maxPage) return;
                    this.activeRowStyle(nextIndex);
                    this.setState({ currentIndex: nextIndex });
                    const currentScrollTop = this.scrollTop + this.checkReportTableRowH;
                    this.checkReportTable.scrollTop = currentScrollTop;
                    this.scrollTop = currentScrollTop;
                    this.removeOpenStyle();
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
                            currentPage: currentPage - 1
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
                        currentPage: currentPage + 1
                    });
                },
                describe: '→'
            }
        ]);
    };
}

export default QualityCheckResultTable;
