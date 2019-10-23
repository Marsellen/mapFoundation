export default {
    title: 'Ecarx React App',
    version: 'v1.0.7.1-sprint7',

    urlConfig: {
        point_clouds: '1301_RAW_DATA/point_clouds/cloud.js',
        track: '1301_RAW_DATA/track.json',
        region: '1301_RAW_DATA/region.geojson',
        boundary: '1301_RAW_DATA/ads_all.geojson',
        vectors: 'ads_all.geojson',
        rels: 'rels.geojson',
        attrs: 'attrs.geojson'
    },

    expireTime: 86400,
    autoSaveTime: 600000,
    loopTaskTime: 60000
};
