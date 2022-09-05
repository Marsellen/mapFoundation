import { action, configure, observable, flow, toJS } from 'mobx';
import modelFactory from 'src/util/vectorCtrl/modelFactory';
import {
    getLayerIDKey,
    modUpdStatPropertiesFields,
    getFeatureInfo
} from 'src/util/vectorUtils';
import _ from 'lodash';
import BuriedPoint from 'src/util/buriedPoint';
import attrFactory from 'src/util/attrFactory';
import IDService from 'src/service/idService';
import { DEFAULT_CONFIDENCE_MAP } from 'src/config/adMapDataConfig';
import { ATTR_SPEC_CONFIG } from 'src/config/attrsConfig';
import { setAttributes } from 'src/util/utils';
import { IFDEntry } from '@ad/xmap';
configure({ enforceActions: 'always' });
class BatchAssignStore {
    @observable visible = false;
    @observable attributes = [];
    @observable attrs = [];
    @observable attrRecords = {};
    @observable attrMap = {};
    attrMapClone = [];
    @observable layerName = '';
    @observable features = [];
    @observable updateKey;
    @observable loading = false;
    // 记录删除信息
    delAttrs = [];
    // 标记是否删除最高最低限速
    isDelSpeed = {
        high: false,
        low: false,
        delRS: false
    }
    // 是否修改限速
    speedValue = [];
    @action show = features => {
        this.features = features;
        this.visible = true;
        this.layerName = features[0].layerName;
        let properties = features.map(feature => feature.data.properties);
        this.attributes = modelFactory.getBatchAssignTableData(this.layerName, properties);
        BuriedPoint.toolBuriedPointStart('batch_assign', 'button');
        // 查询 全部限制和限速  this.attrs 第一次查询结果，只展示 限制
        this.initAttrMap(features);
    };

    //存批量赋值的要素信息
    @action initAttrMap = flow(function* (features) {
        // 赋值所有限制和限速数据
        for (let i = 0; i < features.length; i++) {
            let feature = features[i];
            const featureInfo = getFeatureInfo(feature);
            const featureId = featureInfo.value;
            const attrRecords = yield this.fetchAttrs(feature, featureId);
            this.attrMap[featureId] = { feature, attrRecords };
        }
        this.updateKey = Math.random();

        this.attrMapClone = JSON.parse(JSON.stringify(Object.entries(this.attrMap)));

        // 记录是否全部为空
        let index = -1;
        // 记录 数量是否超过 2以上
        let maxAttrCount = -1;
        // 判断是否 有为空的数据
        let isRSnull = false;
        let attrsRS = [];
        this.attrMapClone.forEach((item, i) => {
            if (item[1].attrRecords.length > 0) {
                let recordsRS = item[1].attrRecords.filter(t => t.source === "AD_Lane_RS");
                if (recordsRS && recordsRS.length > 0) {
                    index = i;
                }
                if (recordsRS && recordsRS.length > 1) {
                    maxAttrCount = recordsRS.length;
                }
                else if (recordsRS.length === 1) {
                    attrsRS.push(recordsRS[0]);
                }
                else if (recordsRS.length === 0) {
                    isRSnull = true;
                }
            }
            else {
                isRSnull = true;
            }
        });
        // 1.===0 判断如果 全部为空 ，不会做多项内容显示  ,不做赋值，处理
        // 2.<=1  如果完全相同，可以展示实际值，如果完全不同，多想内容展示 (a.完全一致 b.一个为空，一个不为空 c.两个都不为空)
        // 3. >1  直接为 多项内容
        if (index > -1) {
            // 1 其中一个为空   2 数量大于 1
            if (isRSnull || maxAttrCount > 1) {
                this.attrs.AD_Lane_RS = [];
                let obj = {
                    source: "AD_Lane_RS",
                    spec: "AD_Lane",
                    properties: {
                        RS_ID: '(多项内容)',
                        RS_TYPE: '(多项内容)',
                        RS_VALUE: "(多项内容)",
                        TIMEDOM: "(多项内容)"
                    }
                };
                this.attrs?.AD_Lane_RS.push(obj);
            }
            else {
                if (attrsRS.length > 0) {
                    let attrFirst = JSON.parse(JSON.stringify(attrsRS[0]));
                    attrFirst.properties.RS_ID = '(多项内容)';
                    attrsRS?.forEach(item => {
                        if (attrFirst?.properties?.RS_TYPE !== item?.properties?.RS_TYPE) {
                            attrFirst.properties.RS_TYPE = '(多项内容)';
                            attrFirst.properties.RS_VALUE = '(多项内容)';
                        }
                        if (attrFirst?.properties?.RS_VALUE !== item?.properties?.RS_VALUE) {
                            attrFirst.properties.RS_VALUE = '(多项内容)';
                        }
                        if (attrFirst?.properties?.TIMEDOM !== item?.properties?.TIMEDOM) {
                            attrFirst.properties.TIMEDOM = '(多项内容)';
                        }
                    })
                    if (this.attrs.length === 0) {
                        this.attrs.AD_Lane_RS = [];
                    }
                    this.attrs.AD_Lane_RS.push(attrFirst);
                }
            }
        }
    });
    hide = channel => {
        this.visible && BuriedPoint.toolBuriedPointEnd('batch_assign', channel);
        this.release();
    };

