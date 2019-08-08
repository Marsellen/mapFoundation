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
        if (!ATTR_TABLE_CONFIG[type]) return [];
        let configs = JSON.parse(JSON.stringify(ATTR_TABLE_CONFIG[type]));
        let ats = records.reduce((total, record) => {
            let table = configs[record.source];
            let attrs = table.map(config => {
                config.value = record.properties[config.key];
                return config;
            });
            total[record.source + record.id] = attrs;
            return total;
        }, {});
        return ats;
    };

    updateAttrs = async (attrs, spec, properties) => {
        let IDKey = DATA_LAYER_MAP[spec] ? DATA_LAYER_MAP[spec].id : 'id';
        let objId = properties[IDKey];
        let attrStore = new IndexedDB('attributes', 'attr');
        Object.keys(attrs).map(key => {
            let id = key.replace(/[^0-9]/gi, '');
            let source = key.replace(/[0-9]/gi, '');
            let record = {
                id,
                source,
                spec,
                properties: {
                    [IDKey]: objId,
                    ...attrs[key]
                },
                key: objId
            };
            attrStore.edit(record);
        });
    };
}

export default new attrFactory();
