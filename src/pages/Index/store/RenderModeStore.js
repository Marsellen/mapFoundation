import { observable, configure, action, flow, computed } from 'mobx';
import { getAllRelData } from 'src/utils/vectorUtils';
import {
    LAYER_NAME_MAP,
    RELS_ID_MAP,
    RELS_ID_MAP_REVERSE
} from 'src/config/RenderModeConfig.js';
import {
    REL_SELECT_OPTIONS,
    REL_FEATURE_COLOR_MAP
} from 'src/config/RenderModeConfig';
import { updateFeatureColor, getFeatureOption } from 'src/utils/vectorUtils';
import VectorsStore from './VectorsStore';
import { calculateMiddlePoint } from 'src/utils/computeLineMidpoint';
import relFactory from 'src/utils/relCtrl/relFactory';
import VectorsConfig from 'src/config/VectorsConfig';
import OutsideVectorsConfig from 'src/config/OutsideVectorsConfig';
import WhiteVectorsConfig from 'src/config/WhiteVectorsConfig';
import HalfWhiteVectorsConfig from 'src/config/HalfWhiteVectorsConfig';
import { DATA_LAYER_MAP } from 'src/config/DataLayerConfig';

configure({ enforceActions: 'always' });
class RenderModeStore {
    checkedList = []; //当前已选专题图
    unCheckedList = REL_SELECT_OPTIONS; //当前未选专题图
    textMap = null; //图层名与文字标注映射
    selectRelFeatures = []; //选中要素的关联要素数组
    @observable rels_2D = {}; //将所有关联关系要素按专题图进行分组，值是二维数组
    @observable activeMode = 'common'; //当前渲染模式
    @observable relSelectOptions = REL_SELECT_OPTIONS; //专题图下拉框配置
    @observable indeterminate = false; //checkbox是否indeterminate
    @observable allChecked = false; //checkbox是否全选
    //获取专题图数量
    @computed get relSelectOptionL() {
        return this.relSelectOptions.length;
    }
    //未被选择的专题图名组成的数组
    @computed get unCheckedRelArr() {
        return this.unCheckedList.map(item => item.key) || [];
    }
    //已选专题的要素组成的数组（不去重的），判断用
    @computed get allRelArr() {
        let allRelArr = [];
        Object.keys(this.rels_2D).forEach(relName => {
            if (!this.rels_2D[relName]) return;
            if (this.unCheckedRelArr.includes(relName)) return;
            let newItem = Object.values(this.rels_2D[relName]);
            if (newItem.length === 0) return;
            newItem = newItem.flat(2);
            allRelArr = [...allRelArr, ...newItem];
        });
        return allRelArr.map(item => item.id) || [];
    }
    //{"专题图名":[要素]}（去重的），显示专题图用
    @computed get relArr() {
        let relMap = {};
        Object.keys(this.rels_2D).forEach(relName => {
            if (!this.rels_2D[relName]) return;
            let newItem = Object.values(this.rels_2D[relName]);
            if (newItem.length === 0) return;
            newItem = newItem.flat(2);
            relMap[relName] = relMap[relName] || {};
            newItem.forEach(item => {
                relMap[relName][item.id] = item;
            });
            relMap[relName] = Object.values(relMap[relName]);
        });
        return relMap;
    }

    //设置渲染模式
    @action setMode = mode => {
        this.activeMode = mode;
        //重置专题图
        this.resetSelectOption();
        //清除文字标注
        this.clearFeatureText();
    };

    //重置专题图
    @action resetSelectOption = () => {
        this.checkedList = [];
        this.unCheckedList = REL_SELECT_OPTIONS;
        this.relSelectOptions = REL_SELECT_OPTIONS;
        this.indeterminate = false;
        this.allChecked = false;
    };

    //通用渲染模式/彩色渲染模式
    @action commonRenderMode = () => {
        //任务范围内要素，采用配置：VectorsConfig
        if (window.vectorLayerGroup) {
            window.vectorLayerGroup.resetStyleConfig(VectorsConfig);
        }
        //周边底图要素，采用配置：OutsideVectorsConfig
        if (window.boundaryLayerGroup) {
            window.boundaryLayerGroup.resetStyleConfig(OutsideVectorsConfig);
        }
    };

