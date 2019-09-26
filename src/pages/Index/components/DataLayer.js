import React from 'react';
import { Checkbox, List } from 'antd';
import { inject, observer } from 'mobx-react';
import { DATA_LAYER_MAP } from 'src/config/DataLayerConfig';
import { RESOURCE_LAYER_VETOR } from 'src/config/DataLayerConfig';
import 'less/components/data-layer.less';

@inject('ResourceLayerStore')
@inject('DataLayerStore')
@observer
class DataLayer extends React.Component {
    render() {
        let { DataLayerStore, ResourceLayerStore } = this.props;
        let { updateKey, layers } = DataLayerStore;
        return (
            <div>
                {layers && (
                    <Checkbox
                        value="all"
                        checked={ResourceLayerStore.checkAllState}
                        onChange={this.checkAllChangeEvent}>
                        全选
                    </Checkbox>
                )}
                <List
                    className="check-group"
                    key={updateKey}
                    dataSource={layers}
                    renderItem={item => (
                        <div>
                            <Checkbox
                                value={item.value}
                                checked={item.checked}
                                onChange={e => {
                                    this.changeEvent(item, e.target.checked);
                                }}>
                                {DATA_LAYER_MAP[item.value]
                                    ? DATA_LAYER_MAP[item.value].label
                                    : item.value}
                            </Checkbox>
                        </div>
                    )}
                />
            </div>
        );
    }

    checkAllChangeEvent = e => {
        const value = e.target.checked;
        const { DataLayerStore, ResourceLayerStore } = this.props;
        // 全选切换
        ResourceLayerStore.checkAlltoggle(value);
        // 控制高精地图的显示隐藏
        ResourceLayerStore.toggle(RESOURCE_LAYER_VETOR, value, true);
        // 控制数据图层全部按钮的是否选中状态
        DataLayerStore.toggleAll(value);
    };

    changeEvent = (item, value) => {
        let { DataLayerStore, ResourceLayerStore } = this.props;
        DataLayerStore.toggle(item.value, value);
        let state = DataLayerStore.hasShow() !== -1;
        ResourceLayerStore.toggleVertor(state);
    };
}

export default DataLayer;
