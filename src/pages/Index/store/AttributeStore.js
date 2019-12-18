import { observable, configure, action, flow } from 'mobx';
import modelFactory from 'src/utils/vectorCtrl/modelFactory';
import relFactory from 'src/utils/relCtrl/relFactory';
import attrFactory from 'src/utils/attrCtrl/attrFactory';
import IDService from 'src/pages/Index/service/IDService';
import {
    getLayerIDKey,
    updateFeatureColor,
    getFeatureOption,
    getLayerByName
} from 'src/utils/vectorUtils';
import { ATTR_SPEC_CONFIG } from 'src/config/AttrsConfig';
import { DEFAULT_CONFIDENCE_MAP } from 'src/config/ADMapDataConfig';
import {
    getAllRelFeatureOptions,
    uniqOptions
} from 'src/utils/relCtrl/operateCtrl';
import { isManbuildTask } from 'src/utils/taskUtils';
import _ from 'lodash';

configure({ enforceActions: 'always' });
class AttributeStore {
    model;
    relFeatures = [];
    delAttrs = [];
    @observable visible;
    @observable type;
    @observable attributes = [];
    @observable rels = [];
    @observable attrs = {};
    @observable readonly;
    @observable modelId;

    @action show = readonly => {
        this.visible = true;
        this.readonly = readonly;
    };

    @action hide = () => {
        this.visible = false;
        this.delAttrs = [];
    };

    setModel = flow(function*(obj) {
        this.model = obj;
        this.type = this.model.layerName;
        this.fetchAttributes();
        yield this.fetchRels();
        yield this.fetchAttrs();
    });

    getModel = () => {
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
                try {
                    updateFeatureColor(feature.layerName, feature.option);
                } catch (e) {
                    console.log(e);
                }
            });
        } catch (error) {
            console.log(error);
        }
        this.relFeatures = [];
    };

    @action showRelFeatures = () => {
        try {
            this.relFeatures.map(feature => {
                try {
                    updateFeatureColor(
                        feature.layerName,
                        feature.option,
                        'rgb(31, 255, 255)'
                    );
                } catch (e) {
                    console.log(e);
                }
            });
        } catch (error) {
            console.log(error);
        }
    };

    submit = flow(function*(data, task) {
        let historyLog = {};
        let oldFeature = _.cloneDeep(this.model);
        let newFeature = _.cloneDeep(this.model);

        let relLog = yield this.calcRelLog(data.rels);
        historyLog.rels = relLog;

        let [oldRelFeatures, newRelFeatures] = this.calcRelFeaturesLog(
            relLog,
            newFeature,
            task
        );

        // 关联属性未做变更校验，全量更新
        if (data.attrs) {
            let newAttrs = attrFactory.calcNewAttrs(data.attrs);
            this.delAttrs = [];
            historyLog.attrs = [this.attrRecords, newAttrs];
        } else if (this.delAttrs && this.delAttrs.length > 0) {
            let newAttrs = this.attrRecords.filter(
                record => !this.delAttrs.includes(record.id)
            );
            this.delAttrs = [];
            historyLog.attrs = [this.attrRecords, newAttrs];
        }
        newFeature.data.properties = {
            ...this.model.data.properties,
            ...data.attributes
        };
        if (oldRelFeatures.length || newRelFeatures.length) {
            if (newFeature.data.properties.UPD_STAT) {
                let UPD_STAT = JSON.parse(newFeature.data.properties.UPD_STAT);
                UPD_STAT.RELATION = 'MOD';
                newFeature.data.properties.UPD_STAT = JSON.stringify(UPD_STAT);
            } else {
                newFeature.data.properties.UPD_STAT = '{"RELATION":"MOD"}';
            }
        }
        historyLog.features = [
            [oldFeature, ...oldRelFeatures],
            [newFeature, ...newRelFeatures]
        ];

        return historyLog;
    });

    calcRelLog = async rels => {
        if (!rels) return [[], []];
        // 变更校验，只对有变化的关联关系数据做历史记录
        let oldRels = this.rels.reduce((total, rel) => {
            total[rel.key + (rel.id || '')] = rel.value;
            return total;
        }, {});
        let changedKeys = Object.keys(oldRels).filter(key => {
            return oldRels[key] !== rels[key];
        });
        let changedIds = changedKeys.map(key =>
            parseInt(key.replace(/\D/g, ''))
        );
        let oldRelRecords = this.relRecords.filter(item => {
            return changedIds.includes(item.id);
        });
        let newRelRecords = await relFactory.calcNewRels(
            rels,
            this.model,
            changedKeys
        );
        return [oldRelRecords, newRelRecords];
    };

    calcRelFeaturesLog = (relLog, newFeature, task) => {
        if (!relLog) return [[], []];
        let allRels = [...relLog[0], ...relLog[1]];
        if (!allRels.length || isManbuildTask(task)) return [[], []];

        let allRelFeatureOptions = uniqOptions(
            getAllRelFeatureOptions(allRels)
        );
        let relFeatures = allRelFeatureOptions.reduce((total, option) => {
            if (option.value === getFeatureOption(newFeature).value) {
                return total;
            }
            let relFeature = getLayerByName(
                option.layerName
            ).getFeatureByOption(option);
            relFeature && total.push(relFeature.properties);
            return total;
        }, []);
        let newRelFeatures = _.cloneDeep(relFeatures);
        newRelFeatures.forEach(feature => {
            if (feature.data.properties.UPD_STAT) {
                let UPD_STAT = JSON.parse(feature.data.properties.UPD_STAT);
                UPD_STAT.RELATION = 'MOD';
                feature.data.properties.UPD_STAT = JSON.stringify(UPD_STAT);
            } else {
                feature.data.properties.UPD_STAT = '{"RELATION":"MOD"}';
            }
        });
        return [relFeatures, newRelFeatures];
    };

    deleteAttrs = flow(function*() {
        yield Promise.all(
            (this.delAttrs || []).map(id => {
                return attrFactory.deleteRecord(id);
            })
        );
    });

    @action spliceAttrs = (key, value) => {
        let { id, sourceId } = value;
        this.attrs[key] = this.attrs[key].filter(
            item => item.sourceId !== sourceId
        );
        id && this.delAttrs.push(id);
    };

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
            value.CONFIDENCE = DEFAULT_CONFIDENCE_MAP[key];
            let record = attrFactory.dataToTable(value, key);
            this.attrs[key] = this.attrs[key] || [];
            this.attrs[key].push(record);
        } catch (e) {
            console.log(e);
        }
    });
}

export default new AttributeStore();
