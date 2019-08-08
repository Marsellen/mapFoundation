const path = require('path');
const webpack = require('webpack');
const merge = require('webpack-merge');
const common = require('./webpack.common.conf');

module.exports = merge(common, {
    mode: 'development',
    devServer: {
        historyApiFallback: true,
        hot: true,
        proxy: {
            '/id_service': {
                target: 'http://10.43.75.17:13007',
                pathRewrite: { '^/id_service': '' },
                changeOrigin: true,
                logLevel: 'debug'
            },
            '/nas_service': {
                target: 'http://10.43.75.80:16000',
                pathRewrite: { '^/nas_service': '' },
                changeOrigin: true,
                logLevel: 'debug'
            },
            '/shp_service': {
                target: 'http://10.43.75.80:16906',
                pathRewrite: { '^/shp_service': '' },
                changeOrigin: true,
                logLevel: 'debug'
            },
            '/editor_service': {
                target: 'http://10.43.75.11:9292',
                pathRewrite: { '^/editor_service': '' },
                changeOrigin: true,
                logLevel: 'debug'
            }
        }
    }
});
