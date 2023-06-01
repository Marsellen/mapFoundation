const webpack = require('webpack');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const ModuleFederationPlugin = require('webpack').container.ModuleFederationPlugin;
const path = require('path');
const paths = require('./paths');
// const env = process.env.npm_config_ENV || 'dev';
const env = paths.env;
const { moduleSetting } = require('./module.js');

module.exports = {
    entry: paths.src,
    output: {
        publicPath: env == 'development' ? 'auto' : '/'
    },
    module: {
        rules: [
            // JavaScript: Use Babel to transpile JavaScript files
            {
                test: /\.(js|jsx)$/,
                exclude: /node_modules/,
                use: [
                    {
                        loader: 'babel-loader',
                        options: {
                            cacheDirectory: true
                        }
                    }
                ]
            },
            {
                test: /\.(png|jpg|svg|gif|ico|cur)$/,
                use: ['url-loader']
            }
        ]
    },
    plugins: [
        new ModuleFederationPlugin(moduleSetting),
        //处理htm文件
        new HtmlWebpackPlugin({
            inject: true,
            template: path.resolve(__dirname, '../public/index.html'),
            filename: 'index.html',
            chunks: ['main']
        }),
        //定义全局变量
        new webpack.DefinePlugin({
            ENV: process.env.npm_config_ENV
        })
    ],
    resolve: {
        modules: [paths.nodeModules], // 在当前目录下的node_modules里查找
        mainFields: ['main'], // 第三方模块入口描述字段只有main
        extensions: ['.js', '.json', '.wasm'], // 后缀尝试列表尽可能少，出现频率最高的写在前面
        fallback: {
            fs: false,
            path: false
        },
        alias: {
            src: paths.src, // 定义页面的简化路径
            less: paths.less
        }
    }
    // node: {
    //     fs: 'empty'
    // }
};
