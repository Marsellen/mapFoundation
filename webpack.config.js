const path = require('path');
const webpack = require('webpack');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const CleanWebpackPlugin = require('clean-webpack-plugin');
const MiniCssExtractPlugin = require('mini-css-extract-plugin');
const CopyWebpackPlugin = require('copy-webpack-plugin');
const PROXY_MAP = require('./config/path');

module.exports = (env = {}) => {
    console.log('env:', env);
    const devMode = env.mode !== 'production';
    const proxy = env.proxy || 'dev';
    const configPath =
        env.spec === 'semantic' ? 'src/config/semantic/' : 'src/config/';
    return {
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
                    test: /\.(png|jpg|jpeg|gif|ico|obj|mtl|cur)(\?v=\d+\.\d+\.\d+)?$/i,
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
                less: path.resolve(__dirname, 'src/assets/less/'),
                config: path.resolve(__dirname, configPath)
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
            ]),
            new webpack.DefinePlugin({
                DATA_SPEC: JSON.stringify(env.spec),
                CSYS: env.csys,
                NOSHP: env.noshp
            })
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
        },
        devtool: 'source-map',
        devServer: {
            historyApiFallback: true,
            hot: true,
            port: 15900,
            host: '0.0.0.0',
            proxy: {
                '/gateway': {
                    target: PROXY_MAP[proxy].gateway,
                    pathRewrite: { '^/gateway': '/' },
                    changeOrigin: true,
                    logLevel: 'debug'
                },
                '/task_service': {
                    target: PROXY_MAP[proxy].task,
                    pathRewrite: { '^/task_service': '/task' },
                    changeOrigin: true,
                    logLevel: 'debug'
                },
                '/id_service': {
                    target: PROXY_MAP[proxy].id,
                    pathRewrite: { '^/id_service': '/imppublic' },
                    changeOrigin: true,
                    logLevel: 'debug'
                },
                '/manualBuild_service': {
                    target: PROXY_MAP[proxy].manualBuild,
                    pathRewrite: { '^/manualBuild_service': '/manualBuild' },
                    changeOrigin: true,
                    logLevel: 'debug'
                },
                '/update_boundary_service': {
                    target: PROXY_MAP[proxy].boundary,
                    pathRewrite: { '^/update_boundary_service': '/querydb' },
                    changeOrigin: true,
                    logLevel: 'debug'
                },
                '/edit_service': {
                    target: PROXY_MAP[proxy].edit,
                    pathRewrite: { '^/edit_service': '/edit' },
                    changeOrigin: true,
                    logLevel: 'debug'
                },
                '/check_service': {
                    target: PROXY_MAP[proxy].check,
                    pathRewrite: { '^/check_service': '/check' },
                    changeOrigin: true,
                    logLevel: 'debug'
                },
                '/task': {
                    target: 'http://10.43.75.119:80',
                    changeOrigin: true,
                    logLevel: 'debug'
                }
            }
        }
    };
};
