export default {
    title: 'Ecarx React App',
    version: 'SVC013_v4.2.4.2',
    urlConfig: {
        point_clouds: 'cloud.js',
        track: 'track.json',
        region: 'region.geojson',
        boundaryAdsAll: 'around/ads_all.geojson',
        boundaryRels: 'around/rels.geojson',
        boundaryAttrs: 'around/attrs.geojson',
        vectors: 'ads_all.geojson',
        rels: 'rels.geojson',
        attrs: 'attrs.geojson',
        taskInfo: 'taskinfos.json',
        octreeIndex: 'octreeIndex.json'
    },

    expireTime: 86400,
    autoSaveTime: 600000,
    loopTaskTime: 60000,

    processNameOptions: [
        {
            label: '人工识别数据',
            value: 'imp_recognition',
            roleCodes: ['producer', 'producer_leader']
        },
        {
            label: '人工构建数据',
            value: 'imp_manbuild',
            roleCodes: ['producer', 'producer_leader']
        },
        {
            label: '人工识别质检数据',
            value: 'imp_check_after_recognition',
            roleCodes: ['quality', 'quality_leader']
        },
        {
            label: '人工构建质检数据',
            value: 'imp_check_after_manbuild',
            roleCodes: ['quality', 'quality_leader']
        },
        {
            label: '人工检修数据',
            value: 'imp_std_precompile_man_repair',
            roleCodes: ['producer', 'producer_leader']
        }
    ]
};
