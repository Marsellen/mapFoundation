import { observable, configure, action, flow } from 'mobx';
import modelFactory from 'src/utils/vectorCtrl/modelFactory';
import relFactory from 'src/utils/relCtrl/relFactory';
import attrFactory from 'src/utils/attrCtrl/attrFactory';
import IDService from 'src/services/IDService';
import {
    getLayerIDKey,
    updateFeatureColor,
    getFeatureOption,
    getLayerByName,
    modUpdStatRelation,
    modUpdStatProperties
} from 'src/utils/vectorUtils';
import {
    ATTR_SPEC_CONFIG,
    MOD_UPD_STAT_RELATION_LAYERS
} from 'config/AttrsConfig';
import { DEFAULT_CONFIDENCE_MAP } from 'config/ADMapDataConfig';
import {
    getAllRelFeatureOptions,
    uniqOptions
} from 'src/utils/relCtrl/operateCtrl';
import { isManbuildTask } from 'src/utils/taskUtils';
import _ from 'lodash';
import { message } from 'antd';
import RenderModeStore from './RenderModeStore';
import appStore from 'src/store/appStore';

const LOAD_DATA_MESSAGE = '加载数据中...';

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
    @observable loading = false;
    @observable loadingMessage;

    @action show = readonly => {
        this.visible = true;
        this.readonly = readonly;
    };

    @action hide = () => {
        this.visible = false;
        this.delAttrs = [];
        this.loaded();
    };

    @action showLoading = text => {
        this.loading = true;
        this.loadingMessage = text;
    };

    @action loaded = () => {
        this.loading = false;
    };

    setModel = flow(function* (obj) {
        this.showLoading(LOAD_DATA_MESSAGE);
        this.model = obj;
        this.type = this.model.layerName;
        this.fetchAttributes();
        yield this.fetchRels();
        yield this.fetchAttrs();
        this.toggleEvent && this.toggleEvent();
        this.loaded();
    });

    getModel = () => {
        return this.model;
    };

    @action fetchAttributes = () => {
        const qualityCreatedPoint = appStore.loginUser.roleCode === 'quality'; //质检员登录新建标记点
        const producerCreatedPoint = appStore.loginUser.roleCode === 'producer'; //返工返修作业员登录新建标记点
        let properties = {
            ...this.model.data.properties,
            QC_PERSON:
                qualityCreatedPoint && !this.model.data.properties.QC_PERSON
                    ? appStore.loginUser.name
                    : this.model.data.properties.QC_PERSON,
            FIX_PERSON:
                producerCreatedPoint && !this.model.data.properties.FIX_PERSON
                    ? appStore.loginUser.name
                    : this.model.data.properties.FIX_PERSON
        };
        this.attributes = modelFactory.getTabelData(
            this.model.layerName,
            properties
        );
    };

    fetchRels = flow(function* () {
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

    fetchAttrs = flow(function* () {
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

    getRelFeatureOptions = flow(function* (relRecords) {
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
    });

    commonFetchRelFeatures = async relRecords => {
        this.hideRelFeatures();
        await this.getRelFeatureOptions(relRecords);
        this.showRelFeatures();
    };

    commonHideRelFeatures = () => {
        this.relFeatures.map(feature => {
            try {
                updateFeatureColor(feature.layerName, feature.option);
            } catch (e) {
                console.log(e);
            }
        });
    };

    fetchRelFeatures = async relRecords => {
        try {
            const { activeMode, selectFeature, cancelSelect } = RenderModeStore;
            //选中要素时，不同渲染模式不同变色方式
            switch (activeMode) {
                case 'common':
                    await this.commonFetchRelFeatures(relRecords);
                    break;
                case 'relation':
                    cancelSelect();
                    selectFeature(this.model);
                    this.getRelFeatureOptions(relRecords);
                    break;
                default:
                    await this.commonFetchRelFeatures(relRecords);
                    break;
            }
        } catch (error) {
            console.log(error);
        }
    };

    @action hideRelFeatures = () => {
        try {
            const { activeMode, cancelSelect } = RenderModeStore;
            //取消选中时，不同渲染模式不同变色方式
            switch (activeMode) {
                case 'common':
                    this.commonHideRelFeatures();
                    break;
                case 'relation':
                    cancelSelect();
                    break;
                default:
                    this.commonHideRelFeatures();
                    break;
            }
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
                        'rgb(49,209,255)'
                    );
                } catch (e) {
                    console.log(e);
                }
            });
        } catch (error) {
            console.log(error);
        }
    };

    submit = flow(function* (data) {
        let relLog = yield this.calcRelLog(data.rels);

        let attrLog = this.calcAttrLog(data.attrs);

        let oldFeature = _.cloneDeep(this.model);
        let newFeature = _.cloneDeep(this.model);

        if (!isManbuildTask()) {
            newFeature = modUpdStatProperties(newFeature, data.attributes);
        }
        newFeature.data.properties = {
            ...newFeature.data.properties,
            ...data.attributes
        };

        // 人工识别无法编辑关联关系，人工构建不维护“更新状态标识”字段
        // let [oldRelFeatures, newRelFeatures] = this.calcRelFeaturesLog(
        //     relLog,
        //     newFeature,
        //     task
        // );
        // if (oldRelFeatures.length || newRelFeatures.length) {
        //     newFeature = modUpdStatRelation(newFeature);
        // }
        // historyLog.features = [
        //     [oldFeature, ...oldRelFeatures],
        //     [newFeature, ...newRelFeatures]
        // ];
        if (
            (attrLog[0].length || attrLog[1].length) &&
            MOD_UPD_STAT_RELATION_LAYERS.includes(newFeature.layerName)
        ) {
            newFeature = modUpdStatRelation(newFeature);
        }
        let historyLog = {
            features: [[oldFeature], [newFeature]],
            rels: relLog,
            attrs: attrLog
        };
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

    calcRelFeaturesLog = (relLog, newFeature) => {
        if (!relLog) return [[], []];
        let allRels = [...relLog[0], ...relLog[1]];
        if (!allRels.length || isManbuildTask()) return [[], []];

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

    calcAttrLog = attrs => {
        if (attrs) {
            let newAttrs = attrFactory.calcNewAttrs(attrs);
            return attrFactory.calcDiffAttrs(this.attrRecords, newAttrs);
        } else if (this.delAttrs && this.delAttrs.length > 0) {
            let newAttrs = this.attrRecords.filter(
                record => !this.delAttrs.includes(record.id)
            );
            return attrFactory.calcDiffAttrs(this.attrRecords, newAttrs);
        }
        this.deleteAttrs();
        return [[], []];
    };

    @action deleteAttrs = () => {
        this.delAttrs = [];
    };

    @action spliceAttrs = (key, value) => {
        let { id, sourceId } = value;
        this.attrs[key] = this.attrs[key].filter(
            item => item.sourceId !== sourceId
        );
        id && this.delAttrs.push(id);
    };

    newAttr = flow(function* (key, value, properties) {
        try {
            const _result = yield IDService.initID({
                id_type: key
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
            message.warning('请求ID失败：' + e.message, 3);
        }
    });

    addToggleListener = toggleEvent => {
        this.toggleEvent = toggleEvent;
    };
}

export default new AttributeStore();
