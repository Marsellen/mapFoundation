import { ATTR_SPEC_CONFIG, ATTR_TABLE_CONFIG } from 'src/config/AttrsConfig';
import { DATA_LAYER_MAP } from 'src/config/DataLayerConfig';
import IndexedDB from 'src/utils/IndexedDB';

class attrFactory {
    attrDataToTable = data => {
        let attrData = this.filterRelData(data);
        return attrData.reduce((total, feature) => {
            let spec = feature.name;

            feature.features.map(f => {
                let record = this.dataToTable(f.properties, spec);
                total.push(record);
            });
            return total;
        }, []);
    };

    filterRelData = data => {
        return ((data && data.features) || []).filter(d =>
            ATTR_SPEC_CONFIG.map(config => config.source).includes(d.name)
        );
    };

    dataToTable = (properties, spec) => {
        let attrConfig = ATTR_SPEC_CONFIG.find(config => config.source == spec);
        return {
            key: properties[attrConfig.key],
            spec: attrConfig.relSpec,
            source: attrConfig.source,
            properties
        };
    };

    getTabelData = async (type, properties) => {
        let IDKey = DATA_LAYER_MAP[type] ? DATA_LAYER_MAP[type].id : 'id';
        let id = properties[IDKey];
        let attrStore = new IndexedDB('attributes', 'attr');
        let records = await attrStore.getAll([type, id], 'SPEC_KEY');
        let ats = records.reduce((total, record) => {
            if (!ATTR_TABLE_CONFIG[type]) return [];
            let configs = JSON.parse(JSON.stringify(ATTR_TABLE_CONFIG[type]));
            let attrs = configs.map(config => {
                config.value = record.properties[config.key];
                config.key = config.key + record.id;
                return config;
            });
            total = total.concat(attrs);
            return total;
        }, []);
        return ats;
    };
}

export default new attrFactory();
