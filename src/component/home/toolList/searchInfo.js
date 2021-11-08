import React from 'react';
import ToolIcon from 'src/component/common/toolIcon';
import { Tabs, message } from 'antd';
import { inject, observer } from 'mobx-react';
import { getLayerIDKey, selectFeature } from 'src/util/vectorUtils';
import IDSearchForm from './idSearchForm';
import PositionSearchForm from './positionSearchForm';
import { isRegionContainsElement } from 'src/util/vectorUtils';
import SeniorModal from 'src/component/common/seniorModal';
import 'less/search-info.less';

const TabPane = Tabs.TabPane;

@inject('DataLayerStore')
@inject('AttributeStore')
@inject('TaskStore')
@inject('VectorsStore')
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
            <span>
                <ToolIcon
                    id="search-btn"
                    icon="chaxun1"
                    title="查询"
                    visible={this.state.visible}
                    disabled={!activeTaskId}
                    action={this.toggle}
                />

                <SeniorModal
                    okText={'查询'}
                    cancelText={'取消'}
                    wrapClassName="search-info-modal"
                    mask={false}
                    width={320}
                    title="查询"
                    visible={this.state.visible}
                    onCancel={this.handleCancel}
                    maskClosable={false}
                    destroyOnClose={true}
                    onOk={() => {
                        this.SearchClick();
                    }}
                >
                    {this.renderContent()}
                </SeniorModal>
            </span>
        );
    }

    renderContent = () => {
        return (
            <Tabs type="card" defaultActiveKey="IDSearch" onChange={this.tabChange}>
                <TabPane tab="ID查询" key="IDSearch">
                    <IDSearchForm wrappedComponentRef={form => (this.IDSForm = form)} />
                </TabPane>
                <TabPane tab="坐标查询" key="PositionSearch">
                    <PositionSearchForm wrappedComponentRef={form => (this.PSForm = form)} />
                </TabPane>
            </Tabs>
        );
    };

    tabChange = activeKey => {
        this.activeKey = activeKey;
    };

    SearchClick = () => {
        if (this.activeKey == 'PositionSearch') {
            this.searchByPosition();
        } else {
            this.searchByID();
        }
    };

    searchByID = () => {
        const { VectorsStore } = this.props;
        let IDSForm = this.IDSForm.props.form;
        const reg = /^\d+(\.\d*)?$|^\.\d+$/;

        IDSForm.validateFields((err, values) => {
            if (!err) {
                let layerName = values.layerName;
                let IDKey = getLayerIDKey(layerName);
                let option = {
                    key: IDKey,
                    value: values.id
                };
                if (!reg.test(values.id)) {
                    message.warning('请输入正整数！', 3);
                    return;
                }
                let layers = VectorsStore.vectors.vector;
                let layer = layers.find(layer => layer.value == layerName);
                if (!layer.checked) {
                    message.warning('请打开被查询的数据图层！', 3);
                    return;
                }
                let result = layer.layer.getFeatureByOption(option);
                if (result) {
                    let feature = result.properties;
                    let extent = map.getExtent(feature.data.geometry);
                    map.setView('U');
                    map.setExtent(extent);
                    selectFeature(feature);
                } else {
                    message.warning('所在图层与用户编号不匹配！', 3);
                }
            }
        });
    };

    searchByPosition = () => {
        const { DataLayerStore } = this.props;
        let PSForm = this.PSForm.props.form;
        PSForm.validateFields((err, values) => {
            if (!err) {
                Object.keys(values).forEach(item => {
                    values[item] = Number(values[item]);
                });
                let elementGeojson = {
                    geometry: {
                        coordinates: [values.x, values.y, values.z],
                        type: 'Point'
                    },
                    type: 'Feature'
                };
                const isInRegion = isRegionContainsElement(
                    elementGeojson,
                    DataLayerStore.regionGeojson
                );
                if (isInRegion) {
                    window.map.lookDownOn(values.x, values.y, values.z);
                } else {
                    message.warning('坐标不在任务范围内！', 3);
                }
            }
        });
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
        this.activeKey = null;
    };
}

export default SearchInfo;
