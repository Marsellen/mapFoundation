import { observable, configure, action, computed, flow } from 'mobx';
import { Map, PcdLayer, VectorLayer, Utils } from '@ad/xmap';
import axios from 'axios';
import {
    getFeatureByOptionFormAll
} from 'src/util/vectorUtils'
import Item from 'antd/lib/list/Item';

configure({ enforceActions: 'always' });
/**
 *  控制地图的所有全量
 */
class mapStore {
    // 地图试图
    mapViewer = null;
    // 临时图层
    vectorLayer = null;
    // 临时存储高亮数据
    tempObjs = [];
    // 加载矢量地图
    addVectorLayer = (opts = {}) => {
        let layer = null;
        if (!opts.url) {
            layer = new VectorLayer(null, opts);
        } else {
            layer = new VectorLayer(opts.url, opts);
        }
        layer.setDefaultStyle(opts);
        this.mapViewer.getLayerManager().addLayer(opts.layerName || 'VectorLayer', layer);

        return layer;
    };
    // 初始化地图
    initMap = name => {
        const div = document.getElementById(name);
        this.mapViewer = new Map(div, { isLevel: true });
        this.mapViewer._scene.view.maxPitch = (-10 * Math.PI) / 180;
    };
    // 将文件geojson数据转换成图层要素
    addGeoToFeatures = (layer, urls) => {
        // let res = yield Promise.all(urls.map(axios.get));
        if (urls.length > 0) {
            urls.forEach(url => {
                axios(url)
                    .then(res => {
                        if (res.data.features.length > 0) {
                            layer.addFeatures(res.data.features);
                        }
                    })
                    .catch(error => {
                        console.log(error);
                    });
            });
        }

        // if (res.length > 0) {
        //     res.forEach(item => {
        //         if (item.data.features.length > 0) {
        //             layer.addFeatures(item.data.features);
        //         }
        //     });
        // }
    };
    addGeoToFeature = flow(function* (layer, url, opts) {
        yield axios(url)
            .then(res => {
                if (res.data.features.length > 0) {
                    res.data.features.forEach(feature => {
                        feature.properties = Object.assign(feature.properties, opts);
                    });
                    layer.addFeatures(res.data.features);
                }
                return true;
            })
            .catch(error => {
                console.log(error);
                return false;
            });
    });
    updateFeatureColor(layerName, option, matOption) {

        let [layer] = getFeatureByOptionFormAll(layerName, option);
        if (layer) {
            layer.updateFeatureColor(option, matOption.color, false);
            const objs = this.lineToFatline(layer.shapeNode, option, matOption);
            if (objs.length > 0) {
                objs.forEach(obj => {
                    this.tempObjs.push(obj);
                    this.mapViewer._scene.scene.add(obj);
                });
            }
        }

    };
    clear() {
        this.tempObjs.forEach((item) => { this.mapViewer._scene.scene.remove(item) });
        this.tempObjs = [];
    }
    lineToFatline(shapeNode, option, matOption) {
        return Utils.lineToFatline(shapeNode, option, matOption);
    };
    release = () => {
        this.mapViewer && this.mapViewer.release();
        this.mapViewer = null;
    };
}
export default new mapStore();
