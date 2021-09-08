import { action, configure, observable, flow, toJS } from 'mobx';
import modelFactory from 'src/tool/vectorCtrl/modelFactory';
import { getLayerIDKey, getDiffFields, modUpdStatPropertiesFields } from 'src/tool/vectorUtils';
import _ from 'lodash';
import BuriedPoint from 'src/tool/buriedPoint';
import attrFactory from 'src/tool/attrFactory';
import IDService from 'src/service/idService';
import { DEFAULT_CONFIDENCE_MAP } from 'src/config/adMapDataConfig';
import { ATTR_SPEC_CONFIG } from 'src/config/attrsConfig';
configure({ enforceActions: 'always' });
class BatchAssignStore {
    @observable visible = false;
    @observable attributes = [];
    @observable attrs = [];
    @observable attrRecords = {};
    @observable attrMap = {};
    @observable layerName = '';
    @observable features = [];
    @observable updateKey;
    @observable loading = false;

    @action show = features => {
        this.features = features;
        this.visible = true;
        this.layerName = features[0].layerName;
        let properties = features.map(feature => feature.data.properties);
        this.attributes = modelFactory.getBatchAssignTableData(this.layerName, properties);
        BuriedPoint.toolBuriedPointStart('batch_assign', 'button');
        this.initAttrMap(features);
    };

    //存批量赋值的要素信息
    @action initAttrMap = flow(function* (features) {
        for (let feature of features) {
            const keyId = feature.data.properties.LANE_ID;
            const attrRecords = yield this.fetchAttrs(feature);
            this.attrMap[keyId] = { feature, attrRecords };
        }
    });

    hide = channel => {
        this.visible && BuriedPoint.toolBuriedPointEnd('batch_assign', channel);
        this.release();
    };

    fetchAttrs = flow(function* (feature) {
        try {
            const attrRecords = yield attrFactory.getFeatureAttrs(
                feature.layerName,
                feature.data.properties
            );
            return attrRecords;
        } catch (error) {
            console.log(error);
        }
    });

    @action spliceAttrs = (key, value) => {
        let { sourceId } = value;
        this.attrs[key] = this.attrs[key].filter(item => item.sourceId !== sourceId);
    };

    @action newAttr = (key, value) => {
        try {
            let record = attrFactory.dataToTable(value, key);
            this.attrs[key] = this.attrs[key] || [];
            this.attrs[key].push(record);
            this.updateKey = Math.random();
        } catch (e) {
            console.log(e);
            message.warning('请求ID失败：' + e.message, 3);
        }
    };

    calcAttrLog = (attrs, key) => {
        if (attrs) {
            let newAttrs = attrFactory.calcNewAttrs(attrs);
            return attrFactory.calcDiffAttrs(this.attrMap[key].attrRecords, newAttrs);
        }
        return [[], []];
    };

    addProperties = flow(function* (feature, attrFormData, attrType) {
        const _result = yield IDService.initID({
            id_type: attrType
        });
        const id = _result.data[0].min;
        const IDKey = getLayerIDKey(attrType);
        const MainKey = ATTR_SPEC_CONFIG.find(config => config.source == attrType);
        const MainFId = MainKey.key;
        const properties = feature.data.properties;
        const attrs = {
            ...attrFormData,
            key: properties[MainFId],
            sourceId: id,
            properties: {
                ...attrFormData.properties,
                [MainFId]: properties[MainFId],
                [IDKey]: id,
                CONFIDENCE: DEFAULT_CONFIDENCE_MAP[attrType],
                COLL_TIME: '',
                MAKE_TIME: '',
                UPD_STAT: '{}'
            }
        };
        return attrs;
    });

    getAttrLog = flow(function* (feature, data, key, attrType) {
        if (!data.attrs) return [[], []];
        const attrFormData = data.attrs[attrType][0];
        const attrs = yield this.addProperties(feature, attrFormData, attrType);
        let [oldAttrs, newAttrs] = this.calcAttrLog({ [attrType]: [attrs] }, key);
        oldAttrs = oldAttrs.map(item => {
            return toJS(item);
        });
        return [oldAttrs, newAttrs];
    });

    @action submit = flow(function* (data, attrType) {
        this.loading = true;
        let batchOldFeature = [];
        let batchNewFeature = [];
        let batchOldAttr = [];
        let batchNewAttr = [];
        for (let key in this.attrMap) {
            const feature = this.attrMap[key].feature;
            const [oldAttrs, newAttrs] = yield this.getAttrLog(feature, data, key, attrType);
            let oldFeature = _.cloneDeep(feature);
            let newFeature = _.cloneDeep(feature);

            //维护属性的更新标识
            let diffFields = getDiffFields(newFeature, data.attributes);
            newFeature.data.properties = {
                ...newFeature.data.properties,
                ...data.attributes
            };
            newFeature = modUpdStatPropertiesFields(newFeature, diffFields);

            batchOldFeature = [...batchOldFeature, oldFeature];
            batchNewFeature = [...batchNewFeature, newFeature];
            batchOldAttr = [...batchOldAttr, ...oldAttrs];
            batchNewAttr = [...batchNewAttr, ...newAttrs];
        }
        this.hide();
        const batchHistoryLog = {
            features: [batchOldFeature, batchNewFeature]
        };
        if (data.attrs) batchHistoryLog.attrs = [batchOldAttr, batchNewAttr];
        this.loading = false;
        return batchHistoryLog;
    });

    @action release = () => {
        this.visible = false;
        this.attributes = [];
        this.attrs = [];
        this.attrRecords = {};
        this.attrMap = {};
        this.layerName = '';
        this.features = [];
        this.loading = false;
    };
}

export default new BatchAssignStore();
