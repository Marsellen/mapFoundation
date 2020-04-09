import { action, configure, computed, observable } from 'mobx';
import {
    RESOURCE_LAYER_VECTOR,
    RESOURCE_LAYER_TASK_SCOPE,
    RESOURCE_LAYER_BOUNDARY,
    RESOURCE_LAYER_MULTI_PROJECT
} from 'src/config/DataLayerConfig';

const LAYER_SORT_MAP = {
    [RESOURCE_LAYER_VECTOR]: 0,
    [RESOURCE_LAYER_BOUNDARY]: 1,
    [RESOURCE_LAYER_MULTI_PROJECT]: 2,
    [RESOURCE_LAYER_TASK_SCOPE]: 3
};

configure({ enforceActions: 'always' });
class ResourceLayerStore {
    activeTrackName = '';
    @observable layers = [];
    @observable updateKey;
    //获取多工程图层map
    @computed get multiProjectResource() {
        const name = RESOURCE_LAYER_MULTI_PROJECT;
        const { layerMap } =
            this.layers.find(layer => layer.value == name) || {};
        return layerMap || [];
    }
    //所有点云都未勾选为false，其余情况都为true
    @computed get pointCloudChecked() {
        const layerMap = this.multiProjectResource;
        const isAllUnChecked = Object.keys(layerMap).every(projectName => {
            const { point_clouds } = layerMap[projectName];
            const { checked } = point_clouds;
            return !checked;
        });
        return !isAllUnChecked;
    }
    //所有点云都勾选为true
    @computed get pointCloudAllChecked() {
        const layerMap = this.multiProjectResource;
        const isAllChecked = Object.keys(layerMap).every(projectName => {
            const { point_clouds } = layerMap[projectName];
            const { checked } = point_clouds;
            return checked;
        });
        return isAllChecked;
    }
    //选择当前与点云联动的轨迹
    @action selectLinkTrack = projectName => {
        this.activeProjectName = projectName;
        this.updateKey = Math.random();
    };

    //获取当前选中轨迹点的轨迹名
    @action getTrackPart = activeTrackPoint => {
        const activeTrackPointX = activeTrackPoint.x || activeTrackPoint.X;
        const activeTrackPointY = activeTrackPoint.y || activeTrackPoint.Y;
        const activeTrackPointZ = activeTrackPoint.z || activeTrackPoint.Z;
        Object.values(this.multiProjectResource).find(layerItem => {
            const { track } = layerItem;
            const { layerMap } = track;
            this.activeTrackName = Object.keys(layerMap).find(trackName => {
                const isIncloud = layerMap[trackName].find(item => {
                    const { X, Y, Z } = item;
                    return (
                        activeTrackPointX === X &&
                        activeTrackPointY === Y &&
                        activeTrackPointZ === Z
                    );
                });
                return isIncloud ? trackName : false;
            });
            return this.activeTrackName;
        });
        return this.activeTrackName;
    };

    @action toggleVertor = value => {
        let vetor = this.layers.find(
            layer => layer.value == RESOURCE_LAYER_VECTOR
        );
        if (vetor && vetor.checked != value) {
            vetor.checked = value;
            this.updateKey = Math.random();
        }
    };

    @action addLayers = layers => {
        if (!layers || layers.length === 0) return;

        layers = layers.map(layerItem => {
            const { layerName, layer, layerMap } = layerItem;
            return {
                layerMap,
                layer,
                value: layerName,
                checked: true
            };
        });

        this.layers = this.layers
            .concat(layers)
            .slice()
            .sort((a, b) => {
                return LAYER_SORT_MAP[a.value] < LAYER_SORT_MAP[b.value]
                    ? -1
                    : 1;
            });
    };

    @action updateLayerByName = (name, layer) => {
        let result = this.layers.find(layer => layer.value === name);
        if (result) {
            result.layer = layer;
        } else {
            this.layers.push({
                layer: layer,
                value: name,
                checked: true
            });
            this.layers = this.layers.slice().sort((a, b) => {
                return LAYER_SORT_MAP[a.value] < LAYER_SORT_MAP[b.value]
                    ? -1
                    : 1;
            });
        }
    };

    //快捷键显隐所有点云
    @action pointCloudToggle = () => {
        const checked = this.pointCloudAllChecked ? false : true;
        const resourceName = RESOURCE_LAYER_MULTI_PROJECT;
        const layerName = 'point_clouds';
        const currentLayer = this.layers.find(
            layer => layer.value == resourceName
        );
        const { layerMap } = currentLayer;

        Object.keys(layerMap).forEach(projectName => {
            const layerItem = currentLayer.layerMap[projectName][layerName];
            const { layerKey, layer } = layerItem;
            layerItem.checked = checked;
            checked ? layer.show(layerKey) : layer.hide(layerKey);
        });

        this.updateKey = Math.random();
    };

    //显隐藏多工程资料图层，如：点云、轨迹
    @action projectsToggle = (layerItem, checked) => {
        const { projectName, layerName, layerKey, layer } = layerItem;
        const name = RESOURCE_LAYER_MULTI_PROJECT;
        const currentLayer = this.layers.find(layer => layer.value == name);
        currentLayer.layerMap[projectName][layerName].checked = checked;
        checked ? layer.show(layerKey) : layer.hide(layerKey);
        this.updateKey = Math.random();
    };

    //isHotKey 指是否是快捷键调用的toggle方法
    @action toggle = (name, checked, isHotKey) => {
        let layerEx = this.layers.find(layer => layer.value == name);
        layerEx.checked = isHotKey ? !layerEx.checked : checked;
        layerEx.checked ? layerEx.layer.show() : layerEx.layer.hide();
        this.updateKey = Math.random();
    };

    @action setIndeterminate = name => {
        let layerEx = this.layers.find(layer => layer.value == name);
        layerEx.checked = true;
        this.updateKey = Math.random();
    };

    @action release = () => {
        this.layers = [];
        this.activeProjectName = '';
    };
}

export default new ResourceLayerStore();
