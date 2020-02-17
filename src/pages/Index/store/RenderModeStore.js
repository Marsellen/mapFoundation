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
    rels_2D = {};
    allRels = [];
    checkedList = [];
    textIdArr = [];
    featuresMap = {};
    featuresArr = [];
    @observable activeMode = 'common';
    @observable rels = {};
    @observable relSelectOptions = REL_SELECT_OPTIONS;
    @observable indeterminate = false;
    @observable allChecked = false;
    @computed get relSelectOptionL() {
        return this.relSelectOptions.length;
    }

    @action setMode = mode => {
        this.activeMode = mode;
        this.resetSelectOption();
        this.clearFeatureText();
    };

    resetSelectOption = () => {
        this.relSelectOptions = REL_SELECT_OPTIONS;
        this.indeterminate = false;
        this.allChecked = false;
        this.checkedList = [];
    };

    @action selectRel = (checked, key) => {
        this.relSelectOptions.find(item => item.key === key).checked = checked;
        this.checkedList = this.relSelectOptions.filter(item => item.checked);
        const checkedListL = this.checkedList.length;
        this.indeterminate =
            checkedListL && checkedListL < this.relSelectOptionL;
        this.allChecked = checkedListL === this.relSelectOptionL;
    };

    @action selectAllRel = checked => {
        this.relSelectOptions.map(item => {
            item.checked = checked;
            return item;
        });
        this.indeterminate = false;
        this.allChecked = checked;
        this.checkedList = checked ? this.relSelectOptions : [];
    };

    clearFeatureText = () => {
        if (!this.textIdArr || this.textIdArr.length === 0) return;
        this.textIdArr.map(item => {
            window.vectorLayer.removeFeatureById(item);
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

            updateFeatureColor(layerName, option, color);
        });
    };

    //勾选变黄色
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

                updateFeatureColor(layerName, option, color);
            });
        });
    };

    @action resetFeatureColor = () => {
        this.clearFeatureText();
        this.clearFeatureColor();
        this.HighlightRelFeatures();
    };

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

    @action setRels = flow(function*() {
        const allRelData = yield getAllRelData();
        const allRelDataArr = allRelData.features;
        if (!allRelDataArr || allRelDataArr.length === 0) return;

        const rels = {};
        const rels_2D = {};
        let allRels = [];

        allRelDataArr.map(item => {
            const { features, name } = item;
            if (!features || features.length === 0) return;
            let relName = '';
            switch (name) {
                case 'AD_Lane':
                    features.map(relItem => {
                        const { properties } = relItem;
                        const {
                            LANE_ID,
                            L_LDIV_ID,
                            R_LDIV_ID,
                            ROAD_ID
                        } = properties;
                        let LDIVItem = []; // 车道中心线 & 左右侧车道线
                        let ROADItem = []; // 车道中心线 & 左右侧车道线
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

    updateFeatureColor = async () => {
        if (this.activeMode !== 'relation') return;
        this.clearFeatureText();
        this.clearFeatureColor();
        await this.setRels();
        this.HighlightRelFeatures();
    };

    selectFeature = feature => {
        const { layerName, data } = feature;
        const { id } = DATA_LAYER_MAP[layerName];
        const featureId = data.properties && data.properties[id];
        let relFeatures = [];
        //获取选中要素的关联要素
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

        this.showRelFeatures(featureId, relFeatures);
    };

    showRelFeatures = (featureId, relFeatures) => {
        const { boundaryFeaturesMap } = VectorsStore;
        try {
            relFeatures.forEach(item => {
                const { layerName, relation, option } = item;
                const { value } = option;
                if (value === featureId) return;
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
                const linePointArr = line.geometry.coordinates;
                let position = {};
                if (relation === 'FROM_ROAD' || relation === 'FROM_LANE') {
                    const [x, y, z] = linePointArr[linePointArr.length - 1];
                    position = { x, y, z };
                } else if (relation === 'TO_ROAD' || relation === 'TO_LANE') {
                    const [x, y, z] = linePointArr[0];
                    position = { x, y, z };
                } else {
                    position = calculateMiddlePoint(line);
                }

                const textId = window.vectorLayer.addTextFeature(
                    text,
                    position,
                    style
                );

                this.textIdArr.push(textId);
            });
        } catch (e) {
            console.log(e);
        }
    };
}

export default new RenderModeStore();
