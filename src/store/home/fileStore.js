import { VECTOR_FILES, ATTR_FILES, REL_FILES, REGION_FILES } from 'src/config/taskConfig';
import VectorsStore from 'src/store/home/vectorsStore';
import { observable, flow, configure, action } from 'mobx';
import RelStore from 'src/store/home/relStore';
import AttrStore from 'src/store/home/attrStore';
import TaskStore from './taskStore';
import mapStore from './mapStore';

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
            if ((key = 'vectors')) {
                result.forEach(item => {
                    VectorsStore.addRecords(null, 'current', item);
                    const extent = window.map.getExtentByFeatures(item.features);
                    window.map.setExtent(extent);
                });
            } else if ((key = 'attrs')) {
                result.forEach(item => {
                    AttrStore.addRecords(null, 'current', item);
                    const extent = window.map.getExtentByFeatures(item.features);
                    window.map.setExtent(extent);
                });
            } else if ((key = 'rels')) {
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
                        // VectorsStore.addRecords(null, 'boundary', result);
                    }
                    console.log('fileMap:', fileMap);
                    TaskStore.setTaskFileMap(fileMap);
                    const extent = window.map.getExtentByFeatures(result.features);
                    window.map.setExtent(extent);
                } catch (error) {}
            };
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
