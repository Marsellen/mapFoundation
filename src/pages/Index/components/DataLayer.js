import React from 'react';
import { Checkbox, List } from 'antd';
import { inject, observer } from 'mobx-react';
import { DATA_LAYER_MAP } from 'src/config/DataLayerConfig';
import {
    RESOURCE_LAYER_VETOR,
    RESOURCE_LAYER_BOUNDARY
} from 'src/config/DataLayerConfig';
import 'less/components/sider.less';

const vectorsTabsConfig = [
    {
        key: RESOURCE_LAYER_VETOR,
        title: '高精数据图层'
    },
    {
        key: RESOURCE_LAYER_BOUNDARY,
        title: '周边底图图层'
    }
];

@inject('ResourceLayerStore')
@inject('DataLayerStore')
@inject('VectorsStore')
@observer
class DataLayer extends React.Component {
    render() {
        let { DataLayerStore, VectorsStore } = this.props;
        let {
            updateKey,
            vectors,
            layerType,
            indeterminate,
            isCheckedAll
        } = VectorsStore;
        const vectorsLayers = vectors[layerType];
        return (
            <div className="vectors-wrap">
                {/* 标题 */}
                {vectorsLayers && (
                    <ul className="vectors-title-ul">
                        {vectorsTabsConfig.map(item => {
                            return (
                                <li
                                    key={item.key}
                                    className={
                                        layerType === item.key ? 'on' : ''
                                    }
                                    onClick={() => this.handleClick(item.key)}>
                                    {item.title}
                                </li>
                            );
                        })}
                    </ul>
                )}
                {/* 选项 */}
                <div className="vectors-content-wrap">
                    {vectorsLayers && (
                        <Checkbox
                            value="all"
                            indeterminate={indeterminate}
                            checked={isCheckedAll}
                            onChange={this.checkAllChangeEvent}>
                            全选
                        </Checkbox>
                    )}
                    <List
                        className="check-group"
                        key={updateKey}
                        dataSource={vectors[layerType]}
                        renderItem={item => (
                            <div>
                                <Checkbox
                                    value={item.value}
                                    checked={item.checked}
                                    onChange={e => {
                                        this.changeEvent(
                                            item,
                                            e.target.checked
                                        );
                                    }}>
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
        const { DataLayerStore, ResourceLayerStore, VectorsStore } = this.props;
        const { layerType, toggleAll } = VectorsStore;

        ResourceLayerStore.toggle(layerType, value);
        // 控制数据图层全部按钮的是否选中状态
        toggleAll(value);
    };

    changeEvent = (item, value) => {
        const { DataLayerStore, ResourceLayerStore, VectorsStore } = this.props;
        const { toggle: resourceToggle } = ResourceLayerStore;
        const { toggle: vectorsToggle } = VectorsStore;

        vectorsToggle(item.value, value);

        const { layerType, isCheckedAll, isCheckedNone } = VectorsStore;
        isCheckedAll && resourceToggle(layerType, true);
        isCheckedNone && resourceToggle(layerType, false);
    };
}

export default DataLayer;
