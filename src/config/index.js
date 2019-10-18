export default {
    title: 'Ecarx React App',
    version: 'v1.0.6.2-sprint6-rc2',

    urlConfig: {
        point_clouds: '/point_clouds/cloud.js',
        track: '/tracks/track.json',
        vectors: '/vectors/ads_all.geojson',
        rels: '/vectors/rels.geojson',
        attrs: '/vectors/attrs.geojson',
        region: '/region.geojson',
        boundary: '/../06_NEARBY_GEOJSON/ads_all.geojson'
    },

    expireTime: 86400,
    autoSaveTime: 600000,
    loopTaskTime: 60000
};