    fetchAttrs = flow(function* (feature, index) {
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
        if (value.properties.RS_ID === '(多项内容)') {
            this.isDelSpeed.delRS = true;
            this.attrMapClone.forEach((item, i) => {
                if (item[1].attrRecords.length > 0) {
                    if (item[1].attrRecords.length > 0) {
                        let oldData = item[1].attrRecords.filter((t) => {
                            return t.source === "AD_Lane_RS";
                        });
                        if (oldData !== undefined) {
                            if (this.delAttrs[item[0]] && this.delAttrs[item[0]].length > 0) {
                                oldData.forEach(old => {
                                    this.delAttrs[item[0]].push(old);
                                })
                            }
                            else {
                                this.delAttrs[item[0]] = oldData;
                            }
                        }
                    }
                }
            });
            if (this.attrs?.AD_Lane_RS?.length <= 1) {
                delete this.attrs.AD_Lane_RS;
            }
            else {
                this.attrs.AD_Lane_RS.splice(0, 1);
            }
        }
        else {
            let { sourceId } = value;
            this.attrs[key] = this.attrs[key].filter(item => item.sourceId !== sourceId);
        }
    };

    @action newAttr = (key, value) => {
        try {

            if (key === 'AD_Lane_Speed') {
                value.UPD_STAT = '{"PRECOMPLIER_STAT":"MAN"}';
            }
            let record = attrFactory.dataToTable(value, key);
            this.attrs[key] = this.attrs[key] || [];
            this.attrs[key].push(record);
            this.updateKey = Math.random();
        } catch (e) {
            console.log(e);
            message.warning('请求ID失败：' + e.message, 3);
        }
    };

    /**
     *
     *  编辑限速
     * @param {*} key
     * @param {*} value
     * @param {*} title
     */
    @action editAttr = (value, title) => {
        try {
            if (value?.UPD_STAT) {
                let UPD_STAT = JSON.parse(value.UPD_STAT);
                UPD_STAT.PRECOMPLIER_STAT = 'MAN';
                value.UPD_STAT = JSON.stringify(UPD_STAT);
            } else {
                value.UPD_STAT = '{"PRECOMPLIER_STAT":"MAN"}';
            }
            if (title === '最高限速批量修改') {
                this.speedValue[0] = value;
            }
            else if (title === '最低限速批量修改') {
                this.speedValue[1] = value;
            }
        } catch (e) {
            console.log(e);
            message.warning('请求ID失败：' + e.message, 3);
        }
    };
    /**
     *
     * 删除限速批量赋值
     * @param {*} value
     */
    @action onBatchAssignDelete = (value) => {
        if (value === 1) {
            this.isDelSpeed.high = true;
        }
        else if (value === 2) {
            this.isDelSpeed.low = true;
        }
        this.attrMapClone.forEach((item, i) => {
            if (item[1].attrRecords.length > 0) {
                if (item[1].attrRecords.length > 0) {
                    let oldData = item[1].attrRecords.filter((t) => {
                        return t.properties.SPD_TYPE === value && t.source === "AD_Lane_Speed";
                    });
                    if (oldData !== undefined && oldData.length > 0) {
                        if (this.delAttrs[item[0]] && this.delAttrs[item[0]].length > 0) {
                            oldData.forEach(old => {
                                this.delAttrs[item[0]].push(old);
                            })
                        }
                        else {
                            this.delAttrs[item[0]] = oldData;
                        }
                    }
                }
            }
        });
    }

    calcAttrLog = (attrs, key) => {
        if (attrs) {
            let newAttrs = attrFactory.calcNewAttrs(attrs);
            return attrFactory.calcDiffAttrs(this.attrMap[key].attrRecords, newAttrs);
        }
        return [[], []];
    };

    @action deleteAttrs = () => {
        this.delAttrs = [];
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
        const featureId = properties[MainFId];
        const attrs = {
            ...attrFormData,
            key: featureId,
            sourceId: id,
            properties: {
                ...attrFormData.properties,
                [MainFId]: featureId,
                [IDKey]: id,
                CONFIDENCE: DEFAULT_CONFIDENCE_MAP[attrType],
                COLL_TIME: '',
                MAKE_TIME: '',
                UPD_STAT: attrFormData?.properties?.UPD_STAT || '{}',
                TILE_ID: ''
            }
        };
        return attrs;
    });

