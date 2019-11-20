import React from 'react';
import { ConfigProvider, Checkbox, Button } from 'antd';
import { inject, observer } from 'mobx-react';
import { getLayerIDKey, getLayerByName } from 'src/utils/vectorUtils';
import { COLUMNS_CONFIG } from 'src/config/CheckTableConfig';
import { shortcut } from 'src/utils/shortcuts';
import AdTable from 'src/components/AdTable';
import zh_CN from 'antd/es/locale/zh_CN';

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
    scrollTop = 0;

    state = {
        currentIndex: -1,
        columns: [],
        currentPage: 1,
        pageSize: 10,
        filteredInfo: null
    };

    render() {
        const { columns, currentPage, total } = this.state;
        const { QualityCheckStore } = this.props;
        const {
            reportList,
            reportListL,
            filterOption,
            tableHeight
        } = QualityCheckStore;

        return (
            <div
                onKeyUp={e => this.handleKeyUp(e)}
                onKeyDown={e => this.handleKeyDown(e)}>
                <ConfigProvider locale={zh_CN}>
                    <AdTable
                        dataSource={reportList}
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
                            total: total || reportListL,
                            showTotal: showTotal,
                            showSizeChanger: true,
                            onChange: this.handlePagination,
                            onShowSizeChange: this.handlePagination,
                            pageSizeOptions: ['10', '20', '30', '40', '50'],
                            className: 'check-table-pagination'
                        }}
                        className="check-result-table"
                        onChange={this.handleTableChange}
                        rowKey={record => `checkResult_${record.index}`}
                        scroll={{ y: tableHeight || 170, x: '100%' }}
                        isHandleBody={true}
                    />
                    {filterOption.isUpdate && (
                        <div className="check-table-footer">
                            <Button
                                className="reset-button"
                                onClick={this.clearFilters}>
                                筛选重置
                            </Button>
                        </div>
                    )}
                </ConfigProvider>
            </div>
        );
    }

    componentDidMount() {
        if (!this.props.QualityCheckStore) return;
        this.qualityCheckTabelColumns();
        this.checkReportTable = document.querySelector(
            '.check-result-table .ant-table-body'
        );
    }

    componentWillReceiveProps() {
        if (!this.props.QualityCheckStore) return;
        this.qualityCheckTabelColumns();
        this.props.QualityCheckStore.toResizeDom();
    }

    handlePagination = (current, size) => {
        this.setState(
            {
                currentPage: current,
                pageSize: size
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

    qualityCheckTabelColumns = () => {
        const _ = this;
        const { columns } = this.state;
        const { QualityCheckStore } = this.props;
        let { filterOption, toResizeDom } = QualityCheckStore;
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
                            return record.visited ? '√' : '';
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

        if (filterOption.isUpdate) {
            this.setState(
                {
                    columns: currentColumns
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
    tableOnClick = record => {
        return e => {
            this.checkReportTableRow = document.querySelector(
                '.check-table-row'
            );
            this.checkReportTableRowH = this.checkReportTableRow.offsetHeight;
            //变色
            this.activeRowStyle(record.index);
            //展开
            this.openRowStyle(record.index);
            this.scrollTop = this.checkReportTable.scrollTop;
        };
    };

    //双击
    tableOnDoubleClick = record => {
        return e => {
            const { QualityCheckStore, TaskStore, DataLayerStore } = this.props;
            const { visitedReport } = QualityCheckStore;
            const { activeTaskId } = TaskStore;
            let { layerName, featureId, index } = record;
            //已访问
            visitedReport(record, activeTaskId);
            //展开
            this.openRowStyle(index);
            //定位，判断是否为可定位图层
            const isValidLayer = DataLayerStore.layers.find(
                item => item.value === layerName
            );
            if (!isValidLayer) return;

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
            this.scrollTop = this.checkReportTable.scrollTop;
        };
    };

    //显示属性框
    showAttributesModal = obj => {
        const { AttributeStore, DataLayerStore } = this.props;
        let editLayer = DataLayerStore.getEditLayer();
        let readonly =
            (editLayer && editLayer.layerName !== obj.layerName) || !editLayer;
        AttributeStore.setModel(obj);
        DataLayerStore.clearHighLightFeatures();
        DataLayerStore.setFeatureColor(obj, 0xcc00ff);
        AttributeStore.show(readonly);
    };

    //处理勾选
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
        event.preventDefault();
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
                    const { currentIndex, currentPage, pageSize } = this.state;
                    const minPage = currentPage * pageSize - pageSize + 1;
                    if (currentIndex < minPage) return;
                    const prevIndex = currentIndex - 1;
                    this.activeRowStyle(prevIndex);
                    this.setState({ currentIndex: prevIndex });
                    const currentScrollTop =
                        this.scrollTop - this.checkReportTableRowH;
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
                    const currentScrollTop =
                        this.scrollTop + this.checkReportTableRowH;
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
