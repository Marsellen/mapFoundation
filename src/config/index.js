export default {
    title: 'Ecarx React App',
    version: 'v1.0.15.1-sprint15',

    urlConfig: {
        point_clouds: 'point_clouds/cloud.js',
        track: 'track.json',
        region: 'region.geojson',
        boundaryAdsAll: 'around/ads_all.geojson',
        boundaryRels: 'around/rels.geojson',
        boundaryAttrs: 'around/attrs.geojson',
        vectors: 'ads_all.geojson',
        rels: 'rels.geojson',
        attrs: 'attrs.geojson'
    },

    expireTime: 86400,
    autoSaveTime: 600000,
    loopTaskTime: 60000,

    processNameOptions: [
        { label: '人工识别数据', value: 'imp_recognition' },
        { label: '人工构建数据', value: 'imp_manbuild' }
    ]
};
