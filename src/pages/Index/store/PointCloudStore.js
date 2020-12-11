import { observable, configure, action } from 'mobx';
import CONFIG from 'src/config';
import { completeMultiProjectUrl } from 'src/utils/taskUtils';
import Tree from 'src/utils/TreeCtrl';
import ResourceLayerStore from 'src/pages/Index/store/ResourceLayerStore';
import OcTreeIndex from 'src/utils/OcTreeIndex';

const PointCloudTree = new Tree();

configure({ enforceActions: 'always' });
class PointCloudStore {
    @observable maxHeightRange = [0, 100];
    @observable viewedHeightRange;
    @observable pointCloudMap = {};
    @observable updateKey;
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

    @action initHeightRange = range => {
        this.viewedHeightRange = this.maxHeightRange = range.map(item => Number(item.toFixed(2)));
    };

    @action setViewedHeightRange = range => {
        this.viewedHeightRange = range;
    };

    @action initPointCloudMap = (data, activeTask) => {
        const { point_clouds } = CONFIG.urlConfig;
        const pointCloudMap = {};
        let { defaultLidarName, treeContent } = data;
        defaultLidarName = JSON.parse(defaultLidarName);
        Object.entries(treeContent).forEach(([projectName, project], index) => {
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
            Object.entries(this.pointCloudMap).forEach(([projectName, project]) => {
                Object.keys(project.children).forEach((pointCloudName, index) => {
                    const newPcLayerKey = pcLayerKey.replace(/(?<=_).*(?=_)/, index + 1);
                    const newKey = `${projectName}|${pointCloudName}|${newPcLayerKey}`;
                    this.togglePointCloudLayer(newKey, checked, mode);
                });
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
        this.visible = false;
        this.pointCloudMap = {};
    };
}

export default new PointCloudStore();
