import { action, configure, computed, observable } from 'mobx';
import {
    RESOURCE_LAYER_VECTOR,
    RESOURCE_LAYER_TASK_SCOPE,
    RESOURCE_LAYER_BOUNDARY,
    RESOURCE_LAYER_MULTI_PROJECT,
    CONFIDENCE_LAYER
} from 'src/config/DataLayerConfig';
import Tree from 'src/utils/TreeCtrl';
import PointCloudStore from 'src/pages/Index/store/PointCloudStore';

const checkCallback = obj => {
    const { checked, disabled, layerKey, layerName, isIndeterminate } = obj;
    const layer = window[layerName];
    const isShow = checked && !disabled && !isIndeterminate;
    isShow ? layer.show(layerKey) : layer.hide(layerKey);
};
const ProjectsTree = new Tree();
ProjectsTree.setCheckCallback(checkCallback);

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
    //只要有一个点云显示，即为true
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
        //获取当前工程轨迹
        const activeProject = this.multiProjectMap[this.activeProjectName];
        const { layerMap } = activeProject.children.track;
        this.activeTrackName = Object.keys(layerMap).find(trackName => {
            const isIncloud = layerMap[trackName].find(item => {
                const { X, Y, Z } = item;
                return (
                    activeTrackPointX === X && activeTrackPointY === Y && activeTrackPointZ === Z
                );
            });
            return isIncloud ? trackName : false;
        });
        return this.activeTrackName;
    };

    @action toggleVertor = value => {
        let vetor = this.layers.find(layer => layer.value == RESOURCE_LAYER_VECTOR);
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
                return LAYER_SORT_MAP[a.value] < LAYER_SORT_MAP[b.value] ? -1 : 1;
            });
        }
    };

    @action initMultiProjectLayer = () => {
        Object.values(this.multiProjectMap).forEach(project => {
            Object.values(project.children).forEach(obj => {
                ProjectsTree.loopData(obj.checked, obj, true, 'mixin');
            });
        });
    };

    //快捷键显隐点云或轨迹图层
    @action layerToggle = layerName => {
        //当前启用工程至少一个【二级】勾选，即为true
        const checked = Object.values(this.multiProjectMap).some(project => {
            const { children, checked } = project;
            return checked && children[layerName].checked;
        });
        //更新多工程【二级】勾选状态
        Object.values(this.multiProjectMap).forEach(project => {
            if (!project.checked) return;
            const obj = project.children[layerName];
            ProjectsTree.loopData(!checked, obj, true, 'mixin');
            //如果是快捷键操作点云，需要联动点云图层窗口
            if (layerName === 'point_clouds') {
                const { toggleChecked } = PointCloudStore.PointCloudTree;
                toggleChecked(project.key, !checked, 'disabled');
            }
        });
        this.updateKey = Math.random();
    };

    //isHotKey 指是否是快捷键调用的toggle方法
    @action toggle = (name, checked, isHotKey) => {
        let layerEx = this.layers.find(layer => layer.value == name);
        layerEx.checked = isHotKey ? !layerEx.checked : checked;
        layerEx.checked ? layerEx.layer.show() : layerEx.layer.hide();
        this.updateKey = Math.random();
    };

    @action switchToggle = (name, disabled, isHotKey) => {
        let layerEx = this.layers.find(layer => layer.value == name);
        if (!layerEx) return;
        layerEx.disabled = isHotKey ? !layerEx.disabled : disabled;

        this.updateKey = Math.random();
    };

    //更新多工程映射的checked和disabled，显隐图层
    @action togglePointCloud = (key, checked) => {
        ProjectsTree.toggleChecked(this.multiProjectMap, key, checked, 'mixin');
        this.updateKey = Math.random();
    };

    //联动点云图层窗口
    togglePointCloudLayer = (key, checked) => {
        const keyArr = key.split('|');
        const pcLayerKey = keyArr.filter(item => item !== 'point_clouds').join('|');
        if (keyArr.length > 2) {
            PointCloudStore.togglePointCloudLayer(pcLayerKey, checked, 'checked');
        } else {
            const currentKey = keyArr[0] + '|point_clouds';
            const { checked, disabled } = ProjectsTree.getObj(this.multiProjectMap, currentKey);
            PointCloudStore.togglePointCloudLayer(pcLayerKey, checked && !disabled, 'disabled');
        }
    };

    @action toggleProjectsChecked = (key, checked) => {
        this.togglePointCloud(key, checked);
        this.togglePointCloudLayer(key, checked);
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

    @action addConfidenceLayer = layers => {
        let ConfidenceLayer = this.layers.find(layer => layer.value == CONFIDENCE_LAYER);
        if (ConfidenceLayer) {
            ConfidenceLayer.children = layers;
            ConfidenceLayer.checked = true;
        } else {
            ConfidenceLayer = {
                value: CONFIDENCE_LAYER,
                checked: true,
                children: layers
            };
            this.layers.unshift(ConfidenceLayer);
        }
        this.updateKey = Math.random();
    };

    confidenceLayerRelease = () => {
        let ConfidenceLayer = this.layers.find(layer => layer.value == CONFIDENCE_LAYER);
        if (ConfidenceLayer) {
            ConfidenceLayer.children.forEach(({ layer }) => {
                layer.offsetMap(window.map);
            });
        }
    };

    @action toggleConfidenceLayer = (checked, value = CONFIDENCE_LAYER) => {
        let ConfidenceLayer = this.layers.find(layer => layer.value == CONFIDENCE_LAYER);
        if (!ConfidenceLayer) return;
        if (value === CONFIDENCE_LAYER) {
            checked = checked === undefined ? !ConfidenceLayer.checked : checked;
            ConfidenceLayer.children.forEach(layer => {
                layer.disabled = !checked;
                !checked ? layer.layer.hide() : layer.checked && layer.layer.show();
            });
            ConfidenceLayer.checked = checked;
        } else {
            let layer = ConfidenceLayer.children.find(layer => layer.value == value);
            checked = checked === undefined ? !layer.checked : checked;
            layer.checked = checked;
            checked ? layer.layer.show() : layer.layer.hide();
        }
        this.updateKey = Math.random();
    };
}

export default new ResourceLayerStore();
