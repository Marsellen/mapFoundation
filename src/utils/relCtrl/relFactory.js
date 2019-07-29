import {
    REL_DATA_SET,
    ATTR_REL_DATA_SET,
    REL_DATA_MAP
} from 'src/config/RelsConfig';
import RelDataToTable from './relDataToTable';
import RelTableToData from './relTableToData';

class relFactory {
    relDataToTable = data => {
        let relData = this.filterRelData(data);
        return relData.reduce((total, feature) => {
            let spec = feature.name;
            let func = REL_DATA_MAP[spec] && REL_DATA_MAP[spec].func;
            if (!func || typeof RelDataToTable[func] !== 'function') {
                return total;
            }
            feature.features.map(f => {
                let records = RelDataToTable[func](f.properties, spec);
                total = total.concat(records);
            });
            return total;
        }, []);
    };

    relTableToData = records => {
        records = records.filter(
            record => !ATTR_REL_DATA_SET.includes(record.spec)
        );

        let featureMap = records.reduce((total, record) => {
            let spec = record.spec;
            let func = REL_DATA_MAP[spec] && REL_DATA_MAP[spec].func;
            if (!func || typeof RelTableToData[func] !== 'function') {
                return total;
            }
            total[spec] = total[spec] || [];
            let features = RelTableToData[func](record);
            total[spec] = total[spec].concat(features);
            return total;
        }, {});

        return Object.keys(featureMap).map(name => {
            let features = featureMap[name].map(properties => {
                return {
                    properties,
                    type: 'Feature'
                };
            });
            return {
                name,
                features,
                type: 'FeatureCollection'
            };
        });
    };

    filterRelData = data => {
        return ((data && data.features) || []).filter(d =>
            REL_DATA_SET.includes(d.name)
        );
    };
}

export default new relFactory();
