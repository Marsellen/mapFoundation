const path = require('path');
const webpack = require('webpack');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const CleanWebpackPlugin = require('clean-webpack-plugin');
const MiniCssExtractPlugin = require('mini-css-extract-plugin');
const devMode = process.env.NODE_ENV !== 'production';
const CopyWebpackPlugin = require('copy-webpack-plugin');

module.exports = {
    entry: {
        index: './src/index.js'
    },
    output: {
        filename: '[name].bundle.js',
        path: path.resolve(__dirname, 'dist'),
        globalObject: 'this'
    },
    module: {
        noParse: [/moment.js/],
        rules: [
            {
                test: /\.(js|jsx)$/,
                exclude: /node_modules/,
                loader: 'babel-loader',
                query: {
                    presets: ['@babel/preset-env']
                }
            },
            {
                test: /\.(le|c)ss$/,
                use: [
                    {
                        loader: MiniCssExtractPlugin.loader,
                        options: {
                            hmr: process.env.NODE_ENV === 'development'
                        }
                    },
                    'css-loader',
                    'less-loader'
                ]
            },
            {
                test: /\.(png|jpg|jpeg|gif|ico|obj|mtl|cur|gltf)(\?v=\d+\.\d+\.\d+)?$/i,
                loader: 'url-loader',
                options: {
                    limit: 10000
                }
            }
        ]
    },
    resolve: {
        modules: ['node_modules/'],
        alias: {
            src: path.resolve(__dirname, 'src/'),
            demo: path.resolve(__dirname, 'demo/'),
            mock: path.resolve(__dirname, './mock/'),
            less: path.resolve(__dirname, 'src/assets/less/')
        },
        extensions: ['.js', '.jsx', '.json']
    },
    plugins: [
        new HtmlWebpackPlugin({
            template: path.resolve(__dirname, './public/index.html'),
            filename: 'index.html',
            inject: true,
            favicon: path.resolve(__dirname, './public/favicon.ico'),
            templateParameters: {
                PUBLIC_URL: __dirname
            }
        }),
        new CleanWebpackPlugin(),
        new webpack.ProvidePlugin({
            $: 'jquery',
            jQuery: 'jquery',
            THREE: 'three'
        }),
        new MiniCssExtractPlugin({
            filename: devMode ? 'main.css' : 'main.[hash].css',
            chunkFilename: devMode ? '[id].css' : '[id].[hash].css'
        }),
        new CopyWebpackPlugin([
            //支持输入一个数组
            {
                from: path.resolve(__dirname, 'config'), //将config下的文件
                to: './config' // 复制到config
            }
        ])
    ],
    optimization: {
        splitChunks: {
            cacheGroups: {
                styles: {
                    name: 'styles',
                    test: /\.(le|c)ss$/,
                    chunks: 'all',
                    enforce: true
                }
            }
        }
    },
    node: {
        fs: 'empty'
    },
    stats: {
        children: false,
        warnings: false
    }
};
