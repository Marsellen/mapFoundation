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
    @observable multiProjectMap = {};
    @observable layers = [];
    @observable updateKey;
    //获取所有已勾选点云
    @computed get pointCloudCheckedList() {
        const checkedArr = [];
        Object.values(this.multiProjectMap).forEach(project => {
            const projectLidarMap = project.children.point_clouds.children;
            Object.values(projectLidarMap).forEach(lidar => {
                const { checked, disabled, layerKey } = lidar;
                if (checked && !disabled) {
                    checkedArr.push(layerKey);
                }
            });
        });
        return checkedArr;
    }
    //所有点云都未勾选为false，其余情况都为true
    @computed get pointCloudChecked() {
        return this.pointCloudCheckedList.length > 0;
    }

    setActiveTrack = projectName => {
        Object.values(this.multiProjectMap).forEach(project => {
            project.children.track.active = project.key === projectName;
        });
    };

    //选择当前与点云联动的轨迹
    @action selectLinkTrack = projectName => {
        this.activeProjectName = projectName;
        this.setActiveTrack(projectName);
        this.updateKey = Math.random();
    };

    //获取当前选中轨迹点的轨迹名
    @action getTrackPart = activeTrackPoint => {
        const activeTrackPointX = activeTrackPoint.x || activeTrackPoint.X;
        const activeTrackPointY = activeTrackPoint.y || activeTrackPoint.Y;
        const activeTrackPointZ = activeTrackPoint.z || activeTrackPoint.Z;
        Object.values(this.multiProjectMap).find(project => {
            const { layerMap } = project.children.track;
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
            if (layerMap) {
                this.multiProjectMap = layerMap;
            }
            return {
                layerMap,
                layer,
                value: layerName,
                checked: true
            };
        });

        this.layers = layers.slice().sort((a, b) => {
            return LAYER_SORT_MAP[a.value] < LAYER_SORT_MAP[b.value] ? -1 : 1;
        });
    };

    @action updateLayerByName = (name, layer) => {
        if (this.layers.length === 0) return;
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
        //所有点云都未勾选为false，其余情况都为true
        const checked = Object.values(this.multiProjectMap).some(project => {
            const { children, checked } = project;
            return checked && children.point_clouds.checked;
        });
        //更新多工程对象点云（二层级）勾选状态
        Object.values(this.multiProjectMap).forEach(project => {
            if (!project.checked) return;
            const obj = project.children.point_clouds;
            const key = obj.key;
            this.loopMultiProjectMap(key, !checked, obj, true);
        });
        //显隐点云图层
        this.toggleProjectsPointCloud();
        this.updateKey = Math.random();
    };

    //isHotKey 指是否是快捷键调用的toggle方法
    @action toggle = (name, checked, isHotKey) => {
        let layerEx = this.layers.find(layer => layer.value == name);
        layerEx.checked = isHotKey ? !layerEx.checked : checked;
        layerEx.checked ? layerEx.layer.show() : layerEx.layer.hide();
        this.updateKey = Math.random();
    };

    //更新多工程映射的checked和disabled，显隐图层
    @action toggleProjectsResource = (key, checked) => {
        const keyArr = key.split('|');
        let obj = this.multiProjectMap;
        keyArr.forEach((item, index) => {
            obj = index === 0 ? obj[item] : obj.children[item];
        });
        this.loopMultiProjectMap(key, checked, obj, true);
        this.toggleProjectsPointCloud();
        this.updateKey = Math.random();
    };

    // 给updatePointClouds传什么显示什么，不传的不显示
    toggleProjectsPointCloud = () => {
        window.pointCloudLayer.updatePointClouds(this.pointCloudCheckedList);
    };

    handleProjectsLayer = (checked, obj, parent, key) => {
        const { checked: layerChecked, layerKey, layerName } = obj;
        const layer = window[layerName]; //获取当前图层
        //点击最里层，设置最里层checked；点击非最里层，设置最里层disabled
        if (parent) {
            obj.disabled = !(checked && parent.checked);
        } else {
            obj.checked = checked;
        }
        //点击非最里层，最里层未勾选，则返回
        if (parent && !layerChecked) return;
        //点击非最里层，非倒数第二层，倒数第二层未勾选，则返回
        if (parent && parent.key !== key && !parent.checked) return;
        //显隐图层
        if (layerName === 'trackLayer') {
            checked ? layer.show(layerKey) : layer.hide(layerKey);
        }
        // console.log(obj.label, checked, layerKey);
    };

    //递归多工程资料图层对象
    loopMultiProjectMap = (key, checked, obj, isFirst) => {
        const children = obj.children;
        //当前点击层级，只改变其checked
        //非当前点击层级，只改变期disabled
        if (isFirst) {
            obj.checked = checked;
        } else {
            obj.disabled = !checked;
        }
        //递归遍历，直到找到最里层
        if (children) {
            Object.keys(children).forEach(secondKey => {
                const secondObj = children[secondKey];
                const secondChildren = secondObj.children;
                if (secondChildren) {
                    this.loopMultiProjectMap(obj.key, checked, secondObj);
                } else {
                    this.handleProjectsLayer(checked, secondObj, obj, key);
                }
            });
        } else {
            this.handleProjectsLayer(checked, obj);
        }
    };

    @action setIndeterminate = name => {
        let layerEx = this.layers.find(layer => layer.value == name);
        layerEx.checked = true;
        this.updateKey = Math.random();
    };

    @action release = () => {
        this.layers = [];
        this.multiProjectMap = {};
        this.activeProjectName = '';
    };
}

export default new ResourceLayerStore();
