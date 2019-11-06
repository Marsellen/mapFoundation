export default {
    title: 'Ecarx React App',
    version: 'v1.0.8.2-sprint8-rc2',

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
    loopTaskTime: 60000
};
