import React from 'react';
import ToolIcon from 'src/components/ToolIcon';
import { Modal, Tabs, message } from 'antd';
import { inject, observer } from 'mobx-react';
import { getLayerIDKey, getLayerByName } from 'src/utils/vectorUtils';
import IDSearchForm from './IDSearchForm';
import PositionSearchForm from './PositionSearchForm';
import { isRegionContainsElement } from 'src/utils/vectorUtils';
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
            visible: false
        };
    }

    render() {
        const { TaskStore } = this.props;
        const { activeTaskId } = TaskStore;
        return (
            <span className={this.state.visible ? 'ad-icon-active' : ''}>
                <ToolIcon
                    id="search-btn"
                    icon="chaxun"
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
            <Tabs
                type="card"
                defaultActiveKey="IDSearch"
                onChange={this.tabChange}>
                <TabPane tab="ID查询" key="IDSearch">
                    <IDSearchForm
                        wrappedComponentRef={form => (this.IDSForm = form)}
                    />
                </TabPane>
                <TabPane tab="坐标查询" key="PositionSearch">
                    <PositionSearchForm
                        wrappedComponentRef={form => (this.PSForm = form)}
                    />
                </TabPane>
            </Tabs>
        );
    };

    tabChange = activeKey => {
        this.activeKey = activeKey;
    };

    handleChange = e => {
        const reg = /^\d+(\.\d*)?$|^\.\d+$/;

        if (!reg.test(e.target.value)) {
            message.warning('请输入正整数！', 3);
            return;
        }
        this.setState({
            value: Number(e.target.value)
        });
    };

    SearchClick = () => {
        if (this.activeKey == 'PositionSearch') {
            this.searchByPosition();
        } else {
            this.searchByID();
        }
    };

    searchByID = () => {
        let IDSForm = this.IDSForm.props.form;

        IDSForm.validateFields((err, values) => {
            if (!err) {
                let layerName = values.layerName;
                let IDKey = getLayerIDKey(layerName);
                let option = {
                    key: IDKey,
                    value: values.id
                };
                let layer = getLayerByName(layerName);
                if (layer.getFeatureByOption(option)) {
                    let feature = layer.getFeatureByOption(option).properties;
                    let extent = map.getExtent(feature.data.geometry);
                    map.setView('U');
                    map.setExtent(extent);
                    this.showAttributesModal(feature);
                } else {
                    message.warning('所在图层与用户编号不匹配！', 3);
                }
            }
        });
    };

    searchByPosition = () => {
        const { DataLayerStore } = this.props;
        let PSForm = this.PSForm.props.form;
        let PSearchInfo = PSForm.getFieldsValue();
        let elementGeojson = {
            geometry: {
                coordinates: [PSearchInfo.x, PSearchInfo.y, PSearchInfo.z],
                type: 'Point'
            },
            type: 'Feature'
        };
        const isInRegion = isRegionContainsElement(
            elementGeojson,
            DataLayerStore.regionGeojson
        );
        console.log(isInRegion);
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

    toggle = () => {
        if (this.state.visible) {
            this.setState({
                visible: false
            });
        } else {
            this.setState({
                visible: true
            });
        }
    };

    handleCancel = () => {
        this.setState({
            visible: false
        });
    };
}

export default SearchInfo;
