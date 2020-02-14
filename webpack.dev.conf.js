const common = require('./webpack.common.conf');
const PROXY_MAP = require('./config/path');

module.exports = env => {
    return {
        ...common,
        mode: 'development',
        devtool: 'cheap-module-source-map',
        devServer: {
            historyApiFallback: true,
            hot: true,
            host: '0.0.0.0',
            port: 15900,
            proxy: {
                '/gateway': {
                    target: PROXY_MAP[env].gateway,
                    pathRewrite: { '^/gateway': '/' },
                    changeOrigin: true,
                    logLevel: 'debug'
                },
                '/task_service': {
                    target: PROXY_MAP[env].task,
                    pathRewrite: { '^/task_service': '/task' },
                    changeOrigin: true,
                    logLevel: 'debug'
                },
                '/id_service': {
                    target: PROXY_MAP[env].id,
                    pathRewrite: { '^/id_service': '/imppublic' },
                    changeOrigin: true,
                    logLevel: 'debug'
                },
                '/manualBuild_service': {
                    target: PROXY_MAP[env].manualBuild,
                    pathRewrite: { '^/manualBuild_service': '/manualBuild' },
                    changeOrigin: true,
                    logLevel: 'debug'
                },
                '/update_boundary_service': {
                    target: PROXY_MAP[env].boundary,
                    pathRewrite: { '^/update_boundary_service': '/querydb' },
                    changeOrigin: true,
                    logLevel: 'debug'
                },
                '/edit_service': {
                    target: PROXY_MAP[env].edit,
                    pathRewrite: { '^/edit_service': '/edit' },
                    changeOrigin: true,
                    logLevel: 'debug'
                },
                '/check_service': {
                    target: PROXY_MAP[env].check,
                    pathRewrite: { '^/check_service': '/check' },
                    changeOrigin: true,
                    logLevel: 'debug'
                }
            }
        }
    };
};
