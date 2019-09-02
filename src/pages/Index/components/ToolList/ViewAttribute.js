import React, { Fragment } from 'react';
import ToolIcon from 'src/components/ToolIcon';
import { Select, Input, ConfigProvider } from 'antd';
import { inject, observer } from 'mobx-react';
import AdTable from 'src/components/AdTable';
import { COLUMNS_CONFIG } from 'src/config/PropertiesTableConfig';
import { DATA_LAYER_MAP } from 'src/config/DataLayerConfig';
import { getLayerItems } from 'src/utils/vectorCtrl/propertyTableCtrl';
import { getLayerIDKey, getLayerByName } from 'src/utils/vectorUtils';
import 'less/components/view-attribute.less';
import zh_CN from 'antd/es/locale-provider/zh_CN';
import 'moment/locale/zh-cn';
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
            <Fragment>
                <ToolIcon
                    icon="shuxingliebiao"
                    title="属性列表"
                    action={this.toggle}
                />
                <SeniorModal
                    visible={this.state.visible}
                    title="属性列表"
                    footer={null}
                    onCancel={this.handleCancel}
                    mask={false}
                    zIndex={999}
                    maskClosable={false}
                    destroyOnClose={true}
                    width={780}
                    bodyStyle={{ padding: 8 }}
                    className="layer-scroll">
                    {this.renderContent()}
                </SeniorModal>
            </Fragment>
        );
    }

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
                        showTotal: () => `共${dataSource.length}页`
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
                sorter: (a, b) => {
                    if (a[col.dataIndex] > b[col.dataIndex]) {
                        return 1;
                    }
                    return -1;
                }
            };
        });
        let dataSource = getLayerItems(layerName);
        this.setState({ layerName, columns, dataSource });
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
            this.showAttributesModal({
                layerName,
                data: {
                    properties: record
                }
            });
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
            let extent = map.getExtent(feature.data.geometry, {
                tolerance: 40
            });
            console.log(extent);
            map.setExtent(extent);
        };
    };

    showAttributesModal = obj => {
        const { AttributeStore, DataLayerStore } = this.props;
        let editLayer = DataLayerStore.getEditLayer();
        let readonly =
            !editLayer || (editLayer && editLayer.layerName !== obj.layerName);
        AttributeStore.setModel(obj);
        DataLayerStore.setFeatureColor(obj, 0xcc00ff);
        AttributeStore.show(readonly);
    };
}

export default ViewAttribute;