    //白色渲染模式/要素都是白色
    @action whiteRenderMode = () => {
        //任务范围内要素，采用配置：WhiteVectorsConfig
        if (window.vectorLayerGroup) {
            window.vectorLayerGroup.resetStyleConfig(WhiteVectorsConfig);
        }
        //周边底图要素，采用配置：HalfWhiteVectorsConfig
        if (window.boundaryLayerGroup) {
            window.boundaryLayerGroup.resetStyleConfig(HalfWhiteVectorsConfig);
        }
    };

    //修改要素颜色
    setFeatureColor = (feature, checked) => {
        const { layerName, option } = feature || {};
        const { value } = option || {};
        const { boundaryFeatures } = VectorsStore;
        const isBoundary = boundaryFeatures.includes(value);
        const whiteColor = isBoundary
            ? 'rgb(127, 127, 127)'
            : 'rgb(255, 255, 255)';
        const yellowColor = isBoundary
            ? 'rgb(127,118,18)'
            : 'rgb(255, 237, 37)';
        const color = checked ? yellowColor : whiteColor;

        //改变要素的颜色
        updateFeatureColor(layerName, option, color);
    };

    //批量修改要素颜色
    setFeatureArrColor = (features, checked) => {
        if (!features || features.length === 0) return;
        features.forEach(item => {
            this.setFeatureColor(item, checked);
        });
    };

    //获取指定专题图的所有要素
    getLayerFeatures = rels => {
        if (!rels && rels.length === 0) return;
        let features = [];
        rels.forEach(option => {
            const { key } = option;
            if (!this.relArr[key]) return;
            features = [...features, ...this.relArr[key]];
        });
        return features;
    };

    //单选：获取专题图已选图层，判断是否全选
    @action selectRel = (checked, key) => {
        this.relSelectOptions.find(item => item.key === key).checked = checked;

        //改变checkbox组相关状态
        this.checkedList = this.relSelectOptions.filter(item => item.checked);
        this.unCheckedList = this.relSelectOptions.filter(
            item => !item.checked
        );
        const checkedListL = this.checkedList.length;
        this.indeterminate =
            checkedListL && checkedListL < this.relSelectOptionL;
        this.allChecked = checkedListL === this.relSelectOptionL;

        //改变当前图层颜色
        this.setFeatureArrColor(this.relArr[key], checked);

        //取消时，将所有已勾选图层元素变黄
        if (!checked) {
            const layerFeatures = this.getLayerFeatures(this.checkedList);
            this.setFeatureArrColor(layerFeatures, true);
        }

        //取消选择
        this.cancelSelect();
    };

    //全选：获取专题图已选图层，判断是否全选
    @action selectAllRel = checked => {
        //checked为true将未勾选专题的元素变黄，checked为false将已勾选专题的元素变白
        const list = checked ? this.unCheckedList : this.checkedList;
        const layerFeatures = this.getLayerFeatures(list);
        this.setFeatureArrColor(layerFeatures, checked);

        //改变所有专题图的checked
        this.relSelectOptions.map(item => {
            item.checked = checked;
            return item;
        });

        //改变checkbox组相关状态
        this.indeterminate = false;
        this.allChecked = checked;
        this.checkedList = checked ? this.relSelectOptions : [];
        this.unCheckedList = checked ? [] : this.relSelectOptions;

        //取消选择
        this.cancelSelect();
    };

    //清除文字标注
    clearFeatureText = () => {
        if (!this.textMap) return;
        Object.keys(this.textMap).forEach(textId => {
            const layer = this.textMap[textId];
            layer.removeFeatureById(textId);
        });

        this.textMap = null;
    };

