import React from 'react';
import { Checkbox, List, Switch } from 'antd';
import { inject, observer } from 'mobx-react';
import { DATA_LAYER_MAP } from 'src/config/DataLayerConfig';
import { RESOURCE_LAYER_VECTOR, RESOURCE_LAYER_BOUNDARY } from 'src/config/DataLayerConfig';
import 'less/components/sider.less';

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
    render() {
        let { VectorsStore } = this.props;
        let { updateKey, vectors, layerType, indeterminate, isCheckedAll } = VectorsStore;
        const vectorsLayers = vectors[layerType];
        let keys = Object.keys(vectors);
        let tabs = vectorsTabsConfig.filter(tab => keys.includes(tab.key));
        let disabled = vectors[layerType].disabled;
        return (
            <div className="vectors-wrap" key={updateKey}>
                {/* 标题 */}
                {vectorsLayers && (
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
                )}
                {/* 选项 */}
                <div className="vectors-content-wrap">
                    {vectorsLayers && (
                        <div className="flex flex-row flex-start-center">
                            <Checkbox
                                className="flex flex-1"
                                value="all"
                                indeterminate={indeterminate}
                                checked={isCheckedAll}
                                disabled={disabled}
                                onChange={this.checkAllChangeEvent}
                            >
                                全选
                            </Checkbox>
                            <Switch
                                checkedChildren="启用"
                                unCheckedChildren="禁用"
                                size="small"
                                checked={!disabled}
                                onChange={this.handleSwitchChange}
                            />
                        </div>
                    )}
                    <List
                        className="check-group"
                        dataSource={vectors[layerType]}
                        renderItem={item => (
                            <div>
                                <Checkbox
                                    value={item.value}
                                    checked={item.checked}
                                    disabled={disabled}
                                    onChange={e => {
                                        this.changeEvent(item, e.target.checked);
                                    }}
                                >
                                    {DATA_LAYER_MAP[item.value]
                                        ? DATA_LAYER_MAP[item.value].label
                                        : item.value}
                                </Checkbox>
                            </div>
                        )}
                    />
                </div>
            </div>
        );
    }

    handleClick = type => {
        this.props.VectorsStore.setLayerType(type);
    };

    checkAllChangeEvent = e => {
        const value = e.target.checked;
        const { ResourceLayerStore, VectorsStore } = this.props;
        const { layerType, toggleAll } = VectorsStore;
        let resourceKey = vectorsTabsConfig.find(config => config.key === layerType).value;
        ResourceLayerStore.toggle(resourceKey, value);

        // 控制数据图层全部按钮的是否选中状态
        toggleAll(value);
    };

    changeEvent = (item, value) => {
        const { ResourceLayerStore, VectorsStore } = this.props;
        const { toggle: resourceToggle, setIndeterminate } = ResourceLayerStore;
        const { toggle: vectorsToggle } = VectorsStore;

        vectorsToggle(item.value, value);

        const { layerType, isCheckedNone, isCheckedAll, indeterminate } = VectorsStore;

        let resourceKey = vectorsTabsConfig.find(config => config.key === layerType).value;

        isCheckedAll && resourceToggle(resourceKey, true);
        isCheckedNone && resourceToggle(resourceKey, false);
        indeterminate && setIndeterminate(resourceKey);
    };

    handleSwitchChange = checked => {
        const { ResourceLayerStore, VectorsStore } = this.props;
        const { layerType } = VectorsStore;
        let resourceKey = vectorsTabsConfig.find(config => config.key === layerType).value;
        ResourceLayerStore.switchToggle(resourceKey, !checked);
        VectorsStore.switchToggle(!checked);
    };
}

export default DataLayer;
