import { observable, configure, action, flow } from 'mobx';
import modelFactory from 'src/utils/vectorCtrl/modelFactory';
import relFactory from 'src/utils/relCtrl/relFactory';
import attrFactory from 'src/utils/attrCtrl/attrFactory';
import IDService from 'src/pages/Index/service/IDService';
import { getLayerIDKey } from 'src/utils/vectorUtils';
import { ATTR_SPEC_CONFIG } from 'src/config/AttrsConfig';
import { message } from 'antd';

configure({ enforceActions: 'always' });
class AttributeStore {
    model;
    relFeatures = [];
    @observable visible;
    @observable type;
    @observable attributes = [];
    @observable rels = [];
    @observable attrs = [];
    @observable readonly;

    @action show = readonly => {
        this.visible = true;
        this.readonly = readonly;
    };

    @action hide = () => {
        this.visible = false;
    };

    @action setModel = obj => {
        this.model = obj;
        this.type = this.model.layerName;
        this.fetchAttributes();
        this.fetchRels();
        this.fetchAttrs();
    };

    @action getModel = () => {
        return this.model;
    };

    @action fetchAttributes = () => {
        this.attributes = modelFactory.getTabelData(
            this.model.layerName,
            this.model.data.properties
        );
    };

    fetchRels = flow(function*() {
        try {
            let relRecords = yield relFactory.getFeatureRels(
                this.model.layerName,
                this.model.data.properties
            );
            this.rels = yield relFactory.getTabelData(
                this.model.layerName,
                relRecords
            );

            this.fetchRelFeatures(relRecords);
        } catch (error) {
            console.log(error);
        }
    });

    fetchAttrs = flow(function*() {
        try {
            this.attrs = yield attrFactory.getTabelData(
                this.model.layerName,
                this.model.data.properties
            );
            console.log(this.attrs);
        } catch (error) {
            console.log(error);
        }
    });

    fetchRelFeatures = flow(function*(relRecords) {
        try {
            this.hideRelFeatures();
            if (!relRecords) {
                relRecords = yield relFactory.getRelFeatures(
                    this.model.layerName,
                    this.model.data.properties
                );
            }
            this.relFeatures = yield relFactory.getRelOptions(
                this.model.layerName,
                relRecords
            );
            this.showRelFeatures();
        } catch (error) {
            console.log(error);
        }
    });

    @action hideRelFeatures = () => {
        try {
            this.relFeatures.map(feature => {
                map.getLayerManager()
                    .getLayersByType('VectorLayer')
                    .find(layer => layer.layerName == feature.layerName)
                    .layer.updateFeatureColor(feature.option);
            });
        } catch (error) {
            console.log(error);
        }
    };

    @action showRelFeatures = () => {
        try {
            this.relFeatures.map(feature => {
                map.getLayerManager()
                    .getLayersByType('VectorLayer')
                    .find(layer => layer.layerName == feature.layerName)
                    .layer.updateFeatureColor(
                        feature.option,
                        'rgb(255, 87, 34)'
                    );
            });
        } catch (error) {
            console.log(error);
        }
    };

    submit = flow(function*(data) {
        try {
            // model.data引用sdk要素数据的指针。修改其属性会同步修改sdk的要素数据。
            this.model.data.properties = {
                ...this.model.data.properties,
                ...data.attributes
            };
            // this.fetchAttributes();
            if (data.rels) {
                yield relFactory.updateRels(data.rels, this.model.layerName);
            }
            // this.fetchRels();
            if (data.attrs) {
                yield attrFactory.updateAttrs(data.attrs);
            }
            // this.fetchAttrs();
        } catch (e) {
            console.log(e);
            message.warning(e.message, 3);
        }
        return this.model;
    });

    spliceAttrs = flow(function*(key, index) {
        let records = this.attrs[key].splice(index, 1);
        if (records[0].id) {
            yield attrFactory.deleteRecord(records);
        }
    });

    newAttr = flow(function*(key, value, properties) {
        try {
            const _result = yield IDService.post({
                id_type: key
            }).catch(e => {
                Modal.error({
                    title: '请求ID失败',
                    okText: '确定'
                });
            });
            let id = _result.data[0].min;
            let IDKey = getLayerIDKey(key);
            let MainKey = ATTR_SPEC_CONFIG.find(config => config.source == key);
            let MainFId = MainKey.key;
            value[IDKey] = id;
            properties = properties || this.model.data.properties;
            value[MainFId] = properties[MainFId];
            let record = attrFactory.dataToTable(value, key);
            this.attrs[key] = this.attrs[key] || [];
            this.attrs[key].push(record);
        } catch (e) {
            console.log(e);
        }
    });
}

export default new AttributeStore();
