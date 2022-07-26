import { observable, configure, action, flow } from 'mobx';
import modelFactory from 'src/util/vectorCtrl/modelFactory';
import relFactory from 'src/util/relCtrl/relFactory';
import attrFactory from 'src/util/attrFactory';
import IDService from 'src/service/idService';
import {
    getLayerIDKey,
    updateFeatureColor,
    getFeatureOption,
    getLayerByName,
    modUpdStatRelation,
    getDiffFields,
    modUpdStatPropertiesFields
} from 'src/util/vectorUtils';
import { ATTR_SPEC_CONFIG } from 'src/config/attrsConfig';
import { DEFAULT_CONFIDENCE_MAP } from 'src/config/adMapDataConfig';
import { getAllRelFeatureOptions, uniqOptions } from 'src/util/relCtrl/operateCtrl';
import { isManbuildTask } from 'src/util/taskUtils';
import _ from 'lodash';
import { message } from 'antd';
import RenderModeStore from './renderModeStore';
import TaskStore from 'src/store/home/taskStore';
import BuriedPoint from 'src/util/buriedPoint';
import { TYPE_SELECT_OPTION_MAP } from 'src/config/adMapDataConfig';
import { setAttributes } from 'src/util/utils';
const LOAD_DATA_MESSAGE = '加载数据中...';

configure({ enforceActions: 'always' });
class AttributeStore {
    model;
    relFeatures = [];
    delAttrs = [];
    @observable visible;
    @observable attrListVisible = false;
    @observable layerName;
    @observable attributes = [];
    @observable rels = [];
    @observable attrs = {};
    @observable readonly;
    @observable modelId;
    @observable loading = false;
    @observable loadingMessage;
    @observable timeVisible = true;
    @observable updateKey;

    @action show = (readonly, obj) => {
        const modelId = obj.data.properties[getLayerIDKey(this.layerName)];
        if (this.modelId !== modelId) {
            if (!this.readonly && this.visible) {
                BuriedPoint.toolBuriedPointEnd('attr_edit_modal', 'toggle_select');
            }
            if (!readonly) {
                BuriedPoint.toolBuriedPointStart('attr_edit_modal', 'open');
            }
        }
        this.visible = true;
        this.readonly = readonly;
        this.modelId = modelId;
        this.updateKey = Math.random();
    };

    @action hide = channel => {
        if (!this.readonly && this.visible) {
            BuriedPoint.toolBuriedPointEnd('attr_edit_modal', channel);
        }
        this.visible = false;
        this.delAttrs = [];
        this.modelId = null;
        this.loaded();
        this.showTime(true);
    };

    @action attrListShow = channel => {
        this.attrListVisible = true;
        BuriedPoint.modalBuriedPointStart('attr_list', channel);
    };

