import React from 'react';
import { ConfigProvider, Button } from 'antd';
import 'src/assets/less/components/multi-functional-table.less';
import { shortcut } from 'src/utils/shortcuts';
import AdTable from 'src/components/AdTable';
import zh_CN from 'antd/es/locale/zh_CN';

const showTotal = total => `共${total}条`;
class MultiFunctionalTable extends React.Component {
    constructor(props) {
        super(props);

        this.table = null;
        this.tableRow = null;
        this.tableRowH = null;
        this.scrollTop = 0;

        const { dataSource } = props;
        this.state = {
            currentIndex: -1,
            columns: [],
            currentPage: 1,
            pageSize: 10,
            filteredInfo: null,
            dataSource,
            dataSourceL: dataSource.length,
            total: dataSource.length
        };
    }

    componentDidMount() {
        const { className } = this.props;
        this.updateTable();
        this.table = document.querySelector(`.${className} .ant-table-body`);
    }

    UNSAFE_componentWillReceiveProps(nextProps) {
        const newDataSource = nextProps.dataSource;
        const newDataSourceL = newDataSource.length;
        const { addJumpToFirstPage } = this.props;
        const { dataSourceL: oldDataSourceL } = this.state;
        const isAdd = newDataSourceL > oldDataSourceL;
        if (addJumpToFirstPage && isAdd) {
            //是新增就跳到第一页
            this.setState(
                {
                    currentPage: 1,
                    pageSize: 10,
                    dataSource: newDataSource,
                    dataSourceL: newDataSourceL
                },
                () => {
                    this.updateTable();
                    this.table.scrollTop = 0;
                }
            );
        } else {
            this.updateTable();
        }
    }

