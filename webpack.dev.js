const webpack = require('webpack');
const { merge } = require('webpack-merge');
const path = require('path');
const base = require('./webpack.base.js');
const PROXY_ENV_MAP = require('./config/path');
const WebpackBar = require('webpackbar');
const ReactRefreshWebpackPlugin = require('@pmmmwh/react-refresh-webpack-plugin');

//请求转发映射
const env = process.env.PROXY_ENV;
const PROXY_MAP = PROXY_ENV_MAP[env];
const proxyConfig = {};
Object.entries(PROXY_MAP).forEach(([key, val]) => {
    proxyConfig[`/gateway/${key}`] = {
        target: val,
        pathRewrite: { [`^/gateway/${key}`]: `/${key}` },
        changeOrigin: true
    };
});

module.exports = merge(base, {
    mode: 'development', //设置开发环境模式
    devtool: 'cheap-module-eval-source-map',
    output: {
        path: path.resolve(__dirname, 'dist'),
        filename: '[name].bundle.js',
        globalObject: 'this',
        publicPath: '/'
    },
    devServer: {
        port: 15900,
        hot: true,
        inline: true,
        historyApiFallback: true,
        host: '0.0.0.0',
        publicPath: '/',
        proxy: proxyConfig,
        stats: 'errors-only'
    },
    module: {
        rules: [
            {
                test: /\.css$/,
                use: ['style-loader', 'css-loader', 'postcss-loader'] //开发环境直接以行内样式的形式引入样式
            },
            {
                test: /\.less$/,
                use: ['style-loader', 'css-loader', 'postcss-loader', 'less-loader'] //开发环境直接以行内样式的形式引入样式
            },
            {
                test: /\.(js|jsx)$/,
                use: [
                    {
                        loader: require.resolve('babel-loader'),
                        options: {
                            plugins: [require.resolve('react-refresh/babel')], //添加react-refresh/babel插件
                            cacheDirectory: true //babel开启缓存
                        }
                    }
                ],
                include: path.resolve(__dirname, 'src') //exclude和include，建议用include
            },
            {
                test: /\.(png|jpg|svg|gif|ico|cur)$/,
                use: ['url-loader']
            }
        ]
    },
    plugins: [
        //使用react快速刷新插件
        new ReactRefreshWebpackPlugin(),
        //使用热更新插件
        new webpack.HotModuleReplacementPlugin(),
        //进度条
        new WebpackBar()
    ]
});
