const webpack = require('webpack');
const path = require('path');
const HtmlWebpackPlugin = require('html-webpack-plugin');

module.exports = {
    entry: './src/index.js',
    resolve: {
        modules: [path.resolve(__dirname, 'node_modules')], //只在当前目录下的node_modules里查找
        mainFields: ['main'], //第三方模块入口描述字段只有main
        extensions: ['.js', '.json', '.wasm'], //后缀尝试列表尽可能少，出现频率最高的写在前面
        alias: {
            src: path.resolve(__dirname, 'src/'),
            less: path.resolve(__dirname, 'src/asset/less/')
        }
    },
    module: {
        noParse: /jquery|chartjs/, //忽略没采用模块化的文件
    },
    plugins: [
        //处理htm文件
        new HtmlWebpackPlugin({
            template: path.resolve(__dirname, './public/index.html'),
            favicon: path.resolve(__dirname, './public/favicon.ico'),
            filename: 'index.html',
            inject: true,
        }),
        //定义全局变量
        new webpack.DefinePlugin({
            DATA_SPEC: JSON.stringify('src/config/'),
            CSYS: process.env.CSYS,
            NOSHP: process.env.NOSHP,
            'process.env.NODE_ENV': JSON.stringify(process.env.NODE_ENV)
        }),
        new webpack.ProvidePlugin({
            $: 'jquery',
            jQuery: 'jquery',
            THREE: 'three'
        })
    ],
    node: {
        fs: 'empty'
    }
};