    handlePagination = (current, size) => {
        this.setState(
            {
                currentPage: current || 1,
                pageSize: size || 10
            },
            this.updateTable
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
        const { dataSource } = this.state;
        this.setState(
            {
                filteredInfo: null,
                total: dataSource.length
            },
            this.updateTable
        );
    };

    handleColumns = () => {
        const { columns: COLUMNS_CONFIG, filters } = this.props;
        let { columns, filteredInfo } = this.state;
        filteredInfo = filteredInfo || {};

        const newColumns = COLUMNS_CONFIG.map((item, index) => {
            const { isFilter, dataIndex } = item;
            item = {
                ...item,
                ...columns[index],
                align: 'center',
                onHeaderCell: column => ({
                    width: column.width,
                    onResize: this.handleResize(index)
                })
            };

            if (isFilter) {
                item = {
                    ...item,
                    filters: filters[dataIndex],
                    filteredValue: filteredInfo[dataIndex] || null,
                    onFilter: (value, record) => record[dataIndex] == value
                };
            }

            return item;
        });

        return newColumns;
    };

    updateTable = () => {
        const { toResizeDom, dataSource } = this.props;
        this.setState(
            {
                dataSource,
                dataSourceL: dataSource.length,
                columns: this.handleColumns()
            },
            toResizeDom
        );
    };

    //展开某行
    openRowStyle = index => {
        const { className } = this.props;
        const selectorStr1 = `.${className} .table-row-${index}`;
        const selectorStr2 = `.${className} .un-ellipsis`;
        const currentRow = document.querySelector(selectorStr1);
        const activeRow = document.querySelector(selectorStr2);
        if (currentRow != activeRow) {
            activeRow && activeRow.classList.remove('un-ellipsis');
        }
        currentRow && currentRow.classList.toggle('un-ellipsis');
        this.setState({
            currentIndex: index
        });
    };

    //选中某行
    activeRowStyle = index => {
        const { className } = this.props;
        const selectorStr1 = `.${className} .table-row-${index}`;
        const selectorStr2 = `.${className} .active`;
        const currentRow = document.querySelector(selectorStr1);
        const activeRow = document.querySelector(selectorStr2);
        activeRow && activeRow.classList.remove('active');
        currentRow && currentRow.classList.add('active');
        this.setState({
            currentIndex: index
        });
    };

    //单击
    tableOnClick = (record, index) => {
        return e => {
            const { className } = this.props;
            this.tableRow = document.querySelector(`.${className} .table-row`);
            this.tableRowH = this.tableRow.offsetHeight;
            //变色
            this.activeRowStyle(index);
            //展开
            this.openRowStyle(index);
            this.scrollTop = this.table.scrollTop;
            //执行传入的单击事件
            const { onClick } = this.props;
            onClick && onClick(record, index);
        };
    };

    //双击
    tableOnDoubleClick = (record, index) => {
        return e => {
            this.openRowStyle(index);
            //执行传入的双击事件
            const { onDoubleClick } = this.props;
            onDoubleClick && onDoubleClick(record, index);
        };
    };

    //处理表格变化
    handleTableChange = (pagination, filters, sorter, extra) => {
        this.setState(
            {
                filteredInfo: filters,
                total: extra.currentDataSource && extra.currentDataSource.length
            },
            this.updateTable
        );
    };

    //阻止keyDown默认事件
    handleKeyDown = event => {
        event.stopPropagation();
    };

    //移除“展开样式”
    removeOpenStyle = () => {
        const { className } = this.props;
        const selectorStr = `.${className} .un-ellipsis`;
        const currentOpenRow = document.querySelector(selectorStr);
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
                    const currentScrollTop = this.scrollTop - this.tableRowH;
                    this.table.scrollTop = currentScrollTop;
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
                    let { currentIndex, currentPage, pageSize, total, dataSource } = this.state;
                    total = total || dataSource.length;
                    const maxPageSize = Math.ceil(total / pageSize); //获取最大页数
                    const isLastPage = currentPage === maxPageSize; //判断当前是否是最后一页
                    const lastPageNum = total % pageSize; //获取最后一页的条目数
                    const maxPage = isLastPage ? lastPageNum : pageSize;
                    const nextIndex = currentIndex + 1;
                    if (nextIndex >= maxPage) return;
                    this.activeRowStyle(nextIndex);
                    this.setState({ currentIndex: nextIndex });
                    const currentScrollTop = this.scrollTop + this.tableRowH;
                    this.table.scrollTop = currentScrollTop;
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
                        this.updateTable
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
                    let { currentPage, pageSize, dataSource } = this.state;
                    const dataSourceL = dataSource.length;
                    const maxPageSize = Math.ceil(dataSourceL / pageSize);
                    if (currentPage >= maxPageSize) return;
                    this.setState({
                        currentPage: currentPage + 1
                    });
                },
                describe: '→'
            }
        ]);
    };

    renderFooter = () => {
        const dataSourceL = this.state.dataSource.length;
        return (
            dataSourceL > 0 && (
                <div className="table-footer">
                    <Button className="reset-button" onClick={this.clearFilters}>
                        筛选重置
                    </Button>
                </div>
            )
        );
    };

    render() {
        const { currentPage, pageSize, dataSource } = this.state;
        const { tableHeight, className, rowKey } = this.props;

        return (
            <div
                onKeyUp={e => this.handleKeyUp(e)}
                onKeyDown={e => this.handleKeyDown(e)}
                className={`multi-function-table-wrap ${className}`}
            >
                <ConfigProvider locale={zh_CN}>
                    <AdTable
                        dataSource={dataSource}
                        columns={this.handleColumns()}
                        onRow={(record, index) => {
                            return {
                                onClick: this.tableOnClick(record, index),
                                onDoubleClick: this.tableOnDoubleClick(record, index)
                            };
                        }}
                        rowClassName={(record, index) => `table-row table-row-${index}`}
                        pagination={{
                            current: currentPage,
                            size: 'small',
                            pageSize: pageSize,
                            showTotal: showTotal,
                            showSizeChanger: true,
                            onChange: this.handlePagination,
                            onShowSizeChange: this.handlePagination,
                            pageSizeOptions: ['10', '20', '30', '40', '50'],
                            style: { top: tableHeight ? tableHeight + 36 : 196 }
                        }}
                        className={`multi-function-table ${className}`}
                        onChange={this.handleTableChange}
                        rowKey={rowKey}
                        scroll={{ y: tableHeight || 160, x: '100%' }}
                        width={'100%'}
                        height={'100%'}
                        isHandleBody={true}
                        footer={this.renderFooter}
                    />
                </ConfigProvider>
            </div>
        );
    }
}

export default MultiFunctionalTable;
