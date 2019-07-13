const path = require('path');
const webpack = require("webpack");
const merge = require("webpack-merge");
const common = require('./webpack.common.conf');

module.exports = merge(common, {
    mode: 'development',
    devServer: {
        historyApiFallback: true,
        hot: true,
        proxy: {
            '/id_service': {
                target: 'http://10.43.16.17:13007',
                pathRewrite: { '^/id_service': '' },
                changeOrigin: true,
                logLevel: 'debug'
            },
            '/nas_service': {
                target: 'http://10.43.16.80:16000',
                pathRewrite: { '^/nas_service': '' },
                changeOrigin: true,
                logLevel: 'debug'
            },
            '/shp_service': {
                target: 'http://10.43.16.80:15906',
                pathRewrite: { '^/shp_service': '' },
                changeOrigin: true,
                logLevel: 'debug'
            }
        }
    },
});