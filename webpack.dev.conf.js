const path = require('path');
const webpack = require('webpack');
const merge = require('webpack-merge');
const common = require('./webpack.common.conf');

module.exports = merge(common, {
    mode: 'development',
    devtool: 'cheap-module-source-map',
    devServer: {
        historyApiFallback: true,
        hot: true,
        proxy: {
            '/gateway': {
                target: 'http://10.43.75.58:13003',
                pathRewrite: { '^/gateway': '' },
                changeOrigin: true,
                logLevel: 'debug'
            },
            '/task_service': {
                target: 'http://10.43.75.58:13003',
                pathRewrite: { '^/task_service': 'task' },
                changeOrigin: true,
                logLevel: 'debug'
            },
            '/id_service': {
                target: 'http://10.43.75.58:13003',
                pathRewrite: { '^/id_service': 'imppublic' },
                changeOrigin: true,
                logLevel: 'debug'
            },
            '/update_boundary_service': {
                target: 'http://10.43.75.58:13003',
                pathRewrite: { '^/update_boundary_service': 'querydb' },
                changeOrigin: true,
                logLevel: 'debug'
            },
            '/edit_service': {
                target: 'http://10.43.75.58:13003',
                pathRewrite: { '^/edit_service': 'edit' },
                changeOrigin: true,
                logLevel: 'debug'
            }
        }
    }
});
