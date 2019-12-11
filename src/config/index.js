export default {
    title: 'Ecarx React App',
    version: 'v1.0.10.1-sprint10',

    urlConfig: {
        point_clouds: 'point_clouds/cloud.js',
        track: 'track.json',
        region: 'region.geojson',
        boundary: 'around/ads_all.geojson',
        vectors: 'ads_all.geojson',
        rels: 'rels.geojson',
        attrs: 'attrs.geojson'
    },

    expireTime: 86400,
    autoSaveTime: 600000,
    loopTaskTime: 60000,

    //人工构建任务类型枚举: [人工构建, 人工构建后质检]
    manbuildTaskProcess: ['imp_manbuild', 'imp_check_after_manbuild']
};
