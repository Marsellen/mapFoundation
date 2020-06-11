import React from 'react';
import ToolIcon from 'src/components/ToolIcon';
import { Select, ConfigProvider, Input, Button, Icon, message } from 'antd';
import { inject, observer } from 'mobx-react';
import AdTable from 'src/components/AdTable';
import {
    COLUMNS_CONFIG,
    SELECT_OPTIONS,
    OPTION_LAYER_MAP
} from 'config/PropertiesTableConfig';
import { DATA_LAYER_MAP } from 'src/config/DataLayerConfig';
import {
    getLayerItems,
    isAttrLayer,
    isRelLayer,
    findRelDataById
} from 'src/utils/vectorCtrl/propertyTableCtrl';
import { getLayerIDKey, getLayerByName } from 'src/utils/vectorUtils';
import 'less/components/view-attribute.less';
import 'less/components/tool-icon.less';
import zh_CN from 'antd/es/locale/zh_CN';
import SeniorModal from 'src/components/SeniorModal';
import AdEmitter from 'src/models/event';
import Resize from 'src/utils/resize';
import Filter from 'src/utils/table/filter';
import { ATTR_SPEC_CONFIG, REL_ATTR_LAYERS } from 'config/AttrsConfig';
import { REL_SPEC_CONFIG } from 'src/config/RelsConfig';
import AttrRightMenu from 'src/pages/Index/components/ToolList/AttrRightMenu';

@inject('AttrRightMenuStore')
@inject('DataLayerStore')
@inject('AttributeStore')
@inject('TaskStore')
@observer
class ViewAttribute extends React.Component {
    constructor(props) {
        super(props);
        this.resize = new Resize();
        this.state = {
            currentTask: null,
            visible: false,
            columns: [],
            dataSource: [],
            layerName: null,
            height: 500,
            loading: false,
            filteredInfo: null,
            sortedInfo: null,
            pageSize: 10,
            page: 1
        };
    }

    componentDidMount() {
        AdEmitter.on('fetchViewAttributeData', this.getData);
        this.resize.registerCallback(this.resizeCallback);
    }