    //将有关联关系的要素，按专题图进行分组
    @action setRels = flow(function* () {
        //获取关联关系图层所有要素
        const allRelData = yield getAllRelData();
        const allRelDataArr = allRelData.features;
        if (!allRelDataArr || allRelDataArr.length === 0) return;

        const rels_2D = {};

        allRelDataArr.map(item => {
            const { features, name } = item;
            if (!features || features.length === 0) return;
            let relName = ''; //专题图分组名
            switch (name) {
                case 'AD_Lane':
                    /*
                     *将AD_LANE拆分成两组
                     *一组是车道中心线 & 左右侧车道线
                     *一组是车道中心线 & 道路参考线
                     */
                    features.map(relItem => {
                        const { properties } = relItem;
                        const {
                            LANE_ID,
                            L_LDIV_ID,
                            R_LDIV_ID,
                            ROAD_ID
                        } = properties;

                        const LANE_Feature = this.setOptions(
                            'LANE_ID',
                            LANE_ID
                        );
                        const L_LDIV_feature = this.setOptions(
                            'L_LDIV_ID',
                            L_LDIV_ID
                        );
                        const R_LDIV_feature = this.setOptions(
                            'R_LDIV_ID',
                            R_LDIV_ID
                        );
                        const ROAD_Feature = this.setOptions(
                            'ROAD_ID',
                            ROAD_ID
                        );

                        if (L_LDIV_ID && LANE_ID) {
                            const relName = 'AD_Lane_Divider_Rel';
                            const key = [L_LDIV_ID, LANE_ID].sort(); //id组成的数据作为key
                            const value = [LANE_Feature, L_LDIV_feature];
                            rels_2D[relName] = rels_2D[relName] || {};
                            rels_2D[relName][key] = value;
                        }
                        if (R_LDIV_ID && LANE_ID) {
                            const relName = 'AD_Lane_Divider_Rel';
                            const key = [R_LDIV_ID, LANE_ID].sort(); //id组成的数据作为key
                            const value = [LANE_Feature, R_LDIV_feature];
                            rels_2D[relName] = rels_2D[relName] || {};
                            rels_2D[relName][key] = value;
                        }
                        if (ROAD_ID && LANE_ID) {
                            const relName = 'AD_Lane_Road_Rel';
                            const key = [ROAD_ID, LANE_ID].sort(); //id组成的数据作为key
                            const value = [LANE_Feature, ROAD_Feature];
                            rels_2D[relName] = rels_2D[relName] || {};
                            rels_2D[relName][key] = value;
                        }
                    });
                    break;
                case 'AD_Arrow': //车道中心线 & 地面导向箭头
                    relName = 'AD_Lane_Arrow_Rel';
                    break;
                case 'AD_Text': //车道中心re线 & 地面文字
                    relName = 'AD_Lane_Text_Rel';
                    break;
                case 'AD_LaneAttrPoint': //道路参数线 & 车道属性交化点
                    relName = 'AD_Road_Point_Rel';
                    break;
                default:
                    relName = name;
                    break;
            }
            if (relName) {
                let options_2D;
                //获取所有带关联关系要素的option
                features.map(item => {
                    if (!RELS_ID_MAP[relName]) return;
                    if (RELS_ID_MAP[relName].length === 0) return;
                    const { properties } = item;
                    let options_2D_key = [];
                    let options_2D_val = [];

                    RELS_ID_MAP[relName].map(id => {
                        const optionId = properties[id];
                        const feature = this.setOptions(id, optionId);

                        if (!optionId) return;
                        options_2D_key.push(optionId);
                        options_2D_val.push(feature);
                    });

                    if (options_2D_val.length < 2) return;
                    options_2D = options_2D || {};
                    options_2D[options_2D_key.sort()] = options_2D_val;
                });
                if (options_2D) {
                    rels_2D[relName] = rels_2D[relName] || {};
                    rels_2D[relName] = options_2D;
                }
            }
        });

        this.rels_2D = rels_2D;
    }).bind(this);
    //将history.rels里的数据，转成this.rels_2D格式
    getRelMap = updateRels => {
        if (!updateRels || updateRels.length === 0) return false;
        let updateRelMap_2D = {};
        updateRels.map(item => {
            const { objId, objType, relObjId, relObjType } = item;
            const objRelation = `${objType}_ID`;
            const relObjRelation = `${relObjType}_ID`;
            const obj = this.setOptions(objRelation, objId);
            const relObj = this.setOptions(relObjRelation, relObjId);
            const names = [objType, relObjType];
            const relName = RELS_ID_MAP_REVERSE[names];
            updateRelMap_2D[relName] = updateRelMap_2D[relName] || {};
            updateRelMap_2D[relName][[objId, relObjId].sort()] = [obj, relObj];
        });

        return updateRelMap_2D;
    };

