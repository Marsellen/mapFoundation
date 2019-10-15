import React from 'react';
import ToolIcon from 'src/components/ToolIcon';
import { Select, Input, Modal, Tabs } from 'antd';
import { inject, observer } from 'mobx-react';
import { getLayerItems } from 'src/utils/vectorCtrl/propertyTableCtrl';
import { DATA_LAYER_MAP } from 'src/config/DataLayerConfig';
import { COLUMNS_CONFIG } from 'src/config/PropertiesTableConfig';
import { getLayerIDKey, getLayerByName } from 'src/utils/vectorUtils';
import 'less/components/search-info.less';

const TabPane = Tabs.TabPane;

@inject('DataLayerStore')
@inject('AttributeStore')
@inject('TaskStore')
@observer
class SearchInfo extends React.Component {
    constructor() {
        super();
        this.state = {
            visible: false,
            columns: [],
            dataSource: [],
            value: null
        };
    }

    render() {
        const { TaskStore } = this.props;
        const { activeTaskId } = TaskStore;
        return (
            <span className={this.state.visible ? 'ad-icon-active' : ''}>
                <ToolIcon
                    icon="shuxingliebiao"
                    title="查询"
                    disabled={!activeTaskId}
                    action={this.toggle}
                />

                <Modal
                    okText={'查询'}
                    cancelText={'取消'}
                    className="searchinfo"
                    mask={false}
                    width={'30vh'}
                    title="查询"
                    visible={this.state.visible}
                    onCancel={this.handleCancel}
                    onOk={record => {
                        this.SearchClick(record);
                    }}>
                    {this.renderContent()}
                </Modal>
            </span>
        );
    }

    renderContent = () => {
        const { DataLayerStore } = this.props;
        let options = DataLayerStore.layers || [];
        let editLayer = DataLayerStore.getEditLayer();
        let defaultValue = editLayer ? editLayer.layerName : null;
        return (
            <Tabs type="card" defaultActiveKey="IDsearch">
                <TabPane tab="ID查询" key="IDsearch">
                    <div style={{ height: 40 }}>
                        要素所在图层：
                        <Select
                            style={{ width: '55%' }}
                            defaultValue={defaultValue}
                            onChange={this.getData}
                            className="layer-select">
                            {options.map((option, index) => {
                                return (
                                    <Select.Option
                                        key={index}
                                        value={option.value}>
                                        {this.getLabel(option)}
                                    </Select.Option>
                                );
                            })}
                        </Select>
                    </div>
                    <div style={{ display: 'flex', height: 40 }}>
                        <span>要素用户编号：</span>
                        <Input
                            onChange={this.handleChange}
                            value={this.state.value}
                            style={{
                                width: '55%',
                                marginTop: '4px'
                            }}
                        />
                    </div>
                </TabPane>
                <TabPane tab="坐标查询" key="coordinate ">
                    <div style={{ display: 'flex', height: 40 }}>
                        <span>x坐标：</span>
                        <Input
                            style={{
                                width: '70%',
                                marginTop: '4px'
                            }}
                        />{' '}
                        <span>&nbsp;m</span>
                    </div>
                    <div style={{ display: 'flex', height: 40 }}>
                        <span>y坐标：</span>
                        <Input
                            style={{
                                width: '70%',
                                marginTop: '4px'
                            }}
                        />{' '}
                        <span>&nbsp;m</span>
                    </div>
                    <div style={{ display: 'flex', height: 40 }}>
                        <span>z坐标：</span>
                        <Input
                            style={{
                                width: '70%',
                                marginTop: '4px'
                            }}
                        />{' '}
                        <span>&nbsp;m</span>
                    </div>
                </TabPane>
            </Tabs>
        );
    };

    handleChange = e => {
        this.setState({
            value: e.target.value
        });
    };

    SearchClick = record => {
        return e => {
            let { layerName } = this.state;
            let IDKey = getLayerIDKey(layerName);
            let option = {
                key: IDKey,
                value: this.state.value
            };

            let layer = getLayerByName(layerName);
            let feature = layer.getFeatureByOption(option).properties;
            let extent = map.getExtent(feature.data.geometry);
            console.log(extent);
            map.setView('U');
            map.setExtent(extent);
        };
    };

    AdSearch = val => {
        const { layerName } = this.state;
        let dataSource = getLayerItems(layerName);
        let IDKey = getLayerIDKey(layerName);
        console.log(val);

        if (val) {
            dataSource = (dataSource || []).filter(
                record => record[IDKey] == val
            );
        }
        this.setState({ dataSource });
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

    getLabel = item => {
        if (!item.value) {
            return item.label;
        }
        return DATA_LAYER_MAP[item.value]
            ? DATA_LAYER_MAP[item.value].label
            : item.value;
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
}

export default SearchInfo;
