import { observable, configure, action, flow, computed } from 'mobx';
import { getAllRelData, getAllVectorData } from 'src/utils/vectorUtils';
import { LAYER_NAME_MAP, RELS_ID_MAP } from 'src/config/RenderModeConfig.js';
import { DATA_LAYER_MAP } from 'src/config/DataLayerConfig';
import {
    REL_SELECT_OPTIONS,
    REL_FEATURE_COLOR_MAP
} from 'src/config/RenderModeConfig';
import { updateFeatureColor } from 'src/utils/vectorUtils';
import VectorsStore from './VectorsStore';
import { calculateMiddlePoint } from 'src/utils/computeLineMidpoint';

configure({ enforceActions: 'always' });
class RenderModeStore {
    rels_2D = {}; //将所有关联关系要素按专题图进行分组，值是二维数组
    allRels = []; //所有关联关系要素，合并this.rels
    checkedList = []; //当前已选专题图
    textIdArr = []; //文字标注id数组
    featuresMap = {}; //获取所有要素id和option映射
    featuresArr = []; //获取所有要素id组成的数组
    @observable activeMode = 'common'; //当前渲染模式
    @observable rels = {}; //将所有关联关系要素按专题图进行分组，值是一维数组
    @observable relSelectOptions = REL_SELECT_OPTIONS; //专题图下拉框配置
    @observable indeterminate = false; //checkbox是否indeterminate
    @observable allChecked = false; //checkbox是否全选
    @computed get relSelectOptionL() {
        return this.relSelectOptions.length; //获取专题图个数
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
    resetSelectOption = () => {
        this.relSelectOptions = REL_SELECT_OPTIONS;
        this.indeterminate = false;
        this.allChecked = false;
        this.checkedList = [];
    };

    //单选：获取专题图已选图层，判断是否全选
    @action selectRel = (checked, key) => {
        this.relSelectOptions.find(item => item.key === key).checked = checked;
        this.checkedList = this.relSelectOptions.filter(item => item.checked);
        const checkedListL = this.checkedList.length;
        this.indeterminate =
            checkedListL && checkedListL < this.relSelectOptionL;
        this.allChecked = checkedListL === this.relSelectOptionL;
    };

    //全选：获取专题图已选图层，判断是否全选
    @action selectAllRel = checked => {
        this.relSelectOptions.map(item => {
            item.checked = checked;
            return item;
        });
        this.indeterminate = false;
        this.allChecked = checked;
        this.checkedList = checked ? this.relSelectOptions : [];
    };

    //清除文字标注
    clearFeatureText = () => {
        if (!this.textIdArr || this.textIdArr.length === 0) return;
        const { boundaryLayerMap, vectorLayerMap } = VectorsStore;

        //清除任务范围内文字标注
        Object.values(vectorLayerMap).map(layer => {
            this.textIdArr.map(item => {
                layer.removeFeatureById(item);
            });
        });

        //清除任务范围外文字标注
        Object.values(boundaryLayerMap).map(layer => {
            this.textIdArr.map(item => {
                layer.removeFeatureById(item);
            });
        });

        this.textIdArr = [];
    };

    //清空高亮，全变成白色
    clearFeatureColor = () => {
        const { boundaryFeatures } = VectorsStore;
        if (!this.allRels || this.allRels.length === 0) return;
        this.allRels.map(item => {
            const { layerName, option } = item;
            const { value } = option;
            const isBoundary = boundaryFeatures.includes(value);
            const color = isBoundary
                ? 'rgb(127, 127, 127)'
                : 'rgb(255, 255, 255)';

            //改变要素的颜色
            updateFeatureColor(layerName, option, color);
        });
    };

    //属于已选专题图的要素，黄色高亮
    HighlightRelFeatures = () => {
        const { boundaryFeatures } = VectorsStore;
        this.relSelectOptions.map(item => {
            const { key, checked } = item;
            if (!checked) return;
            if (!this.rels[key] || this.rels[key].length === 0) return;
            this.rels[key].map(feature => {
                const { layerName, option } = feature;
                const { value } = option;
                const isBoundary = boundaryFeatures.includes(value);
                const color = isBoundary
                    ? 'rgb(127,118,18)'
                    : 'rgb(255, 237, 37)';

                //改变要素的颜色
                updateFeatureColor(layerName, option, color);
            });
        });
    };

    //重置要素颜色
    @action resetFeatureColor = () => {
        //清除文字标注
        this.clearFeatureText();
        //清除要素颜色
        this.clearFeatureColor();
        //属于已选专题图的要素，黄色高亮
        this.HighlightRelFeatures();
    };

    //获取所有要素id和option映射，获取所有要素id组成的数组
    handleVectorFeatures = () => {
        const { features: layers } = getAllVectorData();
        const featuresMap = {};
        const featuresArr = [];

        if (!layers || layers.length === 0) return;
        layers.map(layer => {
            const { features, name: layerName } = layer || {};
            if (!features || features.length === 0) return;
            features.map(feature => {
                const { geometry, properties } = feature;
                const key = DATA_LAYER_MAP[layerName].id;
                if (!key) return;
                const id = properties[key];
                if (!id) return;
                featuresMap[id] = {
                    id: id,
                    geometry,
                    properties
                };
                featuresArr.push(id);
            });
        });

        this.featuresMap = featuresMap;
        this.featuresArr = featuresArr;
    };

    //将有关联关系的要素，按专题图进行分组
    @action setRels = flow(function*() {
        //获取关联关系图层所有要素
        const allRelData = yield getAllRelData();
        const allRelDataArr = allRelData.features;
        if (!allRelDataArr || allRelDataArr.length === 0) return;

        const rels = {};
        const rels_2D = {};
        let allRels = [];

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
                        let LDIVItem = []; // 车道中心线 & 左右侧车道线
                        let ROADItem = []; // 车道中心线 & 道路参考线
                        if (L_LDIV_ID) {
                            LDIVItem.push(
                                this.setOptions('L_LDIV_ID', L_LDIV_ID)
                            );
                        }
                        if (R_LDIV_ID) {
                            LDIVItem.push(
                                this.setOptions('R_LDIV_ID', R_LDIV_ID)
                            );
                        }
                        if (L_LDIV_ID || R_LDIV_ID) {
                            LDIVItem.push(this.setOptions('LANE_ID', LANE_ID));
                            if (LDIVItem.length < 2) return;
                            const relName = 'AD_Lane_Divider_Rel';
                            rels[relName] = rels[relName] || [];
                            rels_2D[relName] = rels_2D[relName] || [];
                            rels[relName] = [...rels[relName], ...LDIVItem];
                            rels_2D[relName].push(LDIVItem);
                            allRels = [...allRels, ...rels[relName]];
                        }
                        if (ROAD_ID) {
                            ROADItem.push(this.setOptions('ROAD_ID', ROAD_ID));
                            ROADItem.push(this.setOptions('LANE_ID', LANE_ID));
                            if (ROADItem.length < 2) return;
                            const relName = 'AD_Lane_Road_Rel';
                            rels[relName] = rels[relName] || [];
                            rels_2D[relName] = rels_2D[relName] || [];
                            rels[relName] = [...rels[relName], ...ROADItem];
                            rels_2D[relName].push(ROADItem);
                            allRels = [...allRels, ...rels[relName]];
                        }
                    });
                    break;
                case 'AD_Arrow': //车道中心线 & 地面导向箭头
                    relName = 'AD_Lane_Arrow_Rel';
                    break;
                case 'AD_Text': //车道中心线 & 地面文字
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
                let options = [];
                let options_2D = [];
                //获取所有带关联关系要素的option
                features.map(item => {
                    if (!RELS_ID_MAP[relName]) return;
                    if (RELS_ID_MAP[relName].length === 0) return;
                    const { properties } = item;
                    let newItem = [];
                    RELS_ID_MAP[relName].map(id => {
                        const optionId = properties[id];
                        optionId && newItem.push(this.setOptions(id, optionId));
                    });
                    if (newItem.length < 2) return;
                    options = [...options, ...newItem];
                    options_2D.push(newItem);
                });

                rels[relName] = options;
                rels_2D[relName] = options_2D;
                allRels = [...allRels, ...rels[relName]];
            }
        });

        this.rels = rels;
        this.rels_2D = rels_2D;
        this.allRels = allRels;

        this.handleVectorFeatures();
    });

    //获取要素option
    setOptions = (name, id) => {
        const { layerName, key } = LAYER_NAME_MAP[name];
        return {
            layerName,
            relation: name,
            option: {
                key,
                value: id
            }
        };
    };

    //更新要素颜色
    updateFeatureColor = async () => {
        if (this.activeMode !== 'relation') return;
        //清除文字标注
        this.clearFeatureText();
        //清除要素颜色
        this.clearFeatureColor();
        //等待要素按专题图分组
        await this.setRels();
        //属于已选专题图的要素，黄色高亮
        this.HighlightRelFeatures();
    };

    //选中要素
    selectFeature = feature => {
        const { layerName, data } = feature;
        const { id } = DATA_LAYER_MAP[layerName];
        const featureId = data.properties && data.properties[id];
        this.getRelFeatures(layerName, featureId);
    };

    //判断所选要素是否在已勾选的专题图范围内，获取选中要素的关联要素
    getRelFeatures = (layerName, featureId) => {
        let relFeatures = [];
        if (!this.checkedList || this.checkedList.length === 0) return;
        this.checkedList.map(option => {
            const { key } = option;
            if (!this.rels_2D[key] || this.rels_2D[key].length === 0) return;
            this.rels_2D[key].map(relItem => {
                const isInclude = relItem.find(item => {
                    return item.option.value === featureId;
                });
                if (!isInclude) return;
                relFeatures = [...relFeatures, ...relItem];
            });
        });

        const { boundaryFeatures } = VectorsStore;
        const isBoundary = boundaryFeatures.includes(featureId);
        const layer = isBoundary ? 'boundaryLayerMap' : 'vectorLayerMap';
        this.showRelFeatures(featureId, layerName, relFeatures, layer);
    };

    //将选中要素的关联要素高亮并加上文字标注
    showRelFeatures = (featureId, featureLayerName, relFeatures, layer) => {
        const { boundaryFeaturesMap } = VectorsStore;
        try {
            relFeatures.forEach(item => {
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
                const styleConfig = REL_FEATURE_COLOR_MAP[relation] || {};
                const {
                    color = 'rgb(49, 209, 255)',
                    text,
                    style
                } = styleConfig;
                //要素变颜色
                updateFeatureColor(layerName, option, color);
                //给要素加文字
                if (!text) return;
                const line =
                    this.featuresMap[value] || boundaryFeaturesMap[value] || {};
                const linePointArr = line.geometry && line.geometry.coordinates;
                if (!linePointArr) return;
                let position = {}; //文字的位置
                if (relation === 'FROM_ROAD' || relation === 'FROM_LANE') {
                    const [x, y, z] = linePointArr[linePointArr.length - 1];
                    position = { x, y, z };
                } else if (relation === 'TO_ROAD' || relation === 'TO_LANE') {
                    const [x, y, z] = linePointArr[0];
                    position = { x, y, z };
                } else {
                    position = calculateMiddlePoint(line); //计算线的中心点
                }

                //将文字标注添加到选中要素所在的图层
                const textId = VectorsStore[layer][layerName].addTextFeature(
                    text,
                    position,
                    style
                );

                //文字标注id数组
                this.textIdArr.push(textId);
            });
        } catch (e) {
            console.log(e);
        }
    };
}

export default new RenderModeStore();
