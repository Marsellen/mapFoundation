import { observable, configure, action } from 'mobx';
import CONFIG from 'src/config';
import { completeMultiProjectUrl } from 'src/util/taskUtils';
import Tree from 'src/util/treeCtrl';
import ResourceLayerStore from 'src/store/home/resourceLayerStore';
import OcTreeIndex from 'src/util/octreeIndex';

const PointCloudTree = new Tree();

configure({ enforceActions: 'always' });
class PointCloudStore {
    @observable updateKey;
    @observable initRange;
    @observable currentRange;
    @observable pointCloudMap = {};
    @observable visible = false;
    @observable same = false;

    @action show = () => {
        this.visible = true;
    };

    @action hide = () => {
        this.visible = false;
    };

    @action toggleSame = () => {
        this.same = !this.same;
    };

    @action setInitRange = range => {
        if (!range) return;
        if (range[0] === 0 && range[1] === 0) return;
        if (this.initRange) {
            const newRange = [
                Math.min(range[0], this.initRange[0]),
                Math.max(range[1], this.initRange[1])
            ];
            this.initRange = newRange;
        } else {
            this.initRange = range;
        }
    };

    @action setCurrentRange = range => {
        this.currentRange = range;
    };

    @action initPointCloudMap = (data, activeTask) => {
        const isMrTask = activeTask.processName == 'imp_std_precompile_man_repair';
        if (isMrTask) return;
        const { point_clouds } = CONFIG.urlConfig;
        const pointCloudMap = {};
        let { defaultLidarName, treeContent } = data;
        defaultLidarName = JSON.parse(defaultLidarName);
        const processNames = Object.keys(treeContent).sort();
        processNames.forEach((projectName, index) => {
            const project = treeContent[projectName];
            //向pointCloudMap追加工程
            pointCloudMap[projectName] = {
                key: projectName,
                checked: true,
                level: 1,
                label: `工程${index + 1}：${projectName}`,
                children: {}
            };
            Object.entries(project.POINTCLOUD).forEach(([pcName, trees]) => {
                //因雷达名中有特殊符号，需要进行转码
                pcName = encodeURIComponent(pcName);
                //获取雷达的默认数组，判断当前雷达是否属于默认数组
                const defaultLidarArr = defaultLidarName[projectName];
                const isDefaultLidar = defaultLidarArr.includes(pcName);
                //向pointCloudMap的工程中追加点云
                pointCloudMap[projectName].children[pcName] = {
                    key: `${projectName}|${pcName}`,
                    label: pcName,
                    layerKey: [],
                    checked: isDefaultLidar,
                    layerName: 'pointCloudLayer',
                    stretched: true,
                    children: {}
                };
                //向pointCloudMap的工程的点云中追加点云图层（八叉树）
                const urls = trees.map(treeName => {
                    const url = completeMultiProjectUrl(
                        `point_clouds/${pcName}/${treeName}/${point_clouds}`,
                        activeTask,
                        projectName
                    );
                    pointCloudMap[projectName].children[pcName].children[treeName] = {
                        key: `${projectName}|${pcName}|${treeName}`,
                        label: treeName,
                        layerKey: url,
                        checked: isDefaultLidar,
                        layerName: 'pointCloudLayer'
                    };
                    return url;
                });
                //向pointCloudMap的工程的点云中追加layerKey，通过LayerKey显隐该点云的所有图层
                pointCloudMap[projectName].children[pcName].layerKey = urls;
            });
        });
        PointCloudTree.loopAllData(pointCloudMap);
        this.pointCloudMap = pointCloudMap;
        this.updateKey = Math.random();
    };

    //联动资料图层-点云
    togglePointCloud = () => {
        Object.entries(this.pointCloudMap).forEach(([projectName, project]) => {
            Object.entries(project.children).forEach(([pointCloudName, pointCloud]) => {
                const { checked } = pointCloud;
                const key = projectName + '|point_clouds|' + pointCloudName;
                ResourceLayerStore.togglePointCloud(key, checked);
            });
        });
    };

    //更新点云图层
    @action togglePointCloudLayer = (key, checked, mode) => {
        PointCloudTree.toggleChecked(this.pointCloudMap, key, checked, mode);
        this.updateKey = Math.random();
    };

    @action toggleChecked = (key, checked, mode) => {
        const keyArr = key.split('|');
        const pcLayerKey = keyArr[2];
        if (this.same && pcLayerKey) {
            const projectName = keyArr[0];
            const project = this.pointCloudMap[projectName];
            Object.keys(project.children).forEach((pointCloudName, index) => {
                const newPcLayerKey = pcLayerKey.replace(/(?<=_).*(?=_)/, index + 1);
                const newKey = `${projectName}|${pointCloudName}|${newPcLayerKey}`;
                this.togglePointCloudLayer(newKey, checked, mode);
            });
            this.togglePointCloud();
        } else {
            this.togglePointCloudLayer(key, checked, mode);
            this.togglePointCloud();
        }
        OcTreeIndex.updateOctree();
    };

    getCheckStatus = key => {
        return PointCloudTree.getObj(this.pointCloudMap, key);
    };

    //设置伸缩状态
    @action toggleStretch = key => {
        PointCloudTree.toggleStretch(this.pointCloudMap, key);
        this.updateKey = Math.random();
    };

    @action release = () => {
        this.initRange = null;
        this.currentRange = null;
        this.pointCloudMap = {};
        this.visible = false;
        this.same = false;
    };
}

export default new PointCloudStore();