    @action attrListHide = channel => {
        this.attrListVisible = false;
        BuriedPoint.modalBuriedPointEnd('attr_list', channel);
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
        this.layerName = obj.layerName;
        this.fetchAttributes();
        yield this.fetchRels();
        yield this.fetchAttrs();
        this.toggleEvent && this.toggleEvent();
        this.loaded();
    });

    getModel = () => {
        return this.model;
    };

    @action fetchAttributes = (extraAttrubutes = []) => {
        let baseAttributes = modelFactory.getTabelData(
            this.model.layerName,
            this.model.data.properties
        );
        this.attributes = (baseAttributes || []).concat(extraAttrubutes);
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
        this.relFeatures.forEach(feature => {
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
            this.relFeatures.forEach(feature => {
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
        // 提交保存数据  
        if (data !== undefined && data?.attrs !== undefined && data?.attrs.AD_Lane_RS !== undefined || data?.attrs?.AD_Lane_Speed !== undefined) {
            const objValue = setAttributes(data.attrs);
            if (data?.attributes) {
                if (data.attributes.RS_VALUE !== objValue.rsvalue) {
                    data.attributes.RS_VALUE = objValue.rsvalue;
                }
                else {
                    data.attributes.RS_VALUE = "";
                }
                if (data.attributes.SPEED !== objValue.speed) {
                    data.attributes.SPEED = objValue.speed;
                }
                else {
                    data.attributes.SPEED = "";
                }
            }
        }
        if (data?.attrs === undefined) {
            if (this.model?.data?.properties?.RS_VALUE !== undefined) {
                this.model.data.properties.RS_VALUE = '';
            }
            if (this.model?.data?.properties?.SPEED !== undefined) {
                this.model.data.properties.SPEED = '';
            }
        }
        let relLog = yield this.calcRelLog(data);
        let attrLog = this.calcAttrLog(data.attrs);
        let oldFeature = _.cloneDeep(this.model);
        let newFeature = _.cloneDeep(this.model);
        //维护属性的更新标识
        let diffFields = getDiffFields(newFeature, data.attributes);
        newFeature.data.properties = {
            ...newFeature.data.properties,
            ...data.attributes
        };
        newFeature = modUpdStatPropertiesFields(newFeature, diffFields);
        let historyLog = {
            features: [[oldFeature], [newFeature]],
            rels: relLog,
            attrs: attrLog
        };

        //人工构建任务和本地任务需要维护关联关系的更新标识
        if (isManbuildTask() || TaskStore.activeTask.isLocal) {
            //查找出当前修改影响到的关联要素，oldRelFeatures是关联要素被影响前，newRelFeatures是关联要素被影响后
            let [oldRelFeatures, newRelFeatures] = this.calcRelFeaturesLog(relLog, newFeature);
            //如果修改了关联关系，则更新当前要素“更新标识”
            if (oldRelFeatures.length || newRelFeatures.length) {
                newFeature = modUpdStatRelation(newFeature);
            }
            historyLog.features = [
                [oldFeature, ...oldRelFeatures],
                [newFeature, ...newRelFeatures]
            ];
        }

        return historyLog;
    });



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
            _.cloneDeep(changedKeys),
            data
        );
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
        if (!allRels.length) return [[], []];

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
            properties = properties || this.model.data.properties;
            // 临时注销
            // if (key === 'AD_Lane_Speed') {
            //     if (value?.UPD_STAT) {
            //         let UPD_STAT = JSON.parse(value.UPD_STAT);
            //         UPD_STAT.PRECOMPLIER_STAT = 'MAN';
            //         value.UPD_STAT = JSON.stringify(UPD_STAT);
            //     } else {
            //         value.UPD_STAT = '{"PRECOMPLIER_STAT":"MAN"}';
            //     }  
            //     Object.assign(value, {
            //         [MainFId]: properties[MainFId],
            //         [IDKey]: id,
            //         CONFIDENCE: DEFAULT_CONFIDENCE_MAP[key],
            //         COLL_TIME: '',
            //         MAKE_TIME: '',
            //         UPD_STAT:  value.UPD_STAT,
            //         TILE_ID: ''
            //     });
            // }
            // else {
                Object.assign(value, {
                    [MainFId]: properties[MainFId],
                    [IDKey]: id,
                    CONFIDENCE: DEFAULT_CONFIDENCE_MAP[key],
                    COLL_TIME: '',
                    MAKE_TIME: '',
                    UPD_STAT: '{}',
                    TILE_ID: ''
                });
            // }

            let record = attrFactory.dataToTable(value, key);
            this.attrs[key] = this.attrs[key] || [];
            this.attrs[key].push(record);
            this.updateKey = Math.random();
        } catch (e) {
            console.log(e);
            message.warning('请求ID失败：' + e.message, 3);
        }
    });

    addToggleListener = toggleEvent => {
        this.toggleEvent = toggleEvent;
    };

    @action showTime = visible => {
        this.timeVisible = visible;
    };
}

export default new AttributeStore();
