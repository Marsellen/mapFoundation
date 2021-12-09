const { merge } = require('webpack-merge');
const path = require('path');
const base = require('./webpack.base.js');
const CleanWebpackPlugin = require('clean-webpack-plugin'); //清除build/dist文件夹文件
const MiniCssExtractPlugin = require('mini-css-extract-plugin'); //提取css
const OptimizeCSSAssetsPlugin = require('optimize-css-assets-webpack-plugin'); //压缩css
const TerserPlugin = require('terser-webpack-plugin'); //压缩js

module.exports = merge(base, {
    mode: 'production',
    devtool: 'source-map',
    output: {
        path: path.resolve(__dirname, '../dist'),
        filename: '[name].[chunkhash].js', //js用chunkhash
        globalObject: 'this',
        publicPath: '/'
    },
    optimization: {
        minimize: true,
        minimizer: [
            //webpack4需要安装terser-webpack-plugin@4.2.3
            new TerserPlugin({
                parallel: 2,
                cache: true
            })
        ]
    },
    performance: {
        hints: false //关闭性能提示
    },
    module: {
        rules: [
            {
                test: /\.css$/,
                use: [MiniCssExtractPlugin.loader, 'css-loader', 'postcss-loader']
            },
            {
                test: /\.less$/,
                use: [MiniCssExtractPlugin.loader, 'css-loader', 'postcss-loader', 'less-loader']
            },
            {
                test: /\.(js|jsx)$/,
                use: [
                    {
                        loader: require.resolve('babel-loader'),
                        options: {
                            cacheDirectory: true //babel开启缓存
                        }
                    }
                ],
                include: path.resolve(__dirname, '../src') //exclude和include，建议用include
            },
            {
                test: /\.(png|jpg|svg|gif|ico|cur)$/,
                use: [
                    {
                        loader: 'url-loader',
                        options: {
                            name: '[name].[hash].[ext]', //图片用hash
                            limit: 8192, //8kb以下的图片使用base64编码，8kb以上的图片交给file-loader处理
                            outputPath: 'img',
                            esModule: false
                        }
                    }
                ]
            }
        ]
    },
    plugins: [
        //清空dist文件夹
        new CleanWebpackPlugin({
            path: path.resolve(__dirname, '../dist')
        }),
        //提取css
        new MiniCssExtractPlugin({
            filename: 'css/[name].[contenthash].css', //css用contenthash
            ignoreOrder: true
        }),
        //压缩css
        new OptimizeCSSAssetsPlugin()
    ]
});