    delRel = oldRels => {
        const updateRelMap_2D = this.getRelMap(oldRels);
        if (!updateRelMap_2D) return;

        Object.keys(updateRelMap_2D).forEach(relName => {
            //根据history.rels的旧关联关系数据，删除this.rels_2D里相应数据
            Object.keys(updateRelMap_2D[relName]).forEach(id => {
                if (!this.rels_2D[relName]) return;
                id = id.split(',').sort();
                delete this.rels_2D[relName][id];
            });
            //根据history.rels的旧关联关系数据，将相应要素变白
            if (this.unCheckedRelArr.includes(relName)) return;
            const features = Object.values(updateRelMap_2D[relName]).flat();
            if (!features && features.length === 0) return;
            features.forEach(item => {
                if (this.allRelArr.includes(item.id)) {
                    this.setFeatureColor(item, true);
                } else {
                    this.setFeatureColor(item, false);
                }
            });
        });
    };

    addRel = newRels => {
        const updateRelMap_2D = this.getRelMap(newRels);
        if (!updateRelMap_2D) return;
        Object.keys(updateRelMap_2D).forEach(relName => {
            //根据history.rels的新关联关系数据，向this.rels_2D添加相应数据
            this.rels_2D[relName] = {
                ...this.rels_2D[relName],
                ...updateRelMap_2D[relName]
            };
            //根据history.rels的新关联关系数据，将相应要素变黄
            if (this.unCheckedRelArr.includes(relName)) return;
            const features = Object.values(updateRelMap_2D[relName]).flat();
            if (!features && features.length === 0) return;
            features.forEach(item => this.setFeatureColor(item, true));
        });
    };

    updateCurrentFeature = currentFeatures => {
        if (!currentFeatures || currentFeatures.length === 0) return;
        //取消选择
        this.cancelSelect();
        currentFeatures.map(item => {
            const { data, layerName } = item;
            const { properties } = data;
            const featureIdKey = DATA_LAYER_MAP[layerName].id;
            const featureIdVal = properties[featureIdKey];
            const currentFeature = this.setOptions(featureIdKey, featureIdVal);
            if (this.allRelArr.includes(featureIdVal)) {
                this.setFeatureColor(currentFeature, true);
            } else {
                this.setFeatureColor(currentFeature, false);
            }
        });
    };

    //更新关联数组
    @action updateRels = history => {
        if (this.activeMode !== 'relation') return;
        if (!history) return;
        const { rels = [], features = [] } = history || {};
        const newFeatures = features[1];
        const [oldRels, newRels] = rels;

        //取消选择
        this.cancelSelect();

        oldRels && this.delRel(oldRels);
        newRels && this.addRel(newRels);

        if (rels.length > 0) return;
        newFeatures && this.updateCurrentFeature(newFeatures);
    };

    //获取要素option
    setOptions = (name, id) => {
        if (!name) return;
        if (!id) return;
        const { layerName, key } = LAYER_NAME_MAP[name] || {};
        return {
            layerName,
            relation: name,
            id: id,
            option: {
                key,
                value: id
            }
        };
    };

    //取消选中
    cancelSelect = () => {
        //清除文字标注
        this.clearFeatureText();
        //将选中要素的关联要素变黄
        this.selectRelFeatures.forEach(item => {
            if (this.allRelArr.includes(item.id)) {
                this.setFeatureColor(item, true);
            } else {
                this.setFeatureColor(item, false);
            }
        });
        this.selectRelFeatures = [];
    };

