import RTree from 'rtree';
import CONFIG from 'src/config';
import axios from 'axios';
import PointCloudStore from 'src/store/home/pointCloudStore';
import SettingStore from 'src/store/setting/settingStore';
import { completeSecendUrl } from 'src/util/taskUtils';

class OcTreeIndex {
    initConfig = () => {
        const { viewChangeDelay, scaleSize } = SettingStore.getConfig('OTHER_CONFIG');
        this.lock = false; //函数节流锁
        this.viewChangeDelay = viewChangeDelay; //函数节流时间
        this.scaleSize = scaleSize; //任务缩放比例
        this.adRTree = null; //实例化RTree
    };

    getOctreeMap = async task => {
        try {
            const { Input_imp_data_path, processName } = task;
            if (!Input_imp_data_path || processName == 'imp_std_precompile_man_repair') return;
            this.initConfig();
            const { octreeIndex } = CONFIG.urlConfig;
            const url = completeSecendUrl(octreeIndex, task);
            const { data } = await axios.get(url);
            this.adRTree = new RTree();
            data.forEach(v => this.adRTree.insert(v.boundary, v.octreeKeys));
        } catch (e) {
            console.log('octreeIndex.json请求失败' + e.message || e || '');
        }
    };

    handleUpdateOctree = () => {
        if (!window.map) return;
        if (!window.pointCloudLayer) return;
        if (window.map.getLevel() < this.scaleSize) return;
        const { min, max } = window.map.getScreenBox();
        const param = {
            x: min[0],
            y: min[1],
            w: max[0] - min[0],
            h: max[1] - min[1]
        };
        const octreeList = this.adRTree?.search(param) ?? [];
        const octreeUrls = octreeList.flatMap(key => {
            const octree = PointCloudStore.getCheckStatus(key);
            const { checked, disabled, layerKey } = octree || {};
            if (checked && !disabled) {
                return [layerKey];
            } else {
                return [];
            }
        });
        window?.pointCloudLayer?.updatePointClouds?.(octreeUrls);
    };

    updateOctree = () => {
        if (this.lock) return;
        this.lock = true;
        setTimeout(() => {
            this.handleUpdateOctree();
            this.lock = false;
        }, this.viewChangeDelay);
    };
}

export default new OcTreeIndex();