    render() {
        const { TaskStore } = this.props;
        const { activeTaskId } = TaskStore;
        const { visible } = this.state;
        return (
            <span>
                <ToolIcon
                    id="view-attribute-btn"
                    icon="shuxingliebiao1"
                    title="属性列表"
                    placement="right"
                    className="ad-menu-icon"
                    disabled={!activeTaskId}
                    visible={visible}
                    action={this.toggle}
                />
                <SeniorModal
                    visible={visible}
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
                    wrapClassName="view-attribute-modal-wrap">
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
        return (
            <ConfigProvider locale={zh_CN}>
                <AdTable
                    className="layer-scroll"
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
                    scroll={{ x: 'max-content', y: height }}
                    title={() => {
                        return this.getTableTitle();
                    }}
                    loading={this.state.loading}
                    onChange={this.handleChange}
                />
                {!!dataSource.length && (
                    <Button
                        className="reset-button"
                        onClick={this.clearFilters}>
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
        this.setState({}, this.resize.getStyle);
    };

    getResizeStyle = (tx, ty) => {
        this.resize.getStyle(tx, ty);
    };

    dragCallback = (transformStr, tx, ty) => {
        this.getResizeStyle(tx, ty);
    };

    resizeCallback = result => {
        const { height: resizeEleHeight } = result;
        this.setState({
            height: resizeEleHeight - 200
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
                    dropdownClassName="layer-select-dropdown">
                    {SELECT_OPTIONS.map((option, key) => {
                        return (
                            <Select.OptGroup
                                key={`group-${key}`}
                                label={option.group}>
                                {option.items.map((item, index) => {
                                    return (
                                        <Select.Option
                                            key={`option-${key}-${index}`}
                                            value={item}
                                            className={option.class}>
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
        this.setState(
            { layerName, filteredInfo: null, sortedInfo: null },
            this.getData
        );
    };

    getData = () => {
        // 属性列表框隐藏时不更新属性列表数据
        if (!this.state.visible) return;

        let { layerName } = this.state;

        let columns = this.getColumns(layerName);
        this.setState({ loading: true });
        getLayerItems(layerName).then(dataSource => {
            this.setState({ columns, dataSource, loading: false }, () => {
                this.resize.addResizeEvent('view-attribute-modal-wrap');
                this.getResizeStyle();
            });
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
        filterDropdown: ({
            setSelectedKeys,
            selectedKeys,
            confirm,
            clearFilters
        }) => (
            <div style={{ padding: 8 }}>
                <Input
                    ref={node => {
                        this.searchInput = node;
                    }}
                    placeholder="搜索关键字..."
                    value={selectedKeys}
                    onChange={e =>
                        setSelectedKeys(e.target.value ? [e.target.value] : [])
                    }
                    onPressEnter={confirm}
                    style={{ width: 188, marginBottom: 8, display: 'block' }}
                />
                <Button
                    type="primary"
                    onClick={confirm}
                    icon="search"
                    size="small"
                    style={{ width: 90, marginRight: 8 }}>
                    搜索
                </Button>
                <Button
                    onClick={clearFilters}
                    size="small"
                    style={{ width: 90 }}>
                    重置
                </Button>
            </div>
        ),
        filterIcon: filtered => (
            <Icon
                type="search"
                style={{ color: filtered ? '#1890ff' : undefined }}
            />
        ),
        onFilter: (value, record) => {
            let text = col.filterBy
                ? Filter.get(col.filterBy)(record[col.dataIndex], record)
                : record[col.dataIndex];

            return text.toString().toLowerCase().includes(value.toLowerCase());
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
            if (
                /[0-9]/.test(a[col.dataIndex]) &&
                /[0-9]/.test(b[col.dataIndex])
            ) {
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

    //属性列表强制删除快捷键
    forceDeleteHotKey = event => {
        const { ctrlKey, keyCode } = event;
        if (ctrlKey && keyCode === 46) {
            event.preventDefault();
            event.stopPropagation();
            const { AttrRightMenuStore } = this.props;
            const { handleForceDelete } = AttrRightMenuStore;
            handleForceDelete();
        }
    };

    toggle = () => {
        if (this.state.visible) {
            this.setState({
                visible: false
            });
            //隐藏属性列表时，解绑快捷键监听
            window.removeEventListener('keydown', this.forceDeleteHotKey);
            return false;
        } else {
            //显示属性列表时，绑定快捷键监听
            window.addEventListener('keydown', this.forceDeleteHotKey);
        }

        const { DataLayerStore, TaskStore } = this.props;
        let { activeTaskId } = TaskStore;
        if (activeTaskId !== this.state.currentTask) {
            let editLayer = DataLayerStore.getEditLayer();
            let layerName = editLayer ? editLayer.layerName : null;
            this.setState(
                {
                    visible: true,
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
            this.setState({ visible: true }, this.getData);
        }
    };

    handleCancel = () => {
        this.setState({
            visible: false
        });
        //隐藏属性列表时，解绑快捷键监听
        window.removeEventListener('keydown', this.forceDeleteHotKey);
    };

    getLabel = item => {
        return DATA_LAYER_MAP[item] ? DATA_LAYER_MAP[item].label : item;
    };

    //展开哪一行
    openRowStyle = index => {
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
        const { DataLayerStore } = this.props;
        return async e => {
            //初始化右键菜单
            this.initRightMenu(e, record);
            let feature = await this.searchFeature(record);
            DataLayerStore.exitEdit();
            this.showAttributesModal(feature);
            //展开行
            this.openRowStyle(record.index);
        };
    };

    tableOnDoubleClick = record => {
        return async e => {
            let feature = await this.searchFeature(record, true);
            if (!feature) return;
            let extent = map.getExtent(feature.data.geometry);
            map.setView('U');
            map.setExtent(extent);
            //展开行
            this.openRowStyle(record.index);
        };
    };

    tableOnContextMenu = record => {
        return e => this.initRightMenu(e, record, true);
    };

    initRightMenu = (e, record, visible) => {
        const { layerName } = this.state;
        const { AttrRightMenuStore, DataLayerStore } = this.props;
        const {
            show,
            getMenuStyle,
            getData,
            getLayerName
        } = AttrRightMenuStore;
        const editLayer = DataLayerStore.getEditLayer();
        if (!editLayer) return;
        const currentLayerName = editLayer.layerName;
        const enableLayerNames = OPTION_LAYER_MAP[layerName];
        const isEnableLayer = enableLayerNames.includes(currentLayerName);
        if (!isEnableLayer) return;
        visible && show();
        getMenuStyle(e, visible);
        getData(record);
        getLayerName(layerName);
    };

    showAttributesModal = async obj => {
        if (!obj) return;
        const { AttributeStore, DataLayerStore } = this.props;
        let editLayer = DataLayerStore.getEditLayer();
        let readonly =
            (editLayer && editLayer.layerName !== obj.layerName) || !editLayer;
        DataLayerStore.clearHighLightFeatures();
        DataLayerStore.clearPick();
        await AttributeStore.setModel(obj);
        DataLayerStore.setFeatureColor(obj, 'rgb(255,134,237)');
        AttributeStore.show(readonly);
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
