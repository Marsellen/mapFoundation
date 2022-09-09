import React from 'react';
import { Checkbox, List, Switch, Empty } from 'antd';
import { inject, observer } from 'mobx-react';
import { DATA_LAYER_MAP, MB_EDIT_LAYER_MAP, EDIT_LAYER_TYPE_MAP } from 'src/config/dataLayerConfig';
import { RESOURCE_LAYER_VECTOR, RESOURCE_LAYER_BOUNDARY } from 'src/config/dataLayerConfig';
import { bufferDecorator } from 'src/util/decorator';
import 'less/sider.less';

const vectorsTabsConfig = [
    {
        key: 'vector',
        title: '高精数据图层',
        value: RESOURCE_LAYER_VECTOR
    },
    {
        key: 'boundary',
        title: '周边底图图层',
        value: RESOURCE_LAYER_BOUNDARY
    }
];

@inject('ResourceLayerStore')
@inject('VectorsStore')
@inject('DataLayerStore')
@inject('AttributeStore')
@observer
class DataLayer extends React.Component {
    constructor(props) {
        super(props);
        this.checkAllChangeEvent = this.checkAllChangeEvent.bind(this);
        this.handleSwitchChange = this.handleSwitchChange.bind(this);
    }
    checkedStatusMap = {};

    render() {
        let { VectorsStore } = this.props;
        let { updateKey, vectors, layerType } = VectorsStore;
        let keys = Object.keys(vectors);

        return (
            <div className="vectors-wrap" key={updateKey}>
                {/* 标题 */}
                {keys.length > 0 && this.renderTabs(keys)}
                {/* 选项 */}
                <div className="vectors-content-wrap">
                    {this.renderContent(vectors[layerType], layerType)}
                </div>
            </div>
        );
    }

    renderTabs(keys) {
        let { VectorsStore } = this.props;
        let { layerType } = VectorsStore;
        let tabs = vectorsTabsConfig.filter(tab => keys.includes(tab.key));
        return (
            <ul className="vectors-title-ul">
                {tabs.map(item => {
                    return (
                        <li
                            key={item.key}
                            className={layerType === item.key ? 'on' : ''}
                            onClick={() => this.handleClick(item.key)}
                        >
                            {item.title}
                        </li>
                    );
                })}
            </ul>
        );
    }

    renderContent(vectorsLayers, type) {
        if (!vectorsLayers) return <Empty image={Empty.PRESENTED_IMAGE_SIMPLE} />;
        this.calcCheckStatus();
        return (
            <React.Fragment>
                <div className="flex flex-row flex-start-center">
                    <Checkbox
                        value="all"
                        indeterminate={this.checkedStatusMap[type].ALL.indeterminate}
                        checked={this.checkedStatusMap[type].ALL.checkedAll}
                        disabled={vectorsLayers.disabled}
                        onChange={this.checkAllChangeEvent}
                    >
                        全选
                    </Checkbox>
                    <Switch
                        size="small"
                        checked={!vectorsLayers.disabled}
                        onChange={this.handleSwitchChange}
                    />
                </div>
                <div className="flex flex-row">
                    {Object.entries(MB_EDIT_LAYER_MAP).map(([key, layerNames]) => {
                        return this.renderLayerList(key, layerNames, vectorsLayers, type);
                    })}
                </div>
            </React.Fragment>
        );
    }

    renderLayerList(key, layerNames, vectorsLayers, type) {
        return (
            <div key={key} className="flex flex-column">
                <Checkbox
                    className="second-check"
                    value="all"
                    indeterminate={this.checkedStatusMap[type][key].indeterminate}
                    checked={this.checkedStatusMap[type][key].checkedAll}
                    disabled={vectorsLayers.disabled}
                    onChange={this.secondCheckChangeEvent.bind(this, key)}
                >
                    {EDIT_LAYER_TYPE_MAP[key]}
                </Checkbox>
                <List
                    className="check-group"
                    dataSource={layerNames}
                    renderItem={item => (
                        <div>
                            <Checkbox
                                value={item}
                                checked={vectorsLayers.checkMap[item]}
                                disabled={vectorsLayers.disabled}
                                onChange={e => {
                                    this.changeEvent(item, e.target.checked);
                                }}
                            >
                                {DATA_LAYER_MAP[item] ? DATA_LAYER_MAP[item].label : item}
                            </Checkbox>
                        </div>
                    )}
                />
            </div>
        );
    }

