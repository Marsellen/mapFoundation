const webpack = require('webpack');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const ModuleFederationPlugin = require('webpack/lib/container/ModuleFederationPlugin');
const path = require('path');
const env = process.env.npm_config_ENV || 'dev';
const { moduleSetting, publicPath, remoteUrls } = require('./module.js');

module.exports = {
    entry: path.resolve(__dirname, '../src/index.js'),
    output: {
        publicPath: publicPath[env] || publicPath.dev
    },
    resolve: {
        modules: [path.resolve(__dirname, '../node_modules')], //只在当前目录下的node_modules里查找
        mainFields: ['main'], //第三方模块入口描述字段只有main
        extensions: ['.js', '.json', '.wasm'], //后缀尝试列表尽可能少，出现频率最高的写在前面
        fallback: {
            fs: false,
            path: false
        },
        alias: {
            src: path.resolve(__dirname, '../src/'),
            less: path.resolve(__dirname, '../src/asset/less/')
        }
    },
    module: {
        noParse: /jquery|chartjs/ //忽略没采用模块化的文件
    },
    optimization: {
        runtimeChunk: 'single' // 为了线上更新版本时，充分利用浏览器缓存 'single' 是指只生成一个 runtime chunk
    },
    plugins: [
        //处理htm文件
        new HtmlWebpackPlugin({
            inject: true,
            template: path.resolve(__dirname, '../public/index.html'),
            favicon: path.resolve(__dirname, '../public/favicon.ico'),
            filename: 'index.html',
            templateParameters: {
                remoteUrls: remoteUrls[env] || remoteUrls.prd
            }
        }),
        //定义全局变量
        new webpack.DefinePlugin({
            DATA_SPEC: JSON.stringify('../src/config/'),
            ENV: process.env.npm_config_ENV,
            CSYS: process.env.CSYS,
            NOSHP: process.env.NOSHP,
            'process.env.NODE_ENV': JSON.stringify(process.env.NODE_ENV)
        }),
        new webpack.ProvidePlugin({
            $: 'jquery',
            jQuery: 'jquery',
            THREE: 'three'
        }),
        new ModuleFederationPlugin(moduleSetting)
    ]
    // node: {
    //     fs: 'empty'
    // }
};
