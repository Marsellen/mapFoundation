import { observable, configure, action, computed } from 'mobx';
import { UPD_STAT_VECTOR_CONFIG } from 'src/config/updStatVectorConfig';
import { UPD_STAT_CHECK_GROUP } from 'src/config/renderModeConfig';
import { DATA_LAYER_MAP } from 'src/config/dataLayerConfig';
import QualityCheckStore from 'src/store/home/qualityCheckStore';
const dingdianjianxiubiaoji = require('src/asset/img/dingdianjianxiubiaoji.png');

configure({ enforceActions: 'always' });
class CheckModeStore {
    @observable updStatCheckgroup = UPD_STAT_CHECK_GROUP; //专题图下拉框配置
    @observable allLayerUpdConfig = UPD_STAT_VECTOR_CONFIG;
    @computed get allChecked() {
        const checkedArr = this.updStatCheckgroup.filter(item => item.checked);
        return this.updStatCheckgroup.length === checkedArr.length;
    }
    @computed get indeterminate() {
        const checkedArr = this.updStatCheckgroup.filter(item => item.checked);
        return checkedArr.length !== 0 && this.updStatCheckgroup.length !== checkedArr.length;
    }

    @action release = () => {};

    //初始化更新标识模式渲染
    @action initCheckMode = list => {
        const { reportList } = QualityCheckStore;
        const data = list ? list : reportList;
        let setLayers = {}; // 整理检查结果中图层和要素
        let setStyles = {};
        let local = {};
        data?.forEach(item => {
            local = JSON.parse(item.location);
            setLayers[local.layerName] = setLayers[local.layerName]
                ? setLayers[local.layerName].concat({
                      value: Number(local.featureId),
                      style: {
                          showMode: 'center-point',
                          url: dingdianjianxiubiaoji,
                          color: 'rgb(1,186,5)',
                          size: 30
                      }
                  })
                : [
                      {
                          style: {
                              color: 'rgb(255,255,255)'
                          }
                      },
                      {
                          value: Number(local.featureId),
                          style: {
                              showMode: 'center-point',
                              url: dingdianjianxiubiaoji,
                              color: 'rgb(1,186,5)',
                              size: 30
                          }
                      }
                  ];
            setStyles[local.layerName] = setStyles[local.layerName]
                ? setStyles[local.layerName].concat({
                      value: Number(local.featureId),
                      style: { color: 'rgb(1,186,5)' }
                  })
                : [
                      {
                          style: { color: 'rgb(255,255,255)' }
                      },
                      {
                          value: Number(local.featureId),
                          style: { color: 'rgb(1,186,5)' }
                      }
                  ];
        });
        Object.keys(setLayers).forEach(layer => {
            if (DATA_LAYER_MAP[layer]?.id) {
                let defConfig = {
                    iconFields: [DATA_LAYER_MAP[layer].id],
                    showFields: [DATA_LAYER_MAP[layer].id],
                    arrowFields: [DATA_LAYER_MAP[layer].id],
                    iconStyle: {},
                    arrowStyle: {},
                    vectorStyle: {},
                    showStyles: ['iconStyle', 'vectorStyle', 'arrowStyle']
                };
                const vectorLayer = this.getVectorLayer(layer);
                defConfig.iconStyle[DATA_LAYER_MAP[layer].id] = [...setLayers[layer]];
                defConfig.vectorStyle[DATA_LAYER_MAP[layer].id] = [...setStyles[layer]];
                defConfig.arrowStyle[DATA_LAYER_MAP[layer].id] = [...setStyles[layer]];
                vectorLayer && vectorLayer.resetConfig(defConfig);
            }
        });
    };

    // 获得layer
    @action getVectorLayer = key => {
        if (!window.vectorLayerGroup) return;
        const { layers } = window.vectorLayerGroup;
        const { layer } = layers.find(item => item.layerName === key) || {};
        return layer;
    };
}

export default new CheckModeStore();
