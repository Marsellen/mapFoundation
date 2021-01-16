import { action, configure, observable } from 'mobx';
import { DEFAULT_PROPERTIES_MAP, DEFAULT_CONFIDENCE_MAP } from 'src/config/ADMapDataConfig.js';

configure({ enforceActions: 'always' });

class BatchBuildStore {
    @observable leftFeatures = [];
    @observable rightFeatures = [];
    @observable activeFeatureKey = null;
    @observable activeRangeKey = null;

    @action addFeature = featuresName => {
        const layerName = 'AD_LaneDivider';
        const length = this[featuresName].length;
        const preDistance = this[featuresName]?.[length - 1]?.DISTANCE ?? 0;
        this[featuresName].push({
            DISTANCE: preDistance + 3.75,
            attr: {
                ...DEFAULT_PROPERTIES_MAP[layerName],
                CONFIDENCE: DEFAULT_CONFIDENCE_MAP[layerName],
                COLL_TIME: '',
                MAKE_TIME: '',
                UPD_STAT: '{"GEOMETRY":"ADD"}'
            }
        });
    };

    @action deleteFeature = (featuresName, index) => {
        this[featuresName].splice(index, 1);
    };

    @action updateFeature = (featuresName, index, key, value) => {
        if (key === 'attr') {
            this[featuresName][index][key] = { ...this[featuresName][index][key], ...value };
        } else {
            this[featuresName][index][key] = value;
        }
    };

    @action initActiveFeature = (featuresName, index) => {
        this.activeFeatureKey = `${featuresName}|${index}`;
    };

    @action clearActiveFeature = () => {
        this.activeFeatureKey = null;
    };

    @action initActiveRange = (featuresName, index) => {
        this.activeRangeKey = `${featuresName}|${index}`;
    };

    @action clearActiveRange = () => {
        this.activeRangeKey = null;
    };

    @action release = () => {
        this.leftFeatures = [];
        this.rightFeatures = [];
        this.activeFeatureKey = null;
        this.activeRangeKey = null;
    };
}

export default new BatchBuildStore();
