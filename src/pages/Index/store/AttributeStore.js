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
import { ATTR_SPEC_CONFIG, MOD_UPD_STAT_RELATION_LAYERS } from 'config/AttrsConfig';
import { DEFAULT_CONFIDENCE_MAP } from 'config/ADMapDataConfig';
import { getAllRelFeatureOptions, uniqOptions } from 'src/utils/relCtrl/operateCtrl';
import { isManbuildTask } from 'src/utils/taskUtils';
import _ from 'lodash';
import { message } from 'antd';
import RenderModeStore from './RenderModeStore';
import appStore from 'src/store/appStore';
import VectorsStore from 'src/pages/Index/store/VectorsStore';
import { LAYER_NAME_MAP } from 'src/config/RenderModeConfig';

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
        if (
            qualityCreatedPoint &&
            this.model.data.properties.ID &&
            !this.model.data.properties.QC_PERSON
        ) {
            this.model.data.properties.QC_PERSON = appStore.loginUser.name;
        }
        this.attributes = modelFactory.getTabelData(
            this.model.layerName,
            this.model.data.properties
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
            if (activeMode === 'relation') {
                cancelSelect();
                selectFeature(this.model);
                this.getRelFeatureOptions(relRecords);
            } else {
                await this.commonFetchRelFeatures(relRecords);
            }
        } catch (error) {
            console.log(error);
        }
    };

    @action hideRelFeatures = () => {
        try {
            const { activeMode, cancelSelect } = RenderModeStore;
            //取消选中时，不同渲染模式不同变色方式
            if (activeMode === 'relation') {
                cancelSelect();
            } else {
                this.commonHideRelFeatures();
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
                    updateFeatureColor(feature.layerName, feature.option, 'rgb(49,209,255)');
                } catch (e) {
                    console.log(e);
                }
            });
        } catch (error) {
            console.log(error);
        }
    };

    submit = flow(function* (data) {
        let relLog = yield this.calcRelLog(data);

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

    handleUniqChangedKeys = (changedRelMap, uniqChangedKeys, data) => {
        //获取当前修改要素的direction
        const { attributes: { DIRECTION: mainFeatureDirection } = {} } = data;
        //不需要做重复性校验的特殊关联关系key，车道中心线连接关系，道路参考线连接关系
        const specialRelKeys = ['FROM_LANE', 'TO_LANE', 'FROM_ROAD', 'TO_ROAD'];
        //遍历改变的关联关系，当改变车道中心线连接关系或道路参考线连接关系时，
        //当主要素或者关联要素的direction===3时，不做重复性校验，重新加到uniqChangedKeys数组
        Object.keys(changedRelMap).forEach(key => {
            const relKey = key.replace(/\d/g, '');
            if (specialRelKeys.includes(relKey)) {
                if (mainFeatureDirection === 3) return uniqChangedKeys.push(key);
                const { key: optionKey, layerName } = LAYER_NAME_MAP[relKey] || {};
                const featureId = changedRelMap[key];
                const option = { key: optionKey, value: featureId };
                const feature = VectorsStore.vectorLayerMap[layerName].getFeatureByOption(option);
                const { DIRECTION } = feature?.properties?.data?.properties ?? {};
                if (DIRECTION === 3) return uniqChangedKeys.push(key);
            }
        });
        return [...new Set(uniqChangedKeys)]; //去重
    };

    calcRelLog = async data => {
        const { rels } = data;
        if (!rels) return [[], []];
        // 变更校验，只对有变化的关联关系数据做历史记录
        let oldRels = this.rels.reduce((total, rel) => {
            total[rel.key + (rel.id || '')] = rel.value;
            return total;
        }, {});
        let changedRelMap = {};
        let changedKeys = Object.keys(oldRels).filter(key => {
            if (oldRels[key] !== rels[key]) {
                changedRelMap[key] = rels[key];
                return true;
            }
            return false;
        });
        let uniqChangedKeys = relFactory.calcUniqChangedKeys(
            _.cloneDeep(rels),
            oldRels,
            _.cloneDeep(changedKeys)
        );
        //将不需要去重的关联关系再添加回来
        uniqChangedKeys = this.handleUniqChangedKeys(changedRelMap, uniqChangedKeys, data);
        if (changedKeys.length > 0 && uniqChangedKeys.length == 0) {
            message.error('修改关系失败，重复创建关联关系');
        } else if (changedKeys.length > uniqChangedKeys.length) {
            message.warning('修改关系部分成功，存在重复的创建关联关系');
        }
        let changedIds = uniqChangedKeys.map(key => parseInt(key.replace(/\D/g, '')));
        let oldRelRecords = this.relRecords.filter(item => {
            return changedIds.includes(item.id);
        });
        let newRelRecords = await relFactory.calcNewRels(rels, this.model, uniqChangedKeys);
        return [oldRelRecords, newRelRecords];
    };

    calcRelFeaturesLog = (relLog, newFeature) => {
        if (!relLog) return [[], []];
        let allRels = [...relLog[0], ...relLog[1]];
        if (!allRels.length || isManbuildTask()) return [[], []];

        let allRelFeatureOptions = uniqOptions(getAllRelFeatureOptions(allRels));
        let relFeatures = allRelFeatureOptions.reduce((total, option) => {
            if (option.value === getFeatureOption(newFeature).value) {
                return total;
            }
            let relFeature = getLayerByName(option.layerName).getFeatureByOption(option);
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
            let newAttrs = this.attrRecords.filter(record => !this.delAttrs.includes(record.id));
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
        this.attrs[key] = this.attrs[key].filter(item => item.sourceId !== sourceId);
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
