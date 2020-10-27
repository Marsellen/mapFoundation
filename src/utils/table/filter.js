import { TYPE_SELECT_OPTION_MAP } from 'config/ADMapDataConfig';
import _ from 'lodash';

const DEFAULT_FILTER = () => {
    return '--';
};

const UPD_STAT_MAP = {
    GEOMETRY: {
        ADD: '几何新增',
        MOD: '几何修改',
        DEL: '几何待删除',
        NO_CHANGE: '几何未变化'
    },
    RELATION: {
        MOD: '关系变化'
    },
    PROPERTIES: {
        MOD: '属性修改',
        NO_CHANGE: '属性未变化'
    }
};

class Filter {
    get = filter => {
        let [filterName, ...option] = filter.split('|');
        if (typeof this[filterName] !== 'function') {
            return DEFAULT_FILTER;
        }
        return this[filterName].bind(this, ...option);
    };

    typeFilter = (type, value) => {
        if (value === null || value === undefined) {
            return '--';
        }
        let options = TYPE_SELECT_OPTION_MAP[type].flat();
        let option = options.find(c => c.value == value);
        return option ? option.label : value;
    };

    updStatFilter = value => {
        try {
            let UPD_STAT = JSON.parse(value);
            let { GEOMETRY, RELATION, ...properties } = UPD_STAT;
            let MEANING = [];
            if (GEOMETRY) {
                MEANING.push(UPD_STAT_MAP.GEOMETRY[GEOMETRY]);
            }
            if (RELATION) {
                MEANING.push(UPD_STAT_MAP.RELATION[RELATION]);
            }
            if (!_.isEmpty(properties)) {
                let PROPERTIES = Object.keys(properties).some(key => properties[key] === 'MOD')
                    ? 'MOD'
                    : 'NO_CHANGE';
                MEANING.push(UPD_STAT_MAP.PROPERTIES[PROPERTIES]);
            }
            return MEANING.join(',') || '--';
        } catch (e) {
            return '--';
        }
    };

    adLaneRsValueFilter = (value, record) => {
        let rsType = record.RS_TYPE;
        let type = 'AD_LANE_RS_VALUE' + (rsType || '0');
        let options = TYPE_SELECT_OPTION_MAP[type].flat();
        let option = options.find(c => c.value == value);
        return option ? option.label : value;
    };

    semanticConfidenceFilter = value => {
        if (typeof value === 'number') {
            return value;
        }
        return '--';
    };
}

export default new Filter();
