import { observable, configure, action } from 'mobx';
import CONFIG from 'src/config';
import { completeMultiProjectUrl } from 'src/utils/taskUtils';
import Tree from 'src/utils/Tree';

const PointCloudTree = new Tree();

configure({ enforceActions: 'always' });
class PointCloudStore {
    @observable maxHeightRange = [0, 100];
    @observable viewedHeightRange;
    @observable pointCloudMap = {};
    @observable updateKey;
    @observable visible = false;

    @action show = () => {
        this.visible = true;
    };

    @action hide = () => {
        this.visible = false;
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
        this.pointCloudMap = pointCloudMap;
    };

    //更新多工程映射的checked和disabled，显隐图层
    @action toggleChecked = (key, checked) => {
        PointCloudTree.toggleChecked(this.pointCloudMap, key, checked);
        this.updateKey = Math.random();
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
