import { TYPE_SELECT_OPTION_MAP } from 'config/ADMapDataConfig';
import _ from 'lodash';
import { parseArrayString } from './utils';

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
const COMPLEX_TYPES = ['AD_ARROW_ARR_DIRECT', 'AD_ARROW_GEO_FEAT_TYPE'];

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
        if (COMPLEX_TYPES.includes(type)) {
            return (
                options
                    .filter(val => value.includes(val.value))
                    .map(val => val.label)
                    .join('+') || '--'
            );
        } else {
            let option = options.find(c => c.value == value);
            return option ? option.label : value;
        }
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

    signContentFilter = value => {
        value = parseArrayString(value);
        if (!value.length) return '--';

        return value
            .map(
                ({ SIGN_TYPE, CONT_TYPE, CONT_VALUE, TIMEDOM }) =>
                    `类型：${this.typeFilter(
                        'AD_TS_CONTENT_SIGN_TYPE',
                        SIGN_TYPE
                    )}，语义类型：${this.typeFilter(
                        'AD_TS_CONTENT_CONT_TYPE',
                        CONT_TYPE
                    )}，语义内容：${CONT_VALUE}，时间描述：${TIMEDOM}；`
            )
            .join('\n');
    };
}

export default new Filter();
