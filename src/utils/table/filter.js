import { TYPE_SELECT_OPTION_MAP } from 'src/config/ADMapDataConfig';
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
        let config = TYPE_SELECT_OPTION_MAP[type].find(c => c.value == value);
        return config ? config.label : value;
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
                let PROPERTIES = Object.keys(properties).some(
                    key => properties[key] === 'MOD'
                )
                    ? 'MOD'
                    : 'NO_CHANGE';
                MEANING.push(UPD_STAT_MAP.PROPERTIES[PROPERTIES]);
            }
            return MEANING.join(',') || '--';
        } catch (e) {
            return '--';
        }
    };
}

export default new Filter();