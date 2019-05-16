const path = require('path')
const webpack = require('webpack')
const HtmlWebpackPlugin = require('html-webpack-plugin');
const CleanWebpackPlugin = require('clean-webpack-plugin');

module.exports = {
    entry: {
        index: './src/index.js',
    },
    output: {
        filename: '[name].bundle.js',
        path: path.resolve(__dirname, 'dist')
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
                test: /\.s?[ac]ss$/,
                use: ['style-loader', 'css-loader', 'sass-loader']
            },
            {
                test: /\.(png|jpg|jpeg|gif|ico)(\?v=\d+\.\d+\.\d+)?$/i,
                loader: 'url-loader',
                options: {
                    limit: 10000,
                },
            }
        ],
    },
    devServer: {
        historyApiFallback: true,
        hot: true
    },
    resolve: {
        modules: [
            'node_modules/'
        ],
        alias: {
            src: path.resolve(__dirname, 'src/'),
            demo: path.resolve(__dirname, 'demo/'),
            'mock': path.resolve(__dirname, './mock/'),
            styles: path.resolve(__dirname, 'src/assets/styles/')
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
        new CleanWebpackPlugin()
    ],
};
