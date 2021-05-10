import React from 'react';
import ToolIcon from 'src/component/common/toolIcon';
import { Select, ConfigProvider, Input, Button, Icon, message } from 'antd';
import { inject, observer } from 'mobx-react';
import AdTable from 'src/component/common/adTable';
import { COLUMNS_CONFIG, SELECT_OPTIONS } from 'src/config/propertiesTableConfig';
import { DATA_LAYER_MAP } from 'src/config/dataLayerConfig';
import {
    getLayerItems,
    isAttrLayer,
    isRelLayer,
    findRelDataById
} from 'src/tool/vectorCtrl/propertyTableCtrl';
import { getLayerIDKey, getLayerByName, selectFeature } from 'src/tool/vectorUtils';
import 'less/view-attribute.less';
import 'less/tool-icon.less';
import zh_CN from 'antd/es/locale/zh_CN';
import SeniorModal from 'src/component/common/seniorModal';
import AdEmitter from 'src/tool/event';
import Filter from 'src/tool/filter';
import { ATTR_SPEC_CONFIG, REL_ATTR_LAYERS } from 'src/config/attrsConfig';
import { REL_SPEC_CONFIG } from 'src/config/relsConfig';
import AttrRightMenu from 'src/component/home/toolList/attrRightMenu';

@inject('AttrRightMenuStore')
@inject('DataLayerStore')
@inject('AttributeStore')
@inject('TaskStore')
@inject('QCMarkerStore')
@observer
class ViewAttribute extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            currentTask: null,
            columns: [],
            dataSource: [],
            layerName: null,
            height: 0,
            loading: false,
            filteredInfo: null,
            sortedInfo: null,
            pageSize: 10,
            page: 1
        };
    }

    componentDidMount() {
        AdEmitter.on('fetchViewAttributeData', this.getData);
    }

    render() {
        const {
            TaskStore: { activeTaskId },
            AttributeStore: { attrListVisible }
        } = this.props;
        return (
            <span>
                <ToolIcon
                    id="view-attribute-btn"
                    icon="shuxingliebiao1"
                    title="属性列表"
                    placement="right"
                    className="ad-menu-icon"
                    disabled={!activeTaskId}
                    visible={attrListVisible}
                    action={this.toggle}
                />
                <SeniorModal
                    visible={attrListVisible}
                    title={this.getTitle()}
                    footer={null}
                    onCancel={this.handleCancel}
                    mask={false}
                    zIndex={999}
                    width={'100%'}
                    height={'100%'}
                    maskClosable={false}
                    dragCallback={this.dragCallback}
                    className="view-attribute-modal"
                    wrapClassName="view-attribute-modal-wrap"
                    resizeCallback={this.resizeCallback}
                >
                    {this.renderContent()}
                </SeniorModal>
                <AttrRightMenu />
            </span>
        );
    }

    getTitle = () => {
        const { layerName } = this.state;
        return layerName ? DATA_LAYER_MAP[layerName].label : '属性列表';
    };

    renderContent = () => {
        const { columns, dataSource, height, pageSize, page } = this.state;
        const notEmpty = dataSource.length > 0;
        return (
            <ConfigProvider locale={zh_CN}>
                <AdTable
                    className={
                        dataSource.length > 0 ? 'layer-scroll' : 'layer-scroll layer-scroll-init'
                    }
                    rowKey="index"
                    columns={columns}
                    dataSource={dataSource}
                    footer={this.renderFooter}
                    onRow={record => {
                        return {
                            onClick: this.tableOnClick(record),
                            onDoubleClick: this.tableOnDoubleClick(record),
                            onContextMenu: this.tableOnContextMenu(record)
                        };
                    }}
                    bordered
                    size="small"
                    rowClassName={record => `table-row-${record.index}`}
                    pagination={{
                        pageSizeOptions: ['10', '30', '50'],
                        showQuickJumper: true,
                        showSizeChanger: true,
                        onChange: this.handlePagination,
                        onShowSizeChange: this.handlePagination,
                        showTotal: this.showTotal,
                        pageSize: pageSize,
                        current: page
                    }}
                    scroll={{ x: 'max-content', y: height || 'auto' }}
                    height={notEmpty && height ? height - 120 : 'auto'}
                    title={() => {
                        return this.getTableTitle();
                    }}
                    loading={this.state.loading}
                    onChange={this.handleChange}
                />
                {notEmpty && (
                    <Button className="reset-button" onClick={this.clearFilters}>
                        筛选重置
                    </Button>
                )}
            </ConfigProvider>
        );
    };

    showTotal = total => {
        return `共${total}条`;
    };

    handlePagination = () => {
        this.setState({});
    };

    resizeCallback = result => {
        this.setState({
            height: result.height
        });
    };

    getTableTitle = () => {
        const { layerName } = this.state;
        return (
            <div>
                <Select
                    value={layerName}
                    onChange={this.changeLayer}
                    className="layer-select"
                    dropdownClassName="layer-select-dropdown"
                >
                    {SELECT_OPTIONS.map((option, key) => {
                        return (
                            <Select.OptGroup key={`group-${key}`} label={option.group}>
                                {option.items.map((item, index) => {
                                    return (
                                        <Select.Option
                                            key={`option-${key}-${index}`}
                                            value={item}
                                            className={option.class}
                                        >
                                            {this.getLabel(item)}
                                        </Select.Option>
                                    );
                                })}
                            </Select.OptGroup>
                        );
                    })}
                </Select>
            </div>
        );
    };

    changeLayer = layerName => {
        const isMarkerLayer = layerName === 'AD_Marker';
        layerName = isMarkerLayer ? this.state.layerName : layerName;
        this.setState({ layerName, filteredInfo: null, sortedInfo: null }, this.getData);
    };

    getData = () => {
        // 属性列表框隐藏时不更新属性列表数据
        if (!this.props.AttributeStore.attrListVisible) return;

        let { layerName } = this.state;

        let columns = this.getColumns(layerName);
        this.setState({ loading: true });
        getLayerItems(layerName).then(dataSource => {
            this.setState({ columns, dataSource, loading: false });
        });
    };

    getColumns = layerName => {
        let columns = layerName ? COLUMNS_CONFIG[layerName] : [];
        return columns.map((col, index) => {
            return {
                ...col,
                width: this.clacWidth(col.title),
                onCell: record => ({
                    record,
                    dataIndex: col.dataIndex,
                    filterBy: col.filterBy
                }),
                onHeaderCell: column => ({
                    width: column.width,
                    onResize: this.handleResize(index)
                }),
                sorter: this.sorter(col),
                ...this.getColumnSearchProps(col)
            };
        });
    };

    clacWidth = title => {
        const BODY_SIZE = 58;
        const FONT_SIZE = 12;
        return BODY_SIZE + FONT_SIZE * title.length;
    };

    getColumnSearchProps = col => ({
        key: col.dataIndex,
        filteredValue: this.getFilteredValue(col.dataIndex),
        sortOrder: this.getSortOrder(col.dataIndex),
        filterDropdown: ({ setSelectedKeys, selectedKeys, confirm, clearFilters }) => (
            <div style={{ padding: 8 }}>
                <Input
                    ref={node => {
                        this.searchInput = node;
                    }}
                    placeholder="搜索关键字..."
                    value={selectedKeys}
                    onChange={e => setSelectedKeys(e.target.value ? [e.target.value] : [])}
                    onPressEnter={confirm}
                    style={{ width: 188, marginBottom: 8, display: 'block' }}
                />
                <Button
                    type="primary"
                    onClick={confirm}
                    icon="search"
                    size="small"
                    style={{ width: 90, marginRight: 8 }}
                >
                    搜索
                </Button>
                <Button onClick={clearFilters} size="small" style={{ width: 90 }}>
                    重置
                </Button>
            </div>
        ),
        filterIcon: filtered => (
            <Icon type="search" style={{ color: filtered ? '#1890ff' : undefined }} />
        ),
        onFilter: (value, record) => {
            try {
                let text = col.filterBy
                    ? Filter.get(col.filterBy)(record[col.dataIndex], record)
                    : record[col.dataIndex];

                return text.toString().toLowerCase().includes(value.toLowerCase());
            } catch (e) {
                //console.log(存在异常数据)
            }
        },
        onFilterDropdownVisibleChange: visible => {
            if (visible) {
                setTimeout(() => this.searchInput.select());
            }
        }
    });

    getFilteredValue = dataIndex => {
        let { filteredInfo } = this.state;
        filteredInfo = filteredInfo || {};
        return filteredInfo[dataIndex] || null;
    };

    getSortOrder = dataIndex => {
        let { sortedInfo } = this.state;
        sortedInfo = sortedInfo || {};
        return sortedInfo.columnKey === dataIndex && sortedInfo.order;
    };

    handleChange = (pagination, filters, sorter, extra) => {
        let { pageSize, current } = pagination;
        this.setState(
            {
                filteredInfo: filters,
                sortedInfo: sorter,
                pageSize,
                page: current
            },
            () => {
                let { layerName } = this.state;
                let columns = this.getColumns(layerName);
                this.setState({ columns });
            }
        );
    };

    clearFilters = () => {
        this.setState(
            {
                filteredInfo: null
            },
            () => {
                let { layerName } = this.state;
                let columns = this.getColumns(layerName);
                this.setState({ columns });
            }
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

    sorter = col => {
        return (a, b) => {
            if (/[0-9]/.test(a[col.dataIndex]) && /[0-9]/.test(b[col.dataIndex])) {
                return parseInt(a[col.dataIndex]) - parseInt(b[col.dataIndex]);
            } else {
                if (!a[col.dataIndex] && a[col.dataIndex] !== 0) {
                    return 1;
                }
                if (!b[col.dataIndex] && b[col.dataIndex] !== 0) {
                    return -1;
                }
                return a[col.dataIndex] > b[col.dataIndex] ? 1 : -1;
            }
        };
    };

    toggle = () => {
        const {
            TaskStore: { activeTaskId },
            DataLayerStore: { getAdEditLayer },
            AttributeStore: { attrListVisible, attrListShow, attrListHide }
        } = this.props;

        if (attrListVisible) {
            attrListHide('button');
        } else {
            attrListShow('button');
            if (activeTaskId !== this.state.currentTask) {
                let editLayer = getAdEditLayer();
                let layerName = editLayer ? editLayer.layerName : null;
                let isMarkerLayer = layerName === 'AD_Marker';
                layerName = isMarkerLayer ? this.state.layerName : layerName;
                this.setState(
                    {
                        currentTask: activeTaskId,
                        layerName,
                        filteredInfo: null,
                        sorter: null,
                        pageSize: 10,
                        page: 1
                    },
                    this.getData
                );
            } else {
                this.getData();
            }
        }
    };

    handleCancel = e => {
        const channel = e.keyCode ? 'esc' : e.detail ? 'close' : null;
        this.props.AttributeStore.attrListHide(channel);
    };

    getLabel = item => {
        return DATA_LAYER_MAP[item] ? DATA_LAYER_MAP[item].label : item;
    };

    //展开哪一行
    openRow = index => {
        const currentRow = document.querySelector(`.table-row-${index}`);
        const activeRow = document.querySelector('.un-ellipsis');

        if (currentRow != activeRow) {
            activeRow && activeRow.classList.remove('un-ellipsis');
        }
        currentRow && currentRow.classList.toggle('un-ellipsis');
        this.setState({
            currentIndex: index
        });
    };

    tableOnClick = record => {
        const { DataLayerStore, QCMarkerStore } = this.props;
        return async e => {
            if (DataLayerStore.editType != 'normal') return;
            if (QCMarkerStore.isCreateMarker()) return;
            this.initRightMenu(e, record);
            let feature = await this.searchFeature(record);
            selectFeature(feature);
            this.openRow(record.index);
        };
    };

    tableOnDoubleClick = record => {
        const { DataLayerStore } = this.props;
        return async e => {
            if (DataLayerStore.editType != 'normal') return;
            let feature = await this.searchFeature(record, true);
            if (!feature) return;
            let extent = map.getExtent(feature.data.geometry);
            map.setView('U');
            map.setExtent(extent);
            this.openRow(record.index);
        };
    };

    tableOnContextMenu = record => {
        return e => this.initRightMenu(e, record, true);
    };

    initRightMenu = async (e, record, visible) => {
        try {
            const { DataLayerStore, AttrRightMenuStore } = this.props;
            if (DataLayerStore.editType != 'normal') return;
            const { layerName } = this.state;
            AttrRightMenuStore.getLayerName(layerName);
            AttrRightMenuStore.getMenuStyle(e, visible);
            AttrRightMenuStore.getData(record);
            AttrRightMenuStore.show();
            const feature = await this.searchFeature(record);
            selectFeature(feature);
        } catch (e) {
            console.log('属性列表右键菜单异常' + e.message || e || '');
        }
    };

    searchFeature = async (record, noMessage) => {
        let { layerName } = this.state;
        let option, layer, feature;
        if (isRelLayer(layerName)) {
            let config = REL_SPEC_CONFIG.find(c => c.source === layerName);
            feature = this.getRelPositionFeature(record, config);

            if (!feature) {
                !noMessage && message.error('关系表关联数据不存在，请检查');
                return;
            }
        } else if (REL_ATTR_LAYERS.includes(layerName)) {
            let config = ATTR_SPEC_CONFIG.find(c => c.source === layerName);
            let rel_id = record[config.key];
            let rel = await findRelDataById(rel_id);
            let IDKey = getLayerIDKey(rel.objSpec);
            option = {
                key: IDKey,
                value: rel.objId
            };
            layer = getLayerByName(rel.objSpec);
            feature = layer.getFeatureByOption(option);

            if (!feature) {
                !noMessage && message.error('属性表关联数据不存在，请检查');
                return;
            }
        } else if (isAttrLayer(layerName)) {
            let config = ATTR_SPEC_CONFIG.find(c => c.source === layerName);
            option = {
                key: config.key,
                value: record[config.key]
            };
            layer = getLayerByName(config.relSpec);
            feature = layer.getFeatureByOption(option);

            if (!feature) {
                !noMessage && message.error('属性表关联数据不存在，请检查');
                return;
            }
        } else {
            let IDKey = getLayerIDKey(layerName);
            let id = record[IDKey];
            option = { key: IDKey, value: id };
            layer = getLayerByName(layerName);
            feature = layer.getFeatureByOption(option);
        }
        return feature.properties;
    };

    getRelPositionFeature = (record, config) => {
        let option, layer;
        if (config.source == 'AD_Road_Con' || config.source == 'AD_Lane_Con') {
            option = {
                key: getLayerIDKey(config.objSpec),
                value: record[config.objKeyName]
            };
            layer = getLayerByName(config.objSpec);
        } else {
            option = {
                key: getLayerIDKey(config.relObjSpec),
                value: record[config.relObjKeyName]
            };
            layer = getLayerByName(config.relObjSpec);
        }
        return layer.getFeatureByOption(option);
    };
}

export default ViewAttribute;
