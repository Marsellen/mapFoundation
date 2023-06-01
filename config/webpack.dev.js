const webpack = require('webpack');
const { merge } = require('webpack-merge');
const paths = require('./paths');
const base = require('./webpack.base.js');
const WebpackBar = require('webpackbar');

module.exports = merge(base, {
    mode: 'development', // 设置开发环境模式
    // devtool: 'cheap-module-source-map',
    devtool: 'eval-source-map',
    stats: 'errors-only', // 'errors-only'只在发生错误时输出 'verbose'全部输出
    devServer: {
        port: 8001,
        // hot: true,
        historyApiFallback: true,
        host: '0.0.0.0',
        client: {
            overlay: false // 关闭浏览器全屏报错（不过webpack V5好像不支持）
        },
        headers: {
            'Access-Control-Allow-Origin': '*'
        },
        // 接口代理
        proxy: {
            '/text/**': {
                target: 'http://x.com/',
                changeOrigin: true,
                logLevel: 'debug'
            }
        }
    },
    // target: 'web', // 不编译成es5
    cache: false,
    optimization: {
        minimize: false
    },
    module: {
        rules: [
            {
                test: /\.css$/,
                use: ['style-loader', 'css-loader', 'postcss-loader'] // 开发环境直接以行内样式的形式引入样式
            },
            {
                test: /\.less$/,
                use: ['style-loader', 'css-loader', 'postcss-loader', 'less-loader'] // 开发环境直接以行内样式的形式引入样式
            }
        ]
    },
    plugins: [
        // 进度条
        new WebpackBar()
    ]
});