    //获取图层，可获取vectorlayer，也可以获取boundaryLayer
    getLayerByName = (vectorLayerName, layerName) => {
        const activeLayer = window[vectorLayerName].layers.find(
            layer => layer.layerName == layerName
        );
        return activeLayer.layer;
    };

    selectFeature = async feature => {
        //获取选中要素的关联要素，并处理成所需格式
        await this.fetchRels(feature);
        if (!this.selectRelFeatures) return;
        if (this.selectRelFeatures.length === 0) return;
        //获取选中要素layerName和id
        const { layerName } = feature;
        const { value: featureId } = getFeatureOption(feature);

        this.showRelFeatures(layerName, featureId);
    };

    getVectorLayerName = featureId => {
        //获取选中要素所在图层
        const { boundaryFeatures } = VectorsStore;
        const isBoundary = boundaryFeatures.includes(featureId);
        const vectorLayerName = isBoundary
            ? 'boundaryLayerGroup'
            : 'vectorLayerGroup';

        return vectorLayerName;
    };

    //获取选中要素的关联要素，并处理成所需格式
    fetchRels = flow(function* (feature) {
        try {
            const { layerName, data } = feature;
            const { properties } = data;
            const relRecords = yield relFactory.getFeatureRels(
                layerName,
                properties
            );

            const relDataArr = this.getRelMap(relRecords);
            if (!relDataArr && relDataArr.length === 0) return;
            let relFeatures = [];
            Object.keys(relDataArr).forEach(relName => {
                if (!relDataArr[relName]) return;
                if (this.unCheckedRelArr.includes(relName)) return;
                const newItem = Object.values(relDataArr[relName]);
                relFeatures = [...relFeatures, ...newItem];
            });
            this.selectRelFeatures = relFeatures.flat();
        } catch (error) {
            console.log(error);
        }
    });

    //将选中要素的关联要素高亮并加上文字标注
    showRelFeatures = (featureLayerName, featureId) => {
        try {
            //遍历选中要素的所有关联要素
            this.selectRelFeatures.forEach(item => {
                const { layerName, relation, option } = item;
                const { value } = option;
                //当前选中要素不进行变色
                if (value === featureId) return;
                //判断当前选中要素是车道线,不对车道线进行变色
                if (
                    featureLayerName === 'AD_LaneDivider' &&
                    featureLayerName === layerName
                ) {
                    return false;
                }
                //获取关联关系对应的文字注记样式
                const styleConfig = REL_FEATURE_COLOR_MAP[relation] || {};
                const {
                    color = 'rgb(49, 209, 255)',
                    text,
                    style
                } = styleConfig;
                //要素变颜色
                updateFeatureColor(layerName, option, color);

                if (!text) return;
                //获取要素geometry
                const vectorLayerName = this.getVectorLayerName(value);
                const activeLayer = this.getLayerByName(
                    vectorLayerName,
                    layerName
                );
                const activeFeature = activeLayer.getFeatureByOption(option);
                if (!activeFeature) return;
                const activeFeatureData =
                    activeFeature.properties && activeFeature.properties.data;
                const linePointArr =
                    activeFeatureData.geometry &&
                    activeFeatureData.geometry.coordinates;

                if (!linePointArr) return;
                //设置文字显示位置，进出线文字在首尾点，左右线文字在中间
                let position = {}; //文字的位置
                if (
                    relation.includes('FROM_ROAD') ||
                    relation.includes('FROM_LANE')
                ) {
                    const [x, y, z] = linePointArr[linePointArr.length - 1];
                    position = { x, y, z };
                } else if (
                    relation.includes('TO_ROAD') ||
                    relation.includes('TO_LANE')
                ) {
                    const [x, y, z] = linePointArr[0];
                    position = { x, y, z };
                } else {
                    position = calculateMiddlePoint(activeFeatureData); //计算线的中心点
                }

                //将文字标注添加到选中要素所在的图层
                const textId = activeLayer.addTextFeature(
                    text,
                    position,
                    style
                );

                //图层名与文字注记映射
                this.textMap = this.textMap || {};
                this.textMap[textId] = activeLayer;
            });
        } catch (e) {
            console.log(e);
        }
    };
}

export default new RenderModeStore();
