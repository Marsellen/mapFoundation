import { observable, configure, action } from 'mobx';

configure({ enforceActions: 'always' });
class LayerStore {
    @observable layers;
    @observable updateKey;
    @observable checkAllState = true;

    @action init = layers => {
        this.layers = (layers || []).map(layer => {
            return {
                layer: layer.layer,
                value: layer.layerName,
                checked: true
            };
        });
    };

    @action toggle = (name, checked, isDataLayer) => {
        let layerEx = this.layers.find(layer => layer.value == name);
        layerEx.checked = checked;
        if (checked) {
            layerEx.layer.show();
        } else {
            layerEx.layer.hide();
        }
        //如果是点击“高精地图”，则改变数据图层“全选”状态
        if (!isDataLayer && name === '高精地图') {
            this.checkAlltoggle(checked);
        }
        this.updateKey = Math.random();
    };

    //数据图层全选切换
    @action checkAlltoggle = checked => {
        this.checkAllState = checked;
    };
}

export default LayerStore;
