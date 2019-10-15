import React from 'react';
import ToolIcon from 'src/components/ToolIcon';
import { Input, Modal, Tabs, message } from 'antd';
import { inject, observer } from 'mobx-react';
import { getLayerIDKey, getLayerByName } from 'src/utils/vectorUtils';
import SearchForm from './SearchForm';
import 'less/components/search-info.less';

const TabPane = Tabs.TabPane;

@inject('DataLayerStore')
@inject('AttributeStore')
@observer
class SearchInfo extends React.Component {
    constructor() {
        super();
        this.state = {
            visible: false
        };
    }

    render() {
        return (
            <span className={this.state.visible ? 'ad-icon-active' : ''}>
                <ToolIcon
                    id="search-btn"
                    icon="chaxun"
                    title="查询"
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
                    onOk={() => {
                        this.SearchClick();
                    }}>
                    {this.renderContent()}
                </Modal>
            </span>
        );
    }

    renderContent = () => {
        return (
            <Tabs type="card" defaultActiveKey="IDsearch">
                <TabPane tab="ID查询" key="IDsearch">
                    <SearchForm
                        ref="getFormVlaue"
                        wrappedComponentRef={inst => {
                            this.cityForm = inst;
                        }}
                    />
                </TabPane>
                <TabPane tab="坐标查询" key="coordinate">
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

    SearchClick = () => {
        let demo = this.refs.getFormVlaue;
        let cityInfo = this.cityForm.props.form.getFieldsValue();
        let layerName = cityInfo.currentLayer;
        let IDKey = getLayerIDKey(layerName);
        let option = {};
        demo.validateFields((err, values) => {
            if (!err) {
                option = {
                    key: IDKey,
                    value: Number(values.No)
                };
            }
        });

        let layer = getLayerByName(layerName);
        if (layer.getFeatureByOption(option)) {
            let feature = layer.getFeatureByOption(option).properties;
            let extent = map.getExtent(feature.data.geometry);
            console.log(extent);
            map.setView('U');
            map.setExtent(extent);
            this.showAttributesModal(feature);
        } else {
            message.warning('所在图层与用户编号不匹配！', 3);
        }
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
        // AttributeStore.setAfterSave(this.getData);
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
            // this.getData();
        }
    };

    handleCancel = () => {
        this.setState({
            visible: false
        });
    };
}

export default SearchInfo;
