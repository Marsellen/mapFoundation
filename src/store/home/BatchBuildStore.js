import { action, configure, observable } from 'mobx';
import { DEFAULT_PROPERTIES_MAP, DEFAULT_CONFIDENCE_MAP } from 'src/config/adMapDataConfig';

configure({ enforceActions: 'always' });

class BatchBuildStore {
    @observable leftFeatures = [];
    @observable rightFeatures = [];
    @observable activeFeatureKey = null;
    @observable activeRangeKey = null;
    @observable horizontalToolStatus = false;

    checkDistance = value => {
        return value > 0 && value <= 100;
    };

    @action addFeature = featuresName => {
        const length = this[featuresName].length;
        if (length >= 30) return;
        const layerName = 'AD_LaneDivider';
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
        //默认选中新增行
        this.initActiveFeature(featuresName, length);
    };

    @action deleteFeature = (featuresName, index) => {
        this[featuresName].splice(index, 1);
    };

    @action updateFeature = (featuresName, index, key, value) => {
        switch (key) {
            case 'attr':
                this[featuresName][index][key] = { ...this[featuresName][index][key], ...value };
                break;
            case 'DISTANCE':
                if (this.checkDistance(value)) this[featuresName][index][key] = value;
                break;
            default:
                this[featuresName][index][key] = value;
                break;
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
        this.horizontalToolStatus = false;
    };

    @action setHorizontalToolStatus = horizontalToolStatus => {
        this.horizontalToolStatus = horizontalToolStatus;
    };
}

export default new BatchBuildStore();
