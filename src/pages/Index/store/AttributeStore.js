import { observable, configure, action, flow } from 'mobx';
import modelFactory from 'src/utils/vectorCtrl/modelFactory';
import relFactory from 'src/utils/relCtrl/relFactory';
import attrFactory from 'src/utils/attrCtrl/attrFactory';
import IDService from 'src/pages/Index/service/IDService';
import { getLayerIDKey, getLayerByName } from 'src/utils/vectorUtils';
import { ATTR_SPEC_CONFIG } from 'src/config/AttrsConfig';
import _ from 'lodash';

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
            this.relRecords = yield relFactory.getFeatureRels(
                this.model.layerName,
                this.model.data.properties
            );
            this.rels = yield relFactory.getTabelData(
                this.model.layerName,
                this.relRecords,
                this.model.data.properties
            );

            this.fetchRelFeatures(this.relRecords);
        } catch (error) {
            console.log(error);
        }
    });

    fetchAttrs = flow(function*() {
        try {
            this.attrRecords = yield attrFactory.getFeatureAttrs(
                this.model.layerName,
                this.model.data.properties
            );
            this.attrs = attrFactory.getTabelData(this.attrRecords);
            // console.log(this.attrs);
        } catch (error) {
            console.log(error);
        }
    });

    fetchRelFeatures = flow(function*(relRecords) {
        try {
            this.hideRelFeatures();
            if (!relRecords) {
                relRecords = yield relFactory.getFeatureRels(
                    this.model.layerName,
                    this.model.data.properties
                );
            }
            this.relFeatures = yield relFactory.getRelOptions(
                this.model.layerName,
                relRecords,
                this.model.data.properties
            );
            this.showRelFeatures();
        } catch (error) {
            console.log(error);
        }
    });

    @action hideRelFeatures = () => {
        try {
            this.relFeatures.map(feature => {
                getLayerByName(feature.layerName).updateFeatureColor(
                    feature.option
                );
            });
        } catch (error) {
            console.log(error);
        }
        this.relFeatures = [];
    };

    @action showRelFeatures = () => {
        try {
            this.relFeatures.map(feature => {
                getLayerByName(feature.layerName).updateFeatureColor(
                    feature.option,
                    'rgb(255, 87, 34)'
                );
            });
        } catch (error) {
            console.log(error);
        }
    };

    submit = flow(function*(data) {
        let historyLog = {};
        let oldFeature = _.cloneDeep(this.model);
        // this.fetchAttributes();
        if (data.rels) {
            let newRels = yield relFactory.updateRels(
                data.rels,
                this.model.layerName
            );
            historyLog.rels = [this.relRecords, newRels];
        }

        // this.fetchRels();
        if (data.attrs) {
            let newAttrs = yield attrFactory.updateAttrs(data.attrs);
            historyLog.attrs = [this.attrRecords, newAttrs];
        } else if (this.delAttrs && this.delAttrs.length > 0) {
            let delIds = this.delAttrs.map(record => record.id);
            let newAttrs = this.attrRecords.filter(
                record => !delIds.includes(record.id)
            );
            historyLog.attrs = [this.attrRecords, newAttrs];
            this.delAttrs = [];
        }
        // this.fetchAttrs();

        // model.data引用sdk要素数据的指针。修改其属性会同步修改sdk的要素数据。
        this.model.data.properties = {
            ...this.model.data.properties,
            ...data.attributes
        };
        historyLog.features = [[oldFeature], [this.model]];
        return historyLog;
    });

    spliceAttrs = flow(function*(key, index) {
        let records = this.attrs[key].splice(index, 1);
        if (records[0].id) {
            yield attrFactory.deleteRecord(records);
            this.delAttrs = (this.delAttrs || []).concat(records);
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