    getAttrLog = flow(function* (feature, data, key, attrType) {
        let attrFormData = [];
        if (!data.attrs || !data.attrs[attrType]) return [[], []];
        let attrsData = data.attrs[attrType];
        for (let ii = 0; ii < attrsData.length; ii++) {
            const attrs = yield this.addProperties(feature, attrsData[ii], attrType);
            attrFormData.push(attrs);
        }
        let [oldAttrs, newAttrs] = this.calcAttrLog({ [attrType]: attrFormData }, key);
        oldAttrs = oldAttrs.map(item => {
            return toJS(item);
        });
        return [oldAttrs, newAttrs];
    });
    @action submit = flow(function* (data, attrType) {
        this.loading = true;
        let { attrs, attributes } = data;
        // 判断属性是否修改
        let isAttributes = false;
        Object.entries(attributes).forEach(item => {
            let oldAttribute = this.attributes.filter((t) => {
                return t.key === item[0];
            });
            if (oldAttribute.length > 0) {
                if (oldAttribute[0].value != item[1]) {
                    isAttributes = true;
                }
            }
            else {
                isAttributes = true;
            }
        })

        // 是否存在多项内容
        let RS_TYPE; let RS_VALUE; let TIMEDOM;
        let isDelType = false;
        let batchOldFeature = [];
        let batchNewFeature = [];
        let batchOldAttr = [];
        let batchNewAttr = [];
        let oldAttrs = [];
        let newAttrs = [];
        if (attrs !== undefined) {
            if (attrs?.AD_Lane_RS !== undefined) {
                if (attrs?.AD_Lane_RS.length === 1 && attrs?.AD_Lane_Speed === undefined && this.delAttrs.length == 0) {
                    if (attrs?.AD_Lane_RS[0]?.properties?.RS_ID === '(多项内容)') {
                        if (this.attrs?.AD_Lane_RS[0]?.properties.RS_TYPE === attrs?.AD_Lane_RS[0]?.properties.RS_TYPE
                            && this.attrs?.AD_Lane_RS[0]?.properties.RS_VALUE === attrs?.AD_Lane_RS[0].properties.RS_VALUE
                            && this.attrs?.AD_Lane_RS[0]?.properties.TIMEDOM === attrs?.AD_Lane_RS[0]?.properties.TIMEDOM) {
                            // 不做任何修改
                            if (this.speedValue.length === 0 && !isAttributes) {
                                // 未做任何修改
                                this.hide();
                                this.loading = false
                                return null;
                            }
                        }
                    }
                }
                if (attrs?.AD_Lane_RS.length > 0) {
                    if (attrs?.AD_Lane_RS[0]?.properties?.RS_ID === '(多项内容)') {
                        isDelType = true;
                        if (attrs?.AD_Lane_RS[0]?.properties?.RS_TYPE !== '(多项内容)') {
                            RS_TYPE = attrs.AD_Lane_RS[0].properties.RS_TYPE;
                        }
                        if (attrs?.AD_Lane_RS[0]?.properties?.RS_VALUE !== '(多项内容)') {
                            RS_VALUE = attrs.AD_Lane_RS[0].properties.RS_VALUE;
                        }
                        if (attrs?.AD_Lane_RS[0]?.properties?.TIMEDOM !== '(多项内容)') {
                            TIMEDOM = attrs.AD_Lane_RS[0].properties.TIMEDOM;
                        }
                    }
                }
            }
            else {
                // 无限制信息，可能存在限速信息
                if (this.speedValue.length === 0 && attrs?.AD_Lane_Speed === undefined && !isAttributes) {
                    // 未做任何修改
                    this.hide();
                    this.loading = false
                    return null;
                }
            }
        }
        // 初始化 限制数据
        // 查询历史数据，并赋值
        this.attrMapClone.forEach((item) => {
            // 限制
            if (attrs !== undefined && !this.isDelSpeed.delRS) {
                if (attrs?.AD_Lane_RS !== undefined) {
                    let oldData = item[1].attrRecords.filter((t) => {
                        return t.source === 'AD_Lane_RS';
                    });
                    if (oldData !== undefined && oldData.length > 0) {
                        oldData.forEach(oldItem => {
                            let iitem = JSON.parse(JSON.stringify(oldItem));
                            if (iitem?.properties?.RS_TYPE !== undefined) {
                                iitem.properties.RS_TYPE = RS_TYPE === undefined ? oldItem.properties.RS_TYPE : RS_TYPE;
                            }
                            if (iitem?.properties?.RS_VALUE !== undefined) {
                                iitem.properties.RS_VALUE = RS_VALUE === undefined ? oldItem.properties.RS_VALUE : RS_VALUE;
                            }
                            if (iitem?.properties?.TIMEDOM !== undefined) {
                                iitem.properties.TIMEDOM = TIMEDOM === undefined ? oldItem.properties.TIMEDOM : TIMEDOM;
                            }

                            attrs.AD_Lane_RS.push(iitem);
                        })
                    }
                    else {
                        if (RS_TYPE !== undefined || RS_VALUE !== undefined || TIMEDOM !== undefined) {
                            let obj = {
                                key: Number(item[0]),
                                source: "AD_Lane_RS",
                                spec: "AD_Lane",
                                properties: {
                                    RS_TYPE: RS_TYPE === undefined ? oldItem.properties.RS_TYPE : RS_TYPE,
                                    RS_VALUE: RS_VALUE === undefined ? oldItem.properties.RS_VALUE : RS_VALUE,
                                    TIMEDOM: TIMEDOM === undefined ? oldItem.properties.TIMEDOM : TIMEDOM
                                }
                            };
                            attrs.AD_Lane_RS.push(obj);
                        }
                    }
                }
            }
            // 限速
            let oldData = item[1].attrRecords.filter((t) => {
                return t.source === 'AD_Lane_Speed';
            });
            if (oldData !== undefined && oldData.length > 0) {
                oldData.forEach(oldItem => {
                    let isDel = false;
                    if (oldItem?.properties?.SPD_TYPE === 1) {
                        if (this.isDelSpeed.high) {
                            isDel = true;
                        }
                    }
                    if (oldItem?.properties?.SPD_TYPE === 2) {
                        if (this.isDelSpeed.low) {
                            isDel = true;
                        }
                    }
                    if (!isDel) {
                        let iitem = JSON.parse(JSON.stringify(oldItem));
                        if (attrs === undefined) {
                            attrs = {
                                AD_Lane_RS: [],
                                AD_Lane_Speed: []
                            };
                        }
                        if (this.speedValue.length > 0) {
                            if (oldItem?.properties?.SPD_TYPE === 1 && this.speedValue[0] !== undefined) {
                                if (iitem?.properties?.SPEED !== undefined) {
                                    iitem.properties.SPEED = this.speedValue[0]?.SPEED;
                                }
                                if (iitem?.properties?.SPD_SOURCE !== undefined) {
                                    iitem.properties.SPD_SOURCE = this.speedValue[0]?.SPD_SOURCE;
                                }
                                if (iitem?.properties?.UPD_STAT !== undefined) {
                                    iitem.properties.UPD_STAT = this.speedValue[0]?.UPD_STAT;
                                }
                            }
                            else if (oldItem?.properties?.SPD_TYPE === 2 && this.speedValue[1] !== undefined) {
                                if (iitem?.properties?.SPEED !== undefined) {
                                    iitem.properties.SPEED = this.speedValue[1]?.SPEED;
                                }
                                if (iitem?.properties?.SPD_SOURCE !== undefined) {
                                    iitem.properties.SPD_SOURCE = this.speedValue[1]?.SPD_SOURCE;
                                }
                                if (iitem?.properties?.UPD_STAT !== undefined) {
                                    iitem.properties.UPD_STAT = this.speedValue[1]?.UPD_STAT;
                                }
                            }
                        }
                        if (attrs?.AD_Lane_Speed === undefined) {
                            attrs.AD_Lane_Speed = [];
                        }
                        attrs.AD_Lane_Speed.push(iitem);
                    }
                });
            }


        });
        if (isDelType) {
            attrs.AD_Lane_RS.splice(0, 1);
        }
        for (let featureId in this.attrMap) {
            const feature = this.attrMap[featureId].feature;
            let newData = {
                attributes: {},
                attrs: {
                    AD_Lane_RS: [],
                    AD_Lane_Speed: []
                }
            };
            // 限制
            if (attrs?.AD_Lane_RS !== undefined) {
                let oldData = attrs.AD_Lane_RS.filter((item) => {
                    return item.key === undefined || item.key === Number(featureId);
                })
                if (oldData !== undefined) {
                    newData.attrs.AD_Lane_RS = oldData;
                }
            }
            // 限速
            if (attrs?.AD_Lane_Speed !== undefined) {
                let oldData = attrs.AD_Lane_Speed.filter((item) => {
                    return item.key === undefined || item.key === Number(featureId);
                })
                if (oldData !== undefined) {
                    newData.attrs.AD_Lane_Speed = oldData;
                }
            }
            newData.attributes = attributes;
            if (newData === undefined) break;
            // if (this.delAttrs.length > 0) {
            //     if (this.delAttrs[featureId] !== undefined && this.delAttrs[featureId].length > 0) {
            //         let newItems = [];
            //         if (newData?.attrs !== undefined) {
            //             if (newData?.attrs?.AD_Lane_RS !== undefined) {
            //                 newData?.attrs?.AD_Lane_RS.forEach(t => {
            //                     newItems.push(t);
            //                 });
            //             }
            //             if (newData?.attrs?.AD_Lane_Speed !== undefined) {
            //                 newData?.attrs?.AD_Lane_Speed.forEach(t => {
            //                     newItems.push(t);
            //                 });
            //             }
            //         }
            //         let [oldAttr, newAttr] = attrFactory.calcDiffAttrs(this.delAttrs[featureId], newItems);
            //         oldAttr = oldAttr.map(item => {
            //             return toJS(item);
            //         });
            //         oldAttrs = [...oldAttrs, ...oldAttr];
            //         newAttrs = [...newAttrs, ...newAttr];
            //     }
            // }
            // else {
            for (let item of attrType) {
                const [oldAttr, newAttr] = yield this.getAttrLog(
                    feature,
                    newData,
                    featureId,
                    item.source
                );
                oldAttrs = [...oldAttrs, ...oldAttr];
                newAttrs = [...newAttrs, ...newAttr];
            }
            // }
            if (attrs === undefined) {
                if (feature?.data?.properties?.RS_VALUE !== undefined) {
                    feature.data.properties.RS_VALUE = "";
                }
                if (feature?.data?.properties?.SPEED !== undefined) {
                    feature.data.properties.SPEED = "";
                }
            }
            let oldFeature = _.cloneDeep(feature);
            let newFeature = _.cloneDeep(feature);
            for (let key in attributes) {
                if (!(attributes[key] || attributes[key] == 0)) continue;
                if (newFeature.data.properties[key] !== attributes[key]) {
                    newFeature.data.properties[key] = attributes[key];
                    newFeature = modUpdStatPropertiesFields(newFeature, [key]); //维护更新标识
                }
            }
            batchOldFeature = [...batchOldFeature, oldFeature];
            batchNewFeature = [...batchNewFeature, newFeature];
        }
        batchOldAttr = [...batchOldAttr, ...oldAttrs];
        batchNewAttr = [...batchNewAttr, ...newAttrs];
        this.hide();
        const batchHistoryLog = {
            features: [batchOldFeature, batchNewFeature]
        };
        // 批量赋值
        // if (this.attrs?.AD_Lane_RS !== undefined || this.attrs?.AD_Lane_Speed !== undefined) {
        batchHistoryLog.attrs = [batchOldAttr, batchNewAttr];
        batchHistoryLog.rels = [];
        // 修改要素信息
        if (attrs?.AD_Lane_RS !== undefined || attrs?.AD_Lane_Speed !== undefined) {
            batchNewFeature.forEach(item => {
                if (item?.data?.properties?.LANE_ID !== undefined) {
                    let newAttr = this.getFeatureAttrs(attrs, item.data.properties.LANE_ID);
                    if (newAttr !== undefined) {
                        const objValue = setAttributes(newAttr);
                        if (item?.data?.properties) {
                            if (item?.data?.properties?.RS_VALUE !== objValue.rsvalue) {
                                item.data.properties.RS_VALUE = objValue.rsvalue
                            }
                            if (item?.data?.properties?.SPEED !== objValue.speed) {
                                item.data.properties.SPEED = objValue.speed;
                            }
                        }
                    }
                }
            });
        }
        this.loading = false
        this.delAttrs = [];
        this.isDelSpeed.high = false;
        this.isDelSpeed.low = false;
        this.isDelSpeed.delRS = false;
        this.speedValue = [];
        return batchHistoryLog;
    });

    // 获取限制和限速属性
    getFeatureAttrs(attr, value) {
        let obj = {
            AD_Lane_RS: [],
            AD_Lane_Speed: []
        }
        if (attr && attr?.AD_Lane_RS !== undefined) {
            let oldData = attr.AD_Lane_RS.filter((t) => {
                return t.key === value || t.key === undefined;
            });
            if (oldData !== undefined) {
                obj.AD_Lane_RS = oldData
            }
        }
        if (attr && attr?.AD_Lane_Speed !== undefined) {
            let oldData = attr.AD_Lane_Speed.filter((t) => {
                return t.key === value || t.key === undefined;
            });
            if (oldData !== undefined) {
                obj.AD_Lane_Speed = oldData
            }
        }
        return obj;

    }
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