    handleClick = type => {
        this.props.VectorsStore.setLayerType(type);
    };

    @bufferDecorator()
    checkAllChangeEvent(e) {
        const value = e.target.checked;
        const { ResourceLayerStore, VectorsStore } = this.props;
        const { layerType, toggleAll } = VectorsStore;
        let resourceKey = vectorsTabsConfig.find(config => config.key === layerType).value;
        ResourceLayerStore.toggle(resourceKey, value);
        // 控制数据图层全部按钮的是否选中状态
        toggleAll(value);
    };

    @bufferDecorator()
    secondCheckChangeEvent(key, e) {
        const value = e.target.checked;
        const { VectorsStore } = this.props;
        VectorsStore.toggleStratification(key, value);
        // this.updateResourceLayer();
    };

    @bufferDecorator()
    changeEvent(item, value) {

        const { VectorsStore } = this.props;
        VectorsStore.toggle(item, value);
        // this.updateResourceLayer();
    };

    updateResourceLayer() {

        const { ResourceLayerStore, VectorsStore } = this.props;
        const { toggle: resourceToggle, setIndeterminate } = ResourceLayerStore;
        const { layerType } = VectorsStore;
        let resourceKey = vectorsTabsConfig.find(config => config.key === layerType).value;

        // 更新Resource状态前重新计算checked状态
        this.calcCheckStatus();
        this.checkedStatusMap[layerType].ALL.checkedAll && resourceToggle(resourceKey, true);
        this.checkedStatusMap[layerType].ALL.checkedNone && resourceToggle(resourceKey, false);
        this.checkedStatusMap[layerType].ALL.indeterminate && setIndeterminate(resourceKey);
    }

    @bufferDecorator()
    handleSwitchChange(checked) {

        const { ResourceLayerStore, VectorsStore } = this.props;
        const { layerType } = VectorsStore;
        let resourceKey = vectorsTabsConfig.find(config => config.key === layerType).value;
        ResourceLayerStore.switchToggle(resourceKey, !checked);
        VectorsStore.switchToggle(!checked);
    };

    calcCheckStatus() {
        let { VectorsStore } = this.props;
        let { vectors, layerType: type } = VectorsStore;
        this.checkedStatusMap[type] = { ALL: {}, LOGIC: {}, GEOMETRY: {} };
        let logicLayers = MB_EDIT_LAYER_MAP.LOGIC;
        let geometryLayers = MB_EDIT_LAYER_MAP.GEOMETRY;
        this.checkedStatusMap[type].LOGIC.checkedAll = logicLayers.every(
            layerName => vectors[type].checkMap[layerName]
        );
        this.checkedStatusMap[type].GEOMETRY.checkedAll = geometryLayers.every(
            layerName => vectors[type].checkMap[layerName]
        );
        this.checkedStatusMap[type].ALL.checkedAll =
            this.checkedStatusMap[type].LOGIC.checkedAll &&
            this.checkedStatusMap[type].GEOMETRY.checkedAll;
        this.checkedStatusMap[type].LOGIC.checkedNone = logicLayers.every(
            layerName => !vectors[type].checkMap[layerName]
        );
        this.checkedStatusMap[type].GEOMETRY.checkedNone = geometryLayers.every(
            layerName => !vectors[type].checkMap[layerName]
        );
        this.checkedStatusMap[type].ALL.checkedNone =
            this.checkedStatusMap[type].LOGIC.checkedNone &&
            this.checkedStatusMap[type].GEOMETRY.checkedNone;
        this.checkedStatusMap[type].LOGIC.indeterminate =
            !this.checkedStatusMap[type].LOGIC.checkedAll &&
            !this.checkedStatusMap[type].LOGIC.checkedNone;
        this.checkedStatusMap[type].GEOMETRY.indeterminate =
            !this.checkedStatusMap[type].GEOMETRY.checkedAll &&
            !this.checkedStatusMap[type].GEOMETRY.checkedNone;
        this.checkedStatusMap[type].ALL.indeterminate =
            !this.checkedStatusMap[type].ALL.checkedAll &&
            !this.checkedStatusMap[type].ALL.checkedNone;
    }
}

export default DataLayer;
