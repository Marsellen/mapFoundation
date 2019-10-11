import React from 'react';
import ToolIcon from 'src/components/ToolIcon';
import { Select, Input, ConfigProvider } from 'antd';
import { inject, observer } from 'mobx-react';
import AdTable from 'src/components/AdTable';
import { COLUMNS_CONFIG } from 'src/config/PropertiesTableConfig';
import { DATA_LAYER_MAP } from 'src/config/DataLayerConfig';
import { getLayerItems } from 'src/utils/vectorCtrl/propertyTableCtrl';
import { getLayerIDKey, getLayerByName } from 'src/utils/vectorUtils';
import 'less/components/view-attribute.less';
import 'less/components/tool-icon.less';
import zh_CN from 'antd/es/locale/zh_CN';
import SeniorModal from 'src/components/SeniorModal';

const { Search } = Input;

@inject('DataLayerStore')
@inject('AttributeStore')
@observer
class ViewAttribute extends React.Component {
    constructor() {
        super();
        this.state = {
            visible: false,
            columns: [],
            dataSource: []
        };
    }

    render() {
        return (
            <span className={this.state.visible ? 'ad-icon-active' : ''}>
                <ToolIcon
                    icon="shuxingliebiao"
                    title="属性列表"
                    action={this.toggle}
                />
                <SeniorModal
                    visible={this.state.visible}
                    title={this.getTitle()}
                    footer={null}
                    onCancel={this.handleCancel}
                    mask={false}
                    zIndex={999}
                    maskClosable={false}
                    destroyOnClose={true}
                    afterClose={this.destroyAction}
                    width={780}
                    bodyStyle={{ padding: 8 }}
                    wrapClassName="view-attribute-modal">
                    {this.renderContent()}
                </SeniorModal>
            </span>
        );
    }

    getTitle = () => {
        const { layerName } = this.state;
        return layerName ? DATA_LAYER_MAP[layerName].label : '属性列表';
    };

    renderContent = () => {
        const { columns, dataSource } = this.state;

        let height = window.innerHeight * 0.8 - 185;
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
                            onDoubleClick: this.tableOnDoubleClick(record)
                        };
                    }}
                    bordered
                    size="small"
                    pagination={{
                        total: dataSource.length,
                        pageSize: 10,
                        pageSizeOptions: ['10', '30', '50'],
                        showQuickJumper: true,
                        showSizeChanger: true,
                        showTotal: () => `共${dataSource.length}条`
                    }}
                    scroll={{ x: 'max-content', y: height }}
                    title={() => (
                        <Search
                            placeholder="请输入用户编号..."
                            onSearch={this.AdSearch}
                            style={{ width: '100%' }}
                        />
                    )}
                />
            </ConfigProvider>
        );
    };

    AdSearch = val => {
        const { layerName } = this.state;
        let dataSource = getLayerItems(layerName);
        let IDKey = getLayerIDKey(layerName);
        if (val) {
            dataSource = (dataSource || []).filter(
                record => record[IDKey] == val
            );
        }
        this.setState({ dataSource });
    };

    renderFooter = () => {
        const { DataLayerStore } = this.props;
        let options = DataLayerStore.layers || [];
        let editLayer = DataLayerStore.getEditLayer();
        let defaultValue = editLayer ? editLayer.layerName : null;
        return (
            <div>
                <Select
                    defaultValue={defaultValue}
                    onChange={this.getData}
                    className="layer-select">
                    {options.map((option, index) => {
                        return (
                            <Select.Option key={index} value={option.value}>
                                {this.getLabel(option)}
                            </Select.Option>
                        );
                    })}
                </Select>
            </div>
        );
    };

    getData = layerName => {
        if (!layerName) {
            const { DataLayerStore } = this.props;
            let editLayer = DataLayerStore.getEditLayer();
            layerName = editLayer ? editLayer.layerName : null;
        }
        let _columns = layerName ? COLUMNS_CONFIG[layerName] : [];
        let columns = _columns.map(col => {
            return {
                ...col,
                onCell: record => ({
                    record,
                    dataIndex: col.dataIndex,
                    title: col.title,
                    filterBy: col.filterBy
                }),
                sorter: this.sorter(col)
            };
        });
        let dataSource = getLayerItems(layerName);
        this.setState({ layerName, columns, dataSource });
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

    toggle = () => {
        if (this.state.visible) {
            this.setState({
                visible: false
            });
        } else {
            this.setState({
                visible: true
            });
            this.getData();
        }
    };

    handleCancel = () => {
        this.setState({
            visible: false
        });
    };

    getLabel = item => {
        if (!item.value) {
            return item.label;
        }
        return DATA_LAYER_MAP[item.value]
            ? DATA_LAYER_MAP[item.value].label
            : item.value;
    };

    tableOnClick = record => {
        return e => {
            let { layerName } = this.state;
            let IDKey = getLayerIDKey(layerName);
            let id = record[IDKey];
            let option = {
                key: IDKey,
                value: id
            };
            let layer = getLayerByName(layerName);
            let feature = layer.getFeatureByOption(option).properties;
            this.showAttributesModal(feature);
        };
    };

    tableOnDoubleClick = record => {
        return e => {
            let { layerName } = this.state;
            let IDKey = getLayerIDKey(layerName);
            let id = record[IDKey];
            let option = {
                key: IDKey,
                value: id
            };
            let layer = getLayerByName(layerName);
            let feature = layer.getFeatureByOption(option).properties;
            let extent = map.getExtent(feature.data.geometry);
            console.log(extent);
            map.setView('U');
            map.setExtent(extent);
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

    destroyAction = () => {
        const { AttributeStore } = this.props;
        AttributeStore.setAfterSave();
    };
}

export default ViewAttribute;
