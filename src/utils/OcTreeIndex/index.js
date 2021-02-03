import RTree from 'rtree';
import CONFIG from 'src/config';
import axios from 'axios';
import PointCloudStore from 'src/pages/Index/store/PointCloudStore';
import sysProperties from 'src/models/sysProperties';
import { completeSecendUrl } from 'src/utils/taskUtils';

class OcTreeIndex {
    getOctreeMap = async task => {
        try {
            if (!task.Input_imp_data_path) return;
            const { octreeIndex } = CONFIG.urlConfig;
            const url = completeSecendUrl(octreeIndex, task);
            const { data } = await axios.get(url);
            this.adRTree = new RTree();
            data.forEach(v => this.adRTree.insert(v.boundary, v.octreeKeys));
        } catch (e) {
            console.log('octreeIndex.json请求失败' + e.message || e || '');
        }
    };

    updateOctree = () => {
        try {
            if (!window.map) return;
            if (!window.pointCloudLayer) return;
            if (this.inProcess) return;
            const { viewChangeDelay, scaleSize } = sysProperties.configs;
            if (window.map.getLevel() < scaleSize) return;
            this.inProcess = true;
            setTimeout(() => {
                if (!window.map) return;
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
                this.inProcess = false;
            }, viewChangeDelay);
        } catch (e) {
            console.error('空间索引异常', e);
            this.inProcess = false;
        }
    };
}

export default new OcTreeIndex();
