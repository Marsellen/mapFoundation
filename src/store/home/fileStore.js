

import { VECTOR_FILES, ATTR_FILES, REL_FILES, REGION_FILES } from 'src/config/taskConfig';
import VectorsStore from 'src/store/home/vectorsStore';
import RelStore from 'src/store/home/relStore';
import AttrStore from 'src/store/home/attrStore';

/**
 *  导入和导出数据
 */
class fileStore {
    impConfig() {
        let formCreate = document.getElementById("fileName");
        if (formCreate) {
            formCreate.removeChild(document.getElementById("file"));
            document.body.removeChild(formCreate);
        }
        let form = document.createElement('form');
        // form.style.display = 'none';
        form.id = "fileName";
        document.body.appendChild(form);
        let fileInput = document.createElement('input');
        fileInput.id = 'file';
        fileInput.multiple = true;
        fileInput.type = 'file';
        fileInput.addEventListener('change', function () {
            let files = event.target.files;
            for (let i = 0; i < files.length; i++) {
                let reader = new FileReader();
                reader.readAsText(files[i]);
                reader.onload = (data) => {
                    try {
                        const result = JSON.parse(data.target.result);
                        const name = result.name;
                        let allLayer = [...VECTOR_FILES, ...ATTR_FILES, ...REL_FILES];
                        let layer = allLayer.includes(name);
                        if (layer) {
                            let vec = VECTOR_FILES.includes(name);
                            if (vec) {
                                VectorsStore.addRecords(null, 'current', result);
                            }
                            let attr = ATTR_FILES.includes(name);
                            if (attr) {
                                AttrStore.addRecords(null, 'current', result);
                            }
                            let rel = REL_FILES.includes(name);
                            if (rel) {
                                RelStore.addRecords(null, 'current', result);
                            }
                        }
                        else {
                            // VectorsStore.addRecords(null, 'boundary', result);
                        }
                        const extent = window.map.getExtentByFeatures(result.features);
                        window.map.setExtent(extent);
                    } catch (error) {
                    }
                };
            }
        });
        form.appendChild(fileInput);
        fileInput.click();
        document.body.removeChild(form);
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
