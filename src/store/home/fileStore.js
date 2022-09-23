import { VECTOR_FILES, ATTR_FILES, REL_FILES, REGION_FILES } from 'src/config/taskConfig';
import VectorsStore from 'src/store/home/vectorsStore';
import { observable, flow, configure, action } from 'mobx';
import RelStore from 'src/store/home/relStore';
import AttrStore from 'src/store/home/attrStore';
import TaskStore from './taskStore';
import mapStore from './mapStore';
import { getRGB } from "src/util/utils";
/**
 *  导入和导出数据
 */
configure({ enforceActions: 'always' });
class fileStore {
    @observable files = [];

    async impConfig(data, callBack) {
        if (!window.map) await mapStore.init();
        if (data) return this.addLayer(data) && callBack && callBack(true);
        let that = this;
        let formCreate = document.getElementById('fileName');
        if (formCreate) {
            formCreate.removeChild(document.getElementById('file'));
            document.body.removeChild(formCreate);
        }
        let form = document.createElement('form');
        // form.style.display = 'none';
        form.id = 'fileName';
        document.body.appendChild(form);
        let fileInput = document.createElement('input');
        fileInput.id = 'file';
        fileInput.multiple = true;
        fileInput.type = 'file';
        fileInput.addEventListener('change', function (event) {
            let files = event.target.files;
            that.addLayer(files);
            callBack && callBack(true);
        });
        form.appendChild(fileInput);
        fileInput.click();
        document.body.removeChild(form);
    }

    async filesViewer(data = {}, callBack) {
        if (!window.map) await mapStore.init();
        Object.keys(data).forEach(key => {
            const result = data[key];
            if (key == 'vectors') {
                result.forEach(item => {
                    VectorsStore.addRecords(null, 'current', item);
                    const extent = window.map.getExtentByFeatures(item.features);
                    this.setExtent(item);
                    window.map.setExtent(extent);
                });
            } else if (key == 'attrs') {
                result.forEach(item => {
                    AttrStore.addRecords(null, 'current', item);
                    const extent = window.map.getExtentByFeatures(item.features);
                    window.map.setExtent(extent);
                });
            } else if (key == 'rels') {
                result.forEach(item => {
                    RelStore.addRecords(null, 'current', item);
                    const extent = window.map.getExtentByFeatures(item.features);
                    window.map.setExtent(extent);
                });
            }
        });
        TaskStore.setTaskFileMap(data);
        callBack(true);
    }

    @action
    addLayer = files => {
        this.files = files;
        for (let i = 0; i < files.length; i++) {
            let reader = new FileReader();
            reader.readAsText(files[i]);
            reader.onload = item => {
                try {
                    const result = JSON.parse(item.target.result);
                    const name = result.name;
                    let allLayer = [...VECTOR_FILES, ...ATTR_FILES, ...REL_FILES];
                    let layer = allLayer.includes(name);
                    let fileMap = { vectors: [], attrs: [], rels: [], regions: [] };
                    if (layer) {
                        let vec = VECTOR_FILES.includes(name);
                        if (vec) {
                            VectorsStore.addRecords(null, 'current', result);
                            fileMap.vectors.push(result);
                        }
                        let attr = ATTR_FILES.includes(name);
                        if (attr) {
                            AttrStore.addRecords(null, 'current', result);
                            fileMap.attrs.push(result);
                        }
                        let rel = REL_FILES.includes(name);
                        if (rel) {
                            RelStore.addRecords(null, 'current', result);
                            fileMap.rels.push(result);
                        }
                    } else {
                        let rgb = getRGB();
                        let regionLayer = mapStore.addVectorLayer({
                            color: rgb,
                            opacity: 1,
                            tocLevel: false,
                            layerConfig: {
                                textStyle: {
                                    showMode: 'polygon-center',
                                    defaultStyle: {
                                        textFields: ['titleId'],
                                        interval: 10,
                                        showMode: 'polygon-center',
                                        fontSize: 40,
                                        strokeColor: 'rgba(0,0,0,1)',
                                        backgroundColor: 'rgba(0,0,0,0.7)',
                                        textColor: 'rgba(255,255,255,1)'
                                    },
                                    titleId: []
                                },
                                textFields: ['titleId'],
                                showStyles: ['vectorStyle', 'textStyle']
                            }
                        });
                        mapStore.featuresToLayer(regionLayer, result.features);

                    }
                    console.log('fileMap:', fileMap);
                    TaskStore.setTaskFileMap(fileMap);
                    this.setExtent(result);
                    if (files.length === 1) {
                        window.map.setExtent(window.extent);
                    } else {
                        if (i === files.length - 1) {
                            window.map.setExtent(window.extent);
                        }
                    }
                } catch (error) {}
            };
        }
    };

    // 判断任务边框范围，并赋值给全局变量extent
    setExtent = result => {
        const extent = window.map.getExtentByFeatures(result.features);
        if (window.extent) {
            if (window.extent.max[0] < extent.max[0]) {
                window.extent.max[0] = extent.max[0];
            }
            if (window.extent.max[1] < extent.max[1]) {
                window.extent.max[1] = extent.max[1];
            }
            if (window.extent.min[0] > extent.min[0]) {
                window.extent.min[0] = extent.min[0];
            }
            if (window.extent.min[1] > extent.min[1]) {
                window.extent.min[1] = extent.min[1];
            }
        } else {
            window.extent = extent;
        }
    };

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
}
export default new fileStore();
